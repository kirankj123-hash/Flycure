import { Text } from '@/components/atoms/Text/Text';
import { styles } from '@/styles/design-system';
import { theme } from '@/styles/theme';

interface JourneyStepCardProps {
  step: number | string;
  title: string;
  description: string;
}

export function JourneyStepCard({ step, title, description }: JourneyStepCardProps) {
  return (
    <div className={styles.journey.card}>
    <Text as="span" className={styles.journey.step} style={{ color: theme.colors.secondary }}>
      {step}
    </Text>
      <Text as="h3" className={styles.journey.title}>
        {title}
      </Text>
      <Text className={styles.journey.description}>
        {description}
      </Text>
    </div>
  );
}
