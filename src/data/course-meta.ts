import type { CourseMeta } from "./types";
import { COURSE_META_1 } from "./course-meta-1";
import { COURSE_META_2 } from "./course-meta-2";
import { COURSE_META_3 } from "./course-meta-3";
import { COURSE_META_4 } from "./course-meta-4";

export const COURSE_META: Record<string, CourseMeta> = {
  ...COURSE_META_1,
  ...COURSE_META_2,
  ...COURSE_META_3,
  ...COURSE_META_4,
};

// Domain → accent color token (kept restrained: one accent family per domain)
export const DOMAIN_STYLES: Record<string, { chip: string; bar: string }> = {
  "CS Fundamentals": { chip: "bg-stone-100 text-stone-700 border-stone-200", bar: "bg-stone-500" },
  "Programming": { chip: "bg-emerald-50 text-emerald-800 border-emerald-200", bar: "bg-emerald-600" },
  "DSA & Algorithms": { chip: "bg-teal-50 text-teal-800 border-teal-200", bar: "bg-teal-600" },
  "CS Core": { chip: "bg-orange-50 text-orange-800 border-orange-200", bar: "bg-orange-600" },
  "Web Development": { chip: "bg-cyan-50 text-cyan-800 border-cyan-200", bar: "bg-cyan-600" },
  "System Design": { chip: "bg-rose-50 text-rose-800 border-rose-200", bar: "bg-rose-600" },
  "DevOps & Cloud": { chip: "bg-lime-50 text-lime-800 border-lime-200", bar: "bg-lime-600" },
  "Security": { chip: "bg-red-50 text-red-800 border-red-200", bar: "bg-red-600" },
  "Mathematics": { chip: "bg-amber-50 text-amber-800 border-amber-200", bar: "bg-amber-500" },
  "AI & Machine Learning": { chip: "bg-violet-50 text-violet-800 border-violet-200", bar: "bg-violet-600" },
  "Embedded & Hardware": { chip: "bg-neutral-100 text-neutral-700 border-neutral-200", bar: "bg-neutral-600" },
};

export function domainStyle(domain: string) {
  return DOMAIN_STYLES[domain] ?? DOMAIN_STYLES["CS Fundamentals"];
}
