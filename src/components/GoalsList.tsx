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
    <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {goals.map((goal) => (
        <li key={goal.id} className="space-y-3 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">{goal.name}</p>
            <p className="text-sm text-gray-500">{goal.savedAmount} / {goal.targetAmount} USDC</p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{
                width: `${goal.targetAmount > 0 ? Math.min(100, (goal.savedAmount / goal.targetAmount) * 100) : 0}%`,
              }}
            />
          </div>
          <DepositForm goalId={goal.id} onDeposited={onDeposited} />
        </li>
      ))}
    </ul>
  );
}
