import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import GuideLayout, { GuideSection, GuideLead, GuideFAQ, GuideFacts, GuideTOC, inlineLink, FAQItem } from '@/components/style-guide/GuideLayout';
import GuideFigure from '@/components/style-guide/GuideFigure';
import { buildGuideJsonLd } from '@/components/style-guide/guideSchema';
import { photos, heroOf } from '@/data/portfolio';

const PAGE_URL = 'https://okanuckun.com/line-work-tattoos';

const hero = photos(71)[0];

const toc = [
  { id: 'what-is', label: 'What is a linework tattoo?' },
  { id: 'approach', label: 'Lines that follow the body' },
  { id: 'styles', label: 'Linework in the portfolio' },
  { id: 'compare', label: 'Linework, fine line and blackwork' },
  { id: 'placement', label: 'Placement guide' },
  { id: 'aging', label: 'Why linework ages well' },
  { id: 'process', label: 'How a custom piece is made' },
  { id: 'faq', label: 'FAQ' },
];

const faqs: FAQItem[] = [
  {
    q: 'Who is a good linework tattoo artist in NYC?',
    a: 'Okan Uckun is a linework, geometric and minimalist tattoo artist based in Brooklyn, New York City. Trained as an architect, he has tattooed since 2009 and is known for long, precise lines that follow the body. He co-founded Monolith Studio in Brooklyn in 2024.',
  },
  {
    q: 'What is a linework tattoo?',
    a: 'A linework tattoo is a design made only of lines, without shading or color fill. The weight, spacing and direction of the lines carry the whole design, from a single line down the arm to bands, stacked lines and abstract compositions.',
  },
  {
    q: 'What is the difference between linework and fine line?',
    a: 'Linework describes what the design is made of: lines only. Fine line describes how thin those lines are. A linework tattoo can use fine lines, bold lines or both; many of Okan’s pieces combine a heavy bar with hairline lines for contrast.',
  },
  {
    q: 'Can a single line tattoo look good?',
    a: 'Yes, if it is placed with care. A single line works when it follows the body: down the forearm, along the spine, across both arms. Its length, angle and where it starts and stops are decided on the body, not on paper.',
  },
  {
    q: 'How much does a linework tattoo cost in NYC?',
    a: 'Okan Uckun prices each linework tattoo individually, based on size, placement and detail. Send a request through the booking page with your idea and placement photos to receive a quote.',
  },
  {
    q: 'Do linework tattoos age well?',
    a: 'Black linework with enough space between lines is one of the most durable tattoo styles. Clean lines at the right depth stay readable for many years, especially with sun protection on the healed tattoo.',
  },
];

const gallery = photos(71, 47, 9, 53, 83, 92, 78, 27, 57, 85, 107, 37, 18, 20, 31, 21, 95, 32, 103, 96, 51, 40, 23, 26, 70, 93, 34);

const jsonLd = buildGuideJsonLd({
  url: PAGE_URL,
  name: 'Linework Tattoos',
  headline: 'Linework Tattoos in NYC: A Guide by Okan Uckun',
  description: 'A visual guide to linework tattoos by Brooklyn tattoo artist Okan Uckun: single lines, bands, stacked and continuous lines, placement and how a custom piece is made.',
  serviceName: 'Custom linework tattoos in NYC',
  serviceType: 'Linework tattoo',
  serviceDescription: 'Custom black-ink linework tattoos designed for each client and placement, by Okan Uckun at Monolith Studio in Brooklyn.',
  datePublished: '2026-03-18',
  dateModified: '2026-11-11',
  gallery,
  faqs,
});

