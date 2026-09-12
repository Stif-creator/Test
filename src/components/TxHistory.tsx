'use client';

import { useEffect, useState } from 'react';
import { usePollar } from '@pollar/react';
import { ArrowUpRight } from 'lucide-react';

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

  // Decisión de presentación, no de datos: ocultamos cualquier transacción de
  // Pollar sin match en nuestros deposits de Firestore (trustlines, pruebas
  // viejas en XLM, etc.) para no mostrarle ruido técnico al usuario final.
  // Esas transacciones siguen existiendo en Stellar tal cual, solo dejamos de
  // listarlas en esta vista.
  const depositRecords = txHistory.data.records.filter((record) => depositsByHash[record.hash]);
  if (depositRecords.length === 0) return <p className="text-sm text-gray-500">Todavía no tienes transacciones.</p>;

  return (
    <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200 px-4">
      {depositRecords.map((record) => {
        const deposit = depositsByHash[record.hash];
        return (
          <li key={record.id} className="flex items-start justify-between gap-3 py-3">
            <div className="flex items-start gap-3">
              <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm">Depositaste hacia la meta &quot;{deposit.goalName}&quot;</p>
                <p className="text-xs text-gray-500">{new Date(record.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <p className="shrink-0 text-sm font-bold text-emerald-700">+{deposit.amount} USDC</p>
          </li>
        );
      })}
    </ul>
  );
}
