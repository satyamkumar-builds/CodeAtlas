"use client";

import { ArrowRight, Flame, Star, StickyNote, ListChecks, TrendingUp, RotateCcw, Hammer } from "lucide-react";
import { courses, getMeta } from "@/lib/catalog";
import { PRACTICE_CATEGORIES } from "@/data/practice-data";
import { SectionLabel, ProgressBar, useMounted, Breadcrumbs, EmptyState } from "@/components/shared";
import { useProgress, courseProgress, streakInfo } from "@/lib/store";
import { navigate } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { domainStyle } from "@/data/course-meta";
import { cn } from "@/lib/utils";

export default function DashboardView() {
  const mounted = useMounted();
  const progress = useProgress();

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-stone-100" />
        <div className="h-40 animate-pulse rounded-lg bg-stone-100" />
      </div>
    );
  }

  const streak = streakInfo(progress.activity);
  const totals = courses.map((c) => ({ id: c.id, total: c.lessonCount }));
  const doneTotal = totals.reduce((a, t) => a + Object.keys(progress.completed[t.id] ?? {}).length, 0);
  const bookmarkCount = Object.values(progress.bookmarks).reduce((a, m) => a + Object.keys(m).length, 0);
  const noteCount = Object.keys(progress.notes).length;

  // active courses: visited or with completions
  const active = courses
    .map((c) => ({ c, p: courseProgress(progress, c.id, c.lessonCount), visit: progress.lastVisited[c.id] }))
    .filter((x) => x.p.done > 0 || x.visit)
    .sort((a, b) => (b.visit?.at ?? 0) - (a.visit?.at ?? 0));

  const resume = active.find((x) => x.visit);

  // domain skills
  const domainStats = Array.from(new Set(courses.map((c) => c.domain)))
    .map((d) => {
      const list = courses.filter((c) => c.domain === d);
      const done = list.reduce((a, c) => a + Object.keys(progress.completed[c.id] ?? {}).length, 0);
      const total = list.reduce((a, c) => a + c.lessonCount, 0);
      return { domain: d, pct: total === 0 ? 0 : Math.round((done / total) * 100), done, total };
    })
    .filter((d) => d.total > 0)
    .sort((a, b) => b.pct - a.pct);

  const practiceTotal = Object.values(progress.practiceLog).reduce((a, e) => a + e.count, 0);

  return (
    <div className="space-y-10">
      <div>
        <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Dashboard" }]} />
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900">Welcome back, Satyam</h1>
        <p className="mt-1.5 text-[13.5px] text-stone-600">
          {streak.activeToday
            ? `You've already learned today — ${streak.current}-day streak and counting.`
            : streak.current > 0
              ? `${streak.current}-day streak. One lesson keeps it alive.`
              : "Your progress lives on this device. Start (or resume) a lesson below."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { icon: ListChecks, k: "Lessons done", v: doneTotal.toLocaleString("en-IN") },
          { icon: TrendingUp, k: "Overall", v: `${totals.length && doneTotal ? Math.round((doneTotal / totals.reduce((a, t) => a + t.total, 0)) * 100) : 0}%` },
          { icon: Flame, k: "Streak", v: `${streak.current}d` },
          { icon: Star, k: "Bookmarks", v: String(bookmarkCount) },
          { icon: StickyNote, k: "Notes", v: String(noteCount) },
          { icon: Hammer, k: "Practice logs", v: String(practiceTotal) },
        ].map((s) => (
          <div key={s.k} className="bg-white p-4">
            <s.icon className="h-4 w-4 text-stone-400" />
            <p className="mt-2.5 font-mono text-lg font-semibold tabular-nums text-stone-900">{s.v}</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">{s.k}</p>
          </div>
        ))}
      </div>

      {/* Continue learning */}
      {resume ? (
        <section className="rounded-lg border border-emerald-700/25 bg-emerald-50/40 p-5 sm:p-6">
          <SectionLabel className="text-emerald-800/70">Continue where you left off</SectionLabel>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-stone-900">
                {getMeta(resume.c.id)?.shortTitle ?? resume.c.title}
                <span className="font-normal text-stone-500"> · Lesson {resume.visit!.gi}</span>
              </p>
              <p className="mt-0.5 truncate text-[13px] text-stone-600">
                {resume.c.lessons[resume.visit!.gi - 1]?.title}
              </p>
              <div className="mt-3 flex items-center gap-3 sm:max-w-sm">
                <ProgressBar pct={resume.p.pct} className="flex-1" />
                <span className="font-mono text-[11.5px] tabular-nums text-stone-500">
                  {resume.p.done}/{resume.p.total}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate(`#/courses/${resume.c.id}/${resume.visit!.gi}`)}
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-[13.5px] font-semibold text-white hover:bg-emerald-800"
            >
              Resume <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      ) : (
        <EmptyState
          title="Nothing in progress yet"
          body="Open any course, watch your first lesson and hit 'Mark complete' — your dashboard will fill up from there."
          action={{ label: "Browse courses", href: "#/courses" }}
        />
      )}

      {/* Per-course progress */}
      {active.length > 0 && (
        <section>
          <SectionLabel>Your courses</SectionLabel>
          <div className="mt-4 overflow-hidden rounded-lg border border-stone-200">
            {active.map(({ c, p }, i) => (
              <button
                key={c.id}
                onClick={() => navigate(`#/courses/${c.id}`)}
                className="flex w-full items-center gap-4 border-b border-stone-100 bg-white px-4 py-3.5 text-left last:border-b-0 hover:bg-stone-50"
              >
                <span className="w-8 shrink-0 font-mono text-[11px] tabular-nums text-stone-400">
                  {String(c.num).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-stone-900">{c.title}</span>
                  <ProgressBar pct={p.pct} className="mt-1.5 max-w-md" />
                </span>
                <span className="shrink-0 text-right font-mono text-[11.5px] tabular-nums text-stone-500">
                  {p.done} / {p.total}
                  <span className="ml-2 inline-block w-9 text-right text-stone-800">{p.pct}%</span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-stone-300" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Skills by domain */}
      {doneTotal > 0 && (
        <section>
          <SectionLabel>Skills coverage</SectionLabel>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {domainStats.map((d) => (
              <div key={d.domain} className="flex items-center gap-3">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", domainStyle(d.domain).bar)} />
                <span className="w-36 shrink-0 truncate text-[12.5px] font-medium text-stone-700">{d.domain}</span>
                <ProgressBar pct={d.pct} className="flex-1" barClass={domainStyle(d.domain).bar} />
                <span className="w-16 shrink-0 text-right font-mono text-[11px] tabular-nums text-stone-400">
                  {d.done}/{d.total}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Danger zone */}
      <section className="rounded-lg border border-stone-200 bg-stone-50/60 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13.5px] font-semibold text-stone-800">Progress data</p>
            <p className="mt-0.5 text-[12.5px] text-stone-500">
              Everything is stored locally in your browser (localStorage). No account, no server.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            onClick={() => {
              if (confirm("Reset ALL progress, bookmarks and notes on this device?")) progress.resetAll();
            }}
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset all data
          </Button>
        </div>
      </section>
    </div>
  );
}
