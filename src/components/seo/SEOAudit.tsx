import React from 'react';
import { 
  RefreshCw, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle,
  ExternalLink,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SEOAuditIssue, SEOPage } from '@/hooks/useSEO';

interface SEOAuditProps {
  issues: SEOAuditIssue[];
  pages: SEOPage[];
  loading: boolean;
  onRunAudit: (pages: SEOPage[]) => void;
  onResolve: (id: string) => void;
  onQuickFix: (issue: SEOAuditIssue) => void;
}

const severityConfig = {
  critical: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Kritik' },
  high: { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Yüksek' },
  medium: { icon: Info, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Orta' },
  low: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Düşük' },
};

const categoryLabels: Record<string, string> = {
  metadata: 'Meta Veriler',
  indexability: 'İndekslenebilirlik',
  social: 'Sosyal Medya',
  headings: 'Başlıklar',
  schema: 'Structured Data',
  images: 'Görseller',
  links: 'Bağlantılar',
};

const issueExplanations: Record<string, string> = {
  missing_title: 'Meta başlık, arama motorlarının sayfanızı anlaması için kritik öneme sahiptir. Başlıksız sayfalar düşük sıralama alır.',
  short_title: 'Çok kısa başlıklar, sayfanın içeriğini yeterince açıklamaz ve tıklama oranını düşürür.',
  long_title: 'Uzun başlıklar arama sonuçlarında kesilir. 60 karakterin altında tutun.',
  missing_description: 'Meta açıklama, arama sonuçlarında gösterilen snippet\'tir. Eksikliği tıklama oranını düşürür.',
  short_description: 'Kısa açıklamalar, sayfanın değerini yeterince iletmez.',
  long_description: 'Uzun açıklamalar kesilir. 160 karakterin altında tutun.',
  missing_og_image: 'OG görseli olmadan sosyal medya paylaşımlarınız dikkat çekmez.',
  missing_h1: 'H1 başlığı, sayfanın ana konusunu belirtir. SEO için çok önemlidir.',
  important_noindex: 'Önemli bir sayfa noindex olarak işaretli. Arama motorları bu sayfayı indekslemeyecek.',
  missing_schema: 'Structured data, arama motorlarının içeriğinizi daha iyi anlamasını sağlar.',
  duplicate_title: 'Aynı başlığa sahip birden fazla sayfa, arama motorlarını karıştırır.',
};

export const SEOAudit: React.FC<SEOAuditProps> = ({
  issues,
  pages,
  loading,
  onRunAudit,
  onResolve,
  onQuickFix,
}) => {
  const groupedIssues = issues.reduce((acc, issue) => {
    if (!acc[issue.severity]) acc[issue.severity] = [];
    acc[issue.severity].push(issue);
    return acc;
  }, {} as Record<string, SEOAuditIssue[]>);

  const severityOrder = ['critical', 'high', 'medium', 'low'];

  const issueStats = {
    total: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length,
    high: issues.filter(i => i.severity === 'high').length,
    medium: issues.filter(i => i.severity === 'medium').length,
    low: issues.filter(i => i.severity === 'low').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Teknik SEO Denetimi</h2>
        <Button onClick={() => onRunAudit(pages)} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Denetleniyor...' : 'Denetim Başlat'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Toplam Sorun</CardDescription>
            <CardTitle className="text-2xl">{issueStats.total}</CardTitle>
          </CardHeader>
        </Card>
        {severityOrder.map(severity => {
          const config = severityConfig[severity as keyof typeof severityConfig];
          const count = issueStats[severity as keyof typeof issueStats];
          return (
            <Card key={severity}>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1">
                  <config.icon className={`w-4 h-4 ${config.color}`} />
                  {config.label}
                </CardDescription>
                <CardTitle className="text-2xl">{count}</CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Issues List */}
      {issues.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="font-medium mb-2">Harika! Sorun bulunamadı</h3>
            <p className="text-muted-foreground text-sm">
              SEO denetimi tamamlandı ve herhangi bir sorun tespit edilmedi.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-2">
          {severityOrder.map(severity => {
            const severityIssues = groupedIssues[severity];
            if (!severityIssues || severityIssues.length === 0) return null;

            const config = severityConfig[severity as keyof typeof severityConfig];
            const Icon = config.icon;

            return (
              <AccordionItem key={severity} value={severity} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Badge className={`${config.bg} ${config.color} border-0`}>
                      <Icon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                    <span className="font-medium">{severityIssues.length} sorun</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {severityIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="border border-border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">
                                {categoryLabels[issue.category] || issue.category}
                              </Badge>
                              {issue.route && (
                                <a 
                                  href={issue.route} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                >
                                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                                    {issue.route}
                                  </code>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            <p className="font-medium">{issue.message}</p>
                            {issueExplanations[issue.issue_type] && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {issueExplanations[issue.issue_type]}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onQuickFix(issue)}
                            >
                              <Wrench className="w-4 h-4 mr-1" />
                              Düzelt
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onResolve(issue.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Çözüldü
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};
