import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";

import { GlobalStyles } from "@/components/Styles";
import { tokens } from '@/styles/design-system';
import { generatePageMetadata } from '@/lib/seo/metadata';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generatePageMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${tokens.layout.body}`}>
        <GlobalStyles />
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
