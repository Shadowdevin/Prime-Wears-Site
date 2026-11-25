import React, { useState } from 'react';
import { X, CheckCircle, Ruler, Calculator, Wand2, Sparkles } from 'lucide-react';
import { calculateSuggestedMeasurements, BodyBuild } from '../../utils/measurementSuggester';

interface MeasurementGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [guideCategory, setGuideCategory] = useState<'senator' | 'agbada' | 'shoes' | 'estimator'>('senator');
  const [guideHeightCm, setGuideHeightCm] = useState(175);
  const [guideWeightKg, setGuideWeightKg] = useState(75);
  const [guideBuild, setGuideBuild] = useState<BodyBuild>('tailored');
  const [guideGarment, setGuideGarment] = useState<'senator' | 'kaftan' | 'agbada'>('senator');

  const guideCalculation = calculateSuggestedMeasurements({
    heightCm: guideHeightCm,
    weightKg: guideWeightKg,
    build: guideBuild,
    garmentType: guideGarment,
    targetUnit: 'in'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden border border-neutral-200 my-8">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold uppercase tracking-wider font-serif-luxury">
                Prime Wears Tailoring Measurement Guide
              </h2>
              <p className="text-xs text-neutral-400">
                Precision measuring instructions & anthropometric sizing engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close measurement guide"
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-3 bg-neutral-100 border-b border-neutral-200 flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setGuideCategory('senator')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              guideCategory === 'senator'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            Senator & Kaftan
          </button>
          <button
            onClick={() => setGuideCategory('agbada')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              guideCategory === 'agbada'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            Royal Agbada
          </button>
          <button
            onClick={() => setGuideCategory('shoes')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              guideCategory === 'shoes'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            Corporate Shoes
          </button>
          <button
            onClick={() => setGuideCategory('estimator')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5 ${
              guideCategory === 'estimator'
                ? 'bg-amber-600 text-white shadow-xs font-bold'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Auto-Suggest Estimator</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-xs text-neutral-700">
          {guideCategory === 'senator' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200/80 p-3.5 rounded text-amber-900">
                <strong>Tailor&apos;s Pro Tip:</strong> Stand upright with relaxed shoulders. Use a flexible measuring tape. Keep tape snug but do not pull too tight.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">1. Shoulder Width</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Measure across the natural curve of your back, from the edge of one shoulder bone across to the edge of the other shoulder bone.
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">2. Chest Circumference</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Measure around the fullest part of your chest, keeping the tape level under your arms and across your shoulder blades.
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">3. Neck Circumference</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Wrap the tape around the base of your neck where a standard collar sits. Allow one finger&apos;s width of ease.
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">4. Sleeve Length</span>
                  <p className="text-neutral-600 leading-relaxed">
                    From the tip of your shoulder bone down the outside of your arm to your wrist bone (or preferred short sleeve length).
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">5. Top / Shirt Length</span>
                  <p className="text-neutral-600 leading-relaxed">
                    From the highest point of your shoulder/neck base straight down to where you desire the hem to end (typically mid-thigh for senator style).
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">6. Trouser Waist & Length</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Measure your waist where you wear native trousers (usually at the navel or waistline). Measure length from waistline down to shoe heel.
                  </p>
                </div>
              </div>
            </div>
          )}

          {guideCategory === 'agbada' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200/80 p-3.5 rounded text-amber-900">
                <strong>Agbada Majesty Tip:</strong> The grandeur of an Agbada lies in the wingspan draping gracefully over your forearms.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">1. Agbada Wingspan (Wrist-to-Wrist)</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Extend both arms horizontally. Measure from your left wrist straight across your shoulders to your right wrist (typically 58&quot; to 65&quot;).
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">2. Agbada Total Length</span>
                  <p className="text-neutral-600 leading-relaxed">
                    From shoulder base straight down to mid-calf or ankle height according to your personal preference.
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">3. Inner Kaftan Top</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Standard Senator chest, shoulder, and length measurements for the tailored garment worn underneath the flowing outer robe.
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">4. Trousers (Sokoto)</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Waist, hip, thigh, and ankle opening circumference for our bespoke tapered cut.
                  </p>
                </div>
              </div>
            </div>
          )}

          {guideCategory === 'shoes' && (
            <div className="space-y-4">
              <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded text-neutral-800">
                <strong>Bespoke Shoe Lasting:</strong> We craft shoes according to European (EU) lasts. If you have high arches or wide feet, note this in the order form.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">Foot Length Measurement</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Place a blank paper on a flat floor against a wall. Stand on it with heel against the wall. Mark the tip of your longest toe. Measure distance in cm or inches.
                  </p>
                </div>

                <div className="p-3.5 rounded border border-neutral-200 bg-neutral-50 space-y-1">
                  <span className="font-bold text-neutral-900 block text-xs">Width Profile</span>
                  <p className="text-neutral-600 leading-relaxed">
                    Select <strong>Narrow</strong>, <strong>Standard (D/E)</strong>, or <strong>Wide (EE)</strong> to ensure your Goodyear-welted shoes break in comfortably.
                  </p>
                </div>
              </div>
            </div>
          )}

          {guideCategory === 'estimator' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-300 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-amber-950 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Interactive Sizing Logic Gate Estimator</span>
                </div>
                <p className="text-neutral-700 leading-relaxed text-xs">
                  This interactive tool calculates your master tailor baseline proportions using Nigerian bespoke anthropometric logic gates. These baseline values are automatically available directly inside the Custom Order Form.
                </p>
              </div>

              {/* Calculator Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                    Your Height (cm)
                  </label>
                  <input
                    type="number"
                    min={140}
                    max={220}
                    value={guideHeightCm}
                    onChange={(e) => setGuideHeightCm(parseFloat(e.target.value) || 175)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-semibold"
                  />
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    ≈ {Math.floor((guideHeightCm / 2.54) / 12)}&apos; {Math.round((guideHeightCm / 2.54) % 12)}&quot;
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                    Your Weight (kg)
                  </label>
                  <input
                    type="number"
                    min={45}
                    max={180}
                    value={guideWeightKg}
                    onChange={(e) => setGuideWeightKg(parseFloat(e.target.value) || 75)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-semibold"
                  />
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    ≈ {Math.round(guideWeightKg * 2.20462)} lbs
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                    Garment Silhouette
                  </label>
                  <select
                    value={guideBuild}
                    onChange={(e) => setGuideBuild(e.target.value as BodyBuild)}
                    className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-semibold"
                  >
                    <option value="tailored">Standard Tailored Regular</option>
                    <option value="slim">Slim Cut (-1.5&quot; Taper)</option>
                    <option value="relaxed">Relaxed / Traditional Nigerian (+2&quot;)</option>
                  </select>
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    BMI: {guideCalculation.bmi}
                  </span>
                </div>
              </div>

              {/* Calculated Outputs Table */}
              <div className="bg-white border border-amber-300 rounded-lg p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                  <span className="text-xs font-bold text-neutral-900">
                    Calculated Baseline Size Classification:
                  </span>
                  <span className="px-3 py-1 bg-neutral-950 text-amber-300 rounded font-mono text-xs font-bold shadow-xs">
                    {guideCalculation.suggestedSizeLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block">Chest Breadth</span>
                    <span className="font-bold text-neutral-900">{guideCalculation.measurements.chest} in</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block">Shoulder Width</span>
                    <span className="font-bold text-neutral-900">{guideCalculation.measurements.shoulder} in</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block">Trouser Waist</span>
                    <span className="font-bold text-neutral-900">{guideCalculation.measurements.waist} in</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block">Top Length</span>
                    <span className="font-bold text-neutral-900">{guideCalculation.measurements.garmentLength} in</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block">Sleeve Length</span>
                    <span className="font-bold text-neutral-900">{guideCalculation.measurements.sleeveLength} in</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block">Trouser Outseam</span>
                    <span className="font-bold text-neutral-900">{guideCalculation.measurements.trouserLength} in</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block">Neck Collar</span>
                    <span className="font-bold text-neutral-900">{guideCalculation.measurements.neck} in</span>
                  </div>
                  <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block">Est. Shoe Size</span>
                    <span className="font-bold text-neutral-900">EU {guideCalculation.shoeSpecs?.shoeSizeEU}</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-500 italic pt-1">
                  {guideCalculation.confidenceNote}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded"
          >
            I Understand, Return to Form
          </button>
        </div>
      </div>
    </div>
  );
};
