"use client";

import dynamic from "next/dynamic";

// CodeAtlas SPA — all views are client-side and switch on the URL hash.
const AppShell = dynamic(() => import("@/components/app-shell").then((m) => m.AppShell), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />
        <span className="text-[13px] font-medium tracking-wide text-stone-400">Loading CodeAtlas…</span>
      </div>
    </div>
  ),
});

export default function Home() {
  return <AppShell />;
}
