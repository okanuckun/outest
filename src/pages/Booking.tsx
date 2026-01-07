import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

declare global {
  interface Window {
    StewartForm?: {
      init: (config: { studioId: string; container: string; theme: string }) => void;
    };
  }
}

const Booking: React.FC = () => {
  useEffect(() => {
    // Load the external script
    const script = document.createElement('script');
    script.src = 'https://inksync.studio/embed/form.js';
    script.async = true;
    script.onload = () => {
      // Initialize the form after script loads
      if (window.StewartForm) {
        window.StewartForm.init({
          studioId: '68b2bf44-dc9f-4e0b-8f06-43d36ccd10f1',
          container: '#stewart-studio-booking',
          theme: 'dark'
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Book an Appointment
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to bring your vision to life? Fill out the form below to request a consultation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div id="stewart-studio-booking" className="min-h-[600px]" />
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Booking;
