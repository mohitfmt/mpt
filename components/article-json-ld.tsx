import { stripHTML, formattedJsonDate } from "../lib/html-utils";

const extractFirstParagraph = (htmlContent: string) => {
  const paragraphPattern = /<p>(.*?)<\/p>/;
  const match = htmlContent?.match(paragraphPattern);
  return match ? match[1].trim() : null;
};
const extractLocation = (content: string) => {
  const locationPattern = /^([A-Z\s]+:)\s+/;
  const match = content?.match(locationPattern);
  if (match) {
    return match[1].slice(0, -1).trim();
  }
  return "MALAYSIA";
};

const ArticleJsonLD = ({ data }) => {
  const extractYouTubeID = (content: string): string | null => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = content?.match(regex);
    return match ? match[1] : null;
  };
  const keywords = data?.tags?.edges
    ?.map(({ node }: any) => node?.name)
    .join(", ");
  // remove last / slash from the domainUrl
  let domainUrl = "https://matchpointtimes.com/";
  let fullUrl = `${domainUrl}posts/${data?.slug}`;

  const stripContent = stripHTML(data?.content);
  const firstParagraph = extractFirstParagraph(data?.content);
  const location = extractLocation(firstParagraph ?? "");

  const timeToRead = Math.ceil(stripContent?.split(" ").length / 200);
  const durationToReadNews = "PT" + timeToRead + "M";

  const urlSegments = fullUrl.split("/");
  const categoryIndex = urlSegments.findIndex((part) => part === "category");
  const articleCategory =
    categoryIndex !== -1 ? urlSegments[categoryIndex + 1] : "notfound";
  let articleType = "NewsArticle";
  let articleLanguage = "en";
  const cleanExcerpt = stripHTML(data?.excerpt);

  let videoJsonLD = null;
  const videoData = extractYouTubeID(data?.content);
  if (videoData) {
    videoJsonLD = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: data?.title,
      description: cleanExcerpt,
      uploadDate: formattedJsonDate(data?.dateGmt),
      thumbnailUrl: data?.featuredImage?.node?.sourceUrl,
      contentUrl: `https://www.youtube.com/watch?v=${videoData}`,
      embedUrl: `https://www.youtube.com/embed/${videoData}`,
    };
  }
  return (
    <>
      {videoJsonLD && (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoJsonLD),
          }}
          id="video-json-ld"
          type="application/ld+json"
          defer
        />
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": articleType,
            name: data?.title,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": fullUrl,
            },
            url: fullUrl,
            headline: data?.title,
            about: `${data?.title} - ${cleanExcerpt}`,
            alternativeHeadline: cleanExcerpt,
            abstract: `${data?.title} - ${cleanExcerpt}`,
            articleSection: data?.categories?.edges?.map(
              (category) => category.node.name
            ),
            articleBody: stripContent,
            wordCount: stripContent?.split(" ").length,
            timeRequired: durationToReadNews,
            countryOfOrigin: {
              "@type": "Country",
              name: "Malaysia",
            },
            isAccessibleForFree: true,
            image: {
              "@context": "https://schema.org",
              "@type": "ImageObject",
              "@id": data?.featuredImage?.node?.sourceUrl,
              url: data?.featuredImage?.node?.sourceUrl,
              height: data?.featuredImage?.node?.mediaDetails?.height,
              width: data?.featuredImage?.node?.mediaDetails?.width,
              representativeOfPage: true,
              caption: data?.title ?? "Free Malaysia Today",
              contentUrl: data?.featuredImage?.node?.sourceUrl,
              creditText: data?.title ?? "Free Malaysia Today",
              license: "https://www.freemalaysiatoday.com/privacy-policy/",
              acquireLicensePage:
                "https://www.freemalaysiatoday.com/privacy-policy/",
              creator: {
                "@type": "Organization",
                name: "Free Malaysia Today",
                url: "https://www.freemalaysiatoday.com/",
              },
              copyrightNotice: `© Free Malaysia Today, ${new Date().getFullYear()}`,
            },
            thumbnailUrl: data?.featuredImage?.node?.sourceUrl,
            dateCreated: formattedJsonDate(data?.dateGmt),
            datePublished: formattedJsonDate(data?.dateGmt),
            dateModified: formattedJsonDate(data?.modifiedGmt),
            contentLocation: {
              "@type": "Place",
              name: location,
            },
            author: [
              {
                "@type": "NewsMediaOrganization",
                name: "Free Malaysia Today",
                url: `https://www.freemalaysiatoday.com`,
              },
            ],
            publisher: {
              "@type": "NewsMediaOrganization",
              name: "Free Malaysia Today",
              url: "https://www.freemalaysiatoday.com/",
              logo: {
                "@type": "ImageObject",
                url: "https://www.freemalaysiatoday.com/icon-512x512.png",
                width: 512,
                height: 512,
              },
            },
            inLanguage: articleLanguage,
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".headline", ".news-content"],
            },
            keywords,
            potentialAction: {
              "@type": "ReadAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: fullUrl,
              },
              actionStatus: "PotentialActionStatus",
            },
          }),
        }}
        id="article-json-ld"
        type="application/ld+json"
        defer
      />
    </>
  );
};

export default ArticleJsonLD;
