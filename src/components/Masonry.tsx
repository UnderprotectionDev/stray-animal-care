import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = useCallback(
    () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue,
    [queries, values, defaultValue],
  );

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries, get]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  subtitle?: string;
  badgeColor?: string;
  meta?: Record<string, unknown>;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: Item) => void;
  renderOverlay?: (item: Item) => React.ReactNode;
}

const OVERLAY_COLLAPSED = 38;
const OVERLAY_EXPANDED = 160;

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick,
  renderOverlay
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = useCallback((item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  }, [animateFrom, containerRef]);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, getInitialPosition]);

  const handleMouseEnter = useCallback((id: string, element: HTMLElement) => {
    if (renderOverlay) {
      const overlayPanel = element.querySelector('.shift-overlay') as HTMLElement;
      const overlayContent = element.querySelector('.shift-overlay-content') as HTMLElement;
      if (overlayPanel) {
        gsap.to(overlayPanel, {
          height: OVERLAY_EXPANDED,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
      if (overlayContent) {
        gsap.to(overlayContent, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.1,
          ease: 'power2.out',
        });
      }
    } else {
      if (scaleOnHover) {
        gsap.to(`[data-key="${id}"]`, {
          scale: hoverScale,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      if (colorShiftOnHover) {
        const overlay = element.querySelector('.color-overlay') as HTMLElement;
        if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
      }
      const masonryOverlay = element.querySelector('.masonry-overlay') as HTMLElement;
      if (masonryOverlay) {
        gsap.to(masonryOverlay, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    }
  }, [renderOverlay, scaleOnHover, hoverScale, colorShiftOnHover]);

  const handleMouseLeave = useCallback((id: string, element: HTMLElement) => {
    if (renderOverlay) {
      const overlayPanel = element.querySelector('.shift-overlay') as HTMLElement;
      const overlayContent = element.querySelector('.shift-overlay-content') as HTMLElement;
      if (overlayPanel) {
        gsap.to(overlayPanel, {
          height: OVERLAY_COLLAPSED,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
      if (overlayContent) {
        gsap.to(overlayContent, {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease: 'power2.in',
        });
      }
    } else {
      if (scaleOnHover) {
        gsap.to(`[data-key="${id}"]`, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      if (colorShiftOnHover) {
        const overlay = element.querySelector('.color-overlay') as HTMLElement;
        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
      }
      const masonryOverlay = element.querySelector('.masonry-overlay') as HTMLElement;
      if (masonryOverlay) {
        gsap.to(masonryOverlay, { opacity: 0, y: 8, duration: 0.3, ease: 'power2.out' });
      }
    }
  }, [renderOverlay, scaleOnHover, colorShiftOnHover]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => onItemClick ? onItemClick(item) : window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          {renderOverlay ? (
            <div className="relative w-full h-full flex flex-col border-[1.5px] border-[var(--border)] overflow-hidden">
              {/* Image area — flex-1, shrinks as overlay expands */}
              <div className="flex-1 relative overflow-hidden min-h-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
              </div>
              {/* Detail panel — GSAP height animation */}
              <div
                className="shift-overlay bg-palette-cream border-t-[1.5px] border-[var(--border)] overflow-hidden flex-shrink-0"
                style={{ height: OVERLAY_COLLAPSED }}
              >
                {renderOverlay(item)}
              </div>
            </div>
          ) : (
            <div
              className="relative w-full h-full bg-cover bg-center uppercase text-[10px] leading-[10px] overflow-hidden border-[1.5px] border-[var(--border)]"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
              )}
              {item.title && (
                <div className="masonry-overlay absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex flex-col justify-end gap-1 opacity-0 translate-y-2 pointer-events-none">
                  {item.subtitle && (
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: item.badgeColor || '#2D936C' }}
                    >
                      {item.subtitle}
                    </span>
                  )}
                  <span className="text-sm font-bold text-white normal-case">{item.title}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
