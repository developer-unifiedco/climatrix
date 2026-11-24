import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Climatrix | HVAC Solutions in Saudi Arabia",
  description:
    "Climate control, air conditioning, ventilation and indoor air quality solutions for residential, commercial and industrial spaces.",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
