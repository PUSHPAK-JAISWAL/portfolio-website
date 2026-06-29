import { useEffect, useState } from "react";
import { Menu, X, TerminalSquare } from "lucide-react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";

type SectionKey =
  | "hero"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certifications"
  | "achievements"
  | "resume"
  | "contact";

const files: { key: SectionKey; name: string; ext: string; color: string }[] = [
  { key: "hero", name: "hero", ext: "md", color: "text-gruv-aqua" },
  { key: "skills", name: "skills", ext: "json", color: "text-gruv-yellow" },
  { key: "projects", name: "projects", ext: "rs", color: "text-gruv-blue" },
  { key: "experience", name: "experience", ext: "log", color: "text-gruv-purple" },
  { key: "education", name: "education", ext: "md", color: "text-gruv-aqua" },
  { key: "certifications", name: "certifications", ext: "cfg", color: "text-gruv-yellow" },
  { key: "achievements", name: "achievements", ext: "log", color: "text-gruv-purple" },
  { key: "resume", name: "resume", ext: "pdf", color: "text-gruv-red" },
  { key: "contact", name: "contact", ext: "sh", color: "text-gruv-orange" },
];

const renderers: Record<SectionKey, JSX.Element> = {
  hero: <Hero />,
  skills: <Skills />,
  projects: <Projects />,
  experience: <Experience />,
  education: <Education />,
  certifications: <Certifications />,
  achievements: <Achievements />,
  resume: <Resume />,
  contact: <Contact />,
};

const Index = () => {
  const [active, setActive] = useState<SectionKey>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const file = files.find((f) => f.key === active)!;
  const activeIdx = files.findIndex((f) => f.key === active);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable;
      if (!typing && (e.key === "`" || (e.ctrlKey && e.key === "`"))) {
        e.preventDefault();
        setTermOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono text-sm">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "fixed inset-y-0 left-0 z-50 w-64" : "hidden"
          } md:flex md:static md:w-64 bg-card border-r border-border flex-col shrink-0`}
        >
          <div className="p-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold border-b border-border flex justify-between items-center">
            <span>Explorer</span>
            <button
              className="md:hidden text-muted-foreground hover:text-primary"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3 text-xs space-y-1.5 flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 text-primary">
              <span>▾</span>
              <span className="font-bold">~/portfolio</span>
            </div>
            <div className="pl-2 space-y-0.5">
              {files.map((f, i) => {
                const last = i === files.length - 1;
                const isActive = f.key === active;
                return (
                  <button
                    key={f.key}
                    onClick={() => {
                      setActive(f.key);
                      setSidebarOpen(false);
                    }}
                    className={`group w-full flex items-center gap-2 px-1.5 py-0.5 text-left transition-colors ${
                      isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/60"
                    }`}
                  >
                    <span className="text-muted-foreground">{last ? "└─" : "├─"}</span>
                    <span className={f.color}>
                      {f.name}.{f.ext}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 border-t border-border text-[10px] text-muted-foreground space-y-1">
            <div className="flex items-center justify-between">
              <span>LF UTF-8</span>
              <span className="text-gruv-aqua">● online</span>
            </div>
            <div className="flex items-center justify-between">
              <span>main</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main editor */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Tab bar */}
          <div className="flex items-stretch bg-card border-b border-border h-9 shrink-0 overflow-x-auto">
            <button
              className="md:hidden px-3 border-r border-border text-muted-foreground hover:text-primary"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center px-3 bg-background border-r border-border border-t-2 border-t-primary text-xs">
              <span className={`mr-2 ${file.color}`}>#</span>
              <span className="font-medium">
                {file.name}.{file.ext}
              </span>
              <span className="ml-3 text-muted-foreground hover:text-destructive cursor-pointer">×</span>
            </div>
            <div className="hidden sm:flex items-center ml-auto px-3 text-[10px] text-muted-foreground gap-3">
              <span><span className="key mr-1">↑↓</span> navigate</span>
              <button
                onClick={() => setTermOpen((o) => !o)}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                aria-label="Toggle terminal"
              >
                <TerminalSquare className="w-3 h-3" />
                <span className="key">`</span> terminal
              </button>
              <span><span className="key mr-1">/admin</span> edit</span>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="px-3 py-1.5 bg-background border-b border-border text-[11px] text-muted-foreground flex items-center justify-between">
            <div>
              ~ <span className="mx-1">›</span> portfolio <span className="mx-1">›</span>{" "}
              <span className="text-foreground">
                {file.name}.{file.ext}
              </span>
            </div>
            <div className="hidden md:flex gap-3 text-[10px]">
              <span>Ln {String(activeIdx + 1).padStart(2, "0")}</span>
              <span>Col 01</span>
              <span className="text-gruv-aqua">UTF-8</span>
            </div>
          </div>

          {/* Content */}
          <div key={active} className="flex-1 overflow-y-auto bg-background relative animate-fade-in">
            {/* Line-number gutter */}
            <div className="absolute left-0 top-0 bottom-0 w-10 border-r border-border bg-background text-muted-foreground/40 text-[10px] flex flex-col items-end pr-1 pt-4 select-none pointer-events-none">
              {Array.from({ length: 80 }).map((_, i) => (
                <span key={i} className="leading-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
            <div className="pl-12 pr-3 py-4 md:pr-6">{renderers[active]}</div>
          </div>

          {/* Status line (polybar) */}
          <div className="h-7 shrink-0 bg-primary text-primary-foreground text-[10px] flex items-center justify-between px-3 font-bold">
            <div className="flex items-center gap-3">
              <span>NORMAL</span>
              <span className="opacity-70">{file.name}.{file.ext}</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>utf-8</span>
              <span>jetbrains-mono</span>
              <span>{activeIdx + 1}/{files.length}</span>
            </div>
          </div>

          <Footer />
        </main>
      </div>
      <Terminal
        open={termOpen}
        onClose={() => setTermOpen(false)}
        files={files}
        active={active}
        onNavigate={(k) => setActive(k as SectionKey)}
      />
    </div>
  );
};

export default Index;
