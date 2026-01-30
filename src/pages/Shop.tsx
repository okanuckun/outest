import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { ProductCard } from '@/components/shop/ProductCard';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Loader2 } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <SEOHead
        title="Shop | Okan Uckun"
        description="Browse and purchase exclusive art prints, original artwork, and limited edition pieces by Okan Uckun."
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-black"
      >
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black z-0" />
          <div className="relative z-10">
            <Navigation variant="light" />
          </div>
        </div>

        {/* Cart Button - Fixed Position */}
        <div className="fixed top-4 right-4 z-50">
          <CartDrawer />
        </div>

        {/* Main Content */}
        <main className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white uppercase tracking-[-0.02em] mb-4">
                Shop
              </h1>
              <p className="text-white/60 text-lg max-w-2xl">
                Explore exclusive art prints and original pieces available for purchase.
              </p>
            </motion.div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="w-8 h-8 animate-spin text-white/40" />
              </div>
            ) : error ? (
              <div className="text-center py-32">
                <p className="text-white/60">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center py-32 border border-white/10 rounded-lg"
              >
                <p className="text-white/60 text-lg mb-2">No products available yet</p>
                <p className="text-white/40 text-sm">
                  Check back soon for new artwork and prints.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </motion.div>
    </>
  );
};

export default Shop;
