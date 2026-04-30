import { Navigation } from "@/components/organisms/Navigation/Navigation";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles";
import { MedicalService, DepartmentCard } from "@/features/medical";
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata('/departments');

export default function DepartmentsPage() {
  const departments = MedicalService.getDepartments();

  return (
    <div className={styles.page.root}>
      <Navigation />

      <main className={styles.page.main}>
        {/* Hero Section */}
        <section className={styles.hero.container}>
          <div className={styles.hero.card}>
            <div className={styles.hero.content}>
              <h1 className={styles.hero.title}>
                Medical <span className={styles.hero.highlight}>Departments</span>
              </h1>
              <p className={styles.hero.subtitle}>
                Explore our comprehensive range of medical specialties and find the right treatment for your needs.
              </p>
            </div>
          </div>
        </section>

        {/* Departments Grid */}
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
