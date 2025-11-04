import { Github, Linkedin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.geeksforgeeks.org/user/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GeeksforGeeks">
                <Award className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Your Name. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
