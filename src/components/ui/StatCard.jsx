import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, sub, accent = "text-blue-600", bg = "bg-blue-50" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${accent}`} />
          </div>
        )}
      </div>
    </motion.div>
  );
}