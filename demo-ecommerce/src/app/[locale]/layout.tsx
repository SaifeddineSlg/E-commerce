import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopAll — Multi-catégories",
  description: "Votre boutique en ligne multi-catégories",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en" | "ar")) notFound();

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="bg-gray-950 text-gray-400 text-sm text-center py-6 mt-20">
              © 2025 ShopAll · Tous droits réservés
            </footer>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
