"use client";

import { useMemo, useState } from "react";
import { StickyNote, Pencil, Search } from "lucide-react";
import { getCourse } from "@/lib/catalog";
import { SectionLabel, Breadcrumbs, useMounted, EmptyState } from "@/components/shared";
import { useProgress } from "@/lib/store";
import { navigate } from "@/lib/router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function NotesView() {
  const mounted = useMounted();
  const progress = useProgress();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<{ key: string; courseId: string; gi: number } | null>(null);
  const [draft, setDraft] = useState("");

  const entries = useMemo(() => {
    if (!mounted) return [];
    const needle = q.trim().toLowerCase();
    return Object.entries(progress.notes)
      .map(([key, note]) => {
        const [courseId, gi] = key.split(":");
        const course = getCourse(courseId);
        const lesson = course?.lessons.find((l) => l.gi === Number(gi));
        return { key, courseId, gi: Number(gi), course, lesson, note };
      })
      .filter((e) => e.course && e.lesson)
      .filter((e) => {
        if (!needle) return true;
        return (
          e.note.text.toLowerCase().includes(needle) ||
          e.lesson!.title.toLowerCase().includes(needle) ||
          e.course!.title.toLowerCase().includes(needle)
        );
      })
      .sort((a, b) => b.note.updated - a.note.updated);
  }, [mounted, progress.notes, q]);

  const openEdit = (e: { key: string; courseId: string; gi: number; note: { text: string } }) => {
    setEditing({ key: e.key, courseId: e.courseId, gi: e.gi });
    setDraft(e.note.text);
  };

  const saveEdit = () => {
    if (editing) {
      progress.setNote(editing.courseId, editing.gi, draft);
      setEditing(null);
    }
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Notes" }]} />
      <SectionLabel>My CodeAtlas</SectionLabel>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">My Notes</h1>
          <p className="mt-2 text-[13.5px] text-stone-600">
            {entries.length} note{entries.length === 1 ? "" : "s"} — written on lesson pages, collected here. Notes turn
            watching into learning.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes…"
            className="h-9 border-stone-200 bg-stone-50 pl-9 text-[13px]"
            aria-label="Search notes"
          />
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={q ? "No notes match your search" : "No notes yet"}
            body="Every lesson page has a notes panel that autosaves as you type. Capture the idea while it's fresh."
            action={{ label: "Open your courses", href: "#/courses" }}
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {entries.map((e) => (
            <article key={e.key} className="flex flex-col rounded-lg border border-stone-200 bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <button
                  onClick={() => navigate(`#/courses/${e.courseId}/${e.gi}`)}
                  className="min-w-0 text-left"
                >
                  <p className="truncate text-[13.5px] font-semibold text-stone-900 hover:text-emerald-800">
                    {e.lesson!.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] text-stone-500">
                    {e.course!.title} · Lesson {e.gi}
                  </p>
                </button>
                <button
                  onClick={() => openEdit(e)}
                  aria-label="Edit note"
                  className="rounded p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-2.5 whitespace-pre-wrap text-[12.5px] leading-relaxed text-stone-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] [overflow:hidden]">
                {e.note.text}
              </p>
              <p className="mt-auto pt-3 text-[10.5px] text-stone-400">
                Updated {new Date(e.note.updated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[15px]">
              <StickyNote className="h-4 w-4 text-emerald-700" /> Edit note
            </DialogTitle>
          </DialogHeader>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="min-h-[180px] border-stone-200 text-[13px] leading-relaxed"
            aria-label="Note content"
          />
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800" onClick={saveEdit}>
              Save note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
