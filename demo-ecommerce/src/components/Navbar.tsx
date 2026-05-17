"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, LayoutDashboard, User, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const localeLabels: Record<string, string> = { fr: "FR", en: "EN", ar: "ع" };

export default function Navbar() {
  const { count } = useCart();
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/") || "/");
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5" : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-300 ${scrolled ? "bg-black" : "bg-white/20 group-hover:bg-white/30"}`}>
            <ShoppingBag size={16} className="text-white" />
          </div>
          <span className={`text-xl font-black tracking-tight transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}>{t("brand")}</span>
        </Link>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[{ href: `/${locale}`, label: t("brand") }, { href: `/${locale}/admin`, label: t("dashboard") }, { href: `/${locale}/account`, label: t("account") }].map((link) => (
            <Link key={link.href} href={link.href}
              className={`text-sm font-semibold transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className={`hidden md:flex items-center gap-0.5 rounded-full p-1 transition-colors ${scrolled ? "bg-gray-100" : "bg-white/15"}`}>
            {["fr", "en", "ar"].map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  locale === l
                    ? scrolled ? "bg-black text-white shadow-sm" : "bg-white text-gray-900 shadow-sm"
                    : scrolled ? "text-gray-500 hover:text-gray-800" : "text-white/70 hover:text-white"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>

          <Link href={`/${locale}/account`} className={`hidden md:flex w-9 h-9 items-center justify-center rounded-full transition-colors ${scrolled ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-white/15 hover:bg-white/25 text-white"}`}>
            <User size={16} />
          </Link>

          <Link href={`/${locale}/cart`} className="relative flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
            <ShoppingBag size={15} />
            <span className="hidden sm:block">{t("cart")}</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-gray-100">
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4"
          >
            <Link href={`/${locale}`} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">{t("brand")}</Link>
            <Link href={`/${locale}/admin`} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">{t("dashboard")}</Link>
            <Link href={`/${locale}/account`} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">{t("account")}</Link>
            <div className="flex gap-2">
              {["fr", "en", "ar"].map((l) => (
                <button key={l} onClick={() => { switchLocale(l); setMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${locale === l ? "bg-black text-white border-black" : "border-gray-200 text-gray-500"}`}>
                  {localeLabels[l]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
