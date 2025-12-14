'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Header } from '@/components/layout/Header';
import { ProgressBar } from '@/components/swipe/progress-bar/progress-bar';

import { Celebration } from '@/components/animations/Celebration';
import { EmptyState } from '@/components/ui/EmptyState';
import { useHaptic } from '@/core/hooks/useHaptic';
import { useGetBrandCampaignsQuery, useGetCampaignCreativesQuery, useLikeCreativeMutation, useDislikeCreativeMutation } from '@/core/services/api';
import { PickCard } from '@/components/swipe/pick-card/pick-card';
import { SwipeCreative } from '@/core/models/types';

export default function SwipePage({ params }: { params: Promise<{ brandId: string }> }) {
  const router = useRouter();
  const { brandId } = use(params);
  const { isSignedIn, isLoaded } = useAuth();
  const haptic = useHaptic();

  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCreatives, setProcessedCreatives] = useState<string[]>([]);

  // Fetch campaigns for the brand
  const { data: campaigns, isLoading: campaignsLoading } = useGetBrandCampaignsQuery(brandId as string, { skip: !brandId || !isLoaded || !isSignedIn });
  const campaignId = campaigns?.[0]?.campaignId;

  // Fetch creatives for the first campaign
  const { data: allCreatives = [], isLoading: creativesLoading } = useGetCampaignCreativesQuery(campaignId || '', { skip: !campaignId });

  // Filter to only completed creatives that haven't been processed yet
  const cardList = allCreatives.filter((c) => c.status === 'completed' && !processedCreatives.includes(c.creativeVariationId));

  // Calculate progress
  const totalCreatives = allCreatives.filter((c) => c.status === 'completed').length;
  const progress = processedCreatives.length / Math.max(totalCreatives, 1);

  // Mutations
  const [likeCreative] = useLikeCreativeMutation();
  const [dislikeCreative] = useDislikeCreativeMutation();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleEvaluate = async (card: SwipeCreative, status: 'good' | 'bad') => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      // Haptic feedback
      haptic.medium();

      if (status === 'good') {
        await likeCreative(card.creativeVariationId).unwrap();
      } else {
        await dislikeCreative(card.creativeVariationId).unwrap();
      }

      // Add to processed list
      setProcessedCreatives((prev) => [...prev, card.creativeVariationId]);
    } catch (error) {
      console.error('Evaluation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isComplete = cardList.length === 0;

  // Loading state
  if (!isLoaded || campaignsLoading || creativesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
          <div className="absolute inset-0 rounded-full blur-xl bg-primary/30 animate-pulse" />
        </div>
      </div>
    );
  }

  // No campaigns
  if (!campaignId) {
    return (
      <div className="flex flex-col min-h-screen">
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
  if (totalCreatives === 0) {
    return (
      <div className="flex flex-col min-h-screen">
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
  if (isComplete && processedCreatives.length > 0) {
    haptic.success();
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Creative Swipe" showBack />
        <Celebration reviewedCount={processedCreatives.length} onContinue={() => router.push('/brands')} />
      </div>
    );
  }

  // Main swipe interface
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header title="Creative Swipe" showBack />

      <div className="relative flex flex-col flex-1">
        <ProgressBar progress={progress} />

        <PickCard cardList={cardList} onEvaluate={handleEvaluate} />
      </div>
    </div>
  );
}
