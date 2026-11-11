import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { PortfolioPhoto, heroOf, photoUrl } from '@/data/portfolio';

/**
 * Editorial layout for the style guide pages and blog posts, modelled on
 * the Monolith Studio blog:
 *  - full-screen hero photo, title top-left, meta bottom-left
 *  - text in a narrow column on the right, left side left open
 *  - photos edge to edge with no gaps (see GuideFigure)
 *  - fixed bottom bar with "view work" and "book" actions
 * Fonts and colours stay okanuckun.com's own.
 */

export const inlineLink = 'underline underline-offset-4 hover:opacity-60 transition-opacity';

export interface FAQItem {
  q: string;
  a: string;
}

interface RelatedItem {
  to: string;
  label: string;
  photo: PortfolioPhoto;
}

interface GuideLayoutProps {
  category: string;
  title: string;
  updated: string; // ISO date
  readMinutes: number;
  hero: PortfolioPhoto;
  related: RelatedItem[];
  /** middle breadcrumb step; defaults to Work, null to hide */
  parent?: { to: string; label: string } | null;
  /** label above the related row */
  relatedLabel?: string;
  children: React.ReactNode;
}

const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const body = 'space-y-4 text-[15px] md:text-[16px] text-[#1a1a1a] leading-[1.65] [&_strong]:font-semibold';
const gutter = 'px-5 md:px-7';

/**
 * A text section spread over the full width: heading on the left (stays in
 * view while the text scrolls), text on the right. level 2 = main section
 * (h2), level 3 = sub-section (h3).
 */
export const GuideSection: React.FC<{
  id?: string;
  title?: React.ReactNode;
  level?: 2 | 3;
  children: React.ReactNode;
}> = ({ id, title, level = 2, children }) => {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <ScrollReveal>
      <section
        id={id}
        className={`${gutter} scroll-mt-24 grid md:grid-cols-12 gap-x-8 gap-y-5 ${level === 2 ? 'pt-16 md:pt-24' : 'pt-10 md:pt-14'}`}
      >
        <div className="md:col-span-5 lg:col-span-4">
          {title && (
            <Heading
              className={`md:sticky md:top-24 font-medium text-[#1a1a1a] tracking-[-0.04em] ${
                level === 2 ? 'text-[30px] md:text-[42px] leading-[1.02]' : 'text-[22px] md:text-[26px] leading-[1.1] tracking-[-0.03em]'
              }`}
            >
              {title}
            </Heading>
          )}
        </div>
        <div className={`md:col-span-7 lg:col-start-6 lg:col-span-6 max-w-[680px] ${body}`}>{children}</div>
      </section>
    </ScrollReveal>
  );
};

/** Opening statement across the full width. */
export const GuideLead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ScrollReveal>
    <div className={`${gutter} max-w-[1180px] text-[21px] md:text-[44px] font-medium leading-[1.1] tracking-[-0.035em] text-[#1a1a1a]`}>
      {children}
    </div>
  </ScrollReveal>
);

/** Key facts as one row across the page — short lines search engines and AI assistants can quote. */
export const GuideFacts: React.FC = () => {
  const facts: [string, React.ReactNode][] = [
    ['Artist', 'Okan Uckun'],
    ['Studio', 'Monolith Studio, 77 Washington Ave, Brooklyn, NY'],
    ['Tattooing since', '2009'],
    ['Background', 'Architecture degree, master’s in modern art'],
    ['Ink', 'Black only'],
    ['Designs', 'Custom, drawn for each client'],
    ['Booking', <Link key="b" to="/booking" className={inlineLink}>Request an appointment</Link>],
  ];
  return (
    <ScrollReveal>
      <dl className={`${gutter} mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-6 text-[13px]`}>
        {facts.map(([k, v]) => (
          <div key={k} className="border-t border-[#1a1a1a]/25 pt-3 pb-6">
            <dt className="text-[11px] text-[#777] uppercase tracking-wider mb-1.5">{k}</dt>
            <dd className="text-[#1a1a1a] leading-snug">{v}</dd>
          </div>
        ))}
      </dl>
    </ScrollReveal>
  );
};

/**
 * Table of contents as a stacked list: label on the left, one row per
 * section on the right, each row a full-width link with a hairline rule.
 */
