import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, InlineNextActionLink, PostNextActionLink } from "@solana/actions";
import { PublicKey, Connection, clusterApiUrl, Transaction } from "@solana/web3.js";
import { getEmptyTokenAccounts } from "./helpers";
import { createCloseAccountInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";

var firstCall = 0;
export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const iconURL = new URL("/claimer.png", requestUrl.origin);

  const response: ActionGetResponse = {
    icon: iconURL.toString(),
    description: 'Close Token Accounts to get back your SOL',
    title: 'SOLClaimr',
    label: '',
    links: {
      actions: [
        {
          href: req.url,
          label: 'Check open accounts',
          parameters: [
            {
              name: 'check',
              type: 'checkbox',
              required: true,
              options: [{
                label: 'check',
                value: 'check',
                selected: true
              }]
            }
          ]
        },
      ]
    },
  }
  
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}

export async function POST(request: Request) {
  const currentUrl = new URL(request.url);
  const baseUrl = `${currentUrl.origin}`;
  const requestBody: ActionPostRequest = await request.json();
  console.log(requestBody)
  const userPublicKey = requestBody.account;
  const user = new PublicKey(userPublicKey);
  const connection = new Connection(clusterApiUrl('devnet'));
  let emptyTAs = await getEmptyTokenAccounts(user, connection, TOKEN_PROGRAM_ID);
  
  if (!Array.isArray(emptyTAs)) {
    throw new Error("Failed to retrieve empty token accounts.");
  }

  if (emptyTAs.length === 0) {
    const fakeTx = new Transaction();
    fakeTx.feePayer = user;
    const bh = (await connection.getLatestBlockhash({commitment: 'finalized'})).blockhash;
    fakeTx.recentBlockhash = bh;

    const serializedFakeTX = fakeTx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    }).toString('base64');

    const nextActionError: PostNextActionLink = {
      type: "post",
      href: `${baseUrl}/api/noaccounts`
    };

    const response: ActionPostResponse = {
      transaction: serializedFakeTX,
      message: "No token accounts to close.",
      links: {
        next: nextActionError,
      },
    };

    return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
  }

  if (emptyTAs.length > 0) {
    const fakeTx = new Transaction();
    fakeTx.feePayer = user;
    const bh = (await connection.getLatestBlockhash({commitment: 'finalized'})).blockhash;
    fakeTx.recentBlockhash = bh;

    const serializedFakeTX = fakeTx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    }).toString('base64');
    console.log({firstCall})
    if (!requestBody.data) {
      const tx = new Transaction();
      const ixs = emptyTAs.map(pks => createCloseAccountInstruction(pks, user, user, undefined, TOKEN_PROGRAM_ID));
      tx.add(...ixs);

      tx.feePayer = user;
      const bh = (await connection.getLatestBlockhash({commitment: 'finalized'})).blockhash;
      tx.recentBlockhash = bh;

      const serializedTX = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: false
      }).toString('base64');

      const response: ActionPostResponse = {
        transaction: serializedTX,
        message: "Closing " + emptyTAs.length + " token accounts!",
      };
      return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
    }

    const lamportsPerAccount = 2039280;
    const totalLamports = lamportsPerAccount * emptyTAs.length;
    const totalSOL = totalLamports / 1e9;

    const dynamicIconURL = `${baseUrl}/api/icon?count=${emptyTAs.length}&solClaim=${totalSOL}`;
    const nextInlineActionError: InlineNextActionLink = {
      type: "inline",
      action: {
        icon: dynamicIconURL,
        description: `Close Token Accounts to get back your SOL`,
        label: `Claim my SOL`,
        title: `SOLClaimr`,
        type: "action"
      }
    };

    const response: ActionPostResponse = {
      transaction: serializedFakeTX,
      message: "Accounts found to close.",
      links: {
        next: nextInlineActionError,
      },
    };
    firstCall++;

    return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
  }
}


export async function OPTIONS(request: Request) {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
