'use client';

import { useEffect, useState } from 'react';
import { usePollar } from '@pollar/react';

interface DepositMeta {
  goalName: string;
  amount: number;
}

export function TxHistory({ refreshKey }: { refreshKey: number }) {
  const { getClient, txHistory, wallet } = usePollar();
  const [depositsByHash, setDepositsByHash] = useState<Record<string, DepositMeta>>({});

  useEffect(() => {
    if (!wallet?.address) return;
    getClient().fetchTxHistory({ chain: 'STELLAR', limit: 20 });
    fetch(`/api/goals/deposits?wallet=${wallet.address}`)
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, DepositMeta> = {};
        for (const d of data.deposits ?? []) {
          map[d.txHash] = { goalName: d.goalName, amount: d.amount };
        }
        setDepositsByHash(map);
      });
  }, [wallet?.address, getClient, refreshKey]);

  if (txHistory.step === 'error') return <p className="text-sm text-gray-500">No se pudo cargar el historial.</p>;
  if (txHistory.step !== 'loaded') return <p className="text-sm text-gray-500">Cargando historial...</p>;

  const records = txHistory.data.records;
  if (records.length === 0) return <p className="text-sm text-gray-500">Todavía no tienes transacciones.</p>;

  return (
    <ul className="space-y-2">
      {records.map((record) => {
        const deposit = depositsByHash[record.hash];
        return (
          <li key={record.id} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm">
            {deposit
              ? `Depositaste ${deposit.amount} XLM hacia la meta "${deposit.goalName}"`
              : record.summary}
            {' — '}
            <span className="text-gray-500">{new Date(record.createdAt).toLocaleString()}</span>
          </li>
        );
      })}
    </ul>
  );
}
