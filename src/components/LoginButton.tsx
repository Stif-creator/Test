'use client';

import { usePollar } from '@pollar/react';

export function LoginButton() {
  const { login } = usePollar();

  return (
    <button
      onClick={() => login({ provider: 'google' })}
      className="w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-medium text-white active:bg-blue-700 sm:w-auto"
    >
      Continuar con Google
    </button>
  );
}