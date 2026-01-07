import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  locationType: 'nyc' | 'traveler' | null;
  collectorType: 'new' | 'returning' | null;
  tattooPlacement: string;
  tattooSize: string;
  portfolioFavorites: string;
  artistInspiration: string;
  story: string;
  preferredDate: string;
  additionalNotes: string;
};

type UploadedFile = {
  file: File;
  preview: string;
  uploading: boolean;
  url?: string;
};

const Booking: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const placementFileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [placementPhotos, setPlacementPhotos] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    locationType: null,
    collectorType: null,
    tattooPlacement: '',
    tattooSize: '',
    portfolioFavorites: '',
    artistInspiration: '',
    story: '',
    preferredDate: '',
    additionalNotes: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | 'new' | 'returning' | 'nyc' | 'traveler' | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (
    files: FileList,
    setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i].file;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      try {
        const { error } = await supabase.storage
          .from('booking-references')
          .upload(fileName, file);

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('booking-references')
          .getPublicUrl(fileName);

        setFiles(prev =>
          prev.map((f) =>
            f.preview === newFiles[i].preview
              ? { ...f, uploading: false, url: urlData.publicUrl }
              : f
          )
        );
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Yükleme Başarısız",
          description: `${file.name} yüklenemedi`,
          variant: "destructive",
        });
        setFiles(prev =>
          prev.filter(f => f.preview !== newFiles[i].preview)
        );
      }
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    await handleFileUpload(files, setUploadedFiles, fileInputRef);
  };

  const handlePlacementFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    await handleFileUpload(files, setPlacementPhotos, placementFileInputRef);
  };

  const removeFile = (preview: string, setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.preview === preview);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.preview !== preview);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const referenceImageUrls = uploadedFiles
      .filter(f => f.url)
      .map(f => f.url);

    const placementImageUrls = placementPhotos
      .filter(f => f.url)
      .map(f => f.url);

    console.log('Form data:', { 
      ...formData, 
      referenceImages: referenceImageUrls,
      placementImages: placementImageUrls 
    });
    
    setTimeout(() => {
      toast({
        title: "Başvuru Gönderildi",
        description: "24-48 saat içinde size geri dönüş yapacağız.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const FileUploadArea = ({ 
    inputRef, 
    onFileSelect, 
    files, 
    setFiles,
    label,
    description 
  }: { 
    inputRef: React.RefObject<HTMLInputElement>;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    files: UploadedFile[];
    setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
    label: string;
    description: string;
  }) => (
    <div>
      <label className="block text-[#1a1a1a] text-sm mb-2">{label}</label>
      <p className="text-[#1a1a1a]/60 text-sm mb-4">{description}</p>
      
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-[#1a1a1a]/20 hover:border-[#1a1a1a]/40 transition-colors cursor-pointer p-8 text-center"
      >
        <Upload className="w-8 h-8 mx-auto mb-3 text-[#1a1a1a]/40" />
        <p className="text-[#1a1a1a]/60 text-sm">
          Yüklemek için tıklayın veya sürükleyip bırakın
        </p>
        <p className="text-[#1a1a1a]/40 text-xs mt-1">
          PNG, JPG, WEBP (max 20MB)
        </p>
      </div>
      
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={file.preview} className="relative group">
              <div className="aspect-square bg-white border border-[#1a1a1a]/10 overflow-hidden">
                <img
                  src={file.preview}
                  alt={`Görsel ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {file.uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFile(file.preview, setFiles)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#e8e8e8]"
    >
      <div className="absolute inset-0 z-0">
        <Navigation />
      </div>
      
      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-20"
          >
            <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-[#1a1a1a] leading-[0.9] tracking-[-0.03em] uppercase">
              Randevu
            </h1>
          </motion.div>

          {/* Info Sections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mb-20 space-y-12"
          >
            {/* Gezginler */}
            <div className="border-l-2 border-[#1a1a1a]/20 pl-6">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 uppercase tracking-wide">Gezginler</h2>
              <p className="text-[#1a1a1a]/80 leading-relaxed">
                New York dışından başvurular için lütfen verilen formu doldurun veya aşağıdaki soruları yanıtlayarak bana bir e-posta gönderin.
              </p>
              <p className="text-[#1a1a1a]/60 mt-4 text-sm leading-relaxed">
                Asistanım en kısa sürede sizinle iletişime geçecek ve ihtiyacınız olan tüm bilgileri sağlayacaktır. Yılın bazı dönemlerinde, yoğun iş yükü nedeniyle size geç yanıt verebilir veya hiç yanıt veremeyebiliriz. 3 gün içinde yanıt alamazsanız, lütfen formu veya e-postayı tekrar gönderin.
              </p>
            </div>

            {/* New York */}
            <div className="border-l-2 border-[#1a1a1a]/20 pl-6">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 uppercase tracking-wide">New York Şehri</h2>
              <p className="text-[#1a1a1a]/80 leading-relaxed">
                New York'tan başvuranlar, sizinle şahsen tanışmayı, fikirlerinizi dinlemeyi, çalışma tarzımı anlatmayı ve tasarım sürecini şekillendirmeyi çok isterim. Bundan önce, lütfen verilen formu doldurun veya aşağıdaki soruları yanıtlayarak bir e-posta gönderin. New York'ta yaşıyorsanız, lütfen belirtin ki asistanım sizin için bir görüşme ayarlasın.
              </p>
            </div>

            {/* Tasarım */}
            <div className="border-l-2 border-[#1a1a1a]/20 pl-6">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 uppercase tracking-wide">Tasarım</h2>
              <p className="text-[#1a1a1a]/80 leading-relaxed">
                Randevunuz e-posta ile onaylandıysa, randevu saatinde size en az 5 tasarım sunulacaktır. Bu tasarımların bazıları, e-posta yoluyla sağladığınız referanslardan doğrudan ilham alınarak oluşturulmuştur. Geri kalanlar ise farklı açılardan incelenerek benim tarafımdan hazırlanmıştır.
              </p>
              <p className="text-[#1a1a1a]/60 mt-4 text-sm leading-relaxed">
                Randevu tarihinden önce tasarımları paylaşmıyorum; bu, sizin için benzersiz kompozisyonlar üzerinde çalışabilmem için tüm sürecin gerçekten önemli bir parçasıdır. Randevu tarihinde tasarım hakkında konuşmak ve gerekli değişiklikleri yapmak için yeterli zamanımız olacak. Merak etmeyin.
              </p>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl"
          >
            <form onSubmit={handleSubmit} className="space-y-16">
              {/* General Information */}
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Genel Bilgiler
                  </h2>
                  <span className="text-[#1a1a1a]/60 text-sm">*Zorunlu</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Ad*</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Adınızı girin"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Soyad*</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Soyadınızı girin"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Telefon*</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Telefon numaranızı girin"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">E-posta*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="E-posta adresinizi girin"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[#1a1a1a] text-sm mb-2">Nerede yaşıyorsunuz?*</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Şehir ve ülke girin"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Location Type */}
                <div className="mt-8">
                  <label className="block text-[#1a1a1a] text-sm mb-4">
                    New York'ta mı yaşıyorsunuz?*
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('locationType', 'nyc')}
                      className={`px-8 py-3 border transition-all ${
                        formData.locationType === 'nyc'
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      Evet, New York'ta yaşıyorum
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('locationType', 'traveler')}
                      className={`px-8 py-3 border transition-all ${
                        formData.locationType === 'traveler'
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      Hayır, seyahat edeceğim
                    </button>
                  </div>
                </div>

                {/* Collector Type */}
                <div className="mt-8">
                  <label className="block text-[#1a1a1a] text-sm mb-4">
                    Yeni mi yoksa geri dönen müşteri misiniz?
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('collectorType', 'new')}
                      className={`px-8 py-3 border transition-all ${
                        formData.collectorType === 'new'
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      Yeni Müşteri
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('collectorType', 'returning')}
                      className={`px-8 py-3 border transition-all ${
                        formData.collectorType === 'returning'
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      Geri Dönen Müşteri
                    </button>
                  </div>
                </div>
              </div>

              {/* Placement Section */}
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Yerleşim
                  </h2>
                </div>

                <p className="text-[#1a1a1a]/80 mb-6 leading-relaxed">
                  Seçtiğiniz dövme yerleşiminin, kalemle işaretlenmiş fotoğraflarını paylaşın. Birden fazla açıdan çekilmiş fotoğraflar, mükemmel tasarımı belirlememe yardımcı olacaktır.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Yerleşim bölgesi*</label>
                    <input
                      type="text"
                      required
                      value={formData.tattooPlacement}
                      onChange={(e) => handleInputChange('tattooPlacement', e.target.value)}
                      placeholder="Örn: ön kol, sırt, göğüs"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Yaklaşık boyut*</label>
                    <input
                      type="text"
                      required
                      value={formData.tattooSize}
                      onChange={(e) => handleInputChange('tattooSize', e.target.value)}
                      placeholder="Örn: 10cm x 15cm"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                </div>

                <FileUploadArea
                  inputRef={placementFileInputRef}
                  onFileSelect={handlePlacementFileSelect}
                  files={placementPhotos}
                  setFiles={setPlacementPhotos}
                  label="Yerleşim fotoğrafları"
                  description="Kalemle işaretlenmiş, birden fazla açıdan çekilmiş fotoğraflar yükleyin"
                />
              </div>

              {/* Inspiration Section */}
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    İlham
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Portfolio Favorites */}
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Favorilerinizle İlham Verin</label>
                    <p className="text-[#1a1a1a]/60 text-sm mb-4">
                      Portfolyomdan tercih ettiğiniz eserleri belirtin ve dahil etmek istediğiniz belirli unsurları vurgulayın. Kaçınmak istediğiniz yönleri belirtmekten çekinmeyin.
                    </p>
                    <textarea
                      rows={4}
                      value={formData.portfolioFavorites}
                      onChange={(e) => handleInputChange('portfolioFavorites', e.target.value)}
                      placeholder="Portfolyodan beğendiğiniz eserleri ve nedenlerini açıklayın..."
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Artist Inspiration */}
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">İlhamı Genişletin</label>
                    <p className="text-[#1a1a1a]/60 text-sm mb-4">
                      Beğendiğiniz diğer sanatçıların (ressamlar, heykeltıraşlar, mimarlar, müzisyenler veya yönetmenler) eserlerini sergileyerek estetik vizyonunuzu ortaya koyun. Bu çeşitli bakış açısı, size özgü bir tasarım oluşturacaktır.
                    </p>
                    <textarea
                      rows={4}
                      value={formData.artistInspiration}
                      onChange={(e) => handleInputChange('artistInspiration', e.target.value)}
                      placeholder="Beğendiğiniz sanatçılar, eserler veya estetik tarzlar..."
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Reference Images */}
                  <FileUploadArea
                    inputRef={fileInputRef}
                    onFileSelect={handleFileSelect}
                    files={uploadedFiles}
                    setFiles={setUploadedFiles}
                    label="Referans görselleri"
                    description="İlham aldığınız görselleri yükleyin (20 dosyaya kadar, her biri max 20MB)"
                  />
                </div>
              </div>

              {/* Story Section */}
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Hikayeyi Ortaya Çıkarın
                  </h2>
                </div>

                <p className="text-[#1a1a1a]/60 text-sm mb-4">
                  Dövmenizin arkasında bir hikaye varsa, lütfen paylaşın. Tasarıma işlenmiş bir öykü veya tamamen estetik bir seçim olsun, her detay derinlik katar. Dövmenin bir hikayesi olmak zorunda değil, bazen anlattığınız hikaye çizgi uzunluklarını belirlemeye bile yardımcı olabilir. Ya da süreci tamamen estetik açıdan, beğendiğiniz formlar aracılığıyla sürdürebiliriz.
                </p>

                <textarea
                  rows={6}
                  value={formData.story}
                  onChange={(e) => handleInputChange('story', e.target.value)}
                  placeholder="Dövmenizin arkasındaki hikayeyi veya estetik vizyonunuzu paylaşın..."
                  className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                />
              </div>

              {/* Scheduling */}
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Zamanlama
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Tercih ettiğiniz tarih aralığı</label>
                    <input
                      type="text"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      placeholder="Örn: Mart-Nisan 2025"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-[#1a1a1a] text-sm mb-2">Ek notlar</label>
                  <textarea
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Paylaşmak istediğiniz diğer bilgiler..."
                    className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-16 py-5 bg-[#1a1a1a] text-white uppercase tracking-wider text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Booking;
