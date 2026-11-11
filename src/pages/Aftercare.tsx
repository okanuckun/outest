import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import ScrollReveal from '@/components/animations/ScrollReveal';
import GuideLayout, { GuideSection, GuideLead, GuideFAQ, GuideTOC, inlineLink, FAQItem } from '@/components/style-guide/GuideLayout';
import GuideFigure from '@/components/style-guide/GuideFigure';
import { personNode, studioNode, PERSON_ID } from '@/components/style-guide/guideSchema';
import { photos, heroOf } from '@/data/portfolio';

/**
 * Okan Uckun's own aftercare method, written as a day-by-day guide.
 * Method confirmed by Okan (2026-11-11): protective film stays on 3 days;
 * pure coconut oil 4 times a day for 2 weeks unless Okan gave the client a
 * cream; antibacterial soap once a day in the first week; healing photo at
 * about 2 months. No swimming / direct sun for 3–4 weeks (Monolith rule).
 */

const PAGE_URL = 'https://okanuckun.com/aftercare';
const hero = photos(10)[0];

type Step = { id: string; when: string; title: string; summary: string };

const steps: Step[] = [
  { id: 'right-after', when: 'Day 0', title: 'Right after your session', summary: 'Your tattoo is covered with a protective film. Leave it on.' },
  { id: 'days-1-3', when: 'Days 1–3', title: 'Keep the film on', summary: 'Keep the film on for 3 days. You can shower as usual.' },
  { id: 'remove-film', when: 'Day 3', title: 'Remove the film', summary: 'Peel the film off slowly under warm water.' },
  { id: 'weeks-1-2', when: 'Weeks 1–2', title: 'Wash and moisturize', summary: 'Pure coconut oil 4 times a day for 2 weeks; antibacterial soap once a day in the first week.' },
  { id: 'weeks-2-4', when: 'Weeks 2–4', title: 'Let it settle', summary: 'Do not pick at flakes. No swimming and no direct sun for 3–4 weeks.' },
  { id: 'two-months', when: 'Around 2 months', title: 'Send a healing photo', summary: 'Send Okan a few photos in good light so he can check the healing.' },
  { id: 'long-term', when: 'For life', title: 'Protect it from the sun', summary: 'Use sunscreen on the healed tattoo to keep the lines sharp.' },
];

const toc = [
  ...steps.map((s) => ({ id: s.id, label: `${s.when}: ${s.title}` })),
  { id: 'faq', label: 'Aftercare FAQ' },
];

