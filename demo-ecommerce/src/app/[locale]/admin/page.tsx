"use client";

import { products } from "@/lib/products";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Package, ShoppingBag, TrendingUp, Users, MoreHorizontal, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const mockOrders = [
  { id: "ORD-001", customer: "Alice Martin", avatar: "A", total: 149.97, status: "delivered", date: "10 Mai 2025" },
  { id: "ORD-002", customer: "Bob Dupont", avatar: "B", total: 89.99, status: "shipped", date: "12 Mai 2025" },
  { id: "ORD-003", customer: "Sara Ahmed", avatar: "S", total: 279.98, status: "pending", date: "14 Mai 2025" },
  { id: "ORD-004", customer: "Youssef Ben Ali", avatar: "Y", total: 49.99, status: "delivered", date: "15 Mai 2025" },
];

const statusStyle: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  shipped: "bg-blue-50 text-blue-700 border border-blue-200",
  delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};
const statusDot: Record<string, string> = {
  pending: "bg-amber-400", shipped: "bg-blue-400", delivered: "bg-emerald-400",
};
const avatarColors = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-rose-100 text-rose-600",
  "bg-amber-100 text-amber-600",
];

export default function AdminPage() {
  const t = useTranslations("admin");
  const revenue = mockOrders.reduce((s, o) => s + o.total, 0);

  const stats = [
    { label: t("products"), value: products.length, sub: "+2 ce mois", icon: Package, gradient: "from-violet-500 to-purple-600", light: "bg-violet-50 text-violet-600" },
    { label: t("orders"), value: mockOrders.length, sub: "+1 aujourd'hui", icon: ShoppingBag, gradient: "from-blue-500 to-cyan-600", light: "bg-blue-50 text-blue-600" },
    { label: t("revenue"), value: `${revenue.toFixed(0)} €`, sub: "+12% ce mois", icon: TrendingUp, gradient: "from-emerald-500 to-teal-600", light: "bg-emerald-50 text-emerald-600" },
    { label: t("customers"), value: "2.4K", sub: "+8% ce mois", icon: Users, gradient: "from-rose-500 to-pink-600", light: "bg-rose-50 text-rose-600" },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fff0f5 100%)" }}>

      {/* Soft animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ x: [0, 25, 0], y: [0, -15, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-96 h-96 bg-violet-300/25 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, -20, 0], y: [0, 20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/2 right-0 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, 10, 0], y: [0, -10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-10 left-1/3 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-gray-400 mb-1">Dimanche, 17 Mai 2025</p>
            <h1 className="text-3xl font-black text-gray-900">{t("title")}</h1>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-all shadow-lg shadow-gray-900/20">
            + {t("addProduct")}
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 shadow-sm shadow-gray-200/80 border border-gray-100/80 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}>
                  <stat.icon size={18} className="text-white" />
                </div>
                <ArrowUpRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
              <p className="text-xs text-emerald-600 font-semibold mt-2">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Orders */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="xl:col-span-2 bg-white rounded-3xl shadow-sm shadow-gray-200/80 border border-gray-100/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <div>
                <h2 className="font-black text-gray-900 text-lg">{t("recentOrders")}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{mockOrders.length} commandes ce mois</p>
              </div>
              <button className="text-xs text-gray-400 hover:text-gray-700 font-semibold transition-colors flex items-center gap-1">
                Tout voir <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-4 px-6 py-3 bg-gray-50/80 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Client</span><span>Commande</span><span>Montant</span><span>Statut</span>
            </div>
            <div className="divide-y divide-gray-50">
              {mockOrders.map((order, i) => (
                <motion.div key={order.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.06 }}
                  className="grid grid-cols-4 items-center px-6 py-4 hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                      {order.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-mono text-gray-400">{order.id}</p>
                  <p className="text-sm font-black text-gray-900">{order.total.toFixed(2)} €</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold w-fit ${statusStyle[order.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status]}`} />
                    {t(`status.${order.status}` as Parameters<typeof t>[0])}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-sm shadow-gray-200/80 border border-gray-100/80 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <div>
                <h2 className="font-black text-gray-900 text-lg">{t("products")}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{products.length} articles</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {products.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.04 }}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors group"
                >
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 font-semibold">{p.price.toFixed(2)} €</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-lg transition-colors">
                      {t("editProduct")}
                    </button>
                  </div>
                  <button className="text-gray-200 hover:text-gray-500 transition-colors flex-shrink-0">
                    <MoreHorizontal size={15} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
