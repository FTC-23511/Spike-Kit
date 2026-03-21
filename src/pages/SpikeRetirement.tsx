import { AlertTriangle, Calendar, ExternalLink, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SpikeRetirementPage = () => {
  return (
    <div className="min-h-screen bg-background pt-14 sm:pt-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-card border-2 border-border rounded-full shadow-soft">
              <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground">Important Update</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
              SPIKE Prime <span className="text-gradient">Retirement</span>
            </h1>
            <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground max-w-xl mx-auto">
              Understanding the transition from SPIKE Prime to the new AI-powered robotics kits.
            </p>
          </div>

          {/* Main Info Card */}
          <Card className="border-2 border-border bg-card shadow-elevated">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="font-display text-base sm:text-lg md:text-2xl flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                Founders and Future Edition
              </CardTitle>
              <CardDescription className="text-[10px] sm:text-xs md:text-sm">
                Starting August 2026, FIRST® LEGO® League will offer both editions for two seasons.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 pt-0">
              {/* Timeline */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="bg-card rounded-lg p-3 sm:p-4 md:p-5 border border-border">
                  <h3 className="font-display font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Founders Edition</h3>
                  <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground">
                    The current experience using <strong className="text-gradient">SPIKE™</strong> technology.
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-base text-foreground font-medium mt-1 sm:mt-2">
                    Final season: <span className="text-gradient">2027/2028</span>
                  </p>
                </div>

                <div className="bg-card rounded-lg p-3 sm:p-4 md:p-5 border border-border">
                  <h3 className="font-display font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                    <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                    Future Edition
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground">
                    A new experience using <strong>LEGO® Education's Computer Science & AI</strong> hardware.
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-base text-foreground font-medium mt-1 sm:mt-2">
                    First season: <span className="text-gradient">2026/2027</span>
                  </p>
                </div>
              </div>

              {/* Key Info */}
              <div className="bg-card border-2 border-border rounded-lg p-3 sm:p-4 md:p-5">
                <div className="flex items-start gap-2 sm:gap-3">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-xs sm:text-sm md:text-base text-foreground mb-1 sm:mb-2">Important Notice</h4>
                    <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground">
                      After the 2027/2028 season, the new wireless Computer Science & AI hardware 
                      will be <strong>required for participation</strong> in FIRST LEGO League. SPIKE Prime 
                      kits will no longer be competition-legal.
                    </p>
                  </div>
                </div>
              </div>

              {/* What This Means */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-display font-semibold text-sm sm:text-base md:text-lg">What This Means for Teams</h3>
                <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-[10px] sm:text-xs md:text-base text-muted-foreground">
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Teams currently using SPIKE Prime have until the 2027/2028 season to compete with their existing kits</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>After 2028, all teams must transition to the new AI-powered hardware</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Many teams will have unused SPIKE Prime kits that can be donated to help others</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>SPIKE Forward helps redistribute these kits to schools that can still use them for learning</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4">
                <Button asChild variant="hero" size="default" className="flex-1 text-[10px] sm:text-xs md:text-sm">
                  <a href="https://www.firstlegoleague.org/season" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    Learn More from FIRST
                  </a>
                </Button>
                <Button asChild variant="donate" size="default" className="flex-1 text-[10px] sm:text-xs md:text-sm">
                  <Link to="/donate">Donate Your Kits</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Why Donate Card */}
          <Card className="border-2 border-border bg-card shadow-elevated">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="font-display text-sm sm:text-base md:text-xl">Why Donate Your SPIKE Prime Kits?</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed">
                As teams upgrade to the new AI hardware, their SPIKE Prime kits don't have to go to waste. 
                These kits are still incredible educational tools for teaching robotics, programming, and 
                engineering concepts. By donating your retired kits through SPIKE Forward, you're giving 
                students who might not otherwise have access to robotics education the chance to learn, 
                create, and innovate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SpikeRetirementPage;
