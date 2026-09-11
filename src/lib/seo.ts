import { MICROSOFT_STORE_URL } from "./links";
import { PUBLISHER } from "./legal";

const siteUrl = "https://motedesktop.com";

/**
 * The card every link preview shows. One card serves every page: a share of
 * /features is still a share of Mote, and the platform prints the page's own
 * title and description beside it. Rendered by scripts/render-og-card.ts; the
 * dimensions are declared so a preview can reserve the space before the image
 * arrives.
 */
const socialCard = {
  path: "/brand/mote-social-card.png",
  width: "1200",
  height: "630",
  alt: "The Mote Desktop dashboard showing colorful Philips Hue rooms and zones on Windows.",
};

interface PageHeadOptions {
  description: string;
  path: string;
  title: string;
  /** Structured data for this page, serialized into one ld+json script. */
  jsonLd?: object;
}

export function pageHead({ description, path, title, jsonLd }: PageHeadOptions) {
  const canonicalUrl = new URL(path, siteUrl).toString();
  const imageUrl = new URL(socialCard.path, siteUrl).toString();

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:site_name", content: "Mote Desktop" },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: socialCard.width },
      { property: "og:image:height", content: socialCard.height },
      { property: "og:image:alt", content: socialCard.alt },
      // The card is a wide product shot, so the small square card would crop it
      // to the middle of a screenshot and show nothing legible.
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: socialCard.alt },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: jsonLd ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] : [],
  };
}

/**
 * What Mote is, in the vocabulary search engines read: a Windows application,
 * free, obtained from the Store. Only the home page carries it — structured
 * data describes the thing the page is about, and repeating it on every page
 * says there are five applications rather than one.
 *
 * Everything here is claimed elsewhere on the site in prose. No rating is
 * declared, because there is no rating that is ours to declare.
 */
export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#software`,
    name: "Mote Desktop",
    description:
      "A Windows app for controlling compatible Philips Hue lights, rooms, zones, and scenes over a local network.",
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Home automation",
    operatingSystem: "Windows 10, Windows 11",
    url: `${siteUrl}/`,
    mainEntityOfPage: `${siteUrl}/`,
    downloadUrl: MICROSOFT_STORE_URL,
    installUrl: MICROSOFT_STORE_URL,
    image: new URL(socialCard.path, siteUrl).toString(),
    softwareHelp: `${siteUrl}/support`,
    author: { "@type": "Person", name: PUBLISHER },
    publisher: { "@type": "Person", name: PUBLISHER },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: MICROSOFT_STORE_URL,
    },
    featureList: [
      "Home dashboard for rooms, zones, lights, scenes, devices, and entertainment areas",
      "Per-room scene tiles, individual light controls, and a color inspector",
      "Desktop widgets pinned beside your work",
      "Hue Play HDMI Sync Box controls",
      "PC Sync with Video, Games, and Music modes (Mote Pro)",
    ],
  };
}

interface FaqItem {
  answer: string;
  question: string;
}

/**
 * The same questions rendered on the home page, without inferred reviews or
 * user-generated answers. FAQ markup is an entity-consistency aid here; this
 * product does not qualify for Google's restricted FAQ rich-result treatment.
 */
export function faqPageJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
