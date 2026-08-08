import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const groups = [
  { title: "Product", links: [["Overview", "/products"], ["Live demo", "/demo"], ["Pricing", "/#pricing"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"]] },
  { title: "Account", links: [["Sign in", "/login"], ["Create account", "/register"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-slate-900">ShineU Analytics</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
            Turning school report cards into a clear picture of your child's strengths, interests and ambitions.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">{g.title}</h4>
            <ul className="space-y-3">
              {g.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200/70">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© 2026 ShineU Analytics. All rights reserved.</p>
          <p className="text-xs text-slate-400">Privacy · Terms · Security</p>
        </div>
      </div>
    </footer>
  );
}