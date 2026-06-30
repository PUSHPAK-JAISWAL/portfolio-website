import { useEffect, useState } from "react";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

const langColor: Record<string, string> = {
  JavaScript: "text-gruv-yellow",
  TypeScript: "text-gruv-blue",
  Python: "text-gruv-aqua",
  Java: "text-gruv-orange",
  HTML: "text-gruv-red",
  CSS: "text-gruv-purple",
};

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch("https://api.github.com/users/PUSHPAK-JAISWAL/repos?sort=updated&per_page=100");
        if (!r.ok) throw new Error("fetch failed");
        const data: Repository[] = await r.json();
        data.sort((a, b) =>
          b.stargazers_count !== a.stargazers_count
            ? b.stargazers_count - a.stargazers_count
            : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setRepos(data);
      } catch {
        toast({ title: "Error fetching projects", description: "Unable to load GitHub repos", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [toast]);

  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[03]</span> ~/projects.rs</span>
          <span>{loading ? "loading..." : `${repos.length} repos`}</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ ${" "}
          <span className="text-foreground">gh repo list --sort stars --limit 100</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true" aria-live="polite">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="pane">
              <div className="pane-title"><span>[--] loading…</span><span>…</span></div>
              <div className="p-3 space-y-2">
                <div className="h-3 w-3/4 bg-secondary animate-pulse" />
                <div className="h-3 w-1/2 bg-secondary animate-pulse" />
                <div className="h-3 w-2/3 bg-secondary animate-pulse" />
                <div className="flex gap-2 pt-2">
                  <div className="h-7 flex-1 bg-secondary animate-pulse" />
                  <div className="h-7 flex-1 bg-secondary animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <div key={repo.id} className="pane flex flex-col animate-slide-up" style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
              <div className="pane-title">
                <span><span className="id">#{String(i + 1).padStart(2, "0")}</span> {repo.name}</span>
                <span className="flex items-center gap-2 text-[10px]">
                  <Star className="w-3 h-3" /> {repo.stargazers_count}
                  <GitFork className="w-3 h-3 ml-1" /> {repo.forks_count}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col gap-2 text-xs">
                <p className="text-muted-foreground line-clamp-3 min-h-[3rem]">
                  {repo.description || "// no description"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {repo.language && (
                    <span className={`chip ${langColor[repo.language] ?? "text-gruv-aqua"} border-current/40`}>
                      ● {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 2).map((t) => (
                    <span key={t} className="chip">#{t}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto pt-2 border-t border-border">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 border border-border px-2 py-1 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Github className="w-3 h-3" /> code
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground px-2 py-1 hover:bg-accent transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
