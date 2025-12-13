'use client';

import { useClerk } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export function LogoutButton() {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: '/' });
  };

  return (
    <motion.button
      onClick={handleLogout}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-destructive/20 hover:text-destructive transition-colors"
      aria-label="Logout"
      title="Logout"
    >
      <LogOut className="h-5 w-5" />
    </motion.button>
  );
}
