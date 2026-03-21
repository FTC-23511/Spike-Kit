import { useState } from "react";
import { Lightbulb, Recycle, GraduationCap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const features = [
  {
    icon: Recycle,
    title: "Sustainable Education",
    description: "Instead of throwing away perfectly good robotics kits, we ensure they continue to inspire the next generation of engineers and innovators.",
  },
  {
    icon: GraduationCap,
    title: "Equal Access",
    description: "Many schools lack the budget for robotics programs. Your donated kits bridge this gap and provide hands-on STEM learning opportunities.",
  },
  {
    icon: Lightbulb,
    title: "Spark Creativity",
    description: "SPIKE Prime kits are incredible tools for teaching coding, engineering, and problem-solving skills that students will use for life.",
  },
];

const AboutSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section id="about" className="py-8 sm:py-12 md:py-24 relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8 md:mb-16">
          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground mb-2 sm:mb-3 md:mb-6">
            Why Donate Your Kit?
          </h2>
          <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
            SPIKE Prime has been an incredible educational tool. Now that it's being retired, 
            your kit can continue making a difference in a new classroom.
          </p>
        </div>

        {/* Mobile hint */}
        <p className="text-[10px] text-muted-foreground text-center mb-2 sm:hidden">
          Tap a card for more details
        </p>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              onClick={() => setSelectedFeature(feature)}
              className="group bg-spike-light/80 backdrop-blur-sm border-2 border-spike-border rounded-xl sm:rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer sm:cursor-default"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-14 md:h-14 rounded-lg sm:rounded-lg md:rounded-xl bg-gradient-button border-2 border-spike-border flex items-center justify-center mb-2 sm:mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-7 md:h-7 text-foreground" />
              </div>
              <h3 className="font-display font-bold text-[10px] sm:text-xs md:text-xl text-foreground mb-1 sm:mb-1 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed hidden sm:block">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile detail dialog */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-[85vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              {selectedFeature && <selectedFeature.icon className="w-5 h-5 text-spike-gold" />}
              {selectedFeature?.title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed pt-2">
              {selectedFeature?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AboutSection;
