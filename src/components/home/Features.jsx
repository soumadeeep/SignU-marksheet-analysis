import React from "react";
import { motion } from "framer-motion";
import { LineChart, Compass, Target, FileSearch, ShieldCheck, Bell } from "lucide-react";
import Section from "@/components/ui/Section";

const features = [
  { icon: LineChart, title: "Performance tracking", body: "Term-over-term subject trends, cohort comparisons and early warning signals." },
  { icon: Compass, title: "Interest analysis", body: "See where curiosity actually lives — across subjects, hobbies and activities." },
  { icon: Target, title: "Ambition prediction", body: "Career and stream directions modelled from years of academic signals." },
  { icon: FileSearch, title: "AI reports", body: "A plain-language summary of strengths, gaps and next steps after every upload." },
  { icon: ShieldCheck, title: "Private by design", body: "Your child's documents stay yours. Delete a report and its analytics vanish." },
  { icon: Bell, title: "Smart nudges", body: "Gentle reminders when a subject slips or a milestone is within reach." },
];

export default function Features() {
  return (
    <Section
      eyebrow="Capabilities"
      title="Everything a report card never told you"
      subtitle="Six layers of analysis that turn scattered documents into one clear direction."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-slate-200/70 p-7 hover:border-slate-300 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 flex items-center justify-center">
              <f.icon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="mt-5 font-semibold text-slate-900 tracking-tight">{f.title}</h3>
            <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}