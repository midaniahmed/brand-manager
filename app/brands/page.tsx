'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { BrandCard } from '@/components/brands/BrandCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGetBrandsQuery } from '@/core/services/api';

// Skeleton component for loading state
function BrandCardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl bg-card border border-border/50"
    >
      {/* Image skeleton */}
      <div className="relative h-56 bg-muted overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
      {/* Content skeleton */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-muted rounded-lg w-3/4 shimmer" />
          <div className="h-4 bg-muted rounded-lg w-1/2 shimmer" />
        </div>
        <div className="h-12 w-12 rounded-full bg-muted shimmer" />
      </div>
    </motion.div>
  );
}

export default function BrandsPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const {
    data: brands = [],
    isLoading,
    error,
  } = useGetBrandsQuery(undefined, {
    skip: !isLoaded || !isSignedIn,
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Your Brands" showBack={false} />
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((index) => (
              <BrandCardSkeleton key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Your Brands" showBack={false} />
        <EmptyState
          icon="⚠️"
          title="Failed to Load Brands"
          message="There was an error loading your brands. Please try again."
          action={{
            label: 'Retry',
            onClick: () => window.location.reload(),
          }}
        />
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Your Brands" showBack={false} />
        <EmptyState icon="🏢" title="No Brands Found" message="You don't have any brands yet. Create one to get started!" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Your Brands" showBack={false} />

      {/* Page content with animated container */}
      <motion.div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Brand count indicator */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{brands.length}</span> brand{brands.length !== 1 ? 's' : ''} ready to swipe
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">All synced</span>
          </div>
        </motion.div>

        {/* Brand grid with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brands.map((brand, index) => (
              <BrandCard key={brand.id || index} brand={brand} index={index} />
            ))}
          </div>
        </AnimatePresence>
      </motion.div>

      {/* Floating gradient accent at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-linear-to-t from-primary/5 to-transparent pointer-events-none" />
    </div>
  );
}
