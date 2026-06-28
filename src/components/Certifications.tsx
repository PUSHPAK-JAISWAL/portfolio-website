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
  const [items] = useContent<Certification>("certifications");

  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[06]</span> ~/certifications.cfg</span>
          <span>{items.length} verified</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ $ <span className="text-foreground">cat /etc/certs/*.cfg</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c, i) => (
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
                  className="mt-auto inline-flex items-center justify-center gap-1.5 border border-border px-2 py-1 hover:border-primary hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> verify
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
