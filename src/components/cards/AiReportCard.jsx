import React from "react";
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { aiReport } from "@/mock/data";

const blocks = [
  { key: "strengths", title: "Strengths", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { key: "weaknesses", title: "Areas to watch", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  { key: "suggestions", title: "Suggestions", icon: Lightbulb, color: "text-blue-600", bg: "bg-blue-50" },
];

export default function AiReportCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-blue-600 to-violet-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Sparkles className="w-4 h-4" />
            Latest AI report
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold tracking-tight leading-none">{aiReport.score}</p>
            <p className="text-xs text-white/70 mt-1">Performance score</p>
          </div>
        </div>
        <p className="mt-6 text-lg font-medium leading-snug max-w-md">{aiReport.headline}</p>
      </div>

      <div className="p-6 grid gap-6 md:grid-cols-3">
        {blocks.map((b) => (
          <div key={b.key}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-7 h-7 rounded-lg ${b.bg} flex items-center justify-center`}>
                <b.icon className={`w-3.5 h-3.5 ${b.color}`} />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">{b.title}</h4>
            </div>
            <ul className="space-y-2.5">
              {aiReport[b.key].map((t) => (
                <li key={t} className="text-sm text-slate-500 leading-relaxed">{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}