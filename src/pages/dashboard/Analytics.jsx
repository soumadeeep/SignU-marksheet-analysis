import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Lightbulb, TrendingUp, Users } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell, Legend,
} from "recharts";
import ChartCard from "@/components/ui/ChartCard";
import EmptyState from "@/components/ui/EmptyState";
import { useData } from "@/context/DataContext";
import {
  aggregateTrend, aggregateSubjects, aggregateSkills, aggregateInterests, aggregateHeatmap,
  aggregateInsights, studentRanking,
  studentTrend, studentSubjects, studentSkills, studentInterests, studentHeatmap, studentInsights,
} from "@/lib/analytics";
import { achievements } from "@/mock/data";

const heatColor = (v) => {
  if (v >= 85) return "bg-blue-600";
  if (v >= 70) return "bg-blue-500/70";
  if (v >= 55) return "bg-blue-400/50";
  return "bg-blue-200/60";
};

const tones = {
  info: "border-blue-100 bg-blue-50 text-blue-700",
  success: "border-emerald-100 bg-emerald-50 text-emerald-700",
  warning: "border-amber-100 bg-amber-50 text-amber-700",
};

const BAR_COLORS = ["#2563EB", "#7C3AED", "#22C55E", "#F59E0B", "#EC4899", "#14B8A6"];

export default function Analytics() {
  const { students } = useData();
  const [scope, setScope] = useState("all");

  const isAll = scope === "all";
  const student = !isAll ? students.find((s) => s.id === scope) : null;

  if (!students.length) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/70">
        <EmptyState icon={Users} title="No students to analyse" body="Add a student profile to unlock analytics." />
      </div>
    );
  }

  const trend = isAll ? aggregateTrend(students) : studentTrend(student);
  const subjects = isAll ? aggregateSubjects(students) : studentSubjects(student);
  const skills = isAll ? aggregateSkills(students) : studentSkills(student);
  const interests = isAll ? aggregateInterests(students) : studentInterests(student);
  const heat = isAll ? aggregateHeatmap(students) : studentHeatmap(student);
  const insights = isAll ? aggregateInsights(students) : studentInsights(student);
  const studentNames = students.map((s) => s.name.split(" ")[0]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">
            {isAll ? "Aggregated view across all your students." : `Focused view for ${student.name}.`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="all">All students</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {isAll && (
        <ChartCard title="Student ranking" subtitle="By current score">
          <div className="space-y-3">
            {studentRanking(students).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="w-6 text-sm font-semibold text-slate-400">{i + 1}</span>
                <img src={s.avatar} alt="" className="w-9 h-9 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.grade} · {s.school}</p>
                </div>
                <div className="w-28 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${s.score}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-semibold text-slate-700">{s.score}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Trend analysis" subtitle="Score vs class average">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[60, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="average" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Subject comparison" subtitle={isAll ? "Each student side by side" : "Current vs previous term"}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjects}>
                <XAxis dataKey="subject" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                {isAll ? (
                  studentNames.map((name, idx) => (
                    <Bar key={name} dataKey={name} fill={BAR_COLORS[idx % BAR_COLORS.length]} radius={[6, 6, 0, 0]} />
                  ))
                ) : (
                  <>
                    <Bar dataKey="previous" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="score" fill="#2563EB" radius={[6, 6, 0, 0]} />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Skill fingerprint" subtitle={isAll ? "Family average" : "Relative strengths"}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "#64748b" }} />
                <Radar dataKey="value" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Interest split" subtitle="Where engagement concentrates">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={interests} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {interests.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Engagement heatmap" subtitle="Study intensity by day and period">
        <div className="space-y-2">
          {heat.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-10 text-xs text-slate-400">{row.label}</span>
              <div className="flex gap-2 flex-1">
                {row.cells.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    title={`${c}%`}
                    className={`h-9 flex-1 rounded-lg ${heatColor(c)}`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-between pl-[52px] pt-1 text-[11px] text-slate-400">
            {["Period 1", "Period 2", "Period 3", "Period 4", "Period 5"].map((p) => (
              <span key={p} className="flex-1 text-center">{p}</span>
            ))}
          </div>
        </div>
      </ChartCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Insights" subtitle="Patterns worth acting on">
          <div className="space-y-3">
            {insights.map((i) => (
              <div key={i.title} className={`rounded-2xl border p-5 ${tones[i.tone]}`}>
                <p className="text-sm font-semibold">{i.title}</p>
                <p className="text-sm mt-1.5 opacity-80 leading-relaxed">{i.body}</p>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Recommendations" subtitle="Next term's focus">
          <div className="space-y-4">
            {[
              "Reinforce the weakest subject with two short sessions per week.",
              "Maintain the current routine in top-scoring areas.",
              "Convert high-interest hobbies into structured skill-building.",
              "Shift heavier study blocks to the morning window where possible.",
            ].map((r) => (
              <div key={r} className="flex gap-3">
                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed">{r}</p>
              </div>
            ))}
            <div className="pt-2 flex items-center gap-2 text-sm text-emerald-600">
              <TrendingUp className="w-4 h-4" /> Projected average next term: +3.5
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a) => (
          <motion.div key={a.id} whileHover={{ y: -4 }} className={`rounded-2xl p-6 bg-gradient-to-br ${a.color} text-white`}>
            <Award className="w-5 h-5" />
            <p className="mt-4 font-medium">{a.name}</p>
            <p className="text-xs text-white/75 mt-1">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}