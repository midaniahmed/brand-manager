'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedSwipeImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function OptimizedSwipeImage({
  src,
  alt,
  priority = false
}: OptimizedSwipeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 800px) 100vw, 500px"
      className="object-contain"
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

