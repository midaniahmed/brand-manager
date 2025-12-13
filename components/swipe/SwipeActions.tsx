import React from 'react';
import { X, Heart } from 'lucide-react';

interface SwipeActionsProps {
  onDislike: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export function SwipeActions({ onDislike, onLike, disabled = false }: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-6 px-4">
      {/* Dislike Button */}
      <button
        onClick={onDislike}
        disabled={disabled}
        className="group flex items-center justify-center w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all active:scale-90 disabled:opacity-50 disabled:pointer-events-none shadow-lg"
        aria-label="Dislike"
      >
        <X className="w-7 h-7" strokeWidth={2.5} />
      </button>

      {/* Like Button */}
      <button
        onClick={onLike}
        disabled={disabled}
        className="group flex items-center justify-center w-20 h-20 rounded-full bg-success text-success-foreground hover:bg-success/90 transition-all active:scale-90 disabled:opacity-50 disabled:pointer-events-none shadow-xl"
        aria-label="Like"
      >
        <Heart className="w-8 h-8" fill="currentColor" />
      </button>
    </div>
  );
}
