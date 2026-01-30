import { Link } from 'react-router-dom';
import { ShopifyProduct, useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  
  const { node } = product;
  const firstImage = node.images?.edges?.[0]?.node;
  const firstVariant = node.variants?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;
    
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    
    toast.success('Added to cart', {
      description: node.title,
      position: 'top-center'
    });
  };

  return (
    <Link 
      to={`/shop/${node.handle}`}
      className="group block"
    >
      <div className="aspect-square overflow-hidden bg-white/5 mb-4">
        {firstImage ? (
          <img 
            src={firstImage.url} 
            alt={firstImage.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40">
            No image
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-[15px] font-medium uppercase tracking-[-0.15px] text-white group-hover:opacity-70 transition-opacity">
          {node.title}
        </h3>
        {price && (
          <p className="text-[14px] text-white/60">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </p>
        )}
        <Button 
          onClick={handleAddToCart}
          disabled={isLoading || !firstVariant?.availableForSale}
          variant="outline"
          size="sm"
          className="w-full border-white/20 text-white hover:bg-white hover:text-black transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : !firstVariant?.availableForSale ? (
            'Sold Out'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </Link>
  );
};
