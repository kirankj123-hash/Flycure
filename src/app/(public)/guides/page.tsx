import {
  Navigation,
  JourneySection,
  PillarsOfCare,
  FaqSection,
} from "@/components/organisms";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles/design-system";
import content from "@/content/en.json";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata("/guides");

export default function GuidesPage() {
  const { faq } = content.howPage;

  return (
    <div className={styles.page.root}>
      <Navigation />

      <main>
        <JourneySection />
        <PillarsOfCare />
        <FaqSection
          title={faq.title}
          questions={faq.questions}
        />
      </main>

      <Footer />
    </div>
  );
}
