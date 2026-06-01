import { Section, Container } from '@/components/ui';
import Image from 'next/image';

interface Partner {
  name: string;
  id: string;
  logo: string;
}

const partners: Partner[] = [
  { id: 'agronne', name: 'Argonne', logo: '/assets/logos/Agronne.png' },
  { id: 'bcg', name: 'Boston Consulting Group', logo: '/assets/logos/BCG.png' },
  { id: 'cdc', name: 'CDC', logo: '/assets/logos/CDC.png' },
  { id: 'championx', name: 'ChampionX', logo: '/assets/logos/ChampionX.png' },
  { id: 'kawasaki', name: 'Kawasaki', logo: '/assets/logos/Kawasaki.png' },
  { id: 'meta', name: 'Meta', logo: '/assets/logos/Meta.png' },
  { id: 'mitsubishi', name: 'Mitsubishi', logo: '/assets/logos/Mitsubishi.png' },
  { id: 'nestle', name: 'Nestlé Professional', logo: '/assets/logos/Nestle Professional.png' },
  { id: 'pwc', name: 'PwC', logo: '/assets/logos/PWC.png' },
  { id: 'sk', name: 'SK', logo: '/assets/logos/SK.png' },
  { id: 'suzuki', name: 'Suzuki', logo: '/assets/logos/Suzuki.png' },
  { id: 'trivago', name: 'Trivago', logo: '/assets/logos/Trivago.png' },
];

export default function TrustedPartnersSection() {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <Section background="card" padding="sm">
      <Container size="xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]" style={{ letterSpacing: '-0.03em' }}>
              Trusted Partners
            </h2>
            <p className="font-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Collaborating with industry leaders to deliver exceptional insights
            </p>
          </div>

          <div className="relative overflow-hidden">
            {/* Edge fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--card)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--card)] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-scroll-horizontal gap-5 py-2">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-[220px] h-[112px] flex items-center justify-center px-8 py-5 rounded-xl border border-[var(--border-color)] bg-[var(--surface-raised)] hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-sm)] transition-all duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={180}
                    height={84}
                    className="object-contain max-w-full max-h-full"
                    sizes="180px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
