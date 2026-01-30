import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { hash, key } = useLocation();

  useLayoutEffect(() => {
    const scroll = () => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
      }
      window.scrollTo(0, 0);
    };

    scroll();
    requestAnimationFrame(scroll);
    setTimeout(scroll, 0);
  }, [key, hash]);

  return null;
}