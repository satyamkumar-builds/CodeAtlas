"use client";

import { ArrowRight, Map, ListChecks, Hammer, LineChart, Award, PlayCircle } from "lucide-react";
import { courses, DOMAINS, getMeta } from "@/lib/catalog";
import { ROADMAPS } from "@/data/roadmaps-data";
import { PRACTICE_CATEGORIES } from "@/data/practice-data";
import { PROJECTS } from "@/data/projects-data";
import { CourseCard, SectionLabel, ProgressBar, useMounted } from "@/components/shared";
import { useProgress, courseProgress } from "@/lib/store";
import { navigate } from "@/lib/router";
import { domainStyle } from "@/data/course-meta";
import { cn } from "@/lib/utils";

const LOOP = [
  { icon: Map, title: "Learn", body: "Structured courses with modules, sequenced lessons and curated study notes." },
  { icon: ListChecks, title: "Practice", body: "Every topic maps to external problem sets — LeetCode, CSES, SQLBolt, labs." },
  { icon: Hammer, title: "Build", body: "Project briefs per domain, tiered from beginner to expert." },
  { icon: LineChart, title: "Track", body: "Progress, streaks, bookmarks and notes — stored on your device." },
  { icon: Award, title: "Master", body: "Roadmaps tie it together: fundamentals → CS core → specialization." },
];

export default function HomeView() {
  const mounted = useMounted();
  const progress = useProgress();

  const totals = courses.map((c) => ({ id: c.id, total: c.lessonCount }));
  const totalLessons = totals.reduce((a, t) => a + t.total, 0);
  const platformCount = PRACTICE_CATEGORIES.reduce((a, c) => a + c.platforms.length, 0);

  // continue learning: most recent visit with remaining lessons
  const visits = mounted
    ? Object.entries(progress.lastVisited)
        .map(([id, v]) => ({ id, ...v, course: courses.find((c) => c.id === id) }))
        .filter((v) => v.course && v.gi <= v.course.lessonCount)
        .sort((a, b) => b.at - a.at)
    : [];
  const resume = visits[0];

  const byDomain = DOMAINS.map((d) => ({ domain: d, list: courses.filter((c) => c.domain === d) })).sort(
    (a, b) => b.list.length - a.list.length
  );

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="pt-2">
        <SectionLabel>CodeAtlas — by Satyam Kumar</SectionLabel>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl">
          A structured map from Computer Science fundamentals to{" "}
          <span className="text-emerald-700">AI Engineering</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-stone-600">
          Thirty-one curated learning tracks and {totalLessons.toLocaleString("en-IN")}+ lessons — from your first line
          of C to CUDA kernels — organized like a serious course platform, not a pile of links. Free sources,
          paid-course structure.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("#/courses")}
            className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            Browse the catalog <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate(resume ? `#/courses/${resume.id}/${resume.gi}` : "#/roadmaps")}
            className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-[13.5px] font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50"
          >
            <PlayCircle className="h-4 w-4 text-emerald-700" />
            {resume ? "Continue learning" : "Pick a roadmap"}
          </button>
        </div>

        {/* stat strip */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-4">
          {[
            { k: "Courses", v: String(courses.length) },
            { k: "Lessons", v: `${totalLessons.toLocaleString("en-IN")}+` },
            { k: "Practice platforms", v: String(platformCount) },
            { k: "Project briefs", v: String(PROJECTS.length) },
          ].map((s) => (
            <div key={s.k} className="bg-white px-5 py-4">
              <dt className="text-[11px] font-medium uppercase tracking-wider text-stone-400">{s.k}</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-stone-900">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Continue learning */}
      {resume && resume.course && (
        <section className="rounded-lg border border-emerald-700/25 bg-emerald-50/40 p-5 sm:p-6">
          <SectionLabel className="text-emerald-800/70">Continue learning</SectionLabel>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-stone-900">
                {getMeta(resume.id)?.shortTitle ?? resume.course.title}
                <span className="font-normal text-stone-500"> · Lesson {resume.gi}</span>
              </p>
              <p className="mt-0.5 truncate text-[13px] text-stone-600">
                {resume.course.lessons[resume.gi - 1]?.title}
              </p>
              {(() => {
                const p = courseProgress(progress, resume.id, resume.course.lessonCount);
                return (
                  <div className="mt-3 flex items-center gap-3 sm:max-w-sm">
                    <ProgressBar pct={p.pct} className="flex-1" />
                    <span className="font-mono text-[11.5px] tabular-nums text-stone-500">
                      {p.done}/{p.total}
                    </span>
                  </div>
                );
              })()}
            </div>
            <button
              onClick={() => navigate(`#/courses/${resume.id}/${resume.gi}`)}
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-[13.5px] font-semibold text-white hover:bg-emerald-800"
            >
              Resume <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Learning loop */}
      <section>
        <SectionLabel>The learning loop</SectionLabel>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-stone-900">Watch. Solve. Build. Repeat.</h2>
        <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-3 lg:grid-cols-5">
          {LOOP.map((step, i) => (
            <div key={step.title} className="bg-white p-5">
              <div className="flex items-center justify-between">
                <step.icon className="h-4 w-4 text-emerald-700" />
                <span className="font-mono text-[10.5px] tabular-nums text-stone-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-[13.5px] font-semibold text-stone-900">{step.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-stone-500">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog by domain */}
      <section>
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>The catalog</SectionLabel>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-stone-900">Every track, by domain</h2>
          </div>
          <button
            onClick={() => navigate("#/courses")}
            className="hidden items-center gap-1 text-[13px] font-medium text-emerald-700 hover:underline underline-offset-2 sm:flex"
          >
            View all with filters <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-5 space-y-6">
          {byDomain.map(({ domain, list }) => (
            <div key={domain}>
              <div className="flex items-center gap-2.5">
                <span className={cn("h-2 w-2 rounded-full", domainStyle(domain).bar)} />
                <h3 className="text-[13px] font-semibold uppercase tracking-wider text-stone-700">{domain}</h3>
                <span className="font-mono text-[11px] tabular-nums text-stone-400">{list.length}</span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmaps */}
      <section className="rounded-lg border border-stone-200 bg-stone-50/60 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <SectionLabel>Roadmaps</SectionLabel>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-stone-900">Journeys, not just courses</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-stone-600">
              Four staged paths — CSE Foundation, Full-Stack Web, AI Engineer and Low-Level Systems — each sequencing the
              catalog into a deliberate order with practice checkpoints.
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-2">
            {ROADMAPS.map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(`#/roadmaps/${r.id}`)}
                className="rounded-md border border-stone-200 bg-white px-4 py-3 text-left transition-colors hover:border-emerald-700/40 hover:bg-emerald-50/30"
              >
                <p className="text-[13.5px] font-semibold text-stone-900">{r.title}</p>
                <p className="mt-0.5 font-mono text-[11px] tabular-nums text-stone-400">{r.stages.length} stages</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
