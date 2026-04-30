import {
  DetailedJourneySection,
  FaqSection,
  HeroSection,
  Navigation,
  PatientTrustSection,
} from '@/components/organisms';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

export default function HowItWorksPage() {
  const { howPage } = content;

  return (
    <div className={styles.page.root}>
      <Navigation />
      <main>
        <HeroSection
          title={howPage.hero.title}
          subtitle={howPage.hero.subtitle}
          actions={{
            primary: howPage.hero.primaryAction,
            primaryHref: howPage.hero.primaryHref,
            secondary: howPage.hero.secondaryAction,
            secondaryHref: howPage.hero.secondaryHref,
          }}
        />
        <DetailedJourneySection />
        <PatientTrustSection />
        <FaqSection
          id="faq"
          title={howPage.faq.title}
          questions={howPage.faq.questions}
          cta={howPage.faq.cta}
        />
      </main>
    </div>
  );
}
