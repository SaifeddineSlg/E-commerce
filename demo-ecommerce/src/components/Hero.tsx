"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const locale = useLocale();
  const t = useTranslations("hero");

  const stats = [
    { value: t("stat1value"), label: t("stat1label") },
    { value: t("stat2value"), label: t("stat2label") },
    { value: t("stat3value"), label: t("stat3label") },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 -right-32 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 20, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-8"
        >
          <Sparkles size={14} className="text-yellow-400" />
          {t("badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6"
        >
          {t("title1")}
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
            {t("title2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all"
          >
            {t("cta")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <Link
            href={`/${locale}/admin`}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/20 transition-all"
          >
            {t("ctaAdmin")}
          </Link>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center gap-8 mt-16 text-center"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="text-xs text-white/40 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2"
      >
        <div className="w-1 h-2 bg-white/40 rounded-full" />
      </motion.div>
    </section>
  );
}
