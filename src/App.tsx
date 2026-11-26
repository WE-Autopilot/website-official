import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SketchDefs } from "./components/design-system";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ScrollManager } from "./components/layout/ScrollManager";
import { ui } from "./content/pages";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Subteam from "./pages/Subteam";
import Join from "./pages/Join";
import Sponsors from "./pages/Sponsors";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

// The post page carries the Markdown renderer and highlighter; load it only when needed.
const BlogPost = lazy(() => import("./pages/BlogPost"));

const isDesignMode = import.meta.env.MODE === "design";
const DesignSystemShowcase = isDesignMode
  ? lazy(() => import("./components/design-system/DesignSystemShowcase"))
  : null;

export function App() {
  return (
    <Router>
      <SketchDefs />
      <ScrollManager />
      <a className="skip-link" href="#main">
        {ui.skipLink}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page container" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/teams/mapping-and-localization" element={<Navigate to="/teams/localization" replace />} />
            <Route path="/teams/:slug" element={<Subteam />} />
            <Route path="/join" element={<Join />} />
            <Route path="/contact" element={<Navigate to="/join" replace />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {DesignSystemShowcase && <Route path="/design-system" element={<DesignSystemShowcase />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Analytics />
    </Router>
  );
}

export default App;
