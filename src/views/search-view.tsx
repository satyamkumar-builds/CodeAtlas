"use client";

import { BookOpen, ListChecks, Hammer, Map } from "lucide-react";
import { searchAll, type SearchHit } from "@/lib/catalog";
import { SectionLabel, Breadcrumbs, EmptyState } from "@/components/shared";
import { navigate, useRoute } from "@/lib/router";
import { useProgress } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const KIND_META: Record<SearchHit["kind"], { label: string; icon: React.ElementType; color: string }> = {
  course: { label: "Course", icon: BookOpen, color: "text-emerald-700" },
  lesson: { label: "Lesson", icon: ListChecks, color: "text-teal-700" },
  practice: { label: "Practice", icon: Hammer, color: "text-amber-700" },
  roadmap: { label: "Roadmap", icon: Map, color: "text-rose-700" },
  project: { label: "Project", icon: Hammer, color: "text-violet-700" },
};

export default function SearchView() {
  const route = useRoute();
  const q = route.query.get("q") ?? "";
  const markVisited = useProgress((s) => s.markVisited);
  const hits = searchAll(q, 60);

  const go = (hit: SearchHit) => {
    if (hit.course && hit.gi) markVisited(hit.course.id, hit.gi);
    navigate(hit.href);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Search" }]} />
      <SectionLabel>Global search</SectionLabel>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
        {q ? <>Results for &ldquo;{q}&rdquo;</> : "Search"}
      </h1>

      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          const input = (e.currentTarget.elements.namedItem("q") as HTMLInputElement) ?? null;
          if (input) navigate(`#/search?q=${encodeURIComponent(input.value)}`);
        }}
      >
        <Input
          name="q"
          defaultValue={q}
          placeholder="Search courses, topics, videos, practice, projects…"
          className="h-11 border-stone-200 bg-stone-50 text-[14px]"
          autoFocus
          aria-label="Search query"
        />
      </form>

      {q.trim().length >= 2 ? (
        hits.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="Nothing found"
              body="Try broader terms — a topic (arrays, paging, transformer), a course name, or a platform (LeetCode)."
            />
          </div>
        ) : (
          <>
            <p className="mt-4 font-mono text-[11.5px] tabular-nums text-stone-400">{hits.length} results</p>
            <div className="mt-4 divide-y divide-stone-100 overflow-hidden rounded-lg border border-stone-200">
              {hits.map((hit, i) => {
                const meta = KIND_META[hit.kind];
                return (
                  <button
                    key={i}
                    onClick={() => go(hit)}
                    className="flex w-full items-center gap-4 bg-white px-4 py-3.5 text-left transition-colors hover:bg-stone-50"
                  >
                    <meta.icon className={cn("h-4 w-4 shrink-0", meta.color)} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-stone-900">{hit.title}</span>
                      <span className="block truncate text-[11.5px] text-stone-500">{hit.sub}</span>
                    </span>
                    <span className="shrink-0 rounded border border-stone-200 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-400">
                      {meta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )
      ) : (
        <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-stone-500">
          Type a query above — courses, individual lessons, practice platforms, project briefs and roadmaps are all
          indexed. Or press <kbd className="rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 font-mono text-[10.5px]">⌘K</kbd>{" "}
          anywhere for the quick palette.
        </p>
      )}
    </div>
  );
}
