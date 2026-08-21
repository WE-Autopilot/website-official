import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Join from "./components/Join";
import Header from "./components/Header";
import Home from "./components/Home";
import Team from "./components/Team";
import Sponsors from "./components/Sponsors";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import UnderConstruction from "./components/UnderConstruction";
import TeamPage from "./components/TeamPage";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

import { Analytics } from "@vercel/analytics/react";
import { ParallaxProvider } from "react-scroll-parallax";

const isDesignMode = import.meta.env.MODE === "design";

const DesignSystemShowcase = isDesignMode
  ? lazy(() => import("./components/design-system/DesignSystemShowcase"))
  : null;

/**
 * Main App component
 * @returns The main application component
 */
const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />

        <main className="content">
          <ParallaxProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              {isDesignMode && DesignSystemShowcase && (
                <Route
                  path="/design-system"
                  element={
                    <Suspense fallback={null}>
                      <DesignSystemShowcase />
                    </Suspense>
                  }
                />
              )}
              <Route path="/join" element={<Join />} />
              <Route path="/contact" element={<Navigate to="/join" replace />} />
              <Route path="/team" element={<Team />} />
              <Route path="/Team" element={<Team />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/teams/:teamSlug" element={<TeamPage />} />
              <Route path="/UnderConstruction" element={<UnderConstruction />} />
            </Routes>
          </ParallaxProvider>
        </main>

        <Footer />

        <Analytics />
      </div>
    </Router>
  );
};

export default App;
