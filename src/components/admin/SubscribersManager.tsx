import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Download, Search, Users, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  source: string;
}

const SubscribersManager: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch subscribers',
        variant: 'destructive',
      });
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  };

  const deleteSubscriber = async (id: string) => {
    const { error } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete subscriber',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Subscriber removed' });
      fetchSubscribers();
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Subscribed At', 'Active', 'Source'].join(','),
      ...subscribers.map(sub => [
        sub.email,
        format(new Date(sub.subscribed_at), 'yyyy-MM-dd HH:mm'),
        sub.is_active ? 'Yes' : 'No',
        sub.source || 'popup'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({ title: 'CSV exported successfully' });
  };

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = subscribers.filter(s => s.is_active).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{subscribers.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter(s => {
                const subDate = new Date(s.subscribed_at);
                const now = new Date();
                return subDate.getMonth() === now.getMonth() && 
                       subDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchSubscribers}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCSV} disabled={subscribers.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading subscribers...
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {searchQuery ? 'No subscribers found matching your search.' : 'No subscribers yet.'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(subscriber.subscribed_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {subscriber.source || 'popup'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded ${
                        subscriber.is_active 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {subscriber.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSubscriber(subscriber.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscribersManager;
