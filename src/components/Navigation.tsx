import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  variant?: 'light' | 'dark';
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Project', path: '/project' }
];

const socialLinks = [
  { label: 'Instagram', url: 'https://instagram.com/okanuckun' },
  { label: 'YouTube', url: 'https://youtube.com/monolithstudionyc' },
  { label: 'TikTok', url: 'https://tiktok.com/okanuckun' }
];

const Navigation: React.FC<NavigationProps> = ({ variant = 'light' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const textColor = variant === 'dark' ? 'text-foreground' : 'text-[#F6F6F6]';
  const borderColor = variant === 'dark' ? 'border-b-[#323232]' : 'border-b-[rgba(255,255,255,0.35)]';
  const logoStroke = variant === 'dark' ? 'hsl(0, 0%, 20%)' : '#F6F6F6';

  return (
    <>
      <header className="box-border flex h-[60px] flex-col items-start shrink-0 self-stretch relative z-50 m-0 p-0">
        <nav className={`box-border flex flex-col items-start self-stretch relative m-0 px-[22.5px] py-[18px] border-b border-solid ${borderColor} max-sm:px-4 max-sm:py-4`}>
          <div className="box-border h-5 self-stretch relative flex items-center justify-between m-0 p-0">
            <div className="box-border inline-flex items-center relative m-0 p-0">
              <Link to="/" className="hover:opacity-70 transition-opacity">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="2" y1="18" x2="38" y2="2" stroke={logoStroke} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            </div>
            
            <div className="box-border inline-flex items-center relative m-0 p-0 max-md:hidden">
              <span className={`box-border text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 ${textColor}`}>
                brooklyn, ny
              </span>
            </div>
            
            <div className="box-border inline-flex items-center gap-[16px] relative m-0 p-0 max-md:hidden">
              {navItems.filter(item => item.label !== 'Home').map((item) => (
                <div 
                  key={item.label}
                  className="box-border flex flex-col items-start relative m-0 p-0 hover:scale-105 active:scale-95 transition-transform"
                >
                  <Link 
                    to={item.path}
                    className={`box-border text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 hover:opacity-70 transition-opacity ${textColor}`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="box-border inline-flex flex-col items-start relative m-0 p-0 max-md:hidden hover:scale-105 active:scale-95 transition-transform">
              <Link 
                to="/booking"
                className={`box-border text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 hover:opacity-70 transition-opacity ${textColor}`}
              >
                Book an appointment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1 ${textColor} z-[60]`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Fullscreen Editorial Style with CSS transitions */}
      <div
        className={`fixed inset-0 z-[100] bg-[#c4c4c4] overflow-y-auto transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-5 right-5 p-2 text-black z-50"
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1.5} />
        </button>

        <div className="min-h-full flex flex-col px-6 pt-16 pb-8">
          {/* Main Navigation Links */}
          <nav className="flex flex-col gap-0">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className={`transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                style={{ transitionDelay: mobileMenuOpen ? `${100 + index * 50}ms` : '0ms' }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[42px] font-semibold text-black uppercase tracking-[-0.02em] leading-[1.1] hover:opacity-60 transition-opacity"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Book Experience - Bordered Section */}
          <div
            className={`mt-10 border-t border-b border-black/30 py-5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: mobileMenuOpen ? '350ms' : '0ms' }}
          >
            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-black hover:opacity-60 transition-opacity"
            >
              <span className="text-[26px] font-medium uppercase tracking-[-0.01em]">
                Book an Appointment
              </span>
              <ArrowUpRight size={24} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Follow Section */}
          <div
            className={`mt-10 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: mobileMenuOpen ? '400ms' : '0ms' }}
          >
            <h3 className="text-[13px] font-semibold text-black uppercase tracking-[0.05em] mb-3">
              Follow
            </h3>
            <div className="flex flex-col gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[14px] text-black uppercase tracking-[0.02em] hover:opacity-60 transition-opacity"
                >
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Reach Out Section */}
          <div
            className={`mt-8 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: mobileMenuOpen ? '450ms' : '0ms' }}
          >
            <h3 className="text-[13px] font-semibold text-black uppercase tracking-[0.05em] mb-2">
              Reach Out
            </h3>
            <a
              href="mailto:okanuckun@gmail.com"
              className="text-[14px] text-black uppercase tracking-[0.02em] hover:opacity-60 transition-opacity"
            >
              okanuckun@gmail.com
            </a>
          </div>

          {/* Studio Address */}
          <div
            className={`mt-8 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: mobileMenuOpen ? '500ms' : '0ms' }}
          >
            <h3 className="text-[13px] font-semibold text-black uppercase tracking-[0.05em] mb-2">
              Monolith Studio
            </h3>
            <p className="text-[14px] text-black uppercase tracking-[0.02em] leading-relaxed">
              77 Washington Avenue,<br />
              Brooklyn, NYC
            </p>
          </div>

          {/* Bottom Spacer */}
          <div className="flex-1" />
        </div>
      </div>
    </>
  );
};

export default Navigation;
