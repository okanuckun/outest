import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  speed = 0.5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Disable parallax effects on mobile to prevent janky resize behavior
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [1, 1, 1] : [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ParallaxImage;
