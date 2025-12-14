'use client';

import React, { useEffect, useState } from 'react';
import { SignIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function IndexPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
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
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
          <div className="absolute inset-0 rounded-full blur-xl bg-primary/30 animate-pulse" />
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return null; // Will redirect
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-80" />

      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          initial={{ x: '-20%', y: '-20%' }}
          animate={{
            x: ['-20%', '10%', '-20%'],
            y: ['-20%', '20%', '-20%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
          initial={{ x: '20%', y: '50%' }}
          animate={{
            x: ['20%', '-10%', '20%'],
            y: ['50%', '30%', '50%'],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-success/15 blur-3xl"
          initial={{ y: '10%' }}
          animate={{
            y: ['10%', '-10%', '10%'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 flex flex-col items-center">
        {/* Logo/Title */}
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }} className="flex flex-col items-center justify-center mb-8">
          {/* Logo with glow */}
          <motion.div className="relative mb-6" animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <img src="/logo/logo-blue.svg" alt="Creative Swipe" className="h-16 w-auto relative z-10" />
            <div className="absolute inset-0 blur-2xl bg-primary/40 scale-150" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-primary to-success bg-clip-text text-transparent">Creative Swipe</h1>
          {/* Title with gradient */}

          {/* Subtitle */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Train your brand AI with a swipe</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div> */}
        </motion.div>

        {/* Clerk Sign In with glassmorphism */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="relative">
          {/* Glass effect container */}

          <div className="relative">
            <SignIn
              routing="hash"
              afterSignInUrl="/brands"
              appearance={{
                elements: {
                  rootBox: 'mx-auto',
                  card: 'shadow-none bg-transparent',
                  headerTitle: 'text-foreground',
                  headerSubtitle: 'text-muted-foreground',
                  formButtonPrimary: 'bg-primary hover:bg-primary/90 transition-all hover:shadow-glow-sm',
                  formFieldInput: 'bg-background border-border focus:border-primary',
                  footerActionLink: 'text-primary hover:text-primary/80',
                },
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
