export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  decathlonUrl: string;
  imageUrl: string;
  tags: string[]; // injury types or exercise types this helps with
}

export const products: Product[] = [
  {
    id: 'yoga-mat',
    name: 'Comfort Yoga Mat 8mm',
    description: 'Extra cushioning for joint protection during floor exercises.',
    price: '€19.99',
    decathlonUrl: 'https://www.decathlon.com/collections/yoga-mats',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=200&fit=crop',
    tags: ['knee', 'back', 'yoga', 'beginner']
  },
  {
    id: 'resistance-band',
    name: 'Resistance Band Set',
    description: 'Progressive resistance for strength building without joint stress.',
    price: '€14.99',
    decathlonUrl: 'https://www.decathlon.com/collections/resistance-bands',
    imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=200&fit=crop',
    tags: ['shoulder', 'rehabilitation', 'strength']
  },
  {
    id: 'foam-roller',
    name: 'Recovery Foam Roller',
    description: 'Self-massage tool for muscle recovery and tension release.',
    price: '€24.99',
    decathlonUrl: 'https://www.decathlon.com/collections/foam-rollers',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    tags: ['back', 'recovery', 'muscle-tension']
  },
  {
    id: 'knee-support',
    name: 'Knee Support Brace',
    description: 'Provides stability and compression for weak or injured knees.',
    price: '€16.99',
    decathlonUrl: 'https://www.decathlon.com/collections/knee-braces',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    tags: ['knee', 'support', 'injury-prevention']
  },
  {
    id: 'yoga-blocks',
    name: 'Yoga Block Set (2 pcs)',
    description: 'Helps modify poses and maintain proper alignment.',
    price: '€12.99',
    decathlonUrl: 'https://www.decathlon.com/collections/yoga-blocks',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop',
    tags: ['flexibility', 'beginner', 'alignment']
  },
  {
    id: 'massage-ball',
    name: 'Trigger Point Massage Ball',
    description: 'Target specific muscle knots and tension points.',
    price: '€8.99',
    decathlonUrl: 'https://www.decathlon.com/collections/massage-balls',
    imageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=300&h=200&fit=crop',
    tags: ['shoulder', 'back', 'recovery']
  },
  {
    id: 'balance-pad',
    name: 'Balance Training Pad',
    description: 'Improves stability and proprioception for injury prevention.',
    price: '€22.99',
    decathlonUrl: 'https://www.decathlon.com/collections/balance-trainers',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    tags: ['ankle', 'balance', 'rehabilitation']
  },
  {
    id: 'knee-pad',
    name: 'Exercise Knee Pads',
    description: 'Extra cushioning for kneeling exercises.',
    price: '€9.99',
    decathlonUrl: 'https://www.decathlon.com/collections/knee-pads',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop',
    tags: ['knee', 'floor-exercises', 'comfort']
  }
];

export function getRecommendedProducts(
  injuries: string[],
  exerciseIds: string[]
): Product[] {
  // Get products related to injuries
  const injuryProducts = products.filter(product =>
    injuries.some(injury => product.tags.includes(injury))
  );
  
  // Get products related to recommended exercises
  const exerciseProducts = products.filter(product =>
    product.tags.some(tag => 
      ['yoga', 'strength', 'recovery', 'beginner'].includes(tag)
    )
  );
  
  // Combine and deduplicate
  const allProducts = [...injuryProducts, ...exerciseProducts];
  const uniqueProducts = Array.from(
    new Map(allProducts.map(p => [p.id, p])).values()
  );
  
  return uniqueProducts.slice(0, 4); // Return top 4
}
