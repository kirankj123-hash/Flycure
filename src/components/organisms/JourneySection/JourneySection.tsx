import { Section } from '@/components/templates/Section';
import { JourneyStepCard } from '@/components/molecules/JourneyStepCard/JourneyStepCard';
import content from '@/content/en.json';
import { styles } from '@/styles/design-system';

export function JourneySection() {
  const { journey } = content.mainLandingPage;

  return (
    <Section
      id="how-it-works"
      isSurface
      title={journey.title}
      subtitle={journey.subtitle}
      titleClassName={styles.section.title}
      subtitleClassName={styles.section.subtitle}
    >
      <div className={styles.journey.list}>
        {journey.steps.map((step) => (
          <JourneyStepCard
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </Section>
  );
}
