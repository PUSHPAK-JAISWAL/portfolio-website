import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/PUSHPAK-JAISWAL/repos?sort=updated&per_page=100');
        
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const data = await response.json();
        
        // Sort by stars first (descending), then by most recent update
        const sortedRepos = data.sort((a: Repository, b: Repository) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
        
        setRepos(sortedRepos);
      } catch (error) {
        toast({
          title: "Error fetching projects",
          description: "Unable to load GitHub repositories",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [toast]);

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Featured Projects</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 h-64 animate-pulse bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <Card key={repo.id} className="p-6 card-hover flex flex-col">
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{repo.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {repo.description || "No description available"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <Badge variant="secondary">{repo.language}</Badge>
                    )}
                    {repo.topics?.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="outline">{topic}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 mt-4 border-t">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {repo.homepage && (
                    <Button size="sm" asChild className="flex-1">
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <a href="https://github.com/PUSHPAK-JAISWAL" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
