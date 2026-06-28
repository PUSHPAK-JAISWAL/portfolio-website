import { Github, Linkedin, Globe, Award, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

const socials = [
  { icon: Github, label: "github", href: "https://github.com/PUSHPAK-JAISWAL", color: "text-gruv-aqua" },
  { icon: Linkedin, label: "linkedin", href: "https://www.linkedin.com/in/pushpak-jaiswal/", color: "text-gruv-blue" },
  { icon: Globe, label: "geeksforgeeks", href: "https://www.geeksforgeeks.org/user/pushpakmoqg3/", color: "text-gruv-yellow" },
  { icon: Award, label: "hackerrank", href: "https://www.hackerrank.com/skills-verification", color: "text-gruv-purple" },
  { icon: Code2, label: "leetcode", href: "https://leetcode.com/u/pushpakmjaiswal/", color: "text-gruv-orange" },
];

const Hero = () => {
  const [avatar, setAvatar] = useState("");
  const [stats, setStats] = useState<{ repos: number; followers: number } | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/PUSHPAK-JAISWAL")
      .then((r) => r.json())
      .then((d) => {
        setAvatar(d.avatar_url || "");
        setStats({ repos: d.public_repos ?? 0, followers: d.followers ?? 0 });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="animate-fade-in space-y-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Main hero pane */}
        <div className="pane col-span-12 lg:col-span-8 relative">
          <div className="pane-title">
            <span><span className="id">[01]</span> ~/hero.md</span>
            <span>-- INSERT --</span>
          </div>
          <div className="p-5 md:p-6 space-y-4">
            <div className="text-xs text-muted-foreground">
              <span className="text-gruv-aqua">pushpak@arch</span>
              <span className="text-muted-foreground"> ~ $ </span>
              <span>cat about.md</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="text-primary">Pushpak</span>{" "}
              <span className="text-foreground">Jaiswal</span>
              <span className="caret" />
            </h1>
            <p className="text-base md:text-lg text-gruv-aqua uppercase tracking-tight">
              &gt; Full-Stack Developer / Software Engineer
            </p>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Motivated engineer building full-stack systems with Java, Spring Boot, React,
              Python &amp; TensorFlow. IoT tinkerer with Arduino. Lives in the terminal.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 ${s.color} hover:underline underline-offset-2`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>[{s.label}]</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Avatar / neofetch pane */}
        <div className="pane col-span-12 lg:col-span-4">
          <div className="pane-title">
            <span><span className="id">[02]</span> ~/whoami</span>
            <span>●●●</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-3">
            <div className="w-28 h-28 border border-border bg-background overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Pushpak Jaiswal" className="w-full h-full object-cover grayscale-[15%]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-primary font-bold">PJ</div>
              )}
            </div>
            <div className="w-full text-[11px] space-y-0.5 leading-tight">
              <Row k="os" v="Arch Linux x86_64" />
              <Row k="host" v="pushpak.dev" />
              <Row k="shell" v="zsh 5.9" />
              <Row k="wm" v="i3-gaps" />
              <Row k="theme" v="gruvbox-dark" />
              <Row k="repos" v={stats ? String(stats.repos) : "..."} />
              <Row k="followers" v={stats ? String(stats.followers) : "..."} />
              <Row k="status" v="available" color="text-gruv-aqua" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Row = ({ k, v, color }: { k: string; v: string; color?: string }) => (
  <div className="flex justify-between gap-2">
    <span className="text-primary">{k}</span>
    <span className={`text-right ${color ?? "text-muted-foreground"}`}>{v}</span>
  </div>
);

export default Hero;
