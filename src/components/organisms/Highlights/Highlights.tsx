import { FC } from 'react';
import { ArrowRight, DollarSign, MapPin, MessageSquare } from 'lucide-react';

import { Section } from '@/components/templates/Section';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { Link } from '@/components/atoms/Link/Link';
import { AtomicImage } from '@/components/atoms/Image/Image';
import content from '@/content/en.json';

const highlightIconMap = {
  'message-square': MessageSquare,
  'map-pin': MapPin,
  'dollar-sign': DollarSign,
} as const;

export const Highlights: FC = () => {
  const { highlights } = content.mainLandingPage;

  return (
    <Section id="highlights" title={highlights.title} subtitle={highlights.subtitle} titleClassName='text-4xl text-center font-bold tracking-tight mb-4' subtitleClassName='text-xl text-[--text-secondary] max-w-2xl mx-auto'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="lg:col-span-1 space-y-6">
          {highlights.cards.map((card) => {
            const IconComponent = highlightIconMap[card.icon as keyof typeof highlightIconMap];
            return (
              <FeatureCard
                key={card.title}
                iconComponent={IconComponent}
                title={card.title}
                description={card.description}
                align="left"
              />
            );
          })}
          <Link
            href={highlights.cta.href}
            className="text-base font-semibold text-text-secondary hover:text-fly-blue transition block pt-4"
          >
            {highlights.cta.text}
            <ArrowRight className="w-4 h-4 ml-1 inline" aria-hidden />
          </Link>
        </div>
        <div className="lg:sticky lg:top-24 lg:pt-0 pt-10">
          <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-square">
            <AtomicImage
              src={highlights.image.src}
              alt={highlights.image.alt}
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
