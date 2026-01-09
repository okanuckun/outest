import React, { useState } from 'react';

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeVideoId = 'P99e3RLybk8';
  const startTime = 73;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="box-border flex w-full h-[600px] justify-center items-center relative bg-black m-0 p-0 max-md:h-[400px] max-sm:h-[300px] overflow-hidden">
      <div className="box-border flex items-start flex-[1_0_0] self-stretch relative m-0 p-0">
        <div className="box-border flex flex-col items-start self-stretch relative m-0 p-0 w-full">
          <div className="box-border flex flex-col justify-center items-start relative w-full h-[600px] m-0 p-0 max-md:h-[400px] max-sm:h-[300px]">
            {!isPlaying ? (
              <>
                <img
                  src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="box-border w-full h-full absolute z-[2] bg-[rgba(0,0,0,0.28)] m-0 p-0 left-0 top-0" />
                  
                <div className="box-border flex w-full h-full justify-center items-center absolute z-[4] m-0 p-0 left-0 top-0">
                  <button 
                    onClick={handlePlayClick}
                    className="box-border flex w-[54px] h-[54px] max-w-[1920px] justify-center items-center shrink-0 backdrop-blur-2xl relative bg-[rgba(255,255,255,0.08)] m-0 p-0 rounded-[1800px] hover:bg-[rgba(255,255,255,0.12)] hover:scale-110 active:scale-95 transition-all"
                    aria-label="Play video"
                  >
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.25 14.0623L9.28125 20.3952V7.72949L20.25 14.0623Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&start=${startTime}`}
                title="Okan Uckun - Tattoo Artist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
