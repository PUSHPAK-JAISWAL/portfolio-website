import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";

interface Certification {
  name: string;
  issuer: string;
  date?: string;
  count?: number;
  url?: string;
}

const Certifications = () => {
  const [certifications] = useContent<Certification>("certifications");

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Certifications</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="p-6 card-hover flex flex-col animate-scale-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 line-clamp-2">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  {cert.date && <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>}
                </div>
              </div>

              {cert.count && (
                <Badge variant="secondary" className="mb-4 w-fit">
                  {cert.count} {cert.count === 1 ? "Certificate" : "Certificates"}
                </Badge>
              )}

              {cert.url && (
                <Button variant="outline" size="sm" asChild className="mt-auto">
                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </a>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
