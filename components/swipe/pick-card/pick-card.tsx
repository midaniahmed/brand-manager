import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ProgressMask } from '../progress-mask/progress-mask';
import { SwipeCreative } from '@/core/models/types';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface InteractionStart {
  x: number;
  y: number;
  $card?: HTMLDivElement;
}

export type EvaluateStatus = 'good' | 'bad';

interface Props {
  cardList: SwipeCreative[];
  onEvaluate?: (card: SwipeCreative, status: EvaluateStatus) => void;
}

/**
 * Get position of mouse or touch event
 * @param event mouse or touch event
 * @returns position of x and y
 */
const getPosition = (event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
  if ('touches' in event) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
};

export function PickCard({ cardList = [], onEvaluate }: Props) {
  const interactionRef = useRef<InteractionStart>(undefined);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(cardList.length - 1);

  // animation progress(-1 ~ 1)
  const [progress, setProgress] = useState(0);

  // Sync activeIndex when cardList changes
  useEffect(() => {
    setActiveIndex(cardList.length - 1);
  }, [cardList.length]);

  /**
   * Start interaction
   * @param e mouse or touch event
   * @returns void
   */
  const handleStart = useCallback((e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    document.body.classList.add('overflow-hidden');
    e.currentTarget.style.transition = '';

    const { x, y } = getPosition(e);
    interactionRef.current = {
      x,
      y,
      $card: e.currentTarget,
    };

    setIsInteracting(true);
  }, []);

  /**
   * Move interaction
   * @param e mouse or touch event
   * @returns void
   */
  const handleMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!interactionRef.current) {
      return;
    }

    const $card = interactionRef.current.$card;
    if (!$card) {
      return;
    }

    const { x, y } = getPosition(e);
    const dx = (x - interactionRef.current.x) * 0.8;
    const dy = (y - interactionRef.current.y) * 0.5;
    const deg = (dx / 600) * -30;

    $card.style.transform = `translate(${dx}px, ${dy}px) rotate(${deg}deg)`;

    const newProgress = clamp(dx / 100, -1, 1);
    setProgress(newProgress);
  }, []);

  /**
   * End interaction
   * @returns void
   */
  const handleEnd = useCallback(() => {
    const $card = interactionRef.current?.$card;
    if (!$card) {
      return;
    }

    const isSelect = Math.abs(progress) === 1;
    const isGood = progress === 1;
    const [, currentXString] = $card.style.transform.match(/translate\(([^,]+), [^)]+\)/) || [];
    const [, currentYString] = $card.style.transform.match(/translate\([^,]+, ([^)]+)\)/) || [];
    const [, currentRotateString] = $card.style.transform.match(/rotate\(([^)]+)\)/) || [];

    const currentX = parseInt(currentXString, 10);
    const currentY = parseInt(currentYString, 10);
    const currentRotate = parseInt(currentRotateString, 10);
    const dx = isGood ? window.innerWidth : (window.innerWidth + $card.getBoundingClientRect().width) * -1;

    $card.style.transition = 'transform 0.3s ease-in-out';
    $card.style.transform = isSelect ? `translate(${currentX + dx}px, ${currentY}px) rotate(${currentRotate * 2}deg)` : 'translate(0, 0) rotate(0deg)';

    interactionRef.current = undefined;
    setIsInteracting(false);
    setProgress(0);

    if (isSelect) {
      setActiveIndex((prev) => prev - 1);
    }

    setTimeout(() => {
      document.body.classList.remove('overflow-hidden');

      if (isSelect) {
        const selectedCard = cardList[cardList.length - 1];
        onEvaluate?.(selectedCard, isGood ? 'good' : 'bad');
      }
    }, 300);
  }, [cardList, onEvaluate, progress]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [handleMove, handleEnd]);

  /**
   * Good or Bad evaluate
   */
  const handleEvaluate = useCallback(
    (status: EvaluateStatus) => {
      window.navigator?.vibrate?.(50);
      const selectedCard = cardList[cardList.length - 1];

      if (!selectedCard || activeIndex !== cardList.length - 1) {
        return;
      }

      const selectedCardElement = cardRefs.current.get(selectedCard.creativeVariationId);
      if (!selectedCardElement) return;

      setProgress(status === 'good' ? 1 : -1);
      selectedCardElement.style.transition = 'transform 0.3s ease-in-out';
      selectedCardElement.style.transform = status === 'good' ? `translateX(120%) rotate(-30deg)` : `translateX(-150%) rotate(30deg)`;

      setActiveIndex((prev) => prev - 1);
      setTimeout(() => {
        setProgress(0);
        onEvaluate?.(selectedCard, status);
      }, 300);
    },
    [cardList, activeIndex, onEvaluate]
  );

  // Lazy rendering: Only render last 6 cards (current + next 5)
  const visibleCards = cardList.slice(Math.max(0, cardList.length - 6));

  return (
    <>
      <div className="flex flex-col relative z-10 flex-1 w-full max-w-125 h-full mx-auto touch-none justify-center items-center max-[800px]:max-w-full max-[800px]:mx-0">
        {visibleCards.map((card, index) => {
          const actualIndex = cardList.length - visibleCards.length + index;
          const isActiveCard = actualIndex >= activeIndex;
          const isLastCard = actualIndex === cardList.length - 1;

          return (
            <div
              key={card.creativeVariationId}
              ref={(el) => {
                if (el) {
                  cardRefs.current.set(card.creativeVariationId, el);
                } else {
                  cardRefs.current.delete(card.creativeVariationId);
                }
              }}
              className={['swipe-card absolute', isActiveCard && 'origin-[center_top] pointer-events-auto'].filter(Boolean).join(' ')}
              {...(isLastCard && {
                onTouchStart: handleStart,
                onMouseDown: handleStart,
              })}
            >
              <div
                className={[
                  'flex flex-col overflow-hidden h-full rounded-[10px] bg-white pointer-events-none',
                  'translate-y-5 scale-[0.97] transition-[box-shadow,transform] duration-300',
                  isActiveCard && 'shadow-[0_0_10px_rgba(0,0,0,0.1)] translate-y-0 scale-100',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="flex-1 relative flex items-center justify-center bg-gray-50 max-h-[90vh] w-full">
                  {/* <Image
                    src={card.imageUrl}
                    alt={card.creativeVariationId}
                    fill
                    sizes="(max-width: 800px) 100vw, 500px"
                    className="object-contain"
                    priority={isLastCard}
                  /> */}
                  <Image
                    src={card.imageUrl}
                    alt={card.creativeVariationId}
                    width={card.width}
                    height={card.height}
                    className="w-full h-full object-contain"
                    priority={isLastCard}
                  />
                </div>
                {isLastCard && <ProgressMask progress={progress} isInteracting={isInteracting} />}
              </div>
            </div>
          );
        })}
      </div>

      {activeIndex >= 0 && (
        <div className="flex-0 flex items-center justify-center p-4 gap-4">
          <button
            type="button"
            className={[
              'opacity-80 absolute top-1/2 w-[100px] h-[100px] rounded-full -mt-[50px]',
              'text-[0px] text-center transition-opacity duration-[400ms] ease-out',
              'left-1/2 ml-[-400px] bg-[#f44336] scale-x-[-1]',
              'hover:opacity-100',
              'max-[800px]:opacity-100 max-[800px]:flex-1 max-[800px]:static max-[800px]:m-0',
              'max-[800px]:h-[50px] max-[800px]:rounded-lg max-[800px]:ml-0',
            ].join(' ')}
            onClick={() => handleEvaluate('bad')}
          >
            <img src="/thumb-down.svg" alt="bad" className="block w-[50px] h-[50px] mx-auto max-[800px]:w-[34px] max-[800px]:h-[34px]" />
          </button>

          <button
            type="button"
            className={[
              'opacity-80 absolute top-1/2 w-[100px] h-[100px] rounded-full -mt-[50px]',
              'text-[0px] text-center transition-opacity duration-[400ms] ease-out',
              'right-1/2 mr-[-400px] bg-[#00bfa5]',
              'hover:opacity-100',
              'max-[800px]:opacity-100 max-[800px]:flex-1 max-[800px]:static max-[800px]:m-0',
              'max-[800px]:h-[50px] max-[800px]:rounded-lg max-[800px]:ml-[10px] max-[800px]:mr-0',
            ].join(' ')}
            onClick={() => handleEvaluate('good')}
          >
            <img src="/thumb-up.svg" alt="good" className="block w-[50px] h-[50px] mx-auto max-[800px]:w-[34px] max-[800px]:h-[34px]" />
          </button>
        </div>
      )}
    </>
  );
}
