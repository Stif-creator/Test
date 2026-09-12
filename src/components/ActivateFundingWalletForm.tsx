'use client';

import { useState } from 'react';
import { usePollar } from '@pollar/react';

// Destino fijo, no editable: la wallet de fondeo de la app, inactiva hasta
// recibir su primer pago (create_account) en Stellar mainnet.
const FUNDING_WALLET_ADDRESS = 'GA23YJU5DJ47DRUC7C7J3UVZVBUCBEDC7M6ZS3HE4QWR2MRK5NPU7OIZ';

export function ActivateFundingWalletForm() {
  const { getClient } = usePollar();
  const [startingBalance, setStartingBalance] = useState('3');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const result = await getClient().runTx('create_account', {
      destination: FUNDING_WALLET_ADDRESS,
      startingBalance,
    });

    setSubmitting(false);

    if (result.status === 'success' || result.status === 'pending') {
      setSuccess(`Wallet de fondeo activada con ${startingBalance} XLM.`);
      return;
    }

    setError(result.details ?? 'Error al activar la wallet de fondeo.');
  }

  return (
    <form onSubmit={handleActivate} className="space-y-2 text-left">
      <p className="break-all text-xs text-gray-500">Destino: {FUNDING_WALLET_ADDRESS}</p>
      <div className="flex gap-2">
        <input
          type="number"
          value={startingBalance}
          onChange={(e) => setStartingBalance(e.target.value)}
          min="1"
          step="any"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:w-32"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-base font-medium text-white disabled:opacity-50 sm:w-auto"
        >
          {submitting ? 'Activando...' : 'Activar wallet de fondeo'}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-emerald-700">{success}</p>}
    </form>
  );
}
