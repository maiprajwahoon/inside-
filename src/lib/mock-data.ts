import type { Product, UserProfile } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  allergies: [],
  diets: [],
  avoidIngredients: [],
};

export const ALLERGEN_OPTIONS: string[] = [];
export const DIET_OPTIONS: string[] = [];
export const PRESET_PROFILES: { label: string; profile: UserProfile }[] = [];

export const MOCK_PRODUCTS: Product[] = [
  // 1. Alphonso Mango (Agricultural Produce)
  {
    id: 'prod-agri-01',
    name: 'Ratnagiri Alphonso Mango',
    brand: 'Farm Direct',
    category: 'Fresh Produce',
    subtitle: 'GI-Tagged Premium Saffron Hapus Mango',
    packageStyle: { accentColor: '#F59E0B', shape: 'box', tagline: 'GRADE A EXPORT' },
    position: { x: 12, y: 16, scale: 1.1, rotation: -6, depth: 1 },
    nutrition: { calories: 60, sugar: 13.7, protein: 0.8, fat: 0.4, saturatedFat: 0.1, sodium: 1, carbs: 15.0 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Ratnagiri, Maharashtra',
      visualQuality: 'Saffron-golden skin, firm juicy flesh, distinct aroma',
      visibleDefects: 'Minimal surface blemish (<1%)',
      estimatedGrade: 'Grade A (Export Quality)',
      freshnessIndicator: '96% Peak Ripeness (Post-harvest Day 3)',
      processingSuitability: 'High Pulp Yield — Ideal for Juices, Purees, Nectars & Canning',
      confidenceScore: 97,
    },
    ingredients: [
      { id: 'ing-mango-pulp', name: 'Whole Alphonso Mango Fruit (100%)', category: 'Whole Food', purpose: 'Primary raw produce.', description: 'Farm harvested fresh Alphonso mango fruit.' },
      { id: 'ing-beta-caro', name: 'Natural Beta-Carotene & Vitamin C', category: 'Whole Food', purpose: 'Natural antioxidant & color.', description: 'Carotenoid rich fruit nutrients.' },
    ],
  },

  // 2. Desi Tomato (Agricultural Produce)
  {
    id: 'prod-agri-02',
    name: 'Desi Red Tomato',
    brand: 'Farm Direct',
    category: 'Fresh Produce',
    subtitle: 'High-Acidity Tangy Farm-Fresh Tomatoes',
    packageStyle: { accentColor: '#EF4444', shape: 'pouch', tagline: 'PROCESSING GRADE' },
    position: { x: 82, y: 18, scale: 1.1, rotation: 8, depth: 1 },
    nutrition: { calories: 18, sugar: 2.6, protein: 0.9, fat: 0.2, saturatedFat: 0.0, sodium: 5, carbs: 3.9 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Nashik, Maharashtra',
      visualQuality: 'Deep crimson red, firm pericarp wall structure',
      visibleDefects: 'None detected',
      estimatedGrade: 'Grade A (Processing Standard)',
      freshnessIndicator: '94% Freshness (Post-harvest Day 2)',
      processingSuitability: 'High Soluble Solids — Excellent for Purees, Ketchup & Sauces',
      confidenceScore: 95,
    },
    ingredients: [
      { id: 'ing-tomato-whole', name: 'Fresh Whole Tomatoes (100%)', category: 'Whole Food', purpose: 'Primary crop yield.', description: 'Vine-ripened farm fresh tomatoes.' },
      { id: 'ing-lycopene', name: 'Natural Lycopene', category: 'Whole Food', purpose: 'Phytonutrient antioxidant.', description: 'Natural tomato lycopene.' },
    ],
  },

  // 3. Spinach (Palak - Leafy Veg)
  {
    id: 'prod-agri-03-leafy',
    name: 'Fresh Palak (Spinach)',
    brand: 'Farm Direct',
    category: 'Fresh Produce',
    subtitle: 'Tender Green Leafy Crop',
    packageStyle: { accentColor: '#10B981', shape: 'pouch', tagline: 'HIGH PERISHABLE' },
    position: { x: 42, y: 22, scale: 1.2, rotation: -4, depth: 2 },
    nutrition: { calories: 23, sugar: 0.4, protein: 2.9, fat: 0.4, saturatedFat: 0.1, sodium: 79, carbs: 3.6 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Niphad, Nashik',
      visualQuality: 'Crisp vibrant green leaves, un-wilted stems',
      visibleDefects: 'None',
      estimatedGrade: 'Grade A (Fresh Retail)',
      freshnessIndicator: '98% Harvest Freshness (Day 1)',
      processingSuitability: 'Ideal for Immediate Fresh Sale & Dehydration Units',
      confidenceScore: 98,
    },
    ingredients: [
      { id: 'ing-palak-leaf', name: 'Fresh Organic Spinach Leaves (100%)', category: 'Whole Food', purpose: 'Nutrient-rich leafy veg.', description: 'Harvested spinach foliage.' },
    ],
  },

  // 4. Sona Masoori Rice (Agricultural Grain)
  {
    id: 'prod-agri-03',
    name: 'Sona Masoori Raw Rice',
    brand: 'Agri Harvest',
    category: 'Grains & Pulses',
    subtitle: 'Medium-Grain Lightweight Aromatic Rice',
    packageStyle: { accentColor: '#10B981', shape: 'pouch', tagline: 'GRAIN PURITY 99%' },
    position: { x: 30, y: 44, scale: 1.05, rotation: 8, depth: 2 },
    nutrition: { calories: 130, sugar: 0.1, protein: 2.7, fat: 0.3, saturatedFat: 0.1, sodium: 1, carbs: 28.2 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Kurnool, Andhra Pradesh',
      visualQuality: 'Translucent white medium grains, uniform length',
      visibleDefects: '<0.5% chalky/damaged grains',
      estimatedGrade: 'Grade A Premium Grain',
      freshnessIndicator: 'Milled Batch (Moisture 12.5%)',
      processingSuitability: 'Ideal for Flakes (Poha), Puffed Rice & Daily Cooking',
      confidenceScore: 98,
    },
    ingredients: [
      { id: 'ing-raw-rice', name: 'Whole Grain Sona Masoori Rice (100%)', category: 'Grain', purpose: 'Staple grain crop.', description: 'Milled raw rice grains.' },
    ],
  },

  // 5. Sharbati Whole Wheat (Agricultural Grain)
  {
    id: 'prod-agri-04',
    name: 'Sharbati Whole Wheat Grain',
    brand: 'Agri Harvest',
    category: 'Grains & Pulses',
    subtitle: 'Golden Amber High-Protein Wheat Crop',
    packageStyle: { accentColor: '#D97706', shape: 'box', tagline: 'HIGH PROTEIN' },
    position: { x: 68, y: 35, scale: 1.0, rotation: 12, depth: 1 },
    nutrition: { calories: 340, sugar: 0.4, protein: 12.5, fat: 1.8, saturatedFat: 0.3, sodium: 2, carbs: 71.0 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Sehore, Madhya Pradesh',
      visualQuality: 'Heavy golden lustrous kernels, uniform size',
      visibleDefects: 'No foreign matter / insect damage',
      estimatedGrade: 'Grade A Premium',
      freshnessIndicator: '98% Grain Integrity (Sun-dried)',
      processingSuitability: 'High Gluten Quality — Superior for Whole Wheat Flour (Atta)',
      confidenceScore: 96,
    },
    ingredients: [
      { id: 'ing-sharbati-wheat', name: 'Sharbati Whole Wheat Kernels (100%)', category: 'Grain', purpose: 'Flour milling grain.', description: 'Raw harvested wheat grain.' },
    ],
  },

  // 6. Nashik Red Onion (Agricultural Produce)
  {
    id: 'prod-agri-05',
    name: 'Nashik Red Onion',
    brand: 'Farm Direct',
    category: 'Fresh Produce',
    subtitle: 'Pungent Medium-Sized Storage Onions',
    packageStyle: { accentColor: '#8B5CF6', shape: 'pouch', tagline: 'HIGH SHELF-LIFE' },
    position: { x: 86, y: 52, scale: 1.15, rotation: 15, depth: 1 },
    nutrition: { calories: 40, sugar: 4.2, protein: 1.1, fat: 0.1, saturatedFat: 0.0, sodium: 4, carbs: 9.3 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Nashik, Maharashtra',
      visualQuality: 'Tight purple-red outer neck, firm dry outer skin',
      visibleDefects: 'Minor papery scale dryness (<2%)',
      estimatedGrade: 'Grade A Storage Quality',
      freshnessIndicator: '92% Curing Maturity',
      processingSuitability: 'High Dry Matter — Ideal for Dehydration, Powder & Flakes',
      confidenceScore: 94,
    },
    ingredients: [
      { id: 'ing-red-onion', name: 'Fresh Nashik Red Onions (100%)', category: 'Whole Food', purpose: 'Raw vegetable crop.', description: 'Harvested cured red onion bulbs.' },
    ],
  },

  // 7. Salem Turmeric Rhizome (Spices & Cash Crops)
  {
    id: 'prod-agri-06',
    name: 'Salem Curcumin-Rich Turmeric',
    brand: 'Agri Spices',
    category: 'Spices & Cash Crops',
    subtitle: 'Deep Yellow High-Curcumin Dried Rhizomes',
    packageStyle: { accentColor: '#F59E0B', shape: 'cylinder', tagline: 'CURCUMIN >4.5%' },
    position: { x: 48, y: 72, scale: 1.0, rotation: 5, depth: 2 },
    nutrition: { calories: 354, sugar: 3.2, protein: 7.8, fat: 9.9, saturatedFat: 2.9, sodium: 38, carbs: 64.9 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Salem, Tamil Nadu',
      visualQuality: 'Bright orange-yellow interior, hard fracture structure',
      visibleDefects: 'None',
      estimatedGrade: 'Grade A Commercial',
      freshnessIndicator: 'Fully Dried (Moisture <10%)',
      processingSuitability: 'High Extractability — Ideal for Spice Grinding & Curcumin Extraction',
      confidenceScore: 96,
    },
    ingredients: [
      { id: 'ing-turmeric-rhizome', name: 'Cured Dried Turmeric Rhizomes (100%)', category: 'Whole Food', purpose: 'Spice & medicinal crop.', description: 'Dried Curcuma longa rhizomes.' },
    ],
  },

  // 8. Kufri Jyoti Potato (Agricultural Produce)
  {
    id: 'prod-agri-07',
    name: 'Kufri Jyoti Ware Potato',
    brand: 'Farm Direct',
    category: 'Fresh Produce',
    subtitle: 'Oval Smooth White-Fleshed Potatoes',
    packageStyle: { accentColor: '#D97706', shape: 'box', tagline: 'CHIPPING GRADE' },
    position: { x: 74, y: 80, scale: 0.95, rotation: -8, depth: 3 },
    nutrition: { calories: 77, sugar: 0.8, protein: 2.0, fat: 0.1, saturatedFat: 0.0, sodium: 6, carbs: 17.5 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Jalandhar, Punjab',
      visualQuality: 'Smooth shallow eyes, firm tuber density',
      visibleDefects: '<1% skin rub mark',
      estimatedGrade: 'Grade A Processing',
      freshnessIndicator: '95% Fresh Harvest',
      processingSuitability: 'Low Reducing Sugars — Excellent for Potato Chips & Wafers',
      confidenceScore: 95,
    },
    ingredients: [
      { id: 'ing-raw-potato', name: 'Fresh Ware Potatoes (100%)', category: 'Whole Food', purpose: 'Tuber crop yield.', description: 'Harvested fresh potatoes.' },
    ],
  },

  // 9. Yellow Soybean (Agricultural Grain)
  {
    id: 'prod-agri-08',
    name: 'Yellow Soybean Seeds',
    brand: 'Agri Harvest',
    category: 'Grains & Pulses',
    subtitle: 'High-Protein High-Oil Yellow Soybeans',
    packageStyle: { accentColor: '#10B981', shape: 'pouch', tagline: 'OIL CONTENT 20%' },
    position: { x: 62, y: 62, scale: 1.0, rotation: 6, depth: 2 },
    nutrition: { calories: 446, sugar: 7.3, protein: 36.5, fat: 19.9, saturatedFat: 2.9, sodium: 2, carbs: 30.2 },
    agriData: {
      isAgriProduce: true,
      originRegion: 'Ujjain, Madhya Pradesh',
      visualQuality: 'Uniform round yellow seeds, unblemished seed coat',
      visibleDefects: 'None',
      estimatedGrade: 'Grade A Oilseed',
      freshnessIndicator: '97% Seed Integrity',
      processingSuitability: 'High Oil & Protein — Ideal for Soy Oil Extraction, Soya Chunk & Tofu',
      confidenceScore: 96,
    },
    ingredients: [
      { id: 'ing-raw-soybean', name: 'Raw Yellow Soybean Grain (100%)', category: 'Grain', purpose: 'Oilseed crop.', description: 'Harvested soybean seeds.' },
    ],
  },
];
