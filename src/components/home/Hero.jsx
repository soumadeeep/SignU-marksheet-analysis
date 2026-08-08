import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis } from "recharts";
import { performanceTrend, subjectPerformance } from "@/mock/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-blue-100 via-violet-100 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            AI insights for every report card
          </span>

          <h1 className="mt-6 text-[2.75rem] md:text-6xl leading-[1.05] font-semibold tracking-tight text-slate-900">
            Understand your child <br className="hidden md:block" />
            beyond the <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">marks</span>
          </h1>

          <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-lg">
            Upload school reports and ShineU turns them into performance trends, interest maps and
            ambition predictions — so you know exactly where to guide them next.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Start free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-slate-300 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Watch the demo
            </Link>
          </div>

          <p className="mt-8 text-xs text-slate-400">No credit card required · 12,400 families onboard</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-3xl bg-white border border-slate-200/70 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.25)] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Performance score</p>
                <p className="text-3xl font-semibold tracking-tight text-slate-900">87.4</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> +12.6%
              </span>
            </div>

            <div className="h-40 mt-6 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrend}>
                  <defs>
                    <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} fill="url(#heroGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {subjectPerformance.slice(0, 3).map((s) => (
                <div key={s.subject} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-400">{s.subject}</p>
                  <p className="text-lg font-semibold text-slate-900">{s.score}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 -left-4 md:-left-10 bg-white rounded-2xl border border-slate-200/70 shadow-xl p-4 max-w-[230px]"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <p className="text-xs font-semibold text-slate-900">AI insight</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Strong logical reasoning — consider an early robotics track.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}