import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import GuestSpots from './GuestSpots';

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
              className="box-border inline-flex items-center gap-4 relative m-0 p-0 max-md:hidden"
            >
              <motion.div
                className="inline-flex flex-col items-start"
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
              <GuestSpots variant={variant} />
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`fixed inset-x-0 top-[60px] z-40 ${menuBg} border-b border-border`}
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-lg uppercase tracking-wider ${menuText} hover:opacity-70 transition-opacity py-2`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                className="pt-4 border-t border-white/20"
              >
                <Link
                  to="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg uppercase tracking-wider ${menuText} hover:opacity-70 transition-opacity py-2`}
                >
                  Book an appointment
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (navItems.length + 1) * 0.1, duration: 0.3 }}
                className="pt-4"
              >
                <span className={`text-sm uppercase tracking-wider ${menuText} opacity-60`}>
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
