'use client';

import { SessionProvider } from 'next-auth/react';

const ClientSessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionWrapper;
