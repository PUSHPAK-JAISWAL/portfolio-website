import { useState } from "react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-auto flex-wrap justify-start gap-1 bg-transparent p-2">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="skills" className="mt-0">
          <Skills />
        </TabsContent>
        
        <TabsContent value="experience" className="mt-0">
          <Experience />
        </TabsContent>
        
        <TabsContent value="education" className="mt-0">
          <Education />
        </TabsContent>
        
        <TabsContent value="projects" className="mt-0">
          <Projects />
        </TabsContent>
        
        <TabsContent value="certifications" className="mt-0">
          <Certifications />
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-0">
          <Achievements />
        </TabsContent>
        
        <TabsContent value="resume" className="mt-0">
          <Resume />
        </TabsContent>
        
        <TabsContent value="contact" className="mt-0">
          <Contact />
        </TabsContent>
      </Tabs>

      <Footer />
    </div>
  );
};

export default Index;
