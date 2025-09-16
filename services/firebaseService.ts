// Fix: Updated all Firestore calls to use the Firebase v8 SDK syntax to match `firebaseConfig.ts`.
// Fix: Use Firebase v9 compatibility imports to resolve type errors.
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { db } from './firebaseConfig';
import { type Shop, type Product, type Offer } from '../types';
// Fix: Import mock data to use as a fallback when Firebase is not configured.
import { SHOPS, PRODUCTS, OFFERS } from '../constants';

// Helper function to convert a Firestore DocumentSnapshot to our data type.
const fromDoc = <T>(docSnapshot: firebase.firestore.DocumentSnapshot): T => {
    const data = docSnapshot.data() as Omit<T, 'id'>;
    return {
        id: docSnapshot.id,
        ...data,
    } as T;
};

// =================================================================
// FIREBASE INTEGRATION:
// The functions below now interact with a real Firestore database.
// If Firebase is not configured, they fall back to using local mock data.
// =================================================================

export const getShops = async (): Promise<Shop[]> => {
  if (!db) {
    console.warn("Firebase is not configured. Returning mock data for shops.");
    return Promise.resolve(SHOPS);
  }
  console.log("FirebaseService: Fetching all shops from Firestore...");
  try {
    const shopsCollection = db.collection('shops');
    const shopSnapshot = await shopsCollection.get();
    return shopSnapshot.docs.map(doc => fromDoc<Shop>(doc));
  } catch (error) {
    console.error("Error fetching shops:", error);
    return [];
  }
};

export const addShop = async (shopData: Omit<Shop, 'id'>): Promise<Shop> => {
    if (!db) {
      console.warn("Firebase is not configured. Simulating addShop locally.");
      const newShop: Shop = {
        id: `mock-shop-${Date.now()}`,
        ...shopData
      };
      return Promise.resolve(newShop);
    }
    console.log("FirebaseService: Adding new shop to Firestore...");
    try {
        const docRef = await db.collection('shops').add(shopData);
        return {
            id: docRef.id,
            ...shopData
        };
    } catch (error) {
        console.error("Error adding shop:", error);
        throw error; // Re-throw the error to be handled by the component
    }
};

export const getShopById = async (shopId: string): Promise<Shop | undefined> => {
    if (!db) {
      console.warn(`Firebase is not configured. Returning mock data for shop id ${shopId}.`);
      return Promise.resolve(SHOPS.find(s => s.id === shopId));
    }
    console.log(`FirebaseService: Fetching shop with id ${shopId} from Firestore...`);
    try {
        const shopDocRef = db.collection('shops').doc(shopId);
        const shopDoc = await shopDocRef.get();
        return shopDoc.exists ? fromDoc<Shop>(shopDoc) : undefined;
    } catch (error) {
        console.error(`Error fetching shop ${shopId}:`, error);
        return undefined;
    }
};

export const getProductsByShopId = async (shopId: string): Promise<Product[]> => {
  if (!db) {
    console.warn(`Firebase is not configured. Returning mock data for products in shop ${shopId}.`);
    return Promise.resolve(PRODUCTS.filter(p => p.shopId === shopId));
  }
  console.log(`FirebaseService: Fetching products for shop id ${shopId} from Firestore...`);
  try {
    const q = db.collection('products').where("shopId", "==", shopId);
    const productSnapshot = await q.get();
    return productSnapshot.docs.map(doc => fromDoc<Product>(doc));
  } catch (error) {
    console.error(`Error fetching products for shop ${shopId}:`, error);
    return [];
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  if (!db) {
    console.warn("Firebase is not configured. Returning mock data for all products.");
    return Promise.resolve(PRODUCTS);
  }
  console.log("FirebaseService: Fetching all products from Firestore...");
   try {
    const productsCollection = db.collection('products');
    const productSnapshot = await productsCollection.get();
    return productSnapshot.docs.map(doc => fromDoc<Product>(doc));
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

export const getOffers = async (): Promise<Offer[]> => {
  if (!db) {
    console.warn("Firebase is not configured. Returning mock data for offers.");
    return Promise.resolve(OFFERS);
  }
  console.log("FirebaseService: Fetching all offers from Firestore...");
  try {
    const offersCollection = db.collection('offers');
    // Fix: Corrected variable name from `offerSnapshot` to `offersCollection` to prevent using a variable before declaration.
    const offerSnapshot = await offersCollection.get();
    return offerSnapshot.docs.map(doc => fromDoc<Offer>(doc));
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
};

export const addOffer = async (offerData: Omit<Offer, 'id'>): Promise<Offer> => {
    if (!db) {
      console.warn("Firebase is not configured. Simulating addOffer locally.");
      const newOffer: Offer = {
        id: `mock-offer-${Date.now()}`,
        ...offerData
      };
      return Promise.resolve(newOffer);
    }
    console.log("FirebaseService: Adding new offer to Firestore...");
    try {
        const docRef = await db.collection('offers').add(offerData);
        return {
            id: docRef.id,
            ...offerData
        };
    } catch (error) {
        console.error("Error adding offer:", error);
        throw error;
    }
};