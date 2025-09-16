import { type Shop, type Product, type Offer } from './types';

export const SHOPS: Shop[] = [
  // Technology
  { id: 's1', name: 'Future Tech', category: 'Technology', floor: 1, logoUrl: 'https://picsum.photos/seed/s1/100', description: 'Cutting-edge gadgets and electronics.', coverImageUrl: 'https://picsum.photos/seed/c1/1200/400' },
  { id: 's2', name: 'Digital Dream', category: 'Technology', floor: 1, logoUrl: 'https://picsum.photos/seed/s2/100', description: 'Your home for computers and accessories.', coverImageUrl: 'https://picsum.photos/seed/c2/1200/400' },
  
  // Fashion
  { id: 's3', name: 'Chic Boutique', category: 'Fashion', floor: 2, logoUrl: 'https://picsum.photos/seed/s3/100', description: 'Elegant and modern women\'s wear.', coverImageUrl: 'https://picsum.photos/seed/c3/1200/400' },
  { id: 's4', name: 'Urban Threads', category: 'Fashion', floor: 2, logoUrl: 'https://picsum.photos/seed/s4/100', description: 'The latest trends in street fashion.', coverImageUrl: 'https://picsum.photos/seed/c4/1200/400' },

  // Cosmetics
  { id: 's5', name: 'Glamour Glow', category: 'Cosmetics', floor: 1, logoUrl: 'https://picsum.photos/seed/s5/100', description: 'Premium makeup and beauty products.', coverImageUrl: 'https://picsum.photos/seed/c5/1200/400' },
  { id: 's6', name: 'Beauty Bloom', category: 'Cosmetics', floor: 2, logoUrl: 'https://picsum.photos/seed/s6/100', description: 'Natural and organic skincare solutions.', coverImageUrl: 'https://picsum.photos/seed/c6/1200/400' },

  // Sportswear
  { id: 's7', name: 'Active Life', category: 'Sportswear', floor: 3, logoUrl: 'https://picsum.photos/seed/s7/100', description: 'Gear up for your fitness journey.', coverImageUrl: 'https://picsum.photos/seed/c7/1200/400' },
  { id: 's8', name: 'Peak Performance', category: 'Sportswear', floor: 3, logoUrl: 'https://picsum.photos/seed/s8/100', description: 'Professional athletic apparel and equipment.', coverImageUrl: 'https://picsum.photos/seed/c8/1200/400' },

  // Lifestyle
  { id: 's9', name: 'Luxe Living', category: 'Lifestyle', floor: 3, logoUrl: 'https://picsum.photos/seed/s9/100', description: 'Premium home decor and lifestyle products.', coverImageUrl: 'https://picsum.photos/seed/c9/1200/400' },
];

