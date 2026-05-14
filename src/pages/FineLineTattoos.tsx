import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.okanuckun.com/"},
        {"@type": "ListItem", "position": 2, "name": "Fine Line Tattoos", "item": "https://www.okanuckun.com/fine-line-tattoos"}
      ]
    },
    {
      "@type": "Service",
      "name": "Fine Line Tattoo NYC",
      "description": "Custom fine line tattoo designs using single needle precision technique by Okan Uckun in New York City. Specializing in delicate, detailed linework and minimalist fine line tattoos.",
      "provider": {
        "@type": "Person",
        "name": "Okan Uckun",
        "jobTitle": "Tattoo Artist",
        "url": "https://www.okanuckun.com",
        "sameAs": [
          "https://www.instagram.com/okanuckun",
          "https://www.behance.net/okanuckun"
        ]
      },
      "areaServed": { "@type": "City", "name": "New York City" },
      "url": "https://www.okanuckun.com/fine-line-tattoos",
      "serviceType": "Tattoo Art",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Fine Line Tattoo Styles",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Single Needle Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Fine Line Portrait Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Fine Line Botanical Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Fine Line Geometric Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Minimalist Fine Line Tattoo"}}
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a fine line tattoo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A fine line tattoo uses extremely thin needles — typically a single needle (1RL) or triple needle (3RL) — to create delicate, precise designs with minimal ink spread. The result is a tattoo that resembles a detailed pencil drawing on the skin, with soft gradients and intricate detail impossible with traditional needle configurations."
          }
        },
        {
          "@type": "Question",
          "name": "How long do fine line tattoos last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fine line tattoos done by an experienced artist can maintain their clarity for 10+ years with proper care. Key factors are artist skill (correct ink depth), consistent moisturizing, daily SPF on healed tattoos, and avoiding prolonged sun exposure. Most fine line tattoos benefit from a touch-up after their first year."
          }
        },
        {
          "@type": "Question",
          "name": "Do fine line tattoos hurt more?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fine line tattoos are generally considered less painful than traditional tattoos. The single or triple needle configuration deposits less ink per pass and creates less trauma to the skin than the larger needle groupings used in traditional tattooing. Pain levels still vary by placement and individual sensitivity."
          }
        },
        {
          "@type": "Question",
          "name": "How do I care for a fine line tattoo while it heals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Keep the area clean and moisturized for the first two weeks. Apply a thin layer of unscented moisturizer 2-3 times daily. Avoid soaking in water, direct sun exposure, and picking at any peeling. Fine line tattoos are more sensitive to improper aftercare than traditional tattoos — the thin lines can blur or fade if the healing process is disrupted."
          }
        },
        {
          "@type": "Question",
          "name": "Where is the best place to get a fine line tattoo in NYC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Okan Uckun is recognized as one of NYC's leading fine line tattoo artists. With nearly 300,000 Instagram followers and features in global publications, his single needle precision work has defined the fine line style internationally. Studio in Brooklyn, serving clients across all of New York City."
          }
        }
      ]
    }
  ]
};

