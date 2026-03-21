import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-spike.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-8 sm:pt-10 md:pt-16 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-32 sm:w-48 md:w-96 h-32 sm:h-48 md:h-96 bg-spike-yellow/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-28 sm:w-40 md:w-80 h-28 sm:h-40 md:h-80 bg-spike-gold/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-spike-cream border-2 border-spike-border rounded-full shadow-soft">
              <span className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-spike-gold rounded-full animate-pulse" />
              <span className="text-[9px] sm:text-xs md:text-sm font-medium text-foreground">
                SPIKE Prime Retirement Program
              </span>
            </div>
            
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight">
              Give Your{" "}
              <span className="text-gradient">SPIKE Prime</span>{" "}
              A Second Life
            </h1>
            
            <p className="text-[11px] sm:text-sm md:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              As SPIKE Prime kits are being retired, give them a new purpose. Donate your kits to schools and organizations in underprivileged communities that will put them to amazing educational use.
            </p>
            
            <div className="flex flex-row gap-1.5 sm:gap-2 md:gap-4">
              <Button asChild variant="hero" size="default" className="text-[9px] sm:text-xs md:text-sm h-7 sm:h-8 md:h-10 px-2 sm:px-3 md:px-4">
                <Link to="/donate">
                  <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                  Start Donating
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="default" className="text-[9px] sm:text-xs md:text-sm h-7 sm:h-8 md:h-10 px-2 sm:px-3 md:px-4">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                Request Kits
              </Button>
            </div>
            
            {/* Quick stats */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-8 pt-1 sm:pt-2 md:pt-4">
              <div className="text-center">
                <div className="font-display font-bold text-lg sm:text-xl md:text-3xl text-foreground">12+</div>
                <div className="text-[8px] sm:text-xs md:text-sm text-muted-foreground">Kits Donated</div>
              </div>
              <div className="w-px h-6 sm:h-8 md:h-12 bg-spike-border" />
              <div className="text-center">
                <div className="font-display font-bold text-lg sm:text-xl md:text-3xl text-foreground">2+</div>
                <div className="text-[8px] sm:text-xs md:text-sm text-muted-foreground">Schools Helped</div>
              </div>
              <div className="w-px h-6 sm:h-8 md:h-12 bg-spike-border" />
              <div className="text-center">
                <div className="font-display font-bold text-lg sm:text-xl md:text-3xl text-foreground">50+</div>
                <div className="text-[8px] sm:text-xs md:text-sm text-muted-foreground">Students Reached</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border-2 sm:border-2 md:border-4 border-spike-border shadow-elevated">
              <img
                src={heroImage}
                alt="SPIKE Prime robotics kit components"
                className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-spike-light/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>);
};

export default HeroSection;
