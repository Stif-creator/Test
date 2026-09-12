'use client';

import { useEffect, useState } from 'react';
import { usePollar } from '@pollar/react';

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
    <p className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
      ⭐ {points} puntos
    </p>
  );
}
