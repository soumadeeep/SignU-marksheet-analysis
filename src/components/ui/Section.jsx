import React from "react";
import { motion } from "framer-motion";

export default function Section({ eyebrow, title, subtitle, children, className = "", center = true }) {
  return (
    <section className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`max-w-2xl mb-14 ${center ? "mx-auto text-center" : ""}`}
          >
            {eyebrow && (
              <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-blue-600 mb-4">
                {eyebrow}
              </span>
            )}
            <h2 className="text-3xl md:text-[2.75rem] leading-[1.1] font-semibold tracking-tight text-slate-900">
              {title}
            </h2>
            {subtitle && <p className="mt-5 text-lg text-slate-500 leading-relaxed">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}