import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, message, icon = '📭', action }: EmptyStateProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] px-6 text-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          initial={{ x: -100, y: -100, scale: 0.8 }}
          animate={{
            x: [-100, 50, -100],
            y: [-100, 50, -100],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl"
          initial={{ x: 100, y: 100, scale: 1 }}
          animate={{
            x: [100, -50, 100],
            y: [100, -50, 100],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.1
          }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl mb-6"
          >
            {icon}
          </motion.div>
          {/* Subtle glow under icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-primary/20 blur-2xl" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold mb-3 text-foreground"
        >
          {title}
        </motion.h2>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed"
        >
          {message}
        </motion.p>

        {/* Action Button */}
        {action && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              onClick={action.onClick}
              variant="gradient"
              size="lg"
              className="shadow-glow"
            >
              {action.label}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
