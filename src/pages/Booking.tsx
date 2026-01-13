import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, MapPin, Calendar, RotateCcw, CheckCircle, Mail, Clock, ArrowLeft, Phone } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { trackMetaEvent } from '@/components/MetaPixel';
import { format } from 'date-fns';

interface GuestSpot {
  id: string;
  studio_name: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  description: string | null;
}

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  locationType: 'nyc' | 'traveler' | 'guest_spot' | null;
  guestSpotId: string | null;
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

const STORAGE_KEY = 'booking-form-data';
const STORAGE_OPTIONS_KEY = 'booking-form-options';

const getInitialFormData = (): FormData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading saved form data:', e);
  }
  return {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    locationType: null,
    guestSpotId: null,
    collectorType: null,
    tattooPlacement: '',
    tattooSize: '',
    portfolioFavorites: '',
    artistInspiration: '',
    story: '',
    preferredDate: '',
    additionalNotes: '',
  };
};

const getInitialOptions = () => {
  try {
    const saved = localStorage.getItem(STORAGE_OPTIONS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading saved options:', e);
  }
  return { answerLater: false, placementUndecided: false, sizeUndecided: false };
};

const Booking: React.FC = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const placementFileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [placementPhotos, setPlacementPhotos] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState<FormData>(getInitialFormData);
  const [showRestoredNotice, setShowRestoredNotice] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  
  const initialOptions = getInitialOptions();
  const [answerLater, setAnswerLater] = useState(initialOptions.answerLater);
  const [placementUndecided, setPlacementUndecided] = useState(initialOptions.placementUndecided);
  const [sizeUndecided, setSizeUndecided] = useState(initialOptions.sizeUndecided || false);

  // Check if form was restored from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const hasData = Object.values(parsed).some(v => v !== '' && v !== null);
      if (hasData) {
        setShowRestoredNotice(true);
        setTimeout(() => setShowRestoredNotice(false), 5000);
      }
    }
  }, []);

  // Save form data to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Save options to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_OPTIONS_KEY, JSON.stringify({ 
      answerLater, 
      placementUndecided,
      sizeUndecided 
    }));
  }, [answerLater, placementUndecided, sizeUndecided]);

  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_OPTIONS_KEY);
  };

  const { data: guestSpots } = useQuery({
    queryKey: ['booking-guest-spots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guest_spots')
        .select('*')
        .gte('end_date', new Date().toISOString().split('T')[0])
        .eq('is_active', true)
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data as GuestSpot[];
    },
  });

  // Pre-select guest spot from URL parameter
  useEffect(() => {
    const guestSpotId = searchParams.get('guest_spot');
    if (guestSpotId && guestSpots?.some(spot => spot.id === guestSpotId)) {
      setFormData(prev => ({
        ...prev,
        locationType: 'guest_spot',
        guestSpotId: guestSpotId,
      }));
    }
  }, [searchParams, guestSpots]);

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
          title: "Upload Failed",
          description: `Failed to upload ${file.name}`,
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

    // Find guest spot name if selected
    const selectedGuestSpot = guestSpots?.find(spot => spot.id === formData.guestSpotId);
    const guestSpotName = selectedGuestSpot 
      ? `${selectedGuestSpot.studio_name} - ${selectedGuestSpot.city}, ${selectedGuestSpot.country}`
      : undefined;

    try {
      const { error } = await supabase.functions.invoke('send-booking-email', {
        body: {
          ...formData,
          guestSpotName,
          referenceImages: referenceImageUrls,
          placementImages: placementImageUrls,
        },
      });

      if (error) throw error;

      // Track conversion event
      trackMetaEvent('Lead', {
        content_name: 'Tattoo Booking Request',
        content_category: formData.locationType === 'guest_spot' ? 'Guest Spot' : 'NYC Studio',
      });

      // Store email for success page
      setSubmittedEmail(formData.email);

      // Clear saved data and reset form
      clearSavedData();
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        location: '',
        locationType: null,
        guestSpotId: null,
        collectorType: null,
        tattooPlacement: '',
        tattooSize: '',
        portfolioFavorites: '',
        artistInspiration: '',
        story: '',
        preferredDate: '',
        additionalNotes: '',
      });
      setUploadedFiles([]);
      setPlacementPhotos([]);
      setAnswerLater(false);
      setPlacementUndecided(false);
      setSizeUndecided(false);
      
      // Show success page
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          Click to upload or drag and drop
        </p>
        <p className="text-[#1a1a1a]/40 text-xs mt-1">
          PNG, JPG, WEBP up to 20MB
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
                  alt={`Image ${index + 1}`}
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
    <>
      <SEOHead
        title="Book a Tattoo Session | Okan Uckun NYC"
        description="Book your tattoo session with Okan Uckun in New York City. Fill out the form to start your journey with a renowned black and grey realism artist."
        keywords="book tattoo NYC, tattoo appointment, tattoo consultation, Okan Uckun booking, NYC tattoo session"
        canonical="/booking"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#e8e8e8]"
      >
      <Navigation variant="dark" />
      
      <main className="relative z-10 pt-40 md:pt-48 pb-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Success State */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-8 bg-[#1a1a1a] rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-6"
              >
                Request Received
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-[#1a1a1a]/70 mb-12 max-w-md mx-auto"
              >
                Thank you for reaching out. Your booking request has been successfully submitted.
              </motion.p>

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
              >
                <div className="bg-white p-6 border border-[#1a1a1a]/10">
                  <Mail className="w-6 h-6 text-[#1a1a1a]/60 mx-auto mb-3" />
                  <h3 className="font-medium text-[#1a1a1a] mb-2">Check Your Email</h3>
                  <p className="text-sm text-[#1a1a1a]/60">
                    A confirmation has been sent to<br />
                    <span className="font-medium text-[#1a1a1a]">{submittedEmail}</span>
                  </p>
                </div>

                <div className="bg-white p-6 border border-[#1a1a1a]/10">
                  <Clock className="w-6 h-6 text-[#1a1a1a]/60 mx-auto mb-3" />
                  <h3 className="font-medium text-[#1a1a1a] mb-2">Response Time</h3>
                  <p className="text-sm text-[#1a1a1a]/60">
                    We typically respond within<br />
                    <span className="font-medium text-[#1a1a1a]">24-48 hours</span>
                  </p>
                </div>
              </motion.div>

              {/* What's Next */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-[#1a1a1a]/5 p-6 mb-6 text-left"
              >
                <h3 className="font-medium text-[#1a1a1a] mb-4">What happens next?</h3>
                <ol className="space-y-3 text-sm text-[#1a1a1a]/70">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span>We'll review your request and design ideas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center text-xs">2</span>
                    <span>You'll receive an email with availability and pricing details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center text-xs">3</span>
                    <span>Once confirmed, we'll schedule your session</span>
                  </li>
                </ol>
              </motion.div>

              {/* Contact Fallback */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="bg-white p-6 mb-12 border border-[#1a1a1a]/10"
              >
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#1a1a1a]/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#1a1a1a]/70 mb-2">
                      If you don't hear back from us within 3 days, feel free to reach out directly:
                    </p>
                    <a
                      href="tel:+16167777073"
                      className="text-[#1a1a1a] font-medium hover:underline"
                    >
                      +1 (616) 777-7073
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white text-sm hover:bg-[#1a1a1a]/90 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </a>
                <a
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors"
                >
                  View Portfolio
                </a>
              </motion.div>
            </motion.div>
          ) : (
            <>
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

          {/* Restored Notice */}
          {showRestoredNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-[#1a1a1a]/60" />
                <p className="text-sm text-[#1a1a1a]/80">
                  Your previous progress has been restored.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearSavedData();
                  setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    location: '',
                    locationType: null,
                    guestSpotId: null,
                    collectorType: null,
                    tattooPlacement: '',
                    tattooSize: '',
                    portfolioFavorites: '',
                    artistInspiration: '',
                    story: '',
                    preferredDate: '',
                    additionalNotes: '',
                  });
                  setAnswerLater(false);
                  setPlacementUndecided(false);
                  setSizeUndecided(false);
                  setShowRestoredNotice(false);
                }}
                className="text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] underline"
              >
                Start fresh
              </button>
            </motion.div>
          )}

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
                    General Information
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
                      placeholder="Enter your name"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Last Name*</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Phone*</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Email*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
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
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Location Type */}
                <div className="mt-8">
                  <label className="block text-[#1a1a1a] text-sm mb-4">
                    Where would you like to get tattooed?*
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {/* NYC - Monolith Studio */}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, locationType: 'nyc', guestSpotId: null }))}
                      className={`px-6 py-2.5 text-sm border transition-all ${
                        formData.locationType === 'nyc'
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      NYC - Monolith Studio
                    </button>
                    
                    {/* Guest Spot Button */}
                    {guestSpots && guestSpots.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, locationType: 'guest_spot', guestSpotId: null }))}
                        className={`px-6 py-2.5 text-sm border transition-all ${
                          formData.locationType === 'guest_spot'
                            ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                            : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                        }`}
                      >
                        Guest Spot Location
                      </button>
                    )}
                  </div>

                  {/* Guest Spot Selection */}
                  {formData.locationType === 'guest_spot' && guestSpots && guestSpots.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-[#1a1a1a]/60 text-sm">Select your preferred guest spot location:</p>
                      {guestSpots.map((spot) => (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, guestSpotId: spot.id }))}
                          className={`w-full text-left px-4 py-2.5 border transition-all ${
                            formData.guestSpotId === spot.id
                              ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                              : 'bg-white text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{spot.studio_name}</div>
                              <div className="flex items-center gap-1 text-xs opacity-70">
                                <MapPin size={10} />
                                <span>{spot.city}, {spot.country}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs opacity-70">
                              <Calendar size={10} />
                              <span>
                                {format(new Date(spot.start_date), 'MMM d')} - {format(new Date(spot.end_date), 'MMM d')}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                      <p className="text-sm text-[#1a1a1a]/60 italic">
                        Spots are quite limited, early booking is recommended.
                      </p>
                    </div>
                  )}
                </div>

                {/* Collector Type */}
                <div className="mt-8">
                  <label className="block text-[#1a1a1a] text-sm mb-4">
                    Are you a new or returning collector?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('collectorType', 'new')}
                      className={`px-6 py-2.5 text-sm border transition-all ${
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
                      className={`px-6 py-2.5 text-sm border transition-all ${
                        formData.collectorType === 'returning'
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      Returning Collector
                    </button>
                  </div>
                </div>
              </div>

              {/* Answer Later Option */}
              <div className="bg-white/50 border border-[#1a1a1a]/10 p-6">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={answerLater}
                    onChange={(e) => setAnswerLater(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#1a1a1a]"
                  />
                  <div>
                    <span className="text-[#1a1a1a] text-sm font-medium">
                      I would like to answer the following questions later
                    </span>
                    <p className="text-[#1a1a1a]/60 text-sm mt-2">
                      We will receive your appointment request with your general information and start the process. The remaining questions will be sent to you via email to complete at your convenience.
                    </p>
                  </div>
                </label>
              </div>

              {/* Placement Section */}
              {!answerLater && (
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Placement
                  </h2>
                </div>

                <p className="text-[#1a1a1a]/80 mb-6 leading-relaxed text-sm">
                  Share photos of your chosen tattoo placement, marked with a pen. Photos from multiple angles will help me determine the perfect design.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Placement area</label>
                    <input
                      type="text"
                      value={formData.tattooPlacement}
                      onChange={(e) => handleInputChange('tattooPlacement', e.target.value)}
                      placeholder="e.g., forearm, back, chest"
                      disabled={placementUndecided}
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Approximate size</label>
                    <input
                      type="text"
                      value={formData.tattooSize}
                      onChange={(e) => handleInputChange('tattooSize', e.target.value)}
                      placeholder="e.g., 10cm x 15cm"
                      disabled={placementUndecided}
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer mb-6">
                  <input
                    type="checkbox"
                    checked={placementUndecided}
                    onChange={(e) => {
                      setPlacementUndecided(e.target.checked);
                      if (e.target.checked) {
                        handleInputChange('tattooPlacement', '');
                        handleInputChange('tattooSize', '');
                      }
                    }}
                    className="w-4 h-4 accent-[#1a1a1a]"
                  />
                  <span className="text-[#1a1a1a]/70 text-sm">I haven't decided yet</span>
                </label>

                <FileUploadArea
                  inputRef={placementFileInputRef}
                  onFileSelect={handlePlacementFileSelect}
                  files={placementPhotos}
                  setFiles={setPlacementPhotos}
                  label="Placement photos"
                  description="Upload pen-marked photos from multiple angles"
                />
              </div>
              )}

              {/* Inspiration Section */}
              {!answerLater && (
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Inspiration
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Portfolio Favorites */}
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Inspire with your favorites</label>
                    <p className="text-[#1a1a1a]/60 text-sm mb-4">
                      Identify your preferred works from my portfolio and highlight specific elements you want to include. Feel free to mention aspects you want to avoid.
                    </p>
                    <textarea
                      rows={3}
                      value={formData.portfolioFavorites}
                      onChange={(e) => handleInputChange('portfolioFavorites', e.target.value)}
                      placeholder="Describe your favorite pieces from the portfolio and why you like them..."
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Artist Inspiration */}
                  <div>
                    <label className="block text-[#1a1a1a] text-sm mb-2">Expand the inspiration</label>
                    <p className="text-[#1a1a1a]/60 text-sm mb-4">
                      Showcase your aesthetic vision by sharing works from other artists you admire (painters, sculptors, architects, musicians, or directors). This diverse perspective will create a design unique to you.
                    </p>
                    <textarea
                      rows={3}
                      value={formData.artistInspiration}
                      onChange={(e) => handleInputChange('artistInspiration', e.target.value)}
                      placeholder="Artists, works, or aesthetic styles you admire..."
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Reference Images */}
                  <FileUploadArea
                    inputRef={fileInputRef}
                    onFileSelect={handleFileSelect}
                    files={uploadedFiles}
                    setFiles={setUploadedFiles}
                    label="Reference images"
                    description="Upload images that inspire you (up to 20 files, max 20MB each)"
                  />
                </div>
              </div>
              )}

              {/* Story Section */}
              {!answerLater && (
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Reveal the story
                  </h2>
                </div>

                <p className="text-[#1a1a1a]/60 text-sm mb-4">
                  If there is a story behind your tattoo, please share it. Whether it is a narrative woven into the design or a purely aesthetic choice, every detail adds depth. The tattoo does not have to have a story; sometimes the story you tell can even help determine line lengths. Or we can proceed with the process purely aesthetically, through the forms you like.
                </p>

                <textarea
                  rows={4}
                  value={formData.story}
                  onChange={(e) => handleInputChange('story', e.target.value)}
                  placeholder="Share the story behind your tattoo or your aesthetic vision..."
                  className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                />
              </div>
              )}

              {/* Scheduling */}
              {!answerLater && (
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-[#1a1a1a]/20 pb-4">
                  <h2 className="text-[#1a1a1a]/60 text-sm uppercase tracking-wider">
                    Scheduling
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
                      className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-[#1a1a1a] text-sm mb-2">Additional notes</label>
                  <textarea
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Any other information you would like to share..."
                    className="w-full bg-white border border-[#1a1a1a]/20 px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                  />
                </div>
              </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-12 py-3.5 bg-[#1a1a1a] text-white uppercase tracking-wider text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </motion.button>
            </form>
          </motion.div>
            </>
          )}
        </div>
      </main>

      <Footer />
      </motion.div>
    </>
  );
};

export default Booking;
