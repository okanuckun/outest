import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";

// Lazy load MetaPixel - not critical for initial render
const MetaPixel = lazy(() => import("@/components/MetaPixel"));

// Eager load Index for fast initial render
import Index from "./pages/Index";

// Lazy load other pages
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Work = lazy(() => import("./pages/Work"));
const Project = lazy(() => import("./pages/Project"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Booking = lazy(() => import("./pages/Booking"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminSEO = lazy(() => import("./pages/AdminSEO"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/article" element={<Blog />} />
            <Route path="/work" element={<Work />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/seo" element={<AdminSEO />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

// Delay non-critical components
const DeferredMetaPixel = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    // Load MetaPixel after initial render
    const timer = setTimeout(() => setShouldLoad(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;
  
  return (
    <Suspense fallback={null}>
      <MetaPixel />
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
        <Toaster />
        <Sonner />
        <DeferredMetaPixel />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </ReactLenis>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
