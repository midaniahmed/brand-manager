'use client';

import React, { useEffect, useState } from 'react';
import { SignIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function IndexPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/brands');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return null; // Will redirect
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Logo/Title */}
      <div className="flex flex-col items-center justify-center mb-8">
        {mounted && <img src="/logo/logo-blue.svg" alt="Creative Swipe" className="h-16 w-auto mb-4" />}
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">Creative Swipe</h1>
      </div>
      {/* Clerk Sign In */}
      <SignIn
        routing="hash"
        afterSignInUrl="/brands"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-xl rounded-2xl',
          },
        }}
      />
    </div>
  );
}
