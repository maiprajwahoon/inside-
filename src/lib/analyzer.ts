import type { AnalysisResult, IngredientAnalysisItem, Product, UserProfile } from './types';

export function analyzeProduct(_profile: UserProfile, product: Product): AnalysisResult {
  const ingredientAnalysis: IngredientAnalysisItem[] = [];

  product.ingredients.forEach((ing) => {
    ingredientAnalysis.push({
      ingredient: ing,
      status: 'GREEN',
      reason: 'Verified natural crop component / whole agricultural produce.',
      matchType: 'SAFE',
    });
  });

  const estimatedGrade = product.agriData?.estimatedGrade || 'Grade A Standard';
  const isExportGrade = estimatedGrade.toLowerCase().includes('export');
  const isProcessingGrade = estimatedGrade.toLowerCase().includes('processing');

  let overallStatus: AnalysisResult['overallStatus'] = 'GOOD_MATCH';
  let statusLabel = '🟢 GRADE A EXPORT QUALITY';
  let statusColor: AnalysisResult['statusColor'] = 'green';
  let summary = 'High-grade agricultural produce with optimal visual quality, firm structure, and high market value.';

  if (isExportGrade) {
    overallStatus = 'GOOD_MATCH';
    statusLabel = '🟢 GRADE A EXPORT QUALITY';
    statusColor = 'green';
    summary = `Verified ${product.name} meeting international export standards with ${product.agriData?.freshnessIndicator || 'high freshness'}.`;
  } else if (isProcessingGrade) {
    overallStatus = 'CAUTION';
    statusLabel = '🟣 PROCESSING GRADE';
    statusColor = 'amber';
    summary = `Optimal for food processing, pulping, ketchup, and value-added manufacturing.`;
  } else {
    overallStatus = 'GOOD_MATCH';
    statusLabel = '🟡 DIRECT RETAIL STANDARD';
    statusColor = 'green';
    summary = `Fresh agricultural produce suitable for immediate local retail and wholesale distribution.`;
  }

  return {
    product,
    overallStatus,
    statusLabel,
    statusColor,
    summary,
    ingredientAnalysis,
    conflictsCount: 0,
    concernsCount: 0,
    compatibleCount: ingredientAnalysis.length,
  };
}
