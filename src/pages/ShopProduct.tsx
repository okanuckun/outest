import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Loader2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

const ShopProduct = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const selectedVariant = product?.variants?.edges?.[selectedVariantIndex]?.node;
  const images = product?.images?.edges || [];

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    
    const shopifyProduct: ShopifyProduct = {
      node: product
    };
    
    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success('Added to cart', {
      description: `${product.title} x ${quantity}`,
      position: 'top-center'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white/40" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation variant="light" />
        <div className="flex flex-col items-center justify-center py-32 px-6">
          <p className="text-white/60 text-lg mb-4">Product not found</p>
          <Link to="/shop" className="text-white underline">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${product.title} | Shop | Okan Uckun`}
        description={product.description?.slice(0, 160) || `Purchase ${product.title} from Okan Uckun's art collection.`}
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

        {/* Cart Button */}
        <div className="fixed top-4 right-4 z-50">
          <CartDrawer />
        </div>

        {/* Main Content */}
        <main className="px-6 md:px-12 lg:px-24 py-8 md:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/shop"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>

            {/* Product Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square overflow-hidden bg-white/5">
                  {images[selectedImageIndex]?.node ? (
                    <img 
                      src={images[selectedImageIndex].node.url}
                      alt={images[selectedImageIndex].node.altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40">
                      No image
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`aspect-square overflow-hidden bg-white/5 transition-opacity ${
                          index === selectedImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={image.node.url}
                          alt={image.node.altText || `${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold text-white uppercase tracking-[-0.02em] mb-4">
                    {product.title}
                  </h1>
                  {selectedVariant && (
                    <p className="text-2xl text-white">
                      {selectedVariant.price.currencyCode} {parseFloat(selectedVariant.price.amount).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/70 leading-relaxed">{product.description}</p>
                  </div>
                )}

                {/* Options */}
                {product.options && product.options.filter(opt => opt.name !== 'Title' || opt.values[0] !== 'Default Title').map((option, optIndex) => (
                  <div key={optIndex} className="space-y-3">
                    <label className="text-sm uppercase tracking-wider text-white/60">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value, valIndex) => (
                        <button
                          key={valIndex}
                          onClick={() => {
                            const variantIndex = product.variants.edges.findIndex(v => 
                              v.node.selectedOptions.some(so => so.name === option.name && so.value === value)
                            );
                            if (variantIndex >= 0) setSelectedVariantIndex(variantIndex);
                          }}
                          className={`px-4 py-2 text-sm border transition-colors ${
                            selectedVariant?.selectedOptions.some(so => so.name === option.name && so.value === value)
                              ? 'border-white bg-white text-black'
                              : 'border-white/20 text-white hover:border-white/40'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div className="space-y-3">
                  <label className="text-sm uppercase tracking-wider text-white/60">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-white text-lg w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || !selectedVariant?.availableForSale}
                  size="lg"
                  className="w-full bg-white text-black hover:bg-white/90 h-14 text-base uppercase tracking-wider"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : !selectedVariant?.availableForSale ? (
                    'Sold Out'
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </motion.div>
    </>
  );
};

export default ShopProduct;
