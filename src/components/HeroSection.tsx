import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="box-border flex flex-col justify-end items-start w-full flex-1 relative z-[5] m-0 p-0">
      {/* Main Headline - Bottom */}
      <div className="w-full pb-4 px-[22.5px] max-md:px-5 max-sm:px-4">
        {/* Border Line */}
        <div className="w-full h-px bg-white/45 mb-3" />
        
        {/* Headline */}
        <div className="flex items-end justify-between">
          <h1 className="overflow-hidden">
            <span 
              className="block text-[#F6F6F6] text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase animate-fade-in-up"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              Saying more with less.
            </span>
          </h1>
          
          {/* Animated Arrow Icon */}
          <div 
            className="pb-2 max-sm:pb-1 animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <div className="animate-bounce-gentle">
              <ArrowDown size={28} strokeWidth={1.5} className="text-[#BEBEBE] max-sm:w-5 max-sm:h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;