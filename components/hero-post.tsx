import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <article>
      <header className="relative mb-8">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
        <div className="absolute -bottom-4 -left-1 -right-1 text-center bg-gradient-to-t from-[#201c1c] from-60% to-transparent">
          <h3
            className="text-center text-3xl md:text-4xl text-white font-extrabold font-rhd px-2"
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.85)" }}
          >
            <Link
              href={`/posts/${slug}`}
              dangerouslySetInnerHTML={{ __html: title }}
            ></Link>
          </h3>
        </div>
      </header>
      <div
        className="text-xl font-thin mb-4 font-rhd"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <div className="flex items-center justify-between">
        <Avatar author={author} />
        <Date dateString={date} />
      </div>
    </article>
  );
}
