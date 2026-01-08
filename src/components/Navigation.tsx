import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  variant?: 'light' | 'dark';
}

const navItems = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Project', path: '/project' }
];

const Navigation: React.FC<NavigationProps> = ({ variant = 'light' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const textColor = variant === 'dark' ? 'text-foreground' : 'text-[#F6F6F6]';
  const borderColor = variant === 'dark' ? 'border-b-[#323232]' : 'border-b-[rgba(255,255,255,0.35)]';
  const logoStroke = variant === 'dark' ? 'hsl(0, 0%, 20%)' : '#F6F6F6';
  const menuBg = variant === 'dark' ? 'bg-background' : 'bg-[#1a1a1a]';
  const menuText = variant === 'dark' ? 'text-foreground' : 'text-[#F6F6F6]';

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="box-border flex h-[60px] flex-col items-start shrink-0 self-stretch relative z-50 m-0 p-0"
      >
        <nav className={`box-border flex flex-col items-start self-stretch relative m-0 px-[22.5px] py-[18px] border-b border-solid ${borderColor} max-sm:px-4 max-sm:py-4`}>
          <div className="box-border h-5 self-stretch relative flex items-center justify-between m-0 p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="box-border inline-flex items-center relative m-0 p-0"
            >
              <Link to="/" className="hover:opacity-70 transition-opacity">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="2" y1="18" x2="38" y2="2" stroke={logoStroke} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="box-border inline-flex items-center relative m-0 p-0 max-md:hidden"
            >
              <span className={`box-border text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 ${textColor}`}>
                brooklyn, ny
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="box-border inline-flex items-center gap-[16px] relative m-0 p-0 max-md:hidden"
            >
              {navItems.map((item) => (
                <motion.div 
                  key={item.label}
                  className="box-border flex flex-col items-start relative m-0 p-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={item.path}
                    className={`box-border text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 hover:opacity-70 transition-opacity ${textColor}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="box-border inline-flex flex-col items-start relative m-0 p-0 max-md:hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/booking"
                className={`box-border text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 hover:opacity-70 transition-opacity ${textColor}`}
              >
                Book an appointment
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1 ${textColor}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay - Fullscreen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className={`fixed inset-0 z-40 ${menuBg}`}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className={`absolute top-5 right-4 p-1 ${menuText} z-50`}
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>

            <nav className="h-full flex flex-col justify-center items-center px-8">
              <div className="flex flex-col items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-[clamp(32px,8vw,48px)] font-light uppercase tracking-[0.15em] ${menuText} hover:opacity-50 transition-opacity duration-300`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + navItems.length * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-4"
                >
                  <Link
                    to="/booking"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-[clamp(32px,8vw,48px)] font-light uppercase tracking-[0.15em] ${menuText} hover:opacity-50 transition-opacity duration-300`}
                  >
                    Book
                  </Link>
                </motion.div>
              </div>

              {/* Bottom location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-12 left-0 right-0 flex justify-center"
              >
                <span className={`text-[12px] uppercase tracking-[0.3em] ${menuText} opacity-40`}>
                  Brooklyn, NY
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
