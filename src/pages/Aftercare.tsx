import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Aftercare: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Tattoo Aftercare Guide | Okan Uckun"
        description="Step-by-step tattoo aftercare instructions from Okan Uckun: cleaning, healing, do's and don'ts to keep your new tattoo looking sharp."
        canonical="/aftercare"
      />
      <div className="min-h-screen bg-[#f5f5f5]">
        <Navigation variant="dark" />

        <main className="max-w-[720px] mx-auto px-6 md:px-12 pt-24 pb-32">
          <ScrollReveal>
            <span className="text-[11px] text-[#888] uppercase tracking-wider block mb-6">
              AFTERCARE
            </span>
            <h1 className="text-[36px] md:text-[48px] font-black text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] uppercase mb-12">
              Tattoo Aftercare
            </h1>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed">
              <p>
                Each artist will make a unique aftercare suggestion. You can read the blog for special aftercare recommendations of Okan Uckun.
              </p>
              <p>
                These, so called "Minimal Tattoos", are different than other ones. So, please be careful about this process. You are going to carry these for the rest of your life and I would like them to look great.
              </p>
              <p>
                Do not apply what your friends tell you to or do not rely on the information you get from internet. Each artist has their own care techniques.
              </p>

              <div className="py-6">
                <h2 className="text-[13px] text-[#888] uppercase tracking-wider mb-4">
                  What you need for aftercare
                </h2>
                <ul className="list-disc list-inside space-y-2 text-[15px]">
                  <li>Coconut Oil</li>
                  <li>Antibacterial Soap</li>
                </ul>
              </div>

              <div className="w-full h-px bg-[#1a1a1a]/10 my-8" />

              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em]">
                Details
              </h2>

              <p>
                Care one is the easy-care technique. I cover the tattoo with a special plastic that is used for plastic surgery. It needs to be closed for 3 days.
              </p>
              <p>
                You don't need to do anything for these 3 days. Continue your life as usual. You can take a shower. Water will not damage the plastic. Just be careful while taking a shower. Plastic can be sensitive underwater and we do not want it to come out.
              </p>
              <p>
                Once your tattoo process is done, you can see that inside of the plastic gets filled up with blackish liquid within a few hours. This is a mixture of blood and ink. You don't need to worry about it. Please do not try to push out. There is no problem with the plastic remaining until it is removed. If it is too much and it bothers you, then you can try to remove the liquid by opening a small hole on the plastic.
              </p>
              <p>
                Also, the lines do not look straight because of this plastic covering them. You might think that lines and circles, or even whole tattoo look crooked. They are not. Please don't worry, this is all about plastic and when you remove it, you will see that the tattoo looks perfect.
              </p>
              <p>
                The tattoo needs to be covered for at least 48 hours. You should remove the plastic very slowly under warm water. Don't worry, your tattoo may look faded when you remove the plastic. This is a completely normal process. From this day on, you should use coconut cream 4 times a day for 2 weeks. I am talking about entirely natural coconut cream. The same used for hair or food. Coconut cream is the best care cream for tattoos.
              </p>
              <p>
                You don't need any other brand or product! I will not recommend any brand. Any completely natural coconut oil is ideal for this job.
              </p>
              <p>
                I want you to wash with an anti-bacterial soap once a day in the first week. The reason for anti-bacterial is to remove the germs that may be in the water. This washing process will clean the tattoo and help us with a smoother recovery. It is okay for your tattoo to come into contact with water, but whenever it comes in contact with water, wash it with an anti-bacterial soap. Thus, water does not damage your tattoo.
              </p>
              <p>
                After about 2 months you must send me a photo of the tattoo. I want to see how the tattoo heals. A few photos taken under good lighting will do. Even if you think that tattoos have improved wonderfully, please still send a photo, because I have to check and make sure.
              </p>
              <p>
                I want the tattoo to be perfectly healed, and some minor touch ups may be required if necessary. Usually, tattoos do not require touch ups, but if needed these will only be tiny touches of 1 or 2 minutes. I'm talking about tiny details that can only be noticed by the tattoo artist. But it's important to me. Take care!
              </p>
            </div>
          </ScrollReveal>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Aftercare;
