import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import { pricing } from "@/mock/data";

export default function PricingPreview() {
  return (
    <Section eyebrow="Pricing" title="Simple plans that grow with your family">
      <div id="pricing" className="grid gap-5 md:grid-cols-3 items-start">
        {pricing.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`rounded-2xl p-8 border ${
              p.highlight
                ? "bg-slate-900 border-slate-900 text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.5)] md:-mt-4 md:pb-12"
                : "bg-white border-slate-200/70"
            }`}
          >
            {p.highlight && (
              <span className="inline-block mb-4 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/10 text-white">
                Most popular
              </span>
            )}
            <h3 className={`font-semibold tracking-tight ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.name}</h3>
            <p className={`text-sm mt-1 ${p.highlight ? "text-slate-400" : "text-slate-500"}`}>{p.desc}</p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className={`text-4xl font-semibold tracking-tight ${p.highlight ? "text-white" : "text-slate-900"}`}>
                {p.price}
              </span>
              {p.period && <span className={p.highlight ? "text-slate-400 text-sm" : "text-slate-400 text-sm"}>{p.period}</span>}
            </p>
            <ul className="mt-7 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.highlight ? "text-emerald-400" : "text-emerald-500"}`} />
                  <span className={p.highlight ? "text-slate-300" : "text-slate-600"}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className={`mt-8 block text-center px-5 py-3 rounded-full text-sm font-medium transition-colors ${
                p.highlight ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              Choose {p.name}
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}