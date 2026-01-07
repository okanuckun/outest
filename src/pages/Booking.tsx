import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
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
  collectorType: 'new' | 'returning' | null;
  tattooPlacement: string;
  tattooSize: string;
  description: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    collectorType: null,
    tattooPlacement: '',
    tattooSize: '',
    description: '',
    preferredDate: '',
    additionalNotes: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean | 'new' | 'returning' | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Upload each file to Supabase Storage
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i].file;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      try {
        const { data, error } = await supabase.storage
          .from('booking-references')
          .upload(fileName, file);

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('booking-references')
          .getPublicUrl(fileName);

        setUploadedFiles(prev =>
          prev.map((f, idx) =>
            f.preview === newFiles[i].preview
              ? { ...f, uploading: false, url: urlData.publicUrl }
              : f
          )
        );
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
        setUploadedFiles(prev =>
          prev.filter(f => f.preview !== newFiles[i].preview)
        );
      }
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (preview: string) => {
    setUploadedFiles(prev => {
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

    // TODO: Implement email sending with Resend API
    // For now, just show a success message
    console.log('Form data:', { ...formData, referenceImages: referenceImageUrls });
    
    setTimeout(() => {
      toast({
        title: "Request Submitted",
        description: "We'll get back to you within 24-48 hours.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

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
              Book
              <br />
              <span className="text-[#1a1a1a]">Experience</span>
            </h1>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl"
          >
            <p className="text-[#1a1a1a] text-lg mb-12">
              We're excited to learn more about your tattoo.
            </p>

            <form onSubmit={handleSubmit} className="space-y-16">
              {/* General Information */}
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    General information
                  </h2>
                  <span className="text-[#1a1a1a]/60 text-sm">*Required</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Name*</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter name"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Last Name*</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Phone number*</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">E-mail address*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter e-mail address"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[#1a1a1a] text-sm mb-2">Where are you located?*</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter city and country"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Tattoo Information */}
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Tattoo information
                  </h2>
                </div>

                {/* Collector Type */}
                <div className="mb-8">
                  <label className="block text-[#1a1a1a] text-sm mb-4">
                    Are you a new or returning collector?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('collectorType', 'new')}
                      className={`px-8 py-3 border transition-all ${
                        formData.collectorType === 'new'
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      New Collector
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
                      Returning Collector
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Tattoo placement*</label>
                    <input
                      type="text"
                      required
                      value={formData.tattooPlacement}
                      onChange={(e) => handleInputChange('tattooPlacement', e.target.value)}
                      placeholder="e.g., forearm, back, chest"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Approximate size*</label>
                    <input
                      type="text"
                      required
                      value={formData.tattooSize}
                      onChange={(e) => handleInputChange('tattooSize', e.target.value)}
                      placeholder="e.g., 10cm x 15cm"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-[#1a1a1a] text-sm mb-2">Describe your tattoo idea*</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us about your vision, style preferences, and any specific elements you'd like to include..."
                    className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                  />
                </div>

                {/* Reference Images Upload */}
                <div className="mt-6">
                  <label className="block text-[#1a1a1a] text-sm mb-2">Reference images</label>
                  <p className="text-[#1a1a1a]/60 text-sm mb-4">
                    Upload up to 20 images (max 20MB each)
                  </p>
                  
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#1a1a1a]/20 hover:border-[#1a1a1a]/40 transition-colors cursor-pointer p-8 text-center"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-3 text-[#1a1a1a]/40" />
                    <p className="text-[#1a1a1a]/60 text-sm">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-[#1a1a1a]/40 text-xs mt-1">
                      PNG, JPG, WEBP up to 20MB
                    </p>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* Uploaded Files Preview */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={file.preview} className="relative group">
                          <div className="aspect-square bg-white border border-[#1a1a1a]/10 overflow-hidden">
                            <img
                              src={file.preview}
                              alt={`Reference ${index + 1}`}
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
                            onClick={() => removeFile(file.preview)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Scheduling preferences
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Preferred date range</label>
                    <input
                      type="text"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      placeholder="e.g., March-April 2025"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-[#1a1a1a] text-sm mb-2">Additional notes</label>
                  <textarea
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Any other information you'd like to share..."
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
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
