'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { useAuth } from '@clerk/nextjs';
import { store } from '@/store';
import { AuthManager } from '@/core/services/auth/AuthManager';

function AuthTokenHandler({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Setup token provider for API calls
    AuthManager.getInstance().setTokenProvider(async () => {
      return await getToken();
    });
    setIsReady(true);
  }, [getToken]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <Provider store={store}>
        <AuthTokenHandler>{children}</AuthTokenHandler>
      </Provider>
    </ThemeProvider>
  );
}