const faqs: FAQItem[] = [
  {
    q: 'How long should the film stay on a new tattoo?',
    a: 'Keep the protective film on for 3 days. You can shower with it on. On day 3, remove it slowly under warm water.',
  },
  {
    q: 'Is the dark liquid under the film normal?',
    a: 'Yes. In the first hours the film fills with a mix of blood and ink. Do not try to push it out. If there is a lot and it bothers you, you can make a small hole in the film to let it drain.',
  },
  {
    q: 'Why do my lines look crooked under the film?',
    a: 'The plastic film pulls the skin in different directions, so lines and circles can look uneven while it is on. This is normal and nothing to worry about; once the film is removed, the tattoo looks as it should.',
  },
  {
    q: 'My tattoo looks faded after removing the film. Is that normal?',
    a: 'Yes. A tattoo often looks lighter or slightly cloudy right after the film comes off. This is part of normal healing.',
  },
  {
    q: 'Can you use coconut oil on a new tattoo?',
    a: 'Okan Uckun recommends pure, 100% natural coconut oil, applied 4 times a day for 2 weeks after the film is removed, unless he has given you a specific cream. No other products are needed.',
  },
  {
    q: 'When can I swim or go in the sun after a tattoo?',
    a: 'Avoid pools, the sea, baths and direct sun for 3–4 weeks while the tattoo heals. After that, protect the healed tattoo with sunscreen.',
  },
  {
    q: 'Will my tattoo need a touch-up?',
    a: 'Usually not. Around 2 months after the session, send Okan a few photos in good light. If a tiny detail needs it, a touch-up takes 1–2 minutes.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    personNode,
    studioNode,
    {
      '@type': 'HowTo',
      '@id': `${PAGE_URL}#howto`,
      name: 'Tattoo aftercare: how to heal a new tattoo, step by step',
      description: 'Okan Uckun’s day-by-day aftercare method for fine line, geometric and minimalist tattoos.',
      url: PAGE_URL,
      inLanguage: 'en',
      totalTime: 'P2M',
      author: { '@id': PERSON_ID },
      supply: [
        { '@type': 'HowToSupply', name: 'Pure, 100% natural coconut oil (unless your artist gave you a cream)' },
        { '@type': 'HowToSupply', name: 'Antibacterial soap' },
      ],
      step: steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: `${s.when}: ${s.title}`,
        text: s.summary,
        url: `${PAGE_URL}#${s.id}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://okanuckun.com/' },
        { '@type': 'ListItem', position: 2, name: 'Aftercare', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

/** Step heading: small "when" label above the step title. */
const StepTitle: React.FC<{ s: Step; n: number }> = ({ s, n }) => (
  <>
    <span className="block text-[11px] text-[#777] uppercase tracking-wider font-normal tracking-normal mb-3">
      {String(n).padStart(2, '0')} · {s.when}
    </span>
    {s.title}
  </>
);

const Aftercare: React.FC = () => (
  <>
    <SEOHead
      title="Tattoo Aftercare Guide, Step by Step | Okan Uckun"
      description="Okan Uckun's tattoo aftercare, day by day: keep the film on 3 days, then coconut oil 4 times a day for 2 weeks. What is normal, what to avoid."
      canonical={PAGE_URL}
      ogTitle="Tattoo Aftercare, Step by Step | Okan Uckun"
      ogDescription="Day-by-day aftercare for fine line, geometric and minimalist tattoos by Brooklyn artist Okan Uckun."
      ogImage={heroOf(hero).abs}
      ogType="article"
      jsonLd={jsonLd}
    />
    <GuideLayout
      category="Aftercare"
      title="Tattoo Aftercare, Step by Step"
      updated="2026-11-11"
      readMinutes={4}
      hero={hero}
      parent={null}
      relatedLabel="Styles"
      related={[
        { to: '/fine-line-tattoos', label: 'Fine line', photo: photos(55)[0] },
        { to: '/geometric-tattoos', label: 'Geometric', photo: photos(42)[0] },
        { to: '/minimalist-tattoos', label: 'Minimalist', photo: photos(105)[0] },
      ]}
    >
      <GuideLead>
        <p>
          Fine lines heal best with a simple routine. This is Okan Uckun’s own aftercare method, day by day, for the tattoo you just got.
        </p>
      </GuideLead>

      {/* What you need — one row across the page */}
      <ScrollReveal>
        <dl className="px-5 md:px-7 mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-x-6 text-[13px]">
          {[
            ['You need', 'Pure, 100% natural coconut oil (unless Okan gave you a cream)'],
            ['And', 'Antibacterial soap'],
            ['Total healing', 'About 3–4 weeks; healing check at around 2 months'],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-[#1a1a1a]/25 pt-3 pb-6">
              <dt className="text-[11px] text-[#777] uppercase tracking-wider mb-1.5">{k}</dt>
              <dd className="text-[#1a1a1a] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>

      <GuideSection>
        <p>
          Every artist gives their own aftercare, because every artist works differently. Follow these steps rather than advice from friends or the internet. If Okan gave you different instructions for your tattoo, follow his.
        </p>
      </GuideSection>

      <GuideTOC items={toc} />

      <GuideSection id={steps[0].id} title={<StepTitle s={steps[0]} n={1} />}>
        <p>
          When the session is done, Okan covers the tattoo with a protective film, the same kind used after plastic surgery. Leave it on; it does the work for the first days.
        </p>
        <p>
          Within a few hours the inside of the film fills with a dark liquid. This is a mix of blood and ink and it is completely normal. Do not try to push it out. If there is a lot and it bothers you, make a small hole in the film to let it drain.
        </p>
        <p>
          Under the film, lines and circles may not look straight. The plastic pulls the skin in different directions, which makes the tattoo look uneven. This is completely normal, so don’t worry: once the film comes off, the lines are where they should be.
        </p>
      </GuideSection>

      <GuideSection id={steps[1].id} title={<StepTitle s={steps[1]} n={2} />}>
        <p>
          Keep the film on for <strong>3 days</strong> and carry on with your life as usual. You can shower: water does not damage the film. Just be gentle, because the film can loosen under running water, and you want it to stay on.
        </p>
      </GuideSection>

      <GuideSection id={steps[2].id} title={<StepTitle s={steps[2]} n={3} />}>
        <p>
          On day 3, remove the film <strong>slowly, under warm water</strong>. Take your time; pulling fast can irritate the skin.
        </p>
        <p>
          The tattoo may look faded or cloudy once the film is off. This is a normal stage of healing.
        </p>
      </GuideSection>
      <GuideFigure items={photos(100, 52)} />

      <GuideSection id={steps[3].id} title={<StepTitle s={steps[3]} n={4} />}>
        <ul className="space-y-3 list-none pl-0">
          <li>
            <strong>Moisturize 4 times a day for 2 weeks</strong> with pure, 100% natural coconut oil, the same kind used for hair or cooking. If Okan gave you a specific cream, use that instead. No other brand or product is needed.
          </li>
          <li>
            <strong>Wash once a day in the first week</strong> with antibacterial soap. It removes germs that may be in the water and helps the tattoo heal smoothly.
          </li>
          <li>
            Water on the tattoo is fine, but <strong>whenever it gets wet, wash it with antibacterial soap</strong>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id={steps[4].id} title={<StepTitle s={steps[4]} n={5} />}>
        <ul className="space-y-3 list-none pl-0">
          <li>Light flaking is normal. <strong>Do not pick or scratch</strong>; let the skin come off on its own.</li>
          <li><strong>No swimming</strong> in pools, the sea or baths for 3–4 weeks.</li>
          <li><strong>No direct sun</strong> on the tattoo for 3–4 weeks; cover it with clothing.</li>
        </ul>
      </GuideSection>
      <GuideFigure items={photos(66, 86, 39)} />

      <GuideSection id={steps[5].id} title={<StepTitle s={steps[5]} n={6} />}>
        <p>
          About <strong>2 months</strong> after your session, send Okan a few photos of the tattoo in good light. Please send them even if you think it healed perfectly; he wants to check every piece.
        </p>
        <p>
          Most tattoos need no touch-up. If a tiny detail needs one, it takes 1–2 minutes, and it is usually something only the artist would notice.
        </p>
      </GuideSection>

      <GuideSection id={steps[6].id} title={<StepTitle s={steps[6]} n={7} />}>
        <p>
          Once healed, sunscreen is the best thing you can do for fine lines. Sun is what blurs and fades a tattoo over the years.
        </p>
        <p>
          Questions about your healing? Reach out through the <Link to="/booking" className={inlineLink}>booking page</Link>.
        </p>
      </GuideSection>

      <GuideFAQ title="Aftercare FAQ" items={faqs} />
    </GuideLayout>
  </>
);

export default Aftercare;
