import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";

const channels = [
  { label: "email", value: "pushpakmjaiswal@gmail.com", href: "mailto:pushpakmjaiswal@gmail.com", icon: Mail, color: "text-gruv-orange", cta: "send mail" },
  { label: "linkedin", value: "in/pushpak-jaiswal", href: "https://www.linkedin.com/in/pushpak-jaiswal/", icon: Linkedin, color: "text-gruv-blue", cta: "open dm" },
  { label: "github", value: "PUSHPAK-JAISWAL", href: "https://github.com/PUSHPAK-JAISWAL", icon: Github, color: "text-gruv-aqua", cta: "open profile" },
  { label: "whatsapp", value: "+91 8484807511", href: "https://wa.me/918484807511", icon: Phone, color: "text-gruv-yellow", cta: "chat" },
];

const Contact = () => {
  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[09]</span> ~/contact.sh</span>
          <span>chmod +x</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ $ <span className="text-foreground">./contact.sh --help</span>
          <div className="mt-2 text-muted-foreground">
            # pick a channel below — i&apos;ll reply as soon as i&apos;m back at the keyboard.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="pane animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="pane-title">
                <span><span className="id">--{c.label}</span></span>
                <span className={c.color}>●</span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${c.color}`} />
                  <div className="text-xs text-muted-foreground break-all">{c.value}</div>
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary transition-colors"
                >
                  &gt; {c.cta}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-muted-foreground flex items-center gap-2 pl-1">
        <MapPin className="w-3 h-3 text-primary" /> based in India · open to remote
      </div>
    </section>
  );
};

export default Contact;
