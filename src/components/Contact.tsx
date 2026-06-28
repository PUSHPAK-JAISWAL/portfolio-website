import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from "lucide-react";

const channels = [
  {
    label: "Email",
    value: "pushpakmjaiswal@gmail.com",
    href: "mailto:pushpakmjaiswal@gmail.com",
    icon: Mail,
    cta: "Send Email",
  },
  {
    label: "LinkedIn",
    value: "in/pushpak-jaiswal",
    href: "https://www.linkedin.com/in/pushpak-jaiswal/",
    icon: Linkedin,
    cta: "Message on LinkedIn",
  },
  {
    label: "GitHub",
    value: "PUSHPAK-JAISWAL",
    href: "https://github.com/PUSHPAK-JAISWAL",
    icon: Github,
    cta: "Open GitHub",
  },
  {
    label: "Phone / WhatsApp",
    value: "+91 8484807511",
    href: "https://wa.me/918484807511",
    icon: Phone,
    cta: "Chat on WhatsApp",
  },
];

const Contact = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="gradient-text">Get In Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Pick whichever channel works best for you — I'll get back to you as soon as I can.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <Card
                key={c.label}
                className="p-6 card-hover animate-slide-up flex flex-col gap-4"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{c.label}</p>
                    <p className="text-sm text-muted-foreground break-all">{c.value}</p>
                  </div>
                </div>
                <Button asChild className="w-full mt-auto">
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {c.cta}
                  </a>
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-10">
          <MapPin className="w-4 h-4 text-primary" />
          Based in India · Open to remote opportunities
        </div>
      </div>
    </section>
  );
};

export default Contact;
