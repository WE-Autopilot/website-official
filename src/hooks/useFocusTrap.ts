import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * While `active`, keeps Tab focus inside `container`, closes on Escape,
 * locks page scroll, and puts focus back where it was when it closes.
 */
export function useFocusTrap(
  container: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
  initialFocus?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const el = container.current;

    const focusables = () =>
      el ? Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null) : [];

    (initialFocus?.current ?? focusables()[0] ?? el)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
    // onClose is intentionally not a dependency: re-running would steal focus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, container, initialFocus]);
}
