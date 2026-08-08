import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { useAuthDemo } from "@/context/AuthContext";

const perks = ["Unlimited report uploads", "AI insights after every term", "Up to 4 student profiles"];

export default function Register() {
  const { register } = useAuthDemo();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.password.length < 6) next.password = "Minimum 6 characters";
    if (form.confirm !== form.password) next.confirm = "Passwords don't match";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      register(form.name, form.email);
      navigate("/app");
    }, 600);
  };

  const field = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition";

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-slate-900">ShineU</span>
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">Free to start. No card required.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {[
              ["name", "Full name", "text", "Rohan Sharma"],
              ["email", "Email", "text", "you@example.com"],
              ["password", "Password", "password", "••••••••"],
              ["confirm", "Confirm password", "password", "••••••••"],
            ].map(([key, label, type, ph]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
                <input
                  type={type}
                  placeholder={ph}
                  className={field}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
                {errors[key] && <p className="mt-1.5 text-xs text-red-500">{errors[key]}</p>}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-violet-700 to-blue-600 p-16">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-semibold tracking-tight leading-tight">
            Start with one report. Get a whole picture.
          </h2>
          <ul className="mt-10 space-y-4">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/85">
                <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}