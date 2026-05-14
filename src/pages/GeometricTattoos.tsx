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
        {"@type": "ListItem", "position": 2, "name": "Geometric Tattoos", "item": "https://www.okanuckun.com/geometric-tattoos"}
      ]
    },
    {
      "@type": "Service",
      "name": "Geometric Tattoo NYC",
      "description": "Custom geometric tattoo designs including sacred geometry, minimalist patterns, mandala-inspired work and precise linework by Okan Uckun in New York City.",
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
      "areaServed": {
        "@type": "City",
        "name": "New York City"
      },
      "url": "https://www.okanuckun.com/geometric-tattoos",
      "serviceType": "Tattoo Art",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Geometric Tattoo Styles",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sacred Geometry Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Minimalist Geometric Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Geometric Mandala Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Geometric Fine Line Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Geometric Sleeve Tattoo"}}
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a geometric tattoo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A geometric tattoo uses precise shapes — circles, triangles, hexagons, lines and sacred geometry patterns — to create designs that balance mathematical perfection with personal meaning. Unlike traditional tattoos, geometric designs rely on symmetry, precision and the interplay of positive and negative space."
          }
        },
        {
          "@type": "Question",
          "name": "What is the meaning of a geometric tattoo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Geometric tattoos carry rich symbolism. Circles represent infinity and wholeness. Triangles symbolize balance between opposing forces. Sacred geometry patterns reflect the mathematical structures underlying the universe. The meaning is deeply personal — the geometry becomes a visual language for the wearer's philosophy, values or spiritual beliefs."
          }
        },
        {
          "@type": "Question",
          "name": "How long do geometric tattoos last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Geometric tattoos done with precise linework can maintain their sharpness for 10+ years with proper aftercare. The key factors are artist precision, ink depth, sun protection, and consistent moisturizing. Fine line geometric tattoos require a skilled artist to ensure lines stay crisp over time."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a geometric tattoo cost in NYC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Custom geometric tattoo pricing in NYC varies based on size, complexity and artist experience. Rates typically start from $200 for small pieces and increase with complexity. Okan Uckun works on a custom quote basis — contact through the appointment page for pricing details."
          }
        },
        {
          "@type": "Question",
          "name": "Where is the best place to get a geometric tattoo in NYC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Okan Uckun is widely recognized as one of the leading geometric tattoo artists in New York City, specializing in minimalist geometric designs, sacred geometry and precise linework. Studio in Brooklyn, serving clients across all of NYC."
          }
        }
      ]
    }
  ]
};

