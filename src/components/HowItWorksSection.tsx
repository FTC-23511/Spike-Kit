import { useState } from "react";
import { Package, Truck, School, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const steps = [
  {
    icon: Package,
    step: "01",
    title: "Register Your Kit",
    description: "Fill out our simple form with details about your SPIKE Prime kit and its condition.",
  },
  {
    icon: Truck,
    step: "02",
    title: "Ship It!",
    description: "Ship your kits or parts to us to be distributed! For an estimated value of $800+, we can pay the label!",
  },
  {
    icon: School,
    step: "03",
    title: "Kit Matching",
    description: "We match your kit with a school or organization that needs it most based on their requests.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Impact Update",
    description: "Receive updates about where your kit went and how students are using it to learn and create.",
  },
];

const HowItWorksSection = () => {
  const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null);

  return (
    <section id="how-it-works" className="py-8 sm:py-12 md:py-24 relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8 md:mb-16">
          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground mb-2 sm:mb-3 md:mb-6">
            How It Works
          </h2>
          <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
            Donating your SPIKE Prime kit is simple. Follow these four easy steps 
            to give your kit a new home.
          </p>
        </div>

        {/* Mobile hint */}
        <p className="text-[10px] text-muted-foreground text-center mb-2 sm:hidden">
          Tap a step for more details
        </p>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-accent -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                onClick={() => setSelectedStep(step)}
                className="text-center cursor-pointer sm:cursor-default"
              >
                <div className="relative inline-block mb-2 sm:mb-3 md:mb-6">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-button border-2 sm:border-2 md:border-4 border-spike-border flex items-center justify-center shadow-card mx-auto">
                    <step.icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 text-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 rounded-full bg-spike-gold border border-spike-border sm:border-2 flex items-center justify-center shadow-soft">
                    <span className="font-display font-bold text-[7px] sm:text-[8px] md:text-xs text-foreground">{step.step}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-[9px] sm:text-xs md:text-xl text-foreground mb-0.5 sm:mb-1 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-[9px] sm:text-xs md:text-base text-muted-foreground leading-relaxed hidden sm:block">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile detail dialog */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-[85vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              {selectedStep && <selectedStep.icon className="w-5 h-5 text-spike-gold" />}
              {selectedStep?.title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed pt-2">
              {selectedStep?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HowItWorksSection;
