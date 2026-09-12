import { NextRequest, NextResponse } from 'next/server';
import { createGoal, getGoalsByWallet } from '@/services/firebase/goals';

export async function GET(request: NextRequest) {
  const walletAddress = request.nextUrl.searchParams.get('wallet');
  if (!walletAddress) {
    return NextResponse.json({ error: 'Falta el parámetro wallet' }, { status: 400 });
  }
  const goals = await getGoalsByWallet(walletAddress);
  return NextResponse.json({ goals });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { walletAddress, name, targetAmount } = body;

  if (!walletAddress || !name || !targetAmount) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  const goal = await createGoal({ walletAddress, name, targetAmount: Number(targetAmount) });
  return NextResponse.json({ goal }, { status: 201 });
}