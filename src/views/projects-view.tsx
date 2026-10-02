"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/projects-data";
import { getMeta } from "@/lib/catalog";
import { SectionLabel, Breadcrumbs, useMounted } from "@/components/shared";
import { navigate } from "@/lib/router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DOMAINS = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.domain)))];
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

const LEVEL_STYLE: Record<string, string> = {
  Beginner: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Intermediate: "border-amber-200 bg-amber-50 text-amber-800",
  Advanced: "border-orange-200 bg-orange-50 text-orange-800",
  Expert: "border-rose-200 bg-rose-50 text-rose-800",
};

export default function ProjectsView() {
  const [domain, setDomain] = useState("All");
  const [level, setLevel] = useState("All");
  useMounted();

  const filtered = useMemo(
    () =>
      PROJECTS.filter(
        (p) => (domain === "All" || p.domain === domain) && (level === "All" || p.level === level)
      ),
    [domain, level]
  );

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Projects" }]} />
      <SectionLabel>Practice & Build</SectionLabel>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">Project Library</h1>
      <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-stone-600">
        {PROJECTS.length} real briefs in the spirit of roadmap.sh tiered specs — each one names the skills it exercises
        and the courses that prepare you for it. A portfolio is just projects with the story told well.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <Select value={domain} onValueChange={setDomain}>
          <SelectTrigger className="h-9 w-[190px] border-stone-200 bg-stone-50 text-[13px]" aria-label="Filter by domain">
            <SelectValue placeholder="Domain" />
          </SelectTrigger>
          <SelectContent>
            {DOMAINS.map((d) => (
              <SelectItem key={d} value={d}>
                {d === "All" ? "All domains" : d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="h-9 w-[170px] border-stone-200 bg-stone-50 text-[13px]" aria-label="Filter by level">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {LEVELS.map((l) => (
              <SelectItem key={l} value={l}>
                {l === "All" ? "All levels" : l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="ml-auto font-mono text-[11.5px] tabular-nums text-stone-400">{filtered.length} briefs</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <article key={p.id} className="flex flex-col rounded-lg border border-stone-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded border px-1.5 py-0.5 text-[10.5px] font-semibold ${LEVEL_STYLE[p.level]}`}>
                {p.level}
              </span>
              <span className="rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10.5px] text-stone-600">
                {p.domain}
              </span>
              {p.source && <span className="ml-auto text-[10.5px] text-stone-400">after {p.source}</span>}
            </div>
            <h2 className="mt-3 text-[15px] font-semibold text-stone-900">{p.title}</h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-stone-600">{p.brief}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.skills.map((s) => (
                <span key={s} className="rounded-full border border-stone-200 px-2 py-0.5 text-[10.5px] text-stone-500">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-stone-400">Prep with</span>
              {p.relatedCourses.map((id) => (
                <button
                  key={id}
                  onClick={() => navigate(`#/courses/${id}`)}
                  className="rounded border border-stone-200 px-1.5 py-0.5 text-[11px] font-medium text-emerald-800 hover:border-emerald-700/40 hover:bg-emerald-50"
                >
                  {getMeta(id)?.shortTitle ?? id}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 rounded-lg border border-stone-200 bg-stone-50/60 px-5 py-4 text-[12.5px] leading-relaxed text-stone-600">
        <span className="font-semibold text-stone-800">Where do ideas come from?</span> Beyond these briefs,{" "}
        <a href="https://roadmap.sh/projects" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-medium text-emerald-700 hover:underline underline-offset-2">
          roadmap.sh projects <ExternalLink className="h-3 w-3" />
        </a>
        ,{" "}
        <a href="https://www.frontendmentor.io/challenges" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-medium text-emerald-700 hover:underline underline-offset-2">
          Frontend Mentor <ExternalLink className="h-3 w-3" />
        </a>{" "}
        and The Odin Project provide endless real-world specs. Build, publish on GitHub, repeat.
      </p>
    </div>
  );
}
