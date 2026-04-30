'use client';

import { FC } from 'react';
import { ChevronDown } from 'lucide-react';

import {
  INavigationLink,
  NavigationLink,
} from '@/components/molecules/NavigationLink';
import { Button } from '@/components/atoms/Button/Button';

export interface IDesktopNavigationProps {
  links: {
    title: string;
    subLinks: INavigationLink[];
  }[];
}

export const DesktopNavigation: FC<IDesktopNavigationProps> = ({ links }) => {
  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm text-secondary">
      {links.map((link, index) => (
        <div key={index} className="dropdown-group relative">
          <Button
            variant="ghost"
            className="flex items-center font-medium hover:text-fly-blue transition focus:outline-none"
          >
            {link.title} <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
          <div className="dropdown-menu absolute pt-4 left-1/2 -translate-x-1/2 min-w-[300px] bg-white rounded-xl shadow-lg border border-hairline text-left">
            {link.subLinks.map((subLink, subIndex) => (
              <NavigationLink
                key={subIndex}
                {...subLink}
                className="rounded-none border-t border-hairline first:rounded-t-xl last:rounded-b-xl last:border-b-0"
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};
