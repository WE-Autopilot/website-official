import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * For the pen draw-in: returns a ref and whether the stroke is still waiting
 * to be drawn. Strokes are drawn straight away when motion is reduced or
 * IntersectionObserver isn't available.
 */
export function useDrawIn<T extends Element>() {
  const ref = useRef<T>(null);
  const [pending, setPending] = useState(
    () => !prefersReducedMotion() && typeof IntersectionObserver !== "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!pending || !el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPending(false);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pending]);

  return { ref, pending };
}
