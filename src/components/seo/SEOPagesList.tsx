import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Edit,
  Trash2,
  FileText,
  Image as ImageIcon,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { SEOPage, calculateSEOScore } from '@/hooks/useSEO';

interface SEOPagesListProps {
  pages: SEOPage[];
  loading: boolean;
  onEdit: (page: SEOPage) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onBulkAction: (action: string, pageIds: string[]) => void;
}

const templateLabels: Record<string, string> = {
  home: 'Ana Sayfa',
  blog_post: 'Blog Yazısı',
  blog_list: 'Blog Listesi',
  project: 'Proje',
  work: 'Çalışmalar',
  about: 'Hakkında',
  booking: 'Randevu',
  page: 'Sayfa',
  other: 'Diğer',
};

export const SEOPagesList: React.FC<SEOPagesListProps> = ({
  pages,
  loading,
  onEdit,
  onDelete,
  onAdd,
  onBulkAction,
}) => {
  const [search, setSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState<string>('all');
  const [indexFilter, setIndexFilter] = useState<string>('all');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  const filteredPages = useMemo(() => {
    return pages.filter(page => {
      const matchesSearch = 
        page.route.toLowerCase().includes(search.toLowerCase()) ||
        (page.meta_title?.toLowerCase().includes(search.toLowerCase()) || false);
      
      const matchesTemplate = templateFilter === 'all' || page.template_type === templateFilter;
      const matchesIndex = indexFilter === 'all' || 
        (indexFilter === 'index' && page.is_indexable) ||
        (indexFilter === 'noindex' && !page.is_indexable);

      return matchesSearch && matchesTemplate && matchesIndex;
    });
  }, [pages, search, templateFilter, indexFilter]);

  const togglePageSelection = (id: string) => {
    setSelectedPages(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleAllPages = () => {
    if (selectedPages.length === filteredPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(filteredPages.map(p => p.id));
    }
  };

  const exportCSV = () => {
    const headers = ['URL', 'Şablon', 'Başlık', 'Açıklama', 'Index', 'Schema', 'SEO Skoru'];
    const rows = filteredPages.map(p => [
      p.route,
      templateLabels[p.template_type] || p.template_type,
      p.meta_title || '',
      p.meta_description || '',
      p.is_indexable ? 'index' : 'noindex',
      p.schema_types.join(', '),
      `${calculateSEOScore(p)}%`,
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-pages.csv';
    a.click();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="URL veya başlık ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-64"
            />
          </div>

          <Select value={templateFilter} onValueChange={setTemplateFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Şablon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Şablonlar</SelectItem>
              {Object.entries(templateLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={indexFilter} onValueChange={setIndexFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Index" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="index">Index</SelectItem>
              <SelectItem value="noindex">Noindex</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {selectedPages.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Toplu İşlem ({selectedPages.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onBulkAction('noindex', selectedPages)}>
                  Noindex Yap
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkAction('index', selectedPages)}>
                  Index Yap
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkAction('canonical-auto', selectedPages)}>
                  Canonical: Auto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>

          <Button size="sm" onClick={onAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Sayfa Ekle
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedPages.length === filteredPages.length && filteredPages.length > 0}
                  onCheckedChange={toggleAllPages}
                />
              </TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Şablon</TableHead>
              <TableHead>Index</TableHead>
              <TableHead>Başlık</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Schema</TableHead>
              <TableHead>OG</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead className="w-24">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.map((page) => {
              const score = calculateSEOScore(page);
              const titleLength = page.meta_title?.length || 0;
              const descLength = page.meta_description?.length || 0;

              return (
                <TableRow key={page.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPages.includes(page.id)}
                      onCheckedChange={() => togglePageSelection(page.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-0.5 rounded">
                        {page.route}
                      </code>
                      <a 
                        href={page.route} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {templateLabels[page.template_type] || page.template_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {page.is_indexable ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48 truncate" title={page.meta_title || ''}>
                      {page.meta_title || (
                        <span className="text-muted-foreground italic">Eksik</span>
                      )}
                    </div>
                    <span className={`text-xs ${titleLength > 60 ? 'text-red-500' : titleLength < 30 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {titleLength}/60
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48 truncate" title={page.meta_description || ''}>
                      {page.meta_description ? (
                        <span className="text-sm">{page.meta_description}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Eksik</span>
                      )}
                    </div>
                    <span className={`text-xs ${descLength > 160 ? 'text-red-500' : descLength < 70 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {descLength}/160
                    </span>
                  </TableCell>
                  <TableCell>
                    {page.schema_types.length > 0 ? (
                      <div className="flex items-center gap-1">
                        <Code className="w-4 h-4 text-green-600" />
                        <span className="text-xs">{page.schema_types.length}</span>
                      </div>
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    {page.og_image ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getScoreColor(score)}>
                      {score}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(page)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onDelete(page.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Sayfa bulunamadı
        </div>
      )}
    </div>
  );
};
