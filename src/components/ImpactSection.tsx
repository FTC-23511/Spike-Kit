import { useState } from "react";
import { TrendingUp, Users, Clock, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const stats = [
  {
    icon: TrendingUp,
    value: "12+",
    label: "Kits Donated",
    description: "And counting",
  },
  {
    icon: Users,
    value: "2",
    label: "Schools Helped",
    description: "Around the world",
  },
  {
    icon: Clock,
    value: "2 ",
    label: "Countries Impacted",
    description: "From receipt to delivery",
  },
  {
    icon: Heart,
    value: "50+",
    label: "Students Reached",
    description: "With access to STEM Education",
  },
];

const ImpactSection = () => {
  const [selectedStat, setSelectedStat] = useState<typeof stats[0] | null>(null);

  return (
    <section id="impact" className="py-8 sm:py-12 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-spike-cream/20" />
      
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-32 sm:w-40 md:w-80 h-32 sm:h-40 md:h-80 bg-spike-yellow/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-24 sm:w-32 md:w-60 h-24 sm:h-32 md:h-60 bg-spike-gold/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8 md:mb-16">
          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground mb-2 sm:mb-3 md:mb-6">
            Our Impact
          </h2>
          <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
            Together, we're making STEM education accessible to students who need it most. 
            Here's what we've accomplished so far.
          </p>
        </div>

        {/* Mobile hint */}
        <p className="text-[10px] text-muted-foreground text-center mb-2 sm:hidden">
          Tap a stat for more details
        </p>
        
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              onClick={() => setSelectedStat(stat)}
              className="bg-spike-light/90 backdrop-blur-sm border-2 border-spike-border rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6 text-center shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer sm:cursor-default"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-button border border-spike-border sm:border-2 flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-4">
                <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-foreground" />
              </div>
              <div className="font-display font-bold text-base sm:text-xl md:text-4xl text-foreground mb-0 sm:mb-0.5 md:mb-1">
                {stat.value}
              </div>
              <div className="font-display font-semibold text-[8px] sm:text-xs md:text-base text-foreground mb-0 sm:mb-0.5 md:mb-1">
                {stat.label}
              </div>
              <div className="text-[7px] sm:text-[10px] md:text-sm text-muted-foreground hidden sm:block">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="mt-6 sm:mt-8 md:mt-16 max-w-4xl mx-auto">
          <div className="bg-spike-cream border-2 border-spike-border rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-8 lg:p-12 shadow-elevated">
            <blockquote className="text-[11px] sm:text-sm md:text-xl lg:text-2xl text-foreground text-center leading-relaxed mb-2 sm:mb-3 md:mb-6">
              "The SPIKE Prime kits we received transformed our robotics program. 
              Students who never showed interest in STEM are now staying after school 
              to build and code. This donation changed lives."
            </blockquote>
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-gradient-button border-2 border-spike-border flex items-center justify-center">
                <span className="font-display font-bold text-[8px] sm:text-xs md:text-base text-foreground">MS</span>
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-[10px] sm:text-xs md:text-base text-foreground">Maria Santos</div>
                <div className="text-[8px] sm:text-[10px] md:text-sm text-muted-foreground">STEM Teacher, Lincoln Elementary</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile detail dialog */}
      <Dialog open={!!selectedStat} onOpenChange={() => setSelectedStat(null)}>
        <DialogContent className="max-w-[85vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              {selectedStat && <selectedStat.icon className="w-5 h-5 text-spike-gold" />}
              {selectedStat?.label}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed pt-2">
              <span className="font-display font-bold text-2xl text-foreground block mb-1">{selectedStat?.value}</span>
              {selectedStat?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ImpactSection;
