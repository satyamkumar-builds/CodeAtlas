"use client";

import { CheckCircle2, ChevronRight, Hammer } from "lucide-react";
import { ROADMAPS } from "@/data/roadmaps-data";
import { getCourse, getMeta } from "@/lib/catalog";
import { SectionLabel, Breadcrumbs, ProgressBar, useMounted } from "@/components/shared";
import { useProgress, courseProgress } from "@/lib/store";
import { navigate, useRoute } from "@/lib/router";
import { cn } from "@/lib/utils";

export default function RoadmapsView() {
  const route = useRoute();
  const activeId = route.segments[1];
  const roadmap = ROADMAPS.find((r) => r.id === activeId);

  if (roadmap) return <RoadmapDetail id={roadmap.id} />;

  return (
    <div>
      <SectionLabel>Learn</SectionLabel>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">Roadmaps</h1>
      <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-stone-600">
        A roadmap is an order of attack. Each stage below sequences CodeAtlas courses with a practice checkpoint —
        follow one end-to-end or cherry-pick the gaps.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {ROADMAPS.map((r) => (
          <button
            key={r.id}
            onClick={() => navigate(`#/roadmaps/${r.id}`)}
            className="group flex flex-col rounded-lg border border-stone-200 bg-white p-5 text-left transition-colors hover:border-emerald-700/40 hover:bg-emerald-50/20"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[15.5px] font-semibold text-stone-900 group-hover:text-emerald-900">{r.title}</h2>
              <ChevronRight className="h-4 w-4 text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-700" />
            </div>
            <p className="mt-1 text-[12.5px] text-stone-500">{r.subtitle}</p>
            <p className="mt-2 text-[12px] leading-relaxed text-stone-600">{r.audience}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.stages.map((s, i) => (
                <span key={s.title} className="rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10.5px] font-medium text-stone-600">
                  {i + 1}. {s.title}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function RoadmapDetail({ id }: { id: string }) {
  const roadmap = ROADMAPS.find((r) => r.id === id)!;
  const mounted = useMounted();
  const progress = useProgress();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Roadmaps", href: "#/roadmaps" }, { label: roadmap.title }]} />
      <header className="mt-4 border-b border-stone-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">{roadmap.title}</h1>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-stone-600">{roadmap.subtitle}</p>
        <p className="mt-2 text-[12.5px] text-stone-500">
          <span className="font-semibold text-stone-700">Who is this for?</span> {roadmap.audience}
        </p>
      </header>

      {/* Stage timeline */}
      <ol className="relative mt-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-24px)] before:w-px before:bg-stone-200">
        {roadmap.stages.map((stage, si) => {
          const stageCourses = stage.courseIds.map((cid) => getCourse(cid)).filter(Boolean);
          const stageDone = stageCourses.reduce(
            (a, c) => a + (mounted ? Object.keys(progress.completed[c!.id] ?? {}).length : 0),
            0
          );
          const stageTotal = stageCourses.reduce((a, c) => a + c!.lessonCount, 0);
          const stagePct = stageTotal ? Math.round((stageDone / stageTotal) * 100) : 0;
          const started = stageDone > 0;

          return (
            <li key={stage.title} className="relative pl-9">
              <span
                className={cn(
                  "absolute left-0 top-0.5 flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold tabular-nums",
                  stagePct === 100
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : started
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-stone-300 bg-white text-stone-500"
                )}
              >
                {stagePct === 100 ? <CheckCircle2 className="h-3.5 w-3.5" /> : si + 1}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-[16px] font-bold tracking-tight text-stone-900">{stage.title}</h2>
                {stageTotal > 0 && (
                  <span className="font-mono text-[11px] tabular-nums text-stone-400">
                    {stageDone}/{stageTotal} lessons · {stagePct}%
                  </span>
                )}
              </div>
              <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-stone-600">{stage.description}</p>

              <div className="mt-3 space-y-1.5">
                {stageCourses.map((c) => {
                  const p = courseProgress(progress, c!.id, c!.lessonCount);
                  return (
                    <button
                      key={c!.id}
                      onClick={() => navigate(`#/courses/${c!.id}`)}
                      className="group flex w-full max-w-2xl items-center gap-3 rounded-md border border-stone-200 bg-white px-3.5 py-2.5 text-left transition-colors hover:border-emerald-700/40"
                    >
                      <span className="w-7 shrink-0 font-mono text-[10.5px] tabular-nums text-stone-400">
                        {String(c!.num).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-stone-900">
                          {getMeta(c!.id)?.shortTitle ?? c!.title}
                          <span className="ml-2 font-normal text-stone-400">{c!.title}</span>
                        </span>
                        <ProgressBar pct={p.pct} className="mt-1.5 max-w-[240px]" />
                      </span>
                      <span className="shrink-0 font-mono text-[11px] tabular-nums text-stone-500">
                        {p.done}/{c!.lessonCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {stage.practiceHint && (
                <p className="mt-2.5 inline-flex max-w-2xl items-start gap-1.5 rounded-md border border-emerald-700/20 bg-emerald-50/50 px-3 py-2 text-[12px] leading-relaxed text-emerald-900">
                  <Hammer className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>
                    <span className="font-semibold">Practice checkpoint:</span> {stage.practiceHint}
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
