import { NextRequest, NextResponse } from 'next/server';
import { getDepositsByWallet } from '@/services/firebase/goals';

export async function GET(request: NextRequest) {
  const walletAddress = request.nextUrl.searchParams.get('wallet');
  if (!walletAddress) {
    return NextResponse.json({ error: 'Falta el parámetro wallet' }, { status: 400 });
  }
  const deposits = await getDepositsByWallet(walletAddress);
  return NextResponse.json({ deposits });
}
