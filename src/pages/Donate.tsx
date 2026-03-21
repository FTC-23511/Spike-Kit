import { useState, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, CheckCircle2, Calculator, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const CONDITIONS = [
  { value: "sealed", label: "Sealed", mult: 0.90 },
  { value: "mint", label: "Mint", mult: 0.75 },
  { value: "good", label: "Good", mult: 0.60 },
  { value: "fair", label: "Fair", mult: 0.45 },
  { value: "parts", label: "Parts Only", mult: 0 },
] as const;

const COMPLETENESS = [
  { value: "complete", label: "Complete (100%)", mult: 1.0 },
  { value: "mostly", label: "Mostly Complete (85–99%)", mult: 0.85 },
  { value: "partial", label: "Partial (50–84%)", mult: 0.60 },
] as const;

const PARTS_LIST = [
  "Large Hub", "Hub Battery", "Large Motor", "Medium Motor",
  "Color Sensor", "Ultrasonic Sensor", "Force (Touch) Sensor",
] as const;

const BASE_RETAIL_PRICE = 395;

interface KitLine {
  id: string;
  quantity: number;
  condition: string;
  completeness: string;
  includesExpansion: boolean;
  selectedParts: string[];
}

const createKitLine = (): KitLine => ({
  id: crypto.randomUUID(),
  quantity: 1,
  condition: "",
  completeness: "",
  includesExpansion: false,
  selectedParts: [],
});

const calculateLineValue = (line: KitLine): number => {
  if (line.quantity < 1) return 0;
  if (line.condition === "parts") {
    return line.selectedParts.length * 40 * line.quantity;
  }
  const condMult = CONDITIONS.find(c => c.value === line.condition)?.mult || 0;
  const compMult = COMPLETENESS.find(c => c.value === line.completeness)?.mult || 0;
  let value = BASE_RETAIL_PRICE * condMult * compMult * line.quantity;
  if (line.includesExpansion) value += 100 * line.quantity;
  return Math.round(value);
};

const isLineFilled = (line: KitLine): boolean => {
  if (!line.condition) return false;
  if (line.condition === "parts") return line.selectedParts.length > 0;
  return !!line.completeness;
};

const donateFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().optional(),
  organization: z.string().trim().max(100).optional(),
  shippingPreference: z.string().min(1, "Please select shipping preference"),
  additionalNotes: z.string().trim().max(500).optional(),
  wantsDonorRecognition: z.boolean().default(false),
});

type DonateFormValues = z.infer<typeof donateFormSchema>;

