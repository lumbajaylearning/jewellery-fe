import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/layout/Navbar";
import { getSiteSetting } from "@/app/lib/strapi/queries";
import Footer from "@/app/components/layout/Footer";
import AnnouncementBar from "@/app/components/layout/AnnouncementBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurelia | Home consultation jewellery",
  description: "A premium jewellery experience with private home consultations and curated collections.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSetting();
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col items-center justify-between ">
        <AnnouncementBar {...siteSettings.data.announcementBar} />
        <Navbar />
        <main className="w-full max-w-7xl px-5">{children}</main>
        <Footer {...siteSettings.data.footer} />
      </body>
    </html>
  );
}
