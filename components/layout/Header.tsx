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
    <motion.header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors" aria-label="Go back">
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {title && <h1 className="text-xl font-bold tracking-tight">{title}</h1>}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
