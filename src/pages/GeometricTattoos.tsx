import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import GuideLayout, { GuideSection, GuideLead, GuideFAQ, GuideFacts, GuideTOC, inlineLink, FAQItem } from '@/components/style-guide/GuideLayout';
import GuideFigure from '@/components/style-guide/GuideFigure';
import { buildGuideJsonLd } from '@/components/style-guide/guideSchema';
import { photos, heroOf } from '@/data/portfolio';

const PAGE_URL = 'https://okanuckun.com/geometric-tattoos';

const hero = photos(102)[0];

const toc = [
  { id: 'what-is', label: 'What is a geometric tattoo?' },
  { id: 'approach', label: 'An architect’s approach' },
  { id: 'styles', label: 'Geometric styles in the portfolio' },
  { id: 'meanings', label: 'What the shapes mean' },
  { id: 'placement', label: 'Placement guide' },
  { id: 'process', label: 'How a custom piece is made' },
  { id: 'care', label: 'Keeping the lines sharp' },
  { id: 'faq', label: 'FAQ' },
];

const faqs: FAQItem[] = [
  {
    q: 'Who is a good geometric tattoo artist in NYC?',
    a: 'Okan Uckun is a geometric and minimalist tattoo artist based in Brooklyn, New York City. Trained as an architect, he has tattooed since 2009 and co-founded Monolith Studio in Brooklyn in 2024. His geometric work has been featured by BuzzFeed, DeMilked and Design You Trust.',
  },
  {
    q: 'What is a geometric tattoo?',
    a: 'A geometric tattoo is built from shapes and lines (circles, triangles, squares, arcs and parallel lines) instead of illustration or shading. Its strength comes from precision: exact spacing, clean arcs and a composition that fits the body.',
  },
  {
    q: 'What does a geometric tattoo mean?',
    a: 'Each shape carries its own associations. A circle suggests wholeness and cycles, a triangle balance and direction, a square stability and structure, a single line a path or connection. The final meaning is personal; the shapes are a vocabulary the client and artist use to tell a story.',
  },
  {
    q: 'How much does a geometric tattoo cost in NYC?',
    a: 'Okan Uckun prices each geometric tattoo individually, based on size, placement and detail. Send a request through the booking page with your idea and placement photos to receive a quote.',
  },
  {
    q: 'Do geometric tattoos age well?',
    a: 'Yes, when the lines are placed at the right depth and given enough spacing. Black linework with breathing room between lines keeps its shape for many years. Sun protection on the healed tattoo makes the biggest difference.',
  },
  {
    q: 'Can I bring my own geometric design?',
    a: 'You can bring references, but every piece is redrawn for your body. Okan builds the composition around the placement so lines follow the muscles and the design reads correctly when you move.',
  },
  {
    q: 'Does Okan Uckun tattoo geometric designs in color?',
    a: 'No. His geometric work is done in black ink only, which keeps the contrast and the precision of the lines over time.',
  },
];

const gallery = photos(102, 6, 11, 14, 32, 8, 13, 22, 48, 63, 3, 82, 29, 73, 69, 72, 89, 101, 88, 77, 17, 41, 54, 12, 50, 94, 0);

const jsonLd = buildGuideJsonLd({
  url: PAGE_URL,
  name: 'Geometric Tattoos',
  headline: 'Geometric Tattoos in NYC: A Guide by Okan Uckun',
  description: 'A visual guide to geometric tattoos by Brooklyn tattoo artist Okan Uckun: styles, meanings, placement and how a custom geometric piece is made.',
  serviceName: 'Custom geometric tattoos in NYC',
  serviceType: 'Geometric tattoo',
  serviceDescription: 'Custom black-ink geometric tattoos designed for each client and placement, by Okan Uckun at Monolith Studio in Brooklyn.',
  datePublished: '2026-03-18',
  dateModified: '2026-11-11',
  gallery,
  faqs,
});

