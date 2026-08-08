import React from "react";
import { Outlet } from "react-router-dom";
import PublicNav from "@/components/layout/PublicNav";
import Footer from "@/components/layout/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PublicNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}