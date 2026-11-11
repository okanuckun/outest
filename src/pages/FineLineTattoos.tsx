import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import GuideLayout, { GuideSection, GuideLead, GuideFAQ, GuideFacts, GuideTOC, inlineLink, FAQItem } from '@/components/style-guide/GuideLayout';
import GuideFigure from '@/components/style-guide/GuideFigure';
import { buildGuideJsonLd } from '@/components/style-guide/guideSchema';
import { photos, heroOf } from '@/data/portfolio';

const PAGE_URL = 'https://okanuckun.com/fine-line-tattoos';

const hero = photos(65)[0];

const toc = [
  { id: 'what-is', label: 'What is a fine line tattoo?' },
  { id: 'approach', label: 'Precision as a method' },
  { id: 'styles', label: 'Fine line work in the portfolio' },
  { id: 'placement', label: 'Placement guide' },
  { id: 'aging', label: 'How fine line tattoos age' },
  { id: 'process', label: 'How a custom piece is made' },
  { id: 'care', label: 'Aftercare' },
  { id: 'faq', label: 'FAQ' },
];

const faqs: FAQItem[] = [
  {
    q: 'Who is a good fine line tattoo artist in NYC?',
    a: 'Okan Uckun is a fine line, geometric and minimalist tattoo artist based in Brooklyn, New York City. Trained as an architect, he has tattooed since 2009 and co-founded Monolith Studio in Brooklyn in 2024. His fine line work is drawn for each client and done in black ink.',
  },
  {
    q: 'What is a fine line tattoo?',
    a: 'A fine line tattoo is made with very thin, precise lines instead of bold outlines or heavy shading. The look is light and drawn, closer to a pen drawing than a traditional tattoo, so line placement and depth decide how it heals and ages.',
  },
  {
    q: 'Do fine line tattoos fade?',
    a: 'All tattoos soften over time. Fine line tattoos hold up well when the lines are placed at the right depth, have enough space between them and are protected from the sun once healed. A small touch-up after healing is sometimes planned to keep every line even.',
  },
  {
    q: 'Do fine line tattoos hurt more?',
    a: 'Not usually. Thin lines are often quicker to tattoo than bold work, so sessions are shorter. Pain depends more on placement: ribs, spine and collarbone are more sensitive than the forearm or upper arm.',
  },
  {
    q: 'How much does a fine line tattoo cost in NYC?',
    a: 'Okan Uckun prices each fine line tattoo individually, based on size, placement and detail. Send a request through the booking page with your idea and placement photos to receive a quote.',
  },
  {
    q: 'Is fine line the same as single needle?',
    a: 'They overlap. Single needle describes the tool used for the thinnest lines; fine line describes the overall look. The needle is chosen for each design and placement rather than using one setup for everything.',
  },
];

const gallery = photos(65, 90, 100, 39, 60, 28, 55, 86, 66, 43, 84, 64, 46, 67, 10, 52, 99, 35, 24, 68, 74, 34);

const jsonLd = buildGuideJsonLd({
  url: PAGE_URL,
  name: 'Fine Line Tattoos',
  headline: 'Fine Line Tattoos in NYC: A Guide by Okan Uckun',
  description: 'A visual guide to fine line tattoos by Brooklyn tattoo artist Okan Uckun: styles, placement, how fine line tattoos age and how a custom piece is made.',
  serviceName: 'Custom fine line tattoos in NYC',
  serviceType: 'Fine line tattoo',
  serviceDescription: 'Custom black-ink fine line tattoos designed for each client and placement, by Okan Uckun at Monolith Studio in Brooklyn.',
  datePublished: '2026-03-18',
  dateModified: '2026-11-11',
  gallery,
  faqs,
});

