
import { SHOPS, PRODUCTS } from '../constants';
import { type Shop, type Product } from '../types';

// =================================================================
// FIREBASE INTEGRATION NOTE:
// This is a mock service that simulates fetching data from Firebase.
// In a real application, you would replace the logic in each
// function with actual calls to the Firebase SDK (e.g., using
// getFirestore, collection, getDocs, where, etc.).
//
// The functions are asynchronous (return Promises) to mimic the
// real behavior of database calls.
// =================================================================

export const getShops = (): Promise<Shop[]> => {
  console.log("FirebaseService: Fetching all shops...");
  return new Promise(resolve => {
    setTimeout(() => resolve(SHOPS), 200); // Simulate network delay
  });
};

export const getShopById = (shopId: string): Promise<Shop | undefined> => {
    console.log(`FirebaseService: Fetching shop with id ${shopId}...`);
    return new Promise(resolve => {
        const shop = SHOPS.find(s => s.id === shopId);
        setTimeout(() => resolve(shop), 200);
    });
};

export const getProductsByShopId = (shopId: string): Promise<Product[]> => {
  console.log(`FirebaseService: Fetching products for shop id ${shopId}...`);
  return new Promise(resolve => {
    const products = PRODUCTS.filter(p => p.shopId === shopId);
    setTimeout(() => resolve(products), 200);
  });
};

export const getAllProducts = (): Promise<Product[]> => {
  console.log("FirebaseService: Fetching all products...");
  return new Promise(resolve => {
    setTimeout(() => resolve(PRODUCTS), 200);
  });
};
