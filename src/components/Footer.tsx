import { Github, Linkedin, Award, Code2, Trophy } from "lucide-react";

const links = [
  { href: "https://github.com/PUSHPAK-JAISWAL", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/pushpak-jaiswal/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.geeksforgeeks.org/user/pushpakmoqg3/", icon: Award, label: "GeeksforGeeks" },
  { href: "https://www.hackerrank.com/profile/pushpakmjaiswal", icon: Trophy, label: "HackerRank" },
  { href: "https://leetcode.com/u/pushpakmjaiswal/", icon: Code2, label: "LeetCode" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card px-4 py-4 text-[11px] text-muted-foreground">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-primary">©</span> {year} pushpak-jaiswal · built with{" "}
          <span className="text-gruv-aqua">react</span> + <span className="text-gruv-yellow">tailwind</span> ·{" "}
          <span className="text-gruv-orange">gruvbox</span>
        </div>
        <div className="flex gap-3">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className="hover:text-primary transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
