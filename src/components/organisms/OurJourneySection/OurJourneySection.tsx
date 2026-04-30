import { Container, Text } from '@/components/atoms';
import { JourneyMilestone } from '@/components/atoms/JourneyMilestone';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

export function OurJourneySection() {
  const { ourJourney } = content.aboutPage;

  return (
    <section className={styles.ourJourney.container}>
      <Container className={styles.ourJourney.header}>
        <Text as="h2" className={styles.ourJourney.title}>
          {ourJourney.title}
        </Text>
        <Text as="p" className={styles.ourJourney.subtitle}>
          {ourJourney.subtitle}
        </Text>
      </Container>
      <Container className={styles.ourJourney.timeline}>
        <Container className={styles.ourJourney.line}>{null}</Container>
        {ourJourney.milestones.map((milestone) => (
          <JourneyMilestone
            key={milestone.year}
            year={milestone.year}
            description={milestone.description}
          />
        ))}
      </Container>
    </section>
  );
}
