import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Award, Star, ExternalLink } from "lucide-react";
import { useContent } from "@/lib/content";

interface Achievement {
  title: string;
  description: string;
  icon: "trophy" | "award" | "star";
  tags?: string[];
  link?: string;
  linkedinPostUrl?: string;
}

const iconComponents = { trophy: Trophy, award: Award, star: Star };

const Achievements = () => {
  const [achievements] = useContent<Achievement>("achievements");

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Achievements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = iconComponents[achievement.icon] ?? Trophy;
            return (
              <Card
                key={index}
                className="p-6 card-hover flex flex-col animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 h-fit">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

                    {achievement.tags && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {achievement.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {(achievement.link || achievement.linkedinPostUrl) && (
                      <div className="flex gap-2">
                        {achievement.link && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={achievement.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View
                            </a>
                          </Button>
                        )}
                        {achievement.linkedinPostUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={achievement.linkedinPostUrl} target="_blank" rel="noopener noreferrer">
                              LinkedIn Post
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