const FineLineTattoos: React.FC = () => (
  <>
    <SEOHead
      title="Fine Line Tattoos NYC | Okan Uckun, Brooklyn Tattoo Artist"
      description="Fine line tattoos by Okan Uckun, a Brooklyn tattoo artist trained as an architect. See the work, placement ideas, how fine line ages and how to book in NYC."
      canonical={PAGE_URL}
      ogTitle="Fine Line Tattoos in NYC | Okan Uckun"
      ogDescription="A visual guide to fine line tattoos by Brooklyn artist Okan Uckun: styles, placement, aging and custom design."
      ogImage={heroOf(hero).abs}
      ogType="article"
      jsonLd={jsonLd}
    />
    <GuideLayout
      category="Fine Line Tattoos"
      title="Fine Line Tattoos in NYC"
      updated="2026-11-11"
      readMinutes={6}
      hero={hero}
      related={[
        { to: '/geometric-tattoos', label: 'Geometric', photo: photos(42)[0] },
        { to: '/line-work-tattoos', label: 'Linework', photo: photos(27)[0] },
        { to: '/minimalist-tattoos', label: 'Minimalist', photo: photos(105)[0] },
      ]}
    >
      <GuideLead>
        <p>
          Okan Uckun is a fine line and geometric tattoo artist in Brooklyn, New York City. Trained as an architect and tattooing since 2009, he draws every fine line piece for the client’s body, in black ink.
        </p>
      </GuideLead>
      <GuideFacts />
      <GuideTOC items={toc} />

      <GuideSection id="what-is" title="What is a fine line tattoo?">
        <p>
          A fine line tattoo is made with very thin, precise lines instead of bold outlines or heavy shading. The result looks drawn rather than painted: light, open and close to a pen drawing on paper.
        </p>
        <p>
          Because there is so little ink, nothing hides a mistake. The depth of each line, the space between lines and the way they follow the skin decide whether the tattoo heals clean and stays readable for years.
        </p>
      </GuideSection>
      <GuideFigure items={photos(90)} caption="Fine line waves drawn over the shoulder and chest." />

      <GuideSection id="approach" title="Precision as a method">
        <p>
          Okan studied architecture and modern art before tattooing full time in 2009, and his fine line work keeps that drawing discipline. Lines are planned like a technical drawing: where they start, how they curve with the muscle, where they stop and how much skin is left around them.
        </p>
        <p>
          Many of his fine line pieces are built from repeated thin lines that bend together, like sound waves or wind. The movement comes from the spacing, not from shading.
        </p>
      </GuideSection>
      <GuideFigure items={photos(100, 39, 60)} caption="Wave studies on the upper arm." />

      <GuideSection id="styles" title="Fine line work in the portfolio">
        <p>These are the directions that come up most often in Okan’s fine line tattoos.</p>
      </GuideSection>
      <GuideSection level={3} title="Waves and sound waves">
        <p>
          A heartbeat, a voice recording or a song turned into a single drawn waveform. Placed along the spine or the forearm, the line follows the length of the body.
        </p>
      </GuideSection>
      <GuideFigure items={photos(28, 55)} />

      <GuideSection level={3} title="Fine line with geometry">
        <p>
          Thin drawing combined with circles, stars and construction lines, where the fine line adds detail inside a <Link to="/geometric-tattoos" className={inlineLink}>geometric</Link> structure.
        </p>
      </GuideSection>
      <GuideFigure items={photos(86, 66)} />

      <GuideSection level={3} title="Illustrative fine line">
        <p>
          A small number of figurative pieces, such as two reaching hands or a single rose, drawn with the same restraint as the abstract work.
        </p>
      </GuideSection>
      <GuideFigure items={photos(43, 84)} />

      <GuideSection level={3} title="Abstract compositions">
        <p>Loose, gestural lines that read like a sketch: a movement, a loop, a gust of wind on the collarbone.</p>
      </GuideSection>
      <GuideFigure items={photos(64, 46, 67)} />

      <GuideSection id="placement" title="Fine line tattoo placement guide">
        <ul className="space-y-3 list-none pl-0">
          <li><strong>Forearm</strong>: the most common spot. Easy to heal and good for vertical or wrapping lines.</li>
          <li><strong>Ribs</strong>: elegant for long, light pieces, but more sensitive and slower to heal.</li>
          <li><strong>Behind the ear and neck</strong>: small, precise pieces; the skin is thin, so less is more.</li>
          <li><strong>Collarbone and shoulder</strong>: lines that follow the bone and the curve of the shoulder.</li>
          <li><strong>Spine and torso</strong>: long vertical compositions that use the length of the back.</li>
          <li><strong>Shoulder blade</strong>: a flat, calm surface for horizontal pieces.</li>
        </ul>
      </GuideSection>
      <GuideFigure items={photos(10, 52, 99, 35, 24, 68)} />

      <GuideSection id="aging" title="How fine line tattoos age">
        <p>
          Every tattoo softens as the skin renews. With fine line work, the two things that matter most are depth and spacing. Lines placed too deep spread (a blowout); lines placed too close together merge over the years.
        </p>
        <p>
          That is why Okan leaves more room between lines than the design might seem to need on day one, and why healed tattoos are reviewed from a photo after a couple of months. Daily sun protection on the healed tattoo does the rest.
        </p>
      </GuideSection>
      <GuideFigure items={photos(74)} caption="World map with compass and fine construction lines on the back of the arm." />

      <GuideSection id="process" title="How a custom fine line tattoo is made">
        <ol className="space-y-4 list-none pl-0">
          <li><strong>01 Request.</strong> Send the <Link to="/booking" className={inlineLink}>booking form</Link> with your idea, references and photos of the placement marked with a pen.</li>
          <li><strong>02 Concept.</strong> Okan studies the placement and the story behind the piece and sketches the composition.</li>
          <li><strong>03 Design day.</strong> The drawing is refined and fitted on the body, adjusting line length and spacing to the skin.</li>
          <li><strong>04 Tattoo.</strong> The stencil is placed and the lines are tattooed in black ink at a controlled depth.</li>
          <li><strong>05 Healing check.</strong> After healing, a photo of the tattoo is reviewed and any small touch-up is planned.</li>
        </ol>
      </GuideSection>
      <GuideFigure items={photos(34)} caption="Okan Uckun at work on a long line along the arm." />

      <GuideSection id="care" title="Aftercare for fine line tattoos">
        <p>
          Follow the <Link to="/aftercare" className={inlineLink}>aftercare guide</Link> your artist gives you, keep the tattoo out of pools and the ocean while it heals, and do not pick at flakes. Once healed, protect it from the sun to keep the lines crisp.
        </p>
      </GuideSection>

      <GuideFAQ title="Fine line tattoo FAQ" items={faqs} />
    </GuideLayout>
  </>
);

export default FineLineTattoos;
