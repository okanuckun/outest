import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="box-border flex flex-col justify-center items-start self-stretch relative z-[5] m-0 p-0">
      <div className="box-border flex h-[901px] justify-center items-start gap-[22.5px] absolute w-full m-0 pl-[22.5px] pr-[913.49px] py-0 left-0 top-0 max-md:h-[600px] max-md:px-5 max-md:py-0 max-sm:h-[400px] max-sm:px-4 max-sm:py-0">
        <div className="box-border w-[452px] self-stretch relative m-0 p-0 border-r-[rgba(255,255,255,0.45)] border-r border-solid max-md:w-[200px] max-sm:hidden" />
        <div className="box-border flex w-[510px] max-w-[510px] flex-col items-start self-stretch relative m-0 pt-[17.09px] pb-[818.3px] px-0 max-md:w-full max-md:max-w-full max-md:px-0 max-md:py-5 max-sm:px-0 max-sm:py-4">
          <div className="box-border flex flex-col items-start self-stretch relative m-0 pb-px p-0">
            <p className="box-border self-stretch text-[#BEBEBE] text-[17.4px] font-bold leading-[21.6px] tracking-[-0.027px] relative m-0 p-0 max-sm:text-sm max-sm:leading-[18px]">
              Your body becomes the canvas. Each piece is crafted to flow with form, designed with intention, and built to endure. Art that ages with you, telling your story through time.
            </p>
          </div>
        </div>
      </div>
      
      <div className="box-border w-full h-[219px] absolute z-[5] m-0 p-0 left-0 top-[902px] max-md:h-[150px] max-md:top-[600px] max-sm:h-[120px] max-sm:top-[400px]">
        <div className="box-border flex w-[1401px] h-[109px] flex-col items-start absolute m-0 pt-[22.5px] p-0 left-[497px] top-0 max-md:w-full max-md:h-20 max-md:pt-2.5 max-md:left-5 max-sm:h-[60px] max-sm:left-4">
          <h1 className="box-border flex flex-col items-start self-stretch relative m-0 p-0">
            <span className="box-border max-h-[87px] self-stretch text-[#F6F6F6] text-[100.4px] font-bold leading-[87px] tracking-[-3.726px] uppercase relative m-0 p-0 max-md:text-6xl max-md:leading-[50px] max-sm:text-[40px] max-sm:leading-9">
              timeless art
            </span>
          </h1>
        </div>
        
        <div className="box-border flex w-[1401px] h-[87px] flex-col items-start absolute m-0 p-0 left-[23px] top-[109px] max-md:w-full max-md:h-[60px] max-md:left-5 max-md:top-[70px] max-sm:h-[50px] max-sm:left-4 max-sm:top-[50px]">
          <h1 className="box-border flex flex-col items-start self-stretch relative m-0 p-0">
            <span className="box-border max-h-[87px] self-stretch text-[#F6F6F6] text-[100.2px] font-bold leading-[87px] tracking-[-3.726px] uppercase relative m-0 p-0 max-md:text-6xl max-md:leading-[50px] max-sm:text-[40px] max-sm:leading-9">
              Lasting impact
            </span>
          </h1>
        </div>
        
        <div className="box-border w-[197px] h-[21px] text-[#BEBEBE] text-[19.8px] font-bold leading-5 tracking-[-0.202px] uppercase absolute m-0 p-0 right-[22.5px] top-44 max-md:text-base max-md:right-5 max-md:top-[120px] max-sm:text-sm max-sm:right-4 max-sm:top-[90px]">
          Scroll to explore
        </div>
      </div>
      
      <div className="box-border w-full h-px absolute z-[5] m-0 p-0 border-t-[rgba(255,255,255,0.45)] border-t border-solid left-0 top-[901px] max-md:top-[600px] max-sm:top-[400px]" />
    </section>
  );
};

export default HeroSection;
