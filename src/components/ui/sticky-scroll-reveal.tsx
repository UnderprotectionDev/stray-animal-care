"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utilities/ui";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: React.ReactNode;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div
      className="relative flex h-[40rem] overflow-y-auto bg-[var(--background)]"
      ref={ref}
    >
      {/* Text column */}
      <div className="relative flex w-full items-start px-6 md:px-10 lg:w-1/2 lg:px-12 xl:px-16 py-10">
        <div className="flex w-full max-w-xl flex-col">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-32 first:mt-4">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.15 }}
                transition={{ duration: 0.4 }}
                className="t-h1 uppercase text-[var(--foreground)]"
              >
                {item.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.15 }}
                transition={{ duration: 0.4 }}
                className="mt-4 text-[var(--foreground)]"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      {/* Sticky image column */}
      <div
        className={cn(
          "sticky top-0 hidden h-[40rem] w-1/2 shrink-0 overflow-hidden lg:block",
          "border-l-[1.5px] border-[var(--foreground)]",
          contentClassName,
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>

        {/* Step indicator */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          {content.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 transition-all duration-300",
                i === activeCard
                  ? "w-8 bg-[var(--trust)]"
                  : "w-3 bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