const FineLineTattoos: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Fine Line Tattoos NYC | Okan Uckun — Fine Line Tattoo Artist"
        description="Fine line tattoo artist in NYC. Delicate single needle precision, custom fine line tattoo designs by Okan Uckun. Brooklyn studio, serving all of New York City."
        canonical="https://www.okanuckun.com/fine-line-tattoos"
        ogTitle="Fine Line Tattoos NYC | Okan Uckun"
        ogDescription="Custom fine line tattoos by world-renowned NYC tattoo artist Okan Uckun. Single needle precision, minimalist designs — Brooklyn studio, all of NYC served."
        ogImage="https://www.okanuckun.com/og-fineline.jpg"
        ogType="website"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-[#f5f5f5]">
        <Navigation variant="dark" />

        <main className="max-w-[720px] mx-auto px-6 md:px-12 pt-24 pb-32">
          {/* Hero */}
          <ScrollReveal>
            <span className="text-[11px] text-[#888] uppercase tracking-wider block mb-6">
              FINE LINE TATTOOS
            </span>
            <h1 className="text-[36px] md:text-[48px] font-black text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] uppercase mb-8">
              Fine Line Tattoos in NYC
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#1a1a1a] leading-relaxed mb-12">
              Okan Uckun is one of New York City's most recognized fine line tattoo artists, pioneering the single needle linework approach in the 2010s — with nearly 300,000 Instagram followers and features in BuzzFeed, Bored Panda and My Modern Met. A fine line tattoo is a completely different relationship between needle, ink and skin — one that demands a higher degree of precision, a deeper understanding of how skin behaves, and an artistic sensibility that can communicate complexity through restraint. Okan has spent over a decade developing his mastery of this technique, creating fine line work that holds its integrity for years and carries genuine artistic weight.
            </p>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <div className="mb-16">
              <Link to="/appointment">
                <Button size="lg" className="group text-[13px] uppercase tracking-wider">
                  Book an Appointment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* What Is */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                What Is a Fine Line Tattoo?
              </h2>
              <p>
                Fine line tattooing uses one of the smallest needle configurations available — typically a single round liner (1RL) or triple round liner (3RL) — to create tattoos with the finest possible lines and the most delicate detail achievable in the medium.
              </p>
              <p>
                Where traditional tattooing uses needles grouped in sets of six to thirteen to deliver bold, saturated lines, fine line work deposits ink in a single, precise thread. The result is a tattoo that more closely resembles a drawing than a conventional tattoo — subtle, detailed, with a visual lightness that traditional techniques cannot produce.
              </p>
              <p>
                This is not a simpler form of tattooing. In many ways it is more demanding. With bold traditional work, slightly imprecise{' '}
                <Link to="/line-work-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">linework</Link>{' '}
                can be corrected or absorbed into the overall composition. With fine line work, every single line is visible and intentional. There is nowhere to hide a mistake.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Styles */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Fine Line Tattoo Styles
              </h2>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Single Needle Tattoos
              </h3>
              <p>
                The single needle technique uses the smallest possible needle — a 1RL — to create tattoos of extraordinary delicacy. Single needle work produces the finest lines, the softest gradients and the most sketch-like quality of any tattoo style.
              </p>
              <p>
                Single needle tattoos require an artist who understands exactly how deep to place the ink to ensure longevity without creating the blowouts or blurring that can occur when ink is deposited too shallowly or unevenly. This precision comes only from extensive experience with the technique.
              </p>
              <p>
                Okan Uckun has worked with the single needle since the early development of the fine line style and understands how single needle work ages across different skin types and placements — crucial knowledge that separates a tattoo that holds beautifully for a decade from one that fades within a year.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Fine Line Portrait Tattoos
              </h3>
              <p>
                Portraiture in fine line is one of the most technically demanding tattoo disciplines. Capturing a likeness — the specific quality of a face, the exact expression in someone's eyes — requires the fine line technique's ability to render subtle gradations of grey, soft transitions between light and shadow, and precise proportional accuracy.
              </p>
              <p>
                Fine line portrait work in Okan Uckun's hands is built on architectural precision and an instinct for what the skin will absorb and hold. Each portrait is approached as a composition problem: how to translate three-dimensional reference into a two-dimensional design that belongs to the body's surface.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Fine Line Botanical Tattoos
              </h3>
              <p>
                Plants, flowers, leaves and botanical elements translate exceptionally well into fine line. The natural world's linear structures — the branching of stems, the veining of leaves, the overlapping petals of a flower — are ideally suited to single needle rendering.
              </p>
              <p>
                Fine line botanical tattoos can range from single stem pieces to complex botanical illustrations that wrap the forearm or flow across the ribcage. The delicacy of the style honors the inherent delicacy of the subject matter.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Fine Line Geometric Tattoos
              </h3>
              <p>
                Where fine line technique meets{' '}
                <Link to="/geometric-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">geometric</Link>{' '}
                precision, the results are some of the most visually striking work in contemporary tattooing. The needle's ability to produce razor-thin, consistent lines gives geometric forms — circles, triangles, sacred geometry patterns — an architectural quality that bold lines cannot achieve.
              </p>
              <p>
                Okan Uckun is particularly recognized for his{' '}
                <Link to="/geometric-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">geometric</Link>{' '}
                fine line work, which draws on his broader artistic background in architecture and design. A geometric composition in fine line is built line by line, with each element placed in precise relationship to every other.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Minimalist Fine Line Tattoos
              </h3>
              <p>
                The intersection of{' '}
                <Link to="/minimalist-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">minimalism</Link>{' '}
                and fine line tattooing is where Okan Uckun's work is most distinctly itself. A single fine line arc. A precisely placed small symbol. A word in carefully chosen typography. Designs that hold their power not through complexity but through intention.
              </p>
              <p>
                Minimalist fine line tattoos work on a different principle than most tattooing: they communicate through what is not there as much as through what is. The space around a fine line design is as important as the design itself.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* How Long Do They Last */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                How Long Do Fine Line Tattoos Last?
              </h2>
              <p>
                This is the most common question about fine line work — and the honest answer is: it depends on three things.
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-bold mb-1">Artist precision</p>
                  <p>The most important factor. Ink must be placed at the correct depth in the dermis — shallow enough to produce fine lines without excess spread, deep enough to ensure the ink is properly anchored. An experienced fine line artist understands this balance across different skin types and body placements.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Aftercare</p>
                  <p>The second critical factor. Fine line tattoos are more sensitive to improper healing than traditional work. For the first two weeks, the tattoo needs to be kept clean and moisturized, protected from soaking in water, and shielded from sun exposure. Picking at any peeling skin during healing can remove ink and leave irregular areas in the finished tattoo.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Long-term maintenance</p>
                  <p>Determines how the tattoo looks years later. Daily SPF on any healed tattoo exposed to sun is the single most effective thing you can do to preserve fine line work. UV exposure breaks down ink faster than anything else. A fine line tattoo properly protected from the sun can look nearly as precise at ten years as it did at one.</p>
                </div>
              </div>

              <p>
                Most fine line tattoos benefit from a touch-up session after their first year — a brief appointment to refresh any areas where ink has settled unevenly. After that, with proper care, fine line work can remain sharp for a decade or more.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Placement Guide */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Fine Line Tattoo Placement Guide
              </h2>
              <p>
                Placement affects both the aesthetic result and the longevity of fine line work. Certain placements are more forgiving; others require particular care:
              </p>

              <div className="space-y-6">
                <div>
                  <p className="font-bold mb-1">Inner Forearm</p>
                  <p>One of the most reliable placements for fine line work. The skin is consistent, relatively flat and protected from the sun. Fine line designs maintain excellent clarity here.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Outer Forearm and Wrist</p>
                  <p>Good placements for fine line, but the wrist sees more sun exposure and more skin movement. SPF protection is especially important for wrist placements.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Upper Arm</p>
                  <p>Excellent placement — consistent skin, good surface area for complex compositions, and easier to protect from sun.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Ribcage and Sternum</p>
                  <p>Beautiful for flowing fine line compositions that follow the body's contours. Requires more attention during healing due to the skin's movement with breathing.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Ankle and Foot</p>
                  <p>More prone to fading due to proximity to the ground, sun exposure and the skin's natural tendency to regenerate more quickly in high-use areas. Fine line work here requires more frequent touch-ups.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Behind the Ear and Neck</p>
                  <p>Intimate, striking placements for small fine line pieces. The skin heals well here but requires careful sun protection given the area's constant exposure.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* The Process */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                The Fine Line Process: What to Expect
              </h2>
              <p>
                A fine line tattoo appointment with Okan Uckun follows a collaborative process built around producing work that is specifically right for you.
              </p>
              <p>
                You'll be asked to share references — pieces from Okan's{' '}
                <Link to="/work" className="underline underline-offset-4 hover:text-[#555] transition-colors">portfolio</Link>{' '}
                that speak to you, as well as inspiration from other artists, designers, architects, or any visual sources that reflect the aesthetic direction you're drawn to. Photographs of your intended placement from multiple angles help with scale and composition planning.
              </p>
              <p>
                On the day of your appointment, you'll receive at least five custom design options developed specifically for your brief. The designs are not shared before the appointment — this is central to the creative process. The session includes time to review the designs, discuss adjustments and finalize the composition before any tattooing begins.
              </p>
              <p>
                The tattooing itself with fine line work is typically a calmer, lighter experience than traditional tattooing. The single or triple needle configuration creates less trauma to the skin, and experienced fine line artists develop a rhythm and pace that most clients find manageable even on more sensitive placements.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* CTA Block */}
          <ScrollReveal>
            <div className="bg-[#1a1a1a] text-[#f5f5f5] p-8 md:p-12 mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-[-0.01em] mb-4">
                Book Your Fine Line Tattoo Appointment in NYC
              </h2>
              <p className="text-[15px] leading-relaxed text-[#ccc] mb-8">
                Custom fine line tattoos by appointment only — Brooklyn studio, serving all of New York City. Limited availability — book early to secure your session.
              </p>
              <Link to="/appointment">
                <Button size="lg" variant="outline" className="group text-[13px] uppercase tracking-wider border-[#f5f5f5] text-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]">
                  Book an Appointment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* FAQ */}
          <ScrollReveal>
            <div className="space-y-8 text-[15px] text-[#1a1a1a] leading-relaxed">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Fine Line Tattoo FAQ
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    What is the difference between fine line and traditional tattooing?
                  </h3>
                  <p>Traditional tattooing uses larger needle groupings (6RL to 13RL) to create bold, saturated lines with strong contrast. Fine line tattooing uses a single or triple needle to create delicate, thin lines with soft gradients. The two styles produce fundamentally different visual results and require different technical skills.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    How much does a fine line tattoo cost in NYC?
                  </h3>
                  <p>Fine line tattoo pricing in NYC depends on the size, complexity and session length of your piece. Okan Uckun prices on a custom quote basis. Contact through the{' '}
                  <Link to="/appointment" className="underline underline-offset-4 hover:text-[#555] transition-colors">appointment page</Link>{' '}
                  to discuss your design and receive pricing information.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    Can fine line tattoos be done in color?
                  </h3>
                  <p>Yes, though fine line work is most commonly executed in black ink. Black holds its contrast against skin tones more reliably over time. Some fine line artists work in subtle color washes, but the longevity of color fine line work depends heavily on placement and aftercare.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    How do I prepare for a fine line tattoo appointment?
                  </h3>
                  <p>Hydrate well in the days leading up to your appointment. Avoid alcohol for 24 hours before. Moisturize the placement area regularly in the week before your session to ensure the skin is in good condition. Eat a proper meal before your appointment. Wear or bring clothing that provides easy access to the placement area.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    Is fine line tattooing right for me?
                  </h3>
                  <p>Fine line tattooing suits people who want designs with subtlety, detail and lightness — work that communicates through precision rather than boldness. It is particularly well-suited to people who prefer designs that feel like part of the skin rather than on top of it, and who value the drawing-like quality that only the fine line technique can achieve.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FineLineTattoos;
