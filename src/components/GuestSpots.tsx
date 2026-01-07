import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
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
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data as GuestSpot[];
    },
  });

  if (isLoading || !guestSpots || guestSpots.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-[22.5px] max-md:px-5 max-sm:px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-foreground text-3xl md:text-4xl font-medium tracking-tight">
              Guest Spots
            </h2>
            <p className="text-muted-foreground mt-2">
              Upcoming locations where I'll be tattooing
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {guestSpots.map((spot) => (
            <Link
              key={spot.id}
              to={`/booking?guest_spot=${spot.id}`}
              className="group block"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-border rounded-lg bg-card hover:border-foreground/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Calendar size={14} />
                    <span>
                      {format(new Date(spot.start_date), 'MMM d')} - {format(new Date(spot.end_date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <h3 className="text-foreground text-xl font-medium mb-1">
                    {spot.studio_name}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin size={14} />
                    <span>{spot.city}, {spot.country}</span>
                  </div>
                  {spot.description && (
                    <p className="text-muted-foreground text-sm mt-2">{spot.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0 text-foreground group-hover:translate-x-1 transition-transform">
                  <span className="text-sm font-medium">Book Now</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestSpots;
