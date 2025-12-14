import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import type { Brand } from '@/core/models/types';

interface BrandCardProps {
  brand: Brand;
  index: number;
}

export function BrandCard({ brand, index = 0 }: BrandCardProps) {
  return (
    <Link href={`/swipe/${brand.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 transition-all duration-500"
      >
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 animate-gradient-shift"
            style={{ backgroundSize: '200% 200%' }}
          />
        </div>

        {/* Glow effect on hover */}
        <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none bg-gradient-to-br from-primary/30 via-transparent to-accent/30" />

        {/* Card content container */}
        <div className="relative bg-card rounded-3xl overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/10 transition-shadow duration-500">
          {/* Hero Image with Overlay */}
          <div className="relative h-56 overflow-hidden bg-muted">
            <Image
              src={brand.logoAsset?.assetUrl || '/placeholder-img.svg'}
              alt={brand.name}
              fill
              className="bg-gray-100 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              unoptimized
            />

            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>

            {/* Floating sparkle indicator */}
            <motion.div initial={{ opacity: 0, scale: 0 }} whileHover={{ opacity: 1, scale: 1 }} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>

            {/* Animated accent line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 p-5 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {/* Brand Name with gradient on hover */}
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">{brand.name}</h2>
              <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                {brand.industry || 'Ready to swipe'}
              </p>
            </div>

            {/* Arrow Icon with animation */}
            <motion.div
              className="flex-shrink-0 ml-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-300"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowRight className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
