import React, { useState } from "react";
import { Moon, Sun, Bell, Globe, Lock } from "lucide-react";

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-11 h-6 rounded-full transition-colors relative ${on ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [notif, setNotif] = useState({ email: true, weekly: true, product: false });
  const [language, setLanguage] = useState("English");
  const [privacy, setPrivacy] = useState({ analytics: true, share: false });

  const card = "bg-white rounded-3xl border border-slate-200/70 p-8";
  const row = "flex items-center justify-between py-3.5 border-b border-slate-50 last:border-0";

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Personalise how ShineU works for you.</p>
      </div>

      <div className={card}>
        <h2 className="font-semibold text-slate-900 tracking-tight mb-4">Theme</h2>
        <div className="grid grid-cols-2 gap-3">
          {[["light", Sun, "Light"], ["dark", Moon, "Dark"]].map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-colors ${
                theme === key ? "border-blue-600 bg-blue-50/50" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Icon className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={card}>
        <h2 className="font-semibold text-slate-900 tracking-tight flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-400" /> Notifications
        </h2>
        <div className="mt-3">
          {[
            ["email", "Email alerts", "Get notified when an analysis completes"],
            ["weekly", "Weekly digest", "A Sunday summary of your family's progress"],
            ["product", "Product updates", "New features and improvements"],
          ].map(([key, title, desc]) => (
            <div key={key} className={row}>
              <div>
                <p className="text-sm text-slate-800">{title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
              <Toggle on={notif[key]} onClick={() => setNotif({ ...notif, [key]: !notif[key] })} />
            </div>
          ))}
        </div>
      </div>

      <div className={card}>
        <h2 className="font-semibold text-slate-900 tracking-tight flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-slate-400" /> Language
        </h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none"
        >
          {["English", "हिन्दी", "मराठी", "தமிழ்", "Français"].map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className={card}>
        <h2 className="font-semibold text-slate-900 tracking-tight flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-400" /> Privacy
        </h2>
        <div className="mt-3">
          {[
            ["analytics", "Usage analytics", "Help us improve ShineU with anonymous usage data"],
            ["share", "Share anonymised insights", "Contribute to cohort benchmarks"],
          ].map(([key, title, desc]) => (
            <div key={key} className={row}>
              <div>
                <p className="text-sm text-slate-800">{title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
              <Toggle on={privacy[key]} onClick={() => setPrivacy({ ...privacy, [key]: !privacy[key] })} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}