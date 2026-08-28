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
  // 1. Haldiram's Aloo Bhujia (Accurate per 100g -> per 50g serving: ~285 kcal, 24g carbs, 5g protein, 19g fat, 580mg sodium)
  {
    id: 'prod-01',
    name: 'Aloo Bhujia',
    brand: "Haldiram's",
    category: 'Snack',
    subtitle: 'Crispy Potato & Chickpea Noodle Snack',
    packageStyle: { accentColor: '#E53E3E', shape: 'pouch', tagline: 'ALOO BHUJIA CRISP' },
    position: { x: 12, y: 16, scale: 1.1, rotation: -6, depth: 1 },
    nutrition: { calories: 285, sugar: 1.2, protein: 5.2, fat: 19.4, saturatedFat: 6.2, sodium: 580, carbs: 24.1 },
    ingredients: [
      { id: 'ing-potato-h', name: 'Dehydrated Potato Flakes (44%)', category: 'Whole Food', purpose: 'Crispy potato base.', description: 'Dehydrated russet potato pulp.' },
      { id: 'ing-besan-h', name: 'Gram Flour (Besan 22%)', category: 'Grain', purpose: 'Dough binder and crispness.', description: 'Milled chana dal chickpea flour.' },
      { id: 'ing-palm-oil-h', name: 'Edible Vegetable Oil (Palmolein)', category: 'Fat/Oil', purpose: 'Frying medium.', description: 'Refined palm olein.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-peanuts-h', name: 'Peanut Oil Traces', category: 'Allergen', purpose: 'Flavor enhancer.', description: 'Groundnut oil.', flaggedDiets: ['Peanut'] },
      { id: 'ing-spices-h', name: 'Mint, Red Chili, Amchur & Black Salt', category: 'Whole Food', purpose: 'Tangy spice seasoning.', description: 'Ground Pudina, Kala Namak and spices.', flaggedDiets: ['Low Sodium'] },
    ],
  },

  // 2. Haldiram's Bhujia Sev
  {
    id: 'prod-02',
    name: 'Bhujia Sev',
    brand: "Haldiram's",
    category: 'Snack',
    subtitle: 'Authentic Bikaneri Moth Bean & Besan Sev',
    packageStyle: { accentColor: '#DD6B20', shape: 'pouch', tagline: 'BIKANERI SEV' },
    position: { x: 82, y: 18, scale: 1.1, rotation: 8, depth: 1 },
    nutrition: { calories: 290, sugar: 0.8, protein: 7.1, fat: 20.2, saturatedFat: 6.5, sodium: 540, carbs: 22.4 },
    ingredients: [
      { id: 'ing-moth-b', name: 'Moth Bean Flour (Dew Bean 42%)', category: 'Grain', purpose: 'Traditional Bikaneri pulse flour.', description: 'Milled Vigna aconitifolia.' },
      { id: 'ing-besan-b', name: 'Gram Flour (Besan 28%)', category: 'Grain', purpose: 'Crisp dough base.', description: 'Chickpea flour.' },
      { id: 'ing-peanut-oil-b', name: 'Groundnut (Peanut) Oil', category: 'Fat/Oil', purpose: 'Frying oil.', description: 'Pure pressed peanut oil.', flaggedDiets: ['Peanut'] },
      { id: 'ing-spices-b', name: 'Black Pepper, Clove & Red Chili', category: 'Whole Food', purpose: 'Spicy kick.', description: 'Hand-ground spices.' },
    ],
  },

  // 3. Bikaji Bikaneri Bhujia
  {
    id: 'prod-03',
    name: 'Bikaneri Bhujia',
    brand: 'Bikaji',
    category: 'Snack',
    subtitle: 'Classic Crispy Moth Dal Sev',
    packageStyle: { accentColor: '#C53030', shape: 'pouch', tagline: 'ORIGINAL BIKANERI' },
    position: { x: 42, y: 22, scale: 1.2, rotation: -4, depth: 2 },
    nutrition: { calories: 280, sugar: 0.5, protein: 8.0, fat: 19.1, saturatedFat: 5.5, sodium: 510, carbs: 21.3 },
    ingredients: [
      { id: 'ing-moth-bik', name: 'Moth Bean Flour (46%)', category: 'Grain', purpose: 'Authentic crunchy pulse base.', description: 'Milled dew bean flour.' },
      { id: 'ing-besan-bik', name: 'Gram Flour (24%)', category: 'Grain', purpose: 'Dough matrix.', description: 'Chana dal flour.' },
      { id: 'ing-oil-bik', name: 'Edible Vegetable Oil (Cottonseed & Palm)', category: 'Fat/Oil', purpose: 'Frying medium.', description: 'Blended oil.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-salt-bik', name: 'Rock Salt & Spices', category: 'Additive', purpose: 'Seasoning.', description: 'Sendha Namak and cardamom.', flaggedDiets: ['Low Sodium'] },
    ],
  },

  // 4. Lay's Classic Salted (Accurate per 50g: ~268 kcal, 26.5g carbs, 3.2g protein, 17g fat, 290mg sodium)
  {
    id: 'prod-04',
    name: 'Classic Salted Potato Chips',
    brand: "Lay's",
    category: 'Chips',
    subtitle: 'Crispy Sliced Golden Potato Chips',
    packageStyle: { accentColor: '#F59E0B', shape: 'pouch', tagline: 'CLASSIC SALTED' },
    position: { x: 68, y: 35, scale: 1.0, rotation: 12, depth: 1 },
    nutrition: { calories: 268, sugar: 0.5, protein: 3.2, fat: 17.0, saturatedFat: 7.2, sodium: 290, carbs: 26.5 },
    ingredients: [
      { id: 'ing-potato-lays', name: 'Selected Potatoes (89%)', category: 'Whole Food', purpose: 'Primary starch chip base.', description: 'Sliced whole potatoes.' },
      { id: 'ing-oil-lays', name: 'Edible Vegetable Oil (Palmolein)', category: 'Fat/Oil', purpose: 'Frying medium.', description: 'Refined palm oil.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-salt-lays', name: 'Iodized Salt (1.2%)', category: 'Additive', purpose: 'Simple sea salt seasoning.', description: 'Purified sodium chloride.' },
    ],
  },

  // 5. Lay's Magic Masala
  {
    id: 'prod-05',
    name: 'India’s Magic Masala Chips',
    brand: "Lay's",
    category: 'Chips',
    subtitle: 'Ridged Potato Chips with Spicy Indian Masala',
    packageStyle: { accentColor: '#3182CE', shape: 'pouch', tagline: 'MAGIC MASALA' },
    position: { x: 20, y: 55, scale: 1.05, rotation: -10, depth: 2 },
    nutrition: { calories: 272, sugar: 2.1, protein: 3.4, fat: 17.2, saturatedFat: 7.4, sodium: 410, carbs: 25.8 },
    ingredients: [
      { id: 'ing-potato-mm', name: 'Selected Potatoes', category: 'Whole Food', purpose: 'Crisp potato ridges.', description: 'Sliced potatoes.' },
      { id: 'ing-oil-mm', name: 'Edible Vegetable Oil (Palmolein)', category: 'Fat/Oil', purpose: 'Frying medium.', description: 'Palm oil.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-masala-mm', name: 'Magic Masala Seasoning (Onion, Garlic, Coriander, Chili)', category: 'Additive', purpose: 'Complex savory spicy seasoning.', description: 'Dehydrated spice powders.', flaggedDiets: ['Jain'] },
      { id: 'ing-maltodextrin-mm', name: 'Maltodextrin', category: 'Additive', purpose: 'Flavor binder.', description: 'Starch derivative.', flaggedDiets: ['Maltodextrin'] },
    ],
  },

  // 6. Kurkure Masala Munch (Accurate per 50g: ~280 kcal, 28.5g carbs, 3.1g protein, 17.5g fat, 480mg sodium)
  {
    id: 'prod-06',
    name: 'Masala Munch',
    brand: 'Kurkure',
    category: 'Chips',
    subtitle: 'Crunchy Chatpata Corn & Rice Crunchy Sticks',
    packageStyle: { accentColor: '#DD6B20', shape: 'pouch', tagline: 'MASALA MUNCH' },
    position: { x: 86, y: 52, scale: 1.15, rotation: 15, depth: 1 },
    nutrition: { calories: 280, sugar: 1.8, protein: 3.1, fat: 17.5, saturatedFat: 7.8, sodium: 480, carbs: 28.5 },
    ingredients: [
      { id: 'ing-meal-kurk', name: 'Rice Meal, Corn Meal & Gram Meal', category: 'Grain', purpose: 'Extruded crunchy stick base.', description: 'Milled cereal grains.' },
      { id: 'ing-oil-kurk', name: 'Edible Vegetable Oil (Palmolein)', category: 'Fat/Oil', purpose: 'Frying medium.', description: 'Palm oil.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-masala-kurk', name: 'Masala Spice Mix (Chili Powder, Amchur, Onion, Garlic)', category: 'Additive', purpose: 'Chatpata flavor.', description: 'Dehydrated spices.', flaggedDiets: ['Jain'] },
      { id: 'ing-citric-kurk', name: 'Citric Acid (INS 330)', category: 'Additive', purpose: 'Sour acidity.', description: 'Organic acid.' },
    ],
  },

  // 7. Balaji Masala Wafers
  {
    id: 'prod-07',
    name: 'Masala Wafers',
    brand: 'Balaji Wafers',
    category: 'Chips',
    subtitle: 'Thin Cut Spicy Spiced Potato Wafers',
    packageStyle: { accentColor: '#E53E3E', shape: 'pouch', tagline: 'MASALA WAFERS' },
    position: { x: 48, y: 72, scale: 1.0, rotation: 5, depth: 2 },
    nutrition: { calories: 265, sugar: 1.1, protein: 3.0, fat: 16.2, saturatedFat: 6.8, sodium: 390, carbs: 25.0 },
    ingredients: [
      { id: 'ing-pot-bal', name: 'Fresh Farm Potatoes (88%)', category: 'Whole Food', purpose: 'Thin potato slice.', description: 'Sliced potatoes.' },
      { id: 'ing-oil-bal', name: 'Edible Palmolein Oil', category: 'Fat/Oil', purpose: 'Frying medium.', description: 'Palm oil.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-spice-bal', name: 'Red Chili, Cumin & Black Salt', category: 'Whole Food', purpose: 'Spicy seasoning.', description: 'Spices.' },
    ],
  },

  // 8. Parle-G (Accurate per 50g: ~225 kcal, 38g carbs, 14.5g sugar, 3.3g protein, 6.8g fat, 115mg sodium)
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

  // 9. Parle Hide & Seek
  {
    id: 'prod-09',
    name: 'Hide & Seek Choco Chip Cookies',
    brand: 'Parle',
    category: 'Cookies',
    subtitle: 'Rich Chocolate Chip Biscuits',
    packageStyle: { accentColor: '#742A2A', shape: 'box', tagline: 'CHOCO CHIP' },
    position: { x: 74, y: 80, scale: 0.95, rotation: -8, depth: 3 },
    nutrition: { calories: 245, sugar: 16.5, protein: 3.0, fat: 10.8, saturatedFat: 5.4, sodium: 130, carbs: 34.0 },
    ingredients: [
      { id: 'ing-wheat-hs', name: 'Wheat Flour', category: 'Grain', purpose: 'Biscuit structure.', description: 'Flour.', flaggedDiets: ['Gluten', 'Wheat'] },
      { id: 'ing-choco-chips', name: 'Chocolate Chips (Sugar, Cocoa Solids, Cocoa Butter)', category: 'Whole Food', purpose: 'Real chocolate chips.', description: 'Cocoa chips.' },
      { id: 'ing-sugar-hs', name: 'Sugar', category: 'Sweetener', purpose: 'Sweetness.', description: 'Cane sugar.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-milk-hs', name: 'Milk Solids & Soy Lecithin', category: 'Dairy', purpose: 'Creaminess & emulsifier.', description: 'Milk powder and lecithin.', flaggedDiets: ['Lactose', 'Milk', 'Vegan', 'Soy'] },
    ],
  },

  // 10. Britannia Good Day Butter
  {
    id: 'prod-10',
    name: 'Good Day Butter Cookies',
    brand: 'Britannia',
    category: 'Cookies',
    subtitle: 'Rich Butter & Cashew Nut Crunch Biscuits',
    packageStyle: { accentColor: '#ECC94B', shape: 'box', tagline: 'BUTTER COOKIES' },
    position: { x: 30, y: 44, scale: 1.05, rotation: 8, depth: 2 },
    nutrition: { calories: 255, sugar: 15.2, protein: 3.5, fat: 12.8, saturatedFat: 6.4, sodium: 140, carbs: 32.5 },
    ingredients: [
      { id: 'ing-flour-gd', name: 'Refined Wheat Flour (Maida)', category: 'Grain', purpose: 'Flaky crumb.', description: 'Wheat flour.', flaggedDiets: ['Gluten', 'Wheat'] },
      { id: 'ing-butter-gd', name: 'Butter (2.5%)', category: 'Dairy', purpose: 'Rich buttery flavor.', description: 'Creamery butter.', flaggedDiets: ['Lactose', 'Milk', 'Vegan'] },
      { id: 'ing-cashew-gd', name: 'Cashew Bits (1.8%)', category: 'Allergen', purpose: 'Nutty crunch.', description: 'Roasted cashew nuts.', flaggedDiets: ['Tree Nut', 'Cashew'] },
      { id: 'ing-sugar-gd', name: 'Sugar', category: 'Sweetener', purpose: 'Sweetness.', description: 'Sucrose.', flaggedDiets: ['Low Sugar'] },
    ],
  },

  // 11. Oreo Original
  {
    id: 'prod-11',
    name: 'Original Vanilla Cream Sandwich Biscuits',
    brand: 'Oreo',
    category: 'Cookies',
    subtitle: 'Dark Cocoa Biscuits with Rich Vanilla Filling',
    packageStyle: { accentColor: '#2B6CB0', shape: 'cylinder', tagline: 'TWIST LICK DUNK' },
    position: { x: 55, y: 15, scale: 1.0, rotation: -5, depth: 2 },
    nutrition: { calories: 235, sugar: 18.2, protein: 2.1, fat: 9.8, saturatedFat: 4.8, sodium: 170, carbs: 35.2 },
    ingredients: [
      { id: 'ing-flour-oreo', name: 'Enriched Wheat Flour', category: 'Grain', purpose: 'Dark cookie shell.', description: 'Wheat flour.', flaggedDiets: ['Gluten', 'Wheat'] },
      { id: 'ing-sugar-oreo', name: 'Sugar & Invert Sugar Syrup', category: 'Sweetener', purpose: 'Vanilla cream sweetness.', description: 'Sweetener.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-palm-oreo', name: 'Palm Oil & Canola Oil', category: 'Fat/Oil', purpose: 'Cream filling fat.', description: 'Palm fat.', flaggedDiets: ['Palm Oil'] },
      { id: 'ing-cocoa-oreo', name: 'Cocoa Processed with Alkali (4.5%)', category: 'Whole Food', purpose: 'Intense black cocoa cookie flavor.', description: 'Dutch cocoa.' },
      { id: 'ing-soy-oreo', name: 'Soy Lecithin', category: 'Emulsifier', purpose: 'Emulsion.', description: 'Soy lecithin.', flaggedDiets: ['Soy'] },
    ],
  },

  // 12. Maggi 2-Minute Masala Noodles (Accurate per single pack 70g: ~310 kcal, 43g carbs, 6.8g protein, 12.5g fat, 850mg sodium)
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

  // 13. Amul Taaza Milk (Accurate per 200ml: ~118 kcal, 9.4g carbs, 9.4g sugar (lactose), 6.2g protein, 6.0g fat, 100mg sodium)
  {
    id: 'prod-13',
    name: 'Taaza Toned Milk',
    brand: 'Amul',
    category: 'Dairy',
    subtitle: 'Fresh Homogenized & UHT Toned Milk',
    packageStyle: { accentColor: '#3182CE', shape: 'pouch', tagline: 'PURE TONED MILK' },
    position: { x: 15, y: 38, scale: 1.1, rotation: -4, depth: 1 },
    nutrition: { calories: 118, sugar: 9.4, protein: 6.2, fat: 6.0, saturatedFat: 3.8, sodium: 100, carbs: 9.4 },
    ingredients: [
      { id: 'ing-toned-milk', name: 'Toned Bovine Milk (3.0% Fat, 8.5% SNF)', category: 'Dairy', purpose: 'Calcium, protein, and hydration base.', description: 'Homogenized pasteurized milk.', flaggedDiets: ['Lactose', 'Milk', 'Vegan'] },
      { id: 'ing-lactose-amul', name: 'Natural Milk Lactose', category: 'Dairy', purpose: 'Dairy disaccharide sugar.', description: 'Lactose.', flaggedDiets: ['Lactose', 'Milk'] },
    ],
  },

  // 14. Amul Masti Buttermilk (Accurate per 200ml: ~56 kcal, 3.2g carbs, 2.2g protein, 2.2g fat, 280mg sodium)
  {
    id: 'prod-14',
    name: 'Masti Spiced Buttermilk',
    brand: 'Amul',
    category: 'Milk Drink',
    subtitle: 'Traditional Refreshing Spiced Chaas with Jeera',
    packageStyle: { accentColor: '#38A169', shape: 'pouch', tagline: 'SPICED CHAAS' },
    position: { x: 62, y: 62, scale: 1.0, rotation: 6, depth: 2 },
    nutrition: { calories: 56, sugar: 2.1, protein: 2.2, fat: 2.2, saturatedFat: 1.3, sodium: 280, carbs: 3.2 },
    ingredients: [
      { id: 'ing-chaas-amul', name: 'Cultured Skimmed Milk (Chaas)', category: 'Dairy', purpose: 'Probiotic buttermilk substrate.', description: 'Fermented milk.', flaggedDiets: ['Lactose', 'Milk', 'Vegan'] },
      { id: 'ing-jeera-amul', name: 'Roasted Cumin (Jeera) & Green Chili', category: 'Whole Food', purpose: 'Digestive seasoning.', description: 'Ground cumin.' },
      { id: 'ing-salt-amul', name: 'Rock Salt (Sendha Namak)', category: 'Additive', purpose: 'Saline balance.', description: 'Pink salt.', flaggedDiets: ['Low Sodium'] },
    ],
  },

  // 15. Mother Dairy Milk
  {
    id: 'prod-15',
    name: 'Full Cream Cow Milk',
    brand: 'Mother Dairy',
    category: 'Dairy',
    subtitle: 'Pasteurized Whole Bovine Milk',
    packageStyle: { accentColor: '#D69E2E', shape: 'pouch', tagline: 'FULL CREAM MILK' },
    position: { x: 35, y: 85, scale: 1.05, rotation: -8, depth: 3 },
    nutrition: { calories: 152, sugar: 9.8, protein: 6.4, fat: 9.0, saturatedFat: 5.6, sodium: 110, carbs: 9.8 },
    ingredients: [
      { id: 'ing-whole-md', name: 'Full Cream Pasteurized Bovine Milk (6.0% Fat)', category: 'Dairy', purpose: 'Calcium & fat rich whole dairy.', description: 'Whole cow milk.', flaggedDiets: ['Lactose', 'Milk', 'Vegan'] },
      { id: 'ing-lactose-md', name: 'Milk Lactose', category: 'Dairy', purpose: 'Natural dairy sugars.', description: 'Lactose.', flaggedDiets: ['Lactose', 'Milk'] },
    ],
  },

  // 16. Cadbury Dairy Milk Silk (Accurate per 50g: ~270 kcal, 28.5g sugar, 3.8g protein, 16.5g fat, 65mg sodium)
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

  // 17. Kissan Tomato Ketchup
  {
    id: 'prod-17',
    name: 'Fresh Tomato Ketchup',
    brand: 'Kissan',
    category: 'Sauce',
    subtitle: '100% Real Juicy Red Tomato Sauce',
    packageStyle: { accentColor: '#E53E3E', shape: 'bottle', tagline: '100% REAL TOMATOES' },
    position: { x: 25, y: 70, scale: 0.95, rotation: 6, depth: 2 },
    nutrition: { calories: 28, sugar: 6.8, protein: 0.3, fat: 0.1, saturatedFat: 0.0, sodium: 160, carbs: 7.2 },
    ingredients: [
      { id: 'ing-tomato-kissan', name: 'Tomato Paste (100% Vine Ripened)', category: 'Whole Food', purpose: 'Rich savory tomato sauce base.', description: 'Concentrated tomato pulp.' },
      { id: 'ing-sugar-kissan', name: 'Cane Sugar', category: 'Sweetener', purpose: 'Sweetness.', description: 'Sucrose.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-vinegar-kissan', name: 'Acidity Regulator (Acetic Acid)', category: 'Additive', purpose: 'Tanginess & preservative.', description: 'Vinegar acid.' },
      { id: 'ing-preservative-kissan', name: 'Sodium Benzoate (INS 211)', category: 'Preservative', purpose: 'Prevents spoilage.', description: 'Preservative salt.' },
    ],
  },

  // 18. Coca-Cola Original (Accurate per 330ml can: ~139 kcal, 35g sugar, 0g protein, 0g fat, 25mg sodium)
  {
    id: 'prod-18',
    name: 'Original Taste Carbonated Beverage',
    brand: 'Coca-Cola',
    category: 'Soft Drink',
    subtitle: 'Classic Sparkling Caramel Cola',
    packageStyle: { accentColor: '#E53E3E', shape: 'can', tagline: 'REAL REFRESHMENT' },
    position: { x: 60, y: 45, scale: 1.0, rotation: -6, depth: 2 },
    nutrition: { calories: 139, sugar: 35.0, protein: 0.0, fat: 0.0, saturatedFat: 0.0, sodium: 25, carbs: 35.0 },
    ingredients: [
      { id: 'ing-water-coke', name: 'Carbonated Water', category: 'Whole Food', purpose: 'Carbonated sparkling base.', description: 'Purified carbonated water.' },
      { id: 'ing-sugar-coke', name: 'Cane Sugar (10.6%)', category: 'Sweetener', purpose: 'Sweet flavor.', description: 'Sugar sweetener.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-caramel-coke', name: 'Caramel Color (Class IV - INS 150d)', category: 'Additive', purpose: 'Dark brown cola coloring.', description: 'Caramel color.' },
      { id: 'ing-acid-coke', name: 'Phosphoric Acid & Caffeine', category: 'Additive', purpose: 'Tart acidity and stimulant.', description: 'Acid and caffeine.' },
    ],
  },

  // 19. Thums Up Charged
  {
    id: 'prod-19',
    name: 'Charged Strong Cola',
    brand: 'Thums Up',
    category: 'Soft Drink',
    subtitle: 'Strong Fizzy Spicy Indian Cola',
    packageStyle: { accentColor: '#1A202C', shape: 'can', tagline: 'TASTE THE THUNDER' },
    position: { x: 90, y: 70, scale: 1.05, rotation: 12, depth: 1 },
    nutrition: { calories: 144, sugar: 36.0, protein: 0.0, fat: 0.0, saturatedFat: 0.0, sodium: 30, carbs: 36.0 },
    ingredients: [
      { id: 'ing-water-tu', name: 'Carbonated Water', category: 'Whole Food', purpose: 'High carbonation fizz.', description: 'Fizzy artesian water.' },
      { id: 'ing-sugar-tu', name: 'Sugar (10.9%)', category: 'Sweetener', purpose: 'Sweetness.', description: 'Cane sugar.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-caffeine-tu', name: 'Caffeine (145mg/L) & Natural Cola Flavors', category: 'Additive', purpose: 'Strong spicy punch stimulant.', description: 'Caffeine.' },
    ],
  },

  // 20. Paper Boat Aam Panna
  {
    id: 'prod-20',
    name: 'Raw Mango Aam Panna Drink',
    brand: 'Paper Boat',
    category: 'Beverage',
    subtitle: 'Traditional Raw Green Mango Drink with Cumin & Mint',
    packageStyle: { accentColor: '#38A169', shape: 'pouch', tagline: 'RAW MANGO PANNA' },
    position: { x: 12, y: 90, scale: 1.0, rotation: -5, depth: 2 },
    nutrition: { calories: 112, sugar: 24.2, protein: 0.2, fat: 0.0, saturatedFat: 0.0, sodium: 190, carbs: 27.5 },
    ingredients: [
      { id: 'ing-raw-mango', name: 'Green Raw Mango Pulp (Kachhi Kairi 14%)', category: 'Whole Food', purpose: 'Tangy digestive green mango juice.', description: 'Unripe mango pulp.' },
      { id: 'ing-sugar-pb', name: 'Sugar', category: 'Sweetener', purpose: 'Sweetness.', description: 'Cane sugar.', flaggedDiets: ['Low Sugar'] },
      { id: 'ing-black-salt-pb', name: 'Black Salt & Roasted Cumin (Jeera)', category: 'Whole Food', purpose: 'Traditional Indian digestive spices.', description: 'Kala Namak & Jeera.' },
    ],
  },

  // 21. Yoga Bar Protein Bar
  {
    id: 'prod-21',
    name: '20g Whey Protein Bar',
    brand: 'Yoga Bar',
    category: 'Protein Bar',
    subtitle: '20g Whey Isolate + Almond Fudge Crunch',
    packageStyle: { accentColor: '#D69E2E', shape: 'bar', tagline: '20G PROTEIN BAR' },
    position: { x: 75, y: 90, scale: 1.1, rotation: 8, depth: 1 },
    nutrition: { calories: 260, sugar: 4.2, protein: 20.0, fat: 8.2, saturatedFat: 2.1, sodium: 160, carbs: 22.0 },
    ingredients: [
      { id: 'ing-whey-yb', name: 'Whey Protein Isolate & Concentrate', category: 'Dairy', purpose: 'Complete fast-acting protein.', description: 'Whey protein.', flaggedDiets: ['Lactose', 'Milk', 'Vegan'] },
      { id: 'ing-almonds-yb', name: 'Almond Butter & Whole Almonds (18%)', category: 'Allergen', purpose: 'Healthy fats & crunch.', description: 'Almonds.', flaggedDiets: ['Tree Nut', 'Almond'] },
      { id: 'ing-fiber-yb', name: 'Prebiotic Dietary Fiber (Chicory Root FOS)', category: 'Whole Food', purpose: 'Gut fiber.', description: 'Chicory root fiber.' },
    ],
  },
];
