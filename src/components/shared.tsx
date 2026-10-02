"use client";

import { useSyncExternalStore } from "react";
import { Check, ChevronRight, Star, PlayCircle, Bookmark } from "lucide-react";
import { navigate } from "@/lib/router";
import { useProgress } from "@/lib/store";
import { domainStyle } from "@/data/course-meta";
import { getMeta } from "@/lib/catalog";
import type { Course, Lesson } from "@/data/types";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------ utils
const emptySubscribe = () => () => {};
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );
}

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400", className)}>
      {children}
    </p>
  );
}

export function ProgressBar({ pct, className, barClass }: { pct: number; className?: string; barClass?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-stone-200/80", className)} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn("h-full rounded-full bg-emerald-600 transition-all duration-500", barClass)} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function DomainChip({ domain }: { domain: string }) {
  const s = domainStyle(domain);
  return (
    <span className={cn("inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10.5px] font-medium", s.chip)}>
      {domain}
    </span>
  );
}

export function LevelChip({ level }: { level: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-stone-200 bg-white px-1.5 py-0.5 text-[10.5px] font-medium text-stone-600">
      {level}
    </span>
  );
}

// ------------------------------------------------------------- breadcrumbs
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-[12.5px] text-stone-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3 text-stone-300" />}
          {item.href ? (
            <button
              onClick={() => navigate(item.href!)}
              className="hover:text-stone-900 hover:underline underline-offset-2"
            >
              {item.label}
            </button>
          ) : (
            <span className="font-medium text-stone-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ----------------------------------------------------------------- states
export function EmptyState({ title, body, action }: { title: string; body: string; action?: { label: string; href: string } }) {
  return (
    <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50/60 px-6 py-14 text-center">
      <Bookmark className="mx-auto h-5 w-5 text-stone-300" />
      <p className="mt-3 text-sm font-semibold text-stone-800">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-[13px] leading-relaxed text-stone-500">{body}</p>
      {action && (
        <button
          onClick={() => navigate(action.href)}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-[13px] font-medium text-stone-800 hover:border-stone-400 hover:bg-stone-50"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// ------------------------------------------------------------- course card
export function CourseCard({ course }: { course: Course }) {
  const mounted = useMounted();
  const progress = useProgress();
  const meta = getMeta(course.id)?.shortTitle;
  const done = mounted ? Object.keys(progress.completed[course.id] ?? {}).length : 0;
  const pct = course.lessonCount === 0 ? 0 : Math.round((done / course.lessonCount) * 100);

  return (
    <a
      href={`#/courses/${course.id}`}
      className="group flex flex-col rounded-lg border border-stone-200 bg-white p-5 transition-colors hover:border-emerald-700/40 hover:bg-emerald-50/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tabular-nums text-stone-400">{String(course.num).padStart(2, "0")}</p>
          <h3 className="mt-1 text-[15px] font-semibold leading-snug text-stone-900 group-hover:text-emerald-900">
            {meta ?? course.title}
          </h3>
        </div>
        <DomainChip domain={course.domain} />
      </div>
      <p className="mt-1.5 text-[12.5px] text-stone-500">{course.title}</p>
      <div className="mt-3 flex items-center gap-2 text-[11.5px] text-stone-500">
        <LevelChip level={course.level} />
        <span className="font-mono tabular-nums">{course.lessonCount} lessons</span>
        <span className="text-stone-300">·</span>
        <span className="font-mono tabular-nums">{course.moduleCount} modules</span>
      </div>
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-[11px] text-stone-500">
          <span className="font-mono tabular-nums">{pct}%</span>
          {pct === 100 && <span className="font-medium text-emerald-700">Completed</span>}
        </div>
        <ProgressBar pct={pct} className="mt-1.5" />
      </div>
    </a>
  );
}

// -------------------------------------------------------------- lesson row
export function LessonRow({
  course,
  lesson,
  indexLabel,
  onBookmark = true,
}: {
  course: Course;
  lesson: Lesson;
  indexLabel?: string;
  onBookmark?: boolean;
}) {
  const mounted = useMounted();
  const progress = useProgress();
  const isDone = mounted && lesson.gi in (progress.completed[course.id] ?? {});
  const isSaved = mounted && lesson.gi in (progress.bookmarks[course.id] ?? {});

  return (
    <div className="group flex items-center gap-3 border-b border-stone-100 px-4 py-2.5 last:border-b-0 hover:bg-stone-50">
      <button
        onClick={() => navigate(`#/courses/${course.id}/${lesson.gi}`)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
        aria-label={`Open lesson ${lesson.title}`}
      >
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] tabular-nums",
            isDone ? "border-emerald-600 bg-emerald-600 text-white" : "border-stone-300 bg-white text-stone-500"
          )}
        >
          {isDone ? <Check className="h-3.5 w-3.5" /> : indexLabel ?? lesson.gi}
        </span>
        <span className={cn("truncate text-[13.5px]", isDone ? "text-stone-400" : "text-stone-800")}>
          {lesson.title}
        </span>
      </button>
      <div className="flex shrink-0 items-center gap-1">
        {onBookmark && (
          <button
            onClick={() => progress.toggleBookmark(course.id, lesson.gi)}
            aria-label={isSaved ? "Remove bookmark" : "Bookmark lesson"}
            className={cn(
              "rounded p-1.5 text-stone-300 transition-colors hover:bg-stone-100 hover:text-stone-600",
              isSaved && "text-amber-500 hover:text-amber-600"
            )}
          >
            <Star className={cn("h-3.5 w-3.5", isSaved && "fill-amber-400")} />
          </button>
        )}
        <button
          onClick={() => navigate(`#/courses/${course.id}/${lesson.gi}`)}
          aria-label={`Watch ${lesson.title}`}
          className="rounded p-1.5 text-stone-300 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
        >
          <PlayCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
