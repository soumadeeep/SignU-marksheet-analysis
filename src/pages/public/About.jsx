import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Sparkles } from "lucide-react";
import Section from "@/components/ui/Section";
import CtaBanner from "@/components/home/CtaBanner";

const pillars = [
  { icon: Target, title: "Our mission", body: "Give every parent the same clarity a great mentor would offer — from documents they already have." },
  { icon: Eye, title: "Our vision", body: "A world where a child's direction is shaped by their strengths and curiosity, not by guesswork." },
];

const reasons = [
  "Built by educators, data scientists and parents",
  "Works with CBSE, ICSE, IB, IGCSE and state boards",
  "Insights written in plain language, never jargon",
  "Your documents remain private and deletable",
  "Analytics that improve as more reports arrive",
  "Designed for families, not for schools to sell",
];

export default function About() {
  return (
    <>
      <section className="px-6 pt-20 pb-8 md:pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" /> About ShineU
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            We read between the lines of every report card
          </h1>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            ShineU Analytics started with a simple frustration: report cards tell you what happened,
            never what to do next.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200/70 p-9"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="mt-6 text-xl font-semibold tracking-tight text-slate-900">{p.title}</h2>
              <p className="mt-3 text-slate-500 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Our story" title="From one parent's spreadsheet to a platform" center={false}>
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-5 text-slate-500 leading-relaxed">
            <p>
              In 2022 our founder sat with four years of his daughter's report cards spread across a
              dining table, trying to answer one question: is she getting better, or just getting older?
            </p>
            <p>
              What began as a personal spreadsheet became a model — one that could read a scanned report,
              normalise grading scales across boards, and track a subject over years instead of terms.
            </p>
            <p>
              Today ShineU analyses tens of thousands of documents for families across the country, and
              every insight is still written the way we'd explain it at that dining table.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-200/70 bg-white">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
              alt="Team working together"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </Section>

      <Section eyebrow="Why ShineU" title="Six reasons families stay">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="flex items-start gap-3 bg-white rounded-2xl border border-slate-200/70 p-6"
            >
              <Heart className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-600 leading-relaxed">{r}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}