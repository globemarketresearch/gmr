import type { Metadata } from "next";
import { Section, Container, Badge } from "@/components/ui";
import SubmitNewsClient from "./SubmitNewsClient";

export const metadata: Metadata = {
  title: "Submit News & Press Releases | GlobeMarketResearch",
  description:
    "Publish your press releases, articles, and industry news on GlobeMarketResearch. Choose a plan that fits your needs — pay per submission or unlock bulk credit discounts.",
};

export default function SubmitNewsPage() {
  return (
    <>
      {/* Hero */}
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="primary" size="md">
              Publish Your News
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Submit News &amp; Press Releases
            </h1>
            <p className="text-lg text-[var(--muted-foreground)]">
              Reach a global audience of industry professionals, analysts, and decision-makers.
              Submit your press releases, articles, and opinion pieces for publication on GlobeMarketResearch.
            </p>
          </div>
        </Container>
      </Section>

      {/* Pricing cards + modal + guidelines (all client-side interactions) */}
      <SubmitNewsClient />
    </>
  );
}
