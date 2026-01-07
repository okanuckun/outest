import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface GuestSpot {
  id: string;
  studio_name: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  description: string | null;
}

interface GuestSpotsProps {
  variant?: 'light' | 'dark';
}

const GuestSpots: React.FC<GuestSpotsProps> = ({ variant = 'light' }) => {
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

  const textColor = variant === 'dark' ? 'text-foreground' : 'text-[#F6F6F6]';
  const mutedColor = variant === 'dark' ? 'text-muted-foreground' : 'text-white/60';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`inline-flex items-center gap-1 text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase hover:opacity-70 transition-opacity ${textColor}`}>
          Guest Spots
          <ChevronDown size={14} className="opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-[240px] p-3 bg-black/90 backdrop-blur-md border-white/10"
      >
        <p className={`text-[10px] uppercase tracking-[0.2em] mb-3 ${mutedColor}`}>
          Upcoming Locations
        </p>
        <div className="space-y-2">
          {guestSpots.map((spot) => (
            <Link
              key={spot.id}
              to={`/booking?guest_spot=${spot.id}`}
              className="group block p-2 rounded hover:bg-white/5 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-white text-sm font-light">
                    {spot.city}
                  </p>
                  <p className="text-white/50 text-xs">
                    {format(new Date(spot.start_date), 'MMM d')} – {format(new Date(spot.end_date), 'd')}
                  </p>
                </div>
                <span className="text-white/40 text-xs group-hover:text-white transition-colors">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GuestSpots;
