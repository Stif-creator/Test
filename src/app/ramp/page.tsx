'use client';

import { usePollar } from '@pollar/react';
import { LoginButton } from '@/components/LoginButton';
import { ActivateFundingWalletForm } from '@/components/ActivateFundingWalletForm';

export default function RampPage() {
  const { isAuthenticated, openRampModal, wallet } = usePollar();

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">Comprar USDC</h1>
        <p className="text-sm text-gray-500">Paga con Bolivianos vía QR y recibe USDC en tu wallet.</p>

        {!isAuthenticated && (
          <div className="space-y-2 pt-2">
            <LoginButton />
            <p className="text-xs text-gray-500">Inicia sesión con Google — se crea tu wallet automáticamente.</p>
          </div>
        )}

        {isAuthenticated && (
          <div className="space-y-2 pt-2">
            <p className="break-all text-xs text-gray-500">Wallet: {wallet?.address}</p>
            <button
              onClick={openRampModal}
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-base font-medium text-white active:bg-emerald-700"
            >
              Pagar con QR
            </button>
            <div className="border-t border-gray-100 pt-4">
              <ActivateFundingWalletForm />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
