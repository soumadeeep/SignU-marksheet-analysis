import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Award, BookOpen } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts";
import { students, performanceTrend, subjectPerformance, skillRadar, aiReport, achievements } from "@/mock/data";

const tabs = ["Overview", "Subjects", "Skills", "AI report"];

export default function Demo() {
  const [tab, setTab] = useState("Overview");
  const student = students[0];

  return (
    <>
      <section className="px-6 pt-20 pb-6 md:pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" /> Interactive demo
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            Explore a real student workspace
          </h1>
          <p className="mt-6 text-lg text-slate-500">
            This is Aarav — a sample profile built on three years of reports. Click around.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200/70 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.3)] overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <img src={student.avatar} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
              <div>
                <p className="font-semibold text-slate-900">{student.name}</p>
                <p className="text-sm text-slate-500">{student.grade} · {student.school}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-slate-400">Score</p>
                <p className="text-2xl font-semibold text-slate-900">{aiReport.score}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> Improving
              </span>
            </div>
          </div>

          <div className="px-6 md:px-8 pt-5 flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                  tab === t ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {tab === "Overview" && (
                  <div className="space-y-6">
                    <div className="h-64 rounded-2xl bg-slate-50 border border-slate-100 p-5">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceTrend}>
                          <defs>
                            <linearGradient id="demoGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[60, 100]} />
                          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                          <Area type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2.5} fill="url(#demoGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {achievements.map((a) => (
                        <div key={a.id} className={`rounded-2xl p-5 bg-gradient-to-br ${a.color} text-white`}>
                          <Award className="w-5 h-5" />
                          <p className="mt-4 font-medium text-sm">{a.name}</p>
                          <p className="text-xs text-white/75 mt-1">{a.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === "Subjects" && (
                  <div className="h-72 rounded-2xl bg-slate-50 border border-slate-100 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectPerformance}>
                        <XAxis dataKey="subject" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                        <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                        <Bar dataKey="previous" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="score" fill="#2563EB" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {tab === "Skills" && (
                  <div className="grid gap-6 md:grid-cols-2 items-center">
                    <div className="h-72 rounded-2xl bg-slate-50 border border-slate-100 p-5">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={skillRadar}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "#64748b" }} />
                          <Radar dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.25} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      {student.interestedSubjects.map((s) => (
                        <div key={s} className="flex items-center gap-3 text-sm text-slate-600">
                          <BookOpen className="w-4 h-4 text-blue-600" /> Strong interest in {s}
                        </div>
                      ))}
                      <p className="text-sm text-slate-500 leading-relaxed pt-2">
                        Skill fingerprint suggests an engineering or applied-science track suits Aarav's
                        reasoning profile.
                      </p>
                    </div>
                  </div>
                )}

                {tab === "AI report" && (
                  <div className="grid gap-5 md:grid-cols-3">
                    {[
                      ["Strengths", aiReport.strengths, "text-emerald-600"],
                      ["Areas to watch", aiReport.weaknesses, "text-amber-600"],
                      ["Suggestions", aiReport.suggestions, "text-blue-600"],
                    ].map(([title, items, color]) => (
                      <div key={title} className="rounded-2xl bg-slate-50 border border-slate-100 p-6">
                        <h4 className={`text-sm font-semibold ${color}`}>{title}</h4>
                        <ul className="mt-3 space-y-2.5">
                          {items.map((t) => (
                            <li key={t} className="text-sm text-slate-500 leading-relaxed">{t}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 text-center">
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Build this for your child
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}