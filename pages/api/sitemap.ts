import axios from "axios";
import xml2js from "xml2js";

export default async function sitemap(req, res) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Get the current month as a number

  try {
    const parser = new xml2js.Parser();
    let allSitemapEntries = [];

    // Create an array of promises to fetch the sitemap for each month concurrently
    const sitemapPromises = [];

    for (let month = 1; month <= currentMonth; month++) {
      const formattedMonth = String(month).padStart(2, "0");
      const url = `https://cms.freemalaysiatoday.com/sitemap-posttype-post.${currentYear}${formattedMonth}.xml`;
      sitemapPromises.push(
        axios.get(url).catch((error) => {
          console.warn(`Failed to fetch sitemap for ${formattedMonth}:`, error);
          return null;
        })
      );
    }

    // Wait for all promises to resolve
    const responses = await Promise.all(sitemapPromises);

    // Process the resolved responses
    for (const response of responses) {
      if (response && response.data) {
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

        // Append the current month's entries to the overall list
        allSitemapEntries = allSitemapEntries.concat(sitemapEntries);
      }
    }

    // Add homepage to the sitemap entries
    allSitemapEntries.push({
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
        url: allSitemapEntries,
      },
    });

    res.setHeader("Content-Type", "application/xml");
    res.send(sitemapXml);
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    res.status(500).send("Failed to generate sitemap");
  }
}
