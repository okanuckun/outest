import React from 'react';

const BlogSection: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Sleeve Tattoo Ideas for Men: Inspiration, Styles, and Aftercare Tips",
      category: "Inspiration",
      date: "July 29, 2025",
      image: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=500&h=450&fit=crop"
    },
    {
      id: 2,
      title: "Forearm Tattoos: A Perfect Canvas for Realism",
      category: "Inspiration",
      date: "May 18, 2025",
      image: "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=500&h=450&fit=crop"
    },
    {
      id: 3,
      title: "Skull Tattoos: Symbolism, Design Ideas, and Realism Style Guide",
      category: "Tattoo Styles",
      date: "May 17, 2025",
      image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=500&h=450&fit=crop"
    }
  ];

  return (
    <section className="box-border flex w-full flex-col items-start gap-[50px] relative bg-white m-0 py-[80px] px-[22.5px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="box-border flex items-end justify-between self-stretch relative m-0 p-0 flex-wrap gap-4">
        <h2 className="box-border text-[#323232] text-[160.5px] font-bold leading-[140px] tracking-[-6.66px] uppercase relative m-0 p-0 max-md:text-[80px] max-md:leading-[70px] max-sm:text-[50px] max-sm:leading-[44px]">
          Blog
        </h2>
        <div className="box-border text-[#BEBEBE] text-[166.5px] font-bold leading-[140px] tracking-[-6.66px] uppercase relative m-0 p-0 max-md:text-[80px] max-md:leading-[70px] max-sm:text-[50px] max-sm:leading-[44px]">
          3
        </div>
      </div>
      
      <div className="box-border flex flex-col items-start gap-[50px] self-stretch relative m-0 p-0">
        {blogPosts.map((post) => (
          <article key={post.id} className="box-border flex flex-col items-start gap-[27px] self-stretch relative m-0 p-0 cursor-pointer group">
            <div className="box-border h-px self-stretch relative m-0 p-0 border-t-[#EAEAEA] border-t border-solid" />
            <div className="box-border flex items-start gap-[22.5px] self-stretch relative m-0 p-0 max-md:flex-col max-md:gap-5">
              <img
                src={post.image}
                alt={post.title}
                className="box-border w-[452px] h-[411px] relative object-cover m-0 p-0 max-md:w-full max-md:h-auto max-md:aspect-video"
              />
              <div className="box-border flex flex-1 flex-col justify-between items-start self-stretch relative m-0 p-0 max-md:gap-5">
                <div className="box-border flex flex-col items-start relative m-0 p-0 max-w-[720px]">
                  <h3 className="box-border text-[#323232] text-[39.4px] font-bold leading-[45px] tracking-[-0.607px] uppercase relative m-0 p-0 max-md:text-2xl max-md:leading-7 max-sm:text-lg max-sm:leading-[22px] group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                </div>
                <div className="box-border flex items-center self-stretch relative gap-2 m-0 p-0">
                  <div className="box-border flex flex-col items-start relative m-0 p-0">
                    <span className="box-border text-[#323232] text-[19.5px] font-bold leading-5 tracking-[-0.202px] uppercase relative m-0 p-0 max-sm:text-sm max-sm:leading-4">
                      {post.category}
                    </span>
                  </div>
                  <div className="box-border flex w-4 h-4 flex-col items-center justify-center relative m-0 p-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.375 7.875C11.375 5.942 9.808 4.375 7.875 4.375C5.942 4.375 4.375 5.942 4.375 7.875C4.375 9.808 5.942 11.375 7.875 11.375C9.808 11.375 11.375 9.808 11.375 7.875Z" fill="#323232"/>
                    </svg>
                  </div>
                  <div className="box-border flex flex-col items-start relative m-0 p-0">
                    <span className="box-border text-[#888] text-[19.5px] font-bold leading-5 tracking-[-0.202px] uppercase relative m-0 p-0 max-sm:text-sm max-sm:leading-4">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="box-border flex items-start justify-end relative m-0 p-0 max-md:hidden">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 transition-transform">
                  <path d="M37.125 18.5654H2.25V21.7154H37.125V18.5654Z" fill="#323232"/>
                  <path d="M38.7835 20.054L24.3545 5.625L22.1271 7.85239L36.5561 22.2814L38.7835 20.054Z" fill="#323232"/>
                  <path d="M35.9278 18.4526L22.0684 32.312L24.2957 34.5394L38.1552 20.68L35.9278 18.4526Z" fill="#323232"/>
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
