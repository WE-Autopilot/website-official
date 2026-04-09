import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Join from "./components/Join";
import Header from "./components/Header";
import Home from "./components/Home";
import Team from "./components/Team";
import Sponsors from "./components/Sponsors";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import UnderConstruction from "./components/UnderConstruction";
import TeamPage from "./components/TeamPage";
import "./App.css";

import { Analytics } from "@vercel/analytics/react";
import { ParallaxProvider } from "react-scroll-parallax";

/**
 * Main App component
 * @returns The main application component
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />

        <main className="content">
          <ParallaxProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/join" element={<Join />} />
              <Route path="/Team" element={<Team />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/gallery" element={<Gallery />} />
              {/* <Route path="/competition" element={<Competition />} /> */}
              <Route path="/teams/:teamSlug" element={<TeamPage />} />
              <Route path="/UnderConstruction" element={<UnderConstruction />}
              />
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
