import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import { notifications, parent } from "@/mock/data";
import { useAuthDemo } from "@/context/AuthContext";

export default function Topbar({ onMenu }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuthDemo();
  const navigate = useNavigate();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/70">
      <div className="h-full px-4 md:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button className="lg:hidden p-2 text-slate-600" onClick={onMenu}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 max-w-sm w-full px-3.5 py-2 rounded-xl bg-slate-100/70">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              placeholder="Search students, reports…"
              className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => { setShowNotif(!showNotif); setShowMenu(false); }}
              className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {unread > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500" />}
            </button>
            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 text-sm font-semibold text-slate-900">
                  Notifications
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-slate-50 flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${n.unread ? "bg-blue-600" : "bg-slate-300"}`} />
                    <div>
                      <p className="text-sm text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.time} ago</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => { setShowMenu(!showMenu); setShowNotif(false); }}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img src={parent.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
              <span className="hidden sm:block text-sm text-slate-700">{user?.name || parent.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden py-1">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900">{user?.name || parent.name}</p>
                  <p className="text-xs text-slate-400">{user?.email || parent.email}</p>
                </div>
                <Link to="/app/profile" onClick={() => setShowMenu(false)} className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                  Profile
                </Link>
                <Link to="/app/settings" onClick={() => setShowMenu(false)} className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                  Settings
                </Link>
                <button
                  onClick={() => { logout(); navigate("/login"); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}