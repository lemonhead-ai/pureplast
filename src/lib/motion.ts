"use client";

import { useReducedMotion } from "framer-motion";

/** Snappy spring for layout shifts, hovers, and micro-interactions */
export const SPRING_SNAPPY = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

/** Slightly softer spring for larger hero / section entrances */
export const SPRING_ENTRANCE = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};

export const HOVER_LIFT = { scale: 1.02 };
export const TAP_PRESS = { scale: 0.97 };

export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = (stagger = 0.06, delayChildren = 0.04) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export function useMotionSafe() {
  const reduced = useReducedMotion();

  return {
    reduced: !!reduced,
    spring: reduced ? ({ duration: 0.01 } as const) : SPRING_SNAPPY,
    entranceSpring: reduced ? ({ duration: 0.01 } as const) : SPRING_ENTRANCE,
    hover: reduced ? undefined : HOVER_LIFT,
    tap: reduced ? undefined : TAP_PRESS,
    initial: reduced ? false : undefined,
    viewport: { once: true, margin: "-40px" as const },
  };
}
