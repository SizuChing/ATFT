import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import AIPredictionDashboard from "@/components/AIPredictionDashboard";
import BacktestReport from "@/components/BacktestReport";
import HowItWorksSection from "@/components/HowItWorksSection";
import RiskSection from "@/components/RiskSection";
import ECBSection from "@/components/ECBSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <AIPredictionDashboard />
      <BacktestReport />
      <HowItWorksSection />
      <RiskSection />
      <ECBSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
