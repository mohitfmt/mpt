import React from "react";
import styles from "./post-body.module.css";
import Link from "next/link";

export default function PostBody({ content, fullArticleUrl }) {
  const firstFigureRegex = /<figure[^>]*>[\s\S]*?<\/figure>/i;
  const paragraphs = content.replace(firstFigureRegex, "").split("</p>");
  const teaserContent = paragraphs.slice(0, 2).join("</p>") + "</p>";
  const gradientOverlay =
    `<div class="${styles.gradientOverlay}">` + paragraphs[2] + "</div>";

  return (
    <div className="mx-auto px-2">
      <div
        className={`${styles.content} news-content`}
        dangerouslySetInnerHTML={{ __html: teaserContent + gradientOverlay }}
      ></div>
      <div className="flex justify-center items-center">
        <Link
          href={`https://www.freemalaysiatoday.com${fullArticleUrl}`}
          target="_blank"
          rel="noopener"
          className="py-4 px-8 font-‰merriweather text-lg md:text-xl bg-white rounded-lg text-black"
        >
          <span className="hidden md:block">
            Discover More: Uncover Full Details Now
          </span>
          <span className="flex md:hidden">Read Full News</span>
        </Link>
      </div>
    </div>
  );
}
