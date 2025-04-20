
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";

// Sample projects data
const allProjects = [
  {
    id: "interactive-dashboard",
    title: "Interactive Dashboard",
    description: "A responsive dashboard with data visualization and real-time updates.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
    category: "UI/UX Design",
    date: "March 2025"
  },
  {
    id: "mobile-app-redesign",
    title: "Mobile App Redesign",
    description: "Reimagining a fitness app with improved user flows and accessibility.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww",
    category: "Mobile Design",
    date: "February 2025"
  },
  {
    id: "brand-identity",
    title: "Brand Identity System",
    description: "Creating a comprehensive visual language for a sustainable fashion brand.",
    imageUrl: "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJyYW5kaW5nfGVufDB8fDB8fHww",
    category: "Branding",
    date: "January 2025"
  },
  {
    id: "web-app-design",
    title: "Web Application Design",
    description: "Designing a collaborative project management tool with real-time features.",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlYiUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D",
    category: "UI/UX Design",
    date: "December 2024"
  },
  {
    id: "e-commerce-redesign",
    title: "E-Commerce Redesign",
    description: "Revamping an online store with improved user experience and conversion optimization.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "E-Commerce",
    date: "November 2024"
  },
  {
    id: "mobile-ui-kit",
    title: "Mobile UI Component Kit",
    description: "Creating a comprehensive UI kit for rapid mobile app development.",
    imageUrl: "https://images.unsplash.com/photo-1622542796254-5b9c46a259b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vYmlsZSUyMGFwcCUyMGNvbXBvbmVudHN8ZW58MHx8MHx8fDA%3D",
    category: "Mobile Design",
    date: "October 2024"
  }
];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(allProjects.map(project => project.category)))];

  useEffect(() => {
    // Filter projects based on category and search query
    const filterProjects = () => {
      let filtered = allProjects;
      
      // Filter by category
      if (activeFilter !== "All") {
        filtered = filtered.filter(project => project.category === activeFilter);
      }
      
      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(project => 
          project.title.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query)
        );
      }
      
      setFilteredProjects(filtered);
    };
    
    filterProjects();
  }, [activeFilter, searchQuery]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-serif font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground">
            Explore my portfolio of design work spanning various disciplines, from digital interfaces to brand identities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? "bg-portfolio-purple text-white"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full md:w-64 px-4 py-2 rounded-full bg-secondary border-none focus:ring-2 focus:ring-portfolio-purple"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Results summary */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
              {activeFilter !== "All" ? ` in ${activeFilter}` : ""}
              {searchQuery ? ` matching "${searchQuery}"` : ""}
            </p>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No projects found matching your criteria.</p>
              <button
                className="mt-4 text-portfolio-purple hover:underline"
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Projects;
