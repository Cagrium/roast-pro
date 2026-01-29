import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// BURASI SİTENİN KİMLİĞİDİR
export const metadata: Metadata = {
  title: "RoastAI 🔥 - Egonu Yerle Bir Et",
  description: "Twitter profilini yapay zeka ile analiz et ve en acımasız gerçeklerle yüzleş. %100 Mizah, %0 Acıma.",
  icons: {
    icon: "https://fav.farm/🔥", // Favicon olarak ateş emojisi kullanıyoruz
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}