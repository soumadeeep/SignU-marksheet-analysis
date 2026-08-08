import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Section from "@/components/ui/Section";
import { faqs } from "@/mock/data";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <Section eyebrow="FAQ" title="Questions, answered">
      <div className="max-w-3xl mx-auto divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200/70 px-6">
        {faqs.map((f, i) => (
          <div key={f.q} className="py-5">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between gap-6 text-left"
            >
              <span className="font-medium text-slate-900">{f.q}</span>
              <Plus className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 text-sm text-slate-500 leading-relaxed pr-10">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}