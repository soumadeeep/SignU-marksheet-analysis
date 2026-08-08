import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/demo", label: "Demo" },
  { to: "/contact", label: "Contact" },
];

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 border-b border-slate-200/60">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-slate-900">ShineU</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm rounded-lg transition-colors ${
                  isActive ? "text-slate-900 font-medium" : "text-slate-500 hover:text-slate-900"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/login" className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-medium text-white rounded-full bg-slate-900 hover:bg-slate-800 transition-colors"
          >
            Get started
          </Link>
        </div>

        <button className="md:hidden p-2 text-slate-700" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-200/60 bg-white px-6 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-2 py-2.5 text-sm text-slate-600"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 flex gap-2">
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm rounded-full border border-slate-200">
              Sign in
            </Link>
            <Link to="/register" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm rounded-full bg-slate-900 text-white">
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}