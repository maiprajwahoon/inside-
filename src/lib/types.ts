export type Category = 
  | 'Chocolate'
  | 'Cereal'
  | 'Protein Bar'
  | 'Cookies'
  | 'Chips'
  | 'Instant Noodles'
  | 'Milk Drink'
  | 'Soft Drink'
  | 'Sauce'
  | 'Snack'
  | 'Energy Drink'
  | 'Yogurt'
  | 'Dairy'
  | 'Traditional Sweet'
  | 'Beverage';

export interface Ingredient {
  id: string;
  name: string;
  category: 'Allergen' | 'Sweetener' | 'Emulsifier' | 'Preservative' | 'Additive' | 'Whole Food' | 'Fat/Oil' | 'Grain' | 'Dairy';
  purpose: string;
  description: string;
  commonIn?: string[];
  flaggedDiets?: string[];
}

export interface ProductNutrition {
  calories: number;
  sugar: number; // in grams
  protein: number; // in grams
  fat: number; // in grams
  saturatedFat: number; // in grams
  sodium: number; // in mg
  carbs: number; // in grams
}

export interface PackageStyle {
  accentColor: string;
  secondaryColor?: string;
  shape: 'box' | 'cylinder' | 'bar' | 'pouch' | 'bottle' | 'can';
  tagline: string;
}

export interface ProductPosition {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  depth: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  subtitle: string;
  ingredients: Ingredient[];
  nutrition: ProductNutrition;
  packageStyle: PackageStyle;
  position: ProductPosition;
  isPopular?: boolean;
}

export interface UserProfile {
  allergies: string[];
  diets: string[];
  avoidIngredients: string[];
}

export type StatusLevel = 'RED' | 'AMBER' | 'GREEN' | 'GREY';

export interface IngredientAnalysisItem {
  ingredient: Ingredient;
  status: StatusLevel;
  reason?: string;
  matchType?: 'ALLERGY' | 'INTOLERANCE' | 'DIET' | 'AVOID' | 'SAFE';
  flaggedBy?: string[];
}

export interface AnalysisResult {
  product: Product;
  overallStatus: 'NOT_RECOMMENDED' | 'CAUTION' | 'GOOD_MATCH';
  statusLabel: string;
  statusColor: 'red' | 'amber' | 'green';
  summary: string;
  ingredientAnalysis: IngredientAnalysisItem[];
  conflictsCount: number;
  concernsCount: number;
  compatibleCount: number;
}

export type ActiveTab = 'home' | 'scan' | 'upload' | 'search' | 'compare' | 'profile' | 'onboarding' | 'product-detail';
