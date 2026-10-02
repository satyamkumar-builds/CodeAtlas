"use client";

// Tiny hash router — the SPA runs on the single "/" route, views switch on hash.
import { useEffect, useState, useCallback } from "react";

export interface RouteInfo {
  /** path segments, e.g. ["courses","dsa-complete","12"] */
  segments: string[];
  query: URLSearchParams;
  hash: string;
}

function parse(): RouteInfo {
  if (typeof window === "undefined") return { segments: [], query: new URLSearchParams(), hash: "#/" };
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [pathPart, queryPart] = raw.split("?");
  const segments = pathPart.split("/").filter(Boolean);
  return { segments, query: new URLSearchParams(queryPart ?? ""), hash: window.location.hash };
}

export function useRoute(): RouteInfo {
  const [route, setRoute] = useState<RouteInfo>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function navigate(to: string, opts?: { replace?: boolean }) {
  const target = to.startsWith("#") ? to : `#${to.startsWith("/") ? to : `/${to}`}`;
  if (typeof window === "undefined") return;
  if (window.location.hash === target) return;
  if (opts?.replace) {
    window.history.replaceState(null, "", target);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = target;
  }
}

export function useNavigate() {
  return useCallback((to: string, opts?: { replace?: boolean }) => navigate(to, opts), []);
}

export function scrollToTop() {
  if (typeof window !== "undefined") window.scrollTo({ top: 0 });
}
