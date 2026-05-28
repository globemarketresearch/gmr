interface StyledArticleContentProps {
  htmlContent: string;
}

export function StyledArticleContent({ htmlContent }: StyledArticleContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none text-[#333333] styled-article-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
