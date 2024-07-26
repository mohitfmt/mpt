// pages/api/sitemap.js
import axios from "axios";
import xml2js from "xml2js";

export default async function sitemap(req, res) {
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const url = `https://cms.freemalaysiatoday.com/sitemap-posttype-post.${currentYear}${currentMonth}.xml`;

  try {
    const response = await axios.get(url);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    const urls = result.urlset.url;

    const sportsUrls = urls.filter((entry) =>
      entry.loc[0].includes("category/sports/")
    );

    const sitemapEntries = sportsUrls.map((entry) => {
      const url = entry.loc[0];
      const slug = url.replace(/\/$/, "").split("/").pop();
      return {
        loc: `https://matchpointtimes.com/posts/${slug}`,
        lastmod: entry.lastmod[0], // Using the lastmod from the original sitemap entry
        changefreq: "daily",
        priority: 0.8,
      };
    });

    // Add homepage to the sitemap entries
    sitemapEntries.push({
      loc: "https://matchpointtimes.com/",
      lastmod: new Date().toISOString().split("T")[0], // Use the current date for the homepage
      changefreq: "daily",
      priority: 1.0,
    });

    // Build a new sitemap XML with these URLs
    const builder = new xml2js.Builder({
      xmldec: { version: "1.0", encoding: "UTF-8" },
      renderOpts: { pretty: true },
      headless: false,
    });

    const sitemapXml = builder.buildObject({
      urlset: {
        $: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
        },
        url: sitemapEntries,
      },
    });

    res.setHeader("Content-Type", "application/xml");
    res.send(sitemapXml);
  } catch (error) {
    console.error("Failed to fetch or parse the sitemap:", error);
    res.status(500).send("Failed to generate sitemap");
  }
}
