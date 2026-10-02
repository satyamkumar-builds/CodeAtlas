"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  ListChecks,
  NotebookPen,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { getCourse, getMeta, youtubeEmbed, youtubeWatch } from "@/lib/catalog";
import { Breadcrumbs, SectionLabel, useMounted, LessonRow } from "@/components/shared";
import { useProgress } from "@/lib/store";
import { navigate, useRoute } from "@/lib/router";
import { cn } from "@/lib/utils";

// Notes editor — keyed by lesson, so state resets naturally on lesson switch.
function NotesEditor({ noteKey, initial, onSave }: { noteKey: string; initial: string; onSave: (text: string) => void }) {
  const [text, setText] = useState(initial);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = (value: string) => {
    setText(value);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onSave(value);
      setSaved(true);
    }, 600);
  };

  return (
    <section className="mt-7 rounded-lg border border-stone-200 p-5">
      <div className="flex items-center justify-between">
        <SectionLabel>
          <span className="inline-flex items-center gap-1.5">
            <NotebookPen className="h-3.5 w-3.5" /> My notes for this lesson
          </span>
        </SectionLabel>
        <span
          className={cn(
            "text-[11px] font-medium transition-opacity",
            saved ? "text-emerald-700 opacity-100" : "text-stone-400 opacity-70"
          )}
          aria-live="polite"
        >
          {saved ? "Saved" : text ? "Autosaves as you type" : "No notes yet"}
        </span>
      </div>
      <Textarea
        key={noteKey}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Key ideas, timestamps, questions, things to revisit…"
        className="mt-3 min-h-[140px] resize-y border-stone-200 bg-stone-50/60 text-[13px] leading-relaxed focus-visible:ring-emerald-600"
        aria-label="Lesson notes"
      />
    </section>
  );
}

