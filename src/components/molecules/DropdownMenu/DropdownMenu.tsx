import { Link } from '@/components/atoms';
import { styles } from '@/styles/design-system';
import { cn } from '@/lib/utils/cn';
import {
  ChevronDown,
  HelpCircle,
  Hotel,
  MessageCircle,
  Package,
  PlaneTakeoff,
  ShieldCheck,
  LucideIcon,
  Layers,
  BookMarkedIcon,
  BookOpenCheck,
} from 'lucide-react';
import { theme } from '@/styles/theme';

interface DropdownItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
}

const iconLibrary: Record<string, LucideIcon> = {
  package: Package,
  'hospital': Hotel,
  'message-circle': MessageCircle,
  'layers-3': Layers,
  'plane-takeoff': PlaneTakeoff,
  'shield-check': ShieldCheck,
  'bookmark-check': BookMarkedIcon,
  'help-circle': HelpCircle,
  'book-open-text': BookOpenCheck,
};

export function DropdownMenu({ title, items }: DropdownMenuProps) {
  return (
    <div className={styles.nav.dropdown.group}>
      <button className={styles.nav.dropdown.button}>
        {title}
        <ChevronDown className={styles.nav.dropdown.icon} aria-hidden />
      </button>
      <div className={styles.nav.dropdown.menu}>
        {items.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              styles.nav.dropdown.item,
              index === 0 && 'rounded-t-xl',
              index === items.length - 1 && 'rounded-b-xl',
              index > 0 && 'border-hairline border-transparent'
            )}
          >
            {(() => {
              const IconComponent = iconLibrary[item.icon];
              return IconComponent ? (
                <IconComponent className={styles.nav.dropdown.itemIcon} aria-hidden color={theme.colors.secondary} />
              ) : null;
            })()}
            <div className={styles.nav.dropdown.itemContent}>
              <p className={styles.nav.dropdown.itemTitle}>{item.title}</p>
              <p className={styles.nav.dropdown.itemDescription}>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
