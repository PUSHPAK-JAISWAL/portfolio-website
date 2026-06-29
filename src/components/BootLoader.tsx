import { useEffect, useState } from "react";

const BOOT_LINES = [
  { t: "[ OK ]", msg: "Reached target Local File Systems.", c: "text-gruv-aqua" },
  { t: "[ OK ]", msg: "Started Load Kernel Modules.", c: "text-gruv-aqua" },
  { t: "[ OK ]", msg: "Mounted /home/pushpak.", c: "text-gruv-aqua" },
  { t: "[ OK ]", msg: "Started D-Bus System Message Bus.", c: "text-gruv-aqua" },
  { t: "[ OK ]", msg: "Started Network Manager.", c: "text-gruv-aqua" },
  { t: "[ OK ]", msg: "Reached target Network is Online.", c: "text-gruv-aqua" },
  { t: "[ OK ]", msg: "Fetching github.com/PUSHPAK-JAISWAL ...", c: "text-gruv-yellow" },
  { t: "[ OK ]", msg: "Loading gruvbox-dark theme.", c: "text-gruv-aqua" },
  { t: "[ OK ]", msg: "Starting i3-gaps window manager.", c: "text-gruv-aqua" },
  { t: "[ OK ]", msg: "Welcome, pushpak.", c: "text-primary" },
];

const ARCH = `      /\\
     /  \\
    /\\   \\
   /      \\
  /   ,,   \\
 /   |  |  -\\
/_-''    ''-_\\`;

const BootLoader = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 350);
      }, 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 110 + Math.random() * 90);
    return () => clearTimeout(t);
  }, [step, onDone]);

  const pct = Math.min(100, Math.round((step / BOOT_LINES.length) * 100));

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background text-foreground font-mono flex flex-col transition-opacity duration-300 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex-1 overflow-hidden p-4 md:p-8 flex flex-col md:flex-row gap-6 items-start">
        <pre className="text-primary text-[10px] md:text-xs leading-tight whitespace-pre select-none animate-fade-in">
{ARCH}
        </pre>
        <div className="flex-1 min-w-0 text-[11px] md:text-xs space-y-0.5">
          <div className="text-muted-foreground mb-2">
            Arch Linux 6.10.4-arch1-1 (tty1)
          </div>
          {BOOT_LINES.slice(0, step).map((l, i) => (
            <div key={i} className="flex gap-2 animate-fade-in">
              <span className={l.c}>{l.t}</span>
              <span className="text-foreground/90">{l.msg}</span>
            </div>
          ))}
          {step < BOOT_LINES.length && (
            <div className="flex gap-2 text-muted-foreground">
              <span>[ .. ]</span>
              <span>booting<span className="caret-thin" /></span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 md:px-8 pb-6 space-y-2">
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>pushpak@arch — initializing portfolio</span>
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
