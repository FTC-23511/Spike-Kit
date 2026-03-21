import { useState } from "react";
import { Users, Code, Wrench, GraduationCap, Heart, Globe, Lightbulb, Recycle } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

const teamHighlights = [
  {
    icon: Users,
    title: "10 Student Members",
    description: "All work is done by students — from strategy and CAD design to manufacturing, programming, fundraising, and leadership.",
  },
  {
    icon: Code,
    title: "SolversLib",
    description: "Our open-source FTC programming library has hundreds of users worldwide, including the Washington State Champions. With 400+ members on our Discord support server.",
  },
  {
    icon: Wrench,
    title: "Open Alliance Team",
    description: "All our robot CAD designs, code repositories, and documents are publicly available. Over 10,000 part usages from our designs to date.",
  },
  {
    icon: Globe,
    title: "World Championships",
    description: "One of the few teams representing Washington at the FIRST World Championships in Houston, TX — sharing our mission with 50,000+ attendees.",
  },
  {
    icon: Heart,
    title: "Zero Membership Fees",
    description: "We eliminated all membership fees to make robotics accessible to anyone interested, an uncommon practice among robotics organizations.",
  },
  {
    icon: GraduationCap,
    title: "Community Workshops",
    description: "We run workshops like 'Tips and Tricks to Fundraise Sustainably' and 'Planning for Complex Designs' to help other teams grow.",
  },
];

const About = () => {
  const [selectedItem, setSelectedItem] = useState<{ icon: any; title: string; description: string } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-spike-light via-spike-cream to-spike-light">
      <main className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4 md:mb-6">
              About SPIKE Forward
            </h1>
            <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
              A program by the Seattle Solvers to give retired SPIKE Prime kits a second life in classrooms that need them most.
            </p>
          </div>

          {/* Why Donate Section */}
          <div className="mb-12 sm:mb-16 md:mb-24">
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground text-center mb-4 sm:mb-8 md:mb-12">
              Why Donate Your Kit?
            </h2>
            <p className="text-[10px] text-muted-foreground text-center mb-2 sm:hidden">
              Tap a card for more details
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedItem(feature)}
                  className="group bg-spike-light/80 backdrop-blur-sm border-2 border-spike-border rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer sm:cursor-default"
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-button border-2 border-spike-border flex items-center justify-center mb-2 sm:mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-7 md:h-7 text-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-[10px] sm:text-xs md:text-xl text-foreground mb-1 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed hidden sm:block">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* About Our Team */}
          <div className="mb-12 sm:mb-16 md:mb-24">
            <div className="bg-spike-cream border-2 border-spike-border rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-8 lg:p-12 shadow-elevated mb-6 sm:mb-8 md:mb-12">
              <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 sm:mb-4 md:mb-6">
                About Our Team
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-muted-foreground leading-relaxed text-[11px] sm:text-sm md:text-lg">
                <p>
                  We are the <strong className="text-foreground">Seattle Solvers</strong>, a youth-serving robotics nonprofit composed of 10 students across the greater Seattle area. We're dedicated to learning as much as we can and spreading access to STEM education to all.
                </p>
                <p>
                  We compete in the <strong className="text-foreground">FIRST Tech Challenge</strong>, one of the largest international youth robotics competitions in the world. This year, we are one of the few teams representing Washington at the <strong className="text-foreground">FIRST World Championships in Houston, Texas</strong>, where we hope to share our goals with the over 50,000 attendees.
                </p>
                <p className="hidden sm:block">
                  All work on our team is done by the students — from strategizing for the season, to designing the bot on CAD software and manufacturing custom parts, to maintaining our own programming library, to fundraising. All decisions, purchases, and planning is done by the students, with an elected group of student leaders to follow through on these plans.
                </p>
                <p className="hidden sm:block">
                  We provide students a well-rounded experience with skills like leadership, computer aided design (CAD), custom parts manufacturing, event planning, video editing, teaching, and more. To make our team accessible to anyone interested in robotics, we eliminated all membership fees — an uncommon practice amongst robotics organizations.
                </p>
              </div>
            </div>

            {/* Team Highlights Grid */}
            <p className="text-[10px] text-muted-foreground text-center mb-2 sm:hidden">
              Tap a card for more details
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-6">
              {teamHighlights.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedItem(item)}
                  className="bg-spike-light/80 backdrop-blur-sm border-2 border-spike-border rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer sm:cursor-default"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-button border-2 border-spike-border flex items-center justify-center mb-2 sm:mb-2 md:mb-4">
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 text-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-[9px] sm:text-xs md:text-lg text-foreground mb-0.5 sm:mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed hidden sm:block">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-2 sm:mb-3 md:mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-[11px] sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-xl mx-auto">
              Your retired SPIKE Prime kit can continue inspiring students in classrooms around the world.
            </p>
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center">
              <Button asChild variant="hero" size="default" className="text-[10px] sm:text-xs md:text-base sm:px-4 md:px-6">
                <Link to="/donate">Start Donating</Link>
              </Button>
              <Button asChild variant="outline" size="default" className="text-[10px] sm:text-xs md:text-base sm:px-4 md:px-6">
                <Link to="/donate-funds">Donate Funds</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Mobile detail dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-[85vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              {selectedItem && <selectedItem.icon className="w-5 h-5 text-spike-gold" />}
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed pt-2">
              {selectedItem?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default About;
