export const OrgJsonLD = {
  "@context": "https://www.schema.org",
  "@type": "NewsMediaOrganization",
  additionalType: "Organization",
  name: "Free Malaysia Today",
  legalName: "FMT Media Sdn Bhd",
  slogan: "Free and Independent Malaysian news in English & Malay",
  url: "https://www.freemalaysiatoday.com/",
  foundingDate: "2009-11-01",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: "+60378872888",
  },
  email: "mailto:admin@freemalaysiatoday.com",
  knowsLanguage: ["Malay", "English"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.3,
    ratingCount: 18,
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 100,
    maxValue: 500,
  },
  isAccessibleForFree: true,
  sameAs: [
    "https://www.facebook.com/profile.php?id=100064467980422",
    "https://www.instagram.com/freemalaysiatoday",
    "https://x.com/fmtoday",
    "https://t.me/FreeMalaysiaToday",
    "https://www.youtube.com/@FreeMalaysiaToday",
    "https://www.linkedin.com/company/fmt-news/",
    "https://www.tiktok.com/@freemalaysiatoday",
    "https://en.wikipedia.org/wiki/Free_Malaysia_Today",
    "https://ms.wikipedia.org/wiki/Free_Malaysia_Today",
  ],
  logo: {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: "https://www.freemalaysiatoday.com/icon-512x512.png",
    contentUrl: "https://www.freemalaysiatoday.com/icon-512x512.png",
    width: 512,
    height: 512,
    creditText: "Free Malaysia Today",
    license: "https://www.freemalaysiatoday.com/privacy-policy/",
    acquireLicensePage: "https://www.freemalaysiatoday.com/privacy-policy/",
    creator: {
      "@type": "Organization",
      name: "Free Malaysia Today",
      url: "https://www.freemalaysiatoday.com/",
    },
    copyrightNotice: `© Free Malaysia Today, ${new Date().getFullYear()}`,
  },
  description:
    "Explore 24/7 news on politics, economy, and more with Free Malaysia Today. Your source for unbiased Malaysian news in English & Malay since 2009.",
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "The West Wing, Menara Axis, Ground Floor, Quattro West, 4, Persiaran Barat",
      addressLocality: "Petaling Jaya",
      addressRegion: "Selangor",
      postalCode: "46200",
      addressCountry: "MY",
    },
    name: "FMT Media Sdn Bhd",
    sameAs: "https://www.freemalaysiatoday.com/",
    geo: {
      "@type": "GeoCoordinates",
      latitude: "3.1037209336764953",
      longitude: "101.64165328465576",
    },
  },
  alternateName: [
    "FMT",
    "FreeMalaysiaToday",
    "Free Malaysia Today",
    "fmtoday",
    "FMT News",
    "FMTNews",
    "FMT Media Sdn Bhd",
    "FMT Media",
  ].join(", "),
  keywords: [
    "Free Malaysia Today",
    "Malaysia News",
    "Latest Malaysia News",
    "Breaking News Malaysia",
    "Malaysia Politics News",
    "Malaysia Economic News",
    "Malaysia International News",
    "Free News Malaysia",
    "24/7 News Malaysia",
    "Malaysian Cultural News",
    "English Malay News Online",
    "Comprehensive Malaysian News.",
  ].join(", "),
};

export const websiteJSONLD = {
  "@context": "https://schema.org",
  "@type": ["WebSite", "CreativeWork"],
  url: "https://www.freemalaysiatoday.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://www.freemalaysiatoday.com/search/?term={search_term_string}&category=all",
    },
    "query-input": "required name=search_term_string",
  },
};

export const WebPageJsonLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  additionalType: "News_Website",
  url: "https://www.freemalaysiatoday.com/",
  inLanguage: [
    "en-MY",
    "en-US",
    "en-GB",
    "en-AU",
    "en-CA",
    "en-NZ",
    "en-IE",
    "en-IN",
    "en-SG",
    "en-ZA",
    "en-PH",
    "en-HK",
    "en-PK",
    "ms-MY",
    "id-ID",
    "jv-ID",
    "su-ID",
    "ms-BN",
    "ms-SG",
  ],
  publisher: OrgJsonLD,
  isPartOf: websiteJSONLD,
};
