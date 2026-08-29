import type { Product, UserProfile } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  allergies: ['Lactose', 'Peanut'],
  diets: ['Vegetarian', 'Low Sugar'],
  avoidIngredients: ['Palm Oil', 'Maltodextrin'],
};

export const ALLERGEN_OPTIONS = [
  'Milk',
  'Lactose',
  'Peanut',
  'Tree Nut',
  'Almond',
  'Cashew',
  'Walnut',
  'Egg',
  'Soy',
  'Gluten',
  'Wheat',
  'Shellfish',
  'Fish',
  'Sesame',
  'Mustard',
  'Sulfites',
  'Celery',
  'Lupin',
  'Molluscs',
  'Corn',
];

export const DIET_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Jain',
  'Halal',
  'Low Sugar',
  'Low Sodium',
  'Low Fat',
  'Keto',
  'Diabetic-Friendly',
  'High Protein',
  'Low Carb',
  'Paleo',
];

export const PRESET_PROFILES: { label: string; profile: UserProfile }[] = [
  {
    label: 'Lactose Intolerant + Low Sugar',
    profile: {
      allergies: ['Lactose', 'Milk'],
      diets: ['Low Sugar'],
      avoidIngredients: ['Palm Oil'],
    },
  },
  {
    label: 'Severe Peanut & Nut Allergy',
    profile: {
      allergies: ['Peanut', 'Tree Nut', 'Almond', 'Cashew', 'Sesame'],
      diets: [],
      avoidIngredients: [],
    },
  },
  {
    label: 'Strict Vegan + Clean Label',
    profile: {
      allergies: ['Milk', 'Lactose', 'Egg', 'Shellfish', 'Fish'],
      diets: ['Vegan', 'Vegetarian'],
      avoidIngredients: ['Palm Oil', 'Maltodextrin', 'Artificial Colors', 'High Fructose Corn Syrup'],
    },
  },
  {
    label: 'Jain Diet + Gluten Free',
    profile: {
      allergies: ['Gluten', 'Wheat'],
      diets: ['Jain', 'Vegetarian'],
      avoidIngredients: ['Garlic', 'Onion'],
    },
  },
];

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

  // 3. Sona Masoori Rice (Agricultural Grain)
  {
    id: 'prod-agri-03',
    name: 'Sona Masoori Raw Rice',
    brand: 'Agri Harvest',
    category: 'Grains & Pulses',
    subtitle: 'Medium-Grain Lightweight Aromatic Rice',
    packageStyle: { accentColor: '#10B981', shape: 'pouch', tagline: 'GRAIN PURITY 99%' },
    position: { x: 42, y: 22, scale: 1.2, rotation: -4, depth: 2 },
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

  // 4. Sharbati Whole Wheat (Agricultural Grain)
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
      { id: 'ing-sharbati-wheat', name: 'Sharbati Whole Wheat Kernels (100%)', category: 'Grain', purpose: 'Flour milling grain.', description: 'Raw harvested wheat grain.', flaggedDiets: ['Gluten', 'Wheat'] },
    ],
  },

  // 5. Haldiram's Aloo Bhujia (Processed Food)
  {
    id: 'prod-01',
    name: 'Aloo Bhujia',
    brand: "Haldiram's",
    category: 'Snack',
    subtitle: 'Crispy Potato & Chickpea Noodle Snack',
    packageStyle: { accentColor: '#E53E3E', shape: 'pouch', tagline: 'ALOO BHUJIA CRISP' },
    position: { x: 20, y: 55, scale: 1.05, rotation: -10, depth: 2 },
    nutrition: { calories: 285, sugar: 1.2, protein: 5.2, fat: 19.4, saturatedFat: 6.2, sodium: 580, carbs: 24.1 },
    ingredients: [
      { id: 'ing-potato-h', name: 'Dehydrated Potato Flakes (44%)', category: 'Whole Food', purpose: 'Crispy potato base.', description: 'Dehydrated russet potato pulp.' },
      { id: 'ing-besan-h', name: 'Gram Flour (Besan 22%)', category: 'Grain', purpose: 'Dough binder and crispness.', description: 'Milled chana dal chickpea flour.' },
      { id: 'ing-palm-oil-h', name: 'Edible Vegetable Oil (Palmolein)', category: 'Fat/Oil', purpose: 'Frying medium.', description: 'Refined palm olein.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-peanuts-h', name: 'Peanut Oil Traces', category: 'Allergen', purpose: 'Flavor enhancer.', description: 'Groundnut oil.', flaggedDiets: ['Peanut'] },
      { id: 'ing-spices-h', name: 'Mint, Red Chili, Amchur & Black Salt', category: 'Whole Food', purpose: 'Tangy spice seasoning.', description: 'Ground Pudina, Kala Namak and spices.', flaggedDiets: ['Low Sodium'] },
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
      { id: 'ing-red-onion', name: 'Fresh Nashik Red Onions (100%)', category: 'Whole Food', purpose: 'Raw vegetable crop.', description: 'Harvested cured red onion bulbs.', flaggedDiets: ['Jain'] },
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

  // 8. Parle-G (Processed Food)
  {
    id: 'prod-08',
    name: 'Original Glucose Biscuits',
    brand: 'Parle-G',
    category: 'Cookies',
    subtitle: 'India’s Favorite Glucose Milk Biscuits',
    packageStyle: { accentColor: '#D69E2E', shape: 'box', tagline: 'GLUCOSE BISCUIT' },
    position: { x: 10, y: 78, scale: 1.1, rotation: -12, depth: 1 },
    nutrition: { calories: 225, sugar: 14.5, protein: 3.3, fat: 6.8, saturatedFat: 3.1, sodium: 115, carbs: 38.0 },
    ingredients: [
      { id: 'ing-wheat-parle', name: 'Refined Wheat Flour (Maida 67%)', category: 'Grain', purpose: 'Biscuit dough matrix.', description: 'Milled wheat flour.', flaggedDiets: ['Gluten', 'Wheat'] },
      { id: 'ing-sugar-parle', name: 'Cane Sugar & Invert Sugar Syrup (25%)', category: 'Sweetener', purpose: 'Sweetness and golden crust.', description: 'Sucrose syrup.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-oil-parle', name: 'Refined Palm Oil', category: 'Fat/Oil', purpose: 'Shortening.', description: 'Palm oil.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-milk-parle', name: 'Milk Solids (Skimmed Milk Powder)', category: 'Dairy', purpose: 'Milk flavor.', description: 'Skimmed milk powder.', flaggedDiets: ['Lactose', 'Milk', 'Vegan'] },
    ],
  },

  // 9. Kufri Jyoti Potato (Agricultural Produce)
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

  // 10. Amul Taaza Milk (Processed Dairy)
  {
    id: 'prod-13',
    name: 'Taaza Toned Milk',
    brand: 'Amul',
    category: 'Dairy',
    subtitle: 'Fresh Homogenized & UHT Toned Milk',
    packageStyle: { accentColor: '#3182CE', shape: 'pouch', tagline: 'PURE TONED MILK' },
    position: { x: 30, y: 44, scale: 1.05, rotation: 8, depth: 2 },
    nutrition: { calories: 118, sugar: 9.4, protein: 6.2, fat: 6.0, saturatedFat: 3.8, sodium: 100, carbs: 9.4 },
    ingredients: [
      { id: 'ing-toned-milk', name: 'Toned Bovine Milk (3.0% Fat, 8.5% SNF)', category: 'Dairy', purpose: 'Calcium, protein, and hydration base.', description: 'Homogenized pasteurized milk.', flaggedDiets: ['Lactose', 'Milk', 'Vegan'] },
      { id: 'ing-lactose-amul', name: 'Natural Milk Lactose', category: 'Dairy', purpose: 'Dairy disaccharide sugar.', description: 'Lactose.', flaggedDiets: ['Lactose', 'Milk'] },
    ],
  },

  // 11. Paper Boat Aam Panna (Processed Beverage)
  {
    id: 'prod-20',
    name: 'Raw Mango Aam Panna Drink',
    brand: 'Paper Boat',
    category: 'Beverage',
    subtitle: 'Traditional Raw Green Mango Drink with Cumin & Mint',
    packageStyle: { accentColor: '#38A169', shape: 'pouch', tagline: 'RAW MANGO PANNA' },
    position: { x: 55, y: 15, scale: 1.0, rotation: -5, depth: 2 },
    nutrition: { calories: 112, sugar: 24.2, protein: 0.2, fat: 0.0, saturatedFat: 0.0, sodium: 190, carbs: 27.5 },
    ingredients: [
      { id: 'ing-raw-mango', name: 'Green Raw Mango Pulp (Kachhi Kairi 14%)', category: 'Whole Food', purpose: 'Tangy digestive green mango juice.', description: 'Unripe mango pulp.' },
      { id: 'ing-sugar-pb', name: 'Sugar', category: 'Sweetener', purpose: 'Sweetness.', description: 'Cane sugar.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-black-salt-pb', name: 'Black Salt & Roasted Cumin (Jeera)', category: 'Whole Food', purpose: 'Traditional Indian digestive spices.', description: 'Kala Namak & Jeera.' },
    ],
  },

  // 12. Maggi 2-Minute Masala Noodles (Processed Food)
  {
    id: 'prod-12',
    name: '2-Minute Masala Instant Noodles',
    brand: 'Maggi',
    category: 'Instant Noodles',
    subtitle: 'Classic Indian Spiced Wheat Noodles',
    packageStyle: { accentColor: '#E53E3E', shape: 'box', tagline: '2-MINUTE MASALA' },
    position: { x: 78, y: 22, scale: 1.2, rotation: 10, depth: 1 },
    nutrition: { calories: 310, sugar: 1.8, protein: 6.8, fat: 12.5, saturatedFat: 5.6, sodium: 850, carbs: 43.0 },
    ingredients: [
      { id: 'ing-flour-maggi', name: 'Refined Wheat Flour (Maida 82%)', category: 'Grain', purpose: 'Noodle dough base.', description: 'Wheat flour.', flaggedDiets: ['Gluten', 'Wheat'] },
      { id: 'ing-palm-maggi', name: 'Palm Oil', category: 'Fat/Oil', purpose: 'Flash frying noodles.', description: 'Palm oil.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-masala-maggi', name: 'Tastemaker Spice Mix (Coriander, Cumin, Turmeric, Chili, Garlic, Onion)', category: 'Additive', purpose: 'Iconic savory noodle broth.', description: 'Spice blend.', flaggedDiets: ['Jain'] },
      { id: 'ing-salt-maggi', name: 'Iodized Salt & Wheat Gluten', category: 'Additive', purpose: 'Broth seasoning & texture.', description: 'Salt.', flaggedDiets: ['Low Sodium', 'Gluten', 'Wheat'] },
    ],
  },

  // 13. Lay's Classic Salted
  {
    id: 'prod-04',
    name: 'Classic Salted Potato Chips',
    brand: "Lay's",
    category: 'Chips',
    subtitle: 'Crispy Sliced Golden Potato Chips',
    packageStyle: { accentColor: '#F59E0B', shape: 'pouch', tagline: 'CLASSIC SALTED' },
    position: { x: 15, y: 38, scale: 1.1, rotation: -4, depth: 1 },
    nutrition: { calories: 268, sugar: 0.5, protein: 3.2, fat: 17.0, saturatedFat: 7.2, sodium: 290, carbs: 26.5 },
    ingredients: [
      { id: 'ing-potato-lays', name: 'Selected Potatoes (89%)', category: 'Whole Food', purpose: 'Primary starch chip base.', description: 'Sliced whole potatoes.' },
      { id: 'ing-oil-lays', name: 'Edible Vegetable Oil (Palmolein)', category: 'Fat/Oil', purpose: 'Frying medium.', description: 'Refined palm oil.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-salt-lays', name: 'Iodized Salt (1.2%)', category: 'Additive', purpose: 'Simple sea salt seasoning.', description: 'Purified sodium chloride.' },
    ],
  },

  // 14. Yellow Soybean (Agricultural Grain)
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
      { id: 'ing-raw-soybean', name: 'Raw Yellow Soybean Grain (100%)', category: 'Grain', purpose: 'Oilseed crop.', description: 'Harvested soybean seeds.', flaggedDiets: ['Soy'] },
    ],
  },

  // 15. Kissan Tomato Ketchup (Processed Food)
  {
    id: 'prod-17',
    name: 'Fresh Tomato Ketchup',
    brand: 'Kissan',
    category: 'Sauce',
    subtitle: '100% Real Juicy Red Tomato Sauce',
    packageStyle: { accentColor: '#E53E3E', shape: 'bottle', tagline: '100% REAL TOMATOES' },
    position: { x: 35, y: 85, scale: 1.05, rotation: -8, depth: 3 },
    nutrition: { calories: 28, sugar: 6.8, protein: 0.3, fat: 0.1, saturatedFat: 0.0, sodium: 160, carbs: 7.2 },
    ingredients: [
      { id: 'ing-tomato-kissan', name: 'Tomato Paste (100% Vine Ripened)', category: 'Whole Food', purpose: 'Rich savory tomato sauce base.', description: 'Concentrated tomato pulp.' },
      { id: 'ing-sugar-kissan', name: 'Cane Sugar', category: 'Sweetener', purpose: 'Sweetness.', description: 'Sucrose.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-vinegar-kissan', name: 'Acidity Regulator (Acetic Acid)', category: 'Additive', purpose: 'Tanginess & preservative.', description: 'Vinegar acid.' },
      { id: 'ing-preservative-kissan', name: 'Sodium Benzoate (INS 211)', category: 'Preservative', purpose: 'Prevents spoilage.', description: 'Preservative salt.' },
    ],
  },

  // 16. Cadbury Dairy Milk Silk (Processed Chocolate)
  {
    id: 'prod-16',
    name: 'Dairy Milk Silk Chocolate',
    brand: 'Cadbury',
    category: 'Chocolate',
    subtitle: 'Smooth & Creamy Pure Milk Chocolate Bar',
    packageStyle: { accentColor: '#553C9A', shape: 'bar', tagline: 'SILK MILK CHOCOLATE' },
    position: { x: 80, y: 35, scale: 1.15, rotation: -12, depth: 1 },
    nutrition: { calories: 270, sugar: 28.5, protein: 3.8, fat: 16.5, saturatedFat: 10.2, sodium: 65, carbs: 29.5 },
    ingredients: [
      { id: 'ing-milk-cad', name: 'Milk Solids (Whey & Whole Powder 20%)', category: 'Dairy', purpose: 'Ultra creamy smooth silk texture.', description: 'Dehydrated dairy.', flaggedDiets: ['Lactose', 'Milk', 'Vegan'] },
      { id: 'ing-sugar-cad', name: 'Cane Sugar', category: 'Sweetener', purpose: 'Sweetness.', description: 'Sucrose.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-cocoa-cad', name: 'Cocoa Butter & Cocoa Solids (24%)', category: 'Whole Food', purpose: 'Pure chocolate mass.', description: 'Cacao butter.' },
      { id: 'ing-emuls-cad', name: 'Soy Lecithin (INS 322)', category: 'Emulsifier', purpose: 'Texture stabilizer.', description: 'Soy lecithin.', flaggedDiets: ['Soy'] },
    ],
  },
];
