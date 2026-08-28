import type { AnalysisResult, IngredientAnalysisItem, Product, StatusLevel, UserProfile } from './types';

export function analyzeProduct(profile: UserProfile, product: Product): AnalysisResult {
  const ingredientAnalysis: IngredientAnalysisItem[] = [];
  let conflictsCount = 0;
  let concernsCount = 0;
  let compatibleCount = 0;

  const normalizedAllergies = profile.allergies.map((a) => a.toLowerCase().trim());
  const normalizedDiets = profile.diets.map((d) => d.toLowerCase().trim());
  const normalizedAvoid = profile.avoidIngredients.map((av) => av.toLowerCase().trim());

  product.ingredients.forEach((ing) => {
    let status: StatusLevel = 'GREY';
    let matchType: IngredientAnalysisItem['matchType'] = undefined;
    const flaggedBy: string[] = [];
    let reason: string | undefined = undefined;

    const ingNameLower = ing.name.toLowerCase();
    const ingDescLower = ing.description.toLowerCase();
    const ingFlaggedDietsLower = (ing.flaggedDiets || []).map((fd) => fd.toLowerCase());

    // 1. Check Allergies
    for (const allergy of normalizedAllergies) {
      if (
        ingNameLower.includes(allergy) ||
        ingDescLower.includes(allergy) ||
        ingFlaggedDietsLower.includes(allergy) ||
        (allergy === 'milk' && ingNameLower.includes('lactose')) ||
        (allergy === 'lactose' && (ingNameLower.includes('milk') || ingNameLower.includes('lactose'))) ||
        (allergy === 'tree nut' && (ingNameLower.includes('almond') || ingNameLower.includes('hazelnut') || ingNameLower.includes('cashew') || ingNameLower.includes('walnut'))) ||
        (allergy === 'peanut' && ingNameLower.includes('peanut')) ||
        (allergy === 'egg' && (ingNameLower.includes('egg') || ingNameLower.includes('albumen'))) ||
        (allergy === 'gluten' && (ingNameLower.includes('wheat') || ingNameLower.includes('barley') || ingNameLower.includes('rye') || ingNameLower.includes('oat'))) ||
        (allergy === 'shellfish' && (ingNameLower.includes('shrimp') || ingNameLower.includes('crab') || ingNameLower.includes('lobster') || ingNameLower.includes('shellfish'))) ||
        (allergy === 'fish' && (ingNameLower.includes('fish') || ingNameLower.includes('salmon') || ingNameLower.includes('tuna'))) ||
        (allergy === 'soy' && ingNameLower.includes('soy')) ||
        (allergy === 'sesame' && ingNameLower.includes('sesame'))
      ) {
        status = 'RED';
        matchType = 'ALLERGY';
        flaggedBy.push(profile.allergies.find((a) => a.toLowerCase() === allergy) || allergy);
        reason = `Direct conflict with your ${allergy} allergen watchlist profile.`;
        break;
      }
    }

    // 2. Check Explicit Avoid Ingredients
    if (status !== 'RED') {
      for (const avoidItem of normalizedAvoid) {
        if (avoidItem && (ingNameLower.includes(avoidItem) || ingFlaggedDietsLower.includes(avoidItem))) {
          status = 'RED';
          matchType = 'AVOID';
          flaggedBy.push(profile.avoidIngredients.find((av) => av.toLowerCase() === avoidItem) || avoidItem);
          reason = `Matches ingredient explicitly listed on your "Ingredients to Avoid" list.`;
          break;
        }
      }
    }

    // 3. Check Dietary Restrictions
    if (status !== 'RED') {
      for (const diet of normalizedDiets) {
        if ((diet === 'vegetarian' || diet === 'vegan') && ingFlaggedDietsLower.includes('vegetarian')) {
          status = 'RED';
          matchType = 'DIET';
          flaggedBy.push(diet);
          reason = `Not suitable for a ${diet} diet.`;
          break;
        }
        if (diet === 'vegan' && (ingFlaggedDietsLower.includes('vegan') || ingFlaggedDietsLower.includes('milk') || ingFlaggedDietsLower.includes('lactose') || ingFlaggedDietsLower.includes('egg') || ingFlaggedDietsLower.includes('honey'))) {
          status = 'RED';
          matchType = 'DIET';
          flaggedBy.push('Vegan');
          reason = `Derived from animal or dairy origin, incompatible with a Vegan diet.`;
          break;
        }
        if (diet === 'jain' && ingFlaggedDietsLower.includes('jain')) {
          status = 'RED';
          matchType = 'DIET';
          flaggedBy.push('Jain');
          reason = `Contains root vegetables or non-Jain ingredients.`;
          break;
        }
      }
    }

    // 4. Low Sugar & Low Sodium checks
    if (status !== 'RED') {
      if (normalizedDiets.includes('low sugar') && ingFlaggedDietsLower.includes('low sugar')) {
        status = 'AMBER';
        matchType = 'INTOLERANCE';
        flaggedBy.push('Low Sugar');
        reason = `Added sweetener subject to your Low Sugar diet limit.`;
      } else if (normalizedDiets.includes('low sodium') && (ingNameLower.includes('salt') || ingNameLower.includes('sodium') || ingNameLower.includes('msg'))) {
        status = 'AMBER';
        matchType = 'INTOLERANCE';
        flaggedBy.push('Low Sodium');
        reason = `Sodium compound that contributes to your daily sodium limit.`;
      } else if (ing.category === 'Additive' || ing.category === 'Preservative') {
        status = 'AMBER';
        reason = `Processed food additive/preservative. Worth noting for clean eating.`;
      }
    }

    // 5. Green / Grey checks
    if (status === 'GREY') {
      if (ing.category === 'Whole Food' || ing.category === 'Grain') {
        status = 'GREEN';
        matchType = 'SAFE';
        reason = `Nutritious whole food ingredient compatible with your profile.`;
      }
    }

    if (status === 'RED') conflictsCount++;
    else if (status === 'AMBER') concernsCount++;
    else if (status === 'GREEN') compatibleCount++;

    ingredientAnalysis.push({
      ingredient: ing,
      status,
      reason,
      matchType,
      flaggedBy: flaggedBy.length > 0 ? flaggedBy : undefined,
    });
  });

  let overallStatus: AnalysisResult['overallStatus'] = 'GOOD_MATCH';
  let statusLabel = 'GOOD MATCH FOR YOU';
  let statusColor: AnalysisResult['statusColor'] = 'green';
  let summary = 'This product fits your personal food profile with no flagged conflicts.';

  if (conflictsCount > 0) {
    overallStatus = 'NOT_RECOMMENDED';
    statusLabel = 'NOT RECOMMENDED';
    statusColor = 'red';
    summary = `Contains ${conflictsCount} ingredient conflict${conflictsCount > 1 ? 's' : ''} with your personal watchlist (allergies, diet, or avoided ingredients).`;
  } else if (concernsCount > 0) {
    overallStatus = 'CAUTION';
    statusLabel = 'POTENTIAL CONCERN';
    statusColor = 'amber';
    summary = `Contains ${concernsCount} ingredient concern${concernsCount > 1 ? 's' : ''} (additives or dietary limits), but no direct allergy conflicts.`;
  }

  return {
    product,
    overallStatus,
    statusLabel,
    statusColor,
    summary,
    ingredientAnalysis,
    conflictsCount,
    concernsCount,
    compatibleCount,
  };
}
