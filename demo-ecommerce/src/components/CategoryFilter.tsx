"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function CategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get("category") ?? undefined;
  const t = useTranslations("home");
  const tCat = useTranslations("categories");

  function select(cat?: string) {
    router.push(cat ? `${pathname}?category=${encodeURIComponent(cat)}` : pathname);
  }

  const all = [undefined, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const isActive = cat === undefined ? !selected : selected === cat;
        const label = cat ? tCat(cat as Parameters<typeof tCat>[0]) : t("all");
        return (
          <button
            key={cat ?? "all"}
            onClick={() => select(cat)}
            className="relative px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 bg-gray-900 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-white" : "text-gray-500 hover:text-gray-900"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
