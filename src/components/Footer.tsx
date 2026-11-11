import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

/**
 * Site footer: tagline + booking on the left, link columns on the right,
 * the MONOLITH wordmark, then a hairline row with copyright and socials.
 */

const styleLinks = [
  { label: 'Geometric', to: '/geometric-tattoos' },
  { label: 'Fine line', to: '/fine-line-tattoos' },
  { label: 'Linework', to: '/line-work-tattoos' },
  { label: 'Minimalist', to: '/minimalist-tattoos' },
];

const exploreLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Projects', to: '/project' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Shop', to: '/shop' },
  { label: 'Aftercare', to: '/aftercare' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/okanuckun' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@okanuckun' },
  { label: 'YouTube', href: 'https://www.youtube.com/@monolithstudionyc' },
];

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[11px] text-[#f5f5f5]/45 uppercase tracking-wider mb-4">{children}</p>
);

const linkClass = 'hover:opacity-60 transition-opacity';

const Footer: React.FC = () => (
  <footer className="relative bg-[#111] text-[#f5f5f5] w-full overflow-hidden">
    <ScrollReveal>
      <div className="px-6 md:px-12 pt-20 md:pt-28">
        <div className="pt-10 md:pt-14 grid md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Tagline + booking */}
          <div className="md:col-span-5">
            <p className="text-[32px] md:text-[48px] font-medium leading-[1] tracking-[-0.04em] mb-8">
              Saying more
              <br />
              with less.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 border border-[#f5f5f5] px-5 py-3 text-[12px] uppercase tracking-wider hover:bg-[#f5f5f5] hover:text-[#111] transition-colors"
            >
              Book an appointment <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Link columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10 text-[14px]">
            <nav aria-label="Styles">
              <Label>Styles</Label>
              <ul className="space-y-2">
                {styleLinks.map((l) => (
                  <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Explore">
              <Label>Explore</Label>
              <ul className="space-y-2">
                {exploreLinks.map((l) => (
                  <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
            <div>
              <Label>Studio</Label>
              <a
                href="https://www.google.com/maps/search/77+Washington+Avenue+Brooklyn+NYC"
                target="_blank"
                rel="noopener noreferrer"
                className={`block leading-relaxed ${linkClass}`}
              >
                77 Washington Avenue
                <br />
                Brooklyn, NY
              </a>
              <a href="tel:+16167777073" className={`block mt-4 ${linkClass}`}>
                +1 (616) 777-7073
              </a>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>

    {/* MONOLITH wordmark — links to the homepage */}
    <Link to="/" aria-label="Go to homepage" className="block mt-20 md:mt-28">
      <motion.span
        className="block w-full font-black leading-[0.85] tracking-[-0.02em] text-center whitespace-nowrap hover:opacity-80 transition-opacity"
        style={{ fontSize: 'min(18vw, 280px)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        MONOLITH
      </motion.span>
    </Link>

    {/* Copyright + socials */}
    <div className="px-6 md:px-12 py-6 border-t border-[#f5f5f5]/20 flex flex-col md:flex-row justify-between gap-3 text-[11px] uppercase tracking-wider text-[#f5f5f5]/45">
      <span>
        © {new Date().getFullYear()} Okan Uckun · Tattooing at{' '}
        <a href="https://monolithstudio.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f5f5] transition-colors">
          Monolith Studio
        </a>
        , Brooklyn
      </span>
      <span className="flex gap-5">
        {socialLinks.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#f5f5f5] transition-colors">
            {s.label}
          </a>
        ))}
      </span>
    </div>
  </footer>
);

export default Footer;
