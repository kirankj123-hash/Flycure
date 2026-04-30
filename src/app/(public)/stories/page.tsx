import { Navigation, PatientStory, TestimonialSlider } from "@/components/organisms";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles/design-system";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata("/stories");

export default function StoriesPage() {
  return (
    <div className={styles.page.root}>
      <Navigation />

      <main>
        <PatientStory />
        <TestimonialSlider />
      </main>

      <Footer />
    </div>
  );
}