// -- Kit Line Row Component --
const KitLineRow = ({
  line,
  onChange,
  onRemove,
  canRemove,
}: {
  line: KitLine;
  onChange: (updated: KitLine) => void;
  onRemove: () => void;
  canRemove: boolean;
}) => {
  const update = (patch: Partial<KitLine>) => onChange({ ...line, ...patch });

  return (
    <div className={`space-y-3 rounded-lg border-2 bg-background p-4 ${!isLineFilled(line) && line.condition ? 'border-destructive/50' : 'border-border'}`}>
      {/* Main row: quantity | condition | completeness | remove */}
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          type="number"
          min={1}
          max={100}
          value={line.quantity}
          onChange={(e) => update({ quantity: Math.max(1, parseInt(e.target.value) || 1) })}
          className="border-border bg-background w-20 flex-shrink-0"
          aria-label="Quantity"
        />
        <span className="text-sm text-muted-foreground flex-shrink-0">×</span>
        <Select value={line.condition} onValueChange={(v) => update({ condition: v, completeness: v === "parts" ? "" : line.completeness, selectedParts: v === "parts" ? line.selectedParts : [] })}>
          <SelectTrigger className="border-border bg-background flex-1 min-w-[140px]">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            {CONDITIONS.map((c) => (
              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {line.condition && line.condition !== "parts" && (
          <Select value={line.completeness} onValueChange={(v) => update({ completeness: v })}>
            <SelectTrigger className="border-border bg-background flex-1 min-w-[180px]">
              <SelectValue placeholder="Completeness" />
            </SelectTrigger>
            <SelectContent>
              {COMPLETENESS.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {canRemove && (
          <Button type="button" variant="ghost" size="icon" onClick={onRemove} className="flex-shrink-0 text-muted-foreground hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Expansion kit checkbox */}
      {line.condition && line.condition !== "parts" && (
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <Checkbox checked={line.includesExpansion} onCheckedChange={(v) => update({ includesExpansion: !!v })} />
          Includes Expansion Kit (45681)
        </label>
      )}

      {/* Parts checklist */}
      {line.condition === "parts" && (
        <div className="grid sm:grid-cols-2 gap-2 pt-1">
          {PARTS_LIST.map((part) => (
            <label key={part} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox
                checked={line.selectedParts.includes(part)}
                onCheckedChange={(checked) => {
                  const parts = checked
                    ? [...line.selectedParts, part]
                    : line.selectedParts.filter((p) => p !== part);
                  update({ selectedParts: parts });
                }}
              />
              {part}
            </label>
          ))}
        </div>
      )}

      {/* Line value */}
      {isLineFilled(line) && (
        <div className="text-sm text-muted-foreground text-right">
          Est. value: <span className="font-semibold text-foreground">${calculateLineValue(line).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/nmoylmlishqdue53an5d5rzykoqet3qh";

// -- Main Page --
const DonatePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [kitLines, setKitLines] = useState<KitLine[]>(() => [createKitLine()]);
  const kitLinesRef = useRef<KitLine[]>(kitLines);

  const form = useForm<DonateFormValues>({
    resolver: zodResolver(donateFormSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", phone: "", organization: "",
      shippingPreference: "", additionalNotes: "", wantsDonorRecognition: false,
    },
  });

  const totalKits = kitLines.reduce((s, l) => s + l.quantity, 0);
  const estimatedValue = useMemo(
    () => kitLines.reduce((s, l) => s + calculateLineValue(l), 0),
    [kitLines]
  );
  const showDonorRecognition = totalKits >= 1 || estimatedValue > 400;
  const allLinesFilled = kitLines.every(isLineFilled);

  const updateKitLines = (updater: (prev: KitLine[]) => KitLine[]) => {
    setKitLines((prev) => {
      const next = updater(prev);
      kitLinesRef.current = next;
      return next;
    });
  };

  const updateLine = (id: string, updated: KitLine) =>
    updateKitLines((prev) => prev.map((l) => (l.id === id ? updated : l)));
  const removeLine = (id: string) =>
    updateKitLines((prev) => prev.filter((l) => l.id !== id));
  const addLine = () => updateKitLines((prev) => [...prev, createKitLine()]);

  const onSubmit = async (data: DonateFormValues) => {
    const currentKitLines = kitLinesRef.current;
    const currentAllLinesFilled = currentKitLines.every(isLineFilled);

    if (!currentAllLinesFilled) {
      const missingDetails = currentKitLines
        .map((line, index) => {
          const missing: string[] = [];
          if (!line.condition) missing.push("condition");
          if (line.condition === "parts" && line.selectedParts.length === 0) missing.push("parts selection");
          if (line.condition && line.condition !== "parts" && !line.completeness) missing.push("completeness");
          return missing.length ? `Line ${index + 1}: ${missing.join(" + ")}` : null;
        })
        .filter(Boolean)
        .join(" • ");

      toast({
        title: "Incomplete",
        description: missingDetails || "Please complete every kit line before submitting.",
        variant: "destructive"
      });
      return;
    }

    const kitSummary = currentKitLines.map((l) => {
      const condLabel = CONDITIONS.find(c => c.value === l.condition)?.label || l.condition;
      const compLabel = COMPLETENESS.find(c => c.value === l.completeness)?.label || "";
      if (l.condition === "parts") {
        return `${l.quantity}x ${condLabel} (${l.selectedParts.join(", ")})`;
      }
      return `${l.quantity}x ${condLabel} / ${compLabel}${l.includesExpansion ? " + Expansion" : ""}`;
    });

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || "",
      organization: data.organization || "",
      kitNumbers: kitSummary.join("; "),
      condition: currentKitLines.map((l) => CONDITIONS.find(c => c.value === l.condition)?.label || l.condition).join("; "),
      shippingMethod: data.shippingPreference,
      additionalNotes: data.additionalNotes || "",
    };

    try {
      // 1. Submit to Make Webhook (keep existing logic)
      const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        console.warn(`Webhook submission failed: ${webhookResponse.statusText}`);
      }

      // 2. Submit to Supabase
      // First, create or find the entity (donor)
      const { data: entityData, error: entityError } = await supabase
        .from("entities")
        .insert({
          name: `${data.firstName} ${data.lastName}`,
          location: data.organization || "Individual",
          team_number: data.organization && !isNaN(parseInt(data.organization)) ? parseInt(data.organization) : null,
        })
        .select()
        .single();

      if (entityError) throw entityError;

      // Then, create the report (donation details)
      const { error: reportError } = await supabase
        .from("reports")
        .insert({
          entity_id: entityData.id,
          data: {
            email: data.email,
            phone: data.phone || "",
            kitSummary: kitSummary,
            shippingMethod: data.shippingPreference,
            wantsDonorRecognition: data.wantsDonorRecognition,
          } as any,
          notes: data.additionalNotes || "",
        });

      if (reportError) throw reportError;

      setIsSubmitted(true);
      toast({ title: "Donation Registered!", description: "Thank you for your generous donation. We'll be in touch soon." });
    } catch (err) {
      console.error("Submission error:", err);
      toast({ 
        title: "Submission Error", 
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-2 border-border bg-card shadow-elevated">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-button flex items-center justify-center border-2 border-border">
              <CheckCircle2 className="w-10 h-10 text-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl text-foreground">Thank You!</h2>
              <p className="text-muted-foreground">
                Your donation has been registered. Our team will contact you within 2-3 business days with shipping instructions.
              </p>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-14 sm:pt-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-card border-2 border-border rounded-full shadow-soft">
              <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground">Donate Your Kits</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
              Kit <span className="text-gradient">Donations</span>
            </h1>
            <p className="text-[11px] sm:text-sm md:text-lg text-muted-foreground max-w-xl mx-auto">
              All donations are tax-exempt based on fair market value calculated upon submission. A receipt will be provided to you once we have received and processed your kits.
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-2 border-border bg-card/80 backdrop-blur-sm shadow-elevated">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="font-display text-sm sm:text-base md:text-xl">Kit Donations</CardTitle>
              <CardDescription className="text-[10px] sm:text-xs md:text-sm">
                All donations are tax-exempt based on fair market value calculated upon submission. A receipt will be provided to you once we have received and processed your kits.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 md:space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold text-lg text-foreground border-b border-border pb-2">
                      Your Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl><Input placeholder="John" {...field} className="border-border bg-background" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl><Input placeholder="Doe" {...field} className="border-border bg-background" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input type="email" placeholder="john@example.com" {...field} className="border-border bg-background" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} className="border-border bg-background" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="organization" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization (Optional)</FormLabel>
                          <FormControl><Input placeholder="School or Team Name" {...field} className="border-border bg-background" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Kit Lines */}
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold text-lg text-foreground border-b border-border pb-2">
                      Kit Information
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add one line per kit type. Select condition and completeness, then set the quantity.
                    </p>
                    <div className="space-y-3">
                      {kitLines.map((line) => (
                        <KitLineRow
                          key={line.id}
                          line={line}
                          onChange={(updated) => updateLine(line.id, updated)}
                          onRemove={() => removeLine(line.id)}
                          canRemove={kitLines.length > 1}
                        />
                      ))}
                    </div>
                    {allLinesFilled && (
                      <Button type="button" variant="outline" size="sm" onClick={addLine} className="gap-1">
                        <Plus className="w-4 h-4" /> Add Another Kit Type
                      </Button>
                    )}
                  </div>

                  {/* Fair Market Value Estimate */}
                  {estimatedValue > 0 && (
                    <div className="p-4 rounded-xl bg-gradient-button border-2 border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calculator className="w-5 h-5 text-foreground" />
                          <div>
                            <div className="font-display font-semibold text-foreground">Estimated Fair Market Value</div>
                            <div className="text-xs text-muted-foreground">For tax deduction purposes · {totalKits} kit{totalKits !== 1 ? 's' : ''} total</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-display font-bold text-2xl text-foreground">${estimatedValue.toLocaleString()}</div>
                          <Link to="/fair-market-value" className="text-xs text-primary hover:underline">Learn more →</Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold text-lg text-foreground border-b border-border pb-2">
                      Shipping Preference
                    </h3>
                    <FormField control={form.control} name="shippingPreference" render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>How would you like to send your kits? *</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border-border bg-background">
                              <SelectValue placeholder="Select shipping method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="prepaid">Send me a prepaid label</SelectItem>
                            <SelectItem value="pickup">Schedule a pickup</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Additional Notes */}
                  <FormField control={form.control} name="additionalNotes" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any additional information about your donation..." {...field} className="border-border bg-background min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Donor Recognition */}
                  {showDonorRecognition && (
                    <FormField control={form.control} name="wantsDonorRecognition" render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border-2 border-primary/30 bg-accent/30 p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer">
                          I would like to be listed on the donors page for this program.
                        </FormLabel>
                      </FormItem>
                    )} />
                  )}

                  <Button type="submit" variant="donate" size="xl" className="w-full">
                    Submit Donation
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
