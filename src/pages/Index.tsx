import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <Projects />
      <Resume />
      <Certifications />
      <Achievements />
      <Footer />
    </div>
  );
};

export default Index;
