import { FC } from 'react';
import { ArrowRight } from 'lucide-react';

import { Section } from '@/components/templates/Section';
import { Text } from '@/components/atoms/Text/Text';
import { Link } from '@/components/atoms/Link/Link';
import content from '@/content/en.json';

export const PatientStory: FC = () => {
  const { patientStory } = content.mainLandingPage;

  return (
    <Section isSurface>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <Text className="text-2xl italic text-text-secondary">
          &ldquo;{patientStory.quote}&rdquo;
        </Text>
        <Text className="font-semibold text-lg text-text-primary">
          — {patientStory.author}, {patientStory.context}
        </Text>
        <Link
          href={patientStory.cta.href}
          className="inline-flex items-center gap-2 text-base font-semibold text-fly-blue hover:text-fly-blue-hover transition"
        >
          {patientStory.cta.text}
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
};
