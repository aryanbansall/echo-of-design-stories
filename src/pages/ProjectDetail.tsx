
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { setupScrollObserver } from "@/utils/scrollUtils";
import { playSoundEffect } from "@/utils/audioUtils";

// This would come from a database or API in a real app
const getProjectData = (id: string) => {
  const projects = {
    "interactive-dashboard": {
      id: "interactive-dashboard",
      title: "Interactive Dashboard",
      description: "A responsive dashboard with data visualization and real-time updates.",
      fullDescription: `
        <p>This interactive dashboard project focused on creating an intuitive interface for data visualization and real-time monitoring. The goal was to design a system that presents complex information in a clear, accessible manner while maintaining visual appeal.</p>
        <p>The design process involved extensive user research to understand how different user types interact with dashboards and what information hierarchies work best for quick comprehension. I created multiple iterations of wireframes and prototypes, testing them with users to refine the experience.</p>
        <p>Key features include customizable widgets, real-time data updates, and responsive layouts that work seamlessly across devices. The final design implements thoughtful use of color coding, typography, and white space to create a dashboard that reduces cognitive load while maximizing information density.</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
      category: "UI/UX Design",
      date: "March 2025",
      client: "FinTech Startup",
      tools: ["Figma", "Sketch", "Principle"],
      galleryImages: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D"
      ]
    },
    "mobile-app-redesign": {
      id: "mobile-app-redesign",
      title: "Mobile App Redesign",
      description: "Reimagining a fitness app with improved user flows and accessibility.",
      fullDescription: `
        <p>This project involved a comprehensive redesign of a fitness tracking mobile application to improve usability, engagement, and accessibility. The existing app had strong functionality but suffered from navigation issues and inconsistent visual design.</p>
        <p>I began with a thorough audit of the existing application, collecting user feedback and analyzing pain points. User interviews revealed that while users valued the core features, they found the app difficult to navigate and visually outdated.</p>
        <p>The redesign focused on creating a cohesive design system, streamlining user flows, and implementing accessibility best practices. Special attention was paid to the workout tracking screens, which were redesigned to provide clearer feedback and more intuitive controls.</p>
        <p>The final design features a modern, clean aesthetic with thoughtful color contrasts for readability, simplified navigation, and micro-interactions that provide meaningful feedback during workouts.</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww",
      category: "Mobile Design",
      date: "February 2025",
      client: "FitTrack",
      tools: ["Figma", "Protopie", "Adobe XD"],
      galleryImages: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D"
      ]
    },
    "brand-identity": {
      id: "brand-identity",
      title: "Brand Identity System",
      description: "Creating a comprehensive visual language for a sustainable fashion brand.",
      fullDescription: `
        <p>This project involved developing a complete brand identity system for a sustainable fashion brand committed to ethical production and environmental responsibility. The goal was to create a visual language that communicated the brand's values while appealing to their target demographic of conscious consumers.</p>
        <p>The design process began with extensive research into sustainable fashion brands, ethical consumers, and visual trends. I conducted workshops with the client to uncover their core brand attributes and differentiation points.</p>
        <p>The resulting identity system includes a versatile logo system, a nature-inspired color palette, custom typography guidelines, photography direction, and a comprehensive set of brand applications. The visual language balances modern minimalism with organic elements to reflect the brand's commitment to sustainability without sacrificing style.</p>
        <p>Implementation included print materials, packaging design, social media templates, and website design guidelines. The brand system is designed to be flexible and scalable as the company grows while maintaining consistent brand recognition.</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJyYW5kaW5nfGVufDB8fDB8fHww",
      category: "Branding",
      date: "January 2025",
      client: "EcoThreads",
      tools: ["Adobe Illustrator", "Photoshop", "InDesign"],
      galleryImages: [
        "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJyYW5kaW5nfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1600775508114-5c30cf886c7b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnJhbmRpbmd8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJyYW5kaW5nfGVufDB8fDB8fHww"
      ]
    }
  };

  return projects[id as keyof typeof projects];
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const projectData = getProjectData(id);
        setProject(projectData);
        setLoading(false);
        
        if (projectData?.galleryImages?.[0]) {
          setSelectedImage(projectData.galleryImages[0]);
        }
      }, 500);
    }
    
    const cleanup = setupScrollObserver();
    return () => {
      if (cleanup) cleanup();
    };
  }, [id]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    playSoundEffect('click');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-muted rounded mb-6"></div>
            <div className="h-4 bg-muted rounded mb-2 w-full"></div>
            <div className="h-4 bg-muted rounded mb-2 w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-6 hover:bg-transparent hover:text-portfolio-purple"
            >
              <Link to="/projects" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>

            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {project.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Tag className="mr-1 h-4 w-4" />
                {project.category}
              </div>
              {project.client && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="mr-1 h-4 w-4" />
                  {project.client}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-card rounded-lg overflow-hidden shadow-md">
              <img
                src={selectedImage || project.imageUrl}
                alt={project.title}
                className="w-full h-auto"
              />
            </div>

            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {project.galleryImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    className={`rounded-md overflow-hidden transition-all ${
                      selectedImage === image
                        ? "ring-2 ring-portfolio-purple"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image}
                      alt={`Project view ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3"
            >
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: project.fullDescription }}
              />

              <QRCodeDisplay projectId={project.id} title={project.title} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-card border rounded-lg p-5 sticky top-24">
                <h3 className="font-medium mb-4">Project Details</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-1">
                      Category
                    </h4>
                    <p className="text-sm font-medium">{project.category}</p>
                  </div>

                  <div>
                    <h4 className="text-sm text-muted-foreground mb-1">
                      Date
                    </h4>
                    <p className="text-sm font-medium">{project.date}</p>
                  </div>

                  {project.client && (
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">
                        Client
                      </h4>
                      <p className="text-sm font-medium">{project.client}</p>
                    </div>
                  )}

                  {project.tools && (
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">
                        Tools Used
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.tools.map((tool: string, index: number) => (
                          <span
                            key={index}
                            className="text-xs bg-secondary px-2 py-1 rounded-full"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
