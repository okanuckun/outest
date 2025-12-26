import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Navigation: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="box-border flex h-[60px] flex-col items-start shrink-0 self-stretch relative z-10 m-0 p-0"
    >
      <nav className="box-border flex flex-col items-start self-stretch relative m-0 px-[22.5px] py-[18px] border-b-[rgba(255,255,255,0.35)] border-b border-solid max-sm:px-4 max-sm:py-4">
        <div className="box-border h-5 self-stretch relative flex items-center justify-between m-0 p-0 max-md:flex-col max-md:gap-3 max-md:h-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="box-border inline-flex items-center gap-3 relative m-0 p-0"
          >
            <img src={logo} alt="Logo" className="h-5 w-auto" />
            <Link to="/" className="box-border text-[#F6F6F6] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 hover:opacity-70 transition-opacity">
              okan uckun
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="box-border inline-flex items-center relative m-0 p-0 max-sm:hidden"
          >
            <span className="box-border text-[#F6F6F6] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0">
              brooklyn, ny
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="box-border inline-flex items-center gap-[16px] relative m-0 p-0 max-md:hidden"
          >
            {['work', 'About', 'Article'].map((item) => (
              <motion.div 
                key={item}
                className="box-border flex flex-col items-start relative m-0 p-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={`/${item.toLowerCase()}`}
                  className="box-border text-[#F6F6F6] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 hover:opacity-70 transition-opacity"
                >
                  {item}
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
              to="/contact"
              className="box-border text-[#F6F6F6] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0 hover:opacity-70 transition-opacity"
            >
              Book an appointment
            </Link>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navigation;
