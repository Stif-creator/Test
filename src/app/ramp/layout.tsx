'use client';

import { PollarProvider } from '@pollar/react';

export default function RampLayout({ children }: { children: React.ReactNode }) {
  return (
    <PollarProvider
      client={{
        apiKey: process.env.NEXT_PUBLIC_POLLAR_PUBLISHABLE_KEY_MAINNET!,
        stellarNetwork: 'mainnet',
      }}
    >
      {children}
    </PollarProvider>
  );
}
