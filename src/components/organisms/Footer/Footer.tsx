import { FC } from 'react';

import { Container } from '@/components/atoms/Container/Container';
import { Link } from '@/components/atoms/Link/Link';
import { Text } from '@/components/atoms/Text/Text';

const FooterLinkGroup: FC<{ title: string; links: { href: string; label: string }[] }> = ({ title, links }) => (
  <div>
    <Text as="h4" className="font-bold text-primary mb-3">
      {title}
    </Text>
    <div className="space-y-2 text-secondary">
      {links.map((link, index) => (
        <Link key={index} href={link.href} className="block hover:text-fly-blue transition">
          {link.label}
        </Link>
      ))}
    </div>
  </div>
);

export const Footer: FC = () => {
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/careers', label: 'Careers' },
        { href: '/contact', label: 'Contact Us' },
      ],
    },
    {
      title: 'Patient Help',
      links: [
        { href: '#', label: 'Visa Guide (PDF)' },
        { href: '#', label: 'Travel Checklist' },
        { href: '#', label: 'How Pricing Works' },
        { href: '#', label: 'Aftercare & Follow-up' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '#', label: 'Privacy (DPDP/GDPR)' },
        { href: '#', label: 'Terms of Service' },
        { href: '#', label: 'Security' },
        { href: '#', label: 'Data Requests' },
      ],
    },
  ];

  return (
    <footer className="border-t border-hairline">
      <Container className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10 text-sm">
          {footerLinks.map((group, index) => (
            <FooterLinkGroup key={index} {...group} />
          ))}
          <div className="col-span-2 md:col-span-2">
            <FooterLinkGroup
              title="Utilities"
              links={[
                { href: '#', label: 'Country/Region' },
                { href: '#', label: 'Language & Currency' },
                { href: '#', label: 'Sitemap' },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-secondary pt-6 border-t border-hairline">
          <p>&copy; {new Date().getFullYear()} Flycure. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built by Doctors. Enabled by Technology.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
