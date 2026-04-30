import { Navigation } from "@/components/organisms/Navigation/Navigation";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles";
import { MedicalService, DoctorCard } from "@/features/medical";
import { FacilitiesService, HospitalCard } from "@/features/facilities";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata("/care");

export default function CarePage() {
  const doctors = MedicalService.getDoctors().slice(0, 3);
  const hospitals = FacilitiesService.getHospitals().slice(0, 3);

  return (
    <div className={styles.page.root}>
      <Navigation />

      <main className={styles.page.main}>
        <section className={styles.hero.container}>
          <div className={styles.hero.card}>
            <div className={styles.hero.content}>
              <h1 className={styles.hero.title}>
                Explore Your <span className={styles.hero.highlight}>Care Options</span>
              </h1>
              <p className={styles.hero.subtitle}>
                Compare accredited hospitals and verified specialists in one place before you request an estimate.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.page.section}>
          <div className="mb-8">
            <h2 className={styles.hero.title}>Featured Hospitals</h2>
            <p className={styles.hero.subtitle}>
              Review trusted facilities with strong international patient support.
            </p>
          </div>
          <div className={styles.page.grid}>
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        </section>

        <section className={styles.page.section}>
          <div className="mb-8">
            <h2 className={styles.hero.title}>Featured Doctors</h2>
            <p className={styles.hero.subtitle}>
              Connect with experienced specialists across high-demand treatment areas.
            </p>
          </div>
          <div className={styles.page.grid}>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
