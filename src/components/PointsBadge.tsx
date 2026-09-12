'use client';

import { useEffect, useState } from 'react';
import { usePollar } from '@pollar/react';
import { Star } from 'lucide-react';

export function PointsBadge({ refreshKey }: { refreshKey: number }) {
  const { wallet } = usePollar();
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    if (!wallet?.address) return;
    fetch(`/api/goals/deposits?wallet=${wallet.address}`)
      .then((res) => res.json())
      .then((data) => setPoints((data.deposits ?? []).length));
  }, [wallet?.address, refreshKey]);

  if (points === null) return null;

  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
      <Star size={14} className="fill-amber-500 text-amber-500" />
      {points} puntos
    </p>
  );
}
