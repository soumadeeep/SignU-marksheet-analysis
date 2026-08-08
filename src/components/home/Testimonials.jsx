import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Section from "@/components/ui/Section";
import { testimonials } from "@/mock/data";

export default function Testimonials() {
  return (
    <Section eyebrow="Loved by parents" title="Clarity, not more paperwork">
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/70 p-7 flex flex-col"
          >
            <Quote className="w-6 h-6 text-blue-600/30" />
            <p className="mt-4 text-slate-700 leading-relaxed flex-1">“{t.quote}”</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={t.avatar} alt="" className="w-10 h-10 rounded-full object-cover bg-slate-100" />
              <div>
                <p className="text-sm font-medium text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}