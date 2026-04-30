import { Container } from '@/components/atoms';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

export function DetailedJourneySection() {
  const { detailedJourney } = content.howPage;

  return (
    <section id="detailed-journey" className={styles.detailedJourney.container}>
      <Container className={styles.detailedJourney.grid}>
        {detailedJourney.steps.map((step) => (
          <FeatureCard
            key={step.title}
            stepIconPath={step.iconPath}
            title={step.title}
            description={step.description}
            highlightedText={step.highlightedText}
            bottomLink={step.bottomLink}
          />
        ))}
      </Container>
    </section>
  );
}
