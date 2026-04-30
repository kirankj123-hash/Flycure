import { FC } from 'react';
import {  Hotel, Package, Stethoscope } from 'lucide-react';

import { Section } from '@/components/templates/Section';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import content from '@/content/en.json';

const gatewayIconMap = {
  stethoscope: Stethoscope,
  hospital: Hotel,
  package: Package,
} as const;

export const Gateway: FC = () => {
  const { gateway } = content.mainLandingPage;

  return (
    <Section
      isSurface
      title={gateway.title}
      titleClassName='text-center text-3xl font-semibold mb-12 text-[--text-secondary]'
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {gateway.cards.map((card) => {
          const IconComponent = gatewayIconMap[card.icon as keyof typeof gatewayIconMap];
          return (
            <FeatureCard
              key={card.title}
              iconComponent={IconComponent}
              title={card.title}
              description={card.description}
              align="center"
            />
          );
        })}
      </div>
    </Section>
  );
};
