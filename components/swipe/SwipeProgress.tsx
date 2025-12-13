import React from 'react';
import { Progress } from '@/components/ui/Progress';

interface SwipeProgressProps {
  current: number;
  total: number;
}

export function SwipeProgress({ current, total }: SwipeProgressProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          {current} of {total} reviewed
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      <Progress value={current} max={total} />
    </div>
  );
}
