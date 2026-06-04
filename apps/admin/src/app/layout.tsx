import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Plus_Jakarta_Sans } from "next/font/google";
import './globals.css';

export const metadata: Metadata = {
  title: 'Localo Admin',
  description: 'Localo marketplace operations console'
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300","400", "500", "600", "700", "800"],
  variable: "--font-localo-sans",
  display: "swap"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
