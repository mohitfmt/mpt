export default function PostTitle({ children }) {
  return (
    <h1
      className="headline text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-6 text-center md:text-left font-rhd"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
