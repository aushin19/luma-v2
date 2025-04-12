import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Hydrating Facial Serum',
    brand: 'LUMA Essentials',
    price: 48.00,
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    description: "A lightweight, fast-absorbing serum that delivers intense hydration and helps restore the skin's natural moisture barrier.",
    category: 'skincare',
    tags: ['hydrating', 'serum', 'face'],
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isFeatured: true,
    ingredients: 'Aqua, Glycerin, Hyaluronic Acid, Niacinamide, Panthenol, Allantoin, Sodium PCA, Aloe Barbadensis Leaf Juice, Tocopherol, Phenoxyethanol, Ethylhexylglycerin.',
    usage: 'Apply 2-3 drops to clean, damp skin morning and evening. Follow with moisturizer.',
    stock: 45,
  },
  {
    id: '2',
    name: 'Matte Velvet Lipstick',
    brand: 'LUMA Color',
    price: 24.00,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A luxurious matte lipstick that delivers intense color payoff with a comfortable, non-drying formula.',
    category: 'makeup',
    tags: ['lipstick', 'matte', 'lips'],
    rating: 4.6,
    reviewCount: 89,
    isTrending: true,
    shades: [
      { id: 's1', name: 'Mauve Dream', colorCode: '#C8A2C8' },
      { id: 's2', name: 'Coral Bliss', colorCode: '#FF7F50' },
      { id: 's3', name: 'Ruby Red', colorCode: '#E0115F' },
      { id: 's4', name: 'Dusty Rose', colorCode: '#C08081' },
    ],
    usage: 'Apply directly to lips. For a more defined look, use with a lip liner.',
    stock: 78,
  },
  {
    id: '3',
    name: 'Brightening Eye Cream',
    brand: 'LUMA Essentials',
    price: 38.00,
    originalPrice: 45.00,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A targeted eye treatment that reduces the appearance of dark circles, puffiness, and fine lines while brightening the under-eye area.',
    category: 'skincare',
    tags: ['eye cream', 'brightening', 'anti-aging'],
    rating: 4.5,
    reviewCount: 67,
    isFeatured: true,
    ingredients: 'Aqua, Glycerin, Caffeine, Niacinamide, Vitamin C, Peptides, Hyaluronic Acid, Squalane, Shea Butter, Tocopherol, Phenoxyethanol.',
    usage: 'Apply a small amount around the eye area morning and evening, gently patting with ring finger until absorbed.',
    stock: 32,
  },
  {
    id: '4',
    name: 'Dewy Skin Tint',
    brand: 'LUMA Color',
    price: 36.00,
    images: [
      'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A lightweight, buildable skin tint that evens out skin tone while providing a natural, dewy finish.',
    category: 'makeup',
    tags: ['foundation', 'skin tint', 'dewy'],
    rating: 4.7,
    reviewCount: 103,
    isNew: true,
    isTrending: true,
    shades: [
      { id: 's1', name: 'Fair', colorCode: '#F6E8D3' },
      { id: 's2', name: 'Light', colorCode: '#EFD9B4' },
      { id: 's3', name: 'Medium', colorCode: '#D8B78E' },
      { id: 's4', name: 'Tan', colorCode: '#C19A6B' },
      { id: 's5', name: 'Deep', colorCode: '#8D5524' },
      { id: 's6', name: 'Rich', colorCode: '#5C3C10' },
    ],
    usage: 'Apply with fingers, brush, or sponge. Build coverage as desired.',
    stock: 56,
  },
  {
    id: '5',
    name: 'Exfoliating Facial Scrub',
    brand: 'LUMA Essentials',
    price: 28.00,
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A gentle exfoliating scrub that removes dead skin cells and impurities, revealing smoother, brighter skin.',
    category: 'skincare',
    tags: ['exfoliator', 'scrub', 'face'],
    rating: 4.4,
    reviewCount: 58,
    ingredients: 'Aqua, Jojoba Beads, Glycerin, Aloe Barbadensis Leaf Juice, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Glyceryl Stearate, Cetearyl Alcohol, Tocopherol, Phenoxyethanol.',
    usage: 'Apply to damp skin and massage in circular motions. Rinse thoroughly. Use 2-3 times per week.',
    stock: 39,
  },
  {
    id: '6',
    name: 'Volumizing Mascara',
    brand: 'LUMA Color',
    price: 22.00,
    images: [
      'https://images.unsplash.com/photo-1631214503851-29fa43efb823?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A buildable mascara that adds volume, length, and definition to lashes without clumping or flaking.',
    category: 'makeup',
    tags: ['mascara', 'eyes', 'volumizing'],
    rating: 4.5,
    reviewCount: 76,
    isTrending: true,
    usage: 'Apply from root to tip, wiggling the wand as you go. Build additional coats for more volume.',
    stock: 62,
  },
  {
    id: '7',
    name: 'Nourishing Body Oil',
    brand: 'LUMA Body',
    price: 32.00,
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A luxurious body oil that deeply nourishes and hydrates skin, leaving it soft, smooth, and glowing.',
    category: 'body',
    tags: ['body oil', 'hydrating', 'nourishing'],
    rating: 4.9,
    reviewCount: 42,
    isNew: true,
    ingredients: 'Caprylic/Capric Triglyceride, Squalane, Sweet Almond Oil, Jojoba Seed Oil, Meadowfoam Seed Oil, Vitamin E, Rosemary Leaf Extract, Fragrance.',
    usage: 'Apply to damp skin after showering or bathing. Massage until absorbed.',
    stock: 28,
  },
  {
    id: '8',
    name: 'Brow Sculpting Gel',
    brand: 'LUMA Color',
    price: 18.00,
    images: [
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A clear brow gel that shapes, sets, and holds brows in place all day without stiffness or flaking.',
    category: 'makeup',
    tags: ['brow gel', 'eyebrows', 'clear'],
    rating: 4.3,
    reviewCount: 51,
    usage: 'Brush through brows in upward strokes to shape and set.',
    stock: 47,
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(product => product.isTrending);
};