"use client";

import { Compass, Mail, Map, ShieldCheck, GraduationCap, ListChecks, Hammer, LineChart, Award } from "lucide-react";
import { SectionLabel, Breadcrumbs } from "@/components/shared";
import { courses } from "@/lib/catalog";
import { PRACTICE_CATEGORIES } from "@/data/practice-data";
import { PROJECTS } from "@/data/projects-data";
import { ROADMAPS } from "@/data/roadmaps-data";

export default function AboutView() {
  const totalLessons = courses.reduce((a, c) => a + c.lessonCount, 0);
  const platforms = PRACTICE_CATEGORIES.reduce((a, c) => a + c.platforms.length, 0);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "About" }]} />
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">CodeAtlas</h1>
      <p className="mt-1 text-[13.5px] font-medium text-emerald-800">by Satyam Kumar</p>

      <div className="mt-6 max-w-3xl space-y-5 text-[14px] leading-relaxed text-stone-700">
        <p>
          CodeAtlas is a personally curated learning platform designed to organize the fragmented world of Computer
          Science into a structured learning system — from programming fundamentals and DSA to software engineering,
          cloud computing, AI/ML and advanced systems.
        </p>
        <p>
          The internet already contains world-class free education. What it lacks is <em>structure</em>: the sense of
          order, sequence and accountability you get from a serious course platform. CodeAtlas supplies that layer.{" "}
          {courses.length} learning tracks and {totalLessons.toLocaleString("en-IN")} lessons are restructured into
          modules, paired with hand-written study notes, matched practice platforms, project briefs and roadmaps — with
          progress, bookmarks and notes tracked on your device.
        </p>
        <p>
          It is not an institute, and it makes no pretence of being one. It is a map, drawn by one engineer for anyone
          willing to do the work.
        </p>
      </div>

      {/* Philosophy */}
      <section className="mt-10">
        <SectionLabel>The identity</SectionLabel>
        <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-5">
          {[
            { icon: Map, t: "Learn", b: "Structured courses, sequenced modules, curated notes." },
            { icon: ListChecks, t: "Practice", b: `${platforms} external platforms, matched per domain.` },
            { icon: Hammer, t: "Build", b: `${PROJECTS.length} project briefs, beginner to expert.` },
            { icon: LineChart, t: "Track", b: "Progress, streaks, bookmarks, notes — local-first." },
            { icon: Award, t: "Master", b: `${ROADMAPS.length} roadmaps from fundamentals to AI.` },
          ].map((s) => (
            <div key={s.t} className="bg-white p-4">
              <s.icon className="h-4 w-4 text-emerald-700" />
              <p className="mt-2.5 text-[13px] font-semibold text-stone-900">{s.t}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-stone-500">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creator */}
      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 p-5">
          <GraduationCap className="h-5 w-5 text-emerald-700" />
          <h2 className="mt-3 text-[15px] font-semibold text-stone-900">The curator</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-stone-600">
            CodeAtlas is built and curated by <span className="font-semibold text-stone-900">Satyam Kumar</span> —
            Computer Science · Software Engineering · AI. Every course, note and roadmap here was selected the hard way:
            by studying the landscape, testing the material and keeping only what earns its place.
          </p>
          <a
            href="mailto:satyamkumar.builds@gmail.com"
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-700 hover:underline underline-offset-2"
          >
            <Mail className="h-3.5 w-3.5" /> satyamkumar.builds@gmail.com
          </a>
        </div>
        <div className="rounded-lg border border-stone-200 p-5">
          <ShieldCheck className="h-5 w-5 text-emerald-700" />
          <h2 className="mt-3 text-[15px] font-semibold text-stone-900">Content & credit policy</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-stone-600">
            No video is re-hosted here. Every lesson plays through YouTube&rsquo;s official embedded player, and every
            course links back to the original playlist — views, likes and subscriptions belong to the creators who made
            the content. CodeAtlas adds curation, structure and tooling. Attribution and gratitude, always.
          </p>
        </div>
      </section>

      {/* Creators credit */}
      <section className="mt-10 rounded-lg border border-stone-200 bg-stone-50/60 p-5">
        <div className="flex items-start gap-3">
          <Compass className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
          <p className="text-[12.5px] leading-relaxed text-stone-600">
            <span className="font-semibold text-stone-800">Standing on shoulders:</span> this catalog exists because of
            CS50 &amp; David Malan, Ben Eater, Love Babbar, Kunal Kushwaha, Corey Schafer, Striver (takeUforward), Abdul
            Bari, Gate Smashers, Hussein Nasser, Chai aur Code (Piyush Garg), ByteByteGo &amp; Alex Xu, TechWorld with
            Nana, Christof Paar, 3Blue1Brown &amp; Grant Sanderson, StatQuest &amp; Josh Starmer, Andrej Karpathy,
            CampusX, DataTalksClub, David Silver, Fastbit Academy and every other educator whose work is linked here.
          </p>
        </div>
      </section>
    </div>
  );
}
