import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Check, X } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import ChartCard from "@/components/ui/ChartCard";
import Pill from "@/components/ui/Pill";
import EmptyState from "@/components/ui/EmptyState";
import { performanceTrend } from "@/mock/data";
import { useData } from "@/context/DataContext";

const field = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, reports, updateStudent, deleteStudent } = useData();
  const student = students.find((s) => s.id === id);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(student || {});

  if (!student) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/70">
        <EmptyState
          title="Student not found"
          body="This profile may have been removed."
          action={<Link to="/app/students" className="text-sm text-blue-600 font-medium">Back to students</Link>}
        />
      </div>
    );
  }

  const studentReports = reports.filter((r) => r.studentId === student.id);

  const save = () => {
    updateStudent(student.id, form);
    setEditing(false);
  };

  const lists = [
    ["Hobbies", student.hobbies, "blue"],
    ["Goals", student.goals, "violet"],
    ["Inspirations", student.inspirations, "amber"],
    ["Interested subjects", student.interestedSubjects, "green"],
    ["Sports", student.sports, "slate"],
  ];

  return (
    <div className="space-y-6">
      <Link to="/app/students" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Students
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/70 p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            <img src={student.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover bg-slate-100" />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{student.name}</h1>
              <p className="text-sm text-slate-500 mt-1">{student.grade} · {student.school}</p>
              <p className="text-xs text-slate-400 mt-1">
                Born {student.dob || "—"} · Academic year {student.academicYear}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={save} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-white text-sm">
                  <Check className="w-4 h-4" /> Save
                </button>
                <button onClick={() => setEditing(false)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 text-sm text-slate-600">
                  <X className="w-4 h-4" /> Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setForm(student); setEditing(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 text-sm text-slate-600 hover:border-slate-300"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => { deleteStudent(student.id); navigate("/app/students"); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 text-sm text-red-600 hover:border-red-200"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </>
            )}
          </div>
        </div>

        {editing && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["name", "Full name", "text"],
              ["dob", "Date of birth", "date"],
              ["school", "School", "text"],
              ["grade", "Class", "text"],
              ["academicYear", "Academic year", "text"],
            ].map(([key, label, type]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                <input
                  type={type}
                  className={field}
                  value={form[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <ChartCard title="Performance trend" subtitle="Across the academic year">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrend}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[60, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Profile details" subtitle="Interests and aspirations">
          <div className="space-y-5">
            {lists.map(([label, items, tone]) => (
              <div key={label}>
                <p className="text-xs text-slate-400 mb-2">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {(items || []).length ? (
                    items.map((i) => <Pill key={i} tone={tone}>{i}</Pill>)
                  ) : (
                    <span className="text-sm text-slate-400">Not added yet</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Reports" subtitle={`${studentReports.length} uploaded`}>
        {studentReports.length === 0 ? (
          <EmptyState title="No reports yet" body="Upload a report to unlock analytics for this student." />
        ) : (
          <div className="divide-y divide-slate-100">
            {studentReports.map((r) => (
              <div key={r.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                  <p className="text-xs text-slate-400">{r.year} · {r.grade} · {r.uploadedAt}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${r.status === "analyzed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </ChartCard>
    </div>
  );
}