import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import GuideLayout, { GuideSection, GuideLead, GuideFAQ, GuideFacts, GuideTOC, inlineLink, FAQItem } from '@/components/style-guide/GuideLayout';
import GuideFigure from '@/components/style-guide/GuideFigure';
import { buildGuideJsonLd } from '@/components/style-guide/guideSchema';
import { photos, heroOf } from '@/data/portfolio';

const PAGE_URL = 'https://okanuckun.com/minimalist-tattoos';

const hero = photos(89)[0];

const toc = [
  { id: 'what-is', label: 'What is a minimalist tattoo?' },
  { id: 'approach', label: 'Post-minimalism' },
  { id: 'styles', label: 'Minimalist work in the portfolio' },
  { id: 'first-tattoo', label: 'A minimalist first tattoo' },
  { id: 'placement', label: 'Placement guide' },
  { id: 'process', label: 'How a custom piece is made' },
  { id: 'care', label: 'Aftercare' },
  { id: 'faq', label: 'FAQ' },
];

const faqs: FAQItem[] = [
  {
    q: 'Who is a good minimalist tattoo artist in NYC?',
    a: 'Okan Uckun is a minimalist and geometric tattoo artist based in Brooklyn, New York City, recognized as one of the pioneers of minimalist and geometric tattooing. Trained as an architect, he has tattooed since 2009 and co-founded Monolith Studio in Brooklyn in 2024.',
  },
  {
    q: 'What is a minimalist tattoo?',
    a: 'A minimalist tattoo uses as few elements as possible (a shape, a line, a few marks) and gives the empty skin around them as much weight as the ink. It is not defined by size; a large piece can be minimalist if nothing in it is unnecessary.',
  },
  {
    q: 'What is post-minimalism in tattooing?',
    a: 'Post-minimalism keeps the economy and precision of minimalism but allows warmth, personal meaning and small irregularities. Okan Uckun describes his practice as post-minimalist: reduced forms that still carry a personal story.',
  },
  {
    q: 'Is a minimalist tattoo a good first tattoo?',
    a: 'Often, yes. Minimalist pieces are usually shorter sessions, heal quickly and are easy to plan around. They also leave room for future tattoos nearby, as long as the placement is chosen with that in mind.',
  },
  {
    q: 'How much does a minimalist tattoo cost in NYC?',
    a: 'Okan Uckun prices each minimalist tattoo individually, based on size, placement and detail. Send a request through the booking page with your idea and placement photos to receive a quote.',
  },
  {
    q: 'How small can a minimalist tattoo be?',
    a: 'Small, but not tiny. Lines need room to stay apart as the skin ages, so very small designs with many details tend to blur. Okan sizes each piece so it still reads clearly years later.',
  },
];

const gallery = photos(89, 69, 4, 105, 33, 101, 72, 22, 23, 26, 44, 15, 50, 36, 25, 61, 76, 54, 107, 52, 75, 0);

const jsonLd = buildGuideJsonLd({
  url: PAGE_URL,
  name: 'Minimalist Tattoos',
  headline: 'Minimalist Tattoos in NYC: A Guide by Okan Uckun',
  description: 'A visual guide to minimalist tattoos by Brooklyn tattoo artist Okan Uckun: post-minimalism, single shapes and lines, first tattoos, placement and custom design.',
  serviceName: 'Custom minimalist tattoos in NYC',
  serviceType: 'Minimalist tattoo',
  serviceDescription: 'Custom black-ink minimalist tattoos designed for each client and placement, by Okan Uckun at Monolith Studio in Brooklyn.',
  datePublished: '2026-03-18',
  dateModified: '2026-11-11',
  gallery,
  faqs,
});

