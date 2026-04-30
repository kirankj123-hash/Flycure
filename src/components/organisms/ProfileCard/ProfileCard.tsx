import { Container, Icon, Text } from '@/components/atoms';
import { Avatar } from '@/components/atoms/Avatar';
import { styles } from '@/styles/design-system';

interface ProfileCardProps {
  initials: string;
  name: string;
  title: string;
  description: string;
  social: {
    url: string;
    text?: string;
  };
}

export function ProfileCard({
  initials,
  name,
  title,
  description,
  social,
}: ProfileCardProps) {
  return (
    <Container className={styles.profileCard.container}>
      <Avatar initials={initials} className={styles.profileCard.avatar} />
      <Container>
        <Text as="h3" className={styles.profileCard.name}>
          {name}
        </Text>
        <Text as="p" className={styles.profileCard.title}>
          {title}
        </Text>
      </Container>
      <Text className={styles.profileCard.description}>{description}</Text>
      <a
        href={social.url}
        className={styles.profileCard.socialLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.profileCard.socialIcon}>
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <path d="M4 6a2 2 0 100-4 2 2 0 000 4z" />
        </Icon>
        {social.text && <Text as="span">{social.text}</Text>}
      </a>
    </Container>
  );
}
