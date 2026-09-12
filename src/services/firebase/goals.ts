import { db } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Goal } from '@/types/goal';

const COLLECTION = 'goals';

export async function createGoal(data: {
  walletAddress: string;
  name: string;
  targetAmount: number;
}): Promise<Goal> {
  const ref = db.collection(COLLECTION).doc();
  const goal: Goal = {
    id: ref.id,
    walletAddress: data.walletAddress,
    name: data.name,
    targetAmount: data.targetAmount,
    savedAmount: 0,
    asset: 'USDC',
    createdAt: new Date().toISOString(),
  };
  await ref.set(goal);
  return goal;
}

export async function getGoalsByWallet(walletAddress: string): Promise<Goal[]> {
  const snapshot = await db
    .collection(COLLECTION)
    .where('walletAddress', '==', walletAddress)
    .get();
  return snapshot.docs.map((doc) => doc.data() as Goal);
}

export async function addDeposit(goalId: string, amount: number, txHash: string) {
  const ref = db.collection('goals').doc(goalId);
  await ref.update({
    savedAmount: FieldValue.increment(amount),
  });
  await ref.collection('deposits').add({
    amount,
    txHash,
    createdAt: new Date().toISOString(),
  });
}

export interface DepositRecord {
  goalId: string;
  goalName: string;
  amount: number;
  txHash: string;
  createdAt: string;
}

export async function getDepositsByWallet(walletAddress: string): Promise<DepositRecord[]> {
  const goals = await getGoalsByWallet(walletAddress);
  const perGoal = await Promise.all(
    goals.map(async (goal) => {
      const snapshot = await db.collection(COLLECTION).doc(goal.id).collection('deposits').get();
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          goalId: goal.id,
          goalName: goal.name,
          amount: data.amount as number,
          txHash: data.txHash as string,
          createdAt: data.createdAt as string,
        };
      });
    })
  );
  return perGoal.flat();
}