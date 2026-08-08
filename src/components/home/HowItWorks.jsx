import React from "react";
import { motion } from "framer-motion";
import { UploadCloud, Cpu, Compass } from "lucide-react";
import Section from "@/components/ui/Section";

const steps = [
  { icon: UploadCloud, title: "Upload the report", body: "Drop in a PDF, photo or scan of any term report, test or olympiad result." },
  { icon: Cpu, title: "Let the engine read it", body: "We extract subject scores, remarks and patterns, then compare across terms." },
  { icon: Compass, title: "Act on the insight", body: "Get strengths, gaps and a concrete plan for the next term — in plain language." },
];

export default function HowItWorks() {
  return (
    <Section eyebrow="How it works" title="Three steps, two minutes" subtitle="No spreadsheets. No setup. Just your child's reports.">
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative bg-white rounded-2xl border border-slate-200/70 p-8"
          >
            <span className="absolute top-7 right-7 text-5xl font-semibold text-slate-100 leading-none select-none">
              {i + 1}
            </span>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="mt-6 font-semibold text-slate-900 tracking-tight">{s.title}</h3>
            <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}