import { Navigation } from "@/components/organisms/Navigation/Navigation";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles";
import { MedicalService, DoctorCard } from "@/features/medical";
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata('/doctors');

export default function DoctorsPage() {
  const doctors = MedicalService.getDoctors();

  return (
    <div className={styles.page.root}>
      <Navigation />

      <main className={styles.page.main}>
        {/* Hero Section */}
        <section className={styles.hero.container}>
          <div className={styles.hero.card}>
            <div className={styles.hero.content}>
              <h1 className={styles.hero.title}>
                Expert <span className={styles.hero.highlight}>Doctors</span>
              </h1>
              <p className={styles.hero.subtitle}>
                Connect with world-class medical professionals and specialists for your treatment needs.
              </p>
            </div>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className={styles.page.section}>
          <div className={styles.page.grid}>
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}