export const PRODUCTS: Product[] = [
  // Technology Products
  { id: 'p1', name: 'Drone Pro 4', shopId: 's1', price: 1899.99, features: ['4K 60fps Video', '30-min Flight Time', 'Obstacle Avoidance'], imageUrl: 'https://picsum.photos/seed/p1/400/300', description: 'Capture stunning aerial footage with the Drone Pro 4.' },
  { id: 'p2', name: 'VR Headset X', shopId: 's1', price: 499.00, features: ['4K per eye resolution', '120Hz Refresh Rate', 'Built-in Audio'], imageUrl: 'https://picsum.photos/seed/p2/400/300', description: 'Immerse yourself in virtual worlds like never before.' },
  { id: 'p3', name: 'Smart Home Hub', shopId: 's2', price: 129.50, features: ['Voice Controlled', 'Connects all devices', 'Easy Setup'], imageUrl: 'https://picsum.photos/seed/p3/400/300', description: 'The central command for your smart home.' },
  { id: 'p4', name: 'Portable Projector', shopId: 's2', price: 350.00, features: ['1080p Resolution', 'Built-in Battery', 'Bluetooth Speaker'], imageUrl: 'https://picsum.photos/seed/p4/400/300', description: 'Movie nights anywhere, anytime.' },

  // Fashion Products
  { id: 'p5', name: 'Silk Blouse', shopId: 's3', price: 150.00, features: ['100% Mulberry Silk', 'Classic Fit', 'Mother of Pearl Buttons'], imageUrl: 'https://picsum.photos/seed/p5/400/300', description: 'An timeless piece for any wardrobe.', sizeOptions: ['S', 'M', 'L'] },
  { id: 'p6', name: 'Tailored Trousers', shopId: 's3', price: 220.00, features: ['Wool Blend', 'Slim Fit', 'Crease Resistant'], imageUrl: 'https://picsum.photos/seed/p6/400/300', description: 'Perfect for the office or a night out.', sizeOptions: ['28', '30', '32', '34'] },
  { id: 'p7', name: 'Graphic Tee', shopId: 's4', price: 45.00, features: ['100% Organic Cotton', 'Vintage Wash', 'Limited Edition Print'], imageUrl: 'https://picsum.photos/seed/p7/400/300', description: 'Exclusive designs from local artists.', sizeOptions: ['S', 'M', 'L', 'XL'], colorOptions: ['Black', 'White'] },
  { id: 'p8', name: 'Distressed Jeans', shopId: 's4', price: 120.00, features: ['Japanese Denim', 'Hand-distressed', 'Relaxed Fit'], imageUrl: 'https://picsum.photos/seed/p8/400/300', description: 'Effortless style with a comfortable fit.', sizeOptions: ['30', '32', '34', '36'] },

  // Cosmetics Products
  { id: 'p9', name: 'Foundation Kit', shopId: 's5', price: 75.00, features: ['Full Coverage', 'Matte Finish', '24-hour Wear'], imageUrl: 'https://picsum.photos/seed/p9/400/300', description: 'A flawless base for any look.', colorOptions: ['Light', 'Medium', 'Tan', 'Deep'] },
  { id: 'p10', name: 'Eyeshadow Palette', shopId: 's5', price: 55.00, features: ['18 Pigmented Shades', 'Mattes & Shimmers', 'Cruelty-Free'], imageUrl: 'https://picsum.photos/seed/p10/400/300', description: 'From neutral to bold, create endless eye looks.' },
  { id: 'p11', name: 'Organic Skincare Set', shopId: 's6', price: 110.00, features: ['Cleanser, Serum, Moisturizer', 'Vegan', 'For all skin types'], imageUrl: 'https://picsum.photos/seed/p11/400/300', description: 'Nourish your skin with the best from nature.' },
  { id: 'p12', name: 'Lipstick Collection', shopId: 's6', price: 80.00, features: ['5 Creamy Shades', 'Hydrating Formula', 'Long-lasting Color'], imageUrl: 'https://picsum.photos/seed/p12/400/300', description: 'A shade for every mood and occasion.' },

  // Sportswear Products
  { id: 'p13', name: 'Eco-friendly Yoga Mat', shopId: 's7', price: 65.00, features: ['Natural Rubber', 'Non-slip surface', 'Lightweight'], imageUrl: 'https://picsum.photos/seed/p13/400/300', description: 'Find your flow with our sustainable yoga mat.' },
  { id: 'p14', name: 'Trail Running Shoes', shopId: 's7', price: 130.00, features: ['Superior Grip', 'Waterproof', 'Cushioned Support'], imageUrl: 'https://picsum.photos/seed/p14/400/300', description: 'Conquer any terrain with confidence.', sizeOptions: ['8', '9', '10', '11', '12'] },
  { id: 'p15', name: 'Pro-Grade Dumbbells', shopId: 's8', price: 95.00, features: ['Hexagonal Shape', 'Rubber Coated', 'Ergonomic Grip'], imageUrl: 'https://picsum.photos/seed/p15/400/300', description: 'Essential for any home gym. Price per pair.' },
  { id: 'p16', name: 'Compression Shorts', shopId: 's8', price: 50.00, features: ['Sweat-wicking fabric', 'Muscle Support', 'Flatlock Seams'], imageUrl: 'https://picsum.photos/seed/p16/400/300', description: 'Enhance your performance and recovery.', sizeOptions: ['S', 'M', 'L'] },
];

export const OFFERS: Offer[] = [
  { id: 'o1', shopId: 's1', title: '10% Off Drones', description: 'Take your photography to new heights! Get 10% off all drones.', discount: '10%', validUntil: '2024-12-31' },
  { id: 'o2', shopId: 's4', title: 'Jeans & Tee Combo', description: 'Buy any pair of jeans and get a graphic tee for 50% off.', discount: '50% Off Tee', validUntil: '2024-11-30' },
  { id: 'o3', shopId: 's5', title: 'Free Lipstick', description: 'Receive a free lipstick with any purchase over ₹5000.', discount: 'Free Gift', validUntil: '2024-12-15' },
  { id: 'o4', shopId: 's7', title: 'New Year Fitness', description: 'Start your fitness journey with 20% off all sportswear.', discount: '20%', validUntil: '2025-01-31' },
];