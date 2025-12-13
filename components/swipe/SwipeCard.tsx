import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Image from 'next/image';
import type { SwipeCreative } from '@/core/models/types';

interface SwipeCardProps {
  creative: SwipeCreative;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeCard({ creative, onSwipeLeft, onSwipeRight }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Overlay colors for feedback
  const likeOpacity = useTransform(x, [0, 100], [0, 0.7]);
  const dislikeOpacity = useTransform(x, [-100, 0], [0.7, 0]);

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
    <div className="flex items-center justify-center px-4 py-8 flex-1">
      <motion.div
        className="relative w-full max-w-md touch-none"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-card">
          {/* Creative Image */}
          <Image
            src={creative.imageUrl}
            alt="Creative"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Like Overlay (Green) */}
          <motion.div
            className="absolute inset-0 bg-success flex items-center justify-center"
            style={{ opacity: likeOpacity }}
          >
            <div className="text-white text-6xl font-bold rotate-12 border-4 border-white px-8 py-4 rounded-2xl">
              LIKE
            </div>
          </motion.div>

          {/* Dislike Overlay (Red) */}
          <motion.div
            className="absolute inset-0 bg-destructive flex items-center justify-center"
            style={{ opacity: dislikeOpacity }}
          >
            <div className="text-white text-6xl font-bold -rotate-12 border-4 border-white px-8 py-4 rounded-2xl">
              NOPE
            </div>
          </motion.div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-white text-sm mb-2 line-clamp-3">{creative.prompt}</p>
            <p className="text-white/60 text-xs">
              {creative.width} × {creative.height}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
