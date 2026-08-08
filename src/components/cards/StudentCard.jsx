import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, GraduationCap } from "lucide-react";

export default function StudentCard({ student }) {
  const Trend = student.trend === "up" ? TrendingUp : TrendingDown;
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
      <Link
        to={`/app/students/${student.id}`}
        className="block bg-white rounded-2xl border border-slate-200/70 p-6 hover:border-slate-300 transition-colors"
      >
        <div className="flex items-center gap-4">
          <img src={student.avatar} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
          <div className="min-w-0">
            <p className="font-medium text-slate-900 truncate">{student.name}</p>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 truncate">
              <GraduationCap className="w-3.5 h-3.5" />
              {student.grade}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400 truncate">{student.school}</p>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400">Performance</p>
            <p className="text-2xl font-semibold tracking-tight text-slate-900">{student.score}</p>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              student.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            }`}
          >
            <Trend className="w-3 h-3" />
            {student.trend === "up" ? "Improving" : "Needs focus"}
          </span>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
            style={{ width: `${student.score}%` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}