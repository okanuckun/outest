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
        {"@type": "ListItem", "position": 2, "name": "Minimalist Tattoos", "item": "https://www.okanuckun.com/minimalist-tattoos"}
      ]
    },
    {
      "@type": "Service",
      "name": "Minimalist Tattoo NYC",
      "description": "Custom minimalist tattoo designs by Okan Uckun in New York City. Small minimalist tattoos, minimalism-inspired body art and intentional minimal designs. Brooklyn studio, serving all of NYC.",
      "provider": {
        "@type": "Person",
        "name": "Okan Uckun",
        "jobTitle": "Tattoo Artist",
        "url": "https://www.okanuckun.com",
        "sameAs": ["https://www.instagram.com/okanuckun", "https://www.behance.net/okanuckun"]
      },
      "areaServed": {"@type": "City", "name": "New York City"},
      "url": "https://www.okanuckun.com/minimalist-tattoos",
      "serviceType": "Tattoo Art",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Minimalist Tattoo Styles",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Small Minimalist Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Minimalist Symbol Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Minimalist Geometric Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Minimalist Fine Line Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Minimalist Portrait Tattoo"}}
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question", "name": "What is a minimalist tattoo?", "acceptedAnswer": {"@type": "Answer", "text": "A minimalist tattoo uses the fewest possible visual elements to communicate an idea, emotion or symbol. Clean lines, simple forms, intentional negative space and restrained composition are the defining characteristics. The goal is not less complexity for its own sake but maximum impact through economy of means."}},
        {"@type": "Question", "name": "What are popular minimalist tattoo ideas?", "acceptedAnswer": {"@type": "Answer", "text": "Popular minimalist tattoo ideas include single line geometric forms, small symbols with personal meaning, minimal botanical elements, architectural details, abstract forms that suggest rather than depict, and minimalist portraits or figure studies. The most compelling minimalist tattoos are those where simplicity serves a specific intention rather than just being small."}},
        {"@type": "Question", "name": "How small can a minimalist tattoo be?", "acceptedAnswer": {"@type": "Answer", "text": "Minimalist tattoos can be very small, but the minimum viable size depends on the design's detail level. Very fine details cannot be executed below a certain scale — the lines would merge as the tattoo heals and ages. An experienced minimalist tattoo artist knows the minimum scale at which each design can be executed and still hold its integrity over time."}},
        {"@type": "Question", "name": "Do minimalist tattoos age well?", "acceptedAnswer": {"@type": "Answer", "text": "Minimalist tattoos age well when executed correctly. Simple, clean designs with well-placed lines hold their visual clarity better than complex shaded work over time. The key factors are correct ink depth, adequate scale for the design's detail level, and consistent aftercare including daily SPF on healed tattoos."}},
        {"@type": "Question", "name": "Who is the best minimalist tattoo artist in NYC?", "acceptedAnswer": {"@type": "Answer", "text": "Okan Uckun is widely recognized as one of New York City's leading minimalist tattoo artists. His work in minimalist and post-minimalist tattooing — developed over more than a decade in NYC — has been featured in international publications and earned him nearly 300,000 Instagram followers. Studio in Brooklyn, serving clients across all of NYC."}}
      ]
    }
  ]
};

