import { Code, Database, Wrench, Cpu, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useContent } from "@/lib/content";

type SkillCategory = {
  title: string;
  icon: string;
  skills: string[];
};

const ICONS: Record<string, LucideIcon> = {
  code: Code,
  cpu: Cpu,
  database: Database,
  wrench: Wrench,
};

const Skills = () => {
  const [skillCategories] = useContent<SkillCategory>("skills");

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Skills & Expertise</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = ICONS[category.icon] || Code;
            return (
              <Card
                key={category.title + index}
                className="p-6 card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(category.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
