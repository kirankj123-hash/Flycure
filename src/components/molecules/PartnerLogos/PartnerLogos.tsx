import { Container } from '@/components/atoms/Container/Container';
import { PartnerLogo } from '@/components/ui/CentralizedImage';

interface PartnerLogosProps {
  className?: string;
}

export function PartnerLogos({ className }: PartnerLogosProps) {
  const partners = ['manipal', 'apollo', 'srisai'] as const;

  return (
    <Container className={`flex flex-wrap gap-4 ${className}`}>
      {partners.map((partner) => (
        <PartnerLogo
          key={partner}
          partner={partner}
        />
      ))}
    </Container>
  );
}