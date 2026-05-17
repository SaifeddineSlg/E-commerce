"use client";

import { motion } from "framer-motion";

export default function ProductPageAnimations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-96 h-96 bg-violet-300/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -left-20 w-80 h-80 bg-pink-300/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"
      />
    </div>
  );
}
