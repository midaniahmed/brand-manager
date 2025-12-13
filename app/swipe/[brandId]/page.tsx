'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Header } from '@/components/layout/Header';
import { SwipeCard } from '@/components/swipe/SwipeCard';
import { SwipeActions } from '@/components/swipe/SwipeActions';
import { SwipeProgress } from '@/components/swipe/SwipeProgress';
import { Celebration } from '@/components/animations/Celebration';
import { EmptyState } from '@/components/ui/EmptyState';
import { useImagePreload } from '@/core/hooks/useImagePreload';
import { useHaptic } from '@/core/hooks/useHaptic';
import { useGetBrandCampaignsQuery, useGetCampaignCreativesQuery, useLikeCreativeMutation, useDislikeCreativeMutation } from '@/core/services/api';

export default function SwipePage({ params }: { params: { brandId: string } }) {
  const router = useRouter();
  const { brandId } = params;
  const { isSignedIn, isLoaded } = useAuth();
  const haptic = useHaptic();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch campaigns for the brand
  const { data: campaigns, isLoading: campaignsLoading } = useGetBrandCampaignsQuery(brandId as string, { skip: !brandId || !isLoaded || !isSignedIn });
  const campaignId = campaigns?.[0]?.campaignId;

  // Fetch creatives for the first campaign
  const { data: allCreatives = [], isLoading: creativesLoading } = useGetCampaignCreativesQuery(campaignId || '', { skip: !campaignId });

  // Filter to only completed creatives
  const completedCreatives = allCreatives.filter((c) => c.status === 'completed');

  // Preload next images
  useImagePreload(completedCreatives, currentIndex);

  // Mutations
  const [likeCreative] = useLikeCreativeMutation();
  const [dislikeCreative] = useDislikeCreativeMutation();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentCreative || isProcessing) return;

    setIsProcessing(true);

    try {
      // Haptic feedback
      haptic.medium();

      if (direction === 'right') {
        await likeCreative(currentCreative.creativeVariationId).unwrap();
      } else {
        await dislikeCreative(currentCreative.creativeVariationId).unwrap();
      }

      // Move to next creative
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error('Swipe action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const currentCreative = completedCreatives[currentIndex];
  const totalCreatives = completedCreatives.length;
  const isComplete = currentIndex >= totalCreatives;

  // Loading state
  if (!isLoaded || campaignsLoading || creativesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // No campaigns
  if (!campaignId) {
    return (
      <div>
        <Header title="Creative Swipe" showBack />
        <EmptyState
          icon="📋"
          title="No Campaigns Found"
          message="This brand doesn't have any campaigns yet."
          action={{
            label: 'Choose Another Brand',
            onClick: () => router.push('/brands'),
          }}
        />
      </div>
    );
  }

  // No creatives
  if (totalCreatives === 0 && !isComplete) {
    return (
      <div>
        <Header title="Creative Swipe" showBack />
        <EmptyState
          icon="🎨"
          title="No Creatives Ready"
          message="There are no completed creatives to review yet."
          action={{
            label: 'Choose Another Brand',
            onClick: () => router.push('/brands'),
          }}
        />
      </div>
    );
  }

  // Celebration - All done!
  if (isComplete) {
    haptic.success();
    return (
      <div>
        <Header title="Creative Swipe" showBack />
        <Celebration reviewedCount={totalCreatives} onContinue={() => router.push('/brands')} />
      </div>
    );
  }

  // Main swipe interface
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header title="Creative Swipe" showBack />

      <SwipeProgress current={currentIndex} total={totalCreatives} />

      <SwipeCard creative={currentCreative} onSwipeLeft={() => handleSwipe('left')} onSwipeRight={() => handleSwipe('right')} />

      <SwipeActions onDislike={() => handleSwipe('left')} onLike={() => handleSwipe('right')} disabled={isProcessing} />
    </div>
  );
}
