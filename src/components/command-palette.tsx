"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  BookOpen,
  ListChecks,
  Hammer,
  Map,
  Search,
  LayoutDashboard,
  FolderOpen,
  Sparkles,
  Star,
  StickyNote,
} from "lucide-react";
import { navigate } from "@/lib/router";
import { searchAll, type SearchHit } from "@/lib/catalog";
import { useProgress } from "@/lib/store";

const KIND_ICON: Record<SearchHit["kind"], React.ElementType> = {
  course: BookOpen,
  lesson: ListChecks,
  practice: Hammer,
  roadmap: Map,
  project: Hammer,
};
const KIND_HEADING: Record<SearchHit["kind"], string> = {
  course: "Courses",
  lesson: "Lessons",
  practice: "Practice platforms",
  roadmap: "Roadmaps",
  project: "Projects",
};

const NAV_ITEMS = [
  { label: "Home", href: "#/", icon: Sparkles },
  { label: "Dashboard", href: "#/dashboard", icon: LayoutDashboard },
  { label: "All Courses", href: "#/courses", icon: FolderOpen },
  { label: "Roadmaps", href: "#/roadmaps", icon: Map },
  { label: "Practice Directory", href: "#/practice", icon: Hammer },
  { label: "Projects", href: "#/projects", icon: Hammer },
  { label: "Bookmarks", href: "#/bookmarks", icon: Star },
  { label: "My Notes", href: "#/notes", icon: StickyNote },
  { label: "About CodeAtlas", href: "#/about", icon: Sparkles },
];

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [query, setQuery] = useState("");
  const markVisited = useProgress((s) => s.markVisited);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const go = (href: string, opts?: { courseId?: string; gi?: number }) => {
    if (opts?.courseId && opts?.gi) markVisited(opts.courseId, opts.gi);
    setOpen(false);
    navigate(href);
  };

  const hits = useMemo(() => searchAll(query), [query]);
  const grouped = useMemo(() => {
    const g: Partial<Record<SearchHit["kind"], SearchHit[]>> = {};
    for (const h of hits) (g[h.kind] ??= []).push(h);
    return g;
  }, [hits]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-xl" aria-describedby={undefined}>
        <DialogTitle className="sr-only">Global search</DialogTitle>
        <Command shouldFilter={false} className="[&_[cmdk-group-heading]]:text-stone-400">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search courses, lessons, practice, projects…"
            className="h-12 text-[14px]"
          />
          <CommandList className="max-h-[420px]">
            {query.trim().length < 2 ? (
              <>
                <CommandGroup heading="Go to">
                  {NAV_ITEMS.map((item) => (
                    <CommandItem key={item.href} onSelect={() => go(item.href)} className="cursor-pointer">
                      <item.icon className="mr-2.5 h-4 w-4 text-stone-400" />
                      <span className="text-[13.5px]">{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Search">
                  <p className="px-3 py-1.5 text-[12.5px] leading-relaxed text-stone-500">
                    Type at least 2 characters. Try &ldquo;kadane&rdquo;, &ldquo;paging&rdquo;, &ldquo;transformer&rdquo;, &ldquo;subnetting&rdquo;, &ldquo;compose&rdquo;, &ldquo;langgraph&rdquo;…
                  </p>
                </CommandGroup>
              </>
            ) : hits.length === 0 ? (
              <CommandEmpty>No results for &ldquo;{query}&rdquo;.</CommandEmpty>
            ) : (
              Object.entries(grouped).map(([kind, items]) => {
                const Icon = KIND_ICON[kind as SearchHit["kind"]] ?? Search;
                return (
                  <CommandGroup
                    key={kind}
                    heading={`${KIND_HEADING[kind as SearchHit["kind"]]} · ${items!.length}`}
                  >
                    {items!.map((hit, i) => (
                      <CommandItem
                        key={`${hit.href}-${i}`}
                        value={`${hit.title} ${hit.sub}`}
                        onSelect={() => go(hit.href, { courseId: hit.course?.id, gi: hit.gi })}
                        className="cursor-pointer"
                      >
                        <Icon className="mr-2.5 h-4 w-4 shrink-0 text-stone-400" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13.5px] font-medium text-stone-900">{hit.title}</p>
                          <p className="truncate text-[11.5px] text-stone-400">{hit.sub}</p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
