'use client';

import { usePollar } from '@pollar/react';

export function LogoutButton() {
  const { logout } = usePollar();

  return (
    <button
      onClick={() => logout()}
      className="shrink-0 text-sm font-medium text-gray-500 underline"
    >
      Cerrar sesión
    </button>
  );
}
