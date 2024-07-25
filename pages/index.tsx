import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getCategoryNews, getOtherSportsNews } from "../lib/api";
import SomeMoreStories from "../components/some-more-stories";
import Link from "next/link";
import Footer from "../components/footer";
import { WebPageJsonLD } from "../lib/json-lds/org";

const categories = ["sports", "football", "tennis", "badminton", "motorsports"];

export default function Index({ allPosts, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>MatchPoint Times | Your Game, Your News, Your Time</title>
        <meta
          name="description"
          content="Dive into the latest updates and expert analysis on Football, Badminton, Motorsports, and Tennis. MatchPoint Times is your ultimate source for all sports news."
        />
        <meta
          name="keywords"
          content="sports news, football, badminton, motorsports, tennis, MatchPoint Times"
        />
        <meta name="author" content="MatchPoint Times" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matchpointtimes.com/" />
        <meta
          property="og:title"
          content="MatchPoint Times | Your Game, Your News, Your Time"
        />
        <meta
          property="og:description"
          content="Dive into the latest updates and expert analysis on Football, Badminton, Motorsports, and Tennis. Your ultimate source for all sports news."
        />
        <meta
          property="og:image"
          content="https://matchpointtimes.com/default-og-image.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://matchpointtimes.com/" />
        <meta
          property="twitter:title"
          content="MatchPoint Times | Your Game, Your News, Your Time"
        />
        <meta
          property="twitter:description"
          content="Dive into the latest updates and expert analysis on Football, Badminton, Motorsports, and Tennis. Your ultimate source for all sports news."
        />
        <meta
          property="twitter:image"
          content="https://matchpointtimes.com/default-og-image.jpg"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WebPageJsonLD) }}
          type="application/ld+json"
          defer
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateCollectionPageJsonLD(allPosts)),
          }}
          type="application/ld+json"
          defer
        />
      </Head>
      <Container>
        <Intro />
        <main>
          {Object.keys(allPosts).map((category) => {
            const posts = allPosts[category].edges.map((edge) => edge.node);
            const heroPost = posts[0];
            const morePosts = posts.slice(1, 4);
            const someMorePosts = posts.slice(4);
            return (
              <section key={category} className="p-5 my-5">
                <div className="flex items-center pb-4">
                  <div className="w-12 border-t-8 border-[#fea11b]"></div>
                  <h2 className="text-3xl font-merriweather mx-3 text-[#71de95]">{`${category
                    .charAt(0)
                    .toUpperCase()}${category.slice(1)} News`}</h2>
                  <div className="flex-grow border-t-8 border-[#fea11b]"></div>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="w-full md:w-1/2">
                    {heroPost && (
                      <HeroPost
                        title={heroPost.title}
                        coverImage={heroPost.featuredImage}
                        date={heroPost.date}
                        author={heroPost.author}
                        slug={heroPost.slug}
                        excerpt={heroPost.excerpt}
                      />
                    )}
                  </div>
                  <div className="w-full md:w-1/2">
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                  </div>
                </div>
                {someMorePosts.length > 0 && (
                  <SomeMoreStories
                    posts={someMorePosts}
                    categoryName={category}
                  />
                )}
                <div className="flex mt-8 justify-center items-center w-full">
                  <Link
                    href={`https://www.freemalaysiatoday.com/category/category/sports/${category}/`}
                    target="_blank"
                    rel="noopener"
                    className="flex justify-center font-rhd text-center w-[50%] px-6 py-3 bg-[#fea11b] text-black font-semibold text-2xl rounded-md hover:bg-[#71de95] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  >
                    {getAnchorText(category)}
                  </Link>
                </div>
              </section>
            );
          })}
        </main>
      </Container>
      <Footer />
    </Layout>
  );
}
const getAnchorText = (category) => {
  const texts = {
    football: "Explore Latest Football Updates",
    tennis: "Discover Tennis News and Insights",
    motorsports: "Get the Latest on Motorsports",
    badminton: "Catch Up on Badminton Highlights",
  };
  return texts[category] || "Read More Stories";
};

const generateCollectionPageJsonLD = (allPosts) => {
  return {
    "@context": "http://schema.org",
    "@type": "CollectionPage",
    headline: "MatchPoint Times | Your Game, Your News, Your Time",
    description:
      "Dive into the latest updates and expert analysis on Football, Badminton, Motorsports, and Tennis.",
    url: "https://matchpointtimes.com/",
    hasPart: Object.keys(allPosts).map((category) => ({
      "@type": "Article",
      headline: `${category.charAt(0).toUpperCase()}${category.slice(1)} News`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.freemalaysiatoday.com/category/category/sports/${category}/`,
      },
      articleSection: category,
      image: allPosts[category].edges[0]?.node.featuredImage.node.sourceUrl,
      datePublished: `${allPosts[category].edges[0]?.node.date}+08:00`,
      author: {
        "@type": "Person",
        name: allPosts[category].edges[0]?.node.author.node.name,
        url: `https://matchpointtimes.com/contributors/${allPosts[category].edges[0]?.node.author.node.slug}`,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const postsByCategory = await Promise.all(
    categories.map((category) =>
      category !== "sports"
        ? getCategoryNews(category, preview)
        : getOtherSportsNews(category, preview)
    )
  );

  const allPosts = categories.reduce((acc, category, index) => {
    acc[category] = postsByCategory[index];
    return acc;
  }, {});

  return {
    props: { allPosts, preview },
    revalidate: 360,
  };
};
