import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  needsRecommendation: boolean | null;
  tattooPlacement: string;
  tattooSize: string;
  description: string;
  referenceImages: string;
  preferredDate: string;
  additionalNotes: string;
};

const Booking: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    needsRecommendation: null,
    tattooPlacement: '',
    tattooSize: '',
    description: '',
    referenceImages: '',
    preferredDate: '',
    additionalNotes: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement email sending with Resend API
    // For now, just show a success message
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

                {/* Artist Recommendation */}
                <div className="mb-8">
                  <label className="block text-[#1a1a1a] text-sm mb-4">
                    Do you need artist recommendation?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('needsRecommendation', true)}
                      className={`px-8 py-3 border transition-all ${
                        formData.needsRecommendation === true
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('needsRecommendation', false)}
                      className={`px-8 py-3 border transition-all ${
                        formData.needsRecommendation === false
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                      }`}
                    >
                      No
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

                <div className="mt-6">
                  <label className="block text-[#1a1a1a] text-sm mb-2">Reference images (URL links)</label>
                  <textarea
                    rows={3}
                    value={formData.referenceImages}
                    onChange={(e) => handleInputChange('referenceImages', e.target.value)}
                    placeholder="Paste links to reference images (Pinterest, Instagram, etc.)"
                    className="w-full bg-white border border-[#1a1a1a]/20 px-4 py-4 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a]/60 transition-colors resize-none"
                  />
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
