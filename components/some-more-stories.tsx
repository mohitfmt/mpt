import PreviewSomeMore from "./some-more-preview";

export default function SomeMoreStories({ posts, categoryName }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5 mt-10">
      {posts?.map((node) => (
        <PreviewSomeMore
          key={node?.slug}
          title={node?.title}
          author={node?.author}
          date={node?.date}
          slug={node?.slug}
          excerpt={node?.excerpt}
        />
      ))}
    </section>
  );
}
