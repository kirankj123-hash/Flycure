import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { Icon } from '@/components/atoms/Icon/Icon';
import { styles } from '@/styles/design-system';
import { cn } from '@/lib/utils/cn';

export interface IconStepCardProps {
  iconPath: string;
  stepNumber: number;
  title: string;
  description: string;
  className?: string;
}

export function IconStepCard({
  iconPath,
  stepNumber,
  title,
  description,
  className,
}: IconStepCardProps) {
  return (
    <Container className={cn(styles.pillarsOfCare.item, className)}>
      <Icon className={styles.pillarsOfCare.icon}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d={iconPath}
        />
      </Icon>
      <Container className={styles.pillarsOfCare.content}>
        <Text as="h3" className={styles.pillarsOfCare.itemTitle}>
          <Text as="span" className={styles.pillarsOfCare.stepNumber}>
            {stepNumber}.
          </Text>{' '}
          {title}
        </Text>
        <Text className={styles.pillarsOfCare.itemDescription}>
          {description}
        </Text>
      </Container>
    </Container>
  );
}
