import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';

const PartnersTestimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      title: "REACH OUT",
      description: "Send a message expressing your interest. I respond personally (usually same day) with available consultation times."
    },
    {
      id: 2,
      title: "CONSULTATION",
      description: "Two-hour strategic conversation at Monolith Studio or via Zoom if necessary. No sales pressure. Real insight. Honest assessment of fit."
    },
    {
      id: 3,
      title: "DESIGN PHASE",
      description: "After scheduling, I'll create custom designs based on our conversation. Your insights will help us get the most out of our time together."
    },
    {
      id: 4,
      title: "TRANSFORMATION",
      description: "Work starts immediately with clear structure, defined outcomes, and consistent momentum. The journey begins."
    }
  ];

  return (
    <section className="box-border flex w-full flex-col relative bg-[#f5f5f5] m-0 py-[100px] px-[22.5px] max-md:px-5 max-md:py-16 max-sm:px-4 max-sm:py-12">
      {/* Section Label */}
      <ScrollReveal className="mb-8">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#323232] rounded-full" />
          <span className="text-[#323232] text-[14px] font-normal tracking-[-0.02px]">
            The Process
          </span>
        </div>
      </ScrollReveal>
      
      {/* Testimonials List */}
      <div className="flex flex-col">
        {testimonials.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 0.1}>
            <motion.div 
              className="relative border-t border-[#d0d0d0] py-8 md:py-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-8 md:gap-16 lg:gap-32">
                {/* Large Number */}
                <div className="w-[120px] md:w-[200px] lg:w-[300px] shrink-0 relative">
                  <span 
                    className="text-[80px] md:text-[120px] lg:text-[180px] font-medium leading-none tracking-[-0.05em] text-transparent"
                    style={{ 
                      WebkitTextStroke: '1px #c0c0c0',
                    }}
                  >
                    {String(item.id).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2 md:pt-4">
                  <h3 className="text-[#323232] text-[24px] md:text-[32px] lg:text-[42px] font-medium leading-[1.1] tracking-[-0.03em] uppercase mb-4 md:mb-6">
                    {item.title}
                  </h3>
                  <p className="text-[#666] text-[15px] md:text-[17px] font-normal leading-[1.5] tracking-[-0.02px] max-w-[500px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
        
        {/* Final border */}
        <div className="border-t border-[#d0d0d0]" />
      </div>
    </section>
  );
};

export default PartnersTestimonials;
