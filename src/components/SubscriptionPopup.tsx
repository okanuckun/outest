import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');

const SubscriptionPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed or subscribed
    const dismissed = localStorage.getItem('subscription_popup_dismissed');
    const subscribed = localStorage.getItem('subscription_popup_subscribed');
    
    if (dismissed || subscribed) return;

    // Show popup after 4 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('subscription_popup_dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        if (error.code === '23505') {
          // Duplicate email
          toast({
            title: "Already subscribed",
            description: "This email is already on our list!",
          });
        } else {
          throw error;
        }
      } else {
        setHasSubscribed(true);
        localStorage.setItem('subscription_popup_subscribed', 'true');
        toast({
          title: "Welcome!",
          description: "You've successfully subscribed to our updates.",
        });
        
        // Close after showing success
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
          >
            <div className="w-[85%] max-w-xs pointer-events-auto bg-[#111] border border-white/10 rounded-lg p-5 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-white/75 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {!hasSubscribed ? (
                <>
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-medium text-white mb-1">
                      Stay in the Loop
                    </h2>
                    <p className="text-white/60 text-xs">
                      Get updates on new work and guest spots.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white/30 transition-colors"
                      disabled={isSubmitting}
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black text-sm font-medium py-2.5 rounded-md hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>

                  <p className="text-white/65 text-[10px] text-center mt-3">
                    No spam, unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="text-center py-2">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-base font-medium text-white mb-1">
                    You're In!
                  </h2>
                  <p className="text-white/60 text-xs">
                    Thanks for subscribing.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionPopup;