const MinimalistTattoos: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Minimalist Tattoos NYC | Okan Uckun — Minimalist Tattoo Artist"
        description="Minimalist tattoo artist in NYC. Custom small minimalist tattoos, minimalist tattoo ideas and designs by Okan Uckun. Brooklyn studio, serving all of New York City."
        canonical="https://www.okanuckun.com/minimalist-tattoos"
        ogTitle="Minimalist Tattoos NYC | Okan Uckun"
        ogDescription="Custom minimalist tattoos by world-renowned NYC tattoo artist Okan Uckun. Minimal designs, intentional simplicity and precision — Brooklyn studio."
        ogImage="https://www.okanuckun.com/og-minimalist.jpg"
        ogType="website"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-[#f5f5f5]">
        <Navigation variant="dark" />

        <main className="max-w-[720px] mx-auto px-6 md:px-12 pt-24 pb-32">
          {/* Hero */}
          <ScrollReveal>
            <span className="text-[11px] text-[#888] uppercase tracking-wider block mb-6">MINIMALIST TATTOOS</span>
            <h1 className="text-[36px] md:text-[48px] font-black text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] uppercase mb-8">
              Minimalist Tattoos in NYC
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#1a1a1a] leading-relaxed mb-12">
              Okan Uckun is one of New York City's most recognized minimalist tattoo artists, with nearly 300,000 Instagram followers and features in BuzzFeed, Bored Panda and My Modern Met — bringing over a decade of post-minimalist practice to his Brooklyn studio, serving clients across all of NYC. Minimalism is not about being small. It is about being essential. A minimalist tattoo is one in which every element present is present for a reason — and nothing has been included that does not need to be there. This demands more from both artist and collector than conventional tattooing. It requires the ability to identify what is truly essential about an idea, and the skill to render that essence with complete precision. Okan Uckun has spent his entire career exploring this territory, developing a body of work that defines what minimalist tattooing can be when approached with genuine artistic seriousness.
            </p>
          </ScrollReveal>

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
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">What Is Minimalist Tattooing?</h2>
              <p>The minimalist tattoo draws its philosophy from minimalism as an art movement — the mid-20th century practice of reducing visual art to its most essential elements. Donald Judd, Dan Flavin, Sol LeWitt — these artists proved that when you remove everything unnecessary, what remains becomes more powerful, not less.</p>
              <p>In tattooing, this philosophy translates into designs that use the fewest possible elements — lines, forms, negative space — to communicate the maximum possible meaning. Not small for smallness's sake, not simple out of limitation, but deliberately minimal because the right idea expressed with complete economy is more potent than the same idea surrounded by elaboration.</p>
              <p>
                Minimalist tattooing sits at the intersection of several disciplines:{' '}
                <Link to="/fine-line-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">fine line</Link>{' '}
                technique provides the needle precision. Graphic design provides the compositional thinking. Fine art provides the philosophical framework. Architecture provides the structural sensibility. Okan Uckun's work is rare in genuinely bringing all four perspectives to bear on each piece.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Styles */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">Minimalist Tattoo Ideas and Styles</h2>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Small Minimalist Tattoos</h3>
              <p>Small minimalist tattoos are the most requested category in Okan Uckun's practice — single pieces that carry significant personal meaning in a compact, considered form.</p>
              <p>The challenge of small minimalist work is scale. Below a certain size, fine details become unresolvable — lines too close together will merge as the tattoo ages. An experienced artist knows exactly how to design for longevity at small scales: what level of detail can be executed cleanly, what spacing between lines will hold over time, what forms translate to small scale without losing their meaning.</p>
              <p>Small minimalist tattoos work particularly well as standalone pieces on wrists, ankles, behind the ear, on the inner forearm or on the collarbone. They also work as additions to larger tattoo collections — considered, carefully placed punctuation marks within a broader body of work.</p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Symbol Tattoos</h3>
              <p>A symbol is a visual form that carries meaning beyond its literal appearance. Minimalist symbol tattoos take recognizable symbols — cultural, personal, spiritual, mathematical — and render them with the precision and intentionality of fine art rather than the decorative convention of traditional tattoo iconography.</p>
              <p>The difference between a symbol tattoo executed minimally and the same symbol executed in a conventional tattoo style is the difference between a considered design choice and a stock image. The minimal rendering forces the artist to understand the symbol's essential form and express it with clean confidence.</p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Geometric Tattoos</h3>
              <p>
                Geometry is naturally minimalist — mathematical forms carry their meaning in their structure, not their decoration.{' '}
                <Link to="/geometric-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">Minimalist geometric tattoos</Link>{' '}
                take this further, using simple geometric forms with maximum intentionality: a single circle that means wholeness, a triangle that speaks to balance, a grid that suggests order and interconnection.
              </p>
              <p>Okan Uckun's geometric minimalism is built on architectural thinking. Every element in a minimalist geometric composition is placed in precise relationship to the space around it. The geometry is not decoration — it is structure.</p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Fine Line Tattoos</h3>
              <p>
                The combination of minimalist philosophy and{' '}
                <Link to="/fine-line-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">fine line tattoo</Link>{' '}
                technique is the natural center of Okan Uckun's practice. Fine line tattooing provides the technical means — the thinnest possible lines, the most delicate gradations — while minimalist thinking provides the compositional discipline: use only what is necessary.
              </p>
              <p>Minimalist fine line tattoos achieve a quality that no other tattoo approach can match: they read simultaneously as complex and simple, as deeply considered and effortlessly light. They sit on the skin without asserting themselves aggressively, communicating to those who look closely rather than demanding attention from across the room.</p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Portrait Tattoos</h3>
              <p>Portrait tattooing conventionally relies on shading, tonal range and fine detail to achieve likeness. Minimalist portrait work sets these aside and asks: what is the irreducible minimum of lines that still captures a recognizable face, a specific presence?</p>
              <p>This is among the most demanding applications of minimalist thinking in tattooing. It requires not just technical skill but the ability to perceive the essential structural lines of a face — the line of the jaw, the particular curve of an eye, the proportion that distinguishes one person from another — and render them with economy and confidence.</p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Philosophy */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">Minimalism as a Tattoo Philosophy</h2>
              <p>What draws people to minimalist tattooing is not simply aesthetic preference. It reflects a set of values about what a tattoo should be and do.</p>
              <p>A minimalist tattoo treats the skin as a surface to be respected rather than covered. It acknowledges that negative space — the untattooed skin — is as much a part of the design as the tattooed elements. It reflects a belief that meaning should be communicated through precision and intentionality rather than through accumulation.</p>
              <p>These values align naturally with the principles of good design in any discipline. The best architecture, product design, typography, and graphic design all share the minimalist conviction that adding more is rarely the answer — that the discipline of constraint produces stronger results than the freedom of excess.</p>
              <p>For collectors who think about their tattoos in this way — as design objects as much as personal expression, as permanent additions to their bodies that should hold up to decades of attention — minimalist tattooing offers something that other approaches cannot.</p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Post-Minimalism */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">Okan Uckun and Post-Minimalism</h2>
              <p>Okan Uckun describes his practice as post-minimalist. Where pure minimalism can tend toward cold austerity, post-minimalism retains the economy and precision of minimalism while allowing for warmth, personal meaning and visual nuance.</p>
              <p>A post-minimalist tattoo is minimal in its means but not in its effect. The design may consist of very few elements — a handful of lines, a single geometric form — but those elements are chosen and placed with an attention to meaning, proportion and the body's specific qualities that give the finished piece genuine emotional resonance.</p>
              <p>This distinction matters for collectors. A purely minimal tattoo can feel abstract or detached. A post-minimalist tattoo by Okan Uckun carries its meaning in a way that is personal without being literal, visually powerful without being visually busy.</p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Placement */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">Minimalist Tattoo Placement Ideas</h2>
              <p>Minimalist designs offer more placement flexibility than complex tattoos — their simplicity means they work well at scales and in locations where detailed work cannot be executed:</p>

              <div className="space-y-6">
                <div><p className="font-bold mb-1">Wrist</p><p>A classic placement for small minimalist work. The inner wrist's visibility makes it ideal for designs that carry daily personal meaning. The outer wrist works for slightly larger pieces.</p></div>
                <div><p className="font-bold mb-1">Collarbone</p><p>Long, horizontal minimalist compositions work beautifully along the collarbone, following the bone's natural line.</p></div>
                <div><p className="font-bold mb-1">Behind the Ear</p><p>A discreet, intimate placement for very small minimalist pieces — symbols, minimal forms, a single word.</p></div>
                <div><p className="font-bold mb-1">Inner Forearm</p><p>The most versatile placement for minimalist work at any scale. The inner forearm's relatively flat surface and easy visibility make it the natural home for considered minimalist compositions.</p></div>
                <div><p className="font-bold mb-1">Ankle</p><p>Delicate small minimalist pieces work well here. Choose designs that hold well at small scale — forms without excessive fine detail.</p></div>
                <div><p className="font-bold mb-1">Finger</p><p>Minimal ring tattoos, small symbols and simple geometric forms work at finger scale, but require understanding that finger tattoos fade faster than other placements due to skin regeneration.</p></div>
                <div><p className="font-bold mb-1">Sternum</p><p>The sternum's central, bilateral placement amplifies minimalist compositions with symmetry or vertical orientation. Minimal pieces placed with intention here carry significant visual weight despite their simplicity.</p></div>
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* CTA Block */}
          <ScrollReveal>
            <div className="bg-[#1a1a1a] text-[#f5f5f5] p-8 md:p-12 mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-[-0.01em] mb-4">Book Your Minimalist Tattoo in NYC</h2>
              <p className="text-[15px] leading-relaxed text-[#ccc] mb-8">Custom minimalist tattoos by appointment only — Brooklyn studio, serving all of NYC. Whether you have a clear vision or want to develop one through the design process — book your consultation today.</p>
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
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">Minimalist Tattoo FAQ</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">What makes a tattoo truly minimalist vs simply small?</h3>
                  <p>Size is not the defining quality of minimalist tattooing — intention is. A large tattoo can be minimalist if it uses a limited vocabulary of elements with deliberate economy. A small tattoo can be non-minimalist if it tries to pack in more detail than its scale can support. True minimalist tattooing is characterized by the discipline to include only what is necessary.</p>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">How much do minimalist tattoos cost in NYC?</h3>
                  <p>Minimalist tattoo pricing in NYC varies with design complexity and session length. Custom minimalist work by Okan Uckun is priced on a per-project basis. Contact through the{' '}
                  <Link to="/appointment" className="underline underline-offset-4 hover:text-[#555] transition-colors">appointment page</Link>{' '}
                  for pricing information.</p>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">Can minimalist tattoos cover scars or existing tattoos?</h3>
                  <p>In some cases, yes — a well-placed minimalist design can incorporate a scar or work with the visual impact of an existing tattoo. This requires consultation to assess the specific situation. Contact through the{' '}
                  <Link to="/appointment" className="underline underline-offset-4 hover:text-[#555] transition-colors">appointment page</Link>{' '}
                  to discuss your situation.</p>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">How do I communicate what I want for a minimalist tattoo?</h3>
                  <p>The most useful references are pieces from Okan's existing{' '}
                  <Link to="/work" className="underline underline-offset-4 hover:text-[#555] transition-colors">portfolio</Link>{' '}
                  combined with broader visual references — architects, designers, fine artists, photographers whose work reflects your aesthetic sensibility. The more clearly you can articulate what you're drawn to and why, the more precisely the design can be developed to serve your intention.</p>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">What is post-minimalism in tattooing?</h3>
                  <p>Post-minimalism retains the economy and precision of minimalism while incorporating warmth, personal meaning and visual nuance. Where pure minimalism can feel austere, post-minimalist work communicates meaning that feels genuinely personal despite its visual simplicity. Okan Uckun identifies his practice as post-minimalist for this reason.</p>
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

export default MinimalistTattoos;
