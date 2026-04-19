import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Preloader from "./components/layout/Preloader";
import ErrorBoundary from "./components/common/ErrorBoundary";
import RouteLoader from "./components/common/RouteLoader";
import CookieBanner from "./components/common/CookieBanner";

/* ----- Route chunks — code-split per page ------------------------ */
const LandingPage = lazy(() => import("./pages/Landing/LandingPage"));
const About = lazy(() => import("./pages/About/About"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Services = lazy(() => import("./pages/Services/Services"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Privacy = lazy(() => import("./pages/Legal/Privacy"));
const Terms = lazy(() => import("./pages/Legal/Terms"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <ErrorBoundary>
      <Preloader />
      <Router>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <CookieBanner />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
