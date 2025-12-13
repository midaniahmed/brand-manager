import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface CelebrationProps {
  onContinue: () => void;
  reviewedCount: number;
}

export function Celebration({ onContinue, reviewedCount }: CelebrationProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
        className="text-center max-w-md"
      >
        {/* Emoji Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
          All Done!
        </h2>

        {/* Message */}
        <p className="text-lg text-muted-foreground mb-2">
          You've reviewed all {reviewedCount} creatives
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Great job helping improve the AI model! 🚀
        </p>

        {/* Action Button */}
        <Button onClick={onContinue} variant="primary" size="lg" className="w-full">
          Choose Another Brand
        </Button>
      </motion.div>
    </div>
  );
}
