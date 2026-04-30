import { Container } from '@/components/atoms/Container/Container';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Link } from '@/components/atoms/Link/Link';
import { Text } from '@/components/atoms/Text/Text';
import { styles } from '@/styles/design-system';
import { cn } from '@/lib/utils/cn';
import { LucideIcon } from 'lucide-react';
import { theme } from '@/styles/theme';

export interface FeatureCardProps {
  iconPath?: string;
  stepIconPath?: string;
  iconComponent?: LucideIcon;
  title: string;
  description: string;
  highlightedText?: string;
  link?: {
    href: string;
    text: string;
  };
  bottomLink?: {
    href: string;
    text: string;
  };
  isBordered?: boolean;
  align?: 'center' | 'left';
  className?: string;
}

export function FeatureCard({
  iconPath,
  stepIconPath,
  iconComponent,
  title,
  description,
  highlightedText,
  link,
  bottomLink,
  isBordered,
  align = 'center',
  className,
}: FeatureCardProps) {
  const alignmentClass =
    align === 'center'
      ? styles.card.alignCenter
      : styles.card.alignLeft;

  return (
    <Container
      className={cn(
        styles.card.base,
        alignmentClass,
        isBordered && styles.card.bordered,
        className
      )}
    >
      {stepIconPath && (
        <Container className={styles.card.stepIconContainer}>
          <Icon className={styles.card.stepIcon} >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={stepIconPath}
            />
          </Icon>
        </Container>
      )}
      {(iconComponent || iconPath) && (
        <Container className={styles.card.header}>
          {iconComponent ? (
            (() => {
              const IconComponent = iconComponent;
              return <IconComponent className={styles.card.icon} aria-hidden color={theme.colors.secondary} />;
            })()
          ) : (
            <Icon className={styles.card.icon}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={iconPath}
              />
            </Icon>
          )}
        </Container>
      )}
      <Text as="h3" className={styles.card.title}>
        {title}
      </Text>
      <Text className={styles.card.description}>{description}</Text>
      {highlightedText && (
        <Text className={styles.card.highlightedText}>{highlightedText}</Text>
      )}
      {link && (
        <Link href={link.href} className={cn(styles.card.link, 'group')}>
          {link.text}
          <Icon className={styles.card.linkIcon}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </Icon>
        </Link>
      )}
      {bottomLink && (
        <Link href={bottomLink.href} className={styles.card.bottomLink}>
          {bottomLink.text}
        </Link>
      )}
    </Container>
  );
}
