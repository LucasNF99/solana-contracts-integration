import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const alt = 'Hands-On with Solana and Front-End Integration'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 35,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '20px',
        }}
      >
        <p>
          Hands-On with Solana and Front-End Integration
        </p>
        <p
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            fontSize: 30,
          }}
        >
          By: Facho
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
