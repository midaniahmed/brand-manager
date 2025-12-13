import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, message, icon = '📭', action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center">
      <div className="text-6xl mb-4 animate-bounce-in">{icon}</div>
      <h2 className="text-2xl font-bold mb-2 text-foreground">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
