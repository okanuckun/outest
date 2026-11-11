import React from 'react';
import { PortfolioPhoto, photoUrl } from '@/data/portfolio';

/**
 * Edge-to-edge image row, as on the Monolith blog: images run the full
 * viewport width with no gaps — one large image, two halves or three thirds.
 */
interface GuideFigureProps {
  items: PortfolioPhoto[];
  /** optional small caption under the row, aligned with the text column */
  caption?: string;
}

const GuideFigure: React.FC<GuideFigureProps> = ({ items, caption }) => {
  if (!items.length) return null;
  const n = items.length;
  const grid = n === 1 ? 'grid-cols-1' : n === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3';
  return (
    <figure className="my-20 md:my-28">
      <div className={`grid ${grid}`}>
        {items.map((p, i) => (
          <div
            key={p.n}
            className={`bg-[#0d0d0d] overflow-hidden ${n === 3 && i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
          >
            <img
              src={photoUrl(p)}
              alt={p.alt}
              width={p.w}
              height={p.h}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover ${
                n === 1 ? 'h-[100svh] max-h-[960px]' : n === 3 && i === 2 ? 'aspect-[4/5] md:aspect-[9/10]' : 'aspect-[4/5] md:aspect-[9/10]'
              }`}
            />
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="px-5 md:px-7 mt-3 text-[11px] text-[#888] uppercase tracking-wider">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default GuideFigure;
