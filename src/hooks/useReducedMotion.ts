import { useMemo } from 'react';
import { useIsMobile } from './use-mobile';

interface AnimationConfig {
  // Duration multiplier (0.5 = 50% faster)
  durationMultiplier: number;
  // Delay multiplier
  delayMultiplier: number;
  // Whether to enable complex animations
  enableComplexAnimations: boolean;
  // Whether to enable hover animations
  enableHoverAnimations: boolean;
}

export function useReducedMotion(): AnimationConfig {
  const isMobile = useIsMobile();

  return useMemo(() => {
    if (isMobile) {
      return {
        durationMultiplier: 0.5,  // 50% faster on mobile
        delayMultiplier: 0.3,     // 70% shorter delays
        enableComplexAnimations: false,
        enableHoverAnimations: false,
      };
    }

    return {
      durationMultiplier: 1,
      delayMultiplier: 1,
      enableComplexAnimations: true,
      enableHoverAnimations: true,
    };
  }, [isMobile]);
}

// Utility function to get adjusted animation values
export function getAnimationProps(config: AnimationConfig, duration: number, delay: number = 0) {
  return {
    duration: duration * config.durationMultiplier,
    delay: delay * config.delayMultiplier,
  };
}
