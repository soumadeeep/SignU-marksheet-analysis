import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { useAuthDemo } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuthDemo();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "demo@shineu.io", password: "shineu123" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email) || form.password.length < 6) {
      setError("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      login(form.email);
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

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to see your family's latest insights.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className={`${field} pr-11`}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                Remember me
              </label>
              <button type="button" className="text-sm text-blue-600 font-medium">Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500 text-center">
            New here?{" "}
            <Link to="/register" className="text-blue-600 font-medium">Create an account</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-700 p-16">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-semibold tracking-tight leading-tight">
            Every report card, finally making sense.
          </h2>
          <p className="mt-5 text-white/75 leading-relaxed">
            Performance trends, interest maps and ambition predictions — waiting for you inside.
          </p>
          <div className="mt-10 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-6">
            <p className="text-sm text-white/70">Demo credentials</p>
            <p className="mt-2 text-sm">demo@shineu.io · shineu123</p>
          </div>
        </div>
      </div>
    </div>
  );
}