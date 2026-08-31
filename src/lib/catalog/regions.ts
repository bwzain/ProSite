import type { MacroRegion } from "./types";

export type CountryMeta = {
  name: string;
  isoA3: string;
  isoNumeric: string;
  region: MacroRegion;
};

export const MACRO_REGIONS: MacroRegion[] = [
  "North America",
  "Asia",
  "Europe",
  "Latin America",
  "MENA",
  "Oceania",
  "Sub-Saharan Africa",
];

export const COUNTRIES: CountryMeta[] = [
  { name: "Algeria", isoA3: "DZA", isoNumeric: "12", region: "MENA" },
  { name: "Argentina", isoA3: "ARG", isoNumeric: "32", region: "Latin America" },
  { name: "Australia", isoA3: "AUS", isoNumeric: "36", region: "Oceania" },
  { name: "Austria", isoA3: "AUT", isoNumeric: "40", region: "Europe" },
  { name: "Bahrain", isoA3: "BHR", isoNumeric: "48", region: "MENA" },
  { name: "Bangladesh", isoA3: "BGD", isoNumeric: "50", region: "Asia" },
  { name: "Belarus", isoA3: "BLR", isoNumeric: "112", region: "Europe" },
  { name: "Belgium", isoA3: "BEL", isoNumeric: "56", region: "Europe" },
  { name: "Brazil", isoA3: "BRA", isoNumeric: "76", region: "Latin America" },
  { name: "Bulgaria", isoA3: "BGR", isoNumeric: "100", region: "Europe" },
  { name: "Cambodia", isoA3: "KHM", isoNumeric: "116", region: "Asia" },
  { name: "Canada", isoA3: "CAN", isoNumeric: "124", region: "North America" },
  { name: "Chile", isoA3: "CHL", isoNumeric: "152", region: "Latin America" },
  { name: "China", isoA3: "CHN", isoNumeric: "156", region: "Asia" },
  { name: "Colombia", isoA3: "COL", isoNumeric: "170", region: "Latin America" },
  { name: "Croatia", isoA3: "HRV", isoNumeric: "191", region: "Europe" },
  { name: "Cyprus", isoA3: "CYP", isoNumeric: "196", region: "Europe" },
  { name: "Czech Republic", isoA3: "CZE", isoNumeric: "203", region: "Europe" },
  { name: "Denmark", isoA3: "DNK", isoNumeric: "208", region: "Europe" },
  { name: "Egypt", isoA3: "EGY", isoNumeric: "818", region: "MENA" },
  { name: "Finland", isoA3: "FIN", isoNumeric: "246", region: "Europe" },
  { name: "France", isoA3: "FRA", isoNumeric: "250", region: "Europe" },
  { name: "Georgia", isoA3: "GEO", isoNumeric: "268", region: "Europe" },
  { name: "Germany", isoA3: "DEU", isoNumeric: "276", region: "Europe" },
  { name: "Ghana", isoA3: "GHA", isoNumeric: "288", region: "Sub-Saharan Africa" },
  { name: "Greece", isoA3: "GRC", isoNumeric: "300", region: "Europe" },
  { name: "Guatemala", isoA3: "GTM", isoNumeric: "320", region: "Latin America" },
  { name: "Hong Kong", isoA3: "HKG", isoNumeric: "344", region: "Asia" },
  { name: "Hungary", isoA3: "HUN", isoNumeric: "348", region: "Europe" },
  { name: "Iceland", isoA3: "ISL", isoNumeric: "352", region: "Europe" },
  { name: "India", isoA3: "IND", isoNumeric: "356", region: "Asia" },
  { name: "Indonesia", isoA3: "IDN", isoNumeric: "360", region: "Asia" },
  { name: "Iran", isoA3: "IRN", isoNumeric: "364", region: "MENA" },
  { name: "Iraq", isoA3: "IRQ", isoNumeric: "368", region: "MENA" },
  { name: "Ireland", isoA3: "IRL", isoNumeric: "372", region: "Europe" },
  { name: "Israel", isoA3: "ISR", isoNumeric: "376", region: "MENA" },
  { name: "Italy", isoA3: "ITA", isoNumeric: "380", region: "Europe" },
  { name: "Jamaica", isoA3: "JAM", isoNumeric: "388", region: "Latin America" },
  { name: "Japan", isoA3: "JPN", isoNumeric: "392", region: "Asia" },
  { name: "Jordan", isoA3: "JOR", isoNumeric: "400", region: "MENA" },
  { name: "Kenya", isoA3: "KEN", isoNumeric: "404", region: "Sub-Saharan Africa" },
  { name: "Kuwait", isoA3: "KWT", isoNumeric: "414", region: "MENA" },
  { name: "Lebanon", isoA3: "LBN", isoNumeric: "422", region: "MENA" },
  { name: "Libya", isoA3: "LBY", isoNumeric: "434", region: "MENA" },
  { name: "Malaysia", isoA3: "MYS", isoNumeric: "458", region: "Asia" },
  { name: "Mauritius", isoA3: "MUS", isoNumeric: "480", region: "Sub-Saharan Africa" },
  { name: "Mexico", isoA3: "MEX", isoNumeric: "484", region: "Latin America" },
  { name: "Morocco", isoA3: "MAR", isoNumeric: "504", region: "MENA" },
  { name: "Namibia", isoA3: "NAM", isoNumeric: "516", region: "Sub-Saharan Africa" },
  { name: "Netherlands", isoA3: "NLD", isoNumeric: "528", region: "Europe" },
  { name: "New Zealand", isoA3: "NZL", isoNumeric: "554", region: "Oceania" },
  { name: "Nigeria", isoA3: "NGA", isoNumeric: "566", region: "Sub-Saharan Africa" },
  { name: "Norway", isoA3: "NOR", isoNumeric: "578", region: "Europe" },
  { name: "Oman", isoA3: "OMN", isoNumeric: "512", region: "MENA" },
  { name: "Pakistan", isoA3: "PAK", isoNumeric: "586", region: "Asia" },
  { name: "Palestine", isoA3: "PSE", isoNumeric: "275", region: "MENA" },
  { name: "Paraguay", isoA3: "PRY", isoNumeric: "600", region: "Latin America" },
  { name: "Peru", isoA3: "PER", isoNumeric: "604", region: "Latin America" },
  { name: "Philippines", isoA3: "PHL", isoNumeric: "608", region: "Asia" },
  { name: "Poland", isoA3: "POL", isoNumeric: "616", region: "Europe" },
  { name: "Portugal", isoA3: "PRT", isoNumeric: "620", region: "Europe" },
  { name: "Puerto Rico", isoA3: "PRI", isoNumeric: "630", region: "Latin America" },
  { name: "Qatar", isoA3: "QAT", isoNumeric: "634", region: "MENA" },
  { name: "Romania", isoA3: "ROU", isoNumeric: "642", region: "Europe" },
  { name: "Russia", isoA3: "RUS", isoNumeric: "643", region: "Europe" },
  { name: "Saudi Arabia", isoA3: "SAU", isoNumeric: "682", region: "MENA" },
  { name: "Senegal", isoA3: "SEN", isoNumeric: "686", region: "Sub-Saharan Africa" },
  { name: "Serbia", isoA3: "SRB", isoNumeric: "688", region: "Europe" },
  { name: "Singapore", isoA3: "SGP", isoNumeric: "702", region: "Asia" },
  { name: "Slovenia", isoA3: "SVN", isoNumeric: "705", region: "Europe" },
  { name: "Somalia", isoA3: "SOM", isoNumeric: "706", region: "Sub-Saharan Africa" },
  { name: "South Africa", isoA3: "ZAF", isoNumeric: "710", region: "Sub-Saharan Africa" },
  { name: "South Korea", isoA3: "KOR", isoNumeric: "410", region: "Asia" },
  { name: "Soviet Union", isoA3: "RUS", isoNumeric: "643", region: "Europe" },
  { name: "Spain", isoA3: "ESP", isoNumeric: "724", region: "Europe" },
  { name: "Sudan", isoA3: "SDN", isoNumeric: "729", region: "MENA" },
  { name: "Sweden", isoA3: "SWE", isoNumeric: "752", region: "Europe" },
  { name: "Switzerland", isoA3: "CHE", isoNumeric: "756", region: "Europe" },
  { name: "Syria", isoA3: "SYR", isoNumeric: "760", region: "MENA" },
  { name: "Taiwan", isoA3: "TWN", isoNumeric: "158", region: "Asia" },
  { name: "Thailand", isoA3: "THA", isoNumeric: "764", region: "Asia" },
  { name: "Tunisia", isoA3: "TUN", isoNumeric: "788", region: "MENA" },
  { name: "Turkey", isoA3: "TUR", isoNumeric: "792", region: "MENA" },
  { name: "Ukraine", isoA3: "UKR", isoNumeric: "804", region: "Europe" },
  { name: "United Arab Emirates", isoA3: "ARE", isoNumeric: "784", region: "MENA" },
  { name: "United Kingdom", isoA3: "GBR", isoNumeric: "826", region: "Europe" },
  { name: "United States", isoA3: "USA", isoNumeric: "840", region: "North America" },
  { name: "Uruguay", isoA3: "URY", isoNumeric: "858", region: "Latin America" },
  { name: "Venezuela", isoA3: "VEN", isoNumeric: "862", region: "Latin America" },
  { name: "Vietnam", isoA3: "VNM", isoNumeric: "704", region: "Asia" },
  { name: "Yemen", isoA3: "YEM", isoNumeric: "887", region: "MENA" },
  { name: "Zimbabwe", isoA3: "ZWE", isoNumeric: "716", region: "Sub-Saharan Africa" },
];

