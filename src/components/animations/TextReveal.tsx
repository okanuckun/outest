import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  once = true,
  as = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      skewY: 3,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const Component = motion[as] as any;

  return (
    <div ref={ref} className="overflow-hidden">
      <Component
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
};

export default TextReveal;
