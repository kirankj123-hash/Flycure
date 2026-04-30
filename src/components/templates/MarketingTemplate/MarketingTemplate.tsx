import React from 'react';
import { cn } from '@/lib/utils/cn';
import { styles } from '@/styles/design-system';

interface MarketingTemplateProps {
  children?: React.ReactNode;
  className?: string;
  hero?: React.ReactNode;
  features?: React.ReactNode;
  footer?: React.ReactNode;
  navigation?: React.ReactNode;
}

export function MarketingTemplate({ 
  children, 
  className,
  hero,
  features,
  footer,
  navigation 
}: MarketingTemplateProps) {
  return (
    <div className={cn(styles.layout.page, className)}>
      {navigation}
      
      <main className={styles.layout.main}>
        {hero}
        
        <div className={styles.layout.section}>
          {features}
          {children}
        </div>
      </main>
      
      {footer}
    </div>
  );
}
