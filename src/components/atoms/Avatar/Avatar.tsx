import { Container, Text } from '@/components/atoms';
import { styles } from '@/styles/design-system';
import { cn } from '@/lib/utils/cn';

export interface AvatarProps {
  initials: string;
  className?: string;
}

export function Avatar({ initials, className }: AvatarProps) {
  return (
    <Container className={cn(styles.avatar.base, className)}>
      <Text as="span" className={styles.avatar.initials}>
        {initials}
      </Text>
    </Container>
  );
}
