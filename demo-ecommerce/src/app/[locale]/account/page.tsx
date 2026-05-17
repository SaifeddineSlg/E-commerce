"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

const mockOrders = [
  { id: "ORD-001", date: "2024-05-10", total: 149.97, status: "delivered" },
  { id: "ORD-002", date: "2024-05-12", total: 89.99, status: "shipped" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
};

export default function AccountPage() {
  const t = useTranslations("account");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("title")}</h1>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("orders")}</h2>

      {mockOrders.length === 0 ? (
        <p className="text-gray-500">{t("noOrders")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {mockOrders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
            >
              <div className="bg-gray-100 p-3 rounded-xl">
                <Package size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{t("orderNumber")} {order.id}</p>
                <p className="text-sm text-gray-400">{t("date")} : {order.date}</p>
              </div>
              <p className="font-bold text-gray-900">{order.total.toFixed(2)} €</p>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                {t(`status.${order.status}` as Parameters<typeof t>[0])}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
