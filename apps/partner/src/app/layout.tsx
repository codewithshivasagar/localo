import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Localo Partner",
  description: "Localo marketplace"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
