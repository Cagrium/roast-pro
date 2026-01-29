import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoastAI - Egonu Yerle Bir Edelim",
  description: "Yapay zeka ile acımasız profil analizi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}