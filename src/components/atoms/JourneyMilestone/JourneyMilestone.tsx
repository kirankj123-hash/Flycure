import { Container, Text } from '@/components/atoms';
import { styles } from '@/styles/design-system';

interface JourneyMilestoneProps {
  year: string;
  description: string;
}

export function JourneyMilestone({ year, description }: JourneyMilestoneProps) {
  return (
    <Container className={styles.ourJourney.milestone}>
      <Container className={styles.ourJourney.dot}>{null}</Container>
      <Text as="h3" className={styles.ourJourney.year}>
        {year}
      </Text>
      <Text className={styles.ourJourney.description}>{description}</Text>
    </Container>
  );
}
