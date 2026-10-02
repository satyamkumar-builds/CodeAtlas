"use client";

import { ExternalLink, Hammer, ChevronRight, Plus } from "lucide-react";
import { PRACTICE_CATEGORIES } from "@/data/practice-data";
import { getCourse } from "@/lib/catalog";
import { getMeta } from "@/lib/catalog";
import { SectionLabel, Breadcrumbs, useMounted } from "@/components/shared";
import { useProgress } from "@/lib/store";
import { navigate, useRoute } from "@/lib/router";
import { cn } from "@/lib/utils";

const ACCENT: Record<string, string> = {
  emerald: "text-emerald-700",
  amber: "text-amber-600",
  cyan: "text-cyan-700",
  rose: "text-rose-700",
  lime: "text-lime-700",
  red: "text-red-700",
  violet: "text-violet-700",
  sky: "text-sky-700",
  orange: "text-orange-700",
};

export default function PracticeView() {
  const route = useRoute();
  const activeId = route.segments[1];
  const mounted = useMounted();
  const progress = useProgress();

  const category = PRACTICE_CATEGORIES.find((c) => c.id === activeId);

  // ---- category page
  if (category) {
    return (
      <div>
        <Breadcrumbs items={[{ label: "Practice", href: "#/practice" }, { label: category.title }]} />
        <header className="mt-4 border-b border-stone-200 pb-6">
          <p className={cn("text-[11px] font-semibold uppercase tracking-[0.16em]", ACCENT[category.color])}>
            Practice domain
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">{category.title}</h1>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-stone-600">{category.tagline}</p>
          <p className="mt-3 max-w-2xl rounded-md border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[12px] leading-relaxed text-stone-600">
            <span className="font-semibold text-stone-800">The loop:</span> open the platform → solve → come back →
            log a session below. CodeAtlas tracks your effort; the platform tracks your submissions.
          </p>
        </header>

        <div className="mt-6 space-y-2.5">
          {category.platforms.map((p) => {
            const log = mounted ? progress.practiceLog[p.name] : undefined;
            const related = p.relatedCourses.map((id) => ({ id, course: getCourse(id) })).filter((r) => r.course);
            return (
              <div key={p.name} className="rounded-lg border border-stone-200 bg-white p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-[14.5px] font-semibold text-stone-900">{p.name}</h2>
                      {p.tags.map((t) => (
                        <span key={t} className="rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10.5px] text-stone-500">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1.5 max-w-2xl text-[12.5px] leading-relaxed text-stone-600">{p.description}</p>
                    {related.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10.5px] font-semibold uppercase tracking-wider text-stone-400">
                          Pairs with
                        </span>
                        {related.map(({ id, course }) => (
                          <button
                            key={id}
                            onClick={() => navigate(`#/courses/${id}`)}
                            className="rounded border border-stone-200 px-1.5 py-0.5 text-[11px] font-medium text-emerald-800 hover:border-emerald-700/40 hover:bg-emerald-50"
                          >
                            {getMeta(id)?.shortTitle ?? course!.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-emerald-700 px-3.5 py-2 text-[12.5px] font-semibold text-white hover:bg-emerald-800"
                    >
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                    <button
                      onClick={() => progress.logPractice(p.name)}
                      className="inline-flex items-center gap-1 rounded-md border border-stone-300 px-2.5 py-2 text-[12px] font-medium text-stone-600 hover:border-emerald-700/40 hover:text-emerald-800"
                      aria-label={`Log a practice session on ${p.name}`}
                    >
                      <Plus className="h-3.5 w-3.5" /> Log session
                    </button>
                  </div>
                </div>
                {log && (
                  <p className="mt-3 border-t border-stone-100 pt-2.5 font-mono text-[11px] tabular-nums text-stone-400">
                    {log.count} session{log.count === 1 ? "" : "s"} logged · last on{" "}
                    {new Date(log.last).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---- directory page
  return (
    <div>
      <SectionLabel>Practice & Build</SectionLabel>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">Practice Directory</h1>
      <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-stone-600">
        Learning without reps is entertainment. Every domain maps to platforms where you actually solve, build and break
        — then you return here and track it.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PRACTICE_CATEGORIES.map((cat) => {
          const sessions = mounted
            ? cat.platforms.reduce((a, p) => a + (progress.practiceLog[p.name]?.count ?? 0), 0)
            : 0;
          return (
            <button
              key={cat.id}
              onClick={() => navigate(`#/practice/${cat.id}`)}
              className="group flex flex-col rounded-lg border border-stone-200 bg-white p-5 text-left transition-colors hover:border-emerald-700/40 hover:bg-emerald-50/20"
            >
              <div className="flex items-center justify-between">
                <Hammer className={cn("h-4.5 w-4.5", ACCENT[cat.color])} />
                <ChevronRight className="h-4 w-4 text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-700" />
              </div>
              <p className="mt-3 text-[14.5px] font-semibold text-stone-900">{cat.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-stone-500">{cat.tagline}</p>
              <p className="mt-3 font-mono text-[11px] tabular-nums text-stone-400">
                {cat.platforms.length} platforms{sessions > 0 ? ` · ${sessions} sessions logged` : ""}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
