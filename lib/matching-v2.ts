export type FamilyMatchingProfile = {
  cityOrPostal: string;
  latitude?: number | null;
  longitude?: number | null;
  childAgeMonths: number;
  desiredStartDate?: string | null;
  requiredDays?: string[];
  requiredStartTime?: string | null;
  requiredEndTime?: string | null;
  childcareTypes?: string[];
  maxDistanceKm?: number | null;
  allergies?: string[];
  mealPreferences?: string[];
  petPreference?: "any" | "no-pets" | "pets-ok";
  spokenLanguages?: string[];
  desiredChildLanguages?: string[];
  favouriteActivities?: string[];
  napNeeds?: string[];
};

export type ProviderMatchingProfile = {
  id: string;
  childcareType?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  minAgeMonths?: number | null;
  maxAgeMonths?: number | null;
  availableFrom?: string | null;
  openDays?: string[];
  openTime?: string | null;
  closeTime?: string | null;
  remainingSpots?: number | null;
  acceptsAllergies?: boolean | null;
  supportedAllergies?: string[];
  mealOptions?: string[];
  hasPets?: boolean | null;
  languages?: string[];
  activities?: string[];
  napOptions?: string[];
};

export type MatchingResult = {
  eligible: boolean;
  score: number;
  distanceKm: number | null;
  reasons: string[];
  blockers: string[];
};

const toMinutes = (value?: string | null) => {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return null;
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
};

export function distanceKm(
  aLat?: number | null,
  aLng?: number | null,
  bLat?: number | null,
  bLng?: number | null,
) {
  if ([aLat, aLng, bLat, bLng].some((v) => typeof v !== "number")) return null;
  const toRad = (deg: number) => deg * Math.PI / 180;
  const r = 6371;
  const dLat = toRad((bLat as number) - (aLat as number));
  const dLng = toRad((bLng as number) - (aLng as number));
  const lat1 = toRad(aLat as number);
  const lat2 = toRad(bLat as number);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round((2 * r * Math.asin(Math.sqrt(x))) * 10) / 10;
}

export function calculateFamilyProviderMatch(
  family: FamilyMatchingProfile,
  provider: ProviderMatchingProfile,
): MatchingResult {
  const blockers: string[] = [];
  const reasons: string[] = [];
  let earned = 0;
  let possible = 0;

  const km = distanceKm(family.latitude, family.longitude, provider.latitude, provider.longitude);

  // Hard requirements: a provider that fails these should not be promoted as a match.
  if (typeof provider.remainingSpots === "number" && provider.remainingSpots <= 0) blockers.push("no_openings");
  if (typeof provider.minAgeMonths === "number" && family.childAgeMonths < provider.minAgeMonths) blockers.push("age_too_young");
  if (typeof provider.maxAgeMonths === "number" && family.childAgeMonths > provider.maxAgeMonths) blockers.push("age_too_old");
  if (family.childcareTypes?.length && provider.childcareType && !family.childcareTypes.includes(provider.childcareType)) blockers.push("childcare_type");
  if (typeof family.maxDistanceKm === "number" && km !== null && km > family.maxDistanceKm) blockers.push("distance");

  if (family.requiredDays?.length && provider.openDays?.length) {
    const coversDays = family.requiredDays.every((day) => provider.openDays!.includes(day));
    if (!coversDays) blockers.push("days");
  }

  const needStart = toMinutes(family.requiredStartTime);
  const needEnd = toMinutes(family.requiredEndTime);
  const providerStart = toMinutes(provider.openTime);
  const providerEnd = toMinutes(provider.closeTime);
  if (needStart !== null && providerStart !== null && providerStart > needStart) blockers.push("opens_too_late");
  if (needEnd !== null && providerEnd !== null && providerEnd < needEnd) blockers.push("closes_too_early");

  // Weighted preferences. Only dimensions with data on both sides affect the denominator.
  if (km !== null) {
    possible += 25;
    const target = family.maxDistanceKm ?? 15;
    const normalized = Math.max(0, 1 - km / Math.max(target, 1));
    earned += normalized * 25;
    if (km <= 5) reasons.push("near_home");
  }

  if (typeof provider.remainingSpots === "number") {
    possible += 20;
    if (provider.remainingSpots > 0) { earned += 20; reasons.push("opening_announced"); }
  }

  if (family.desiredChildLanguages?.length && provider.languages?.length) {
    possible += 15;
    const languageMatch = family.desiredChildLanguages.some((language) => provider.languages!.includes(language));
    if (languageMatch) { earned += 15; reasons.push("language_match"); }
  }

  if (family.petPreference === "no-pets" && typeof provider.hasPets === "boolean") {
    possible += 10;
    if (!provider.hasPets) { earned += 10; reasons.push("pet_preference"); }
  }

  if (family.allergies?.length && typeof provider.acceptsAllergies === "boolean") {
    possible += 10;
    if (provider.acceptsAllergies) { earned += 10; reasons.push("allergy_support"); }
  }

  if (family.favouriteActivities?.length && provider.activities?.length) {
    possible += 10;
    const overlap = family.favouriteActivities.filter((activity) => provider.activities!.includes(activity));
    if (overlap.length) {
      earned += Math.min(10, (overlap.length / family.favouriteActivities.length) * 10);
      reasons.push("activity_match");
    }
  }

  if (family.napNeeds?.length && provider.napOptions?.length) {
    possible += 5;
    if (family.napNeeds.some((option) => provider.napOptions!.includes(option))) {
      earned += 5;
      reasons.push("nap_match");
    }
  }

  if (family.mealPreferences?.length && provider.mealOptions?.length) {
    possible += 5;
    if (family.mealPreferences.some((option) => provider.mealOptions!.includes(option))) {
      earned += 5;
      reasons.push("meal_match");
    }
  }

  const eligible = blockers.length === 0;
  const score = eligible && possible > 0 ? Math.max(1, Math.min(100, Math.round((earned / possible) * 100))) : 0;
  return { eligible, score, distanceKm: km, reasons, blockers };
}
