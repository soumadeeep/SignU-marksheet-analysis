import React from "react";
import { motion } from "framer-motion";
import { stats } from "@/mock/data";

export default function Stats() {
  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto rounded-3xl bg-slate-900 px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{s.value}</p>
              <p className="mt-2 text-sm text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}