import { Container } from '@/components/atoms';
import { FeatureCard } from '@/components/molecules/FeatureCard/FeatureCard';
import { AccreditedPartnersSection, CoreValuesSection,  HeroSection, LeadershipSection, Navigation, OurJourneySection } from '@/components/organisms';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

export default function AboutPage() {
  const { aboutPage } = content;

  return (
    <div className={styles.page.root}>
      <Navigation />
      <main>
        {/* Page Hero */}
        <HeroSection
          title={aboutPage.hero.title}
          subtitle={aboutPage.hero.subtitle}
          actions={{
            primary: aboutPage.hero.primaryAction,
            primaryHref: aboutPage.hero.primaryHref,
            secondary: aboutPage.hero.secondaryAction,
            secondaryHref: aboutPage.hero.secondaryHref,
          }}
        />

        {/* Vision & Mission */}
        <section className={styles.visionMission.container}>
          <Container className={styles.visionMission.grid}>
            {aboutPage.visionMission.cards.map((card) => (
              <FeatureCard
                key={card.title}
                title={card.title}
                description={card.description}
                isBordered={card.isBordered}
              />
            ))}
          </Container>
        </section>

        <CoreValuesSection />

        <LeadershipSection />

      

        <AccreditedPartnersSection />

        <OurJourneySection />
      </main>
  
    </div>
  );
}
