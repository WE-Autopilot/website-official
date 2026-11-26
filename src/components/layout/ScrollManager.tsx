import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function scrollToHash(hash: string, tries = 10) {
  const id = decodeURIComponent(hash.slice(1));
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ block: "start" });
    return;
  }
  // The target may not be rendered yet (lazy pages, filtered lists).
  if (tries > 0) requestAnimationFrame(() => scrollToHash(hash, tries - 1));
}

/**
 * On a new page: scroll to the top (or to #hash), and move keyboard and
 * screen reader focus to the main content so the change is announced.
 * Query-string changes (like blog filters) don't scroll.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (hash) {
      scrollToHash(hash);
    } else {
      window.scrollTo(0, 0);
    }
    if (first.current) {
      first.current = false;
      return;
    }
    if (!hash) document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}

export default ScrollManager;
