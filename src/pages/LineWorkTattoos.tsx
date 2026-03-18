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
      "@type": "Service",
      "name": "Linework Tattoo NYC",
      "description": "Precision linework and single line tattoos by Okan Uckun in New York City. Specializing in architectural line work, continuous line and geometric linework tattoos.",
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
      "areaServed": {"@type": "City", "name": "New York City"},
      "url": "https://www.okanuckun.com/line-work-tattoos",
      "serviceType": "Tattoo Art",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Linework Tattoo Styles",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Single Line Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Continuous Line Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Geometric Linework Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Architectural Line Work Tattoo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Abstract Linework Tattoo"}}
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a linework tattoo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A linework tattoo is built exclusively from lines — no shading, no fill, no color gradients. The design's entire visual impact comes from the precision, weight, spacing and arrangement of lines. Linework uses a 1RL, 3RL or 4RL needle configuration to achieve sharp, consistent lines that maintain their clarity over time."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between linework and fine line tattoos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fine line tattoos focus on delicacy — the thinnest possible lines for a sketch-like quality. Linework tattoos prioritize architectural precision — clean, intentional lines that may vary in weight and spacing to create visual structure. Linework tends to be more graphic and bold in its composition, while fine line is more illustrative."
          }
        },
        {
          "@type": "Question",
          "name": "Do linework tattoos age well?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Linework tattoos are among the most durable tattoo styles when executed correctly. The precise, clean lines hold their definition better than shaded or colored work over time. With proper aftercare and sun protection, linework tattoos maintain their sharpness for a decade or more."
          }
        },
        {
          "@type": "Question",
          "name": "Who pioneered the linework tattoo style?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Okan Uckun is recognized as one of the original pioneers of the contemporary linework tattoo approach, developing the style in the 2010s. His architectural background and commitment to mathematical precision helped establish linework as a distinct discipline within modern tattooing."
          }
        }
      ]
    }
  ]
};

