import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate
    scrollToTop();

    // After layout
    requestAnimationFrame(scrollToTop);

    // After browser restore attempt (this is the key)
    setTimeout(scrollToTop, 0);
  }, [location.key]); // <-- IMPORTANT: key, not pathname

  return null;
}