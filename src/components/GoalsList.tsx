'use client';

import { useEffect, useState } from 'react';
import { usePollar } from '@pollar/react';
import type { Goal } from '@/types/goal';
import { DepositForm } from '@/components/DepositForm';

export function GoalsList({ refreshKey, onDeposited }: { refreshKey: number; onDeposited?: () => void }) {
  const { wallet } = usePollar();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (!wallet?.address) return;
    fetch(`/api/goals?wallet=${wallet.address}`)
      .then((res) => res.json())
      .then((data) => setGoals(data.goals));
  }, [wallet?.address, refreshKey]);

  if (goals.length === 0) return <p className="text-sm text-gray-500">Todavía no tienes metas.</p>;

  return (
    <ul className="space-y-3">
      {goals.map((goal) => (
        <li key={goal.id} className="space-y-3 rounded-lg border border-gray-200 p-4">
          <p className="font-medium">{goal.name}: {goal.savedAmount} / {goal.targetAmount} XLM</p>
          <DepositForm goalId={goal.id} onDeposited={onDeposited} />
        </li>
      ))}
    </ul>
  );
}
