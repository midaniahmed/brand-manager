import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
      >
        {/* Hero Image with Overlay */}
        <div className="relative h-64 overflow-hidden bg-muted">
          <Image
            src={brand.logoAsset?.assetUrl || '/placeholder-img.svg'}
            alt={brand.name}
            fill
            className="bg-gray-100 object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Animated accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 z-20"
            style={{ background: 'var(--primary-gradient)' }}
            initial={{ width: '0%' }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Brand Name */}
            <div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{brand.name}</h2>
              <p className="text-sm text-muted-foreground">{brand.industry}</p>
            </div>
          </div>

          {/* Arrow Icon with animation */}
          <motion.div
            className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        </div>
      </motion.div>
    </Link>
  );
}
