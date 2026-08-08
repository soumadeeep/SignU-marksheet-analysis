import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({ icon: Icon = Inbox, title = "Nothing here yet", body, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      {body && <p className="text-sm text-slate-500 mt-2 max-w-sm">{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}