'use client';

import { useState } from 'react';
import { usePollar } from '@pollar/react';

export function DepositForm({ goalId, onDeposited }: { goalId: string; onDeposited?: () => void }) {
  const { wallet, runTx } = usePollar();
  const [amount, setAmount] = useState('1');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDeposit(e: React.FormEvent) {
    e.preventDefault();
    if (!wallet?.address) return;
    setSubmitting(true);
    setError(null);

    // Self-payment intencional (destination === wallet.address): el ahorro
    // real de la meta se controla en Firestore (savedAmount, vía addDeposit).
    // Esta transacción en Stellar es una prueba on-chain simbólica de que la
    // acción de "depositar" ejecuta un pago real a través de Pollar, no un
    // movimiento de fondos hacia una bóveda/tesorería (fuera de alcance hoy).
    const result = await runTx('payment', {
      destination: wallet.address,
      amount,
      asset: { type: 'native' },
    });

    if (result.status === 'success' || result.status === 'pending') {
      await fetch(`/api/goals/${goalId}/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), txHash: result.hash }),
      });
      setSubmitting(false);
      onDeposited?.();
      return;
    }

    setSubmitting(false);
    setError(
      result.code === 'SDK_WALLET_NOT_READY'
        ? 'Tu wallet aún se está activando en la red. Intenta de nuevo en unos segundos.'
        : result.details ?? 'Error al procesar el depósito.'
    );
  }

  return (
    <form onSubmit={handleDeposit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.0000001"
        step="any"
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:w-32"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-base font-medium text-white disabled:opacity-50 sm:w-auto"
      >
        {submitting ? 'Procesando...' : 'Depositar'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
