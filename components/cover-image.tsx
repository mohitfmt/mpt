import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  coverImage: {
    node: {
      sourceUrl: string;
    };
  };
  slug?: string;
  priority?: boolean;
}

export default function CoverImage({
  title,
  coverImage,
  slug,
  priority = false,
}: Props) {
  const image = (
    <Image
      height={1000}
      width={1600}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node?.sourceUrl}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="rounded-xl"
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
