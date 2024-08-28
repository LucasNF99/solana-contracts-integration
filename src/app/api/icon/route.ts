import { NextResponse } from 'next/server';
import { createCanvas } from 'canvas';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const countParam = searchParams.get('count');
  const solClaimParam = searchParams.get('solClaim');

  if (!countParam || !solClaimParam) {
    return NextResponse.json({ error: 'Count and solClaim parameters are required' }, { status: 400 });
  }

  const accountsToClose = parseInt(countParam, 10);
  const totalSolClaim = parseFloat(solClaimParam);

  if (isNaN(accountsToClose) || isNaN(totalSolClaim)) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  const width = 400;
  const height = 400;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');


  context.fillStyle = '#000cff';
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#fff';
  context.textAlign = 'center';

  context.font = 'bold 40px Oswald';
  context.fillText('SOLCLAIMR', width / 2, 70);

  context.font = '20px Montserrat';
  context.fillText('Account to Close:', width / 2, 140);
  context.font = 'bold 55px Montserrat';
  context.fillText(accountsToClose.toString(), width / 2, 190);

  context.font = '20px Montserrat';
  context.fillText('Total SOL Claim:', width / 2, 270);
  context.font = 'bold 50px Montserrat';
  context.fillText(totalSolClaim.toFixed(5), width / 2, 320);

  const buffer = canvas.toBuffer('image/png');
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
