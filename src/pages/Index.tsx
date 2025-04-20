
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { setupScrollObserver } from "@/utils/scrollUtils";
import InteractiveButton from "@/components/InteractiveButton";
import LiquidBlob from "@/components/LiquidBlob";

// Sample projects data (in a real app, this would come from a database or API)
const projectsData = [
  {
    id: "stick-hero",
    title: "Stick Hero Game",
    description: "Developed an interactive game using JavaFX, blending engaging gameplay with dynamic animations and user-friendly controls.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhbWV8ZW58MHx8MHx8fDA%3D",
    category: "Game Development",
    date: "2023",
    technologies: "Java, JavaFX, Scene Builder, Eclipse/IntelliJ, Git"
  },
  {
    id: "retail-management",
    title: "Retail Store Management System",
    description: "Created a comprehensive retail store management system from scratch to improve overall efficiency and streamline day-to-day operations.",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmV0YWlsJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D",
    category: "Software Development",
    date: "2024",
    technologies: "Python, MySQL, Eclipse/IntelliJ, Git"
  },
  {
    id: "spotify-clone",
    title: "Spotify Clone Website",
    description: "Integrated a dynamic album system in the Spotify Clone website for seamless organization.",
    imageUrl: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvdGlmeXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Web Development",
    date: "2023",
    technologies: "HTML, CSS, JavaScript, Eclipse/IntelliJ, Git"
  },
  {
    id: "zoo-management",
    title: "Zoo Management System",
    description: "Developed a Java-based Zoo Management System that simplifies the administration of the zoo by facilitating tasks such as ticket issuance for visitors and resource management for zookeepers.",
    imageUrl: "https://images.unsplash.com/photo-1618035881605-dfe7bfa97c3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHpvb3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Software Development",
    date: "2023",
    technologies: "Java, Eclipse/IntelliJ, Git"
  }
];

const Home: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), {
    stiffness: 100,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), {
    stiffness: 100,
    damping: 30
  });

  useEffect(() => {
    setIsMounted(true);
    const cleanup = setupScrollObserver();
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  return (
    <Layout>
      {/* Hero Section with 3D effect */}
      <motion.section 
        className="relative h-screen flex items-center"
        style={{ perspective: 1000 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <LiquidBlob />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
            style={{ rotateX, rotateY }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>

        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ rotateX, rotateY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Crafting <span className="text-gradient">innovative</span> software solutions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              B.Tech CSD student at IIIT Delhi, passionate about creating impactful tech solutions and exploring new technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <InteractiveButton
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </InteractiveButton>
              <InteractiveButton
                asChild
                size="lg"
                variant="outline"
              >
                <Link to="/about">About Me</Link>
              </InteractiveButton>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={handleScrollDown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl font-display font-bold mb-4 scroll-reveal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              className="text-muted-foreground scroll-reveal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore a selection of my recent projects spanning various technologies and challenges.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <InteractiveButton 
              asChild
              variant="outline"
              className="group"
            >
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </InteractiveButton>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-3xl font-display font-bold mb-4 scroll-reveal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                My Technical Skills
              </motion.h2>
              <motion.p 
                className="text-muted-foreground mb-6 scroll-reveal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                I've developed a versatile skill set through academic coursework, personal projects, and hands-on experience with different technologies.
              </motion.p>
              
              <div className="space-y-4">
                <SkillCategory 
                  title="Programming Languages" 
                  skills={["Java", "Python", "JavaScript", "C/C++", "HTML/CSS"]}
                  delay={0.2}
                />
                <SkillCategory 
                  title="Frameworks & Libraries" 
                  skills={["JavaFX", "React", "Node.js", "Express", "TensorFlow"]}
                  delay={0.3}
                />
                <SkillCategory 
                  title="Tools & Technologies" 
                  skills={["Git", "MySQL", "MongoDB", "Docker", "AWS"]}
                  delay={0.4}
                />
                <SkillCategory 
                  title="Soft Skills" 
                  skills={["Problem Solving", "Team Collaboration", "Project Management", "Critical Thinking"]}
                  delay={0.5}
                />
              </div>
              
              <motion.div 
                className="mt-8 scroll-reveal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <InteractiveButton 
                  asChild
                  variant="outline"
                  className="group"
                >
                  <Link to="/about">
                    Learn More About Me
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </InteractiveButton>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative aspect-square max-w-md mx-auto scroll-reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-4 bg-accent/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute inset-8 bg-primary/10 rounded-full animate-spin-slow" style={{ animationDuration: '12s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background rounded-full h-32 w-32 flex items-center justify-center shadow-lg">
                  <span className="font-display text-2xl text-primary">Skills</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const SkillCategory: React.FC<{ 
  title: string; 
  skills: string[];
  delay: number;
}> = ({ title, skills, delay }) => {
  return (
    <motion.div 
      className="scroll-reveal"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