const GeometricTattoos: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Geometric Tattoos NYC | Okan Uckun — Sacred Geometry & Minimalist Tattoo Artist"
        description="Geometric tattoo artist in NYC. Sacred geometry, minimalist geometric designs and precise linework by Okan Uckun. Brooklyn studio, serving all of New York City."
        canonical="https://www.okanuckun.com/geometric-tattoos"
        ogTitle="Geometric Tattoos NYC | Okan Uckun"
        ogDescription="Sacred geometry and minimalist geometric tattoos by world-renowned NYC tattoo artist Okan Uckun. Precision linework, custom designs — Brooklyn studio, all of NYC served."
        ogImage="https://www.okanuckun.com/og-geometric.jpg"
        ogType="website"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-[#f5f5f5]">
        <Navigation variant="dark" />

        <main className="max-w-[720px] mx-auto px-6 md:px-12 pt-24 pb-32">
          {/* Hero */}
          <ScrollReveal>
            <span className="text-[11px] text-[#888] uppercase tracking-wider block mb-6">
              GEOMETRIC TATTOOS
            </span>
            <h1 className="text-[36px] md:text-[48px] font-black text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] uppercase mb-8">
              Geometric Tattoos in NYC
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#1a1a1a] leading-relaxed mb-12">
              Okan Uckun is widely recognized as one of New York City's leading geometric tattoo artists, with nearly 300,000 Instagram followers and international features in BuzzFeed, Bored Panda and My Modern Met. Geometric tattoo art lives at the intersection of mathematics and personal expression — and nowhere is it executed with more intention than in the work of this New York City-based tattoo artist. From sacred geometry compositions to minimalist{' '}
              <Link to="/line-work-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">linework</Link>, each geometric design is built from scratch for the individual, using the body's natural contours as the canvas.
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

          {/* Section 1 */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                What Is a Geometric Tattoo?
              </h2>
              <p>
                A geometric tattoo uses shapes — circles, triangles, hexagons, sacred patterns, grids and lines — as the primary visual language. Unlike traditional tattoos that rely on illustration or shading, geometric tattoos draw their power from mathematical precision: the perfect spacing between parallel lines, the exact angle of a triangle, the flawless arc of a circle.
              </p>
              <p>
                This style traces its roots to ancient cultures. Sacred geometry appears in the architecture of the Parthenon, the spirals of nautilus shells, the patterns of Islamic geometric art and the mandalas of Buddhist tradition. In modern tattooing, these ancient visual systems have been reinterpreted through a contemporary minimalist lens.
              </p>
              <p>
                What makes geometric tattooing technically demanding is that it leaves no room for error. A single misaligned line in a geometric composition breaks the entire visual harmony. This is why choosing the right artist — one with architectural precision and an intuitive understanding of spatial relationships — defines the difference between a tattoo that holds its integrity for decades and one that doesn't.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section 2: Styles Guide */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Geometric Tattoo Styles: A Complete Guide
              </h2>

              {/* Sacred Geometry */}
              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Sacred Geometry Tattoos
              </h3>
              <p>
                Sacred geometry refers to the philosophical and spiritual patterns believed to underlie the structure of the universe. The Flower of Life, Metatron's Cube, the Fibonacci spiral, the Platonic solids — these archetypal forms have carried meaning across cultures for thousands of years.
              </p>
              <p>
                In tattoo form, sacred geometry creates compositions that feel both ancient and profoundly personal. A Flower of Life on the sternum, a Metatron's Cube across the forearm, or a Fibonacci spiral wrapping the ribcage — these designs work because the shapes themselves carry weight, regardless of cultural background.
              </p>
              <p>
                Okan Uckun's approach to sacred geometry is rooted in architectural thinking. Every element in the composition is placed with intention — the line weight, the scale, the placement on the body. The result is sacred geometry that doesn't just reference these ancient systems but embodies their precision.
              </p>

              {/* Minimalist */}
              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Minimalist Geometric Tattoos
              </h3>
              <p>
                Minimalism and geometry share the same philosophy: remove everything unnecessary, and what remains becomes more powerful. A minimalist geometric tattoo uses the fewest possible elements — a single line, a simple triangle, a circle — to convey maximum meaning.
              </p>
              <p>
                The challenge of minimalist geometric work is that simplicity is unforgiving. When there are only three lines in a composition, each one has to be perfect. This demands a different kind of skill than complex tattooing — not more strokes, but more intention behind fewer strokes.
              </p>
              <p>
                Minimalist geometric tattoos work exceptionally well as standalone pieces or as part of a larger compositional body of work. A series of small geometric forms across the arm, for example, can build into a cohesive visual language over multiple sessions.
              </p>

              {/* Mandala */}
              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Geometric Mandala Tattoos
              </h3>
              <p>
                The mandala — a circular diagram representing the universe in Hindu and Buddhist cosmology — is one of the most requested geometric tattoo styles. In geometric tattooing, the mandala is approached not through decorative convention but through mathematical structure: concentric circles, radial symmetry, precise petal counts.
              </p>
              <p>
                A geometric mandala tattoo on the shoulder, knee cap, sternum or upper back can become one of the most striking pieces in any collection. The circular form works naturally with the body's curved surfaces, creating a sense of the design belonging to the body rather than sitting on top of it.
              </p>

              {/* Fine Line */}
              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Geometric Fine Line Tattoos
              </h3>
              <p>
                Where geometric tattooing meets{' '}
                <Link to="/fine-line-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">fine line</Link>{' '}
                technique, something extraordinary happens. The precision of geometric forms combined with the delicacy of single-needle linework creates designs that feel simultaneously bold and ethereal.
              </p>
              <p>
                Geometric{' '}
                <Link to="/fine-line-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">fine line tattoos</Link>{' '}
                are Okan Uckun's signature territory. Having pioneered aspects of the{' '}
                <Link to="/line-work-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">linework</Link>{' '}
                tattoo approach in the 2010s, his understanding of how fine lines behave — how they age, how they interact with skin tone, how they should be spaced to maintain legibility over time — is built on over a decade of focused practice.
              </p>

              {/* Sleeve */}
              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Geometric Sleeve Tattoos
              </h3>
              <p>
                A full or half sleeve built around geometric principles is one of the most ambitious and rewarding tattooing projects a collector can undertake. A geometric sleeve requires thinking about the arm as a three-dimensional surface — a design that looks stunning from the front must also resolve correctly on the side and back of the arm.
              </p>
              <p>
                The planning phase for a geometric sleeve is as important as the tattooing itself. Proportions, flow, the relationship between filled and empty space, how the design moves when the arm moves — all of these must be considered before a single needle touches skin.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section 3: Meanings */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Geometric Tattoo Meanings: What the Shapes Represent
              </h2>
              <p>
                Geometric forms carry universal symbolic weight. Understanding the meanings associated with different shapes helps collectors make more intentional decisions about their designs:
              </p>

              <div className="space-y-6 pl-0">
                <div>
                  <p className="font-bold mb-1">Circle and Sphere</p>
                  <p>The most fundamental of geometric forms. Circles represent completeness, infinity, the cyclical nature of time and the unified whole. A circle in a tattoo can symbolize life, eternity, protection or the self in its most complete expression.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Triangle</p>
                  <p>One of the most versatile geometric symbols. An upward-pointing triangle traditionally represents masculine energy, ambition and fire. A downward-pointing triangle represents feminine energy, depth and water. Two interlocking triangles — the Star of David or hexagram — represent the union of opposites, balance between the material and spiritual.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Hexagon</p>
                  <p>Nature's most efficient shape — the pattern found in honeycombs, snowflakes and the compound eye of insects. In tattoo form, hexagons represent efficiency, balance, structure and the interconnectedness of living systems.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Fibonacci Spiral</p>
                  <p>The mathematical ratio found in the nautilus shell, the sunflower's seed arrangement, the curl of a galaxy. The Fibonacci spiral in a tattoo represents growth, the harmony between the part and the whole, and the underlying order of nature.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Sacred Geometry Symbols</p>
                  <p>The Flower of Life represents the interconnectedness of all living things. Metatron's Cube contains all five Platonic solids and is considered a map of creation. The Sri Yantra is one of the most complex sacred geometry patterns, consisting of nine interlocking triangles that represent the cosmos.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section 4: Okan's Approach */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                The Okan Uckun Approach to Geometric Tattooing
              </h2>
              <p>
                With a background that bridges architecture, fine art and tattooing, Okan Uckun brings a design vocabulary to geometric tattooing that goes beyond pattern application. Every geometric tattoo begins not with a template but with an analysis of the individual: body structure, proportions, the natural lines and curves of the placement area, and the collector's personal relationship to the design.
              </p>
              <p className="italic text-[#555]">
                "The geometry has to belong to the body," says Uckun. "I'm not placing a design on skin — I'm building a relationship between mathematical form and human form."
              </p>
              <p>
                This approach has earned Okan recognition globally. With nearly 300,000 followers on Instagram and features in publications including BuzzFeed, Bored Panda and My Modern Met, his work has defined what minimalist geometric tattooing can look like when executed with genuine architectural precision.
              </p>
              <p>
                Each geometric tattoo appointment is a collaborative process. You bring references, placement preferences and a sense of the meaning you want the design to carry. Okan brings ten-plus years of practice, an instinct for scale and composition, and the technical precision to execute geometric forms that will remain sharp for decades.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section 5: Placement Guide */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Geometric Tattoo Placement Guide
              </h2>
              <p>
                Placement is not just an aesthetic decision — it is a compositional one. The body's surfaces interact with geometric forms in predictable ways, and the right placement amplifies the design's impact:
              </p>

              <div className="space-y-6">
                <div>
                  <p className="font-bold mb-1">Forearm</p>
                  <p>Ideal for elongated geometric compositions, sacred geometry bands and linework pieces. The flat inner forearm and the curved outer forearm offer two distinct canvas characters.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Sternum / Chest</p>
                  <p>The sternum creates a natural vertical axis — perfect for compositions with bilateral symmetry. Chest plates with geometric structures are among the most powerful placements available.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Upper Back / Shoulder Blade</p>
                  <p>The flat expanse of the upper back accommodates large-scale geometric compositions with room for negative space. Shoulder blade placements take advantage of the scapula's natural movement.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Knee Cap</p>
                  <p>One of the most structurally interesting placements for circular or radially symmetric designs. A geometric mandala centered on the knee cap works with the joint's natural geometry.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Ribcage</p>
                  <p>Demands respect for the body's contours. Long, flowing geometric compositions that follow the rib structure create a sense of the design growing from the body rather than being applied to it.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Upper Arm / Shoulder</p>
                  <p>The natural transition between shoulder and upper arm offers opportunities for compositions that wrap the joint, creating the impression of three-dimensional structure.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* CTA Block */}
          <ScrollReveal>
            <div className="bg-[#1a1a1a] text-[#f5f5f5] p-8 md:p-12 mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-[-0.01em] mb-4">
                Book Your Geometric Tattoo in NYC
              </h2>
              <p className="text-[15px] leading-relaxed text-[#ccc] mb-8">
                Custom geometric tattoos by appointment only. Whether you're drawn to sacred geometry, minimalist linework or a complex geometric composition built specifically for your body — the process begins with a conversation.
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

          {/* Section 6: FAQ */}
          <ScrollReveal>
            <div className="space-y-8 text-[15px] text-[#1a1a1a] leading-relaxed">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Geometric Tattoo FAQ
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    What is the difference between a geometric tattoo and a sacred geometry tattoo?
                  </h3>
                  <p>All sacred geometry tattoos are geometric, but not all geometric tattoos are sacred geometry. Geometric tattoos encompass any design built from mathematical shapes and forms. Sacred geometry specifically refers to patterns from esoteric and spiritual traditions — the Flower of Life, Metatron's Cube, the Sri Yantra — that are believed to encode the structure of the universe.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    Do geometric tattoos fade faster than other styles?
                  </h3>
                  <p>Geometric tattoos done with fine lines require proper aftercare and sun protection to maintain their sharpness. The precision of the lines means that any fading is immediately visible. With proper care — daily SPF on healed tattoos, consistent moisturizing, avoiding prolonged sun exposure —{' '}
                  <Link to="/fine-line-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">fine line</Link>{' '}
                  geometric tattoos can hold their integrity for ten years or more before requiring a touch-up.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    How much does a geometric tattoo cost in NYC?
                  </h3>
                  <p>Custom geometric tattoo pricing depends on size, placement complexity and session length. Okan Uckun works on a custom quote basis for each project. Contact through the{' '}
                  <Link to="/appointment" className="underline underline-offset-4 hover:text-[#555] transition-colors">appointment page</Link>{' '}
                  to discuss your design and receive pricing information.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    Can geometric tattoos be done in color?
                  </h3>
                  <p>Yes, though Okan Uckun's work is primarily executed in black ink. The precision and longevity of geometric work is best maintained in black, which holds its contrast against skin tones more reliably than color over time.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    How should I prepare for a geometric tattoo appointment?
                  </h3>
                  <p>Come with references from Okan's{' '}
                  <Link to="/work" className="underline underline-offset-4 hover:text-[#555] transition-colors">portfolio</Link>{' '}
                  as well as images from other artists, architects, designers or any visual sources that speak to what you're drawn to. Photographs of your placement from multiple angles are helpful. The more clearly you can communicate your aesthetic direction, the stronger the resulting design will be.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    Is a geometric tattoo right for me?
                  </h3>
                  <p>If you value precision, symbolism and designs that feel intentional rather than decorative, geometric tattooing is likely a strong fit. It appeals to people who think in systems — architects, designers, mathematicians, people drawn to philosophy and spiritual traditions — as well as anyone who wants a tattoo that carries genuine visual weight without relying on complexity for complexity's sake.</p>
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

export default GeometricTattoos;
