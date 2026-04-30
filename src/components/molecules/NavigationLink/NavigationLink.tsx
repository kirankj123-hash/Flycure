import { LucideIcon } from 'lucide-react';
import { FC, HTMLAttributeAnchorTarget } from 'react';

import { Link as UILink } from '@/components/atoms/Link/Link';
import { Text } from '@/components/atoms/Text/Text';
import { cn } from '@/lib/utils/cn';

export interface INavigationLink {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  target?: HTMLAttributeAnchorTarget;
}

export interface NavigationLinkProps extends INavigationLink {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const NavigationLink: FC<NavigationLinkProps> = ({
  href,
  label,
  description,
  icon: Icon,
  target,
  className,
  orientation = 'horizontal',
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <UILink
      href={href}
      external={target === '_blank'}
      className={cn(
        'flex items-start p-4 space-x-3 text-primary rounded-xl transition',
        'hover:bg-surface',
        isVertical && 'flex-col items-start',
        className
      )}
    >
      {Icon && <Icon className="text-fly-blue flex-shrink-0 w-5 h-5" />}
      <div className={cn(!isVertical && 'text-left')}>
        <Text as="p" className="font-semibold">
          {label}
        </Text>
        {description && (
          <Text as="p" className="text-secondary text-xs">
            {description}
          </Text>
        )}
      </div>
    </UILink>
  );
};
