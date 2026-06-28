import { useContent } from "@/lib/content";

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

const Education = () => {
  const [items] = useContent<EducationItem>("education");

  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[05]</span> ~/education.md</span>
          <span>{items.length} entries</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ $ <span className="text-foreground">cat education.md</span>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((e, i) => (
          <div key={i} className="pane animate-slide-in-right" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="pane-title">
              <span><span className="id">#{String(i + 1).padStart(2, "0")}</span> {e.institution}</span>
              <span>{e.duration}</span>
            </div>
            <div className="p-4 text-sm space-y-2">
              <div className="text-primary font-bold"># {e.degree}</div>
              {e.details && (
                <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-border pl-3">
                  {e.details}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
