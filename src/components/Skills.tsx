import { Card } from "@/components/ui/card";
import { Code2, Database, Layout, Server } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML/CSS"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "REST APIs", "GraphQL"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    title: "Tools & Others",
    icon: Code2,
    skills: ["Git", "Docker", "AWS", "CI/CD", "Testing"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Skills & Expertise</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.title} 
                className="p-6 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