export default function LessonView() {
  const route = useRoute();
  const courseId = route.segments[1] ?? "";
  const gi = Number(route.segments[2] ?? 1);
  const course = getCourse(courseId);
  const meta = course ? getMeta(course.id) : undefined;
  const lesson = course?.lessons.find((l) => l.gi === gi);

  const mounted = useMounted();
  const progress = useProgress();

  const noteKey = `${courseId}:${gi}`;
  const storedNote = mounted ? progress.notes[noteKey]?.text ?? "" : "";

  // record visit for "continue learning" (external store update)
  useEffect(() => {
    if (course && lesson) progress.markVisited(course.id, lesson.gi);
     
  }, [courseId, gi]);

  if (!course || !lesson || !meta) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
        <p className="text-[14px] font-semibold text-stone-800">Lesson not found</p>
        <button onClick={() => navigate("#/courses")} className="mt-3 text-[13px] font-medium text-emerald-700 hover:underline">
          Back to all courses
        </button>
      </div>
    );
  }

  const isDone = mounted && lesson.gi in (progress.completed[course.id] ?? {});
  const isSaved = mounted && lesson.gi in (progress.bookmarks[course.id] ?? {});
  const currentModule = course.modules.find((m) => m.id === lesson.modId);
  const moduleIndex = course.modules.findIndex((m) => m.id === lesson.modId);
  const prev = course.lessons.find((l) => l.gi === gi - 1);
  const next = course.lessons.find((l) => l.gi === gi + 1);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Courses", href: "#/courses" },
          { label: meta.shortTitle, href: `#/courses/${course.id}` },
          { label: `Module ${moduleIndex + 1} — ${currentModule?.title ?? ""}`, href: `#/courses/${course.id}` },
          { label: `Lesson ${lesson.gi}` },
        ]}
      />

      <div className="mt-4 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div>
          {/* Player */}
          <div className="overflow-hidden rounded-lg border border-stone-200 bg-black">
            <iframe
              key={lesson.videoId}
              src={youtubeEmbed(lesson.videoId)}
              title={lesson.title}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Title + actions */}
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[11px] tabular-nums text-stone-400">
                LESSON {String(lesson.gi).padStart(2, "0")} / {course.lessonCount} · MODULE {moduleIndex + 1} —{" "}
                {(currentModule?.title ?? "").toUpperCase()}
              </p>
              <h1 className="mt-1.5 text-xl font-bold leading-snug tracking-tight text-stone-900">{lesson.title}</h1>
              <p className="mt-1 text-[12.5px] text-stone-500">{course.title}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                onClick={() => progress.toggleComplete(course.id, lesson.gi)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[12.5px] font-semibold transition-colors",
                  isDone
                    ? "border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800"
                    : "border-stone-300 bg-white text-stone-700 hover:border-emerald-700 hover:text-emerald-800"
                )}
                aria-pressed={isDone}
              >
                <CheckCircle2 className={cn("h-4 w-4", isDone && "text-emerald-200")} />
                {isDone ? "Completed" : "Mark complete"}
              </button>
              <button
                onClick={() => progress.toggleBookmark(course.id, lesson.gi)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[12.5px] font-medium transition-colors",
                  isSaved
                    ? "border-amber-400 bg-amber-50 text-amber-700"
                    : "border-stone-300 bg-white text-stone-600 hover:border-stone-400"
                )}
                aria-pressed={isSaved}
                aria-label="Bookmark this lesson"
              >
                <Bookmark className={cn("h-4 w-4", isSaved && "fill-amber-400 text-amber-500")} />
                {isSaved ? "Saved" : "Bookmark"}
              </button>
            </div>
          </div>

          {/* Watch options */}
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a
              href={youtubeWatch(lesson.videoId)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 transition-colors hover:border-emerald-700/40"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-emerald-700" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold text-stone-900">Open on YouTube</span>
                <span className="block text-[11.5px] text-stone-500">Watch, like and comment on the original video</span>
              </span>
            </a>
            <a
              href={course.playlistUrl || youtubeWatch(lesson.videoId)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 transition-colors hover:border-emerald-700/40"
            >
              <ListChecks className="h-4 w-4 shrink-0 text-emerald-700" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold text-stone-900">Open full playlist</span>
                <span className="block text-[11.5px] text-stone-500">Browse the creator&rsquo;s complete course</span>
              </span>
            </a>
          </div>

          {/* Notes */}
          <NotesEditor
            key={noteKey}
            noteKey={noteKey}
            initial={storedNote}
            onSave={(text) => progress.setNote(courseId, gi, text)}
          />

          {/* Prev / Next */}
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {prev ? (
              <button
                onClick={() => navigate(`#/courses/${course.id}/${prev.gi}`)}
                className="group flex items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 text-left hover:border-emerald-700/40"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-emerald-700" />
                <span className="min-w-0">
                  <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-stone-400">Previous</span>
                  <span className="block truncate text-[13px] font-medium text-stone-800">{prev.title}</span>
                </span>
              </button>
            ) : (
              <span />
            )}
            {next && (
              <button
                onClick={() => navigate(`#/courses/${course.id}/${next.gi}`)}
                className="group flex items-center justify-end gap-3 rounded-lg border border-stone-200 px-4 py-3 text-right hover:border-emerald-700/40"
              >
                <span className="min-w-0">
                  <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-stone-400">Next lesson</span>
                  <span className="block truncate text-[13px] font-medium text-stone-800">{next.title}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-emerald-700" />
              </button>
            )}
          </div>
        </div>

        {/* Right rail */}
        <aside className="space-y-5">
          {currentModule && (
            <div className="overflow-hidden rounded-lg border border-stone-200">
              <div className="border-b border-stone-100 bg-stone-50/80 px-4 py-3">
                <SectionLabel>Module {moduleIndex + 1}</SectionLabel>
                <p className="mt-1 text-[13px] font-semibold text-stone-900">{currentModule.title}</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {currentModule.lessons.map((l) => (
                  <LessonRow key={l.gi} course={course} lesson={l} onBookmark={false} />
                ))}
              </div>
              <button
                onClick={() => navigate(`#/courses/${course.id}`)}
                className="w-full border-t border-stone-100 px-4 py-2.5 text-left text-[12px] font-medium text-emerald-700 hover:bg-stone-50"
              >
                View full curriculum →
              </button>
            </div>
          )}

          <Accordion type="single" collapsible className="rounded-lg border border-stone-200 px-4">
            <AccordionItem value="notes" className="border-0">
              <AccordionTrigger className="py-3.5 text-[13px] font-semibold text-stone-900 hover:no-underline">
                <span className="inline-flex items-center gap-2">
                  <NotebookPen className="h-3.5 w-3.5 text-emerald-700" /> Atlas Notes — {meta.shortTitle}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4">
                  {meta.notes.map((s) => (
                    <div key={s.heading}>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">{s.heading}</p>
                      <ul className="mt-1.5 space-y-1.5">
                        {s.points.slice(0, 4).map((pt, i) => (
                          <li key={i} className="flex gap-2 text-[11.5px] leading-relaxed text-stone-600">
                            <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-emerald-600" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button
                    onClick={() => navigate(`#/courses/${course.id}`)}
                    className="text-[12px] font-medium text-emerald-700 hover:underline underline-offset-2"
                  >
                    Read all notes on the course page →
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
      </div>
    </div>
  );
}
