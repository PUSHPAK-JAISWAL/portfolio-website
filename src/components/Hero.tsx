import { Github, Linkedin, Globe, Award, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Hero = () => {
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    fetch('https://api.github.com/users/PUSHPAK-JAISWAL')
      .then(res => res.json())
      .then(data => setProfilePhoto(data.avatar_url))
      .catch(() => setProfilePhoto(""));
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-primary/20 animate-scale-up">
          <AvatarImage src={profilePhoto} alt="Pushpak Jaiswal" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="gradient-text">Pushpak Jaiswal</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Full-Stack Developer & Software Engineer
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Motivated software engineer skilled in full-stack development (Java, Spring Boot, React) with
          expertise in Python, TensorFlow, and IoT solutions using Arduino.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/PUSHPAK-JAISWAL" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.linkedin.com/in/pushpak-jaiswal/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.geeksforgeeks.org/user/pushpakmoqg3/" target="_blank" rel="noopener noreferrer">
              <Globe className="w-4 h-4 mr-2" />
              GeeksforGeeks
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.hackerrank.com/skills-verification" target="_blank" rel="noopener noreferrer">
              <Award className="w-4 h-4 mr-2" />
              HackerRank
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://leetcode.com/u/pushpakmjaiswal/" target="_blank" rel="noopener noreferrer">
              <Code className="w-4 h-4 mr-2" />
              LeetCode
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
