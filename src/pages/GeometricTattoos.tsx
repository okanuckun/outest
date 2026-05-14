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
        {"@type": "ListItem", "position": 2, "name": "Geometric Tattoos", "item": "https://okanuckun.com/geometric-tattoos"}
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
        "url": "https://okanuckun.com",
        "sameAs": [
          "https://www.instagram.com/okanuckun",
          "https://www.behance.net/okanuckun"
        ]
      },
      "areaServed": {
        "@type": "City",
        "name": "New York City"
      },
      "url": "https://okanuckun.com/geometric-tattoos",
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
            "text": "A geometric tattoo is a design built from mathematical shapes — circles, triangles, hexagons, lines and sacred geometry patterns — instead of traditional illustration or shading. The visual power comes from precision: exact angles, perfectly parallel lines, deliberately calculated spacing. Geometric tattoos can be pure pattern work or combine geometric construction with subjects like animals, plants and architectural forms."
          }
        },
        {
          "@type": "Question",
          "name": "What does a geometric tattoo mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Geometric tattoo meaning depends on the specific shapes. Circles represent completeness and infinity. Triangles represent direction, balance and the relationship between opposing forces. Hexagons represent efficiency and natural structure. Sacred geometry patterns like the Flower of Life or Metatron's Cube carry esoteric meaning rooted in thousands of years of philosophical tradition. The meaning of any geometric tattoo is ultimately personal — the shapes provide a vocabulary; the wearer provides the sentence."
          }
        },
        {
          "@type": "Question",
          "name": "How is a geometric tattoo design made?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Custom geometric tattoo design starts with a conversation about meaning, placement and aesthetic direction. From there, the artist sketches concepts — first by hand to test composition, then digitally to refine proportions and verify mathematical precision. Sacred geometry patterns are constructed from their underlying rules rather than copied. Once approved, a stencil is created and the tattoo is executed."
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
        title="Geometric Tattoos NYC | Okan Uckun — Sacred Geometry Artist"
        description="Geometric tattoo artist in NYC. Sacred geometry, minimalist geometric designs and precise linework by Okan Uckun. Brooklyn studio, serving all of New York City."
        canonical="https://okanuckun.com/geometric-tattoos"
        ogTitle="Geometric Tattoos NYC | Okan Uckun"
        ogDescription="Sacred geometry and minimalist geometric tattoos by NYC tattoo artist Okan Uckun. Precision linework, custom designs — Brooklyn studio."
        ogImage="https://okanuckun.com/og-geometric.jpg"
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
              Okan Uckun is widely recognized as one of New York City's leading geometric tattoo artists, with nearly 300,000 Instagram followers and international features in BuzzFeed, Bored Panda and My Modern Met. Geometric tattoo art lives at the intersection of mathematics and personal expression — circles, triangles, hexagons, sacred geometry patterns, mandalas and architectural linework — and nowhere is it executed with more intention than in the work of this Brooklyn-based artist serving collectors across all of NYC. From sacred geometry compositions to minimalist{' '}
              <Link to="/line-work-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">linework</Link>, each geometric tattoo design is built from scratch for the individual, using the body's natural contours as the canvas. This is the definitive guide to geometric tattoos in NYC — the styles, meanings, placements, popular designs and how to commission a custom piece.
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
                A full or half geometric sleeve tattoo is one of the most ambitious and rewarding tattooing projects a collector can undertake. A geometric sleeve requires thinking about the arm as a three-dimensional surface — a design that looks stunning from the front must also resolve correctly on the side and back of the arm. Sleeve geometric tattoo work typically combines several elements: mandalas, sacred geometry, linework filler patterns and negative space that gives the composition room to breathe.
              </p>
              <p>
                The planning phase for a geometric sleeve is as important as the tattooing itself. Proportions, flow, the relationship between filled and empty space, how the design moves when the arm moves — all of these must be considered before a single needle touches skin. Most geometric sleeve projects unfold over multiple sessions, with the composition revealed and refined session by session.
              </p>

              {/* Blackout */}
              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Geometric Blackout Tattoos
              </h3>
              <p>
                Geometric blackout tattooing uses solid black ink to fill large negative spaces around precise geometric forms — creating a striking visual contrast between filled and unfilled skin. The technique evolved as a way to cover or balance older tattoos, but has matured into a discipline of its own. A geometric blackout sleeve or panel reads as graphic art on skin: bold, architectural and impossible to ignore.
              </p>
              <p>
                Blackout work demands an artist who understands how skin tone, scarring and ink saturation interact over time. Done correctly, a blackout piece holds its visual integrity for decades and ages with intentional patina.
              </p>

              {/* Watercolor */}
              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Watercolor Geometric Tattoos
              </h3>
              <p>
                Watercolor geometric tattoos blend the precision of geometric line work with soft, painterly color washes that mimic watercolor paintings. While Okan Uckun's signature work is executed in pure black ink — chosen for its longevity and visual weight — collectors who want a softer, more illustrative geometric piece can explore watercolor approaches with artists who specialize in that technique.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section: Sacred Geometry Deep Dive */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Sacred Geometry Tattoos: A Closer Look
              </h2>
              <p>
                Sacred geometry tattoo work is its own discipline within the geometric tradition. While any tattoo using mathematical shapes can be called geometric, "sacred geometry" specifically refers to the visual systems that ancient and contemporary spiritual traditions have used to represent the underlying structure of reality. These are not arbitrary patterns — every line, every angle, every relationship between forms carries meaning encoded over thousands of years.
              </p>
              <p>
                The most commonly requested sacred geometry tattoo designs include:
              </p>
              <div className="space-y-4 pl-0">
                <div>
                  <p className="font-bold mb-1">The Flower of Life</p>
                  <p>Nineteen interlocking circles arranged in a hexagonal pattern. The Flower of Life is considered the foundational pattern from which all sacred geometry derives. As a tattoo, it works exceptionally well on the sternum, between the shoulder blades, or as the central element of a larger composition.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Metatron's Cube</p>
                  <p>Derived from the Flower of Life, Metatron's Cube contains all five Platonic solids — the tetrahedron, cube, octahedron, dodecahedron and icosahedron — which Plato believed were the building blocks of the physical universe. Tattooed on the chest, back or forearm, Metatron's Cube reads as a compressed map of creation.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">The Sri Yantra</p>
                  <p>One of the most visually complex sacred geometry patterns. Nine interlocking triangles — four pointing upward, five pointing downward — radiate from a central point (the bindu). The Sri Yantra represents the union of masculine and feminine, the cosmos and the individual consciousness. Demands an experienced geometric tattoo artist; the precision required is unforgiving.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">The Seed of Life</p>
                  <p>Seven circles arranged within the Flower of Life pattern — the seven days of creation in many traditions. Often chosen as a more subtle alternative to the full Flower of Life, particularly for wrist or inner-forearm placement.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">The Fibonacci Spiral & Golden Ratio</p>
                  <p>The mathematical pattern that appears throughout nature — in nautilus shells, sunflowers, hurricanes, galaxies. A Fibonacci spiral tattoo represents the harmony between mathematics and life, the pattern beneath apparent randomness.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Mandalas</p>
                  <p>Circular diagrams representing the universe in Hindu and Buddhist cosmology. A geometric mandala tattoo can range from a simple six-petal form to a hyper-detailed multi-ring composition. Mandala geometric tattoo work is among the most popular requests at any geometric tattoo studio.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Platonic Solids</p>
                  <p>The five three-dimensional shapes Plato associated with the classical elements: tetrahedron (fire), cube (earth), octahedron (air), icosahedron (water) and dodecahedron (the universe). Each can stand alone as a minimalist geometric tattoo or combine into a Metatron's Cube composition.</p>
                </div>
              </div>
              <p>
                A sacred geometry tattoo carries weight regardless of the wearer's spiritual orientation. The patterns are mathematical first — they exist whether one believes in their esoteric meaning or not. That mathematical reality is what gives sacred geometry tattoos their staying power across cultures and decades.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section: Popular Geometric Tattoo Subjects */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Popular Geometric Tattoo Subjects & Ideas
              </h2>
              <p>
                Geometric tattooing isn't limited to pure pattern work. Many of the most striking pieces in any portfolio combine geometric construction with recognizable subjects — animals, natural forms, architectural elements. The geometric treatment transforms a familiar subject into something more structural, more deliberate, more enduring.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Geometric Animal Tattoos
              </h3>
              <p>
                Animals rendered in geometric form sit somewhere between portrait and abstraction. The structural treatment honors the subject without literal depiction.
              </p>
              <div className="space-y-4 pl-0">
                <div>
                  <p className="font-bold mb-1">Geometric Wolf Tattoo</p>
                  <p>One of the most requested geometric animal designs. The wolf's angular features — the snout, ears, eyes — translate naturally into geometric construction. A geometric wolf tattoo typically works best on the forearm, upper arm or thigh.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Geometric Lion Tattoo</p>
                  <p>Lions in geometric form emphasize the symmetry of the face and the radial structure of the mane. Often combined with sacred geometry elements behind or around the lion's head, creating a regal mandala-like composition.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Geometric Owl Tattoo</p>
                  <p>The owl's circular face and large symmetrical eyes make it a natural fit for geometric treatment. Geometric owl tattoos often incorporate sacred geometry behind the head or beneath the body — emphasizing the owl's traditional association with wisdom and the unseen.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Geometric Bear Tattoo</p>
                  <p>Bears in geometric form lean into volume and weight — emphasizing mass through bold linework and structured shading. Often paired with mountain or natural-element imagery.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Geometric Butterfly & Moth Tattoos</p>
                  <p>The bilateral symmetry of wings is a gift to geometric design. A geometric butterfly or geometric death moth tattoo amplifies the natural symmetry into pure pattern, with wings becoming canvases for sacred geometry or precise linework.</p>
                </div>
              </div>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Geometric Nature & Element Tattoos
              </h3>
              <div className="space-y-4 pl-0">
                <div>
                  <p className="font-bold mb-1">Geometric Mountain Tattoo</p>
                  <p>Mountains in geometric form become pure shape — triangles stacked and overlapping, often with a sun, moon or sacred geometry above. A geometric mountain tattoo works beautifully on the forearm, calf or chest as a meditation on stability, ambition or a connection to a specific landscape.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Geometric Flower Tattoo</p>
                  <p>Geometric flowers (often executed as flower-mandala hybrids) bring radial symmetry into floral form. Roses, lotuses and sunflowers all translate well into geometric construction, with petals becoming geometric building blocks.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Geometric Space & Constellation Tattoos</p>
                  <p>Geometric space tattoos render planets, orbits, stars and constellations as precise diagrams rather than illustrations. A geometric scorpio constellation or geometric solar system piece captures the structural reality of the cosmos. Sacred geometry naturally bridges into space imagery — both are about the patterns underlying the universe.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Geometric Triangle Tattoo</p>
                  <p>The triangle is the simplest geometric form with directional meaning. Single triangles, stacked triangles, interlocking triangles, triangles inside circles — every combination carries its own symbolism. A geometric triangle tattoo can be both the smallest and most loaded piece in a collection.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Japanese Geometric Patterns</p>
                  <p>Traditional Japanese pattern systems (asanoha, seigaiha, kikkō) translate into striking geometric tattoo work. Often used as filler patterns within larger compositions or as standalone graphic pieces.</p>
                </div>
              </div>
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
                  <p>The natural transition between shoulder and upper arm offers opportunities for compositions that wrap the joint, creating the impression of three-dimensional structure. Geometric shoulder tattoos often serve as the anchor point for half-sleeves or back-piece extensions.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Neck</p>
                  <p>A geometric neck tattoo demands restraint and precision. The placement is unforgiving — visible to others, sensitive to ink migration, limited in real estate. When done correctly, a small sacred geometry symbol behind the ear, or a single linework piece on the side of the neck, becomes one of the most personal and commanding pieces in a collection.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Chest</p>
                  <p>The chest offers two distinct surfaces: the flat plane of the sternum and the curved expanse of the pectoral. A geometric chest tattoo can mirror across the sternum for bilateral symmetry, or anchor on a single side as part of a larger half-sleeve composition. Sacred geometry centered on the heart space is particularly meaningful.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Back</p>
                  <p>The back is the largest single canvas the body offers. A geometric back tattoo can range from a small piece between the shoulder blades to a full-back composition that takes multiple sessions to complete. The flat surface accommodates large-scale sacred geometry, mandalas and architectural linework with room for negative space.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Leg & Thigh</p>
                  <p>The thigh is one of the most underrated geometric tattoo placements. The flat outer surface, the curved inner surface, the long vertical canvas — all combine to make the thigh ideal for ambitious geometric compositions. A geometric leg sleeve (calf + thigh) can read as a single cohesive piece or as connected chapters.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section: Small / Simple Geometric Tattoos */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Small & Simple Geometric Tattoo Designs
              </h2>
              <p>
                Not every geometric tattoo needs to be a large-scale undertaking. Some of the most powerful geometric tattoo ideas are also the smallest. A single triangle behind the ear, a small Flower of Life on the inner wrist, three dots forming a perfect equilateral triangle on the back of the hand — these simple geometric tattoo designs carry as much weight as any sleeve, because the precision required to execute them perfectly at small scale is greater, not less.
              </p>
              <p>
                If you're considering your first geometric tattoo, starting small is rarely a mistake. Many of Okan Uckun's collectors begin with a small geometric piece and return for larger compositions once they understand how their skin holds fine lines and how they relate to wearing the piece over time. A small geometric tattoo done correctly is an entry point to a much larger conversation.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Section: Ideas — Where to Start */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Geometric Tattoo Ideas: Where to Start
              </h2>
              <p>
                If you're searching for geometric tattoo ideas, the first decision isn't <em>what shape</em> — it's <em>why</em>. The strongest geometric tattoo designs are anchored in something specific: a personal philosophy, an event, a relationship, a study, a meditation, a question. The geometry then becomes the visual language for that anchor — not the anchor itself.
              </p>
              <p>
                Some directions to consider:
              </p>
              <div className="space-y-4 pl-0">
                <div>
                  <p className="font-bold mb-1">Pattern-Based</p>
                  <p>Choose a sacred geometry pattern that represents an idea you want to carry — the Flower of Life for interconnectedness, Metatron's Cube for the underlying structure of matter, the Sri Yantra for the union of opposites. The pattern provides the meaning; the artist provides the execution.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Subject-Based</p>
                  <p>Start with a subject — an animal, a place, a natural form — and ask how geometric treatment can amplify its meaning rather than illustrate it. A geometric wolf isn't a picture of a wolf; it's a structural meditation on the idea of a wolf.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Body-First</p>
                  <p>Choose the placement before the design. A piece designed for the sternum is structurally different from a piece designed for the forearm — the body's geometry should shape the tattoo's geometry. This approach often produces the most natural-feeling results.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Filler & Composition</p>
                  <p>Geometric tattooing excels as connective tissue between existing pieces. Geometric filler patterns can transform a collection of disconnected tattoos into a cohesive composition. Sacred geometry, linework grids and architectural patterns are particularly effective as connectors.</p>
                </div>
              </div>
              <p>
                The best way to develop your geometric tattoo idea is to spend time in{' '}
                <Link to="/work" className="underline underline-offset-4 hover:text-[#555] transition-colors">the portfolio</Link>
                . Notice which compositions you return to. Notice the placements that catch your eye. Notice whether you're drawn to pure pattern work, to subjects, or to a combination. Bring those observations to your consultation.
              </p>
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
                    What is a geometric tattoo?
                  </h3>
                  <p>A geometric tattoo is a design built from mathematical shapes — circles, triangles, hexagons, lines and sacred geometry patterns — instead of traditional illustration or shading. The visual power of a geometric tattoo comes from precision: exact angles, perfectly parallel lines, deliberately calculated spacing. Geometric tattoos can be pure pattern work, or combine geometric construction with subjects like animals, plants and architectural forms.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    What does a geometric tattoo mean?
                  </h3>
                  <p>Geometric tattoo meaning depends on the specific shapes used. Circles represent completeness and infinity. Triangles represent direction, balance and the relationship between opposing forces. Hexagons represent efficiency and natural structure. Sacred geometry patterns like the Flower of Life or Metatron's Cube carry esoteric meaning rooted in thousands of years of philosophical tradition. The meaning of any geometric tattoo is ultimately personal — the shapes provide a vocabulary; the wearer provides the sentence.</p>
                </div>

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
                    How is a geometric tattoo design made?
                  </h3>
                  <p>Custom geometric tattoo design starts with a conversation about meaning, placement and aesthetic direction. From there, the artist sketches concepts — first by hand to test composition, then digitally to refine proportions and verify mathematical precision. Sacred geometry patterns are constructed from their underlying rules (a Flower of Life from interlocking circles, a Sri Yantra from precisely angled triangles) rather than copied. Once the design is approved, a stencil is created, placed on the body, and the tattoo is executed. Most geometric tattoos at Okan Uckun's studio go through 2–3 design revisions before stencil.</p>
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
