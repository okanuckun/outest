import React from 'react';

const Navigation: React.FC = () => {
  return (
    <header className="box-border flex h-[79px] flex-col items-start shrink-0 self-stretch relative z-10 m-0 p-0">
      <nav className="box-border flex flex-col items-start self-stretch relative m-0 px-[22.5px] py-[27px] border-b-[rgba(255,255,255,0.45)] border-b border-solid max-sm:px-4 max-sm:py-5">
        <div className="box-border h-6 self-stretch relative flex items-center justify-between m-0 p-0 max-md:flex-col max-md:gap-4 max-md:h-auto">
          <div className="box-border inline-flex max-w-[1875px] flex-col items-start relative m-0 p-0">
            <a href="/" className="box-border text-[#F6F6F6] text-[19.7px] font-bold leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
              Stevo tattoo
            </a>
          </div>
          
          <div className="box-border inline-flex items-center gap-2 relative m-0 p-0 max-sm:hidden">
            <div className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-[#F6F6F6] text-[19.7px] font-bold leading-5 tracking-[-0.202px] uppercase m-0 p-0">
                brooklyn, ny
              </span>
            </div>
            <div className="box-border flex w-4 h-4 flex-col items-start relative m-0 p-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.375 7.875C11.375 5.942 9.80796 4.375 7.875 4.375C5.942 4.375 4.375 5.942 4.375 7.875C4.375 9.80796 5.942 11.375 7.875 11.375C9.80796 11.375 11.375 9.80796 11.375 7.875Z" fill="#F6F6F6"/>
              </svg>
            </div>
            <div className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-[#F6F6F6] text-[19.3px] font-bold leading-5 tracking-[-0.202px] uppercase m-0 p-0">
                11:44 AM
              </span>
            </div>
          </div>
          
          <div className="box-border inline-flex items-center gap-[18px] relative m-0 p-0 max-md:hidden">
            <a href="/work" className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-[#F6F6F6] text-[19.8px] font-bold leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
                work
              </span>
            </a>
            <a href="/about" className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-[#F6F6F6] text-[19.8px] font-bold leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
                About
              </span>
            </a>
            <a href="/blog" className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-[#F6F6F6] text-[19.8px] font-bold leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
                Blog
              </span>
            </a>
          </div>
          
          <div className="box-border inline-flex flex-col items-start relative m-0 pb-[3.8px] p-0 max-md:hidden">
            <a href="/contact" className="box-border flex items-start relative m-0 p-0">
              <span className="box-border text-[#F6F6F6] text-[19.7px] font-bold leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
                Get in touch
              </span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
