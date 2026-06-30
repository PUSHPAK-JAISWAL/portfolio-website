import { ExternalLink } from "lucide-react";
import { useContent } from "@/lib/content";

interface Certification {
  name: string;
  issuer: string;
  date?: string;
  count?: number;
  url?: string;
}

const Certifications = () => {
  const [items, , loading] = useContent<Certification>("certifications");

  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[06]</span> ~/certifications.cfg</span>
          <span>{loading ? "loading…" : `${items.length} verified`}</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ $ <span className="text-foreground">cat /etc/certs/*.cfg</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy={loading} aria-live="polite">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="pane">
                <div className="pane-title"><span>[--] loading…</span><span>…</span></div>
                <div className="p-3 space-y-2">
                  <div className="h-3 w-3/4 bg-secondary animate-pulse" />
                  <div className="h-3 w-1/2 bg-secondary animate-pulse" />
                  <div className="h-6 w-full bg-secondary animate-pulse mt-2" />
                </div>
              </div>
            ))
          : items.map((c, i) => (
              <div key={i} className="pane flex flex-col animate-scale-up" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="pane-title">
                  <span><span className="id">#{String(i + 1).padStart(2, "0")}</span> {c.issuer}</span>
                  {c.date && <span>{c.date}</span>}
                </div>
                <div className="p-3 flex-1 flex flex-col gap-2 text-xs">
                  <div className="text-foreground font-medium line-clamp-2">{c.name}</div>
                  {c.count != null && (
                    <div className="text-gruv-yellow">[ × {c.count} {c.count === 1 ? "certificate" : "certificates"} ]</div>
                  )}
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify certificate: ${c.name}`}
                      className="mt-auto inline-flex items-center justify-center gap-1.5 border border-border px-2 py-1 min-h-9 hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" aria-hidden="true" /> verify
                    </a>
                  )}
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Certifications;
