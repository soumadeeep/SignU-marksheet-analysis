export const students = [
  {
    id: "s1",
    name: "Aarav Sharma",
    dob: "2012-04-18",
    school: "Greenwood International School",
    grade: "Class 7",
    academicYear: "2025-2026",
    avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80",
    hobbies: ["Chess", "Robotics", "Reading"],
    goals: ["Become a robotics engineer", "Score above 90% this year"],
    inspirations: ["APJ Abdul Kalam", "Elon Musk"],
    interestedSubjects: ["Mathematics", "Science", "Computer"],
    sports: ["Football", "Swimming"],
    score: 87,
    trend: "up",
  },
  {
    id: "s2",
    name: "Diya Nair",
    dob: "2014-09-02",
    school: "St. Xavier's High School",
    grade: "Class 5",
    academicYear: "2025-2026",
    avatar: "https://images.unsplash.com/photo-1595215452-6a1b2f0e7f7c?w=200&q=80",
    hobbies: ["Painting", "Classical dance"],
    goals: ["Win the state art competition"],
    inspirations: ["Frida Kahlo"],
    interestedSubjects: ["English", "Art", "Social Studies"],
    sports: ["Badminton"],
    score: 92,
    trend: "up",
  },
  {
    id: "s3",
    name: "Kabir Menon",
    dob: "2010-01-27",
    school: "Delhi Public School",
    grade: "Class 9",
    academicYear: "2025-2026",
    avatar: "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=200&q=80",
    hobbies: ["Cricket", "Music production"],
    goals: ["Improve in Mathematics", "Join the school band"],
    inspirations: ["Rahul Dravid"],
    interestedSubjects: ["Physics", "Music"],
    sports: ["Cricket", "Athletics"],
    score: 74,
    trend: "down",
  },
  {
    id: "s4",
    name: "Ishita Rao",
    dob: "2013-06-11",
    school: "Greenwood International School",
    grade: "Class 6",
    academicYear: "2025-2026",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    hobbies: ["Astronomy", "Creative writing"],
    goals: ["Publish a short story"],
    inspirations: ["Sudha Murty"],
    interestedSubjects: ["English", "Science"],
    sports: ["Basketball"],
    score: 81,
    trend: "up",
  },
];

export const reports = [
  { id: "r1", studentId: "s1", title: "Term 1 Progress Report", year: "2025", grade: "Class 7", remarks: "Excellent problem solving", uploadedAt: "2025-10-04", size: "1.2 MB", status: "analyzed" },
  { id: "r2", studentId: "s1", title: "Mid-Term Assessment", year: "2025", grade: "Class 7", remarks: "Needs focus in languages", uploadedAt: "2025-12-19", size: "880 KB", status: "analyzed" },
  { id: "r3", studentId: "s2", title: "Annual Report Card", year: "2025", grade: "Class 5", remarks: "Outstanding creative work", uploadedAt: "2026-03-02", size: "2.1 MB", status: "analyzed" },
  { id: "r4", studentId: "s3", title: "Term 2 Progress Report", year: "2026", grade: "Class 9", remarks: "Mathematics requires attention", uploadedAt: "2026-01-15", size: "1.6 MB", status: "processing" },
  { id: "r5", studentId: "s4", title: "Science Olympiad Result", year: "2026", grade: "Class 6", remarks: "Ranked 4th in district", uploadedAt: "2026-02-21", size: "640 KB", status: "analyzed" },
];

export const performanceTrend = [
  { month: "Apr", score: 71, average: 68 },
  { month: "May", score: 74, average: 69 },
  { month: "Jun", score: 78, average: 70 },
  { month: "Jul", score: 76, average: 71 },
  { month: "Aug", score: 82, average: 72 },
  { month: "Sep", score: 85, average: 73 },
  { month: "Oct", score: 87, average: 74 },
  { month: "Nov", score: 90, average: 75 },
];

export const subjectPerformance = [
  { subject: "Math", score: 92, previous: 84 },
  { subject: "Science", score: 88, previous: 81 },
  { subject: "English", score: 74, previous: 76 },
  { subject: "History", score: 69, previous: 64 },
  { subject: "Computer", score: 95, previous: 90 },
  { subject: "Art", score: 81, previous: 78 },
];

export const skillRadar = [
  { skill: "Logic", value: 92 },
  { skill: "Creativity", value: 78 },
  { skill: "Memory", value: 84 },
  { skill: "Focus", value: 71 },
  { skill: "Teamwork", value: 88 },
  { skill: "Expression", value: 66 },
];

export const interestSplit = [
  { name: "STEM", value: 44, color: "#2563EB" },
  { name: "Arts", value: 21, color: "#7C3AED" },
  { name: "Sports", value: 19, color: "#22C55E" },
  { name: "Languages", value: 16, color: "#F59E0B" },
];

