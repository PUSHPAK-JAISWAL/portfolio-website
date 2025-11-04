import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trophy } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  date: string;
  link?: string;
  linkedinPostUrl?: string;
  tags?: string[];
}

// Add your achievements here
const achievements: Achievement[] = [
  // Example with LinkedIn post embed:
  // {
  //   title: "Achievement Title",
  //   description: "Brief description of your achievement",
  //   date: "2024",
  //   linkedinPostUrl: "https://www.linkedin.com/posts/...",
  //   tags: ["Tag1", "Tag2"],
  // },
  // Example with regular link:
  // {
  //   title: "Example Achievement",
  //   description: "Brief description",
  //   date: "2024",
  //   link: "https://example.com/achievement",
  //   tags: ["Competition", "Winner"],
  // },
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
              <Card key={index} className="p-6 card-hover animate-fade-in">
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

                    <div className="flex gap-2">
                      {achievement.linkedinPostUrl && (
                        <Button variant="default" size="sm" asChild>
                          <a href={achievement.linkedinPostUrl} target="_blank" rel="noopener noreferrer">
                            View LinkedIn Post
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
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
