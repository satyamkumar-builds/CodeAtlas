"use client";

import { Star, Trash2 } from "lucide-react";
import { getCourse, getMeta } from "@/lib/catalog";
import { SectionLabel, Breadcrumbs, useMounted, EmptyState, ProgressBar } from "@/components/shared";
import { useProgress } from "@/lib/store";
import { navigate } from "@/lib/router";

export default function BookmarksView() {
  const mounted = useMounted();
  const progress = useProgress();

  if (!mounted) return <div className="h-40 animate-pulse rounded-lg bg-stone-100" />;

  const entries = Object.entries(progress.bookmarks)
    .map(([courseId, lessons]) => ({
      course: getCourse(courseId),
      lessons: Object.entries(lessons)
        .map(([gi, ts]) => ({ gi: Number(gi), ts }))
        .sort((a, b) => b.ts - a.ts),
    }))
    .filter((e) => e.course && e.lessons.length > 0)
    .sort((a, b) => b.lessons[0].ts - a.lessons[0].ts);

  const total = entries.reduce((a, e) => a + e.lessons.length, 0);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Bookmarks" }]} />
      <SectionLabel>My CodeAtlas</SectionLabel>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">Bookmarks</h1>
      <p className="mt-2 text-[13.5px] text-stone-600">
        {total} saved lesson{total === 1 ? "" : "s"} across {entries.length} course{entries.length === 1 ? "" : "s"}.
      </p>

      {entries.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No bookmarks yet"
            body="Hit the star on any lesson — tricky lectures, revision material, interview prep — and it lands here."
            action={{ label: "Find lessons to save", href: "#/courses" }}
          />
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {entries.map(({ course, lessons }) => {
            const p = mounted ? { done: Object.keys(progress.completed[course!.id] ?? {}).length, total: course!.lessonCount } : { done: 0, total: course!.lessonCount };
            return (
              <section key={course!.id} className="overflow-hidden rounded-lg border border-stone-200">
                <div className="border-b border-stone-100 bg-stone-50/70 px-4 py-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button onClick={() => navigate(`#/courses/${course!.id}`)} className="text-left">
                      <p className="text-[14px] font-semibold text-stone-900 hover:text-emerald-800">
                        {getMeta(course!.id)?.shortTitle ?? course!.title}
                      </p>
                      <p className="text-[12px] text-stone-500">{course!.title}</p>
                    </button>
                    <div className="flex w-40 items-center gap-2">
                      <ProgressBar pct={course!.lessonCount ? Math.round((p.done / course!.lessonCount) * 100) : 0} />
                      <span className="font-mono text-[10.5px] tabular-nums text-stone-400">
                        {p.done}/{p.total}
                      </span>
                    </div>
                  </div>
                </div>
                <ul>
                  {lessons.map(({ gi, ts }) => {
                    const lesson = course!.lessons.find((l) => l.gi === gi);
                    if (!lesson) return null;
                    const isDone = gi in (progress.completed[course!.id] ?? {});
                    return (
                      <li key={gi} className="flex items-center gap-3 border-b border-stone-100 px-4 py-2.5 last:border-b-0">
                        <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-500" />
                        <button
                          onClick={() => navigate(`#/courses/${course!.id}/${gi}`)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <span className={isDone ? "block truncate text-[13px] text-stone-400" : "block truncate text-[13px] text-stone-800"}>
                            {String(gi).padStart(2, "0")}. {lesson.title}
                          </span>
                          <span className="block text-[10.5px] text-stone-400">
                            Saved {new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · Module: {lesson.modTitle}
                          </span>
                        </button>
                        <button
                          onClick={() => progress.toggleBookmark(course!.id, gi)}
                          aria-label="Remove bookmark"
                          className="rounded p-1.5 text-stone-300 hover:bg-stone-100 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
