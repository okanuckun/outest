import React from 'react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Blog", href: "/blog" }
  ];

  const socialLinks = [
    { name: "Tiktok", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" }
  ];

  const footerLinks = [
    { name: "Terms of use", href: "/terms" },
    { name: "Aftercare", href: "/aftercare" },
    { name: "Preparation", href: "/preparation" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="box-border flex w-full flex-col items-start gap-[100px] relative bg-white m-0 pt-[80px] pb-[22.5px] px-[22.5px] max-md:gap-10 max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="box-border self-stretch relative m-0 p-0">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:max-w-[926px]">
            <p className="text-[#323232] text-[34.9px] font-bold leading-[39.6px] tracking-[-0.54px] mb-9 max-md:text-2xl max-md:leading-7 max-sm:text-lg max-sm:leading-[22px]">
              Now based at Monolith Studio in Brooklyn, Stevo works with clients from across the world. Have a vision in mind? Reach out to start the conversation.
            </p>
            
            <Button variant="outline" className="inline-flex justify-center items-center gap-[13.5px] border p-[13.5px] border-solid border-[#EAEAEA]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3_280)">
                  <mask id="mask0_3_280" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                    <path d="M18 0H0V18H18V0Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_3_280)">
                    <path d="M17.2542 11.1268L13.0994 6.97194M17.2542 11.1268L13.0994 15.2816M17.2542 11.1268H4.5V2.8125" stroke="#323232" strokeWidth="1.575"/>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_3_280">
                    <rect width="18" height="18" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="text-[#323232] text-[17.6px] font-bold leading-[19.8px] tracking-[-0.027px] uppercase">
                GET IN TOUCH
              </span>
            </Button>
          </div>
          
          <nav className="flex flex-row lg:flex-col gap-10 lg:gap-[13.5px] flex-wrap">
            <div>
              <h3 className="text-[#323232] text-[17.4px] font-bold leading-[19.8px] tracking-[-0.027px] mb-3">
                Discover
              </h3>
              <div className="flex flex-col gap-[9px]">
                {navigationLinks.map((link) => (
                  <a key={link.name} href={link.href}>
                    <span className="text-[#888] text-[19.8px] font-bold leading-5 tracking-[-0.202px] uppercase max-sm:text-base max-sm:leading-[18px] hover:text-[#323232] transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-[#323232] text-[17.6px] font-bold leading-[19.8px] tracking-[-0.027px] mb-3">
                Social
              </h3>
              <div className="flex flex-col gap-[9px]">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.href}>
                    <span className="text-[#888] text-[19.5px] font-bold leading-5 tracking-[-0.202px] uppercase max-sm:text-base max-sm:leading-[18px] hover:text-[#323232] transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </nav>
          
          <div className="lg:ml-auto">
            <button onClick={scrollToTop} className="hover:opacity-80 transition-opacity">
              <span className="text-[#323232] text-[19.7px] font-bold leading-5 tracking-[-0.202px] uppercase">
                Back to top
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="box-border self-stretch relative m-0 p-0">
        <div className="flex flex-col gap-6">
          <a href="mailto:hello@monolithstudio.com" className="hover:opacity-80 transition-opacity">
            <span className="text-[#323232] text-[101px] font-bold leading-[87px] tracking-[-3.726px] uppercase max-lg:text-[50px] max-lg:leading-[44px] max-md:text-[40px] max-md:leading-9 max-sm:text-2xl max-sm:leading-[22px]">
              HELLO@MONOLITHSTUDIO.COM
            </span>
          </a>
          
          <address className="text-[#323232] text-[100.4px] font-bold leading-[87px] tracking-[-3.726px] uppercase not-italic max-lg:text-[50px] max-lg:leading-[44px] max-md:text-[40px] max-md:leading-9 max-sm:text-2xl max-sm:leading-[22px]">
            MONOLITH STUDIO 77, WASHINGTON AVE BROOKLYN, NY
          </address>
        </div>
        
        <div className="flex flex-col items-end gap-[9px] mt-10 max-md:items-center">
          <span className="text-[#888] text-[19.7px] font-bold leading-5 tracking-[-0.202px] uppercase max-sm:text-sm max-sm:leading-4">
            Stevo Tattoo © 2025
          </span>
          
          <div className="flex gap-[18px] flex-wrap justify-center">
            {footerLinks.map((link) => (
              <a key={link.name} href={link.href}>
                <span className="text-[#888] text-[19.8px] font-bold leading-5 tracking-[-0.202px] uppercase max-sm:text-sm max-sm:leading-4 hover:text-[#323232] transition-colors">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
