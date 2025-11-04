import { useState } from "react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
              <TabsTrigger value="about" className="animate-fade-in">Skills</TabsTrigger>
              <TabsTrigger value="projects" className="animate-fade-in">Projects</TabsTrigger>
              <TabsTrigger value="certifications" className="animate-fade-in">Certifications</TabsTrigger>
              <TabsTrigger value="achievements" className="animate-fade-in">Achievements</TabsTrigger>
              <TabsTrigger value="resume" className="animate-fade-in">Resume</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="about" className="animate-fade-in">
            <Skills />
          </TabsContent>
          
          <TabsContent value="projects" className="animate-fade-in">
            <Projects />
          </TabsContent>
          
          <TabsContent value="certifications" className="animate-fade-in">
            <Certifications />
          </TabsContent>
          
          <TabsContent value="achievements" className="animate-fade-in">
            <Achievements />
          </TabsContent>
          
          <TabsContent value="resume" className="animate-fade-in">
            <Resume />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
