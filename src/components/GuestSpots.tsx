import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface GuestSpot {
  id: string;
  studio_name: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  description: string | null;
}

const GuestSpots: React.FC = () => {
  const { data: guestSpots, isLoading } = useQuery({
    queryKey: ['guest-spots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guest_spots')
        .select('*')
        .gte('end_date', new Date().toISOString().split('T')[0])
        .eq('is_active', true)
        .order('start_date', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data as GuestSpot[];
    },
  });

  if (isLoading || !guestSpots || guestSpots.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-24 left-6 md:top-28 md:left-12 z-20">
      <div className="backdrop-blur-sm bg-black/40 border border-white/10 rounded-sm p-4 md:p-5 max-w-[260px]">
        <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-3">
          Upcoming Guest Spots
        </p>
        <div className="space-y-3">
          {guestSpots.map((spot) => (
            <Link
              key={spot.id}
              to={`/booking?guest_spot=${spot.id}`}
              className="group block"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-white text-sm font-light">
                    {spot.city}
                  </p>
                  <p className="text-white/50 text-xs">
                    {format(new Date(spot.start_date), 'MMM d')} – {format(new Date(spot.end_date), 'd')}
                  </p>
                </div>
                <span className="text-white/40 text-xs group-hover:text-white transition-colors">
                  Book →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestSpots;
