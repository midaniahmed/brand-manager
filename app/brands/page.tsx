'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Header } from '@/components/layout/Header';
import { BrandCard } from '@/components/brands/BrandCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGetBrandsQuery } from '@/core/services/api';

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header title="Brands" showBack={false} />
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
      <div>
        <Header title="Brands" showBack={false} />
        <EmptyState icon="🏢" title="No Brands Found" message="You don't have any brands yet. Create one to get started!" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Brands" showBack={false} />

      <div className="container max-w-4xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={index + 1} brand={brand} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
