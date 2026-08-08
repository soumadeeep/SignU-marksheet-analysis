import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, FileText, TrendingUp, Award, ArrowRight, Sparkles, Upload, Pencil } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar,
} from "recharts";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import StudentCard from "@/components/cards/StudentCard";
import AiReportCard from "@/components/cards/AiReportCard";
import { performanceTrend, subjectPerformance, activity, achievements } from "@/mock/data";
import { useData } from "@/context/DataContext";
import { useAuthDemo } from "@/context/AuthContext";

const icons = { ai: Sparkles, upload: Upload, badge: Award, edit: Pencil };

export default function Dashboard() {
  const { students, reports } = useData();
  const { user } = useAuthDemo();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10 text-white flex flex-wrap items-center justify-between gap-6"
      >
        <div>
          <p className="text-sm text-slate-400">Welcome back</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{user?.name?.split(" ")[0] || "there"} 👋</h1>
          <p className="mt-3 text-slate-400 max-w-md text-sm leading-relaxed">
            Two new AI analyses landed this week. Aarav is trending up, Kabir needs a nudge in Mathematics.
          </p>
        </div>
        <Link
          to="/app/reports"
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors"
        >
          Upload a report
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Students" value={students.length} sub="Active profiles" />
        <StatCard icon={FileText} label="Reports" value={reports.length} sub="Uploaded to date" accent="text-violet-600" bg="bg-violet-50" />
        <StatCard icon={TrendingUp} label="Avg. score" value="83.5" sub="+4.2 vs last term" accent="text-emerald-600" bg="bg-emerald-50" />
        <StatCard icon={Award} label="Badges" value={achievements.length} sub="Earned this year" accent="text-amber-600" bg="bg-amber-50" />
      </div>

      <AiReportCard />

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Performance trend" subtitle="Score vs class average">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrend}>
                <defs>
                  <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[60, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} fill="url(#dashGrad)" />
                <Area type="monotone" dataKey="average" stroke="#cbd5e1" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Subject performance" subtitle="This term vs previous">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformance}>
                <XAxis dataKey="subject" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="previous" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="score" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 tracking-tight">Your students</h2>
          <Link to="/app/students" className="text-sm text-blue-600 font-medium">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {students.slice(0, 4).map((s) => (
            <StudentCard key={s.id} student={s} />
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <ChartCard title="Recent reports" subtitle="Latest uploads across students">
          <div className="divide-y divide-slate-100">
            {reports.slice(0, 5).map((r) => {
              const student = students.find((s) => s.id === r.studentId);
              return (
                <div key={r.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                    <p className="text-xs text-slate-400 truncate">
                      {student?.name || "Unknown"} · {r.grade} · {r.uploadedAt}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${
                      r.status === "analyzed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="Activity" subtitle="What happened recently">
          <div className="space-y-5">
            {activity.map((a) => {
              const Icon = icons[a.type] || Sparkles;
              return (
                <div key={a.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-800">{a.title}</p>
                    <p className="text-xs text-slate-400">{a.detail}</p>
                    <p className="text-xs text-slate-300 mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a) => (
          <motion.div
            key={a.id}
            whileHover={{ y: -4 }}
            className={`rounded-2xl p-6 bg-gradient-to-br ${a.color} text-white`}
          >
            <Award className="w-5 h-5" />
            <p className="mt-4 font-medium">{a.name}</p>
            <p className="text-xs text-white/75 mt-1">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}