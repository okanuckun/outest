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
import { Plus, Trash2, Calendar, Edit } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface NYCAppointment {
  id: string;
  label: string;
  start_date: string;
  end_date: string;
  description: string | null;
  is_active: boolean;
}

const NYCAppointmentsManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppt, setEditingAppt] = useState<NYCAppointment | null>(null);
  const [formData, setFormData] = useState({
    label: 'NYC - Monolith',
    start_date: '',
    end_date: '',
    description: '',
    is_active: true,
  });

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['admin-nyc-appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nyc_appointments')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data as NYCAppointment[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('nyc_appointments').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-nyc-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['nyc-appointments'] });
      toast.success('NYC appointment period added');
      resetForm();
    },
    onError: (error) => {
      toast.error('Failed to add appointment period');
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from('nyc_appointments').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-nyc-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['nyc-appointments'] });
      toast.success('Appointment period updated');
      resetForm();
    },
    onError: (error) => {
      toast.error('Failed to update appointment period');
      console.error(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('nyc_appointments').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-nyc-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['nyc-appointments'] });
      toast.success('Appointment period deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete appointment period');
      console.error(error);
    },
  });

  const resetForm = () => {
    setFormData({
      label: 'NYC - Monolith',
      start_date: '',
      end_date: '',
      description: '',
      is_active: true,
    });
    setEditingAppt(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (appt: NYCAppointment) => {
    setEditingAppt(appt);
    setFormData({
      label: appt.label,
      start_date: appt.start_date,
      end_date: appt.end_date,
      description: appt.description || '',
      is_active: appt.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppt) {
      updateMutation.mutate({ id: editingAppt.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>NYC Appointments</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => resetForm()}>
              <Plus size={16} className="mr-2" />
              Add Period
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAppt ? 'Edit Appointment Period' : 'Add Appointment Period'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="NYC - Monolith"
                  required
                />
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
                  {editingAppt ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : !appointments || appointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No NYC appointment periods added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  !appt.is_active ? 'opacity-50' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <Calendar size={12} />
                    <span>
                      {format(parseISO(appt.start_date), 'MMM d')} - {format(parseISO(appt.end_date), 'MMM d, yyyy')}
                    </span>
                    {!appt.is_active && (
                      <span className="text-yellow-500">(Inactive)</span>
                    )}
                  </div>
                  <h4 className="font-medium">{appt.label}</h4>
                  {appt.description && (
                    <p className="text-muted-foreground text-sm">{appt.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(appt)}>
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(appt.id)}
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

export default NYCAppointmentsManager;
