import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { Heart, X } from 'lucide-react';
import type { SwipeCreative } from '@/core/models/types';

interface SwipeCardProps {
  creative: SwipeCreative;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeCard({ creative, onSwipeLeft, onSwipeRight }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Overlay colors for feedback
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0]);

  // Background glow based on direction
  const likeGlow = useTransform(x, [0, 150], [0, 0.6]);
  const dislikeGlow = useTransform(x, [-150, 0], [0.6, 0]);

  const handleDragEnd = (_event: any, info: PanInfo) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      // Swiped right → Like
      onSwipeRight();
    } else if (info.offset.x < -threshold) {
      // Swiped left → Dislike
      onSwipeLeft();
    }
  };

  return (
    <div className="relative flex items-center justify-center px-4 py-8 flex-1">
      {/* Ambient glow effects */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: likeGlow }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-success/30 blur-3xl rounded-full" />
      </motion.div>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: dislikeGlow }}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-destructive/30 blur-3xl rounded-full" />
      </motion.div>

      <motion.div
        className="relative w-full max-w-sm touch-none"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* Card with enhanced styling */}
        <motion.div
          className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-card shadow-premium"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Creative Image */}
          <Image src={creative.imageUrl} alt="Creative" fill className="object-contain" priority sizes="(max-width: 768px) 100vw, 50vw" />

          {/* Like Overlay (Green) */}
          <motion.div className="absolute inset-0 bg-gradient-to-br from-success/80 to-success/60 flex items-center justify-center" style={{ opacity: likeOpacity }}>
            <motion.div className="flex flex-col items-center gap-3" initial={{ scale: 0.8, rotate: -12 }} animate={{ scale: 1, rotate: -12 }}>
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                <Heart className="w-12 h-12 text-white" fill="white" />
              </div>
              <span className="text-white text-3xl font-bold tracking-wider uppercase">Like</span>
            </motion.div>
          </motion.div>

          {/* Dislike Overlay (Red) */}
          <motion.div className="absolute inset-0 bg-gradient-to-br from-destructive/80 to-destructive/60 flex items-center justify-center" style={{ opacity: dislikeOpacity }}>
            <motion.div className="flex flex-col items-center gap-3" initial={{ scale: 0.8, rotate: 12 }} animate={{ scale: 1, rotate: 12 }}>
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                <X className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
              <span className="text-white text-3xl font-bold tracking-wider uppercase">Nope</span>
            </motion.div>
          </motion.div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-16">
            <p className="text-white text-sm mb-2 line-clamp-2 leading-relaxed">{creative.prompt}</p>
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                {creative.width} × {creative.height}
              </span>
            </div>
          </div>

          {/* Corner gradient accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/20 to-transparent pointer-events-none" />
        </motion.div>

        {/* Card shadow */}
        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 rounded-full blur-xl -z-10" />
      </motion.div>
    </div>
  );
}
