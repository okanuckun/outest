import React from 'react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="box-border flex h-[79px] flex-col items-start shrink-0 self-stretch relative z-10 m-0 p-0"
    >
      <nav className="box-border flex flex-col items-start self-stretch relative m-0 px-[22.5px] py-[27px] border-b-[rgba(255,255,255,0.45)] border-b border-solid max-sm:px-4 max-sm:py-5">
        <div className="box-border h-6 self-stretch relative flex items-center justify-between m-0 p-0 max-md:flex-col max-md:gap-4 max-md:h-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="box-border inline-flex max-w-[1875px] flex-col items-start relative m-0 p-0"
          >
            <a href="/" className="box-border text-[#F6F6F6] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
              Stevo tattoo
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="box-border inline-flex items-center gap-2 relative m-0 p-0 max-sm:hidden"
          >
            <div className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-[#F6F6F6] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase m-0 p-0">
                brooklyn, ny
              </span>
            </div>
            <div className="box-border flex w-4 h-4 flex-col items-start relative m-0 p-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.375 7.875C11.375 5.942 9.80796 4.375 7.875 4.375C5.942 4.375 4.375 5.942 4.375 7.875C4.375 9.80796 5.942 11.375 7.875 11.375C9.80796 11.375 11.375 9.80796 11.375 7.875Z" fill="#F6F6F6"/>
              </svg>
            </div>
            <div className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-[#F6F6F6] text-[19.3px] font-medium leading-5 tracking-[-0.202px] uppercase m-0 p-0">
                11:44 AM
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="box-border inline-flex items-center gap-[18px] relative m-0 p-0 max-md:hidden"
          >
            {['work', 'About', 'Blog'].map((item, index) => (
              <motion.a 
                key={item}
                href={`/${item.toLowerCase()}`} 
                className="box-border flex flex-col items-start relative m-0 p-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="box-border text-[#F6F6F6] text-[19.8px] font-medium leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
                  {item}
                </span>
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="box-border inline-flex flex-col items-start relative m-0 pb-[3.8px] p-0 max-md:hidden"
          >
            <motion.a 
              href="/contact" 
              className="box-border flex items-start relative m-0 p-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="box-border text-[#F6F6F6] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
                Get in touch
              </span>
            </motion.a>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navigation;
