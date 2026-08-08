import React from "react";
import { motion } from "framer-motion";
import { LineChart as LineIcon, Compass, Target, FileText } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell,
} from "recharts";
import Section from "@/components/ui/Section";
import CtaBanner from "@/components/home/CtaBanner";
import { performanceTrend, subjectPerformance, skillRadar, interestSplit, aiReport } from "@/mock/data";

const modules = [
  {
    icon: LineIcon,
    tag: "Performance tracking",
    title: "Watch progress, not just results",
    body: "Every uploaded report feeds a longitudinal view of each subject, normalised across boards and grading scales so terms are genuinely comparable.",
    visual: (
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={performanceTrend}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[60, 100]} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
          <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="average" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    ),
  },
  {
    icon: Compass,
    tag: "Interest analysis",
    title: "Find where curiosity actually lives",
    body: "We blend academic signals with hobbies, sports and stated goals to map the areas your child leans into naturally.",
    visual: (
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={interestSplit} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
            {interestSplit.map((e) => (
              <Cell key={e.name} fill={e.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
        </PieChart>
      </ResponsiveContainer>
    ),
  },
  {
    icon: Target,
    tag: "Ambition prediction",
    title: "Direction, years before it's urgent",
    body: "A skill fingerprint built from consistency, reasoning and expression points toward the streams and careers worth exploring early.",
    visual: (
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={skillRadar}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "#64748b" }} />
          <Radar dataKey="value" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.25} />
        </RadarChart>
      </ResponsiveContainer>
    ),
  },
  {
    icon: FileText,
    tag: "AI reports",
    title: "A mentor's summary, every term",
    body: "Strengths, gaps and specific suggestions written in plain language — ready to discuss with your child or their teacher.",
    visual: (
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={subjectPerformance}>
          <XAxis dataKey="subject" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
          <Bar dataKey="previous" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
          <Bar dataKey="score" fill="#2563EB" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
];

export default function Products() {
  return (
    <>
      <section className="px-6 pt-20 pb-4 md:pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            One platform, four kinds of clarity
          </h1>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            Explore the modules that make up ShineU Analytics — each one built on the reports you already have.
          </p>
        </div>
      </section>

      <Section>
        <div className="space-y-6">
          {modules.map((m, i) => (
            <motion.div
              key={m.tag}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className={`grid gap-10 lg:grid-cols-2 items-center bg-white rounded-3xl border border-slate-200/70 p-8 md:p-12 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-blue-600">
                  {m.tag}
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 leading-tight">
                  {m.title}
                </h2>
                <p className="mt-4 text-slate-500 leading-relaxed">{m.body}</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                  <m.icon className="w-4 h-4" />
                  Included in every plan
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">{m.visual}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Inside the report" title="What an AI summary looks like">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Strengths", aiReport.strengths, "text-emerald-600"],
            ["Areas to watch", aiReport.weaknesses, "text-amber-600"],
            ["Suggestions", aiReport.suggestions, "text-blue-600"],
          ].map(([title, items, color]) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200/70 p-7">
              <h3 className={`text-sm font-semibold ${color}`}>{title}</h3>
              <ul className="mt-4 space-y-3">
                {items.map((t) => (
                  <li key={t} className="text-sm text-slate-500 leading-relaxed">{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}