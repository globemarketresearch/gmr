interface StyledReportContentProps {
  htmlContent: string;
  reportSlug?: string;
}

export function StyledReportContent({ htmlContent }: StyledReportContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none text-[#333333] styled-report-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
