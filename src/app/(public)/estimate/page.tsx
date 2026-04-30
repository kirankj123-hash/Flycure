import { Navigation, ConsultationForm } from "@/components/organisms";
import Footer from "@/components/organisms/Footer/Footer";
import { styles } from "@/styles";
import content from "@/content/en.json";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata("/estimate");

export default function EstimatePage() {
  const { hero } = content.mainLandingPage;

  return (
    <div className={styles.page.root}>
      <Navigation />

      <main>
        <section className={styles.hero.container}>
          <div className={styles.hero.card}>
            <div className={styles.hero.content}>
              <h1 className={styles.hero.title}>Get Your Free Estimate</h1>
              <p className={styles.hero.subtitle}>
                Share your medical needs and receive a transparent estimate from accredited hospitals and specialists.
              </p>
              <p className={styles.hero.description}>
                {hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <ConsultationForm />
      </main>

      <Footer />
    </div>
  );
}
