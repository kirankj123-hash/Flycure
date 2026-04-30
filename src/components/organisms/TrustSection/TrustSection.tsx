import { FC } from 'react';
import { Section } from '@/components/templates/Section';
import { Text } from '@/components/atoms/Text/Text';
import content from '@/content/en.json';
import {
  HeartHandshake,
  Receipt,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { theme } from '@/styles/theme';

const trustIconMap = {
  'user-check': UserCheck,
  'trending-up': TrendingUp,
  'receipt': Receipt,
  'heart-handshake': HeartHandshake,
} as const;

export const TrustSection: FC = () => {
  const { trustSection } = content.mainLandingPage;

  return (
    <Section title={trustSection.title} subtitle={trustSection.subtitle} titleClassName='text-4xl text-center font-bold tracking-tight mb-4' subtitleClassName='text-xl text-center text-[--text-secondary] mb-12 max-w-2xl mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {trustSection.tiles.map((tile) => {
          const IconComponent = trustIconMap[tile.icon as keyof typeof trustIconMap];

          return (
            <div
              key={tile.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                {IconComponent && (
                  <IconComponent className="w-8 h-8 text-fly-blue flex-shrink-0" aria-hidden color={theme.colors.secondary}/>
                )}
                <div>
                  <Text as="h3" className="text-xl font-semibold text-text-primary mb-1">
                    {tile.title}
                  </Text>
                  <Text className="text-sm text-text-secondary italic">
                    {tile.description}
                  </Text>
                </div>
              </div>
              <button
                type="button"
                className="text-sm font-semibold text-text-secondary hover:text-fly-blue transition"
              >
                {tile.cta}
              </button>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
