import { Container, Text } from '@/components/atoms';
import { ProfileCard } from '@/components/organisms/ProfileCard/ProfileCard';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

export function LeadershipSection() {
  const { leadership } = content.aboutPage;

  return (
    <section className={styles.leadership.container}>
      <Container className={styles.leadership.header}>
        <Text as="h2" className={styles.leadership.title}>
          {leadership.title}
        </Text>
        <Text as="p" className={styles.leadership.subtitle}>
          {leadership.subtitle}
        </Text>
      </Container>
      <Container className={styles.leadership.grid}>
        {leadership.members.map((member) => (
          <ProfileCard
            key={member.name}
            initials={member.initials}
            name={member.name}
            title={member.title}
            description={member.description}
            social={member.social}
          />
        ))}
      </Container>
    </section>
  );
}
