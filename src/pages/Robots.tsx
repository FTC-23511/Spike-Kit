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
            PROTECTED: Robots & Schools
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="border-spike-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl">Add New Entity</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateEntity} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name (Robot or School)</label>
                    <Input
                      placeholder="e.g. Iron Solvers"
                      value={newEntityName}
                      onChange={(e) => setNewEntityName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Team Number (Optional)</label>
                    <Input
                      type="number"
                      placeholder="e.g. 1234"
                      value={newTeamNumber}
                      onChange={(e) => setNewTeamNumber(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Add Entity
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-spike-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl">Existing Entities</CardTitle>
                {hasAccess && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setHasAccess(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Lock Section
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {!hasAccess ? (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 py-8 max-w-sm mx-auto">
                    <div className="text-center space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">This section is private. Please enter the password to view entities.</p>
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
                    No entities found. Add your first robot or school above!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-spike-border">
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Team #</th>
                          <th className="text-left py-3 px-4 font-medium">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entities.map((entity) => (
                          <tr key={entity.id} className="border-b border-spike-border last:border-0 hover:bg-white/50 transition-colors">
                            <td className="py-3 px-4 font-medium">{entity.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{entity.team_number || "-"}</td>
                            <td className="py-3 px-4 text-xs text-muted-foreground">
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
    </div>
  );
};

export default Robots;
