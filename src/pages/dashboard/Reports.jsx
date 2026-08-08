import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, Trash2, X, CheckSquare, Square } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { useData } from "@/context/DataContext";

const field = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition";

export default function Reports() {
  const { reports, students, addReport, deleteReports } = useData();
  const [selected, setSelected] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ title: "", studentId: students[0]?.id || "", year: "2026", grade: "", remarks: "" });

  const toggle = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const upload = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addReport(form);
    setForm({ title: "", studentId: students[0]?.id || "", year: "2026", grade: "", remarks: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reports</h1>
          <p className="text-sm text-slate-500 mt-1">{reports.length} documents · {selected.length} selected</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelected(selected.length === reports.length ? [] : reports.map((r) => r.id))}
            className="px-4 py-2.5 rounded-full border border-slate-200 text-sm text-slate-600 hover:border-slate-300 transition-colors"
          >
            {selected.length === reports.length && reports.length > 0 ? "Deselect all" : "Select all"}
          </button>
          <button
            disabled={!selected.length}
            onClick={() => { deleteReports(selected); setSelected([]); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-50 text-red-600 text-sm font-medium disabled:opacity-40 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <form onSubmit={upload} className="bg-white rounded-3xl border border-slate-200/70 p-7 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); setForm({ ...form, title: "Dropped report.pdf" }); }}
          className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-10 transition-colors ${
            dragging ? "border-blue-500 bg-blue-50/60" : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
            <UploadCloud className="w-5 h-5 text-blue-600" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-800">Drag & drop a report here</p>
          <p className="mt-1 text-xs text-slate-400">PDF, PNG or JPG up to 20 MB</p>
          <label className="mt-5 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 cursor-pointer hover:border-slate-300">
            Browse files
            <input
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setForm({ ...form, title: e.target.files[0].name })}
            />
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Report title</label>
            <input className={field} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Term 2 Progress Report" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Student</label>
              <select className={field} value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Year</label>
              <input className={field} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Class</label>
            <input className={field} value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} placeholder="Class 7" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Remarks</label>
            <textarea rows={2} className={`${field} resize-none`} value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
          </div>
          <button type="submit" className="w-full px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
            Upload report
          </button>
        </div>
      </form>

      {reports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/70">
          <EmptyState icon={FileText} title="No reports yet" body="Upload your first report to generate analytics." />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/70 overflow-hidden">
          <div className="hidden md:grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3.5 text-xs font-medium text-slate-400 border-b border-slate-100">
            <span className="w-5" /><span>Report</span><span>Student</span><span>Year / Class</span><span>Uploaded</span><span>Status</span>
          </div>
          {reports.map((r) => {
            const student = students.find((s) => s.id === r.studentId);
            const isSel = selected.includes(r.id);
            const Icon = isSel ? CheckSquare : Square;
            return (
              <div
                key={r.id}
                className="grid md:grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-x-4 gap-y-1 px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors items-center"
              >
                <button onClick={() => toggle(r.id)} className={isSel ? "text-blue-600" : "text-slate-300"}>
                  <Icon className="w-4 h-4" />
                </button>
                <button onClick={() => setPreview(r)} className="text-left text-sm font-medium text-slate-800 hover:text-blue-600 truncate">
                  {r.title}
                </button>
                <span className="text-sm text-slate-500 truncate">{student?.name || "—"}</span>
                <span className="text-sm text-slate-500">{r.year} · {r.grade}</span>
                <span className="text-sm text-slate-400">{r.uploadedAt}</span>
                <span className={`justify-self-start md:justify-self-end text-xs px-2.5 py-1 rounded-full ${r.status === "analyzed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {r.status}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {preview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setPreview(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-7"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900 tracking-tight">{preview.title}</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    {students.find((s) => s.id === preview.studentId)?.name} · {preview.year} · {preview.grade}
                  </p>
                </div>
                <button onClick={() => setPreview(null)} className="text-slate-400"><X className="w-5 h-5" /></button>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 h-56 flex flex-col items-center justify-center">
                <FileText className="w-8 h-8 text-slate-300" />
                <p className="mt-3 text-sm text-slate-400">Document preview · {preview.size}</p>
              </div>
              <p className="mt-5 text-sm text-slate-500 leading-relaxed">
                <span className="text-slate-800 font-medium">Remarks: </span>
                {preview.remarks || "No remarks recorded."}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}