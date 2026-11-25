import { GarmentMeasurements, ShoeMeasurements, MeasurementUnit } from '../types';

export type BodyBuild = 'slim' | 'tailored' | 'relaxed';

export interface AutoSuggestParams {
  heightCm: number;
  weightKg: number;
  build: BodyBuild;
  garmentType: 'senator' | 'kaftan' | 'agbada' | 'two-piece' | 'corporate-shoe' | 'female-native' | 'female-corporate' | 'female-couture';
  targetUnit: MeasurementUnit;
}

export interface SuggestedSizesResult {
  suggestedSizeCategory: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';
  suggestedSizeLabel: string;
  bmi: number;
  measurements: GarmentMeasurements;
  shoeSpecs?: Partial<ShoeMeasurements>;
  confidenceNote: string;
}

/**
 * Calculates standard baseline bespoke tailoring measurements
 * using anthropometric logic gates based on height (cm) and weight (kg).
 */
export function calculateSuggestedMeasurements({
  heightCm,
  weightKg,
  build = 'tailored',
  garmentType,
  targetUnit = 'in'
}: AutoSuggestParams): SuggestedSizesResult {
  // Guard rails for reasonable inputs
  const clampedHeight = Math.max(140, Math.min(220, heightCm));
  const clampedWeight = Math.max(45, Math.min(180, weightKg));

  // Height in inches & meters
  const heightInches = clampedHeight / 2.54;
  const heightMeters = clampedHeight / 100;
  const bmi = Math.round((clampedWeight / (heightMeters * heightMeters)) * 10) / 10;

  // Build offset factor in inches
  const buildChestOffset = build === 'slim' ? -1.5 : build === 'relaxed' ? 2.0 : 0;
  const buildWaistOffset = build === 'slim' ? -1.5 : build === 'relaxed' ? 2.5 : 0;

  // LOGIC GATE 1: Baseline Chest Circumference (in inches)
  // Tailoring formula: correlates strongly with weight-to-height ratio
  let baseChest = 33 + (clampedWeight - 50) * 0.32 + (heightInches - 64) * 0.15 + buildChestOffset;
  baseChest = Math.round(baseChest * 2) / 2; // round to nearest 0.5

  // LOGIC GATE 2: Determine Standard Size Classification
  let sizeCategory: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' = 'M';
  let sizeLabel = 'Medium (M)';

  if (baseChest < 38) {
    sizeCategory = 'S';
    sizeLabel = 'Small (S) · 36-38" Chest';
  } else if (baseChest < 41) {
    sizeCategory = 'M';
    sizeLabel = 'Medium (M) · 38-40" Chest';
  } else if (baseChest < 44) {
    sizeCategory = 'L';
    sizeLabel = 'Large (L) · 41-43" Chest';
  } else if (baseChest < 47) {
    sizeCategory = 'XL';
    sizeLabel = 'Extra Large (XL) · 44-46" Chest';
  } else if (baseChest < 50) {
    sizeCategory = 'XXL';
    sizeLabel = 'Double XL (XXL) · 47-49" Chest';
  } else {
    sizeCategory = '3XL';
    sizeLabel = 'Triple XL (3XL) · 50"+ Chest';
  }

  // LOGIC GATE 3: Shoulder Width (in inches)
  // Correlates with height and chest breadth
  let shoulder = 16.5 + (heightInches - 64) * 0.18 + (baseChest - 36) * 0.18;
  shoulder = Math.round(shoulder * 2) / 2;

  // LOGIC GATE 4: Neck Circumference (in inches)
  let neck = 14.5 + (baseChest - 36) * 0.12 + (clampedWeight - 60) * 0.02;
  neck = Math.round(neck * 2) / 2;

  // LOGIC GATE 5: Sleeve Length (in inches)
  // Measured from shoulder edge to wrist bone
  let sleeveLength = 23.5 + (heightInches - 64) * 0.35;
  sleeveLength = Math.round(sleeveLength * 2) / 2;

  // LOGIC GATE 6: Garment Length / Top Length (in inches)
  // Tailored specifically for Nigerian native cuts:
  // Senator sits mid-thigh (~height * 0.22)
  // Kaftan sits below knee or mid-shin (~height * 0.28)
  let garmentLength = heightInches * 0.54;
  if (garmentType === 'senator' || garmentType === 'two-piece') {
    garmentLength = 35 + (heightInches - 66) * 0.45;
  } else if (garmentType === 'kaftan') {
    garmentLength = 48 + (heightInches - 66) * 0.6;
  } else if (garmentType === 'agbada') {
    garmentLength = 50 + (heightInches - 66) * 0.65;
  }
  garmentLength = Math.round(garmentLength * 2) / 2;

  // LOGIC GATE 7: Trouser Waist (in inches)
  // Calculated from chest drop and BMI adjustments
  const standardDrop = bmi < 24 ? 6.5 : bmi < 28 ? 5.0 : 3.5;
  let waist = baseChest - standardDrop + buildWaistOffset;
  waist = Math.round(waist * 2) / 2;

  // LOGIC GATE 8: Trouser Length / Outseam (in inches)
  let trouserLength = 39.5 + (heightInches - 64) * 0.42;
  trouserLength = Math.round(trouserLength * 2) / 2;

  // LOGIC GATE 9: Inseam (in inches)
  let inseam = 29.5 + (heightInches - 64) * 0.35;
  inseam = Math.round(inseam * 2) / 2;

  // LOGIC GATE 10: Thigh Circumference (in inches)
  let thigh = 22 + (waist - 30) * 0.35 + (bmi > 25 ? (bmi - 25) * 0.4 : 0);
  thigh = Math.round(thigh * 2) / 2;

  // LOGIC GATE 11: Agbada Wingspan (in inches)
  // Full shoulder to wrist span across body with royal drape ease
  let agbadaSpan = 56 + (heightInches - 64) * 0.65;
  agbadaSpan = Math.round(agbadaSpan * 2) / 2;

  // Female Couture Anthropometrics Check
  const isFemale = garmentType === 'female-native' || garmentType === 'female-corporate' || garmentType === 'female-couture';

  let femaleBust = 32 + (clampedWeight - 48) * 0.3 + (heightInches - 62) * 0.12 + buildChestOffset;
  femaleBust = Math.round(femaleBust * 2) / 2;

  let femaleWaist = 24.5 + (clampedWeight - 48) * 0.24 + (heightInches - 62) * 0.08 + buildWaistOffset;
  femaleWaist = Math.round(femaleWaist * 2) / 2;

  let femaleHighHip = femaleWaist + 5.0;
  femaleHighHip = Math.round(femaleHighHip * 2) / 2;

  let femaleFullHip = femaleWaist + 9.5 + (bmi > 24 ? (bmi - 24) * 0.5 : 0);
  femaleFullHip = Math.round(femaleFullHip * 2) / 2;

  let femaleSkirtLength = 34 + (heightInches - 62) * 0.35; // midi / ankle length
  femaleSkirtLength = Math.round(femaleSkirtLength * 2) / 2;

  // Female size categorization (UK standards)
  if (isFemale) {
    if (femaleBust <= 33) {
      sizeCategory = 'S';
      sizeLabel = 'UK 8 (Bust 32-33", Waist 25-26", Hip 35-36")';
    } else if (femaleBust <= 35) {
      sizeCategory = 'S';
      sizeLabel = 'UK 10 (Bust 34-35", Waist 27-28", Hip 37-38")';
    } else if (femaleBust <= 37) {
      sizeCategory = 'M';
      sizeLabel = 'UK 12 (Bust 36-37", Waist 29-30", Hip 39-40")';
    } else if (femaleBust <= 40) {
      sizeCategory = 'L';
      sizeLabel = 'UK 14 (Bust 38-40", Waist 31-33", Hip 41-43")';
    } else if (femaleBust <= 43) {
      sizeCategory = 'XL';
      sizeLabel = 'UK 16 (Bust 41-43", Waist 34-36", Hip 44-46")';
    } else if (femaleBust <= 46) {
      sizeCategory = 'XXL';
      sizeLabel = 'UK 18 (Bust 44-46", Waist 37-39", Hip 47-49")';
    } else {
      sizeCategory = '3XL';
      sizeLabel = 'UK 20+ (Bust 47"+, Waist 40"+, Hip 50"+)';
    }
  }

  // Unit conversion if requested in centimeters (cm)
  const factor = targetUnit === 'cm' ? 2.54 : 1;
  const roundVal = (v: number) => {
    const converted = v * factor;
    return targetUnit === 'cm' ? Math.round(converted * 10) / 10 : v;
  };

  const finalMeasurements: GarmentMeasurements = {
    unit: targetUnit,
    shoulder: roundVal(isFemale ? shoulder - 2.5 : shoulder),
    chest: roundVal(isFemale ? femaleBust : baseChest),
    neck: roundVal(isFemale ? neck - 1.5 : neck),
    sleeveLength: roundVal(sleeveLength),
    garmentLength: roundVal(garmentLength),
    waist: roundVal(isFemale ? femaleWaist : waist),
    trouserLength: roundVal(trouserLength),
    inseam: roundVal(inseam),
    thigh: roundVal(thigh),
    agbadaSpan: garmentType === 'agbada' ? roundVal(agbadaSpan) : undefined,
    bust: isFemale ? roundVal(femaleBust) : undefined,
    highHip: isFemale ? roundVal(femaleHighHip) : undefined,
    fullHip: isFemale ? roundVal(femaleFullHip) : undefined,
    skirtLength: isFemale ? roundVal(femaleSkirtLength) : undefined
  };

  // LOGIC GATE 12: Footwear estimation
  let estimatedShoeSizeEU = 42;
  if (heightCm < 165) estimatedShoeSizeEU = 40;
  else if (heightCm < 172) estimatedShoeSizeEU = 41;
  else if (heightCm < 178) estimatedShoeSizeEU = 42;
  else if (heightCm < 183) estimatedShoeSizeEU = 43;
  else if (heightCm < 188) estimatedShoeSizeEU = 44;
  else if (heightCm < 194) estimatedShoeSizeEU = 45;
  else estimatedShoeSizeEU = 46;

  const estimatedFootLengthIn = 9.8 + (estimatedShoeSizeEU - 40) * 0.26;
  const estimatedFootLength = roundVal(estimatedFootLengthIn);

  const shoeSpecs: Partial<ShoeMeasurements> = {
    shoeSizeEU: estimatedShoeSizeEU,
    footLength: estimatedFootLength,
    footWidth: bmi > 27 ? 'wide' : bmi < 21 ? 'narrow' : 'standard'
  };

  let confidenceNote = `Calculated using standard Nigerian bespoke ratios for a ${clampedHeight}cm (${Math.floor(heightInches / 12)}'${Math.round(heightInches % 12)}") and ${clampedWeight}kg frame (BMI ${bmi}).`;
  if (build === 'slim') confidenceNote += ' Adjusted with -1.5" tapered ease.';
  if (build === 'relaxed') confidenceNote += ' Adjusted with traditional generous drape ease.';

  return {
    suggestedSizeCategory: sizeCategory,
    suggestedSizeLabel: sizeLabel,
    bmi,
    measurements: finalMeasurements,
    shoeSpecs,
    confidenceNote
  };
}