const GeometricTattoos: React.FC = () => (
  <>
    <SEOHead
      title="Geometric Tattoos NYC | Okan Uckun, Brooklyn Tattoo Artist"
      description="Geometric tattoos by Okan Uckun, a Brooklyn tattoo artist trained as an architect. See the work, the styles, what the shapes mean and how to book in NYC."
      canonical={PAGE_URL}
      ogTitle="Geometric Tattoos in NYC | Okan Uckun"
      ogDescription="A visual guide to geometric tattoos by Brooklyn artist Okan Uckun: styles, meanings, placement and custom design."
      ogImage={heroOf(hero).abs}
      ogType="article"
      jsonLd={jsonLd}
    />
    <GuideLayout
      category="Geometric Tattoos"
      title="Geometric Tattoos in NYC"
      updated="2026-11-11"
      readMinutes={7}
      hero={hero}
      related={[
        { to: '/fine-line-tattoos', label: 'Fine line', photo: photos(55)[0] },
        { to: '/line-work-tattoos', label: 'Linework', photo: photos(27)[0] },
        { to: '/minimalist-tattoos', label: 'Minimalist', photo: photos(105)[0] },
      ]}
    >
      {/* Answer first: a quotable statement for search engines and AI assistants */}
      <GuideLead>
        <p>
          Okan Uckun is a geometric and minimalist tattoo artist in Brooklyn, New York City. Trained as an architect and tattooing since 2009, he draws every geometric piece from scratch for the client’s body, in black ink.
        </p>
      </GuideLead>
      <GuideFacts />
      <GuideTOC items={toc} />

      <GuideSection id="what-is" title="What is a geometric tattoo?">
        <p>
          A geometric tattoo is built from shapes and lines instead of illustration or shading: circles, triangles, squares, arcs, dots and long parallel lines. The design works because of precision. Spacing between lines, the curve of an arc and the angle where two lines meet decide whether the piece feels calm or tense, light or heavy.
        </p>
        <p>
          Geometry has a long history in art and architecture, from sacred geometry and Islamic patterns to the Bauhaus and Russian constructivism. Okan’s work sits closer to the modern side of that history: reduced, abstract compositions that look like construction drawings placed on the body.
        </p>
      </GuideSection>
      <GuideFigure items={photos(6)} caption="Overlapping circles and a triangle across the chest." />

      <GuideSection id="approach" title="An architect’s approach to geometric tattoos">
        <p>
          Before tattooing full time in 2009, Okan studied architecture and completed a master’s degree in modern art. That training shows in how a geometric tattoo is planned: the body is treated as a site, and the composition is drawn to follow its axes. Long lines run with the forearm or the spine, circles sit where the muscle is flattest, and empty skin is part of the design.
        </p>
        <p>
          The result is geometry that moves with the body instead of a flat pattern stuck on top of it. That is also why the same design is never reused. A composition drawn for one forearm will not read the same way on another.
        </p>
      </GuideSection>
      <GuideFigure items={photos(11, 14, 32)} caption="Architectural compositions on the forearm: numbers, circles and construction lines." />

      <GuideSection id="styles" title="Geometric styles in the portfolio">
        <p>Geometric tattooing covers a wide range. These are the directions that come up most often in Okan’s work.</p>
      </GuideSection>
      <GuideSection level={3} title="Sacred geometry and construction drawings">
        <p>
          Overlapping circles, triangles and guide lines, drawn as if the construction of the shape is still visible. These pieces work well on the chest and shoulder, where there is room for the composition to open up.
        </p>
      </GuideSection>
      <GuideFigure items={photos(8, 13)} />

      <GuideSection level={3} title="Orbits and black circles">
        <p>
          A solid black circle crossed by a thin line or wrapped in fine orbit rings. The contrast between the heavy fill and the hairline is what makes these pieces read from a distance and still reward a closer look.
        </p>
      </GuideSection>
      <GuideFigure items={photos(22, 48, 63)} />

      <GuideSection level={3} title="Geometry with fine line detail">
        <p>
          Geometric structure combined with <Link to="/fine-line-tattoos" className={inlineLink}>fine line</Link> drawing: a mountain range resting on a horizon line, or triangles that turn into a landscape.
        </p>
      </GuideSection>
      <GuideFigure items={photos(3, 82)} />

      <GuideSection level={3} title="Large compositions">
        <p>
          Forearm and full-arm pieces built from many small elements: grids, dots, bars and circles arranged so the whole arm reads as one drawing. Symmetric pairs on both forearms are a variation of the same idea.
        </p>
      </GuideSection>
      <GuideFigure items={photos(29, 73)} />

      <GuideSection level={3} title="Minimal geometric symbols">
        <p>
          Sometimes one shape is enough: a single ring on the ribs, two triangles on two forearms, three dots below the neck. These overlap with <Link to="/minimalist-tattoos" className={inlineLink}>minimalist tattoos</Link> and are often a first tattoo.
        </p>
      </GuideSection>
      <GuideFigure items={photos(69, 72, 89)} />

      <GuideSection id="meanings" title="What the shapes mean">
        <p>Shapes carry associations that most people read without thinking about them:</p>
        <ul className="space-y-3 list-none pl-0">
          <li><strong>Circle</strong>: wholeness, cycles, time, the sun and the moon.</li>
          <li><strong>Triangle</strong>: balance, direction, change; pointing up or down changes the feeling.</li>
          <li><strong>Square</strong>: stability, structure, the built world.</li>
          <li><strong>Line</strong>: a path, a connection, the distance between two points.</li>
          <li><strong>Dots</strong>: moments, people or places along that path.</li>
        </ul>
        <p>
          In practice the meaning comes from the client’s story, and the shapes become its vocabulary. A line can be the distance between two cities; a circle can be a person. The booking form asks for that story, because it often decides proportions and line lengths.
        </p>
      </GuideSection>
      <GuideFigure items={photos(101, 88, 77)} caption="Circle, triangle and square as the starting vocabulary of a design." />

      <GuideSection id="placement" title="Geometric tattoo placement guide">
        <p>Geometry is unforgiving on curved skin, so placement decides the design as much as the idea does.</p>
        <ul className="space-y-3 list-none pl-0">
          <li><strong>Forearm</strong>: the most popular spot. Long and fairly flat, ideal for vertical lines and stacked compositions.</li>
          <li><strong>Upper arm</strong>: good for circles and orbit pieces; the inner arm suits finer work.</li>
          <li><strong>Chest</strong>: room for wide, symmetric or sacred geometry compositions.</li>
          <li><strong>Ribs</strong>: elegant for long vertical lines, but more sensitive to sit through.</li>
          <li><strong>Upper back and shoulder blade</strong>: a calm, flat surface for horizontal compositions.</li>
          <li><strong>Thigh</strong>: a large canvas for bigger constructivist pieces.</li>
        </ul>
      </GuideSection>
      <GuideFigure items={photos(17, 41, 54, 12, 50, 94)} />

      <GuideSection id="process" title="How a custom geometric tattoo is made">
        <ol className="space-y-4 list-none pl-0">
          <li><strong>01 Request.</strong> Send the <Link to="/booking" className={inlineLink}>booking form</Link> with your idea, references and photos of the placement marked with a pen.</li>
          <li><strong>02 Concept.</strong> Okan studies the placement and the story behind the piece and sketches the composition.</li>
          <li><strong>03 Design day.</strong> The design is refined and fitted on the body, and line lengths and angles are adjusted to the muscles.</li>
          <li><strong>04 Tattoo.</strong> The stencil is placed and the tattoo is done in black ink with careful line depth.</li>
          <li><strong>05 Healing check.</strong> After healing, a photo of the tattoo is reviewed and any small touch-up is planned.</li>
        </ol>
      </GuideSection>
      <GuideFigure items={photos(0)} caption="Okan Uckun at work on a geometric forearm piece." />

      <GuideSection id="care" title="Keeping the lines sharp">
        <p>
          Geometric tattoos show every change, so aftercare matters. Follow the <Link to="/aftercare" className={inlineLink}>aftercare guide</Link> your artist gives you, keep the tattoo out of pools and the ocean while it heals, and protect it from the sun once it has healed. Black linework with enough space between lines keeps its shape for many years.
        </p>
      </GuideSection>

      <GuideFAQ title="Geometric tattoo FAQ" items={faqs} />
    </GuideLayout>
  </>
);

export default GeometricTattoos;
