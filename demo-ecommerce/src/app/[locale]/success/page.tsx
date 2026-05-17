import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function SuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("success");

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
      <p className="text-gray-500 mt-2">{t("message")}</p>
      <Link href={`/${locale}`} className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
        {t("backToShop")}
      </Link>
    </div>
  );
}
