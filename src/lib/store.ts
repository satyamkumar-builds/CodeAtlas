"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface NoteEntry {
  text: string;
  updated: number;
}

interface ProgressState {
  completed: Record<string, Record<number, number>>; // courseId -> lesson gi -> ts
  bookmarks: Record<string, Record<number, number>>;
  notes: Record<string, NoteEntry>; // "courseId:gi"
  lastVisited: Record<string, { gi: number; at: number }>;
  activity: Record<string, number>; // "YYYY-MM-DD" -> lessons completed
  practiceLog: Record<string, { count: number; last: number }>; // platform name
  toggleComplete: (courseId: string, gi: number) => void;
  toggleBookmark: (courseId: string, gi: number) => void;
  setNote: (courseId: string, gi: number, text: string) => void;
  markVisited: (courseId: string, gi: number) => void;
  logPractice: (platform: string) => void;
  clearPractice: (platform: string) => void;
  resetAll: () => void;
}

const today = () => new Date().toISOString().slice(0, 10);

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      bookmarks: {},
      notes: {},
      lastVisited: {},
      activity: {},
      practiceLog: {},

      toggleComplete: (courseId, gi) => {
        const state = get();
        const course = { ...(state.completed[courseId] ?? {}) };
        const wasDone = gi in course;
        if (wasDone) {
          delete course[gi];
        } else {
          course[gi] = Date.now();
        }
        const activity = { ...state.activity };
        if (wasDone) {
          activity[today()] = Math.max(0, (activity[today()] ?? 0) - 1);
        } else {
          activity[today()] = (activity[today()] ?? 0) + 1;
        }
        set({ completed: { ...state.completed, [courseId]: course }, activity });
      },

      toggleBookmark: (courseId, gi) => {
        const state = get();
        const course = { ...(state.bookmarks[courseId] ?? {}) };
        if (gi in course) delete course[gi];
        else course[gi] = Date.now();
        set({ bookmarks: { ...state.bookmarks, [courseId]: course } });
      },

      setNote: (courseId, gi, text) => {
        const key = `${courseId}:${gi}`;
        const notes = { ...get().notes };
        if (text.trim() === "") delete notes[key];
        else notes[key] = { text, updated: Date.now() };
        set({ notes });
      },

      markVisited: (courseId, gi) => {
        const lastVisited = { ...get().lastVisited };
        const prev = lastVisited[courseId];
        if (prev?.gi !== gi || Date.now() - prev.at > 60_000) {
          lastVisited[courseId] = { gi, at: Date.now() };
          set({ lastVisited });
        }
      },

      logPractice: (platform) => {
        const practiceLog = { ...get().practiceLog };
        const entry = practiceLog[platform] ?? { count: 0, last: 0 };
        practiceLog[platform] = { count: entry.count + 1, last: Date.now() };
        set({ practiceLog });
      },

      clearPractice: (platform) => {
        const practiceLog = { ...get().practiceLog };
        delete practiceLog[platform];
        set({ practiceLog });
      },

      resetAll: () =>
        set({ completed: {}, bookmarks: {}, notes: {}, lastVisited: {}, activity: {}, practiceLog: {} }),
    }),
    {
      name: "codeatlas-progress-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ------------------------------------------------------------ selectors
export function courseProgress(state: ProgressState, courseId: string, total: number) {
  const done = Object.keys(state.completed[courseId] ?? {}).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function overallProgress(state: ProgressState, totals: { id: string; total: number }[]) {
  const doneTotal = totals.reduce((acc, t) => acc + Object.keys(state.completed[t.id] ?? {}).length, 0);
  const allLessons = totals.reduce((acc, t) => acc + t.total, 0);
  return { done: doneTotal, total: allLessons, pct: allLessons === 0 ? 0 : Math.round((doneTotal / allLessons) * 100) };
}

export interface StreakInfo {
  current: number;
  best: number;
  activeToday: boolean;
  activeDays: number;
}

export function streakInfo(activity: Record<string, number>): StreakInfo {
  const dates = Object.keys(activity).filter((d) => activity[d] > 0).sort();
  if (dates.length === 0) return { current: 0, best: 0, activeToday: false, activeDays: 0 };

  const dayMs = 86_400_000;
  let best = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = Math.round((Date.parse(dates[i]) - Date.parse(dates[i - 1])) / dayMs);
    run = diff === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }

  const t = today();
  const yesterday = new Date(Date.now() - dayMs).toISOString().slice(0, 10);
  let current = 0;
  if (activity[t] > 0) current = 1;
  else if (activity[yesterday] > 0) current = 0;
  // walk back from today/yesterday
  let cursor = activity[t] > 0 ? Date.parse(t) : activity[yesterday] > 0 ? Date.parse(yesterday) : null;
  if (cursor !== null) {
    current = 0;
    while (true) {
      const key = new Date(cursor).toISOString().slice(0, 10);
      if (activity[key] > 0) {
        current += 1;
        cursor -= dayMs;
      } else break;
    }
  }

  return { current, best, activeToday: activity[t] > 0, activeDays: dates.length };
}
