'use client';

import { Grid } from '@/components/ui';
import AuthorCard from '@/components/authors/AuthorCard';
import type { ApiAuthor } from '@/lib/api/common.types';

interface MeetTheTeamProps {
  teamMembers: ApiAuthor[];
}

export default function MeetTheTeam({ teamMembers }: MeetTheTeamProps) {
  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section id="meet-the-team" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-[var(--teal-deep)] mb-3">
        Meet the Team
      </h2>
      <p className="text-[var(--muted-foreground)] mb-8">
        This report was prepared by our expert analysts with deep industry knowledge and
        research experience.
      </p>

      <Grid cols={2} gap="lg">
        {teamMembers.map((member) => (
          <AuthorCard key={member.id} author={member} />
        ))}
      </Grid>
    </section>
  );
}
