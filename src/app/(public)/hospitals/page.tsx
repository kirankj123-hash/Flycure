import { Navigation } from "@/components/organisms/Navigation/Navigation";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles";
import { FacilitiesService, HospitalCard } from "@/features/facilities";
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata('/hospitals');

export default function HospitalsPage() {
  const hospitals = FacilitiesService.getHospitals();

  return (
    <div className={styles.page.root}>
      <Navigation />

      <main className={styles.page.main}>
        {/* Hero Section */}
        <section className={styles.hero.container}>
          <div className={styles.hero.card}>
            <div className={styles.hero.content}>
              <h1 className={styles.hero.title}>
                Partner <span className={styles.hero.highlight}>Hospitals</span>
              </h1>
              <p className={styles.hero.subtitle}>
                Top-rated hospitals worldwide providing exceptional medical care and state-of-the-art facilities.
              </p>
            </div>
          </div>
        </section>

        {/* Hospitals Grid */}
        <section className={styles.page.section}>
          <div className={styles.page.grid}>
            {hospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}