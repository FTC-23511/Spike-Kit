import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Calculator, DollarSign, FileText, Info } from "lucide-react";
import { Link } from "react-router-dom";

const FairMarketValuePage = () => {
  const [kitQuantity, setKitQuantity] = useState<number>(1);
  const [kitCondition, setKitCondition] = useState<string>("");
  const [completeness, setCompleteness] = useState<string>("");
  const BASE_RETAIL_PRICE = 395;

  const getConditionMultiplier = (c: string) => {
    switch (c) {
      case "sealed": return 0.90;
      case "excellent": return 0.70;
      case "good": return 0.55;
      case "fair": return 0.40;
      default: return 0;
    }
  };

  const getCompletenessMultiplier = (c: string) => {
    switch (c) {
      case "complete": return 1.0;
      case "mostly": return 0.85;
      case "partial": return 0.60;
      default: return 0;
    }
  };

  const calculatedValue = kitCondition && completeness
    ? Math.round(BASE_RETAIL_PRICE * getConditionMultiplier(kitCondition) * getCompletenessMultiplier(completeness) * kitQuantity)
    : null;

  return (
    <div className="min-h-screen bg-background pt-14 sm:pt-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-card border-2 border-border rounded-full shadow-soft">
              <Calculator className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground">Tax Deduction Tool</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
              Fair Market Value <span className="text-gradient">Calculator</span>
            </h1>
            <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground max-w-xl mx-auto">
              Estimate the fair market value of your SPIKE Prime donation for tax deduction purposes.
            </p>
          </div>

          <Card className="border-2 border-border bg-card/80 backdrop-blur-sm shadow-card">
            <CardContent className="pt-4 sm:pt-5 md:pt-6 p-3 sm:p-4 md:p-6">
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-button flex items-center justify-center flex-shrink-0">
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-foreground" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="font-display font-semibold text-xs sm:text-sm md:text-base text-foreground">About This Calculator</h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
                    This calculator provides an <strong>estimate</strong> of fair market value based on condition 
                    and completeness. The SPIKE Prime retail price is approximately ${BASE_RETAIL_PRICE}. 
                    For tax purposes, you should keep records of your donation and consult with a tax professional 
                    for guidance on charitable deductions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border bg-card/80 backdrop-blur-sm shadow-elevated">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="font-display text-sm sm:text-base md:text-xl flex items-center gap-1.5 sm:gap-2">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                Calculate Your Donation Value
              </CardTitle>
              <CardDescription className="text-[10px] sm:text-xs md:text-sm">Enter details about your SPIKE Prime kit(s) to estimate fair market value.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 pt-0">
              <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                <Label className="text-xs sm:text-sm md:text-base font-medium">Number of Kits</Label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={kitQuantity}
                  onChange={(e) => setKitQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="border-border bg-background max-w-[100px] sm:max-w-[120px] text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                <Label className="text-xs sm:text-sm md:text-base font-medium">Kit Condition</Label>
                <RadioGroup value={kitCondition} onValueChange={setKitCondition} className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
                  {[
                    { value: "sealed", label: "Sealed", desc: "Factory sealed, unopened", multiplier: "90%" },
                    { value: "excellent", label: "Excellent", desc: "Like new, minimal use", multiplier: "70%" },
                    { value: "good", label: "Good", desc: "Light wear, fully functional", multiplier: "55%" },
                    { value: "fair", label: "Fair", desc: "Visible wear, works properly", multiplier: "40%" },
                  ].map((condition) => (
                    <div key={condition.value}>
                      <RadioGroupItem value={condition.value} id={`fmv-condition-${condition.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`fmv-condition-${condition.value}`}
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-border bg-background p-2 sm:p-3 md:p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent transition-all"
                      >
                        <span className="font-medium text-[10px] sm:text-xs md:text-sm">{condition.label}</span>
                        <span className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground text-center">{condition.desc}</span>
                        <span className="text-[8px] sm:text-[10px] md:text-xs text-primary font-medium mt-0.5 sm:mt-1">~{condition.multiplier} retail</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                <Label className="text-xs sm:text-sm md:text-base font-medium">Kit Completeness</Label>
                <RadioGroup value={completeness} onValueChange={setCompleteness} className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
                  {[
                    { value: "complete", label: "Complete", desc: "100% of parts included", multiplier: "100%" },
                    { value: "mostly", label: "Mostly Complete", desc: "85–99% of parts included", multiplier: "85%" },
                    { value: "partial", label: "Partial", desc: "50–84% of parts included", multiplier: "60%" },
                  ].map((comp) => (
                    <div key={comp.value}>
                      <RadioGroupItem value={comp.value} id={`fmv-comp-${comp.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`fmv-comp-${comp.value}`}
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-border bg-background p-2 sm:p-3 md:p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent transition-all"
                      >
                        <span className="font-medium text-[10px] sm:text-xs md:text-sm">{comp.label}</span>
                        <span className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground text-center">{comp.desc}</span>
                        <span className="text-[8px] sm:text-[10px] md:text-xs text-primary font-medium mt-0.5 sm:mt-1">{comp.multiplier}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {calculatedValue !== null && (
                <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-gradient-button border-2 border-border text-center space-y-1 sm:space-y-2">
                  <div className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground">Estimated Fair Market Value</div>
                  <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">
                    ${calculatedValue.toLocaleString()}
                  </div>
                  <div className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground">
                    For {kitQuantity} kit{kitQuantity > 1 ? 's' : ''} in {kitCondition} condition, {completeness} completeness
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-border bg-card/80 backdrop-blur-sm shadow-card">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="font-display text-sm sm:text-base md:text-xl flex items-center gap-1.5 sm:gap-2">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                Tax Deduction Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 md:space-y-4 text-[10px] sm:text-xs md:text-sm text-muted-foreground p-3 sm:p-4 md:p-6 pt-0">
              <p>
                <strong className="text-foreground">Charitable Contributions:</strong> Donations to qualified 
                501(c)(3) organizations may be tax-deductible. SPIKE Forward operates under Seattle Solvers, 
                a registered nonprofit organization.
              </p>
              <p>
                <strong className="text-foreground">Documentation:</strong> We will provide a donation receipt 
                upon completion of your donation. Keep this receipt along with your own records of the items 
                donated and their condition.
              </p>
              <p>
                <strong className="text-foreground">Disclaimer:</strong> This calculator provides estimates only 
                and should not be considered tax advice. Please consult with a qualified tax professional for 
                guidance on your specific situation.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button asChild variant="hero" size="default" className="text-[10px] sm:text-xs md:text-base">
              <Link to="/donate">Ready to Donate Your Kits</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairMarketValuePage;
