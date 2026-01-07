import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Download, Upload, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SEORedirect } from '@/hooks/useSEO';

interface SEORedirectsProps {
  redirects: SEORedirect[];
  loading: boolean;
  onCreate: (redirect: Partial<SEORedirect>) => Promise<boolean>;
  onUpdate: (id: string, redirect: Partial<SEORedirect>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export const SEORedirects: React.FC<SEORedirectsProps> = ({
  redirects,
  loading,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRedirect, setEditingRedirect] = useState<Partial<SEORedirect> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNewDialog = () => {
    setEditingRedirect({
      source_path: '',
      target_path: '',
      redirect_type: 301,
      is_active: true,
      notes: '',
    });
    setIsNew(true);
    setIsDialogOpen(true);
  };

  const openEditDialog = (redirect: SEORedirect) => {
    setEditingRedirect(redirect);
    setIsNew(false);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingRedirect) return;

    if (isNew) {
      await onCreate(editingRedirect);
    } else {
      await onUpdate(editingRedirect.id!, editingRedirect);
    }
    setIsDialogOpen(false);
    setEditingRedirect(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu yönlendirmeyi silmek istediğinize emin misiniz?')) {
      await onDelete(id);
    }
  };

  const exportCSV = () => {
    const headers = ['Kaynak', 'Hedef', 'Tip', 'Aktif', 'Hit', 'Notlar'];
    const rows = redirects.map(r => [
      r.source_path,
      r.target_path,
      r.redirect_type.toString(),
      r.is_active ? 'Evet' : 'Hayır',
      r.hit_count.toString(),
      r.notes || '',
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'redirects.csv';
    a.click();
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Yönlendirmeler</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button size="sm" onClick={openNewDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Yönlendirme
          </Button>
        </div>
      </div>

      {/* Redirects Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kaynak</TableHead>
              <TableHead>Hedef</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>Aktif</TableHead>
              <TableHead>Hit</TableHead>
              <TableHead>Notlar</TableHead>
              <TableHead className="w-24">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {redirects.map((redirect) => (
              <TableRow key={redirect.id}>
                <TableCell>
                  <code className="text-sm bg-muted px-2 py-0.5 rounded">
                    {redirect.source_path}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-0.5 rounded">
                      {redirect.target_path}
                    </code>
                    <a 
                      href={redirect.target_path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={redirect.redirect_type === 301 ? 'default' : 'secondary'}>
                    {redirect.redirect_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={redirect.is_active}
                    onCheckedChange={(checked) => onUpdate(redirect.id, { is_active: checked })}
                  />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{redirect.hit_count}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground truncate max-w-32 block">
                    {redirect.notes || '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(redirect)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(redirect.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {redirects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Henüz yönlendirme yok
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isNew ? 'Yeni Yönlendirme' : 'Yönlendirme Düzenle'}
            </DialogTitle>
          </DialogHeader>

          {editingRedirect && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Kaynak Yol</Label>
                <Input
                  value={editingRedirect.source_path || ''}
                  onChange={(e) => setEditingRedirect({ ...editingRedirect, source_path: e.target.value })}
                  placeholder="/eski-sayfa"
                />
              </div>

              <div className="space-y-2">
                <Label>Hedef Yol</Label>
                <Input
                  value={editingRedirect.target_path || ''}
                  onChange={(e) => setEditingRedirect({ ...editingRedirect, target_path: e.target.value })}
                  placeholder="/yeni-sayfa"
                />
              </div>

              <div className="space-y-2">
                <Label>Yönlendirme Tipi</Label>
                <Select
                  value={editingRedirect.redirect_type?.toString()}
                  onValueChange={(v) => setEditingRedirect({ ...editingRedirect, redirect_type: parseInt(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="301">301 (Kalıcı)</SelectItem>
                    <SelectItem value="302">302 (Geçici)</SelectItem>
                    <SelectItem value="307">307 (Geçici - POST korunur)</SelectItem>
                    <SelectItem value="308">308 (Kalıcı - POST korunur)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notlar</Label>
                <Input
                  value={editingRedirect.notes || ''}
                  onChange={(e) => setEditingRedirect({ ...editingRedirect, notes: e.target.value })}
                  placeholder="İsteğe bağlı not"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Aktif</Label>
                </div>
                <Switch
                  checked={editingRedirect.is_active}
                  onCheckedChange={(v) => setEditingRedirect({ ...editingRedirect, is_active: v })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Kaydet
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
