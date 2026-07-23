import { useEffect, useRef, useState, KeyboardEvent } from "react";

export type TerminalFile = { key: string; name: string; ext: string };

type Props = {
  open: boolean;
  onClose: () => void;
  files: TerminalFile[];
  active: string;
  onNavigate: (key: string) => void;
};

type Line = { kind: "in" | "out" | "err"; text: string };

const WELCOME: Line[] = [
  { kind: "out", text: "pushpak-shell v1.0.0 — type 'help' for commands. Esc or `exit` to close." },
];

const SOCIALS: Record<string, string> = {
  github: "https://github.com/PUSHPAK-JAISWAL",
  linkedin: "https://www.linkedin.com/in/pushpak-jaiswal/",
  leetcode: "https://leetcode.com/u/pushpakmjaiswal/",
  hackerrank: "https://www.hackerrank.com/profile/pushpakmjaiswal",
  geeksforgeeks: "https://www.geeksforgeeks.org/user/pushpakmoqg3/",
  gfg: "https://www.geeksforgeeks.org/user/pushpakmoqg3/",
};

const Terminal = ({ open, onClose, files, active, onNavigate }: Props) => {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, open]);

  const push = (...l: Line[]) => setLines((prev) => [...prev, ...l]);

  const resolveFile = (q: string) => {
    const cleaned = q.replace(/\.[a-z]+$/i, "").toLowerCase();
    return files.find((f) => f.name.toLowerCase() === cleaned || f.key.toLowerCase() === cleaned);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    push({ kind: "in", text: `pushpak@arch ~ $ ${cmd}` });
    if (!cmd) return;
    const [bin, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");
    switch (bin) {
      case "help":
        push(
          { kind: "out", text: "Available commands:" },
          { kind: "out", text: "  ls                 list sections" },
          { kind: "out", text: "  cat <file>         open a section (e.g. cat projects)" },
          { kind: "out", text: "  cd <file>          same as cat" },
          { kind: "out", text: "  pwd                print current section" },
          { kind: "out", text: "  whoami             print user" },
          { kind: "out", text: "  neofetch           system info" },
          { kind: "out", text: "  social <name>      open github|linkedin|leetcode|hackerrank|gfg" },
          { kind: "out", text: "  open <url>         open url in new tab" },
          { kind: "out", text: "  admin              go to /admin" },
          { kind: "out", text: "  echo <text>        print text" },
          { kind: "out", text: "  date               current date/time" },
          { kind: "out", text: "  theme              show color palette" },
          { kind: "out", text: "  clear              clear terminal" },
          { kind: "out", text: "  exit               close terminal" },
        );
        break;
      case "ls":
        push({ kind: "out", text: files.map((f) => `${f.name}.${f.ext}`).join("   ") });
        break;
      case "pwd":
        push({ kind: "out", text: `~/portfolio/${active}` });
        break;
      case "cat":
      case "cd":
      case "open": {
        if (bin === "open" && /^https?:\/\//.test(arg)) {
          window.open(arg, "_blank", "noopener");
          push({ kind: "out", text: `opening ${arg}` });
          break;
        }
        const f = resolveFile(arg);
        if (!f) {
          push({ kind: "err", text: `${bin}: ${arg || "?"}: No such file. Try 'ls'.` });
        } else {
          onNavigate(f.key);
          push({ kind: "out", text: `→ ${f.name}.${f.ext}` });
        }
        break;
      }
      case "whoami":
        push({ kind: "out", text: "pushpak" });
        break;
      case "neofetch":
        push(
          { kind: "out", text: "os       Arch Linux x86_64" },
          { kind: "out", text: "shell    zsh 5.9" },
          { kind: "out", text: "wm       i3-gaps" },
          { kind: "out", text: "theme    gruvbox-dark" },
          { kind: "out", text: "font     JetBrains Mono" },
        );
        break;
      case "social": {
        const url = SOCIALS[arg.toLowerCase()];
        if (!url) {
          push({ kind: "err", text: `social: unknown '${arg}'. Try: ${Object.keys(SOCIALS).join(", ")}` });
        } else {
          window.open(url, "_blank", "noopener");
          push({ kind: "out", text: `opening ${url}` });
        }
        break;
      }
      case "admin":
        push({ kind: "out", text: "→ /admin" });
        setTimeout(() => (window.location.href = "/admin"), 150);
        break;
      case "echo":
        push({ kind: "out", text: arg });
        break;
      case "date":
        push({ kind: "out", text: new Date().toString() });
        break;
      case "theme":
        push({ kind: "out", text: "gruvbox-dark — red orange yellow aqua blue purple" });
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        onClose();
        break;
      default:
        push({ kind: "err", text: `${bin}: command not found. type 'help'.` });
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const v = input;
      run(v);
      if (v.trim()) {
        setHistory((h) => [v, ...h].slice(0, 50));
      }
      setHIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(history.length - 1, hIdx + 1);
      if (next >= 0 && history[next] !== undefined) {
        setHIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIdx - 1;
      if (next < 0) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length === 2 && (parts[0] === "cat" || parts[0] === "cd")) {
        const match = files.find((f) => f.name.startsWith(parts[1].toLowerCase()));
        if (match) setInput(`${parts[0]} ${match.name}`);
      } else {
        const cmds = ["help", "ls", "cat", "cd", "pwd", "whoami", "neofetch", "social", "open", "admin", "echo", "date", "theme", "clear", "exit"];
        const m = cmds.find((c) => c.startsWith(input));
        if (m) setInput(m);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-7 left-0 right-0 z-40 border-t-2 border-primary bg-card animate-slide-up shadow-2xl">
      <div className="pane-title">
        <span><span className="id">[term]</span> pushpak@arch: ~/portfolio</span>
        <button onClick={onClose} className="hover:text-destructive" aria-label="close">×</button>
      </div>
      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="h-56 md:h-64 overflow-y-auto p-3 text-[12px] leading-relaxed font-mono cursor-text"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.kind === "in"
                ? "text-foreground"
                : l.kind === "err"
                ? "text-destructive"
                : "text-muted-foreground whitespace-pre-wrap"
            }
          >
            {l.text}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gruv-aqua shrink-0">pushpak@arch</span>
          <span className="text-muted-foreground">~ $</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none border-0 text-foreground caret-primary"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
