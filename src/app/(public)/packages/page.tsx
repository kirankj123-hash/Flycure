import { Navigation } from "@/components/organisms/Navigation/Navigation";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles";
import { MedicalService, DepartmentCard } from "@/features/medical";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata("/packages");

export default function PackagesPage() {
  const departments = MedicalService.getDepartments();

  return (
    <div className={styles.page.root}>
      <Navigation />

      <main className={styles.page.main}>
        <section className={styles.hero.container}>
          <div className={styles.hero.card}>
            <div className={styles.hero.content}>
              <h1 className={styles.hero.title}>
                Treatments and <span className={styles.hero.highlight}>Packages</span>
              </h1>
              <p className={styles.hero.subtitle}>
                Explore high-demand treatment areas with transparent package planning before you request a hospital estimate.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.page.section}>
          <div className={styles.page.grid}>
            {departments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
