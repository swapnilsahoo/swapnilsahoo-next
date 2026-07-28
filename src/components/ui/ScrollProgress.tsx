"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      id="scroll-progress"
      style={{ scaleX, transformOrigin: "0% 50%", width: "100%" }}
      className="fixed top-0 left-0 z-[9999] h-[3px] bg-gradient-to-r from-[#60A5FA] via-[#14B8A6] to-[#F0B429] shadow-[0_0_18px_rgba(96,165,250,0.36)]"
    />
  );
}
