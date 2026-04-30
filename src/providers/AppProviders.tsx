'use client';

import React from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToasterProvider } from './ToasterProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToasterProvider />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}