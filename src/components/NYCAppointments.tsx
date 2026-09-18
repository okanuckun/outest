import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

interface NYCAppointment {
  id: string;
  label: string;
  start_date: string;
  end_date: string;
  description: string | null;
}

const NYCAppointments: React.FC = () => {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['nyc-appointments'],
    queryFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');

      const { data, error } = await supabase
        .from('nyc_appointments')
        .select('*')
        .gte('end_date', today)
        .eq('is_active', true)
        .order('start_date', { ascending: true })
        .limit(3);

      if (error) throw error;
      return data as NYCAppointment[];
    },
  });

  if (isLoading || !appointments || appointments.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-28 left-4 z-20 w-[calc(50%-12px)] sm:top-32 sm:left-[22.5px] sm:w-[220px] sm:right-auto md:top-36">
      <div className="w-full backdrop-blur-sm bg-black/40 border border-white/10 rounded-sm p-3 sm:w-[220px] md:p-4">
        <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-2">
          Available Appointments
        </p>
        <div className="space-y-2">
          {appointments.map((appt) => (
            <Link
              key={appt.id}
              to="/booking?location_type=nyc"
              className="group block"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-white text-sm font-light">
                    {appt.label}
                  </p>
                  <p className="text-white/75 text-xs">
                    {format(parseISO(appt.start_date), 'MMMM')} - {format(parseISO(appt.end_date), 'MMMM')}
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

export default NYCAppointments;
