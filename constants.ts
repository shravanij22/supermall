
import { type Shop, type Product, type Offer } from './types';

export const SHOPS: Shop[] = [
  { id: 's1', name: 'Electro World', category: 'Electronics', floor: 1, logoUrl: 'https://picsum.photos/seed/s1/100', description: 'Latest electronics and gadgets under one roof.', coverImageUrl: 'https://picsum.photos/seed/c1/1200/400' },
  { id: 's2', name: 'Fashion Forward', category: 'Fashion', floor: 2, logoUrl: 'https://picsum.photos/seed/s2/100', description: 'Trendy apparel for all seasons.', coverImageUrl: 'https://picsum.photos/seed/c2/1200/400' },
  { id: 's3', name: 'Gadget Hub', category: 'Electronics', floor: 1, logoUrl: 'https://picsum.photos/seed/s3/100', description: 'Your one-stop shop for all smart devices.', coverImageUrl: 'https://picsum.photos/seed/c3/1200/400' },
  { id: 's4', name: 'Luxe Living', category: 'Lifestyle', floor: 3, logoUrl: 'https://picsum.photos/seed/s4/100', description: 'Premium home decor and lifestyle products.', coverImageUrl: 'https://picsum.photos/seed/c4/1200/400' },
  { id: 's5', name: 'Style Sphere', category: 'Fashion', floor: 2, logoUrl: 'https://picsum.photos/seed/s5/100', description: 'Exclusive collection of designer wear.', coverImageUrl: 'https://picsum.photos/seed/c5/1200/400' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Smart TV 4K', shopId: 's1', price: 799.99, features: ['65-inch OLED', 'Dolby Atmos', 'HDR10+', 'Smart Hub'], imageUrl: 'https://picsum.photos/seed/p1/400/300', description: 'Experience breathtaking 4K visuals with this state-of-the-art OLED Smart TV. Integrated Smart Hub gives you access to all your favorite streaming apps.' },
  { id: 'p2', name: 'Noise-Cancelling Headphones', shopId: 's1', price: 249.99, features: ['Active Noise Cancellation', '30-hour Battery', 'Bluetooth 5.2', 'ComfortFit Design'], imageUrl: 'https://picsum.photos/seed/p2/400/300', description: 'Immerse yourself in pure sound with industry-leading noise cancellation. Long-lasting battery and a comfortable design for all-day listening.', colorOptions: ['Black', 'Silver', 'Navy Blue'] },
  { id: 'p3', name: 'Designer Leather Jacket', shopId: 's2', price: 450.00, features: ['100% Genuine Leather', 'Hand-stitched', 'Slim Fit', 'Multiple Pockets'], imageUrl: 'https://picsum.photos/seed/p3/400/300', description: 'A timeless classic, this genuine leather jacket is hand-stitched to perfection. The slim fit design offers a modern and stylish silhouette.', sizeOptions: ['S', 'M', 'L', 'XL'] },
  { id: 'p4', name: 'Smart Watch Pro', shopId: 's3', price: 399.00, features: ['GPS Tracking', 'Heart Rate Monitor', 'AMOLED Display', 'Water Resistant'], imageUrl: 'https://picsum.photos/seed/p4/400/300', description: 'Stay connected and track your fitness with the Smart Watch Pro. Features a vibrant AMOLED display, advanced health sensors, and built-in GPS.' },
  { id: 'p5', name: 'Aroma Diffuser', shopId: 's4', price: 75.50, features: ['Ultrasonic Technology', '7 LED Colors', 'Auto Shut-off', '500ml Capacity'], imageUrl: 'https://picsum.photos/seed/p5/400/300', description: 'Create a relaxing atmosphere in your home with this ultrasonic aroma diffuser. Features multiple LED light options and an auto shut-off for safety.' },
  { id: 'p6', name: 'Laptop Pro X', shopId: 's3', price: 1299.00, features: ['16GB RAM', '512GB SSD', '14-inch Retina', 'M3 Chip'], imageUrl: 'https://picsum.photos/seed/p6/400/300', description: 'Unleash your creativity with the powerful Laptop Pro X. Featuring the latest M3 chip, a stunning Retina display, and all-day battery life.', colorOptions: ['Space Gray', 'Silver'] },
  { id: 'p7', name: 'Luxury Silk Scarf', shopId: 's5', price: 120.00, features: ['100% Mulberry Silk', 'Hand-rolled Edges', 'Vibrant Print', 'Gift Box Included'], imageUrl: 'https://picsum.photos/seed/p7/400/300', description: 'Add a touch of elegance to any outfit with this beautiful 100% Mulberry silk scarf. Comes in a beautiful gift box.', colorOptions: ['Floral', 'Paisley', 'Geometric'] },
  { id: 'p8', name: 'Summer Linen Shirt', shopId: 's2', price: 89.90, features: ['100% Linen', 'Breathable Fabric', 'Button-down Collar', 'Relaxed Fit'], imageUrl: 'https://picsum.photos/seed/p8/400/300', description: 'Stay cool and stylish in our 100% linen shirt. Perfect for warm weather, it offers a relaxed fit for maximum comfort.', sizeOptions: ['S', 'M', 'L', 'XL'], colorOptions: ['White', 'Sky Blue', 'Beige'] },
];

export const OFFERS: Offer[] = [
  { id: 'o1', shopId: 's1', title: '20% Off All TVs', description: 'Upgrade your home entertainment system with a stunning 4K TV. Get 20% off for a limited time!', discount: '20%', validUntil: '2024-12-31' },
  { id: 'o2', shopId: 's2', title: 'Buy One Get One Free', description: 'Refresh your wardrobe! Buy any item and get another one of equal or lesser value for free.', discount: 'BOGO', validUntil: '2024-11-30' },
  { id: 'o3', shopId: 's3', title: 'Smart Watch Launch Offer', description: 'Be the first to own the new Smart Watch Pro. Pre-order now and get a free wireless charger.', discount: 'Free Gift', validUntil: '2024-12-15' },
];