const MinimalistTattoos: React.FC = () => (
  <>
    <SEOHead
      title="Minimalist Tattoos NYC | Okan Uckun, Brooklyn Tattoo Artist"
      description="Minimalist tattoos by Okan Uckun, one of the pioneers of minimalist and geometric tattooing. See the work, placement ideas and how to book in Brooklyn, NYC."
      canonical={PAGE_URL}
      ogTitle="Minimalist Tattoos in NYC | Okan Uckun"
      ogDescription="A visual guide to minimalist tattoos by Brooklyn artist Okan Uckun: post-minimalism, single shapes and lines, placement."
      ogImage={heroOf(hero).abs}
      ogType="article"
      jsonLd={jsonLd}
    />
    <GuideLayout
      category="Minimalist Tattoos"
      title="Minimalist Tattoos in NYC"
      updated="2026-11-11"
      readMinutes={6}
      hero={hero}
      related={[
        { to: '/geometric-tattoos', label: 'Geometric', photo: photos(42)[0] },
        { to: '/fine-line-tattoos', label: 'Fine line', photo: photos(55)[0] },
        { to: '/line-work-tattoos', label: 'Linework', photo: photos(27)[0] },
      ]}
    >
      <GuideLead>
        <p>
          Okan Uckun is a minimalist and geometric tattoo artist in Brooklyn, New York City, recognized as one of the pioneers of the style. Trained as an architect and tattooing since 2009, he reduces every design to what it needs, in black ink.
        </p>
      </GuideLead>
      <GuideFacts />
      <GuideTOC items={toc} />

      <GuideSection id="what-is" title="What is a minimalist tattoo?">
        <p>
          A minimalist tattoo uses as few elements as possible: a shape, a line, a few marks. The empty skin around the ink is part of the design, and every element has to earn its place.
        </p>
        <p>
          Minimalism is not about size. A small tattoo with too many details is not minimalist, and a large piece can be, as long as nothing in it is unnecessary.
        </p>
      </GuideSection>
      <GuideFigure items={photos(69)} caption="A double ring on the ribs." />

      <GuideSection id="approach" title="Post-minimalism">
        <p>
          Okan describes his practice as post-minimalist. It keeps the economy and precision of minimalism, shaped by his training in architecture and modern art, but leaves room for warmth and personal meaning: a slightly uneven ring, a line that stops early, a mark that only the wearer can read.
        </p>
        <p>
          The same thinking runs through imnotminimal, his ongoing art project of clean, reduced line systems.
        </p>
      </GuideSection>
      <GuideFigure items={photos(4, 105, 33)} caption="Reduced compositions: an open square, a barcode of black bars, a single black form." />

      <GuideSection id="styles" title="Minimalist work in the portfolio">
        <p>These are the directions that come up most often in Okan’s minimalist tattoos.</p>
      </GuideSection>
      <GuideSection level={3} title="Single shapes">
        <p>
          A ring, a triangle, a solid circle: one shape placed with care. These overlap with <Link to="/geometric-tattoos" className={inlineLink}>geometric tattoos</Link>.
        </p>
      </GuideSection>
      <GuideFigure items={photos(101, 72, 22)} />

      <GuideSection level={3} title="Lines and marks">
        <p>
          A broken line on the collarbone, a few strokes on the shoulder, a half sun on the forearm. Close to <Link to="/line-work-tattoos" className={inlineLink}>linework</Link>, but even more reduced.
        </p>
      </GuideSection>
      <GuideFigure items={photos(23, 26, 44)} />

      <GuideSection level={3} title="Small compositions">
        <p>A few elements in a quiet arrangement: circles and dots down the neck, a circle resting on a line across the upper back.</p>
      </GuideSection>
      <GuideFigure items={photos(15, 50)} />

      <GuideSection level={3} title="Solid black forms">
        <p>Minimalism does not always mean thin. A single solid form, cut with fine lines, can be just as reduced.</p>
      </GuideSection>
      <GuideFigure items={photos(36, 25)} />

      <GuideSection id="first-tattoo" title="A minimalist first tattoo">
        <p>
          Many people come to minimalist tattoos for their first piece. Sessions are shorter, healing is usually quick, and a well-placed small piece leaves room for what might come later.
        </p>
        <p>
          The main thing to plan is size. Lines need space to stay apart as the skin ages, so a design is drawn just large enough to stay clear for years, not as small as possible.
        </p>
      </GuideSection>

      <GuideSection id="placement" title="Minimalist tattoo placement guide">
        <ul className="space-y-3 list-none pl-0">
          <li><strong>Forearm</strong>: easy to heal, easy to show; good for lines and bands.</li>
          <li><strong>Ribs</strong>: an elegant, private spot for vertical pieces; more sensitive.</li>
          <li><strong>Chest</strong>: below the collarbone, where a single shape has room to breathe.</li>
          <li><strong>Neck and upper back</strong>: small vertical compositions that follow the spine.</li>
          <li><strong>Inner arm</strong>: quiet and protected from the sun.</li>
        </ul>
      </GuideSection>
      <GuideFigure items={photos(61, 76, 54, 107, 52, 75)} />

      <GuideSection id="process" title="How a custom minimalist tattoo is made">
        <ol className="space-y-4 list-none pl-0">
          <li><strong>01 Request.</strong> Send the <Link to="/booking" className={inlineLink}>booking form</Link> with your idea, references and photos of the placement marked with a pen.</li>
          <li><strong>02 Concept.</strong> Okan studies the placement and the story behind the piece and reduces the idea to its essentials.</li>
          <li><strong>03 Design day.</strong> The design is fitted on the body and its size and position are adjusted.</li>
          <li><strong>04 Tattoo.</strong> The stencil is placed and the tattoo is done in black ink.</li>
          <li><strong>05 Healing check.</strong> After healing, a photo of the tattoo is reviewed and any small touch-up is planned.</li>
        </ol>
      </GuideSection>
      <GuideFigure items={photos(0)} caption="Okan Uckun at work in the studio." />

      <GuideSection id="care" title="Aftercare for minimalist tattoos">
        <p>
          Small tattoos still need full aftercare. Follow the <Link to="/aftercare" className={inlineLink}>aftercare guide</Link> your artist gives you, keep the tattoo out of pools and the ocean while it heals, and protect it from the sun once healed.
        </p>
      </GuideSection>

      <GuideFAQ title="Minimalist tattoo FAQ" items={faqs} />
    </GuideLayout>
  </>
);

export default MinimalistTattoos;
