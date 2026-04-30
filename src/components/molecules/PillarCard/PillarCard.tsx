import { AtomicImage } from '@/components/atoms/Image/Image';
import { Text } from '@/components/atoms/Text/Text';
import { styles } from '@/styles/design-system';
import { cn } from '@/lib/utils/cn';

interface PillarCardProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

export function PillarCard({ eyebrow, title, description, imageSrc, reverse = false }: PillarCardProps) {
  return (
    <div className={cn('flex flex-col gap-6 md:gap-8', reverse && 'lg:flex-row-reverse', !reverse && 'lg:flex-row')}>
      <div className="w-full lg:w-1/2">
        <AtomicImage
          src={imageSrc}
          alt={title}
          width={600}
          height={400}
          className="h-64 w-full rounded-2xl object-cover shadow-sm md:h-80"
        />
      </div>
      <div className="flex w-full flex-col justify-center lg:w-1/2">
        <Text as="span" className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </Text>
        <Text as="h3" className={styles.pillarsOfCare.itemTitle}>
          {title}
        </Text>
        <Text className={styles.pillarsOfCare.itemDescription}>
          {description}
        </Text>
      </div>
    </div>
  );
}
