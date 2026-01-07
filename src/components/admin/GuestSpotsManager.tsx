import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, MapPin, Calendar, Edit } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface GuestSpot {
  id: string;
  studio_name: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  description: string | null;
  is_active: boolean;
}

const GuestSpotsManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState<GuestSpot | null>(null);
  const [formData, setFormData] = useState({
    studio_name: '',
    city: '',
    country: '',
    start_date: '',
    end_date: '',
    description: '',
    is_active: true,
  });

  const { data: guestSpots, isLoading } = useQuery({
    queryKey: ['admin-guest-spots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guest_spots')
        .select('*')
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data as GuestSpot[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('guest_spots').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-guest-spots'] });
      queryClient.invalidateQueries({ queryKey: ['guest-spots'] });
      toast.success('Guest spot added');
      resetForm();
    },
    onError: (error) => {
      toast.error('Failed to add guest spot');
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from('guest_spots').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-guest-spots'] });
      queryClient.invalidateQueries({ queryKey: ['guest-spots'] });
      toast.success('Guest spot updated');
      resetForm();
    },
    onError: (error) => {
      toast.error('Failed to update guest spot');
      console.error(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('guest_spots').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-guest-spots'] });
      queryClient.invalidateQueries({ queryKey: ['guest-spots'] });
      toast.success('Guest spot deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete guest spot');
      console.error(error);
    },
  });

  const resetForm = () => {
    setFormData({
      studio_name: '',
      city: '',
      country: '',
      start_date: '',
      end_date: '',
      description: '',
      is_active: true,
    });
    setEditingSpot(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (spot: GuestSpot) => {
    setEditingSpot(spot);
    setFormData({
      studio_name: spot.studio_name,
      city: spot.city,
      country: spot.country,
      start_date: spot.start_date,
      end_date: spot.end_date,
      description: spot.description || '',
      is_active: spot.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpot) {
      updateMutation.mutate({ id: editingSpot.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Guest Spots</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => resetForm()}>
              <Plus size={16} className="mr-2" />
              Add Guest Spot
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSpot ? 'Edit Guest Spot' : 'Add Guest Spot'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studio_name">Studio Name</Label>
                <Input
                  id="studio_name"
                  value={formData.studio_name}
                  onChange={(e) => setFormData({ ...formData, studio_name: e.target.value })}
                  placeholder="Bang Bang NYC"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Los Angeles"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="USA"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Any additional details..."
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingSpot ? 'Update' : 'Add'} Guest Spot
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : !guestSpots || guestSpots.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No guest spots added yet. Add your first guest spot above.
          </p>
        ) : (
          <div className="space-y-3">
            {guestSpots.map((spot) => (
              <div
                key={spot.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  !spot.is_active ? 'opacity-50' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <Calendar size={12} />
                    <span>
                      {format(new Date(spot.start_date), 'MMM d')} - {format(new Date(spot.end_date), 'MMM d, yyyy')}
                    </span>
                    {!spot.is_active && (
                      <span className="text-yellow-500">(Inactive)</span>
                    )}
                  </div>
                  <h4 className="font-medium">{spot.studio_name}</h4>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin size={12} />
                    <span>{spot.city}, {spot.country}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(spot)}>
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(spot.id)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestSpotsManager;
