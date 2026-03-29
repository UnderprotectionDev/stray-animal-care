'use client'

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useOutsideClick } from '@/hooks/use-outside-click'
import Image from 'next/image'

type Card = {
  src: string
  title: string
  category: string
  content: React.ReactNode
  badgeStyle?: React.CSSProperties
}

const CarouselContext = createContext<{
  onCardClose: (index: number) => void
  currentIndex: number
}>({
  onCardClose: () => {},
  currentIndex: 0,
})

export function Carousel({ items, initialScroll = 0 }: { items: React.JSX.Element[]; initialScroll?: number }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll
      checkScrollability()
    }
  }, [initialScroll])

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384
      const gap = isMobile() ? 16 : 24
      const scrollPosition = (cardWidth + gap) * (index + 1)
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' })
      setCurrentIndex(index)
    }
  }

  const isMobile = () => window.innerWidth < 768

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn('flex flex-row justify-start gap-4 md:gap-6 pl-6 pr-6')}>
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.15 * index, ease: 'easeOut' },
                }}
                key={'card' + index}
                className="last:pr-[5%] md:last:pr-[10%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-6 mt-4">
          <button
            className={cn(
              'relative z-40 h-10 w-10 flex items-center justify-center border-[1.5px] border-[var(--border)] bg-[var(--surface)]',
              'disabled:opacity-30',
            )}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-5 w-5 text-[var(--foreground)]" />
          </button>
          <button
            className={cn(
              'relative z-40 h-10 w-10 flex items-center justify-center border-[1.5px] border-[var(--border)] bg-[var(--surface)]',
              'disabled:opacity-30',
            )}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRight className="h-5 w-5 text-[var(--foreground)]" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export function Card({ card, index, layout = false }: { card: Card; index: number; layout?: boolean }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { onCardClose } = useContext(CarouselContext)

  const handleClose = useCallback(() => {
    setOpen(false)
    onCardClose(index)
  }, [index, onCardClose])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') handleClose()
    }

    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [open, handleClose])

  useOutsideClick(containerRef, handleClose)

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-sm h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}-${index}` : undefined}
              className="max-w-3xl mx-auto bg-background border-[1.5px] border-[var(--border)] z-[60] my-10 p-0 relative overflow-hidden"
            >
              <div className="relative z-10 bg-background">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center border-[1.5px] border-[var(--border)] bg-background/90 backdrop-blur-sm z-20 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] group"
                  onClick={handleClose}
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Hero image with gradient overlay */}
                <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <motion.span
                    layoutId={layout ? `category-${card.title}-${index}` : undefined}
                    className="badge-sys absolute bottom-4 left-6 z-10"
                    style={card.badgeStyle}
                  >
                    {card.category}
                  </motion.span>
                </div>

                {/* Content area */}
                <div className="p-6 md:p-8 flex flex-col gap-5">
                  <motion.h3
                    layoutId={layout ? `title-${card.title}-${index}` : undefined}
                    className="font-heading text-2xl md:text-3xl font-bold text-[var(--foreground)] uppercase leading-tight"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
                  >
                    {card.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}-${index}` : undefined}
        onClick={() => setOpen(true)}
        className="bg-[var(--surface)] border-[1.5px] border-[var(--border)] h-80 w-56 md:h-[28rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-30 pointer-events-none" />
        <div className="relative z-40 p-6 flex flex-col h-full justify-end text-left">
          <motion.p
            layoutId={layout ? `category-${card.title}-${index}` : undefined}
            className="font-mono text-xs md:text-sm uppercase tracking-widest text-white/80"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}-${index}` : undefined}
            className="font-heading text-xl md:text-3xl font-bold text-white mt-2"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage src={card.src} alt={card.title} fill className="object-cover absolute z-10 inset-0" />
      </motion.button>
    </>
  )
}

function BlurImage({
  src,
  alt,
  fill,
  className,
}: {
  src: string
  alt: string
  fill?: boolean
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={cn(className, 'transition duration-300', loaded ? 'blur-none' : 'blur-md')}
      onLoad={() => setLoaded(true)}
    />
  )
}
