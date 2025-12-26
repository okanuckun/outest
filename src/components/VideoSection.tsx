import React, { useState } from 'react';

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="box-border flex w-full h-[600px] justify-center items-center relative bg-black m-0 p-0 max-md:h-[400px] max-sm:h-[300px]">
      <div className="box-border flex items-start flex-[1_0_0] self-stretch relative m-0 p-0">
        <div className="box-border flex flex-col items-start self-stretch relative m-0 p-0 w-full">
          <div className="box-border flex flex-col justify-center items-start relative w-full h-[600px] m-0 p-0 max-md:h-[400px] max-sm:h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1920&h=1080&fit=crop"
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="box-border w-full h-full absolute z-[2] bg-[rgba(0,0,0,0.28)] m-0 p-0 left-0 top-0" />
            
            <div className="box-border flex flex-col items-start self-stretch relative z-[3] m-0 pt-[26.095px] pb-0 px-[22.5px] max-sm:p-4">
              <div className="box-border flex flex-col items-start self-stretch relative m-0 pb-px p-0">
                <h2 className="box-border self-stretch text-[#F6F6F6] text-[35px] font-bold leading-[39.6px] tracking-[-0.54px] uppercase relative m-0 p-0 max-md:text-2xl max-md:leading-7 max-sm:text-lg max-sm:leading-[22px]">
                  Sleeve Tattoo Ideas for Men: Inspiration, Styles, and Aftercare Tips 2
                </h2>
              </div>
            </div>
            
            <div className="box-border flex w-full h-full justify-center items-center absolute z-[4] m-0 p-0 left-0 top-0">
              <button 
                onClick={handlePlayClick}
                className="box-border flex w-[54px] h-[54px] max-w-[1920px] justify-center items-center shrink-0 backdrop-blur-2xl relative bg-[rgba(255,255,255,0.08)] m-0 p-0 rounded-[1800px] hover:bg-[rgba(255,255,255,0.12)] transition-colors"
                aria-label="Play video"
              >
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.25 14.0623L9.28125 20.3952V7.72949L20.25 14.0623Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
