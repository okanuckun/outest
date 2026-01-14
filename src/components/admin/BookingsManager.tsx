import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Mail, Phone, MapPin, Calendar, User, Image, Trash2, Eye } from 'lucide-react';
import BookingsDashboard from './BookingsDashboard';

interface Booking {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  location_type: string | null;
  guest_spot_name: string | null;
  collector_type: string | null;
  tattoo_placement: string | null;
  tattoo_size: string | null;
  portfolio_favorites: string | null;
  artist_inspiration: string | null;
  story: string | null;
  preferred_date: string | null;
  additional_notes: string | null;
  reference_images: string[];
  placement_images: string[];
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  declined: 'bg-red-100 text-red-800',
};

const BookingsManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Booking[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast.success('Status updated');
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast.success('Booking deleted');
      setSelectedBooking(null);
    },
    onError: () => {
      toast.error('Failed to delete booking');
    },
  });

  const filteredBookings = bookings?.filter(booking => 
    filterStatus === 'all' || booking.status === filterStatus
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard */}
      {bookings && bookings.length > 0 && (
        <BookingsDashboard bookings={bookings} />
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Booking Requests ({bookings?.length || 0})</h2>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredBookings?.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">No booking requests found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBookings?.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">
                        {booking.first_name} {booking.last_name}
                      </h3>
                      <Badge className={statusColors[booking.status] || 'bg-gray-100'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {booking.email}
                      </span>
                      {booking.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {booking.phone}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {booking.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.location_type === 'nyc' ? 'NYC - Monolith Studio' : booking.guest_spot_name || booking.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(booking.created_at), 'MMM d, yyyy HH:mm')}
                      </span>
                      {(booking.reference_images?.length > 0 || booking.placement_images?.length > 0) && (
                        <span className="flex items-center gap-1">
                          <Image className="w-4 h-4" />
                          {(booking.reference_images?.length || 0) + (booking.placement_images?.length || 0)} images
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Select
                      value={booking.status}
                      onValueChange={(status) => updateStatusMutation.mutate({ id: booking.id, status })}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="declined">Declined</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <User className="w-5 h-5" />
              {selectedBooking?.first_name} {selectedBooking?.last_name}
              <Badge className={statusColors[selectedBooking?.status || 'pending']}>
                {selectedBooking?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Email</h4>
                  <a href={`mailto:${selectedBooking.email}`} className="text-primary hover:underline">
                    {selectedBooking.email}
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Phone</h4>
                  {selectedBooking.phone ? (
                    <a href={`tel:${selectedBooking.phone}`} className="text-primary hover:underline">
                      {selectedBooking.phone}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Not provided</span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Location</h4>
                  <p>{selectedBooking.location_type === 'nyc' ? 'NYC - Monolith Studio' : selectedBooking.guest_spot_name || selectedBooking.location || 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Collector Type</h4>
                  <p>{selectedBooking.collector_type === 'new' ? 'New Collector' : 'Returning Collector'}</p>
                </div>
              </div>

              {/* Tattoo Details */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Tattoo Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Placement</h4>
                    <p>{selectedBooking.tattoo_placement || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Size</h4>
                    <p>{selectedBooking.tattoo_size || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Preferred Date</h4>
                    <p>{selectedBooking.preferred_date || 'Flexible'}</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold">Project Details</h3>
                {selectedBooking.portfolio_favorites && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Portfolio Favorites</h4>
                    <p className="whitespace-pre-wrap">{selectedBooking.portfolio_favorites}</p>
                  </div>
                )}
                {selectedBooking.artist_inspiration && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Artist Inspiration</h4>
                    <p className="whitespace-pre-wrap">{selectedBooking.artist_inspiration}</p>
                  </div>
                )}
                {selectedBooking.story && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Story/Meaning</h4>
                    <p className="whitespace-pre-wrap">{selectedBooking.story}</p>
                  </div>
                )}
                {selectedBooking.additional_notes && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Additional Notes</h4>
                    <p className="whitespace-pre-wrap">{selectedBooking.additional_notes}</p>
                  </div>
                )}
              </div>

              {/* Reference Images */}
              {selectedBooking.reference_images?.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Reference Images ({selectedBooking.reference_images.length})</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedBooking.reference_images.map((url, index) => (
                      <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={url}
                          alt={`Reference ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Placement Images */}
              {selectedBooking.placement_images?.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Placement Photos ({selectedBooking.placement_images.length})</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedBooking.placement_images.map((url, index) => (
                      <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={url}
                          alt={`Placement ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="border-t pt-4 flex justify-between">
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this booking?')) {
                      deleteBookingMutation.mutate(selectedBooking.id);
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Booking
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Select
                    value={selectedBooking.status}
                    onValueChange={(status) => {
                      updateStatusMutation.mutate({ id: selectedBooking.id, status });
                      setSelectedBooking({ ...selectedBooking, status });
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Submitted on {format(new Date(selectedBooking.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsManager;
