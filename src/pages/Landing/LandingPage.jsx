import SEO from "../../components/common/SEO";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import FeatureProjectSection from "./components/FeatureProjectSection";
import VisionSection from "./components/VisionSection";
import StatsSection from "./components/StatsSection";
import PortfolioSection from "./components/PortfolioSection";
import ExpertiseSection from "./components/ExpertiseSection";
import DispatchesSection from "./components/DispatchesSection";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Amma Lines",
  url: "https://ammalines.com",
  description:
    "Flagship marine construction firm of the Meka Group. Breakwaters, jetties, deepwater dredging and port development across India and international waters since 1978.",
};

const LandingPage = () => {
  return (
    <>
      <SEO
        title=""
        description="Amma Lines — flagship marine construction firm of the Meka Group. Breakwaters, jetties and deepwater dredging across India and international waters since 13 December 1978."
        path="/"
        jsonLd={homeJsonLd}
        jsonLdId="ld-home"
      />
      <main
        className="w-full overflow-x-hidden"
        style={{ backgroundColor: "var(--color-bone)", color: "var(--color-ink)" }}
      >
        <HeroSection />
        <MarqueeSection />
        <FeatureProjectSection />
        <VisionSection />
        <StatsSection />
        <PortfolioSection />
        <ExpertiseSection />
        <DispatchesSection />
      </main>
    </>
  );
};

export default LandingPage;
