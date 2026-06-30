import { Trophy, Award, Star, ExternalLink, Linkedin } from "lucide-react";
import { useContent } from "@/lib/content";

interface Achievement {
  title: string;
  description: string;
  icon: "trophy" | "award" | "star";
  tags?: string[];
  link?: string;
  linkedinPostUrl?: string;
}

const icons = { trophy: Trophy, award: Award, star: Star };

const Achievements = () => {
  const [items, , loading] = useContent<Achievement>("achievements");

  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[07]</span> ~/achievements.log</span>
          <span>{loading ? "loading…" : `${items.length} entries`}</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ $ <span className="text-foreground">grep "WIN" achievements.log</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-busy={loading} aria-live="polite">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="pane">
                <div className="pane-title"><span>[--] loading…</span><span>…</span></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 w-2/3 bg-secondary animate-pulse" />
                  <div className="h-3 w-full bg-secondary animate-pulse" />
                  <div className="h-3 w-3/4 bg-secondary animate-pulse" />
                </div>
              </div>
            ))
          : items.map((a, i) => {
              const Icon = icons[a.icon] ?? Trophy;
              return (
                <div key={i} className="pane flex flex-col animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="pane-title">
                    <span className="flex items-center gap-2">
                      <Icon className="w-3 h-3 text-gruv-yellow" aria-hidden="true" />
                      <span className="id">#{String(i + 1).padStart(2, "0")}</span>
                      <span>achievement</span>
                    </span>
                    <span className="text-gruv-aqua">● WIN</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-2 text-xs">
                    <div className="text-foreground font-bold text-sm">{a.title}</div>
                    <p className="text-muted-foreground leading-relaxed">{a.description}</p>
                    {a.tags && a.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {a.tags.map((t) => (
                          <span key={t} className="chip">#{t}</span>
                        ))}
                      </div>
                    )}
                    {(a.link || a.linkedinPostUrl) && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-border">
                        {a.link && (
                          <a
                            href={a.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open external link for achievement: ${a.title}`}
                            className="flex-1 min-w-[6rem] min-h-9 inline-flex items-center justify-center gap-1.5 border border-border px-2 py-1 hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" aria-hidden="true" /> open
                          </a>
                        )}
                        {a.linkedinPostUrl && (
                          <a
                            href={a.linkedinPostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open LinkedIn post for achievement: ${a.title}`}
                            className="flex-1 min-w-[6rem] min-h-9 inline-flex items-center justify-center gap-1.5 border border-border px-2 py-1 hover:border-gruv-blue hover:text-gruv-blue focus-visible:border-gruv-blue focus-visible:text-gruv-blue focus-visible:outline-none transition-colors"
                          >
                            <Linkedin className="w-3 h-3" aria-hidden="true" /> post
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default Achievements;
