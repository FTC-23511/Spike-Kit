import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, Users } from "lucide-react";

type Entity = Database['public']['Tables']['entities']['Row'];

const Robots = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEntityName, setNewEntityName] = useState("");
  const [newTeamNumber, setNewTeamNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (hasAccess) {
      const loadData = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("entities")
            .select("*")
            .order("created_at", { ascending: false });

          if (!isMounted) return;
          if (error) throw error;
          setEntities(data || []);
        } catch (error: any) {
          if (isMounted) {
            toast.error("Error fetching entities: " + error.message);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      loadData();
    }

    return () => {
      isMounted = false;
    };
  }, [hasAccess]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "SamosasAreSkibidi") {
      setHasAccess(true);
      toast.success("Access granted");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleCreateEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntityName.trim()) return;

    try {
      setIsSubmitting(true);
      const { data, error } = await supabase
        .from("entities")
        .insert({
          name: newEntityName,
          team_number: newTeamNumber ? parseInt(newTeamNumber) : null,
          location: null,
        } as any)
        .select();

      if (error) throw error;

      toast.success("Entity created successfully!");
      setNewEntityName("");
      setNewTeamNumber("");

      if (hasAccess) {
        // Refresh entities after creation if we have access
        const { data: refreshedData } = await supabase
          .from("entities")
          .select("*")
          .order("created_at", { ascending: false });
        if (refreshedData) setEntities(refreshedData);
      }
    } catch (error: any) {
      toast.error("Error creating entity: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-spike-light">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-button rounded-lg border border-spike-border">
            <Users className="w-6 h-6 text-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tighter shadow-sm">
            PRIVATE: Donor & Robot Database
          </h1>
        </div>

          <div className="lg:col-span-3">
            <Card className="border-spike-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-spike-border mb-4">
                <CardTitle className="text-xl">Donor Records</CardTitle>
                {hasAccess && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setHasAccess(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Lock Database
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {!hasAccess ? (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 py-12 max-w-sm mx-auto">
                    <div className="text-center space-y-2 mb-6">
                      <p className="text-lg font-medium">Access Restricted</p>
                      <p className="text-sm text-muted-foreground">Please enter the administrative password to view donor information.</p>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit">Unlock</Button>
                    </div>
                  </form>
                ) : loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-spike-primary" />
                  </div>
                ) : entities.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No donor records found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-spike-border bg-muted/30">
                          <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Donor Name</th>
                          <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Organization / Team</th>
                          <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Email</th>
                          <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Phone</th>
                          <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Kits</th>
                          <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Date Registered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entities.map((entity) => (
                          <tr key={entity.id} className="border-b border-spike-border last:border-0 hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 font-medium whitespace-nowrap">{entity.name}</td>
                            <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{entity.location || entity.team_number || "Individual"}</td>
                            <td className="py-3 px-4 text-sm whitespace-nowrap"><a href={`mailto:${entity.email}`} className="text-primary hover:underline">{entity.email || "-"}</a></td>
                            <td className="py-3 px-4 text-sm whitespace-nowrap">{entity.phone || "-"}</td>
                            <td className="py-3 px-4 text-sm max-w-xs truncate" title={entity.kit_summary || ""}>{entity.kit_summary || "-"}</td>
                            <td className="py-3 px-4 text-xs text-muted-foreground italic whitespace-nowrap">
                              {new Date(entity.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Robots;
