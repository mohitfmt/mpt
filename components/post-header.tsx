import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Categories from "./categories";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
  excerpt,
}) {
  return (
    <section className="px-2">
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <h2
        className="headline text-2xl font-thin mb-6 text-center md:text-left font-merriweather"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <div className="mx-auto text-right">
        <Date dateString={date} />
      </div>
    </section>
  );
}
