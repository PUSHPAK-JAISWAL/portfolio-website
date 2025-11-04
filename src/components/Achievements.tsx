import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trophy } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  date: string;
  link?: string;
  tags?: string[];
}

// Add your achievements here
const achievements: Achievement[] = [
  {
    title: "Example Achievement 1",
    description: "Brief description of your achievement. Replace this with your actual achievement details.",
    date: "2024",
    link: "https://example.com/achievement1",
    tags: ["Competition", "First Place"],
  },
  {
    title: "Example Achievement 2",
    description: "Another achievement description. Add your real achievements here.",
    date: "2023",
    link: "https://example.com/achievement2",
    tags: ["Hackathon", "Winner"],
  },
  // Add more achievements here
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Achievements</span>
        </h2>

        {achievements.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Trophy className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Add Your Achievements</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Update the <code className="px-2 py-1 bg-muted rounded">achievements</code> array in{" "}
              <code className="px-2 py-1 bg-muted rounded">Achievements.tsx</code> to showcase your accomplishments.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-accent/10 shrink-0">
                    <Trophy className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{achievement.title}</h3>
                        <span className="text-sm text-muted-foreground">{achievement.date}</span>
                      </div>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>

                    {achievement.tags && achievement.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {achievement.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    )}

                    {achievement.link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={achievement.link} target="_blank" rel="noopener noreferrer">
                          View Details
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
