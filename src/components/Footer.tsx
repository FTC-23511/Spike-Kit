import { Mail, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-spike-light border-t-2 border-spike-border py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          {/* Brand */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2 md:mb-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 rounded-md md:rounded-lg bg-gradient-button border border-spike-border sm:border-2 flex items-center justify-center shadow-soft flex-shrink-0">
                <span className="font-display font-bold text-[8px] sm:text-xs md:text-lg text-foreground">SP</span>
              </div>
              <span className="font-display font-bold text-[9px] leading-tight sm:text-xs md:text-xl text-foreground tracking-tight">
                SPIKE Forward
              </span>
            </div>
            <p className="text-[8px] sm:text-[10px] md:text-base text-muted-foreground leading-snug sm:leading-relaxed mb-1.5 sm:mb-2 md:mb-4">
              Giving retired SPIKE Prime kits a second chance to inspire 
              the next generation of innovators.
            </p>
            <Button asChild variant="outline" size="sm" className="text-[7px] sm:text-[10px] md:text-sm h-5 sm:h-6 md:h-9 px-1.5 sm:px-2 md:px-3 gap-0.5 sm:gap-1">
              <a href="https://www.seattlesolvers.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                Visit Seattle Solvers
              </a>
            </Button>
          </div>
          
          {/* Quick Links */}
          <div className="min-w-0">
            <h4 className="font-display font-bold text-[9px] sm:text-xs md:text-base text-foreground mb-1 sm:mb-2 md:mb-4">Quick Links</h4>
            <ul className="space-y-0 sm:space-y-0.5 md:space-y-2">
              <li>
                <Link to="/about" className="text-[8px] sm:text-[10px] md:text-base text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-[8px] sm:text-[10px] md:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Donate Kits
                </Link>
              </li>
              <li>
                <Link to="/donate-funds" className="text-[8px] sm:text-[10px] md:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Donate Funds
                </Link>
              </li>
              <li>
                <Link to="/spike-retirement" className="text-[8px] sm:text-[10px] md:text-base text-muted-foreground hover:text-foreground transition-colors">
                  SPIKE Retirement
                </Link>
              </li>
              <li>
                <Link to="/fair-market-value" className="text-[8px] sm:text-[10px] md:text-base text-muted-foreground hover:text-foreground transition-colors">
                  FMV Calculator
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[8px] sm:text-[10px] md:text-base text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/our-impact" className="text-[8px] sm:text-[10px] md:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Our Impact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="min-w-0">
            <h4 className="font-display font-bold text-[9px] sm:text-xs md:text-base text-foreground mb-1 sm:mb-2 md:mb-4">Contact Us</h4>
            <ul className="space-y-0.5 sm:space-y-1 md:space-y-3">
              <li className="flex items-start gap-1 sm:gap-1.5 md:gap-3 text-[8px] sm:text-[10px] md:text-base text-muted-foreground">
                <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
                <span className="break-all leading-tight">business@seattlesolvers.com</span>
              </li>
              <li className="flex items-center gap-1 sm:gap-1.5 md:gap-3 text-[8px] sm:text-[10px] md:text-base text-muted-foreground">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5 flex-shrink-0" />
                <span>Sammamish, WA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-spike-border pt-3 sm:pt-4 md:pt-8">
          <p className="text-[8px] sm:text-[10px] md:text-sm text-muted-foreground text-center">
            © 2025 SPIKE Forward. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
