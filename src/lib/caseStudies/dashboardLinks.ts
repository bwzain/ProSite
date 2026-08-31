/** Case study slugs that show the Discovery dashboard CTA on detail pages. */
export const DISCOVERY_CASE_STUDY_SLUGS = new Set([
  "case-study-driving-insights-from-a-large-netflix-dataset",
  "case-study-building-an-interactive-dashboard-with-ai",
  "netflix-content-discovery", // seed fallback slug
]);

export function isDiscoveryCaseStudy(slug: string): boolean {
  return DISCOVERY_CASE_STUDY_SLUGS.has(slug);
}
