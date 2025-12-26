import React, { useState } from 'react';

const PartnersTestimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(1);

  const testimonials = [
    {
      id: 1,
      text: [
        "My experience with Stevo was unreal—the best tattoo experience I've ever had. He's not only an incredible artist but also highly professional and genuinely friendly. He even flew in early after the holidays to make it happen.",
        "His design skills are top-tier, and he worked closely with me to perfect the concept. We completed a full outer sleeve in three days (about 24 hours total), and despite the long sessions, the trauma was minimal. His technique is flawless, the healing process was smooth, and the final result looks just as stunning as his Instagram work.",
        "The studio is spotless and professional, and Steven stays engaged even after the session, checking in on the healing process. He's a true artist, passionate about his craft, and an all-around great person to work with. If you're looking for unique, realistic work—Steven is the one."
      ],
      author: "HEMAN DANEY, FL"
    },
    {
      id: 2,
      text: [
        "Stevo exceeded all my expectations. From the first consultation to the final session, everything was handled with care and precision.",
        "The attention to detail in his work is remarkable. Every line, every shade was placed with purpose.",
        "I couldn't be happier with my tattoo. It's exactly what I envisioned and more."
      ],
      author: "MARCUS COLE, NY"
    },
    {
      id: 3,
      text: [
        "Working with Stevo was an incredible experience from start to finish.",
        "His artistry and professionalism are unmatched. He took my ideas and elevated them beyond what I imagined.",
        "The healing was perfect and the tattoo looks amazing months later."
      ],
      author: "SARAH MITCHELL, CA"
    },
    {
      id: 4,
      text: [
        "Stevo is a true master of his craft. The realism in his work is breathtaking.",
        "He made me feel comfortable throughout the entire process and was incredibly patient with all my questions.",
        "I'm already planning my next piece with him."
      ],
      author: "JAMES RODRIGUEZ, TX"
    }
  ];

  const partners = ["Bheppo", "Bishoprotary", "Kuro Sumi"];

  return (
    <section className="box-border flex w-full flex-col items-start gap-[50px] relative bg-white m-0 pt-[80px] pb-[80px] px-[22.5px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="box-border self-stretch relative m-0 p-0">
        <div className="flex flex-wrap gap-4">
          <h2 className="text-[#323232] text-[161.6px] font-bold leading-[140px] tracking-[-6.66px] uppercase max-md:text-6xl max-md:leading-[50px] max-sm:text-[40px] max-sm:leading-9">
            Partners
          </h2>
          <div className="flex items-start gap-[0.01px]">
            <span className="text-[#323232] text-[158.9px] font-bold leading-[140px] tracking-[-6.66px] uppercase max-md:text-6xl max-md:leading-[50px] max-sm:text-[40px] max-sm:leading-9">
              &amp;
            </span>
            <span className="text-[#323232] text-[161.1px] font-bold leading-[140px] tracking-[-6.66px] uppercase max-md:text-6xl max-md:leading-[50px] max-sm:text-[40px] max-sm:leading-9">
              Testimonials
            </span>
          </div>
        </div>
      </div>
      
      <div className="box-border flex items-start gap-10 self-stretch relative m-0 max-lg:flex-col">
        <div className="lg:w-[450px] shrink-0" />
        <div className="flex gap-[100px] max-lg:flex-col max-lg:gap-10 flex-1">
          <div>
            <h3 className="text-[#888] text-[17.4px] font-bold leading-[19.8px] tracking-[-0.027px] mb-4">
              Partners
            </h3>
            <div className="flex flex-col gap-2">
              {partners.map((partner, index) => (
                <span key={index} className="text-[#323232] text-[39.6px] font-bold leading-[45px] tracking-[-0.607px] uppercase max-md:text-2xl max-md:leading-7 max-sm:text-lg max-sm:leading-[22px]">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="box-border flex flex-col items-start gap-[26.9px] self-stretch relative m-0 pt-[40px] p-0">
        <div className="box-border h-px self-stretch relative m-0 p-0 border-t-[#EAEAEA] border-t border-solid" />
        
        <div className="box-border flex items-start gap-10 self-stretch relative m-0 max-lg:flex-col">
          <div className="lg:w-[450px] shrink-0" />
          <div className="flex gap-[100px] max-lg:flex-col max-lg:gap-10 flex-1">
            <h3 className="text-[#888] text-[17.4px] font-bold leading-[19.8px] tracking-[-0.027px] shrink-0">
              Testimonials
            </h3>
            
            <div className="flex-1 max-w-[451px]">
              <div className="flex flex-col gap-[19.3px] mb-6">
                {testimonials[currentTestimonial - 1].text.map((paragraph, index) => (
                  <p key={index} className="text-[#323232] text-[17.4px] font-bold leading-[19.8px] tracking-[-0.027px] max-sm:text-sm max-sm:leading-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <span className="text-[#888] text-[19.7px] font-bold leading-5 tracking-[-0.202px] uppercase max-sm:text-base max-sm:leading-[18px]">
                {testimonials[currentTestimonial - 1].author}
              </span>
            </div>
          </div>
        </div>
        
        <div className="box-border h-px self-stretch relative m-0 p-0 border-t-[#EAEAEA] border-t border-solid" />
        
        <div className="box-border flex justify-between items-start self-stretch relative m-0 p-0 max-md:justify-center max-md:gap-5">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentTestimonial(num)}
              className={`box-border flex flex-col items-start self-stretch relative m-0 p-0 ${
                currentTestimonial === num ? 'text-[#323232]' : 'text-[#BEBEBE]'
              } hover:text-[#323232] transition-colors`}
            >
              <span className="box-border max-h-[45px] text-[40.5px] font-bold leading-[45px] tracking-[-0.607px] relative m-0 p-0 max-md:text-2xl max-md:leading-7 max-sm:text-lg max-sm:leading-[22px]">
                {num}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersTestimonials;
