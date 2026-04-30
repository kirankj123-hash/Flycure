import { Container, Text } from '@/components/atoms';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

export function CoreValuesSection() {
  const { coreValues } = content.aboutPage;

  return (
    <section className={styles.coreValues.container}>
      <Container className={styles.coreValues.header}>
        <Text as="h2" className={styles.coreValues.title}>
          {coreValues.title}
        </Text>
        <Text as="p" className={styles.coreValues.subtitle}>
          {coreValues.subtitle}
        </Text>
      </Container>
      <Container className={styles.coreValues.grid}>
        {coreValues.values.map((value) => (
          <FeatureCard
            key={value.title}
            iconPath={value.iconPath}
            title={value.title}
            description={value.description}
            className={styles.coreValues.card}
          />
        ))}
      </Container>
    </section>
  );
}
