export const categories = [
  "Beachwear",
  "Pajamas",
  "Shorts",
  "Plus Size",
  "Dresses",
  "100% Cotton",
  "Lingerie",
  "Imported Lingerie",
  "Tracksuits",
  "3-Piece Pajamas",
] as const;

export const categoryTranslation: Record<string, string> = {
  "Beachwear": "كاشات",
  "Pajamas": "بيجامات",
  "Shorts": "شورتات",
  "Plus Size": "بيج سايز",
  "Dresses": "فساتين",
  "100% Cotton": "قطن صافي",
  "Lingerie": "لانجيري",
  "Imported Lingerie": "لانجيري مستورد",
  "Tracksuits": "ترنجات",
  "3-Piece Pajamas": "بيجامات 3 قطع",
};

// Map from Arabic (backend) to English (frontend display)
export const arabicToEnglishCategory = (arabicCat: string): string => {
  if (!arabicCat) return "";

  // First check if it's already an English category key (case-insensitive)
  const matchedKey = Object.keys(categoryTranslation).find(
    (key) => key.toLowerCase() === arabicCat.toLowerCase()
  );
  if (matchedKey) return matchedKey;

  // Otherwise find by Arabic value
  const entry = Object.entries(categoryTranslation).find(
    ([_, value]) => value === arabicCat
  );
  return entry ? entry[0] : arabicCat;
};

// Map from English (frontend display) to Arabic (backend)
export const englishToArabicCategory = (englishCat: string): string => {
  if (!englishCat) return "";
  return categoryTranslation[englishCat] || englishCat;
};