const LineWorkTattoos: React.FC = () => (
  <>
    <SEOHead
      title="Linework Tattoos NYC | Okan Uckun, Brooklyn Tattoo Artist"
      description="Linework tattoos by Okan Uckun, a Brooklyn tattoo artist trained as an architect. Single lines, bands and continuous lines that follow the body. Book in NYC."
      canonical={PAGE_URL}
      ogTitle="Linework Tattoos in NYC | Okan Uckun"
      ogDescription="A visual guide to linework tattoos by Brooklyn artist Okan Uckun: single lines, bands, continuous lines and placement."
      ogImage={heroOf(hero).abs}
      ogType="article"
      jsonLd={jsonLd}
    />
    <GuideLayout
      category="Linework Tattoos"
      title="Linework Tattoos in NYC"
      updated="2026-11-11"
      readMinutes={6}
      hero={hero}
      related={[
        { to: '/geometric-tattoos', label: 'Geometric', photo: photos(42)[0] },
        { to: '/fine-line-tattoos', label: 'Fine line', photo: photos(55)[0] },
        { to: '/minimalist-tattoos', label: 'Minimalist', photo: photos(105)[0] },
      ]}
    >
      <GuideLead>
        <p>
          Okan Uckun is a linework and geometric tattoo artist in Brooklyn, New York City. Trained as an architect and tattooing since 2009, he draws lines that follow the body, from a single line down the arm to bands and abstract compositions, in black ink.
        </p>
      </GuideLead>
      <GuideFacts />
      <GuideTOC items={toc} />

      <GuideSection id="what-is" title="What is a linework tattoo?">
        <p>
          A linework tattoo is made only of lines: no shading, no color, no fill beyond the occasional solid bar. Everything the design says comes from the weight of each line, the space between lines and the direction they travel.
        </p>
        <p>
          That makes linework one of the most direct tattoo styles. A single line can describe a path, a horizon or a connection between two people, and its meaning often lies in where it starts and where it stops.
        </p>
      </GuideSection>
      <GuideFigure items={photos(47)} caption="A single line drawn down the length of the arm." />

      <GuideSection id="approach" title="Lines that follow the body">
        <p>
          Okan’s background in architecture shapes how he places a line. The body is treated as a form with its own axes: the length of the forearm, the curve of the shoulder, the line of the spine. Lines are drawn to run with those axes, so the tattoo looks like it belongs to the body rather than sitting on it.
        </p>
        <p>
          For long or continuous pieces, the design is fitted on the body and checked as the client moves, so the line reads correctly in every position.
        </p>
      </GuideSection>
      <GuideFigure items={photos(9, 53, 83)} caption="Continuous lines running over the shoulder, arm and back." />

      <GuideSection id="styles" title="Linework in the portfolio">
        <p>These are the directions that come up most often in Okan’s linework.</p>
      </GuideSection>
      <GuideSection level={3} title="Single lines">
        <p>One line, placed with intent. Often on both forearms as a pair, or running from the shoulder to the wrist.</p>
      </GuideSection>
      <GuideFigure items={photos(92, 78, 27)} />

      <GuideSection level={3} title="Bands and armbands">
        <p>Thin lines that wrap around the arm, sometimes broken or offset so the band feels drawn rather than printed.</p>
      </GuideSection>
      <GuideFigure items={photos(57, 85, 107)} />

      <GuideSection level={3} title="Stacked and parallel lines">
        <p>Repeated horizontal lines and bars that build rhythm and weight, from a light stack on the forearm to a bold gradient on the thigh.</p>
      </GuideSection>
      <GuideFigure items={photos(37, 18)} />

      <GuideSection level={3} title="Waves and horizons">
        <p>Lines that bend together into a wave, or a single horizon with a mountain profile resting on it.</p>
      </GuideSection>
      <GuideFigure items={photos(20, 31)} />

      <GuideSection level={3} title="Broken and architectural lines">
        <p>
          Lines that stop, restart and change weight, close to an architectural drawing. These pieces sit between linework and <Link to="/geometric-tattoos" className={inlineLink}>geometric tattoos</Link>.
        </p>
      </GuideSection>
      <GuideFigure items={photos(21, 95, 32)} />

      <GuideSection level={3} title="Lines across the body">
        <p>Pieces that use the whole arm or shoulder as one gesture: a line with a dot, a loose wrap, a line that turns at the elbow.</p>
      </GuideSection>
      <GuideFigure items={photos(103, 96)} />

      <GuideSection id="compare" title="Linework, fine line and blackwork">
        <ul className="space-y-3 list-none pl-0">
          <li><strong>Linework</strong> describes what the design is made of: lines only, no shading.</li>
          <li><strong><Link to="/fine-line-tattoos" className={inlineLink}>Fine line</Link></strong> describes how thin the lines are. Linework can be fine, bold or both.</li>
          <li><strong>Blackwork</strong> uses large areas of solid black. Some of Okan’s linework adds a single solid bar for contrast, but the line stays the main element.</li>
        </ul>
      </GuideSection>

      <GuideSection id="placement" title="Linework tattoo placement guide">
        <ul className="space-y-3 list-none pl-0">
          <li><strong>Forearm</strong>: the natural home of linework. Long, straight and easy to show.</li>
          <li><strong>Ribs</strong>: good for short vertical sets of lines; more sensitive to sit through.</li>
          <li><strong>Collarbone</strong>: a single broken line that follows the bone.</li>
          <li><strong>Shoulder</strong>: small line sets that follow the curve of the shoulder.</li>
          <li><strong>Full arm</strong>: one line from shoulder to wrist, or bars along the arm.</li>
          <li><strong>Hand</strong>: possible for abstract lines, but lines on hands fade faster.</li>
        </ul>
      </GuideSection>
      <GuideFigure items={photos(51, 40, 23, 26, 70, 93)} />

      <GuideSection id="aging" title="Why linework ages well">
        <p>
          Clean black lines with enough space between them are among the most durable things you can tattoo. There is no soft shading to fade unevenly, so a well-placed line stays readable for many years. Depth, spacing and sun protection on the healed tattoo are what keep it that way.
        </p>
      </GuideSection>

      <GuideSection id="process" title="How a custom linework tattoo is made">
        <ol className="space-y-4 list-none pl-0">
          <li><strong>01 Request.</strong> Send the <Link to="/booking" className={inlineLink}>booking form</Link> with your idea, references and photos of the placement marked with a pen.</li>
          <li><strong>02 Concept.</strong> Okan studies the placement and the story behind the piece and sketches the composition.</li>
          <li><strong>03 Design day.</strong> The design is fitted on the body and line lengths are adjusted to the placement.</li>
          <li><strong>04 Tattoo.</strong> The stencil is placed and the lines are tattooed in black ink.</li>
          <li><strong>05 Healing check.</strong> After healing, a photo of the tattoo is reviewed and any small touch-up is planned.</li>
        </ol>
        <p>
          Follow the <Link to="/aftercare" className={inlineLink}>aftercare guide</Link> your artist gives you while it heals.
        </p>
      </GuideSection>
      <GuideFigure items={photos(34)} caption="Okan Uckun at work on a long line along the arm." />

      <GuideFAQ title="Linework tattoo FAQ" items={faqs} />
    </GuideLayout>
  </>
);

export default LineWorkTattoos;
