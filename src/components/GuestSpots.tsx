import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

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
      // Use local date (not UTC) to avoid off-by-one issues around timezone
      const today = format(new Date(), 'yyyy-MM-dd');

      const { data, error } = await supabase
        .from('guest_spots')
        .select('*')
        .gte('end_date', today)
        .eq('is_active', true)
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      console.log('[GuestSpots] fetched:', data?.length, data);
      return data as GuestSpot[];
    },
  });

  if (!guestSpots || guestSpots.length === 0) {
    return null;
  }
  if (isLoading) {
    return (
      <div className="absolute top-32 right-[22.5px] max-sm:right-4 md:top-36 z-[100] bg-blue-500/50">
        <div className="w-[220px] h-[100px]" />
      </div>
    );
  }

  return (
    <div className="absolute top-32 right-[22.5px] max-sm:right-4 md:top-36 z-[100] bg-red-500/50">
      <div className="backdrop-blur-sm bg-black/40 border border-white/10 rounded-sm p-3 md:p-4 w-[220px]">
        <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-2">
          Upcoming Guest Spots
        </p>
        <div className="space-y-2">
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
                  <p className="text-white/75 text-xs">
                    {format(parseISO(spot.start_date), 'MMM d')} – {format(parseISO(spot.end_date), 'd')}
                  </p>
                </div>
                <span className="text-white/70 text-xs group-hover:text-white transition-colors">
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
