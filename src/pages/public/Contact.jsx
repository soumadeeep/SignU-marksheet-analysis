import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const details = [
  { icon: Mail, label: "Email", value: "hello@shineu.io" },
  { icon: Phone, label: "Phone", value: "+91 22 4890 1200" },
  { icon: MapPin, label: "Office", value: "12th Floor, Prism Tower, Bandra Kurla Complex, Mumbai 400051" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.message.trim().length < 10) next.message = "Tell us a little more (10+ characters)";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  const field = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition";

  return (
    <>
      <section className="px-6 pt-20 pb-6 md:pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            Let's talk about your child
          </h1>
          <p className="mt-6 text-lg text-slate-500">
            Questions about plans, boards or privacy? We usually reply within a day.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-slate-200/70 p-8 md:p-10"
          >
            {sent ? (
              <div className="flex flex-col items-center text-center py-16">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <h3 className="mt-5 text-xl font-semibold text-slate-900">Message sent</h3>
                <p className="mt-2 text-slate-500 text-sm max-w-xs">
                  Thanks for reaching out — our team will get back to you shortly.
                </p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm text-blue-600 font-medium">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    className={field}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Rohan Sharma"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    className={field}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className={`${field} resize-none`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help?"
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <Send className="w-4 h-4" /> Send message
                </button>
              </form>
            )}
          </motion.div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/70 p-8 space-y-6">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <d.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{d.label}</p>
                    <p className="text-sm text-slate-800 leading-relaxed">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200/70 overflow-hidden bg-white">
              <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MapPin className="w-8 h-8 text-blue-600" />
                  <p className="mt-2 text-sm font-medium text-slate-700">Prism Tower, BKC</p>
                  <p className="text-xs text-slate-400">Map preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}