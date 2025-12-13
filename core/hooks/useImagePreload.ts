import { useEffect } from 'react';
import type { SwipeCreative } from '@/core/models/types';

/**
 * Preload the next 3 images in the queue for smooth swiping
 */
export function useImagePreload(creatives: SwipeCreative[], currentIndex: number) {
  useEffect(() => {
    // Preload next 3 creatives in the queue
    const nextCreatives = creatives.slice(currentIndex + 1, currentIndex + 4);

    nextCreatives.forEach((creative) => {
      const img = new Image();
      img.src = creative.imageUrl;
    });
  }, [creatives, currentIndex]);
}
