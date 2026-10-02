"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ChevronRight, ExternalLink, Hammer, ListChecks, NotebookPen, PlayCircle, Wrench } from "lucide-react";
import { getCourse, getMeta } from "@/lib/catalog";
import { PRACTICE_CATEGORIES } from "@/data/practice-data";
import { SectionLabel, ProgressBar, Breadcrumbs, LessonRow, useMounted, LevelChip } from "@/components/shared";
import { useProgress, courseProgress } from "@/lib/store";
import { navigate } from "@/lib/router";
import { domainStyle } from "@/data/course-meta";
import { cn } from "@/lib/utils";

export default function CourseDetailView() {
  return <Inner />;
}

function Inner() {
  const route = useCourseId();
  const course = getCourse(route);
  const meta = course ? getMeta(course.id) : undefined;
  const mounted = useMounted();
  const progress = useProgress();

  if (!course || !meta) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
        <p className="text-[14px] font-semibold text-stone-800">Course not found</p>
        <button onClick={() => navigate("#/courses")} className="mt-3 text-[13px] font-medium text-emerald-700 hover:underline">
          Back to all courses
        </button>
      </div>
    );
  }

  const p = courseProgress(progress, course.id, course.lessonCount);
  // next lesson to watch = first incomplete, else first
  const nextLesson = course.lessons.find((l) => !(l.gi in (mounted ? progress.completed[course.id] ?? {} : {}))) ?? course.lessons[0];
  const ds = domainStyle(course.domain);

  const relatedCategories = PRACTICE_CATEGORIES.filter((cat) =>
    cat.platforms.some((pl) => pl.relatedCourses.includes(course.id))
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Courses", href: "#/courses" },
          { label: course.domain, href: `#/courses?domain=${encodeURIComponent(course.domain)}` },
          { label: meta.shortTitle },
        ]}
      />

      {/* Header */}
      <header className="mt-4 border-b border-stone-200 pb-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[10.5px] font-semibold", ds.chip)}>
            {course.domain}
          </span>
          <LevelChip level={course.level} />
          <span className="font-mono text-[11px] tabular-nums text-stone-400">
            Track {String(course.num).padStart(2, "0")}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-[28px]">{course.title}</h1>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-stone-600">{meta.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-stone-500">
          <span className="font-mono tabular-nums">{course.lessonCount} lessons</span>
          <span className="text-stone-300">·</span>
          <span className="font-mono tabular-nums">{course.moduleCount} modules</span>
          <span className="text-stone-300">·</span>
          <span>{course.playlistUrl ? "Full playlist available" : "Source: YouTube"}</span>
          {course.playlistUrl && (
            <a
              href={course.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-emerald-700 hover:underline underline-offset-2"
            >
              Open original playlist <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </header>

      {/* Learn / Prereq / Progress */}
      <section className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-stone-200 p-5">
            <SectionLabel>What you&rsquo;ll learn</SectionLabel>
            <ul className="mt-3 space-y-2">
              {meta.learn.map((l) => (
                <li key={l} className="flex gap-2 text-[12.5px] leading-relaxed text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-stone-200 p-5">
            <SectionLabel>Prerequisites</SectionLabel>
            <ul className="mt-3 space-y-2">
              {meta.prereqs.map((l) => (
                <li key={l} className="flex gap-2 text-[12.5px] leading-relaxed text-stone-700">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-stone-100 pt-3">
              {course.tags.map((t) => (
                <span key={t} className="rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10.5px] text-stone-500">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress card */}
        <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-5">
          <SectionLabel>Your progress</SectionLabel>
          <div className="mt-3 flex items-end justify-between">
            <p className="font-mono text-3xl font-bold tabular-nums text-stone-900">{p.pct}%</p>
            <p className="font-mono text-[12px] tabular-nums text-stone-500">
              {p.done} / {p.total} lessons
            </p>
          </div>
          <ProgressBar pct={p.pct} className="mt-3" />
          {p.pct === 100 ? (
            <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Course completed — outstanding.
            </p>
          ) : (
            <button
              onClick={() => navigate(`#/courses/${course.id}/${nextLesson.gi}`)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-emerald-800"
            >
              <PlayCircle className="h-4 w-4" />
              {p.done > 0 ? "Continue" : "Start"} · Lesson {nextLesson.gi}
            </button>
          )}
        </div>
      </section>

      {/* Tabs */}
      <Tabs defaultValue="curriculum" className="mt-9">
        <TabsList className="h-9 justify-start gap-1 rounded-none border-b border-stone-200 bg-transparent p-0">
          {[
            { v: "curriculum", label: "Curriculum", icon: ListChecks },
            { v: "notes", label: "Atlas Notes", icon: NotebookPen },
            { v: "practice", label: "Practice", icon: Hammer },
            { v: "projects", label: "Projects", icon: Wrench },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              className="rounded-none border-b-2 border-transparent px-3.5 pb-2.5 pt-1.5 text-[13px] font-medium text-stone-500 data-[state=active]:border-emerald-700 data-[state=active]:bg-transparent data-[state=active]:text-stone-900"
            >
              <t.icon className="mr-1.5 h-3.5 w-3.5" />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Curriculum */}
        <TabsContent value="curriculum" className="mt-5">
          <Accordion type="multiple" defaultValue={["m1"]} className="w-full">
            {course.modules.map((m, mi) => {
              const doneInModule = m.lessons.filter((l) => l.gi in (mounted ? progress.completed[course.id] ?? {} : {})).length;
              return (
                <AccordionItem key={m.id} value={m.id} className="border-stone-200">
                  <AccordionTrigger className="px-4 py-3.5 hover:bg-stone-50 hover:no-underline">
                    <span className="flex flex-1 items-center gap-3 text-left">
                      <span className="font-mono text-[10.5px] tabular-nums text-stone-400">
                        Module {String(mi + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] font-semibold text-stone-900">{m.title}</span>
                    </span>
                    <span className="mr-3 flex shrink-0 items-center gap-2 font-mono text-[11px] tabular-nums text-stone-400">
                      {doneInModule === m.lessonCount && doneInModule > 0 && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                      {doneInModule}/{m.lessonCount}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    <div className="border-t border-stone-100">
                      {m.lessons.map((l) => (
                        <LessonRow key={l.gi} course={course} lesson={l} indexLabel={String(l.gi).padStart(2, "0")} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </TabsContent>

        {/* Atlas Notes */}
        <TabsContent value="notes" className="mt-5">
          <div className="rounded-lg border border-emerald-700/20 bg-emerald-50/30 p-5 sm:p-6">
            <SectionLabel className="text-emerald-800/70">Atlas Notes — curated study companion</SectionLabel>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-stone-600">
              Written for this course by the CodeAtlas curation. Read before each module, revisit after — these are the
              concepts, traps and connections that matter most.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {meta.notes.map((section) => (
              <div key={section.heading} className="rounded-lg border border-stone-200 p-5">
                <h3 className="text-[14px] font-semibold text-stone-900">{section.heading}</h3>
                <ul className="mt-3 space-y-2.5">
                  {section.points.map((pt, i) => (
                    <li key={i} className="flex gap-2.5 text-[12.5px] leading-relaxed text-stone-700">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-emerald-600" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {meta.resourceLinks && meta.resourceLinks.length > 0 && (
            <div className="mt-5 rounded-lg border border-stone-200 p-5">
              <SectionLabel>Official resources</SectionLabel>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {meta.resourceLinks.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-white px-3 py-2 text-[12.5px] font-medium text-stone-700 hover:border-emerald-700/40 hover:text-emerald-800"
                  >
                    {r.label} <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Practice */}
        <TabsContent value="practice" className="mt-5">
          <p className="max-w-3xl text-[13px] leading-relaxed text-stone-600">
            The loop: <span className="font-medium text-stone-900">learn a concept → practice it externally → return and
            mark the lesson complete.</span> These platforms are matched to this course.
          </p>
          <div className="mt-4 space-y-2.5">
            {meta.practice.map((pl) => (
              <a
                key={pl.url}
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-lg border border-stone-200 bg-white px-4 py-3.5 transition-colors hover:border-emerald-700/40"
              >
                <Hammer className="h-4 w-4 shrink-0 text-emerald-700" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-semibold text-stone-900">{pl.label}</span>
                  <span className="mt-0.5 block text-[12px] text-stone-500">{pl.note}</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-stone-300 group-hover:text-emerald-700" />
              </a>
            ))}
          </div>
          {relatedCategories.length > 0 && (
            <div className="mt-6">
              <SectionLabel>More practice domains</SectionLabel>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`#/practice/${cat.id}`)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-white px-3 py-2 text-[12.5px] font-medium text-stone-700 hover:border-emerald-700/40 hover:text-emerald-800"
                  >
                    {cat.title} <ChevronRight className="h-3 w-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Projects */}
        <TabsContent value="projects" className="mt-5">
          <p className="max-w-3xl text-[13px] leading-relaxed text-stone-600">
            What you can build with this course. Start small, ship, then level up — every brief lists the skills it
            exercises.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {meta.projects.map((pr) => (
              <div key={pr.title} className="flex flex-col rounded-lg border border-stone-200 p-5">
                <span className="inline-flex w-fit items-center rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10.5px] font-medium text-stone-600">
                  {pr.level}
                </span>
                <h3 className="mt-2.5 text-[14px] font-semibold text-stone-900">{pr.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-stone-600">{pr.brief}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("#/projects")}
            className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-emerald-700 hover:underline underline-offset-2"
          >
            Browse the full project library <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useRoute } from "@/lib/router";
function useCourseId(): string {
  const route = useRoute();
  return route.segments[1] ?? "";
}
