import { Package, Truck, School, CheckCircle, ClipboardList, Search, Mail, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Register Your Kit",
    description: "Fill out our donation form with details about your SPIKE Prime kit — including condition, completeness, and any expansion kits you're including.",
    details: [
      "Provide your contact information for shipping coordination",
      "Select the condition of your kit (Mint, Good, Fair, or Parts Only)",
      "Indicate whether you have the Expansion Kit (45681)",
      "Receive an estimated fair market value for tax deduction purposes",
    ],
  },
  {
    icon: Search,
    step: "02",
    title: "We Review Your Submission",
    description: "Our team reviews every donation submission to match kits with the right recipients and coordinate logistics.",
    details: [
      "We verify kit details and estimated value",
      "For donations valued at $800+, we can cover your shipping label",
      "We identify the best-fit school or organization for your kit",
      "You'll receive a confirmation email with next steps",
    ],
  },
  {
    icon: Truck,
    step: "03",
    title: "Ship Your Kit",
    description: "Pack your kit securely and ship it to us. We'll provide all the details you need for a smooth handoff.",
    details: [
      "We send you shipping instructions and address",
      "Prepaid label provided for qualifying donations ($800+ value)",
      "Otherwise, donors cover their own shipping costs",
      "Kits are inspected upon arrival to ensure quality",
    ],
  },
  {
    icon: School,
    step: "04",
    title: "Kit Matching & Distribution",
    description: "We match your kit with a school or organization that needs it most, based on their specific requests and needs.",
    details: [
      "Schools and orgs apply through our request program",
      "We prioritize underprivileged communities and Title I schools",
      "Kits are refurbished if needed before distribution",
      "International distribution available for qualifying programs",
    ],
  },
  {
    icon: Mail,
    step: "05",
    title: "Tax Receipt & Impact Update",
    description: "Receive a tax-deductible donation receipt and updates about where your kit went and how it's being used.",
    details: [
      "Official donation receipt based on fair market value",
      "Photos and updates from the receiving classroom",
      "Option to be listed on our donors recognition page",
      "Know your kit is making a real difference",
    ],
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-spike-light via-spike-cream to-spike-light">
      <main className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4 md:mb-6">
              How Donations Work
            </h1>
            <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground leading-relaxed">
              From your shelf to a student's hands — here's exactly how the process works, step by step.
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-8 mb-10 sm:mb-14 md:mb-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-spike-light/80 backdrop-blur-sm border-2 border-spike-border rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-8 shadow-card hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-button border-2 md:border-3 border-spike-border flex items-center justify-center shadow-card">
                        <step.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-foreground" />
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 rounded-full bg-spike-gold border border-spike-border sm:border-2 flex items-center justify-center shadow-soft">
                        <span className="font-display font-bold text-[7px] sm:text-[8px] md:text-xs text-foreground">{step.step}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-sm sm:text-base md:text-2xl text-foreground mb-1 sm:mb-2 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed mb-1 sm:mb-2 md:mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-0.5 sm:space-y-1 md:space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-spike-gold mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ-style section */}
          <div className="max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-20">
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground text-center mb-4 sm:mb-6 md:mb-10">
              Common Questions
            </h2>
            <div className="space-y-2 sm:space-y-3 md:space-y-6">
              {[
                {
                  q: "What condition does my kit need to be in?",
                  a: "We accept kits in any condition — from mint to parts only. Even individual components like hubs, motors, and sensors are valuable to schools building or repairing kits.",
                },
                {
                  q: "Is my donation tax-deductible?",
                  a: "Yes! All donations are tax-exempt based on fair market value calculated upon submission. You'll receive an official receipt once we've received and processed your kits.",
                },
                {
                  q: "Do I have to pay for shipping?",
                  a: "For donations with an estimated value of $800 or more, we can provide a prepaid shipping label. Otherwise, donors cover their own shipping costs.",
                },
                {
                  q: "Can I donate internationally?",
                  a: "Currently we accept donations shipped within the United States. We distribute kits both domestically and internationally to maximize impact.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-spike-cream border-2 border-spike-border rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
                  <h3 className="font-display font-bold text-xs sm:text-sm md:text-lg text-foreground mb-1 md:mb-2">{item.q}</h3>
                  <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-2 sm:mb-3 md:mb-4">
              Ready to Donate?
            </h2>
            <p className="text-[11px] sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-xl mx-auto">
              It only takes a few minutes to give your SPIKE Prime kit a new home.
            </p>
            <Button asChild variant="hero" size="default" className="text-[10px] sm:text-xs md:text-base">
              <Link to="/donate">
                Start Donating
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
