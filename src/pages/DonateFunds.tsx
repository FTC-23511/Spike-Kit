import { DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DonateFundsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-14 sm:pt-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-card border-2 border-border rounded-full shadow-soft">
              <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground">Support Our Mission</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
              Donate <span className="text-gradient">Funds</span>
            </h1>
            <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground max-w-xl mx-auto">
              Your financial contribution helps us refurbish kits, cover shipping costs, and expand our reach to more schools.
            </p>
          </div>

          {/* Donation Card */}
          <Card className="border-2 border-border bg-card shadow-elevated">
            <CardHeader className="text-center p-3 sm:p-4 md:p-6">
              <CardTitle className="font-display text-lg sm:text-xl md:text-2xl">Make a Donation</CardTitle>
              <CardDescription className="text-[10px] sm:text-xs md:text-sm">
                Every dollar helps put robotics education in the hands of students who need it most.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 pt-0">
              <div className="w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://hcb.hackclub.com/donations/start/ftc23511"
                  style={{ border: "none" }}
                  name="donateFrame"
                  scrolling="yes"
                  seamless
                  width="100%"
                  height="600"
                  title="Donate to SPIKE Forward"
                />
              </div>

              <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 border border-border">
                <h3 className="font-display font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3">How Your Donation Helps</h3>
                <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-[10px] sm:text-xs md:text-base text-muted-foreground">
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>$25</strong> - Covers shipping for one SPIKE Prime kit</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>$50</strong> - Helps refurbish and replace missing parts</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>$100</strong> - Sponsors a complete kit for a classroom</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>$500+</strong> - Helps equip an entire robotics team</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-[9px] sm:text-[10px] md:text-sm text-muted-foreground mb-2 sm:mb-3">
                  Having trouble with the form? Donate directly on our fiscal sponsor's website:
                </p>
                <Button asChild variant="outline" size="sm" className="text-[10px] sm:text-xs md:text-sm">
                  <a 
                    href="https://hcb.hackclub.com/donations/start/spike-forward" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    Open Donation Page
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonateFundsPage;
