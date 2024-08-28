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
    description: 'Close accounts',
    title: 'Check open accounts',
    label: '',
    links: {
      actions: [
        {
          href: req.url,
          label: 'Check open accounts'
        },
      ]
    },
  }
  
  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}

export async function POST(request: Request) {
  try {
    const currentUrl = new URL(request.url);
    const baseUrl = `${currentUrl.origin}`;
    const requestBody: ActionPostRequest = await request.json();
    const userPublicKey = requestBody.account;

    const iconURL = new URL("/noAccounts.png", currentUrl.origin);

    if (!userPublicKey) {
      throw new Error("Invalid request: User public key is missing.");
    }

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


      if(firstCall > 0) {
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

      const nextInlineActionError: InlineNextActionLink  = {
        type: "inline",
        action: {
          icon: iconURL.toString(),
          description:  `You have ${emptyTAs.length} to close`,
          label:  `You have ${emptyTAs.length} to close`,
          title: `You have ${emptyTAs.length} to close`,
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

    console.log(firstCall);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}


export async function OPTIONS(request: Request) {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
