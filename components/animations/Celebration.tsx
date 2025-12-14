import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, Star, PartyPopper, Trophy } from 'lucide-react';

interface CelebrationProps {
  onContinue: () => void;
  reviewedCount: number;
}

// Confetti particle component
function ConfettiParticle({ index }: { index: number }) {
  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];
  const randomColor = colors[index % colors.length];
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 2;
  const randomDuration = 2 + Math.random() * 2;
  const randomSize = 8 + Math.random() * 8;

  return (
    <motion.div
      className="absolute rounded-sm"
      style={{
        left: `${randomX}%`,
        top: -20,
        width: randomSize,
        height: randomSize,
        backgroundColor: randomColor,
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: '100vh',
        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: 'linear',
      }}
    />
  );
}

export function Celebration({ onContinue, reviewedCount }: CelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-1 items-center justify-center min-h-[70vh] px-6 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <ConfettiParticle key={i} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 text-primary/20"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Star className="w-12 h-12" fill="currentColor" />
      </motion.div>
      <motion.div
        className="absolute top-32 right-12 text-accent/20"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>
      <motion.div className="absolute bottom-32 left-16 text-success/20" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        <PartyPopper className="w-8 h-8" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
        className="relative z-10 text-center max-w-md"
      >
        {/* Trophy Icon with glow */}
        <motion.div
          className="relative inline-block mb-8"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="relative z-10 p-6 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 shadow-2xl"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: [0, 10, 0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Trophy className="w-16 h-16 text-white" />
          </motion.div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-yellow-400/50 blur-2xl -z-10 scale-150" />
        </motion.div>

        {/* Title with gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold mb-4 bg-linear-to-r from-primary to-success bg-clip-text text-transparent"
        >
          Amazing Work!
        </motion.h2>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-lg font-semibold text-foreground">{reviewedCount} creatives reviewed</span>
          </div>
        </motion.div>

        {/* Message */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-muted-foreground mb-8 leading-relaxed">
          Your feedback is helping train a smarter AI model. <br />
          <span className="text-primary font-medium">Thank you for contributing! 🚀</span>
        </motion.p>

        {/* Action Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
          <Button onClick={onContinue} variant="gradient" size="lg" className="w-full shadow-glow animate-pulse-glow">
            Choose Another Brand
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
