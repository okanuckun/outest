import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <>
      <SEOHead
        title="404 - Lost in Space | Okan Uckun"
        description="The page you're looking for doesn't exist."
        noindex={true}
      />
      <div className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden">
        {/* Animated background lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-white/10"
              style={{
                top: `${20 + i * 15}%`,
                left: 0,
                right: 0,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6">
          {/* Giant 404 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <h1 
              className="text-[#F6F6F6] font-black leading-none tracking-[-0.05em]"
              style={{ fontSize: 'clamp(120px, 25vw, 300px)' }}
            >
              404
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-white/60 text-lg md:text-xl uppercase tracking-[0.2em] mb-2">
              Page not found
            </p>
            <p className="text-white/40 text-sm tracking-wide">
              The page you're looking for has vanished into the void
            </p>
          </motion.div>

          {/* Countdown & Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <p className="text-white/30 text-sm">
              Redirecting in <span className="text-white font-medium">{countdown}</span> seconds
            </p>
            
            <motion.button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/80 text-sm uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Return Home</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                className="rotate-[-45deg]"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-8 left-8 text-white/20 text-xs uppercase tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Error
        </motion.div>
        <motion.div
          className="absolute bottom-8 right-8 text-white/20 text-xs uppercase tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {location.pathname}
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
