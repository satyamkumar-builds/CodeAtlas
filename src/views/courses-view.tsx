"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { courses, DOMAINS } from "@/lib/catalog";
import { CourseCard, SectionLabel, useMounted } from "@/components/shared";
import { useProgress } from "@/lib/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Status = "all" | "in-progress" | "not-started" | "completed";

export default function CoursesView() {
  const mounted = useMounted();
  const progress = useProgress();
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [status, setStatus] = useState<Status>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return courses.filter((c) => {
      if (domain !== "all" && c.domain !== domain) return false;
      if (level !== "all" && c.level !== level) return false;
      if (needle) {
        const hay = [c.title, c.id, c.domain, c.tags.join(" ")].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      if (mounted && status !== "all") {
        const done = Object.keys(progress.completed[c.id] ?? {}).length;
        if (status === "in-progress" && !(done > 0 && done < c.lessonCount)) return false;
        if (status === "completed" && done < c.lessonCount) return false;
        if (status === "not-started" && done > 0) return false;
      }
      return true;
    });
  }, [q, domain, level, status, mounted, progress.completed]);

  return (
    <div>
      <SectionLabel>Catalog</SectionLabel>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">All Courses</h1>
      <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-stone-600">
        {courses.length} curated tracks across {DOMAINS.length} domains. Every course is a full playlist restructured
        into modules with curated Atlas Notes, mapped practice and project briefs.
      </p>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter courses…"
            className="h-9 border-stone-200 bg-stone-50 pl-9 text-[13px] focus-visible:ring-emerald-600"
            aria-label="Filter courses"
          />
        </div>
        <Select value={domain} onValueChange={setDomain}>
          <SelectTrigger className="h-9 w-[180px] border-stone-200 bg-stone-50 text-[13px]" aria-label="Filter by domain">
            <SelectValue placeholder="Domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All domains</SelectItem>
            {DOMAINS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="h-9 w-[150px] border-stone-200 bg-stone-50 text-[13px]" aria-label="Filter by level">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
          <SelectTrigger className="h-9 w-[150px] border-stone-200 bg-stone-50 text-[13px]" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="not-started">Not started</SelectItem>
            <SelectItem value="in-progress">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <p className="ml-auto font-mono text-[11.5px] tabular-nums text-stone-400">
          {filtered.length} / {courses.length}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center text-[13.5px] text-stone-500">
          No courses match these filters.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
