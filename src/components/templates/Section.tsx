import { FC, ReactNode } from 'react';

import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { cn } from '@/lib/utils/cn';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  title?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  subtitle?: string;
  isSurface?: boolean;
}

export const Section: FC<SectionProps> = ({
  id,
  className,
  children,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  isSurface = false,
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-14 sm:py-16 md:py-20 lg:py-24',
        isSurface && 'bg-surface',
        className
      )}
    >
      <Container>
        {(title || subtitle) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {title && (
              <Text as="h2"  className={titleClassName}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text as="p"  className={subtitleClassName}>
                {subtitle}
              </Text>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};
