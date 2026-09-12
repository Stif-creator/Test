'use client';

import { useState } from 'react';
import { usePollar } from '@pollar/react';
import { LoginButton } from '@/components/LoginButton';
import { WalletBalance } from '@/components/WalletBalance';
import { CreateGoalForm } from '@/components/CreateGoalForm';
import { GoalsList } from '@/components/GoalsList';
import { TxHistory } from '@/components/TxHistory';
import { PointsBadge } from '@/components/PointsBadge';

export default function Home() {
  const { isAuthenticated, wallet } = usePollar();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold">Savings Wallet</h1>
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && (
        <div className="space-y-6">
          <p className="break-all text-sm text-gray-500">Wallet: {wallet?.address}</p>
          <WalletBalance />
          <PointsBadge refreshKey={refreshKey} />
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Mis metas</h2>
            <GoalsList refreshKey={refreshKey} onDeposited={() => setRefreshKey((k) => k + 1)} />
            <CreateGoalForm onCreated={() => setRefreshKey((k) => k + 1)} />
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Historial</h2>
            <TxHistory refreshKey={refreshKey} />
          </section>
        </div>
      )}
    </main>
  );
}