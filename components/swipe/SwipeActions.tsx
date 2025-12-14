import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SwipeActionsProps {
  onDislike: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export function SwipeActions({ onDislike, onLike, disabled = false }: SwipeActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="flex items-center justify-center gap-8 py-8 px-4"
    >
      {/* Dislike Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDislike}
        disabled={disabled}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-card border-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-white hover:border-destructive hover:shadow-glow-destructive transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Dislike"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-destructive/30 animate-ping opacity-0 group-hover:opacity-75" />
        <X className="w-7 h-7 relative z-10" strokeWidth={2.5} />
      </motion.button>

      {/* Center sparkle indicator */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-muted-foreground/50"
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>

      {/* Like Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onLike}
        disabled={disabled}
        className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-success text-white hover:shadow-glow-success transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Like"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-0 group-hover:opacity-30" />
        {/* Inner glow */}
        <span className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        <Heart className="w-8 h-8 relative z-10" fill="currentColor" />
      </motion.button>
    </motion.div>
  );
}
