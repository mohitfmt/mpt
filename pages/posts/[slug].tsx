import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Tags from "../../components/tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import Intro from "../../components/intro";
import ArticleJsonLD from "../../components/article-json-ld";

export default function Post({ post, posts, preview }) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        {/* <Header /> */}
        <Intro />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <main>
            <article>
              <Head>
                <title>{`${post?.title} | Match Point Times`}</title>
                <meta name="description" content={post?.excerpt} />
                <meta
                  name="keywords"
                  content={post?.tags?.edges
                    ?.map((tag) => tag.node.name)
                    .join(", ")}
                />
                <meta name="author" content="Free Malaysia Today (FMT)" />
                <meta property="og:type" content="website" />
                <meta
                  property="og:url"
                  content={`https://matchpointtimes.com/posts/${post?.slug}`}
                />
                <meta property="og:title" content={post?.title} />
                <meta property="og:description" content={post?.excerpt} />
                <meta
                  property="og:image"
                  content={post?.featuredImage?.node?.sourceUrl}
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta
                  property="twitter:url"
                  content={`https://matchpointtimes.com/posts/${post?.slug}`}
                />
                <meta property="twitter:title" content={post?.title} />
                <meta property="twitter:description" content={post?.excerpt} />
                <meta
                  property="twitter:image"
                  content={post?.featuredImage?.node.sourceUrl}
                />
              </Head>
              <ArticleJsonLD data={post} />
              <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </main>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
};
