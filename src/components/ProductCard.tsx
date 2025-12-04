import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <div 
      className="glass-card rounded-xl overflow-hidden hover-lift group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-36 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-bold">
          {product.price}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h4 className="font-semibold text-sm">{product.name}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          asChild
        >
          <a href={product.decathlonUrl} target="_blank" rel="noopener noreferrer">
            View at Decathlon
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}
