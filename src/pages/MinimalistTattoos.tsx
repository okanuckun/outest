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
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://okanuckun.com/"},
        {"@type": "ListItem", "position": 2, "name": "Minimalist Tattoos", "item": "https://okanuckun.com/minimalist-tattoos"}
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
        "url": "https://okanuckun.com",
        "sameAs": ["https://www.instagram.com/okanuckun", "https://www.behance.net/okanuckun"]
      },
      "areaServed": {"@type": "City", "name": "New York City"},
      "url": "https://okanuckun.com/minimalist-tattoos",
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
        {"@type": "Question", "name": "Who is the best minimalist tattoo artist in NYC?", "acceptedAnswer": {"@type": "Answer", "text": "Okan Uckun is widely recognized as one of New York City's leading minimalist tattoo artists. His work in minimalist and post-minimalist tattooing — developed over more than a decade in NYC — has been featured in international publications and earned him nearly 300,000 Instagram followers. Studio in Brooklyn, serving clients across all of NYC."}},
        {"@type": "Question", "name": "What is the difference between minimalist and fine line tattoos?", "acceptedAnswer": {"@type": "Answer", "text": "Fine line tattooing is a technique (single or triple needle work producing thin, delicate lines). Minimalism is a philosophy (designs reduced to their essential elements). A minimalist tattoo is often executed in fine line technique but doesn't have to be — bold-line minimalist designs exist, as do richly detailed fine line designs that aren't minimalist."}},
        {"@type": "Question", "name": "What is post-minimalism in tattooing?", "acceptedAnswer": {"@type": "Answer", "text": "Post-minimalism retains the economy and precision of minimalism while incorporating warmth, personal meaning and visual nuance. Where pure minimalism can feel austere, post-minimalist work communicates meaning that feels personal despite its visual simplicity. Okan Uckun identifies his practice as post-minimalist."}}
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
        canonical="https://okanuckun.com/minimalist-tattoos"
        ogTitle="Minimalist Tattoos NYC | Okan Uckun"
        ogDescription="Custom minimalist tattoos by world-renowned NYC tattoo artist Okan Uckun. Minimal designs, intentional simplicity and precision — Brooklyn studio."
        ogImage="https://okanuckun.com/og-minimalist.jpg"
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
              Okan Uckun is one of New York City's most recognized minimalist tattoo artists, with nearly 300,000 Instagram followers and features in BuzzFeed, Bored Panda and My Modern Met — bringing over a decade of post-minimalist practice to his Brooklyn studio, serving collectors across all of NYC. This is the definitive guide to minimalist tattoos: what they are, the most popular minimalist tattoo ideas (mountain, cat, wave, butterfly, daisy, moon, sun, palm tree and dozens more), placement strategy, designs for men and women, memorial pieces, and how to commission custom minimalist work. Minimalism is not about being small. It is about being essential. A minimalist tattoo is one in which every element present is present for a reason — and nothing has been included that does not need to be there.
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

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Line Art Tattoos</h3>
              <p>Single-line and continuous-line drawings rendered as tattoos. Minimalist line art tattoo work takes the principle of "one line, never lifted from the page" and translates it to skin — a portrait, an animal, a landscape rendered in a single uninterrupted line. The technical demand is significant; the visual result is unforgettable.</p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section: Popular Minimalist Tattoo Subjects */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">Popular Minimalist Tattoo Subjects</h2>
              <p>
                Almost any subject can be rendered minimally — what changes is which lines you keep and which you cut. Below are the most-requested minimalist tattoo subjects and what makes each work in the medium. Each of these can be executed at small scale on the wrist or behind the ear, scaled up for the forearm or ribcage, or combined into a larger composition.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Nature & Landscape Tattoos</h3>
              <div className="space-y-4 pl-0">
                <div>
                  <p className="font-bold mb-1">Minimalist Mountain Tattoo</p>
                  <p>The most-requested minimalist subject globally. Mountains in minimalist form become triangles or simple ridge lines — often layered to suggest distance, sometimes paired with a sun, moon, or single tree. A minimalist mountain tattoo carries themes of stability, ambition, the outdoors and connection to specific landscapes.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Wave Tattoo</p>
                  <p>The Hokusai wave reduced to a single curl, or an even simpler suggestion of a horizon line over a swell. A minimalist wave tattoo carries themes of fluidity, the sea, surfing culture, and the constant movement underlying still surfaces.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Sun & Moon Tattoos</p>
                  <p>A minimalist sun is often just a circle with a few rays — or no rays at all. A minimalist moon is a crescent, a circle, or the outline of a phase. These celestial subjects are among the most versatile in minimalism: they sit alone, pair with each other, or anchor a larger composition. Sun and moon together make one of the most common couple tattoo minimalist combinations.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Palm Tree & Cactus Tattoos</p>
                  <p>Single botanical silhouettes that read as place-markers — palm tree for tropical or coastal connection, cactus for desert and Southwest associations. The single-form simplicity of minimalist palm tree and cactus tattoos makes them ideal for inner forearm or ankle placement.</p>
                </div>
              </div>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Floral Tattoos</h3>
              <div className="space-y-4 pl-0">
                <div>
                  <p className="font-bold mb-1">Minimalist Flower & Daisy Tattoos</p>
                  <p>A single stem with a flower head, rendered with the fewest possible lines. Daisies translate especially well into minimalism because their structure (centered disk surrounded by symmetrical petals) is already a minimal form. Minimalist flower tattoos and minimalist daisy tattoos remain the most popular feminine minimalist subjects.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Sunflower Tattoo</p>
                  <p>The radial symmetry of a sunflower head plus a single stem makes the sunflower one of the cleanest floral subjects for minimalism. Often executed as just the head and a few suggested petals, sometimes with a partial stem.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Lily of the Valley Tattoo</p>
                  <p>Small bell-shaped flowers hanging from a delicate arching stem — minimalism's favorite floral. Lily of the valley translates beautifully into single-line or sparse-line minimalist work, often placed on the spine, ribcage, or as a subtle wrist piece.</p>
                </div>
              </div>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Animal Tattoos</h3>
              <div className="space-y-4 pl-0">
                <div>
                  <p className="font-bold mb-1">Minimalist Cat Tattoo</p>
                  <p>One of the most-requested minimalist subjects — both because cats are loved subjects in general and because a cat's silhouette is intrinsically minimal. The single-line cat profile, the sitting cat in three or four lines, the cat's face reduced to triangles and dots — these forms have become contemporary classics.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Butterfly & Dragonfly Tattoos</p>
                  <p>Bilateral symmetry simplifies into pure geometry — wings become triangular forms or simple outlines, the body a single line. A minimalist butterfly tattoo or minimalist dragonfly tattoo lives somewhere between insect, design element and abstract symbol.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Bee Tattoo</p>
                  <p>A small, instantly recognizable subject that minimalism handles well — round body, simple wings, a few lines suggesting stripes. The bee carries connotations of work ethic, community and natural systems.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Shark Tattoo</p>
                  <p>Distinctive silhouette, easily reduced to a few essential lines. A minimalist shark tattoo retains the subject's power even when rendered in pure outline.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Hummingbird & Owl Tattoos</p>
                  <p>Birds in minimalist form lean on silhouette and gesture. A hummingbird mid-flight rendered in a few precise lines, an owl's round face reduced to its essential geometry — both are popular small minimalist pieces for collarbone, ankle and inner-forearm placements.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Tiny Turtle Tattoo</p>
                  <p>Especially popular as small, often-hidden minimalist tattoo work — inner ankle, behind the ear, side of the finger. The turtle's silhouette reads instantly even at very small scale.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Dragon Tattoo</p>
                  <p>A surprising fit for minimalism. A dragon reduced to its essential coiling line, body and wing-shape works beautifully — and provides a dramatic subject in restrained form.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Dog Tattoo</p>
                  <p>Often executed as a portrait of a specific beloved dog. The challenge: capture the individual character of the dog with the fewest possible lines. The best minimalist dog tattoos read as drawings of <em>that</em> dog, not of dogs in general.</p>
                </div>
              </div>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Symbol & Pop-Culture Tattoos</h3>
              <div className="space-y-4 pl-0">
                <div>
                  <p className="font-bold mb-1">Minimalist Cross Tattoo</p>
                  <p>A small, single-line cross on the inner wrist, behind the ear or on the inner forearm is among the most-requested minimalist symbol tattoos. Religious meaning is preserved while the visual treatment stays personal and contemporary.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Icarus Tattoo</p>
                  <p>The Icarus myth — flying too close to the sun — translates into minimalism as just two elements: a figure and a sun, or an arc of falling wings. Carries themes of ambition, hubris, and the cost of reaching beyond limits.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Minimalist Star Wars, One Piece & Lord of the Rings Tattoos</p>
                  <p>Pop-culture subjects translate well into minimalism when the artist focuses on iconic silhouettes — the Death Star, a single line from a One Piece logo, a Tolkien-inspired ring or rune. The minimal treatment keeps the reference legible without making the tattoo feel like fan merchandise.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section: For Men, Women & Couples */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">Minimalist Tattoo Ideas for Men, Women & Couples</h2>
              <p>
                Minimalism as a tattoo philosophy is genderless — the same restraint and intentionality applies regardless of who's wearing the work. But certain subjects, placements and scales tend to recur in specific directions.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Feminine Minimalist Tattoo Ideas</h3>
              <p>Floral subjects (daisy, lily of the valley, sunflower), animals (butterfly, cat, hummingbird, dragonfly), celestial (moon, sun), delicate symbols and short-form script dominate. Common placements: inner forearm, behind the ear, collarbone, sternum, spine, ankle. Sizing typically stays small — the elegance carries the piece, not the scale.</p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Minimalist Tattoo Ideas for Men</h3>
              <p>Mountain compositions, wave forms, geometric solids, line-art animals (shark, owl, dragon), architectural and{' '}
              <Link to="/line-work-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">linework</Link>{' '}
              subjects, and minimalist memento mori imagery. Placements scale across forearm, upper arm, chest, shoulder, calf. The technique gives men the opportunity for designs that read as graphic art rather than traditional tattoo iconography — sophistication without softness.</p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">Couple Tattoo Minimalist Ideas</h3>
              <p>Matching minimalist tattoos work because they communicate without needing to repeat the exact same image on both bodies. A sun on one wrist and a moon on the other. Two halves of a single geometric form. The same line, rendered slightly differently on each person. The minimalism makes the matching feel intentional rather than gimmicky.</p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section: Memorial & Memento Mori */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">Memorial & Memento Mori Minimalist Tattoos</h2>
              <p>
                Some of the most meaningful minimalist tattoo work is memorial — pieces commissioned to carry the memory of someone who has passed, or to keep the awareness of mortality close as a daily reminder to live with intention.
              </p>
              <p>
                <strong>Memorial minimalist tattoos</strong> often take the form of a single meaningful symbol associated with the person: a date in delicate roman numerals, an initial, the silhouette of a passed-away dog, a small flower the person loved, or a portrait reduced to its irreducible essential lines. The minimalist treatment is, for many people, more honoring than elaborate work — the restraint honors the gravity of what the piece carries.
              </p>
              <p>
                <strong>Minimalist memento mori tattoos</strong> work in a different register — they're not about a specific person but about the universal awareness of mortality. A simple skull rendered in minimal lines, the Latin phrase <em>memento mori</em> in delicate typography, a single hourglass, a small wilting flower. These pieces carry centuries of philosophical tradition (the Stoics, the Christian contemplatives, the Renaissance painters) in contemporary minimalist form.
              </p>
              <p>
                For both memorial and memento mori work, the consultation matters more than usual. The right minimal form for a piece this personal isn't obvious — it emerges from conversation, from understanding what the wearer is actually carrying, and from translating that into something that will hold its meaning across decades.
              </p>
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
                <div><p className="font-bold mb-1">Sternum</p><p>A minimalist sternum tattoo is one of the most architecturally interesting placements. The sternum's central, bilateral placement amplifies minimalist compositions with symmetry or vertical orientation — a single botanical stem, a small floral mandala, a sacred geometry form, or a delicate line of script. Minimal pieces placed with intention here carry significant visual weight despite their simplicity. Sternum is also among the most intimate placements, visible only when the wearer chooses.</p></div>
                <div><p className="font-bold mb-1">Spine</p><p>Long vertical minimalist compositions follow the spine naturally — small flowers, dainty repeating elements, or a single column of fine script from nape to lower back. The spine's natural axis is the ideal canvas for elongated minimalist work.</p></div>
                <div><p className="font-bold mb-1">Ribcage</p><p>The ribcage's curved surface supports flowing minimalist compositions — small botanical stems, single-line illustrations, scattered minimal symbols. Healing takes longer due to the skin's movement with breathing.</p></div>
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
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">How small can a minimalist tattoo be?</h3>
                  <p>Minimalist tattoos can be very small — pieces under an inch are common — but the floor on size depends on the design's level of detail. Lines too close together at small scale will merge as the tattoo ages. An experienced minimalist tattoo artist designs every piece with its long-term legibility in mind: a tiny minimalist piece must hold its visual integrity at the 10-year mark, not just the day it's tattooed. If the design needs to be smaller than its details can support, the right answer is to simplify the design — not shrink it.</p>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">Do minimalist tattoos age well?</h3>
                  <p>Minimalist tattoos age well when executed correctly. Simple, clean designs with well-placed lines hold their visual clarity better than complex shaded work over time. The key factors are correct ink depth (preventing fading or blowout), adequate scale for the design's detail level, and consistent aftercare including daily SPF on healed tattoos. A properly placed minimalist tattoo can look essentially identical at the 10-year mark as it did at the 6-month mark.</p>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">What's the difference between minimalist and fine line tattoos?</h3>
                  <p>The two overlap significantly but are not the same. Fine line tattooing is a <em>technique</em> — single or triple needle work producing thin, delicate lines. Minimalism is a <em>philosophy</em> — designs reduced to their essential elements. A minimalist tattoo is often executed in fine line technique, but it doesn't have to be. A bold-line minimalist design exists; a fine-line non-minimalist design (richly detailed botanicals, complex fine-line portraits) also exists. See the{' '}
                  <Link to="/fine-line-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">Fine Line Tattoos page</Link>{' '}
                  for the technique side.</p>
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
