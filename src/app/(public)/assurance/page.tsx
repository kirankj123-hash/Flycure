import {
  Navigation,
  TrustSection,
  PatientTrustSection,
  AccreditedPartnersSection,
} from "@/components/organisms";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles/design-system";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata("/assurance");

export default function AssurancePage() {
  return (
    <div className={styles.page.root}>
      <Navigation />

      <main>
        <TrustSection />
        <PatientTrustSection />
        <AccreditedPartnersSection />
      </main>

      <Footer />
    </div>
  );
}
