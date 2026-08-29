import type { CropItem, FarmerProfile, MatchResult } from './agri-types';
import { MOCK_BUYERS } from './buyers-data';

export function runAgriDecisionEngine(
  farmer: FarmerProfile,
  selectedCrop: CropItem
): {
  recommendation: 'SELL NOW' | 'PRIORITY SALE' | 'PROCESSING' | 'STORAGE';
  recommendationBadgeColor: 'emerald' | 'amber' | 'blue' | 'purple';
  urgencyScore: number; // 0 - 100
  rationale: string;
  matchedBuyers: MatchResult[];
} {
  const isLeafyVeg =
    selectedCrop.category === 'Leafy Vegetable' ||
    ['spinach', 'coriander', 'methi', 'lettuce', 'fenugreek', 'palak'].some((name) =>
      selectedCrop.name.toLowerCase().includes(name)
    );

  const hasColdStorage = farmer.postHarvestFacilities.some((f) =>
    f.toLowerCase().includes('cold')
  );

  let recommendation: 'SELL NOW' | 'PRIORITY SALE' | 'PROCESSING' | 'STORAGE' = 'SELL NOW';
  let badgeColor: 'emerald' | 'amber' | 'blue' | 'purple' = 'emerald';
  let urgencyScore = 80;
  let rationale = '';

  // 1. Leafy Vegetable Perishable Rationale
  if (isLeafyVeg) {
    if (!hasColdStorage) {
      recommendation = 'SELL NOW';
      badgeColor = 'emerald';
      urgencyScore = 95;
      rationale = `Highly perishable leafy crop (${selectedCrop.name}) without cold storage facilities. Immediate sale to local buyers within ${farmer.sellingPreferences.sellingRadiusKm} km is recommended to eliminate wilting and post-harvest loss.`;
    } else {
      recommendation = 'PRIORITY SALE';
      badgeColor = 'amber';
      urgencyScore = 85;
      rationale = `Leafy vegetable (${selectedCrop.name}) requires swift cold chain dispatch within 24-48 hours. Priority sale recommended to nearby verified buyers.`;
    }
  } else if (selectedCrop.qualityGrade?.toLowerCase().includes('processing')) {
    recommendation = 'PROCESSING';
    badgeColor = 'purple';
    urgencyScore = 75;
    rationale = `Produce suitability indicates high soluble solids and processing standard. Recommended for direct supply to food processing / pulping units.`;
  } else if (hasColdStorage && selectedCrop.perishableLevel !== 'HIGH') {
    recommendation = 'STORAGE';
    badgeColor = 'blue';
    urgencyScore = 40;
    rationale = `Available cold storage infrastructure allows flexible holding for favorable market prices. Recommend storing or staggered dispatch to premium buyers.`;
  } else {
    recommendation = 'PRIORITY SALE';
    badgeColor = 'amber';
    urgencyScore = 70;
    rationale = `Harvest timing and crop volume (${selectedCrop.estimatedQtyKg} kg) favor prompt sale to verified regional buyers.`;
  }

  // 2. Rank Buyers
  const matchedBuyers: MatchResult[] = MOCK_BUYERS.map((buyer) => {
    let matchScore = 60;
    const distanceKm = buyer.distanceKm;

    // Check if buyer accepts crop
    const acceptsCrop = buyer.cropsAccepted.some(
      (c) =>
        c.toLowerCase().includes(selectedCrop.name.toLowerCase()) ||
        selectedCrop.name.toLowerCase().includes(c.toLowerCase()) ||
        (isLeafyVeg && (c.toLowerCase().includes('spinach') || c.toLowerCase().includes('leafy')))
    );

    if (acceptsCrop) matchScore += 25;
    else matchScore -= 20;

    // Distance Rationale (Extra weight for leafy vegetables)
    if (distanceKm <= buyer.procurementRadiusKm) {
      if (isLeafyVeg) {
        if (distanceKm <= 10) matchScore += 20;
        else if (distanceKm <= 25) matchScore += 10;
        else matchScore -= 15;
      } else {
        if (distanceKm <= 30) matchScore += 15;
        else matchScore += 5;
      }
    } else {
      matchScore -= 25;
    }

    // Quantity Compatibility
    let qtyMatch = 100;
    if (selectedCrop.estimatedQtyKg < buyer.minQuantityKg) {
      qtyMatch = Math.round((selectedCrop.estimatedQtyKg / buyer.minQuantityKg) * 100);
      matchScore -= 15;
    } else if (selectedCrop.estimatedQtyKg > buyer.maxQuantityKg) {
      qtyMatch = 90;
      matchScore += 5;
    } else {
      matchScore += 10;
    }

    // Verification bonus
    if (buyer.verified) matchScore += 5;

    // Normalize matchScore
    const finalScore = Math.min(99, Math.max(45, matchScore));

    return {
      buyer,
      crop: selectedCrop,
      matchScore: finalScore,
      distanceKm,
      recommendation,
      recommendationColor: badgeColor,
      urgencyReason: isLeafyVeg
        ? `${distanceKm} km away — Highly recommended for rapid 24h delivery.`
        : `${distanceKm} km away — Fits crop quantity and quality requirements.`,
      quantityMatchPercentage: qtyMatch,
    };
  })
    .sort((a, b) => b.matchScore - a.matchScore);

  return {
    recommendation,
    recommendationBadgeColor: badgeColor,
    urgencyScore,
    rationale,
    matchedBuyers,
  };
}
