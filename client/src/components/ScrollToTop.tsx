import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Prevent browser from restoring scroll position on SPA navigations
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll the actual scrolling element (works even if it's not window)
    const el = document.scrollingElement || document.documentElement;

    el.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo(0, 0);

    // Extra nudge after layout/paint (catches late scroll jumps)
    requestAnimationFrame(() => {
      el.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
}