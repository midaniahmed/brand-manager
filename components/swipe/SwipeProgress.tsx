import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SwipeProgressProps {
  current: number;
  total: number;
}

export function SwipeProgress({ current, total }: SwipeProgressProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  // Animated progress value with spring
  const springProgress = useSpring(progress, { stiffness: 100, damping: 20 });

  // Milestone markers
  const milestones = [25, 50, 75];
  const isNearComplete = progress >= 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-6 py-4"
    >
      {/* Stats row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.span
            key={current}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-foreground"
          >
            {current}
          </motion.span>
          <span className="text-muted-foreground">
            of {total}
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex items-center gap-1.5 text-sm ${
            isNearComplete ? 'text-success' : 'text-muted-foreground'
          }`}
        >
          {isNearComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CheckCircle2 className="w-4 h-4" />
            </motion.div>
          )}
          <span className="font-medium">{Math.round(progress)}%</span>
        </motion.div>
      </div>

      {/* Progress bar container */}
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        {/* Milestone markers */}
        {milestones.map((milestone) => (
          <div
            key={milestone}
            className={`absolute top-0 bottom-0 w-0.5 z-10 transition-colors duration-300 ${
              progress >= milestone ? 'bg-primary-foreground/30' : 'bg-muted-foreground/20'
            }`}
            style={{ left: `${milestone}%` }}
          />
        ))}

        {/* Progress fill with gradient */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: useTransform(springProgress, (v) => `${v}%`),
            background: isNearComplete
              ? 'linear-gradient(90deg, hsl(var(--success)), hsl(var(--success) / 0.8))'
              : 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </motion.div>

        {/* Glow effect when near complete */}
        {isNearComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-full shadow-glow-success"
          />
        )}
      </div>

      {/* Progress message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-2 text-xs text-center text-muted-foreground"
      >
        {progress === 0 && 'Start swiping to train the AI'}
        {progress > 0 && progress < 50 && 'Keep going! Every swipe helps'}
        {progress >= 50 && progress < 90 && "You're doing great!"}
        {progress >= 90 && progress < 100 && 'Almost there!'}
        {progress >= 100 && '🎉 All done!'}
      </motion.p>
    </motion.div>
  );
}
