import { PROFILE_DATA } from "@/data/profile";
import { getSiteUrl } from "@/lib/siteUrl";

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd() {
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const description =
    "Official executive portfolio of William Zain — 30+ year Enterprise Automation & Cloud Architect, Digital Music Producer (Zainy Beats), Published AI Author, and Toastmasters DTM.";

  const sameAs = [
    PROFILE_DATA.linkedIn,
    "https://www.amazon.com/stores/William-Zain/author/B0FFN749GN",
    PROFILE_DATA.youtubePlaylist.vevoChannelUrl,
    PROFILE_DATA.youtubePlaylist.spotifyArtistUrl,
  ].filter((url): url is string => Boolean(url));

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: PROFILE_DATA.name,
      alternateName: ["Zainy Beats", "Billy Zain", PROFILE_DATA.handle],
      jobTitle: "Enterprise IT Architect, Digital Music Producer, and Published AI Author",
      email: `mailto:${PROFILE_DATA.email}`,
      url: siteUrl,
      image: `${siteUrl}/images/self-portrait.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orange County",
        addressRegion: "CA",
        addressCountry: "US",
      },
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: PROFILE_DATA.name,
      url: siteUrl,
      description,
      inLanguage: "en-US",
      author: { "@id": personId },
    },
    ...PROFILE_DATA.books.map((book) => ({
      "@type": "Book",
      name: book.title,
      description: book.description,
      author: { "@id": personId },
      url: book.amazonUrl,
      image: book.coverImage.startsWith("http") ? book.coverImage : `${siteUrl}${book.coverImage}`,
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLdScript({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
