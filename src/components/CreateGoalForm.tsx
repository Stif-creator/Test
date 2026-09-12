'use client';

import { useState } from 'react';
import { usePollar } from '@pollar/react';

export function CreateGoalForm({ onCreated }: { onCreated: () => void }) {
  const { wallet } = usePollar();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!wallet?.address) return;

    setLoading(true);
    await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress: wallet.address, name, targetAmount }),
    });
    setLoading(false);
    setName('');
    setTargetAmount('');
    onCreated();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        placeholder="Nombre de la meta"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base"
      />
      <input
        type="number"
        placeholder="Monto objetivo (XLM)"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-base font-medium text-white disabled:opacity-50 sm:w-auto"
      >
        {loading ? 'Creando...' : 'Crear meta'}
      </button>
    </form>
  );
}