const LineWorkTattoos: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Linework Tattoos NYC | Okan Uckun — Line Work Tattoo Artist Manhattan"
        description="Linework tattoo artist in NYC. Precise single line, continuous line and line work tattoo designs by Okan Uckun — a pioneer of the linework style. Manhattan, New York."
        canonical="https://www.okanuckun.com/line-work-tattoos"
        ogTitle="Linework Tattoos NYC | Okan Uckun"
        ogDescription="Precision linework tattoos by Okan Uckun in New York City. Single line, continuous line and architectural line work by one of the style's original pioneers."
        ogImage="https://www.okanuckun.com/og-linework.jpg"
        ogType="website"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-[#f5f5f5]">
        <Navigation variant="dark" />

        <main className="max-w-[720px] mx-auto px-6 md:px-12 pt-24 pb-32">
          {/* Hero */}
          <ScrollReveal>
            <span className="text-[11px] text-[#888] uppercase tracking-wider block mb-6">
              LINEWORK TATTOOS
            </span>
            <h1 className="text-[36px] md:text-[48px] font-black text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] uppercase mb-8">
              Linework Tattoos in NYC
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#1a1a1a] leading-relaxed mb-12">
              A line is the most fundamental unit of visual communication. Before shading, before color, before texture — there is the line. Linework tattooing takes this foundation seriously. Every design is built from lines alone: their weight, their spacing, their tension and their relationship to the negative space around them. In the hands of Okan Uckun — one of the original pioneers of the contemporary linework tattoo style — this constraint becomes a creative force.
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
                What Is a Linework Tattoo?
              </h2>
              <p>
                A linework tattoo is a design constructed entirely from lines, without shading or fill. No gradients, no solid black areas, no color washes. Just lines — varying in weight, spacing and direction — organized to create form, depth and meaning.
              </p>
              <p>
                This is a more demanding brief than it sounds. When a design relies entirely on lines for its visual power, every decision is consequential. The thickness of a single line relative to its neighbors. The gap between parallel lines. The angle at which two lines meet. The choice of what to include and what to leave as negative space. Each of these decisions shapes the final composition as decisively as the subject matter itself.
              </p>
              <p>
                Linework tattooing as a distinct modern style emerged in the 2010s from the intersection of fine art, architecture and tattooing. Artists with design backgrounds — Okan Uckun among the most recognized — brought a vocabulary of architectural drawing, technical illustration and graphic design to the tattoo medium. The result was a new category of tattoo: precise, graphic, enduring.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Styles */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Linework Tattoo Styles
              </h2>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Single Line Tattoos
              </h3>
              <p>
                The single line tattoo takes the linework principle to its most concentrated form: a design made from a single continuous line, often without the needle ever lifting from the skin.
              </p>
              <p>
                Single line work requires complete planning before any tattooing begins. The composition must be designed as a continuous path — the needle's journey from start to finish must produce a coherent, recognizable image. Portraits, animals, figures, abstract compositions — all have been rendered in single line with astonishing results by artists who understand the approach.
              </p>
              <p>
                Okan Uckun's single line work is informed by contour drawing — the fine art practice of drawing a subject without lifting the pen. The discipline of contour drawing trains an artist to see the essential line: the one line that, if removed, causes the whole image to fail. This sensibility carries directly into single line tattooing.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Continuous Line Tattoos
              </h3>
              <p>
                The continuous line tattoo shares DNA with the single line approach but allows the composition to double back, cross over and layer — creating forms through the accumulation of a single unbroken thread.
              </p>
              <p>
                Continuous line compositions can range from{' '}
                <Link to="/minimalist-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">minimal</Link>{' '}
                to complex. A simple flower or bird rendered as a single continuous thread has an elegance and unity that a multi-line version of the same subject cannot achieve. More complex continuous line compositions — geometric abstractions, architectural elements, figure studies — demonstrate the full expressive range of the approach.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Geometric Linework Tattoos
              </h3>
              <p>
                Geometry is the natural territory of linework. Mathematical precision and consistent line weight — the defining qualities of both disciplines — reinforce each other. A{' '}
                <Link to="/geometric-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">geometric</Link>{' '}
                composition rendered in pure linework achieves a visual clarity that geometric work rendered in any other technique struggles to match.
              </p>
              <p>
                Okan Uckun's geometric linework draws directly on his architectural background. The relationship between lines, the use of symmetry, the treatment of negative space as an equal compositional element to the lines themselves — these are architectural thinking applied to the skin.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Architectural Linework Tattoos
              </h3>
              <p>
                Architecture is drawing made inhabitable. The plans, sections and elevations of architectural drawing — the precise use of line weight to distinguish different elements, the use of line to convey three-dimensional space on a two-dimensional surface — translate with compelling directness into tattooing.
              </p>
              <p>
                Architectural linework tattoos may reference actual buildings or architectural details, or they may simply adopt the architectural approach to drawing: the deliberate hierarchy of line weights, the use of hatching and contour lines to suggest depth, the balance between structure and space.
              </p>

              <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a] uppercase tracking-[-0.01em] pt-4">
                Abstract Linework Tattoos
              </h3>
              <p>
                Not all linework refers to recognizable subjects. Abstract linework — compositions built from pure geometric relationships, dynamic line arrangements, or forms that suggest rather than depict — can carry significant visual and personal meaning.
              </p>
              <p>
                Abstract linework invites the viewer into an interpretive relationship with the design. A composition of converging and diverging lines can suggest tension, momentum, balance or expansion depending on its arrangement and the eye that reads it. This openness to interpretation is part of the appeal.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Why Linework Ages Better */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Why Linework Ages Better Than Other Tattoo Styles
              </h2>
              <p>
                Tattoo longevity is determined by a simple principle: the clearer and more defined the design, the better it holds over time. Shading, color and complex tonal gradations all depend on the precise distribution of ink within the skin — a distribution that changes as the skin ages.
              </p>
              <p>
                Lines, by contrast, are binary: they are there or they are not. A well-executed linework tattoo loses none of its essential information as the skin ages. The line may soften slightly over decades, but the composition remains legible. The design's meaning is preserved.
              </p>
              <p>
                This durability is one of the reasons linework has become increasingly central to contemporary{' '}
                <Link to="/fine-line-tattoos" className="underline underline-offset-4 hover:text-[#555] transition-colors">fine line tattooing</Link>. Collectors who want pieces that hold their visual integrity over long periods of time — who want tattoos that will look considered and composed at forty as much as at twenty — are drawn to linework for this reason.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Pioneer */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Okan Uckun: Linework Pioneer
              </h2>
              <p>
                Few artists have contributed as directly to the development of the contemporary linework tattoo style as Okan Uckun. Beginning his linework practice in New York City in the 2010s, he brought an architectural and design-informed approach to the medium that was new in the tattoo world.
              </p>
              <p>
                His development of the linework approach was rooted in the conviction that tattooing could operate according to the same principles as the best architectural and graphic design: economy of means, structural clarity, and respect for the relationship between form and space.
              </p>
              <p>
                The recognition that followed — nearly 300,000 Instagram followers, features in BuzzFeed, Bored Panda, My Modern Met and numerous international publications — reflects an audience that recognized something genuinely new in his work. Not a refinement of existing tattoo styles, but a different way of thinking about what a tattoo could be.
              </p>
              <p>
                Today, the linework approach Uckun helped pioneer has become one of the dominant aesthetics in contemporary fine tattooing. His continued practice in New York City, developed over more than a decade, represents the most mature expression of the style.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* Placement Guide */}
          <ScrollReveal>
            <div className="space-y-6 text-[15px] text-[#1a1a1a] leading-relaxed mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] uppercase tracking-[-0.01em] mb-4">
                Linework Tattoo Placement Guide
              </h2>
              <p>
                Linework's graphic clarity works on almost any placement, but certain areas bring out its best qualities:
              </p>

              <div className="space-y-6">
                <div>
                  <p className="font-bold mb-1">Forearm</p>
                  <p>The forearm's relatively flat surface and easy visibility make it ideal for linework. The design can be appreciated fully without the distortion that curved placements introduce.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Upper Arm and Shoulder</p>
                  <p>Linework that wraps the upper arm can use the arm's cylindrical form as a compositional element — lines that seem to extend beyond the visible surface, suggesting three-dimensional structure.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Sternum and Chest</p>
                  <p>The body's natural symmetry amplifies bilateral linework compositions. Sternum pieces that use the body's central axis as a compositional anchor are among the most powerful placements for geometric linework.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Back</p>
                  <p>Large-scale linework compositions on the back allow the style's architectural qualities to fully develop. Complex geometric systems, architectural references and abstract linework reach their full expressive potential at this scale.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Calf</p>
                  <p>An underutilized but excellent placement for linework. The calf's vertical form works well with elongated compositions, and the skin here is robust and consistent.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="w-full h-px bg-[#1a1a1a]/10 my-12" />

          {/* CTA Block */}
          <ScrollReveal>
            <div className="bg-[#1a1a1a] text-[#f5f5f5] p-8 md:p-12 mb-16">
              <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-[-0.01em] mb-4">
                Book Your Linework Tattoo in NYC
              </h2>
              <p className="text-[15px] leading-relaxed text-[#ccc] mb-8">
                Custom linework tattoos by appointment only. From single line studies to complex architectural compositions — the process begins with your brief.
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
                Linework Tattoo FAQ
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    What is the difference between linework and traditional tattoo styles?
                  </h3>
                  <p>Traditional tattooing uses solid fills, bold outlines and color to create visual impact. Linework creates all of its visual impact through the organization and precision of lines alone. The two approaches require different technical skills and produce fundamentally different aesthetic results.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    How much does a linework tattoo cost in NYC?
                  </h3>
                  <p>Linework tattoo pricing depends on the complexity and scale of the piece. Okan Uckun prices on a custom quote basis. Contact through the{' '}
                  <Link to="/appointment" className="underline underline-offset-4 hover:text-[#555] transition-colors">appointment page</Link>{' '}
                  to discuss your design and receive specific pricing information.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    Do I need to prepare differently for a linework tattoo appointment?
                  </h3>
                  <p>The preparation is similar to any tattoo appointment: hydrate well, eat a proper meal before, avoid alcohol for 24 hours prior, and moisturize the placement area in the days leading up to your session. Bring visual references — from Okan's{' '}
                  <Link to="/work" className="underline underline-offset-4 hover:text-[#555] transition-colors">portfolio</Link>{' '}
                  and from other visual disciplines that inform your aesthetic sensibility.</p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2">
                    Can linework designs incorporate text or lettering?
                  </h3>
                  <p>Yes — typography and lettering are naturally compatible with linework principles. Custom letterforms designed with the same attention to line weight and spacing as the broader composition can create powerful integrated text-and-image pieces.</p>
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

export default LineWorkTattoos;
