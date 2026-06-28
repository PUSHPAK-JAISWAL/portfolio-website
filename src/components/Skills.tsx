import { useContent } from "@/lib/content";

type SkillCategory = { title: string; icon: string; skills: string[] };

const colors = ["text-gruv-orange", "text-gruv-aqua", "text-gruv-yellow", "text-gruv-blue", "text-gruv-purple"];

const Skills = () => {
  const [cats] = useContent<SkillCategory>("skills");

  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[02]</span> ~/skills.json</span>
          <span>read-only</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ $ <span className="text-foreground">cat skills.json | jq .</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cats.map((c, i) => (
          <div key={c.title + i} className="pane animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="pane-title">
              <span><span className="id">[{String(i + 1).padStart(2, "0")}]</span> {c.title.toLowerCase().replace(/\s+/g, "_")}</span>
              <span>{(c.skills || []).length} items</span>
            </div>
            <div className="p-4 text-xs">
              <div className={`${colors[i % colors.length]} font-bold mb-2 uppercase tracking-wider`}>// {c.title}</div>
              <ul className="space-y-1 text-muted-foreground">
                {(c.skills || []).map((s, j, arr) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-secondary-foreground/40">{j === arr.length - 1 ? "└─" : "├─"}</span>
                    <span className="text-foreground">{s}</span>
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

export default Skills;
