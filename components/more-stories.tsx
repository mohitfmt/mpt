import PostPreview from "./post-preview";

export default function MoreStories({ posts }) {
  return (
    <section className="flex flex-col">
      {posts?.map((node) => (
        <PostPreview
          key={node?.slug}
          title={node?.title}
          excerpt={node?.excerpt}
          coverImage={node?.featuredImage}
          date={node?.date}
          slug={node?.slug}
        />
      ))}
    </section>
  );
}
