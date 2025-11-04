import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

const education: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "CSMSS Chh. Shahu College of Engineering",
    duration: "2023 – 2027",
  },
  {
    degree: "12th (Science: PCMB)",
    institution: "Deogiri Junior College Chh. Sambhaji Nagar",
    duration: "2021 – 2023",
  },
  {
    degree: "10th (ICSE)",
    institution: "Podar International School",
    duration: "2011 – 2021",
  },
];

const Education = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Education</span>
        </h2>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="p-6 card-hover animate-slide-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="p-3 rounded-lg bg-accent/10 h-fit">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-accent font-medium mb-1">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.duration}</p>
                  {edu.details && (
                    <p className="text-sm text-muted-foreground mt-2">{edu.details}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
