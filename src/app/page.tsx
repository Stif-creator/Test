'use client';

import { useState } from 'react';
import { usePollar } from '@pollar/react';
import { PiggyBank } from 'lucide-react';
import { LoginButton } from '@/components/LoginButton';
import { LogoutButton } from '@/components/LogoutButton';
import { CopyAddressButton } from '@/components/CopyAddressButton';
import { WalletBalance } from '@/components/WalletBalance';
import { ReceiveButton } from '@/components/ReceiveButton';
import { CreateGoalForm } from '@/components/CreateGoalForm';
import { GoalsList } from '@/components/GoalsList';
import { TxHistory } from '@/components/TxHistory';
import { PointsBadge } from '@/components/PointsBadge';

export default function Home() {
  const { isAuthenticated, wallet } = usePollar();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <PiggyBank size={28} className="text-emerald-600" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Savings Wallet</h1>
            <p className="text-sm text-gray-500">Ahorra en USDC y alcanza tus metas.</p>
          </div>
          <div className="space-y-2 pt-2">
            <LoginButton />
            <p className="text-xs text-gray-500">Inicia sesión con Google — se crea tu wallet automáticamente.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-6 sm:py-8 lg:max-w-5xl">
      <h1 className="text-2xl font-bold">Savings Wallet</h1>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-2">
          <p className="flex-1 break-all text-sm text-gray-500">Wallet: {wallet?.address}</p>
          <div className="flex items-center gap-3">
            {wallet?.address && <CopyAddressButton address={wallet.address} />}
            <LogoutButton />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-2">
              <div className="space-y-3 rounded-xl bg-emerald-50 p-4">
                <WalletBalance />
                <ReceiveButton />
              </div>
              <p className="text-xs text-gray-500">Esto es el USDC disponible en tu wallet.</p>
            </div>

            <div className="space-y-2">
              <PointsBadge refreshKey={refreshKey} />
              <p className="text-xs text-gray-500">Ganas 1 punto por cada depósito.</p>
            </div>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Mis metas</h2>
              <p className="text-xs text-gray-500">Crea una meta y deposita USDC para alcanzarla.</p>
              <GoalsList refreshKey={refreshKey} onDeposited={() => setRefreshKey((k) => k + 1)} />
              <CreateGoalForm onCreated={() => setRefreshKey((k) => k + 1)} />
            </section>
          </div>

          <section className="space-y-3 lg:col-span-1">
            <h2 className="text-lg font-semibold">Historial</h2>
            <p className="text-xs text-gray-500">Cada depósito confirmado en la red aparece aquí.</p>
            <TxHistory refreshKey={refreshKey} />
          </section>
        </div>
      </div>
    </main>
  );
}
