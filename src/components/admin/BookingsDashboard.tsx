import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Mail, Clock, CheckCircle, XCircle, Users, Calendar } from 'lucide-react';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

interface Booking {
  id: string;
  status: string;
  created_at: string;
  location_type: string | null;
}

interface BookingsDashboardProps {
  bookings: Booking[];
}

const COLORS = ['#f59e0b', '#3b82f6', '#22c55e', '#ef4444'];

const BookingsDashboard: React.FC<BookingsDashboardProps> = ({ bookings }) => {
  const stats = useMemo(() => {
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    const currentMonthBookings = bookings.filter(b => {
      const date = parseISO(b.created_at);
      return isWithinInterval(date, { start: currentMonthStart, end: currentMonthEnd });
    });

    const lastMonthBookings = bookings.filter(b => {
      const date = parseISO(b.created_at);
      return isWithinInterval(date, { start: lastMonthStart, end: lastMonthEnd });
    });

    const pendingCount = bookings.filter(b => b.status === 'pending').length;
    const reviewedCount = bookings.filter(b => b.status === 'reviewed').length;
    const approvedCount = bookings.filter(b => b.status === 'approved').length;
    const declinedCount = bookings.filter(b => b.status === 'declined').length;

    const percentChange = lastMonthBookings.length > 0 
      ? Math.round(((currentMonthBookings.length - lastMonthBookings.length) / lastMonthBookings.length) * 100)
      : currentMonthBookings.length > 0 ? 100 : 0;

    // NYC vs Guest Spot breakdown
    const nycCount = bookings.filter(b => b.location_type === 'nyc').length;
    const guestSpotCount = bookings.filter(b => b.location_type === 'guest_spot').length;
    const travelerCount = bookings.filter(b => b.location_type === 'traveler').length;

    return {
      total: bookings.length,
      currentMonth: currentMonthBookings.length,
      lastMonth: lastMonthBookings.length,
      percentChange,
      pending: pendingCount,
      reviewed: reviewedCount,
      approved: approvedCount,
      declined: declinedCount,
      nyc: nycCount,
      guestSpot: guestSpotCount,
      traveler: travelerCount,
    };
  }, [bookings]);

  const monthlyData = useMemo(() => {
    const months: { name: string; count: number }[] = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);

      const count = bookings.filter(b => {
        const date = parseISO(b.created_at);
        return isWithinInterval(date, { start: monthStart, end: monthEnd });
      }).length;

      months.push({
        name: format(monthDate, 'MMM'),
        count,
      });
    }

    return months;
  }, [bookings]);

  const statusData = useMemo(() => [
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'Reviewed', value: stats.reviewed, color: '#3b82f6' },
    { name: 'Approved', value: stats.approved, color: '#22c55e' },
    { name: 'Declined', value: stats.declined, color: '#ef4444' },
  ].filter(item => item.value > 0), [stats]);

  const locationData = useMemo(() => [
    { name: 'NYC Studio', value: stats.nyc },
    { name: 'Guest Spots', value: stats.guestSpot },
    { name: 'Travelers', value: stats.traveler },
  ].filter(item => item.value > 0), [stats]);

  return (
    <div className="space-y-6 mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold">{stats.currentMonth}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stats.percentChange >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs ${stats.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stats.percentChange >= 0 ? '+' : ''}{stats.percentChange}% vs last month
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% approval rate
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Monthly Trend */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar dataKey="count" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  No data yet
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Breakdown */}
      {locationData.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Location Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{stats.nyc}</p>
                <p className="text-sm text-muted-foreground">NYC Studio</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{stats.guestSpot}</p>
                <p className="text-sm text-muted-foreground">Guest Spots</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{stats.traveler}</p>
                <p className="text-sm text-muted-foreground">Travelers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingsDashboard;
