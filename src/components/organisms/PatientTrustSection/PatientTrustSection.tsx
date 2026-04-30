import { Container, Text } from '@/components/atoms';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

export function PatientTrustSection() {
  const { patientTrust } = content.howPage;

  return (
    <section className={styles.patientTrust.container}>
      <Container className={styles.patientTrust.header}>
        <Text as="h2" className={styles.patientTrust.title}>
          {patientTrust.title}
        </Text>
        <Text as="p" className={styles.patientTrust.subtitle}>
          {patientTrust.subtitle}
        </Text>
      </Container>
      <Container className={styles.patientTrust.grid}>
        {patientTrust.cards.map((card) => (
          <FeatureCard
            key={card.title}
            title={card.title}
            description={card.description}
            align="left"
            className={styles.patientTrust.card}
          />
        ))}
      </Container>
    </section>
  );
}
