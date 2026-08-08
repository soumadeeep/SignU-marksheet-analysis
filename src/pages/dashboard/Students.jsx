import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Trash2, X, Users } from "lucide-react";
import StudentCard from "@/components/cards/StudentCard";
import EmptyState from "@/components/ui/EmptyState";
import { useData } from "@/context/DataContext";

const PAGE_SIZE = 6;
const field = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition";

export default function Students() {
  const { students, addStudent, deleteStudent } = useData();
  const [q, setQ] = useState("");
  const [grade, setGrade] = useState("All");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", dob: "", school: "", grade: "", academicYear: "2025-2026" });

  const grades = ["All", ...Array.from(new Set(students.map((s) => s.grade)))];

  const filtered = useMemo(
    () =>
      students.filter(
        (s) =>
          (grade === "All" || s.grade === grade) &&
          (s.name.toLowerCase().includes(q.toLowerCase()) || s.school.toLowerCase().includes(q.toLowerCase()))
      ),
    [students, q, grade]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.grade.trim()) return;
    addStudent(form);
    setForm({ name: "", dob: "", school: "", grade: "", academicYear: "2025-2026" });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Students</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} profile{filtered.length === 1 ? "" : "s"}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add student
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Search by name or school"
            className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400"
          />
        </div>
        <select
          value={grade}
          onChange={(e) => { setGrade(e.target.value); setPage(1); }}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-600 outline-none"
        >
          {grades.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/70">
          <EmptyState icon={Users} title="No students found" body="Try a different search, or add a new student profile." />
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <div key={s.id} className="relative group">
              <StudentCard student={s} />
              <button
                onClick={() => deleteStudent(s.id)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white border border-slate-200 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:border-red-200 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                current === i + 1 ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.form
              onSubmit={save}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 p-7 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900 tracking-tight">Add a student</h2>
                <button type="button" onClick={() => setOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
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
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Save student
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}