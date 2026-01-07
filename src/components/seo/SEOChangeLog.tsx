import React, { useState } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { RotateCcw, Filter, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { SEOChangeLog as ChangeLogType } from '@/hooks/useSEO';

interface SEOChangeLogProps {
  logs: ChangeLogType[];
  loading: boolean;
  onRevert: (log: ChangeLogType) => Promise<boolean>;
  onFilter: (filters: { entityType?: string; entityId?: string }) => void;
}

const entityTypeLabels: Record<string, string> = {
  page: 'Sayfa',
  global: 'Global Ayarlar',
  redirect: 'Yönlendirme',
};

export const SEOChangeLog: React.FC<SEOChangeLogProps> = ({
  logs,
  loading,
  onRevert,
  onFilter,
}) => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [expandedLogs, setExpandedLogs] = useState<string[]>([]);

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    onFilter({ entityType: value === 'all' ? undefined : value });
  };

  const toggleExpanded = (id: string) => {
    setExpandedLogs(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const handleRevert = async (log: ChangeLogType) => {
    if (confirm('Bu değişikliği geri almak istediğinize emin misiniz?')) {
      await onRevert(log);
    }
  };

  const formatValue = (value: string | null): string => {
    if (!value) return '(boş)';
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'boolean') return parsed ? 'Evet' : 'Hayır';
      if (Array.isArray(parsed)) return parsed.join(', ') || '(boş dizi)';
      if (typeof parsed === 'object') return JSON.stringify(parsed, null, 2);
      return String(parsed);
    } catch {
      return value;
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Değişiklik Geçmişi</h2>
        <Select value={typeFilter} onValueChange={handleTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filtre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="page">Sayfalar</SelectItem>
            <SelectItem value="global">Global Ayarlar</SelectItem>
            <SelectItem value="redirect">Yönlendirmeler</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>Sayfa/Yol</TableHead>
              <TableHead>Alan</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="w-24">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => {
              const isExpanded = expandedLogs.includes(log.id);
              
              return (
                <React.Fragment key={log.id}>
                  <TableRow className={log.is_reverted ? 'opacity-50' : ''}>
                    <TableCell>
                      <button
                        onClick={() => toggleExpanded(log.id)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {format(new Date(log.changed_at), 'dd MMM yyyy HH:mm', { locale: tr })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {entityTypeLabels[log.entity_type] || log.entity_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {log.entity_route ? (
                        <code className="text-sm bg-muted px-2 py-0.5 rounded">
                          {log.entity_route}
                        </code>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="text-sm">{log.field_name}</code>
                    </TableCell>
                    <TableCell>
                      {log.is_reverted ? (
                        <Badge variant="secondary">Geri Alındı</Badge>
                      ) : (
                        <Badge variant="default">Aktif</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {!log.is_reverted && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevert(log)}
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Geri Al
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/50 p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-red-600">Eski Değer</h4>
                            <pre className="text-xs bg-red-50 border border-red-200 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                              {formatValue(log.old_value)}
                            </pre>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-green-600">Yeni Değer</h4>
                            <pre className="text-xs bg-green-50 border border-green-200 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                              {formatValue(log.new_value)}
                            </pre>
                          </div>
                        </div>
                        {log.is_reverted && log.reverted_at && (
                          <p className="text-xs text-muted-foreground mt-3">
                            Geri alınma tarihi: {format(new Date(log.reverted_at), 'dd MMM yyyy HH:mm', { locale: tr })}
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {logs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Henüz değişiklik kaydı yok
        </div>
      )}
    </div>
  );
};
