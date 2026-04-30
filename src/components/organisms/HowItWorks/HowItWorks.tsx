import { FC } from 'react';

import { Section } from '@/components/templates/Section';
import { StepCard } from '@/components/molecules/StepCard/StepCard';

export const HowItWorks: FC = () => {
  return (
    <Section
      id="how-it-works"
      isSurface
      title="Your Journey in Three Simple Steps"
      subtitle="We manage the complexities so you can focus on healing."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <StepCard
          step="1"
          title="Submit Your Inquiry"
          description="Share your medical needs securely."
        />
        <StepCard
          step="2"
          title="Review Your Options"
          description="Get verified opinions and a transparent quote."
        />
        <StepCard
          step="3"
          title="Travel and Recover"
          description="Full support from airport transfer to post-care."
        />
      </div>
    </Section>
  );
};
