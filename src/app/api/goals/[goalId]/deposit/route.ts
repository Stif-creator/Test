import { NextRequest, NextResponse } from 'next/server';
import { addDeposit } from '@/services/firebase/goals';

export async function POST(request: NextRequest, { params }: { params: Promise<{ goalId: string }> }) {
  const { goalId } = await params;
  const { amount, txHash } = await request.json();

  if (!amount || !txHash) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  await addDeposit(goalId, Number(amount), txHash);
  return NextResponse.json({ ok: true });
}