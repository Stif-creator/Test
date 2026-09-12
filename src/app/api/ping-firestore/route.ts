import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET() {
  const ref = db.collection('_ping').doc('test');
  await ref.set({ checkedAt: new Date().toISOString() });
  const snapshot = await ref.get();

  return NextResponse.json({ ok: true, data: snapshot.data() });
}