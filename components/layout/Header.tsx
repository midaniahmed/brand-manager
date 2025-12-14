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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 w-full"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-border/50" />

      {/* Gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-200"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          )}
          {title && (
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-xl font-bold tracking-tight"
            >
              {title}
            </motion.h1>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <ThemeToggle />
          <LogoutButton />
        </motion.div>
      </div>
    </motion.header>
  );
}
