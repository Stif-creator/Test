'use client';

import { useEffect } from 'react';
import { usePollar } from '@pollar/react';
import { Eye } from 'lucide-react';

export function WalletBalance() {
  const { walletBalance, refreshWalletBalance, openWalletBalanceModal } = usePollar();

  useEffect(() => {
    refreshWalletBalance();
  }, [refreshWalletBalance]);

  const usdc = walletBalance.step === 'loaded'
    ? walletBalance.data.balances.find((b) => b.code === 'USDC')
    : null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold">{usdc?.balance ?? '0.00'}</span>
        <span className="text-sm font-medium text-gray-500">USDC</span>
      </div>
      <button
        onClick={openWalletBalanceModal}
        className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
      >
        <Eye size={16} />
        Ver balance
      </button>
    </div>
  );
}
