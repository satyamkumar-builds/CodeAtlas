"use client";

import { useEffect, useState } from "react";
import { Menu, Search, Compass, BookOpen, Map, Hammer, LayoutDashboard, Star, StickyNote, Info, Sparkles, FolderOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/command-palette";
import { useRoute } from "@/lib/router";
import { useProgress, streakInfo } from "@/lib/store";
import { useMounted } from "@/components/shared";
import { cn } from "@/lib/utils";

import HomeView from "@/views/home-view";
import DashboardView from "@/views/dashboard-view";
import CoursesView from "@/views/courses-view";
import CourseDetailView from "@/views/course-detail-view";
import LessonView from "@/views/lesson-view";
import PracticeView from "@/views/practice-view";
import ProjectsView from "@/views/projects-view";
import RoadmapsView from "@/views/roadmaps-view";
import BookmarksView from "@/views/bookmarks-view";
import NotesView from "@/views/notes-view";
import AboutView from "@/views/about-view";
import SearchView from "@/views/search-view";

const NAV = [
  {
    label: "Learn",
    items: [
      { label: "Home", href: "#/", icon: Sparkles, match: [] },
      { label: "Dashboard", href: "#/dashboard", icon: LayoutDashboard, match: ["dashboard"] },
      { label: "Courses", href: "#/courses", icon: FolderOpen, match: ["courses"] },
      { label: "Roadmaps", href: "#/roadmaps", icon: Map, match: ["roadmaps"] },
    ],
  },
  {
    label: "Practice & Build",
    items: [
      { label: "Practice", href: "#/practice", icon: Hammer, match: ["practice"] },
      { label: "Projects", href: "#/projects", icon: BookOpen, match: ["projects"] },
    ],
  },
  {
    label: "My CodeAtlas",
    items: [
      { label: "Bookmarks", href: "#/bookmarks", icon: Star, match: ["bookmarks"] },
      { label: "Notes", href: "#/notes", icon: StickyNote, match: ["notes"] },
      { label: "About", href: "#/about", icon: Info, match: ["about"] },
    ],
  },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const route = useRoute();
  const mounted = useMounted();
  const progress = useProgress();
  const streak = streakInfo(mounted ? progress.activity : {});

  const isActive = (href: string, match: string[]) => {
    if (href === "#/") return route.segments.length === 0;
    return match.some((m) => route.segments[0] === m);
  };

  return (
    <nav className="flex h-full flex-col gap-6 px-4 py-6" aria-label="Main navigation">
      <a href="#/" onClick={onNavigate} className="flex items-center gap-2.5 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white">
          <Compass className="h-4.5 w-4.5" />
        </span>
        <span>
          <span className="block text-[15px] font-bold leading-none tracking-tight text-white">CodeAtlas</span>
          <span className="mt-1 block text-[10.5px] leading-none text-stone-400">by Satyam Kumar</span>
        </span>
      </a>

      {NAV.map((group) => (
        <div key={group.label}>
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(item.href, item.match);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2 py-[7px] text-[13.5px] transition-colors",
                      active
                        ? "bg-emerald-600/15 font-medium text-emerald-300"
                        : "text-stone-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", active ? "text-emerald-400" : "text-stone-500")} />
                    {item.label}
                    {item.label === "Bookmarks" && mounted && (
                      <span className="ml-auto font-mono text-[10.5px] tabular-nums text-stone-500">
                        {Object.values(progress.bookmarks).reduce((a, m) => a + Object.keys(m).length, 0)}
                      </span>
                    )}
                    {item.label === "Notes" && mounted && (
                      <span className="ml-auto font-mono text-[10.5px] tabular-nums text-stone-500">
                        {Object.keys(progress.notes).length}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">Learning loop</p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-stone-400">
          <span className="text-emerald-400">Learn</span> → <span className="text-emerald-400">Practice</span> →{" "}
          <span className="text-emerald-400">Build</span> → <span className="text-emerald-400">Track</span> →{" "}
          <span className="text-emerald-400">Master</span>
        </p>
        {mounted && streak.current > 0 && (
          <p className="mt-2 text-[11px] text-stone-500">
            <span className="font-mono tabular-nums text-emerald-400">{streak.current}-day</span> streak — keep it alive.
          </p>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="text-[15px] font-bold tracking-tight text-stone-900">CodeAtlas</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-stone-500">
            Built and curated by <span className="font-medium text-stone-700">Satyam Kumar</span>. Computer Science ·
            Software Engineering · AI.
          </p>
          <a
            href="mailto:satyamkumar.builds@gmail.com"
            className="mt-2 inline-block text-[12.5px] font-medium text-emerald-700 hover:underline underline-offset-2"
          >
            satyamkumar.builds@gmail.com
          </a>
        </div>
        <div className="flex gap-14">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone-400">Platform</p>
            <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-stone-600">
              <li><a href="#/courses" className="hover:text-stone-900">Courses</a></li>
              <li><a href="#/roadmaps" className="hover:text-stone-900">Roadmaps</a></li>
              <li><a href="#/practice" className="hover:text-stone-900">Practice</a></li>
              <li><a href="#/projects" className="hover:text-stone-900">Projects</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone-400">Personal</p>
            <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-stone-600">
              <li><a href="#/dashboard" className="hover:text-stone-900">Dashboard</a></li>
              <li><a href="#/bookmarks" className="hover:text-stone-900">Bookmarks</a></li>
              <li><a href="#/notes" className="hover:text-stone-900">Notes</a></li>
              <li><a href="#/about" className="hover:text-stone-900">About</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-200">
        <p className="mx-auto w-full max-w-6xl px-6 py-4 text-[11.5px] leading-relaxed text-stone-400">
          CodeAtlas curates and structures freely available educational content. All videos are hosted on YouTube and
          played via the official embedded player — credit and traffic belong to the original creators.
        </p>
      </div>
    </footer>
  );
}

export function AppShell() {
  const route = useRoute();
  const mounted = useMounted();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route.hash]);

  // redirect unknown → home
  const seg = route.segments[0] ?? "";
  const known = ["", "courses", "dashboard", "practice", "projects", "roadmaps", "bookmarks", "notes", "about", "search"];

  let view: React.ReactNode;
  if (seg === "") view = <HomeView />;
  else if (seg === "dashboard") view = <DashboardView />;
  else if (seg === "courses") view = route.segments[1] ? (route.segments[2] ? <LessonView /> : <CourseDetailView />) : <CoursesView />;
  else if (seg === "practice") view = <PracticeView />;
  else if (seg === "projects") view = <ProjectsView />;
  else if (seg === "roadmaps") view = <RoadmapsView />;
  else if (seg === "bookmarks") view = <BookmarksView />;
  else if (seg === "notes") view = <NotesView />;
  else if (seg === "about") view = <AboutView />;
  else if (seg === "search") view = <SearchView />;
  else view = <HomeView />;
  void known;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-[#101613] lg:flex">
        <NavLinks />
      </aside>

      {/* Topbar */}
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur lg:pl-60">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          {/* mobile nav — client-only so Radix ids never mismatch SSR */}
          {mounted && (
            <Sheet open={mobileNav} onOpenChange={setMobileNav}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-0 bg-[#101613] p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <NavLinks onNavigate={() => setMobileNav(false)} />
              </SheetContent>
            </Sheet>
          )}

          <button
            onClick={() => setPaletteOpen(true)}
            className="flex h-9 flex-1 items-center gap-2.5 rounded-md border border-stone-200 bg-stone-50 px-3 text-left text-[13px] text-stone-400 transition-colors hover:border-stone-300 hover:bg-white sm:max-w-md"
            aria-label="Open search"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 truncate">Search courses, topics, videos…</span>
            <kbd className="hidden rounded border border-stone-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-stone-400 sm:block">
              ⌘K
            </kbd>
          </button>

          <a
            href="#/dashboard"
            className="ml-auto hidden items-center gap-1.5 rounded-md border border-stone-200 px-3 py-2 text-[12.5px] font-medium text-stone-700 hover:border-stone-300 hover:bg-stone-50 sm:flex"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 lg:pl-60">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{view}</div>
      </main>

      <div className="lg:pl-60">
        <Footer />
      </div>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </div>
  );
}
