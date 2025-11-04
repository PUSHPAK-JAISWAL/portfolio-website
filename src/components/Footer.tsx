import { Github, Linkedin, Award, Code2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/PUSHPAK-JAISWAL" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/pushpak-jaiswal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.geeksforgeeks.org/user/pushpakmoqg3/" target="_blank" rel="noopener noreferrer" aria-label="GeeksforGeeks">
                <Award className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.hackerrank.com/skills-verification" target="_blank" rel="noopener noreferrer" aria-label="HackerRank">
                <Trophy className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://leetcode.com/u/pushpakmjaiswal/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                <Code2 className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Pushpak Jaiswal. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
