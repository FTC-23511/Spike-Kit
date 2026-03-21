import { Button } from "@/components/ui/button";
import { Package, DollarSign, ExternalLink, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-spike-light/80 backdrop-blur-md border-b border-spike-border">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <a 
            href="https://www.seattlesolvers.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Seattle Solvers</span>
          </a>
          <div className="h-6 w-px bg-spike-border hidden sm:block" />
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-button border-2 border-spike-border flex items-center justify-center shadow-soft">
              <span className="font-display font-bold text-sm sm:text-lg text-foreground">SP</span>
            </div>
            <span className="font-display font-bold text-base sm:text-xl text-foreground tracking-tight">
              SPIKE Forward
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            Home
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            About
          </Link>
          <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            How It Works
          </Link>
          <Link to="/our-impact" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            Our Impact
          </Link>
        </nav>
        
        <div className="hidden sm:flex items-center gap-3">
          <Button asChild variant="hero" size="default">
            <Link to="/donate">
              <Package className="w-4 h-4" />
              Donate Kits
            </Link>
          </Button>
          <Button asChild variant="donate" size="default">
            <Link to="/donate-funds">
              <DollarSign className="w-4 h-4" />
              Donate Funds
            </Link>
          </Button>
        </div>

        {/* Mobile hamburger menu */}
        <div className="flex sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Menu className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about" className="w-full">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/how-it-works" className="w-full">How It Works</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/our-impact" className="w-full">Our Impact</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/donate" className="w-full flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Donate Kits
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/donate-funds" className="w-full flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Donate Funds
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
