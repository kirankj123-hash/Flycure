import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { Link } from '@/components/atoms/Link/Link';
import { styles } from '@/styles/design-system';

interface HeroAction {
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  actions: HeroAction;
}

export function HeroSection({ title, subtitle, actions }: HeroSectionProps) {
  return (
    <Container as="section" className={styles.hero.container}>
      <Container className={styles.hero.content}>
        <Text as="h1" className={styles.hero.title}>
          {title}
        </Text>
        <Text className={styles.hero.subtitle}>
          {subtitle}
        </Text>
        <Container className={styles.hero.actions}>
          <Link href={actions.primaryHref} className={styles.hero.primaryAction}>
            {actions.primary}
          </Link>
          <Link href={actions.secondaryHref} className={styles.hero.secondaryAction}>
            {actions.secondary} &rarr;
          </Link>
        </Container>
      </Container>
    </Container>
  );
}
