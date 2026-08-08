const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const SUBJECTS = ["Math", "Science", "English", "History", "Computer", "Art"];
const SKILLS = ["Logic", "Creativity", "Memory", "Focus", "Teamwork", "Expression"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const PIE_COLORS = { STEM: "#2563EB", Arts: "#7C3AED", Sports: "#22C55E", Languages: "#F59E0B" };

const CATEGORY_MAP = {
  Mathematics: "STEM", Science: "STEM", Computer: "STEM", Physics: "STEM", Astronomy: "STEM", Chess: "STEM", Robotics: "STEM",
  English: "Languages", "Social Studies": "Languages",
  Art: "Arts", Music: "Arts", "Creative writing": "Arts", Painting: "Arts", "Classical dance": "Arts",
};

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h || 1;
}
function rng(seed) {
  let s = hash(seed);
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const clamp = (v) => Math.max(40, Math.min(99, v));

export function studentTrend(student) {
  const r = rng(student.id + "t");
  const base = student.score || 80;
  return MONTHS.map((m, i) => ({
    month: m,
    score: clamp(Math.round(base - 12 + (i / (MONTHS.length - 1)) * 12 + (r() * 6 - 3))),
    average: 68 + Math.round(r() * 6),
  }));
}

export function aggregateTrend(students) {
  const series = students.map(studentTrend);
  if (!series.length) return [];
  return MONTHS.map((_, i) => ({
    month: MONTHS[i],
    score: Math.round(series.reduce((a, s) => a + s[i].score, 0) / series.length),
    average: Math.round(series.reduce((a, s) => a + s[i].average, 0) / series.length),
  }));
}

export function studentSubjects(student) {
  const r = rng(student.id + "sub");
  const base = student.score || 80;
  return SUBJECTS.map((subject) => {
    const score = clamp(Math.round(base + (r() * 16 - 8)));
    return { subject, score, previous: clamp(score + Math.round(r() * 8 - 6)) };
  });
}

export function aggregateSubjects(students) {
  const perStudent = students.map((s) => ({ name: s.name.split(" ")[0], rows: studentSubjects(s) }));
  return SUBJECTS.map((subject, idx) => {
    const row = { subject };
    perStudent.forEach((s) => { row[s.name] = s.rows[idx].score; });
    return row;
  });
}

export function studentSkills(student) {
  const r = rng(student.id + "skill");
  return SKILLS.map((skill) => ({ skill, value: Math.round(50 + r() * 50) }));
}

export function aggregateSkills(students) {
  if (!students.length) return SKILLS.map((skill) => ({ skill, value: 0 }));
  const sets = students.map(studentSkills);
  return SKILLS.map((skill, idx) => ({
    skill,
    value: Math.round(sets.reduce((a, s) => a + s[idx].value, 0) / sets.length),
  }));
}

function categorize(student) {
  const cat = { STEM: 0, Arts: 0, Sports: 0, Languages: 0 };
  [...(student.interestedSubjects || []), ...(student.hobbies || [])].forEach((it) => {
    const c = CATEGORY_MAP[it];
    if (c) cat[c] += 1;
  });
  (student.sports || []).forEach(() => { cat.Sports += 1; });
  return cat;
}

export function studentInterests(student) {
  return Object.entries(categorize(student))
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value, color: PIE_COLORS[name] }));
}

export function aggregateInterests(students) {
  const cat = { STEM: 0, Arts: 0, Sports: 0, Languages: 0 };
  students.forEach((s) => {
    const c = categorize(s);
    Object.keys(cat).forEach((k) => { cat[k] += c[k]; });
  });
  return Object.entries(cat).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value, color: PIE_COLORS[name] }));
}

export function studentHeatmap(student) {
  const r = rng(student.id + "heat");
  return DAYS.map((label) => ({ label, cells: Array.from({ length: 5 }, () => Math.round(30 + r() * 70)) }));
}

export function aggregateHeatmap(students) {
  if (!students.length) return studentHeatmap({ id: "all" });
  const sets = students.map(studentHeatmap);
  return DAYS.map((label, di) => ({
    label,
    cells: sets[0][di].cells.map((_, ci) => Math.round(sets.reduce((a, s) => a + s[di].cells[ci], 0) / sets.length)),
  }));
}

export function studentRanking(students) {
  return [...students].sort((a, b) => (b.score || 0) - (a.score || 0));
}

export function studentInsights(student) {
  const subs = studentSubjects(student);
  const best = [...subs].sort((a, b) => b.score - a.score)[0];
  const worst = [...subs].sort((a, b) => a.score - b.score)[0];
  return [
    { title: "Strongest subject", body: `${student.name.split(" ")[0]} leads in ${best.subject} at ${best.score}%.`, tone: "success" },
    { title: "Watch area", body: `${worst.subject} is the lowest at ${worst.score}% — focus practice here.`, tone: "warning" },
    { title: "Peak window", body: "Performance is consistently higher in morning study sessions.", tone: "info" },
  ];
}

export function aggregateInsights(students) {
  const ranking = studentRanking(students);
  const top = ranking[0];
  const low = ranking[ranking.length - 1];
  const avg = students.length ? Math.round(students.reduce((a, s) => a + (s.score || 0), 0) / students.length) : 0;
  return [
    { title: "Family average", body: `Across ${students.length} students, the average score is ${avg}%.`, tone: "info" },
    { title: "Leading the pack", body: `${top.name} is your top performer at ${top.score}%.`, tone: "success" },
    { title: "Needs a nudge", body: `${low.name} is trailing at ${low.score}% — consider extra support.`, tone: "warning" },
  ];
}