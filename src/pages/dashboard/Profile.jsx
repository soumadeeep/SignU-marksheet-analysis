import React, { useState } from "react";
import { Camera, Check } from "lucide-react";
import { parent } from "@/mock/data";
import { useAuthDemo } from "@/context/AuthContext";

const field = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition";

export default function Profile() {
  const { user } = useAuthDemo();
  const [form, setForm] = useState({ ...parent, name: user?.name || parent.name, email: user?.email || parent.email });
  const [saved, setSaved] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePw = (e) => {
    e.preventDefault();
    if (pw.next.length < 6) return setPwMsg("New password must be at least 6 characters.");
    if (pw.next !== pw.confirm) return setPwMsg("Passwords don't match.");
    setPwMsg("Password updated.");
    setPw({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Your parent account details.</p>
      </div>

      <form onSubmit={save} className="bg-white rounded-3xl border border-slate-200/70 p-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img src={form.avatar} alt="" className="w-20 h-20 rounded-2xl object-cover bg-slate-100" />
            <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <p className="font-medium text-slate-900">{form.name}</p>
            <p className="text-sm text-slate-500">{form.email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Full name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["address", "Address"],
          ].map(([key, label]) => (
            <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
              <input className={field} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            </div>
          ))}
        </div>

        <button type="submit" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
          {saved ? <><Check className="w-4 h-4" /> Saved</> : "Save changes"}
        </button>
      </form>

      <form onSubmit={changePw} className="bg-white rounded-3xl border border-slate-200/70 p-8">
        <h2 className="font-semibold text-slate-900 tracking-tight">Change password</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["current", "Current password"],
            ["next", "New password"],
            ["confirm", "Confirm password"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
              <input type="password" className={field} value={pw[key]} onChange={(e) => setPw({ ...pw, [key]: e.target.value })} />
            </div>
          ))}
        </div>
        {pwMsg && <p className="mt-3 text-xs text-slate-500">{pwMsg}</p>}
        <button type="submit" className="mt-6 px-5 py-2.5 rounded-full border border-slate-200 text-sm text-slate-700 hover:border-slate-300 transition-colors">
          Update password
        </button>
      </form>
    </div>
  );
}