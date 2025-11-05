import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const subject = formData.subject || "Contact from Portfolio";
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:pushpakmjaiswal@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Opening email client",
      description: "Your default email application will open with the pre-filled message.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Get In Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 card-hover">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:pushpakmjaiswal@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    pushpakmjaiswal@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+918484807511" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 8484807511
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">India</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-hover">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
