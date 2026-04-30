import {
  HeroSection,
  Navigation,
  PillarsOfCare,
  FaqSection,
  ConsultationForm,
  JourneySection,
  TrustSection,
  PatientStory,
} from '@/components/organisms';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';
import { Gateway } from '@/components/organisms/Gateway';
import { Highlights } from '@/components/organisms/Highlights';

export default function Home() {
  const { hero, faq } = content.mainLandingPage;
  return (
    <div className={styles.page.root}>
      <Navigation />

      <main>
        <HeroSection 
          title={hero.title}
          subtitle={hero.subtitle}
          actions={{
            primary: hero.primaryAction,
            primaryHref: hero.primaryHref,
            secondary: hero.secondaryAction,
            secondaryHref: hero.secondaryHref,
          }}
        />
        
        <Gateway />

        <Highlights />

        <JourneySection />

        <TrustSection />

        <PillarsOfCare />

        <PatientStory />

  <FaqSection id="faq" title={faq.title} questions={faq.questions} />

        <ConsultationForm />
      </main>

    </div>
  );
}
