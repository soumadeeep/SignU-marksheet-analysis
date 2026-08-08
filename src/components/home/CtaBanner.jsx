import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 px-8 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-xl mx-auto leading-tight">
          Your child's next report card can say much more
        </h2>
        <p className="mt-4 text-white/80 max-w-md mx-auto">
          Start free today and get your first AI analysis in under two minutes.
        </p>
        <Link
          to="/register"
          className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors"
        >
          Create your account
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}