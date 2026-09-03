const siteUrl = "https://motedesktop.com";

interface PageHeadOptions {
  description: string;
  path: string;
  title: string;
}

export function pageHead({ description, path, title }: PageHeadOptions) {
  const canonicalUrl = new URL(path, siteUrl).toString();

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:site_name", content: "Mote Desktop" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}
