import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main className="pt-16 bg-gradient-to-b from-spike-light via-spike-cream to-spike-light">
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
