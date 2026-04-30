import { Container, Text } from '@/components/atoms';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

export function AccreditedPartnersSection() {
  const { accreditedPartners } = content.aboutPage;

  return (
    <section className={styles.accreditedPartners.container}>
      <Container className={styles.accreditedPartners.header}>
        <Text as="h2" className={styles.accreditedPartners.title}>
          {accreditedPartners.title}
        </Text>
        <Text as="p" className={styles.accreditedPartners.subtitle}>
          {accreditedPartners.subtitle}
        </Text>
      </Container>
      <Container className={styles.accreditedPartners.grid}>
        {accreditedPartners.partners.map((partner) => (
          <Container key={partner} className={styles.accreditedPartners.partner}>
            {partner}
          </Container>
        ))}
      </Container>
    </section>
  );
}
