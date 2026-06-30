import { useEffect, useState } from "react";
import { fetchContent } from "@/lib/content";

type BootCfg = {
  title?: string;
  subtitle?: string;
  messages?: string[];
};

const DEFAULT_MESSAGES = [
  "aqua|Reached target Local File Systems.",
  "aqua|Started Network Manager.",
  "aqua|Loading gruvbox-dark theme.",
  "primary|Welcome, pushpak.",
];

const colorMap: Record<string, string> = {
  aqua: "text-gruv-aqua",
  yellow: "text-gruv-yellow",
  red: "text-gruv-red",
  orange: "text-gruv-orange",
  blue: "text-gruv-blue",
  purple: "text-gruv-purple",
  primary: "text-primary",
  muted: "text-muted-foreground",
};

const ARCH = `      /\\
     /  \\
    /\\   \\
   /      \\
  /   ,,   \\
 /   |  |  -\\
/_-''    ''-_\\`;

const BootLoader = ({ onDone }: { onDone: () => void }) => {
  const [cfg, setCfg] = useState<BootCfg | null>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetchContent<BootCfg>("boot")
      .then((list) => setCfg(list[0] || {}))
      .catch(() => setCfg({}));
  }, []);

  const messages = cfg?.messages?.length ? cfg.messages : DEFAULT_MESSAGES;
  const ready = cfg !== null;
  const total = messages.length;

  useEffect(() => {
    if (!ready) return;
    if (step >= total) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 350);
      }, 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 110 + Math.random() * 90);
    return () => clearTimeout(t);
  }, [step, ready, total, onDone]);

  const pct = ready ? Math.min(100, Math.round((step / total) * 100)) : 0;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Booting portfolio"
      className={`fixed inset-0 z-[100] bg-background text-foreground font-mono flex flex-col transition-opacity duration-300 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex-1 overflow-hidden p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <pre className="text-primary text-[9px] sm:text-[10px] md:text-xs leading-tight whitespace-pre select-none animate-fade-in">
{ARCH}
        </pre>
        <div className="flex-1 min-w-0 text-[11px] md:text-xs space-y-0.5 w-full">
          <div className="text-muted-foreground mb-2 break-words">
            {cfg?.title || "Arch Linux 6.10.4-arch1-1 (tty1)"}
          </div>
          {messages.slice(0, step).map((raw, i) => {
            const [color, ...rest] = raw.split("|");
            const msg = rest.length ? rest.join("|") : color;
            const cls = rest.length ? colorMap[color.trim()] ?? "text-gruv-aqua" : "text-gruv-aqua";
            return (
              <div key={i} className="flex gap-2 animate-fade-in">
                <span className={cls}>[ OK ]</span>
                <span className="text-foreground/90 break-words">{msg}</span>
              </div>
            );
          })}
          {ready && step < total && (
            <div className="flex gap-2 text-muted-foreground">
              <span>[ .. ]</span>
              <span>booting<span className="caret-thin" /></span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 md:px-8 pb-6 space-y-2">
        <div className="flex justify-between text-[10px] text-muted-foreground gap-2">
          <span className="truncate">{cfg?.subtitle || "pushpak@arch — initializing portfolio"}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full border border-border bg-card overflow-hidden">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex gap-1.5 pt-1">
          {["bg-gruv-red","bg-gruv-orange","bg-gruv-yellow","bg-gruv-aqua","bg-gruv-blue","bg-gruv-purple"].map((c) => (
            <span key={c} className={`w-5 h-2 ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootLoader;
