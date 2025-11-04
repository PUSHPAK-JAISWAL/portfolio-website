import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Development Lead — Tech Support & Contributor",
    company: "AssetOpsBench (IBM)",
    location: "Remote",
    duration: "July 2025 – Present",
    description: [
      "Leading technical support efforts and contributing to AssetOpsBench — an IBM project focused on benchmarking and operational tooling",
      "Coordinating with cross-functional teams to integrate features and improve reliability",
    ],
  },
  {
    title: "Founder & Manager",
    company: "techAmigo (Open Source)",
    location: "Remote",
    duration: "July 2025 – Present",
    description: [
      "Started and currently managing the open-source organization techAmigo",
      "Launched the organization's first product: npx create-server-startup package to scaffold server starter projects quickly",
    ],
  },
  {
    title: "Intern",
    company: "PW Skills",
    location: "Remote, India",
    duration: "August 2024 – Present",
    description: [
      "Responsible for creating learning projects for full stack and AI/ML courses",
      "Developing comprehensive project materials to teach in their educational programs",
    ],
  },
];

const Experience = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Experience</span>
        </h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="p-6 card-hover animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="p-3 rounded-lg bg-primary/10 h-fit">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <p className="text-primary font-medium mb-1">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {exp.location} | {exp.duration}
                  </p>
                  <ul className="space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
