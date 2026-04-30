'use client';

import React, { useState } from 'react';
import { Link, Text } from '@/components/atoms';
import { DropdownMenu } from '@/components/molecules/DropdownMenu/DropdownMenu';
import { MobileMenu } from '@/components/molecules/MobileMenu/MobileMenu';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';
import { Menu } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigation } = content.mainLandingPage;

  return (
    <header className={styles.nav.header}>
      <div className={styles.nav.container}>
        <div className={styles.nav.content}>
          {/* Logo */}
          <Link href="/" className={styles.nav.logoContainer}>
            <Text as="span" className={styles.nav.brand}>{navigation.brand}</Text>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav.desktopNav}>
            {navigation.menus.map((menu) => (
              <DropdownMenu key={menu.title} title={menu.title} items={menu.items} />
            ))}
          </nav>

          {/* Desktop Utilities */}
          <div className={styles.nav.utilities} >
            <Link href={navigation.utilities.cta.href} className={styles.nav.cta}>
              {navigation.utilities.cta.text}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open menu"
          >
            <Menu className={styles.nav.mobile.menuIcon} aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
