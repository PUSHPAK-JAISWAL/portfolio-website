import { useContent } from "@/lib/content";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
}

const Experience = () => {
  const [items] = useContent<ExperienceItem>("experience");

  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[04]</span> ~/experience.log</span>
          <span>{items.length} entries</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ $ <span className="text-foreground">tail -f experience.log</span>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((e, i) => (
          <div key={i} className="pane animate-slide-in-left" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="pane-title">
              <span>
                <span className="text-gruv-aqua">[{e.duration || "----"}]</span>{" "}
                <span className="text-gruv-yellow">{e.company}</span>
              </span>
              <span>{e.location}</span>
            </div>
            <div className="p-4 text-sm">
              <div className="text-primary font-bold mb-2">› {e.title}</div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {e.description?.map((d, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-gruv-orange">▶</span>
                    <span className="text-foreground/90">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
