export type PerishableLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type CropStatus = 'Ready Soon' | 'Harvesting' | 'Planted' | 'Post-Harvest';

export interface CropItem {
  id: string;
  name: string;
  variety: string;
  acreage: number; // in acres
  growthStage: string;
  expectedHarvestDate: string;
  estimatedQtyKg: number;
  category: 'Leafy Vegetable' | 'Fruit' | 'Grain' | 'Root Crop' | 'Spice';
  perishableLevel: PerishableLevel;
  qualityGrade?: string;
  freshnessScore?: number; // e.g. 95%
  status: CropStatus;
}

export interface SellingPreferences {
  preferredBuyerType: 'Any' | 'Wholesaler' | 'Food Processor' | 'Retailer' | 'Restaurant' | 'Institutional';
  sellingRadiusKm: number;
  minQuantityKg: number;
  priority: 'Highest Price' | 'Fastest Sale' | 'Lowest Transportation' | 'Minimum Wastage';
}

export interface FarmerProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  preferredLanguage: string;
  totalFarmlandAcres: number;
  cultivatedAreaAcres: number;
  soilType: string;
  irrigationMethod: string;
  farmingMethod: 'Organic' | 'Conventional' | 'Natural Farming' | 'Hydroponic';
  crops: CropItem[];
  postHarvestFacilities: string[]; // e.g. ['Cold Storage', 'Sorting/Grading', 'Packaging', 'Transport']
  sellingPreferences: SellingPreferences;
}

export type BuyerType =
  | 'Wholesaler'
  | 'Retailer'
  | 'Food Processor'
  | 'Restaurant'
  | 'Hotel'
  | 'Institutional'
  | 'Aggregator';

export interface BuyerRecord {
  id: string;
  name: string;
  type: BuyerType;
  location: string;
  district: string;
  state: string;
  distanceKm: number;
  cropsAccepted: string[];
  qualityRequirements: string;
  minQuantityKg: number;
  maxQuantityKg: number;
  processingType?: string;
  procurementRadiusKm: number;
  verified: boolean;
  contactPhone: string;
  contactEmail: string;
  buyingPricePerKg?: number; // in INR
}

export type UserRole = 'FARMER' | 'BUYER';

export interface BuyerProfile {
  id: string;
  companyName: string;
  contactPerson: string;
  buyerType: BuyerType;
  villageOrLocality: string;
  district: string;
  state: string;
  procurementRadiusKm: number;
  targetCrops: string[];
  qualitySpecification: string;
  minQtyKg: number;
  maxQtyKg: number;
  buyingPricePerKgINR: number;
  verified: boolean;
  phone: string;
  email: string;
}

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DELIVERED';

export interface PurchaseOrder {
  id: string;
  cropId: string;
  cropName: string;
  farmerName: string;
  farmerLocation: string;
  buyerName: string;
  buyerType: BuyerType;
  quantityKg: number;
  offeredPricePerKg: number;
  totalAmountINR: number;
  status: OrderStatus;
  orderDate: string;
  deliveryDate: string;
}

export interface MatchResult {
  buyer: BuyerRecord;
  crop: CropItem;
  matchScore: number; // 0 to 100
  distanceKm: number;
  recommendation: 'SELL NOW' | 'PRIORITY SALE' | 'PROCESSING' | 'STORAGE';
  recommendationColor: 'emerald' | 'amber' | 'blue' | 'purple';
  urgencyReason: string;
  quantityMatchPercentage: number;
}
