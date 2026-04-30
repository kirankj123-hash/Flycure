import { Container } from '@/components/atoms/Container/Container';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Text } from '@/components/atoms/Text/Text';
import { styles } from '@/styles/design-system';

interface FeatureCheckProps {
  text: string;
}

export function FeatureCheck({ text }: FeatureCheckProps) {
  return (
    <Container className={styles.hero.featureItem}>
      <Icon className={styles.hero.featureIcon}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </Icon>
      <Text>{text}</Text>
    </Container>
  );
}
