import styles from "./post-body.module.css";

export default function PostBody({ content }) {
  const firstFigureRegex = /<figure[^>]*>[\s\S]*?<\/figure>/i;
  const updatedContent = content.replace(firstFigureRegex, "");

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`${styles.content} news-content`}
        dangerouslySetInnerHTML={{ __html: updatedContent }}
      />
    </div>
  );
}
