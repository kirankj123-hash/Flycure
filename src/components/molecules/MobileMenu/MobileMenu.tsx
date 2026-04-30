import { useState } from 'react';
import { Link, Text } from '@/components/atoms';
import { styles } from '@/styles/design-system';
import { cn } from '@/lib/utils/cn';
import content from '@/content/en.json';
import { ChevronDown, X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MobileAccordionProps {
  title: string;
  items: { href: string; title: string; description?: string; icon?: string }[];
}

function MobileAccordion({ title, items }: MobileAccordionProps) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  return (
    <div>
      <h4
        className={styles.nav.mobile.accordionHeader}
        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
      >
        {title}
        <ChevronDown
          className={cn(styles.nav.mobile.accordionIcon, { 'rotate-180': isSubMenuOpen })}
          aria-hidden
        />
      </h4>
      {isSubMenuOpen && (
        <div className={styles.nav.mobile.accordionContent}>
          {items.map((item) => (
            <Link key={item.title} href={item.href} className={styles.nav.mobile.accordionLink}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { navigation } = content.mainLandingPage;

  return (
    <>
      <div className={cn(styles.nav.mobile.drawer, { [styles.nav.mobile.drawerActive]: isOpen })}>
        <div className={styles.nav.mobile.drawerHeader}>
          <Text as="span" className={styles.nav.mobile.drawerTitle}>Menu</Text>
          <button onClick={onClose} className={styles.nav.mobile.closeButton} aria-label="Close menu">
            <X className={styles.nav.mobile.menuIcon} aria-hidden />
          </button>
        </div>
        <nav className={styles.nav.mobile.nav}>
          {navigation.menus.map((menu) => (
            <MobileAccordion key={menu.title} title={menu.title} items={menu.items} />
          ))}
          <hr className={styles.nav.mobile.divider} />
          <div className={styles.nav.mobile.utilityContainer}>
            <Link href={navigation.utilities.login.href} className={styles.nav.mobile.utilityLink}>
              {navigation.utilities.login.text}
            </Link>
            <Link href={navigation.mobileUtils.whatsapp.href} className={styles.nav.mobile.utilityLink}>
              {navigation.mobileUtils.whatsapp.text}
            </Link>
          </div>
          <Link href={navigation.utilities.cta.href} className={styles.nav.mobile.cta}>
            {navigation.utilities.cta.text}
          </Link>
        </nav>
      </div>
      {isOpen && <div className={styles.nav.mobile.backdrop} onClick={onClose} />}
    </>
  );
}
