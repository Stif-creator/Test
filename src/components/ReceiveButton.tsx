'use client';

import { usePollar } from '@pollar/react';
import { QrCode } from 'lucide-react';

export function ReceiveButton() {
  const { openReceiveModal } = usePollar();

  return (
    <button
      onClick={openReceiveModal}
      className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
    >
      <QrCode size={16} />
      Recibir
    </button>
  );
}
