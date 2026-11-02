import { Transition } from "framer-motion";

export const springConfig = {
  // 1. Structural Entrances: Clean, dignified, zero bounce
  reveal: {
    type: "spring",
    mass: 1.0,
    stiffness: 260,
    damping: 28,
  } as Transition,

  // 2. Micro-Interactions: Tactile, snap response for buttons & options
  tactilePress: {
    type: "spring",
    mass: 0.4,
    stiffness: 420,
    damping: 22,
  } as Transition,

  // 3. Elastic Snapback: For magnetic buttons and cards resetting position
  elasticSnap: {
    type: "spring",
    mass: 0.8,
    stiffness: 300,
    damping: 20,
  } as Transition,

  // 4. Modal / Sheet Glide: Smooth bottom-sheet unfolding
  sheetGlide: {
    type: "spring",
    mass: 1.1,
    stiffness: 240,
    damping: 26,
  } as Transition,
};

// Continuous ambient pulse for gold badges & urgent tickers
export const pulseGlowVariant = {
  initial: { opacity: 0.8, scale: 1 },
  animate: {
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.025, 1],
    transition: {
      duration: 2.8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};
