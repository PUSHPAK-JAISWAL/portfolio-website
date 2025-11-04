import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText, Award } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold">
            Hi, I'm <span className="gradient-text">[Your Name]</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Full Stack Developer | Problem Solver | Tech Enthusiast
          </p>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          Passionate about building innovative solutions and creating exceptional user experiences.
          Specialized in modern web technologies and always eager to learn and grow.
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button onClick={() => scrollToSection("projects")} size="lg" className="gap-2">
            <Github className="w-4 h-4" />
            View Projects
          </Button>
          <Button onClick={() => scrollToSection("resume")} variant="outline" size="lg" className="gap-2">
            <FileText className="w-4 h-4" />
            Download Resume
          </Button>
        </div>

        <div className="flex gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.geeksforgeeks.org/user/yourusername" target="_blank" rel="noopener noreferrer">
              <Award className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