const NAME_ALIASES: Record<string, string> = {
  usa: "United States",
  us: "United States",
  "united states of america": "United States",
  uk: "United Kingdom",
  "great britain": "United Kingdom",
  britain: "United Kingdom",
  korea: "South Korea",
  "republic of korea": "South Korea",
  uae: "United Arab Emirates",
  eg: "Egypt",
  tr: "Turkey",
  türkiye: "Turkey",
  turkiye: "Turkey",
  "hong kong sar": "Hong Kong",
  "czechia": "Czech Republic",
  russia: "Russia",
  "russian federation": "Russia",
};

export function lookupCountry(raw: string | undefined | null): CountryMeta | undefined {
  if (!raw) return undefined;
  const first = raw.split(/[|,;]/)[0]?.trim() ?? "";
  if (!first) return undefined;
  const alias = NAME_ALIASES[first.toLowerCase()];
  const name = alias ?? first;
  return (
    COUNTRIES.find((c) => c.name.toLowerCase() === name.toLowerCase()) ??
    COUNTRIES.find((c) => c.isoA3.toLowerCase() === first.toLowerCase())
  );
}

export function countryByIsoNumeric(isoNumeric: string): CountryMeta | undefined {
  const n = String(Number(isoNumeric));
  return COUNTRIES.find((c) => String(Number(c.isoNumeric)) === n);
}
