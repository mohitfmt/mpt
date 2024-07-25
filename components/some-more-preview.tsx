import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PreviewSomeMore({
  title,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className="border-b border-slate-500">
      <h3 className="text-3xl font-semibold mb-3 font-rhd">
        <Link
          href={`/posts/${slug}`}
          dangerouslySetInnerHTML={{ __html: title }}
        ></Link>
      </h3>

      <div
        className="text-base font-thin"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <div className="flex items-center justify-end text-sm py-3">
        <Date dateString={date} />
        <span className="mx-2">🟡</span>
        <span className="font-bold">{author?.node?.name}</span>
      </div>
    </div>
  );
}
