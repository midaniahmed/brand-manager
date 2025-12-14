import { useLayoutEffect, useState } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface Props {
  progress: number; // -1 ~ 1
  isInteracting: boolean;
}

export function ProgressMask({ progress, isInteracting }: Props) {
  const [status, setStatus] = useState<'good' | 'bad' | null>(null);
  const isGood = status === 'good';
  const isBad = status === 'bad';

  useLayoutEffect(() => {
    if (progress > 0) {
      setStatus('good');
    }

    if (progress < 0) {
      setStatus('bad');
    }
  }, [progress]);

  const dasharray = Math.PI * 2 * 27;
  const dashoffset = dasharray - Math.PI * 2 * 27 * clamp(progress, -1, 1);
  const isActive = Math.abs(progress) === 1;

  return (
    <div
      className={['opacity-0 pointer-events-none absolute top-0 right-0 bottom-0 left-0 text-center', isGood && 'bg-[#00bfa5]', isBad && 'bg-[#f44336]'].filter(Boolean).join(' ')}
      style={{
        opacity: Math.abs(progress) * 0.95,
        transition: isInteracting ? '' : 'opacity 0.3s linear',
      }}
    >
      <div className={['absolute top-5 text-[0px]', isGood && 'left-5', isBad && 'right-5'].filter(Boolean).join(' ')}>
        <svg className="-rotate-90" width="60" height="60" viewBox="0 0 60 60">
          <circle
            className={[
              'fill-none stroke-[#e6e6e6] opacity-100 rounded-[50%] transition-opacity duration-[400ms] ease-out',
              'stroke-[4px]',
              isGood && 'stroke-[#00bfa5]',
              isBad && 'stroke-[#f44336]',
            ]
              .filter(Boolean)
              .join(' ')}
            cx="30"
            cy="30"
            r="27"
            strokeLinecap="round"
            strokeDasharray={dasharray}
            strokeDashoffset={dashoffset}
            style={{
              transition: isInteracting ? '' : 'stroke-dashoffset 0.3s linear',
            }}
          />
        </svg>

        <div
          className={[
            'flex items-center justify-center absolute top-1/2 left-1/2 w-[54px] h-[54px]',
            'rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[400ms] ease-out',
            isActive ? 'opacity-100' : 'opacity-0',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {isGood && <img src="/thumb-up.svg" className="w-[30px] h-[30px]" alt="good" />}
          {isBad && <img src="/thumb-down.svg" className="w-[30px] h-[30px]" alt="bad" />}
        </div>
      </div>
    </div>
  );
}
