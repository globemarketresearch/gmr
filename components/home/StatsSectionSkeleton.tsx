import { Section, Container, Grid, SkeletonText } from '@/components/ui';

export default function StatsSectionSkeleton() {
  return (
    <Section background="card" padding="lg">
      <Container size="xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <SkeletonText lines={1} className="h-10 w-64 mx-auto" />
            <SkeletonText lines={1} className="h-6 w-96 mx-auto" />
          </div>

          <Grid cols={4} gap="lg">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="text-center space-y-2">
                <SkeletonText lines={1} className="h-12 w-24 mx-auto" />
                <SkeletonText lines={1} className="h-5 w-32 mx-auto" />
              </div>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
