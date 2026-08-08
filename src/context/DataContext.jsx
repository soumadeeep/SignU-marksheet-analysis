import React, { createContext, useContext, useState } from "react";
import { students as seedStudents, reports as seedReports } from "@/mock/data";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [students, setStudents] = useState(seedStudents);
  const [reports, setReports] = useState(seedReports);

  const addStudent = (data) =>
    setStudents((prev) => [
      {
        id: `s${Date.now()}`,
        avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80",
        score: 75,
        trend: "up",
        hobbies: [],
        goals: [],
        inspirations: [],
        interestedSubjects: [],
        sports: [],
        ...data,
      },
      ...prev,
    ]);

  const updateStudent = (id, data) =>
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));

  const deleteStudent = (id) => setStudents((prev) => prev.filter((s) => s.id !== id));

  const addReport = (data) =>
    setReports((prev) => [
      {
        id: `r${Date.now()}`,
        uploadedAt: new Date().toISOString().slice(0, 10),
        size: "1.0 MB",
        status: "processing",
        ...data,
      },
      ...prev,
    ]);

  const deleteReports = (ids) => setReports((prev) => prev.filter((r) => !ids.includes(r.id)));

  return (
    <DataContext.Provider
      value={{ students, reports, addStudent, updateStudent, deleteStudent, addReport, deleteReports }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);