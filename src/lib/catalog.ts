import catalogJson from "@/data/catalog.json";
import { COURSE_META } from "@/data/course-meta";
import type { Course, Lesson, Catalog } from "@/data/types";

export const catalog = catalogJson as unknown as Catalog;
export const courses: Course[] = catalog.courses;

export const DOMAINS = Array.from(new Set(courses.map((c) => c.domain)));

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getMeta(id: string) {
  return COURSE_META[id];
}

export function getLesson(courseId: string, gi: number): Lesson | undefined {
  const c = getCourse(courseId);
  return c?.lessons.find((l) => l.gi === gi);
}

export function neighbours(course: Course, gi: number) {
  const idx = course.lessons.findIndex((l) => l.gi === gi);
  return {
    prev: idx > 0 ? course.lessons[idx - 1] : undefined,
    next: idx >= 0 && idx < course.lessons.length - 1 ? course.lessons[idx + 1] : undefined,
  };
}

export function youtubeEmbed(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function youtubeWatch(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// ---------------------------------------------------------------- search
export interface SearchHit {
  kind: "course" | "lesson" | "practice" | "project" | "roadmap";
  title: string;
  sub: string;
  href: string;
  course?: Course;
  gi?: number;
}

import { PRACTICE_CATEGORIES } from "@/data/practice-data";
import { PROJECTS } from "@/data/projects-data";
import { ROADMAPS } from "@/data/roadmaps-data";

const courseIndex = courses.map((c) => ({
  c,
  hay: [c.title, c.domain, c.level, c.tags.join(" "), getMeta(c.id)?.shortTitle ?? ""].join(" ").toLowerCase(),
}));

const lessonIndex = courses.flatMap((c) =>
  c.lessons.map((l) => ({ c, l, hay: l.title.toLowerCase() }))
);

const practiceIndex = PRACTICE_CATEGORIES.flatMap((cat) =>
  cat.platforms.map((p) => ({
    p,
    cat,
    hay: [p.name, p.description, p.tags.join(" "), cat.title].join(" ").toLowerCase(),
  }))
);

const projectIndex = PROJECTS.map((p) => ({
  p,
  hay: [p.title, p.brief, p.domain, p.level, p.skills.join(" ")].join(" ").toLowerCase(),
}));

const roadmapIndex = ROADMAPS.map((r) => ({
  r,
  hay: [r.title, r.subtitle, r.audience, r.stages.map((s) => s.title).join(" ")].join(" ").toLowerCase(),
}));

export function searchAll(query: string, limit = 24): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];

  for (const { c, hay } of courseIndex) {
    if (hay.includes(q)) {
      hits.push({ kind: "course", title: c.title, sub: `${c.domain} · ${c.lessonCount} lessons`, href: `#/courses/${c.id}`, course: c });
    }
  }
  for (const { c, l, hay } of lessonIndex) {
    if (hay.includes(q)) {
      hits.push({ kind: "lesson", title: l.title, sub: `${c.title} · Lesson ${l.gi}`, href: `#/courses/${c.id}/${l.gi}`, course: c, gi: l.gi });
      if (hits.length > limit * 4) break;
    }
  }
  for (const { p, cat, hay } of practiceIndex) {
    if (hay.includes(q)) hits.push({ kind: "practice", title: p.name, sub: `Practice · ${cat.title}`, href: `#/practice/${cat.id}` });
  }
  for (const { p, hay } of projectIndex) {
    if (hay.includes(q)) hits.push({ kind: "project", title: p.title, sub: `Project · ${p.domain} · ${p.level}`, href: `#/projects` });
  }
  for (const { r, hay } of roadmapIndex) {
    if (hay.includes(q)) hits.push({ kind: "roadmap", title: r.title, sub: `Roadmap · ${r.subtitle}`, href: `#/roadmaps/${r.id}` });
  }

  // rank: courses first, then lessons, then others
  const rank: Record<SearchHit["kind"], number> = { course: 0, lesson: 1, practice: 2, roadmap: 3, project: 4 };
  hits.sort((a, b) => rank[a.kind] - rank[b.kind]);
  return hits.slice(0, limit);
}
