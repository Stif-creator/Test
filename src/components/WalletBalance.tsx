'use client';

import { useEffect } from 'react';
import { usePollar } from '@pollar/react';

export function WalletBalance() {
  const { walletBalance, refreshWalletBalance } = usePollar();

  useEffect(() => {
    refreshWalletBalance();
  }, [refreshWalletBalance]);

  if (walletBalance.step !== 'loaded') return <p className="text-sm text-gray-500">Cargando balance...</p>;

  return (
    <ul className="space-y-1">
      {walletBalance.data.balances.map((b) => (
        <li key={b.code} className="text-base">
          {b.balance} {b.code}
        </li>
      ))}
    </ul>
  );
}