export const GuideTOC: React.FC<{ items: { id: string; label: string }[] }> = ({ items }) => (
  <ScrollReveal>
    <nav aria-label="On this page" className={`${gutter} mt-10 md:mt-16 grid md:grid-cols-12 gap-x-8 gap-y-3`}>
      <p className="md:col-span-5 lg:col-span-4 text-[11px] uppercase tracking-wider text-[#777] md:pt-4">
        On this page
      </p>
      <ol className="md:col-span-7 lg:col-start-6 lg:col-span-6 max-w-[680px] border-t border-[#1a1a1a]/20">
        {items.map((t, i) => (
          <li key={t.id} className="border-b border-[#1a1a1a]/20">
            <a
              href={`#${t.id}`}
              className="group flex items-baseline gap-4 py-3 text-[15px] md:text-[16px] tracking-[-0.01em] text-[#1a1a1a]"
            >
              <span className="text-[11px] font-normal text-[#777] tabular-nums tracking-normal w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 transition-transform duration-300 group-hover:translate-x-1">{t.label}</span>
              <ArrowDown
                size={18}
                strokeWidth={1.5}
                className="shrink-0 self-center text-[#777] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  </ScrollReveal>
);

export const GuideFAQ: React.FC<{ title: string; items: FAQItem[] }> = ({ title, items }) => (
  <GuideSection id="faq" title={title}>
    <div className="border-t border-[#1a1a1a]/20">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-[#1a1a1a]/20 py-4">
          <summary className="flex justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-[15px] md:text-[16px] font-medium">{f.q}</h3>
            <span aria-hidden className="text-[18px] leading-none text-[#777] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-[14px] md:text-[15px] leading-[1.6]">{f.a}</p>
        </details>
      ))}
    </div>
  </GuideSection>
);

/** Fixed bottom bar with reading progress, like the Monolith blog. */
export const BottomBar: React.FC<{ label: string }> = ({ label }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-[56px] md:h-[64px] bg-[#f5f5f5] border-t border-[#1a1a1a]/20 flex text-[11px] uppercase tracking-wider text-[#1a1a1a]">
      <div className="hidden md:flex flex-1 items-center gap-6 px-6 border-r border-[#1a1a1a]/20">
        <span className="whitespace-nowrap">{label}</span>
        <span className="relative h-px w-40 bg-[#1a1a1a]/15">
          <span className="absolute inset-y-0 left-0 bg-[#1a1a1a]" style={{ width: `${progress * 100}%` }} />
        </span>
      </div>
      <Link to="/work" className="flex-1 md:flex-none md:w-[220px] flex items-center justify-center md:justify-start px-6 border-r border-[#1a1a1a]/20 hover:bg-[#1a1a1a]/5 transition-colors">
        View all work
      </Link>
      <Link to="/booking" className="flex-1 md:flex-none md:w-[260px] flex items-center justify-between px-6 font-medium hover:bg-[#1a1a1a]/5 transition-colors">
        Book an appointment
        <ArrowUpRight size={18} strokeWidth={1.5} />
      </Link>
    </div>
  );
};

const GuideLayout: React.FC<GuideLayoutProps> = ({
  category,
  title,
  updated,
  readMinutes,
  hero,
  related,
  parent = { to: '/work', label: 'Work' },
  relatedLabel = 'Other styles',
  children,
}) => {
  const h = heroOf(hero);
  // Light navigation over the hero photo, dark once the reader is past it.
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a]">
      <div className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${pastHero ? 'bg-[#f5f5f5]' : ''}`}>
        <Navigation variant={pastHero ? 'dark' : 'light'} />
      </div>

      <main className="pb-[64px]">
        <article>
          {/* Full-screen hero */}
          <header className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#0d0d0d]">
            <img
              src={h.src}
              alt={hero.alt}
              width={h.w}
              height={h.h}
              {...{ fetchpriority: 'high' }}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60" />
            <div className="relative z-10 h-full flex flex-col justify-between px-5 md:px-7 pt-24 md:pt-28 pb-8 md:pb-10 text-[#f1f1f1]">
              <div>
                <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
                  <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider">
                    <li><Link to="/" className="hover:opacity-70 transition-opacity">Home</Link></li>
                    {parent && (
                      <>
                        <li aria-hidden>/</li>
                        <li><Link to={parent.to} className="hover:opacity-70 transition-opacity">{parent.label}</Link></li>
                      </>
                    )}
                    <li aria-hidden>/</li>
                    <li aria-current="page" className="text-[#f1f1f1]/70">{category}</li>
                  </ol>
                </nav>
                <h1 className="max-w-[900px] text-[44px] md:text-[69px] font-medium leading-[1] tracking-[-0.04em]">
                  {title}
                </h1>
              </div>
              <div className="text-[11px] uppercase tracking-wider space-y-1">
                <p>
                  {category} <span className="mx-1">•</span> Updated <time dateTime={updated}>{formatDate(updated)}</time>
                </p>
                <p className="text-[#f1f1f1]/70">
                  By Okan Uckun <span className="mx-1">•</span> {readMinutes} min read
                </p>
              </div>
            </div>
          </header>

          <div className="pt-20 md:pt-28">{children}</div>
        </article>

        {/* Related — edge to edge thirds, label on the photo */}
        <section className="mt-28" aria-label={relatedLabel}>
          <p className="px-5 md:px-7 mb-4 text-[11px] text-[#777] uppercase tracking-wider">{relatedLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.to} to={r.to} className="group relative block overflow-hidden bg-[#0d0d0d]">
                <img
                  src={photoUrl(r.photo)}
                  alt={r.photo.alt}
                  width={r.photo.w}
                  height={r.photo.h}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] sm:aspect-[9/10] object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute left-5 bottom-5 right-5 flex items-center justify-between text-[#f1f1f1] text-[22px] md:text-[28px] font-medium tracking-[-0.03em]">
                  {r.label}
                  <ArrowUpRight size={22} strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      {/* room for the fixed bottom bar so the footer's last row stays visible */}
      <div className="h-[56px] md:h-[64px] bg-[#111]" aria-hidden />
      <BottomBar label={`Okan Uckun — ${category}`} />
    </div>
  );
};

export default GuideLayout;
