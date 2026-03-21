import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Donate from "./pages/Donate";
import DonateFunds from "./pages/DonateFunds";
import SpikeRetirement from "./pages/SpikeRetirement";
import FairMarketValue from "./pages/FairMarketValue";
import About from "./pages/About";
import HowItWorksPage from "./pages/HowItWorksPage";
import OurImpact from "./pages/OurImpact";
import Robots from "./pages/Robots";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/our-impact" element={<OurImpact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate-funds" element={<DonateFunds />} />
          <Route path="/spike-retirement" element={<SpikeRetirement />} />
          <Route path="/fair-market-value" element={<FairMarketValue />} />
          <Route path="/robots" element={<Robots />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
