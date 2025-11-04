import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

interface Certification {
  name: string;
  path: string;
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    // This will automatically load all images from the public/certifications folder
    // To add certificates: Place images in public/certifications/ folder
    // Name format: "Certificate_Name.png" or "Certificate_Name.jpg"
    
    // For demo purposes, showing placeholder structure
    // In production, you'll need to add your actual certificate images
    const loadCertifications = async () => {
      // You can manually add your certifications here
      const certs: Certification[] = [
        // Example: { name: "AWS Certified Developer", path: "/certifications/aws-developer.png" },
        // Example: { name: "React Professional", path: "/certifications/react-professional.png" },
      ];
      setCertifications(certs);
    };

    loadCertifications();
  }, []);

  return (
    <section id="certifications" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="gradient-text">Certifications</span>
        </h2>

        {certifications.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Award className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Add Your Certifications</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              To display your certifications:
              <br />
              1. Create a folder named <code className="px-2 py-1 bg-muted rounded">certifications</code> in the <code className="px-2 py-1 bg-muted rounded">public</code> folder
              <br />
              2. Add your certificate images (PNG, JPG)
              <br />
              3. Update the array in <code className="px-2 py-1 bg-muted rounded">Certifications.tsx</code>
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <img
                    src={cert.path}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-center">{cert.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
