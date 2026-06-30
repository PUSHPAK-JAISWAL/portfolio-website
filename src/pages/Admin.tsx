import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ContentKey, fetchContent, saveContent, clearContent } from "@/lib/content";
import { Download, Upload, Plus, Trash2, RotateCcw, Lock, ArrowLeft } from "lucide-react";

const ADMIN_PASSWORD_KEY = "portfolio_admin_pw";
const ADMIN_AUTH_KEY = "portfolio_admin_auth";
const DEFAULT_PASSWORD = "admin123"; // change on first login

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "list" | "select";
  options?: string[];
  placeholder?: string;
};

const SCHEMAS: Record<ContentKey, { label: string; fields: Field[]; newItem: () => any }> = {
  achievements: {
    label: "Achievements",
    fields: [
      { name: "title", label: "Title" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon", type: "select", options: ["trophy", "award", "star"] },
      { name: "tags", label: "Tags (comma separated)", type: "list" },
      { name: "link", label: "External Link", type: "url" },
      { name: "linkedinPostUrl", label: "LinkedIn Post URL", type: "url" },
    ],
    newItem: () => ({ title: "", description: "", icon: "trophy", tags: [] }),
  },
  certifications: {
    label: "Certifications",
    fields: [
      { name: "name", label: "Name" },
      { name: "issuer", label: "Issuer" },
      { name: "date", label: "Date" },
      { name: "count", label: "Count", type: "number" },
      { name: "url", label: "URL", type: "url" },
    ],
    newItem: () => ({ name: "", issuer: "" }),
  },
  experience: {
    label: "Experience",
    fields: [
      { name: "title", label: "Title" },
      { name: "company", label: "Company" },
      { name: "location", label: "Location" },
      { name: "duration", label: "Duration" },
      { name: "description", label: "Bullet points (one per line)", type: "list", placeholder: "Each line is a bullet" },
    ],
    newItem: () => ({ title: "", company: "", location: "", duration: "", description: [] }),
  },
  education: {
    label: "Education",
    fields: [
      { name: "degree", label: "Degree" },
      { name: "institution", label: "Institution" },
      { name: "duration", label: "Duration" },
      { name: "details", label: "Details", type: "textarea" },
    ],
    newItem: () => ({ degree: "", institution: "", duration: "" }),
  },
  skills: {
    label: "Skills",
    fields: [
      { name: "title", label: "Category Title" },
      { name: "icon", label: "Icon", type: "select", options: ["code", "cpu", "database", "wrench"] },
      { name: "skills", label: "Skills (comma separated)", type: "list" },
    ],
    newItem: () => ({ title: "", icon: "code", skills: [] }),
  },
  boot: {
    label: "Boot Loader",
    fields: [
      { name: "title", label: "TTY title line" },
      { name: "subtitle", label: "Subtitle (progress bar label)" },
      { name: "messages", label: "Boot messages (one per line, format: color|message — colors: aqua, yellow, red, orange, blue, purple, primary)", type: "list", placeholder: "aqua|Started Network Manager." },
    ],
    newItem: () => ({ title: "", subtitle: "", messages: [] }),
  },
  hero: {
    label: "Hero",
    fields: [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "tagline", label: "Tagline / Role" },
      { name: "bio", label: "Short Bio", type: "textarea" },
      { name: "host", label: "Host" },
      { name: "os", label: "OS" },
      { name: "shell", label: "Shell" },
      { name: "wm", label: "Window Manager" },
      { name: "theme", label: "Theme" },
      { name: "status", label: "Status" },
    ],
    newItem: () => ({ firstName: "", lastName: "", tagline: "", bio: "" }),
  },
};

