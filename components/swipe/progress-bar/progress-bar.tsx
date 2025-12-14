interface Props {
  progress: number; // 0 - 1
}

export function ProgressBar({ progress }: Props) {
  const progressPercentage = Math.floor(progress * 100);

  return (
    <div className="absolute top-0 right-0 left-0 h-1.5 bg-gray-200">
      <div className="overflow-hidden h-full bg-primary transition-width duration-300" style={{ width: `${progressPercentage}%` }}>
        Progress: {Math.floor(progressPercentage)}%
      </div>
    </div>
  );
}
