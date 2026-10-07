"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user" transition={reducedMotion ? { duration: 0 } : undefined}>
      {children}
    </MotionConfig>
  );
}