export const heatmap = [
  { label: "Mon", cells: [40, 62, 88, 71, 55] },
  { label: "Tue", cells: [58, 74, 92, 66, 48] },
  { label: "Wed", cells: [77, 81, 69, 90, 62] },
  { label: "Thu", cells: [51, 66, 84, 79, 88] },
  { label: "Fri", cells: [64, 92, 73, 58, 70] },
];

export const aiReport = {
  score: 87,
  headline: "Aarav is trending upward with strong analytical momentum",
  strengths: [
    "Exceptional numerical reasoning — top 8% of his cohort",
    "Consistent improvement in Science across three terms",
    "High engagement in project-based assignments",
  ],
  weaknesses: [
    "Language comprehension dipped by 4 points this term",
    "Written expression is below his overall average",
    "Attention drops in afternoon assessments",
  ],
  suggestions: [
    "Introduce 20 minutes of daily reading in mixed genres",
    "Pair Mathematics practice with word-problem framing",
    "Shift heavier study blocks to the morning window",
  ],
};

export const activity = [
  { id: "a1", title: "AI analysis completed", detail: "Term 1 Progress Report · Aarav", time: "2 hours ago", type: "ai" },
  { id: "a2", title: "New report uploaded", detail: "Science Olympiad Result · Ishita", time: "Yesterday", type: "upload" },
  { id: "a3", title: "Badge unlocked", detail: "Consistency Champion · Diya", time: "3 days ago", type: "badge" },
  { id: "a4", title: "Student profile updated", detail: "Goals added for Kabir", time: "5 days ago", type: "edit" },
];

export const notifications = [
  { id: "n1", title: "Aarav's new report is ready", time: "2h", unread: true },
  { id: "n2", title: "Weekly insight digest available", time: "1d", unread: true },
  { id: "n3", title: "Diya unlocked a new badge", time: "3d", unread: false },
];

export const achievements = [
  { id: "b1", name: "Consistency Champion", desc: "8 weeks of steady improvement", color: "from-blue-500 to-indigo-500" },
  { id: "b2", name: "Math Prodigy", desc: "Scored above 90 in three tests", color: "from-violet-500 to-fuchsia-500" },
  { id: "b3", name: "Curious Mind", desc: "Explored 5 new subject areas", color: "from-emerald-500 to-teal-500" },
  { id: "b4", name: "Team Player", desc: "Rated high in group projects", color: "from-amber-500 to-orange-500" },
];

export const insights = [
  { title: "Peak learning window", body: "Performance is 18% higher in morning sessions than evening ones.", tone: "info" },
  { title: "Subject correlation", body: "Improvement in Mathematics closely tracks Computer Science scores.", tone: "success" },
  { title: "Watch area", body: "English comprehension has plateaued over the last two terms.", tone: "warning" },
];

export const parent = {
  name: "Rohan Sharma",
  email: "rohan.sharma@example.com",
  phone: "+91 98200 41122",
  address: "42 Marine Drive, Mumbai, MH 400020",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
};

export const testimonials = [
  { name: "Priya Desai", role: "Parent of two, Bengaluru", quote: "For the first time I understand what my daughter's report card actually means for her future.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80" },
  { name: "Anil Kumar", role: "Parent, Hyderabad", quote: "The ambition prediction helped us pick the right electives a full year ahead.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" },
  { name: "Meera Joseph", role: "Parent, Kochi", quote: "Beautifully simple. I upload a PDF and get insights I'd never spot myself.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
];

export const pricing = [
  { name: "Starter", price: "Free", desc: "For one child, getting started", features: ["1 student profile", "3 reports per year", "Core performance analytics"], highlight: false },
  { name: "Family", price: "₹499", period: "/month", desc: "For growing families", features: ["Up to 4 students", "Unlimited reports", "AI ambition prediction", "Interest analysis"], highlight: true },
  { name: "Mentor", price: "₹1,299", period: "/month", desc: "For tutors & counsellors", features: ["Unlimited students", "Comparative cohort analytics", "Exportable AI reports", "Priority support"], highlight: false },
];

export const faqs = [
  { q: "What kind of reports can I upload?", a: "Any school report card, term assessment or olympiad result as a PDF or image. Our engine reads scanned documents too." },
  { q: "How does the AI generate insights?", a: "We compare subject-level trends across terms, blend them with your child's stated interests, and surface patterns a single report card can't show." },
  { q: "Is my child's data private?", a: "Reports are visible only to you. You can delete any document and its derived analytics at any time." },
  { q: "Can I track more than one child?", a: "Yes. The Family plan supports up to four student profiles, each with its own analytics workspace." },
  { q: "Do you support all school boards?", a: "We support CBSE, ICSE, IB, IGCSE and most state boards, plus custom grading scales." },
];

export const stats = [
  { value: "48,000+", label: "Reports analysed" },
  { value: "12,400", label: "Families onboard" },
  { value: "96%", label: "Insight accuracy" },
  { value: "31", label: "Boards supported" },
];