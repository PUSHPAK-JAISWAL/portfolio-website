import { Github, Linkedin, Globe, Award, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useContent } from "@/lib/content";

const socials = [
  { icon: Github, label: "github", href: "https://github.com/PUSHPAK-JAISWAL", color: "text-gruv-aqua" },
  { icon: Linkedin, label: "linkedin", href: "https://www.linkedin.com/in/pushpak-jaiswal/", color: "text-gruv-blue" },
  { icon: Globe, label: "geeksforgeeks", href: "https://www.geeksforgeeks.org/user/pushpakmoqg3/", color: "text-gruv-yellow" },
  { icon: Award, label: "hackerrank", href: "https://www.hackerrank.com/profile/pushpakmjaiswal", color: "text-gruv-purple" },
  { icon: Code2, label: "leetcode", href: "https://leetcode.com/u/pushpakmjaiswal/", color: "text-gruv-orange" },
];

type HeroData = {
  firstName?: string;
  lastName?: string;
  tagline?: string;
  bio?: string;
  host?: string;
  os?: string;
  shell?: string;
  wm?: string;
  theme?: string;
  status?: string;
};

const ARCH_ASCII = `       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`;

const Hero = () => {
  const [heroList] = useContent<HeroData>("hero");
  const data = heroList[0] || {};
  const firstName = data.firstName || "Pushpak";
  const lastName = data.lastName || "Jaiswal";
  const tagline = data.tagline || "Full-Stack Developer";
  const bio = data.bio || "";
  const user = (firstName || "user").toLowerCase();
  const host = (data.host || "arch").split(".")[0];

  const [avatar, setAvatar] = useState("");
  const [stats, setStats] = useState<{ repos: number; followers: number } | null>(null);
  const [typed, setTyped] = useState("");
  const cmd = `cat about.md`;

  useEffect(() => {
    fetch("https://api.github.com/users/PUSHPAK-JAISWAL")
      .then((r) => r.json())
      .then((d) => {
        setAvatar(d.avatar_url || "");
        setStats({ repos: d.public_repos ?? 0, followers: d.followers ?? 0 });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
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
              <span className="text-gruv-aqua">{user}@{host}</span>
              <span className="text-muted-foreground"> ~ $ </span>
              <span>{typed}</span>
              {typed.length < cmd.length && <span className="caret-thin" />}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight animate-slide-up">
              <span className="text-primary">{firstName}</span>{" "}
              <span className="text-foreground">{lastName}</span>
              <span className="caret" />
            </h1>
            <p className="text-base md:text-lg text-gruv-aqua uppercase tracking-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
              &gt; {tagline}
            </p>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {bio}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs animate-slide-up" style={{ animationDelay: "0.3s" }}>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 ${s.color} hover:underline underline-offset-2 transition-transform hover:translate-x-0.5`}
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
        <div className="pane col-span-12 lg:col-span-4 animate-slide-in-right">
          <div className="pane-title">
            <span><span className="id">[02]</span> ~/whoami</span>
            <span>●●●</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-3">
            <div className="w-28 h-28 border border-border bg-background overflow-hidden hover:border-primary transition-colors">
              {avatar ? (
                <img src={avatar} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover grayscale-[15%]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-primary font-bold">
                  {firstName[0]}{lastName[0]}
                </div>
              )}
            </div>
            <div className="w-full text-[11px] space-y-0.5 leading-tight">
              <Row k="user" v={`${user}@${host}`} />
              <Row k="os" v={data.os || "Arch Linux x86_64"} />
              <Row k="shell" v={data.shell || "zsh 5.9"} />
              <Row k="wm" v={data.wm || "i3-gaps"} />
              <Row k="theme" v={data.theme || "gruvbox-dark"} />
              <Row k="repos" v={stats ? String(stats.repos) : "..."} />
              <Row k="followers" v={stats ? String(stats.followers) : "..."} />
              <Row k="status" v={data.status || "available"} color="text-gruv-aqua" />
            </div>
          </div>
        </div>

        {/* Fastfetch ASCII pane */}
        <div className="pane col-span-12 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="pane-title">
            <span><span className="id">[03]</span> $ fastfetch</span>
            <span className="text-gruv-aqua">● 0ms</span>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 items-start">
            <pre className="text-primary text-[10px] md:text-xs leading-tight whitespace-pre select-none">{ARCH_ASCII}</pre>
            <div className="text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5">
              <Row k="kernel" v="6.10.4-arch1-1" />
              <Row k="uptime" v="∞ since 2002" />
              <Row k="packages" v="1337 (pacman)" />
              <Row k="terminal" v="kitty 0.36.4" />
              <Row k="cpu" v="Intel(R) Brain @ 4.2GHz" />
              <Row k="gpu" v="Java + Spring Boot" />
              <Row k="memory" v="∞ / ∞ MiB" />
              <Row k="locale" v="en_IN.UTF-8" />
              <Row k="editor" v="nvim + vscode" />
              <Row k="font" v="JetBrains Mono" />
            </div>
          </div>
          <div className="px-4 pb-3 pt-1 flex gap-1.5 flex-wrap text-[10px]">
            <span className="w-4 h-3 bg-gruv-red" />
            <span className="w-4 h-3 bg-gruv-orange" />
            <span className="w-4 h-3 bg-gruv-yellow" />
            <span className="w-4 h-3 bg-gruv-aqua" />
            <span className="w-4 h-3 bg-gruv-blue" />
            <span className="w-4 h-3 bg-gruv-purple" />
            <span className="ml-2 text-muted-foreground">press <span className="key">`</span> to open terminal</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Row = ({ k, v, color }: { k: string; v: string; color?: string }) => (
  <div className="flex justify-between gap-2">
    <span className="text-primary">{k}</span>
    <span className={`text-right truncate ${color ?? "text-muted-foreground"}`}>{v}</span>
  </div>
);

export default Hero;
