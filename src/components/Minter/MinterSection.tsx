"use client";
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const nftImageUrl = "https://i.imgur.com/NBEIFBz.png";
const nftExternalUrl = "https://i.imgur.com/NBEIFBz.png";

export default function MinterSection() {
  const [apiUrl, setApiUrl] = useState('');
  const [nft, setNft] = useState('');
  const [nftImage, setNftImage] = useState('');

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const mintCompressedNft = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'helius-fe-course',
        method: 'mintCompressedNft',
        params: {
          name: "your nft",
          symbol: 'NNFT',
          owner: publicKey,
          description:
            "your nft",
          attributes: [
            {
              trait_type: 'Cool Factor',
              value: 'Super',
            },
          ],
          imageUrl: nftImageUrl,
          externalUrl: nftExternalUrl,
          sellerFeeBasisPoints: 1000,
        },
      })
    });

    const { result } = await response.json();
    console.log("RESULT", result);

    if (!result) {
      toast.error("Request failed")
      throw "Request failed"
    }

    setNft(result.assetId);

    fetchNFT(result.assetId, event);
  };


  const fetchNFT = async (assetId: string, event: { preventDefault: () => void }) => {
    event.preventDefault();
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'applicaiton/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAsset',
        params: {
          id: assetId
        }
      })
    });

    const { result } = await response.json();
    console.log(result);
    setNftImage(result.content.links.image);
    const explorerUrl = `https://xray.helius.xyz/token/${nft}?network=devnet`;
    toast.success(
      <a href={explorerUrl} className="underline" target="_blank" rel="noopener noreferrer">
        View nft info
      </a>
    );
    return { result };
  };

  useEffect(() => {
    setApiUrl(`https://devnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`);
    console.log(apiUrl);
  }, [connection]);

  return (
    <section className='w-full flex-col gap-10 flex justify-center items-center'>
      <form onSubmit={evt => mintCompressedNft(evt)}>
        <button
          type='submit'
          className='button'
          disabled={!publicKey || !connection}
        >
          Mint
        </button>
      </form>
      <div>
        {
          nftImage
            ?
            <Image
              width={300}
              height={300}
              src={nftImage}
              className='rounded-lg border-2 border-gray-500' alt={''} />
            :
            <p className='border-2 border-gray-500 text-gray-500 p-2 rounded-lg'>NFT Image Goes Here</p>
        }
      </div>
    </section>
  )
}