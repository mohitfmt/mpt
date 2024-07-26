export default function Tags({ tags }) {
  return (
    <div className="mx-auto mt-20">
      <p className="mt-8 text-lg font-bold">
        Tags:
        {tags.edges.map((tag, index) => (
          <span key={index} className="ml-4 font-normal">
            {tag.node.name}
          </span>
        ))}
      </p>
    </div>
  );
}
