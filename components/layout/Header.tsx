'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LogoutButton } from '@/components/ui/LogoutButton';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showThemeToggle?: boolean;
}

export function Header({ title, showBack = false, showThemeToggle = true }: HeaderProps) {
  const router = useRouter();

  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="sticky top-0 z-50 w-full">
      {/* Premium Glassmorphism background */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-2xl border-b border-white/10 dark:border-white/5 shadow-sm" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Animated accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
      />

      <div className="relative container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 hover:bg-accent/10 hover:border-accent/20 hover:text-accent transition-all duration-300 shadow-sm backdrop-blur-sm group"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>
          )}

          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 border border-primary/10 shadow-inner overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent opacity-50" />
              <img src="/logo/logo-blue.svg" alt="Logo" className="w-5 h-5 relative z-10 drop-shadow-sm" />
            </motion.div>

            {title && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80"
              >
                {title}
              </motion.h1>
            )}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="flex items-center gap-2">
          {showThemeToggle && (
            <div className="p-1 rounded-full bg-background/30 border border-border/30 backdrop-blur-md shadow-inner">
              <ThemeToggle />
            </div>
          )}
          <div className="pl-2 border-l border-border/40 ml-1">
            <LogoutButton />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
