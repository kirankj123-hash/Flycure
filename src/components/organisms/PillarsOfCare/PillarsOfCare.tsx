import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { IconStepCard } from '@/components/molecules/IconStepCard/IconStepCard';
import { styles } from '@/styles/design-system';

const pillars = [
  {
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    stepNumber: 1,
    title: 'Verified Surgical Excellence',
    description: 'Access top-tier surgeons with impeccable track records. Every medical step is transparently planned and documented, guaranteeing the highest standard of care before you commit.',
  },
  {
    iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    stepNumber: 2,
    title: 'Guaranteed Recovery Comfort',
    description: 'We pre-vet accommodations for ultimate safety and hospital proximity. Your recovery environment is secured to be peaceful and supportive, eliminating any lodging stress.',
  },
  {
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    stepNumber: 3,
    title: 'Legal & Visa Assurance',
    description: 'All services are codified in a clear, written agreement. We handle the complexities of medical visas and ensure every aspect of your trip is legally secured and fully transparent.',
  },
  {
    iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
    stepNumber: 4,
    title: 'Seamless Ground Transport',
    description: 'From airport pickups to hospital transfers, all your local travel is managed by our dedicated team, ensuring you navigate the city with ease and comfort.',
  },
  {
    iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    stepNumber: 5,
    title: '24/7 Personal Coordinator',
    description: 'A dedicated coordinator is available around the clock to assist with any need, from medical queries to local recommendations, providing continuous support throughout your stay.',
  },
];

export function PillarsOfCare() {
  return (
    <section className={styles.page.section}>
      <Container className={styles.pillarsOfCare.header}>
        <Text as="h2" className={styles.section.title}>
          The 5 Pillars of Flycure Care
        </Text>
        <Text className={styles.pillarsOfCare.subtitle}>
          We&apos;ve built our service on five core principles to ensure your medical journey is safe, transparent, and comfortable from start to finish.
        </Text>
      </Container>

      <Container className={styles.pillarsOfCare.list}>
        {pillars.map((pillar) => (
          <IconStepCard
            key={pillar.stepNumber}
            stepNumber={pillar.stepNumber}
            title={pillar.title}
            description={pillar.description}
            iconPath={pillar.iconPath}
          />
        ))}
      </Container>
    </section>
  );
}