function Editor({ contentKey }: { contentKey: ContentKey }) {
  const schema = SCHEMAS[contentKey];
  const [items, setItems] = useState<any[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchContent<any>(contentKey).then(setItems);
  }, [contentKey]);

  const commit = (next: any[]) => {
    setItems(next);
    saveContent(contentKey, next);
  };

  const isMultiline = (f: Field) => f.type === "list" && (f.name === "description" || f.name === "messages");

  const updateField = (idx: number, field: Field, value: any) => {
    const next = [...items];
    let v: any = value;
    if (field.type === "list") {
      v = isMultiline(field)
        ? value.split("\n").map((s: string) => s.trim()).filter(Boolean)
        : value.split(",").map((s: string) => s.trim()).filter(Boolean);
    } else if (field.type === "number") {
      v = value === "" ? undefined : Number(value);
    }
    next[idx] = { ...next[idx], [field.name]: v };
    commit(next);
  };

  const addItem = () => commit([schema.newItem(), ...items]);
  const removeItem = (idx: number) => commit(items.filter((_, i) => i !== idx));
  const moveItem = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    commit(next);
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contentKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded " + contentKey + ".json",
      description: `Replace public/content/${contentKey}.json in your repo and push to GitHub.`,
    });
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!Array.isArray(parsed)) throw new Error("Not an array");
        commit(parsed);
        toast({ title: "Imported", description: `${parsed.length} items loaded.` });
      } catch (e: any) {
        toast({ title: "Import failed", description: e.message, variant: "destructive" });
      }
    };
    reader.readAsText(file);
  };

  const reset = () => {
    if (!confirm("Discard local edits and reload from the deployed JSON file?")) return;
    clearContent(contentKey);
    fetchContent<any>(contentKey).then(setItems);
    toast({ title: "Reset to deployed JSON" });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={addItem} size="sm"><Plus className="w-4 h-4 mr-1" />Add new</Button>
        <Button onClick={download} size="sm" variant="secondary"><Download className="w-4 h-4 mr-1" />Download JSON</Button>
        <Button onClick={() => fileRef.current?.click()} size="sm" variant="secondary"><Upload className="w-4 h-4 mr-1" />Import JSON</Button>
        <Button onClick={reset} size="sm" variant="outline"><RotateCcw className="w-4 h-4 mr-1" />Reset to file</Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Edits save instantly in your browser so you can preview live. When done, click <strong>Download JSON</strong> and replace
        <code className="mx-1 px-1 rounded bg-muted">public/content/{contentKey}.json</code> in your GitHub repo to make it permanent for all visitors.
      </p>

      {items.map((item, idx) => (
        <Card key={idx} className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-muted-foreground">#{idx + 1}</div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => moveItem(idx, -1)}>↑</Button>
              <Button size="sm" variant="ghost" onClick={() => moveItem(idx, 1)}>↓</Button>
              <Button size="sm" variant="ghost" onClick={() => removeItem(idx)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>

          {schema.fields.map((field) => {
            const raw = item[field.name];
            const stringValue =
              field.type === "list"
                ? Array.isArray(raw)
                  ? (isMultiline(field) ? raw.join("\n") : raw.join(", "))
                  : ""
                : raw ?? "";

            return (
              <div key={field.name} className="space-y-1">
                <Label className="text-xs">{field.label}</Label>
                {field.type === "textarea" || (field.type === "list" && isMultiline(field)) ? (
                  <Textarea
                    value={stringValue}
                    onChange={(e) => updateField(idx, field, e.target.value)}
                    placeholder={field.placeholder}
                    rows={field.name === "messages" ? 10 : 3}
                  />
                ) : field.type === "select" ? (
                  <Select value={stringValue || field.options?.[0]} onValueChange={(v) => updateField(idx, field, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {field.options?.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    value={stringValue}
                    onChange={(e) => updateField(idx, field, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            );
          })}
        </Card>
      ))}

      {items.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No items yet. Click "Add new" to start.</p>
      )}
    </div>
  );
}

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_AUTH_KEY) === "1") setAuthed(true);
  }, []);

  const login = () => {
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (pw === stored) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "1");
      setAuthed(true);
    } else {
      toast({ title: "Wrong password", variant: "destructive" });
    }
  };

  const changePassword = () => {
    const next = prompt("Enter a new admin password (min 6 chars):");
    if (!next || next.length < 6) return;
    localStorage.setItem(ADMIN_PASSWORD_KEY, next);
    toast({ title: "Password updated", description: "Stored in this browser only." });
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 w-full max-w-md space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Admin Login</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter your admin password to continue.
          </p>
          <Input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          <Button className="w-full" onClick={login}>Login</Button>
          <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary">
            ← Back to site
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Content Admin</h1>
            <p className="text-sm text-muted-foreground">Edit your portfolio without touching code.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={changePassword}>Change password</Button>
            <Button variant="outline" size="sm" onClick={() => { sessionStorage.removeItem(ADMIN_AUTH_KEY); setAuthed(false); }}>Logout</Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/"><ArrowLeft className="w-4 h-4 mr-1" />Site</Link>
            </Button>
          </div>
        </div>

        <Card className="p-3 text-sm bg-primary/5 border-primary/30">
          <strong>How it works:</strong> Edits preview instantly in your browser. To publish permanently to GitHub Pages,
          click <em>Download JSON</em> on each tab and replace the matching file under <code>public/content/</code> in your repo.
        </Card>

        <Tabs defaultValue="achievements">
          <TabsList className="flex-wrap h-auto">
            {(Object.keys(SCHEMAS) as ContentKey[]).map((k) => (
              <TabsTrigger key={k} value={k}>{SCHEMAS[k].label}</TabsTrigger>
            ))}
          </TabsList>
          {(Object.keys(SCHEMAS) as ContentKey[]).map((k) => (
            <TabsContent key={k} value={k} className="mt-4">
              <Editor contentKey={k} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
