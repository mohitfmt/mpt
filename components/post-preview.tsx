import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  excerpt,
  coverImage,
  date,
  slug,
}) {
  return (
    <article className="flex gap-2 mb-8">
      <figure className="w-1/2 md:w-1/3">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
      </figure>
      <div className="w-1/2 md:w-2/3">
        <header>
          <h3 className="text-xl md:text-2xl mb-3 font-semibold font-rhd">
            <Link
              href={`/posts/${slug}`}
              dangerouslySetInnerHTML={{ __html: title }}
            ></Link>
          </h3>
        </header>
        <div
          className="text-base font-thin hidden md:flex"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <div className="text-sm text-right">
          <Date dateString={date} />
        </div>
      </div>
    </article>
  );
}
