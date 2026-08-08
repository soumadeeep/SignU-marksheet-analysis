import React from "react";

export default function ChartCard({ title, subtitle, action, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/70 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-900 tracking-tight">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}