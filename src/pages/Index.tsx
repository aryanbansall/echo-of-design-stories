import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { setupScrollObserver } from "@/utils/scrollUtils";
import InteractiveButton from "@/components/InteractiveButton";

// Sample projects data (in a real app, this would come from a database or API)
const projectsData = [
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
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
            style={{ rotateX, rotateY }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-portfolio-purple/5 blur-3xl"
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
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Crafting <span className="text-gradient">meaningful</span> design experiences
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              An interactive journey through my design process, showcasing the evolution of concepts into impactful solutions.
            </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <InteractiveButton
              asChild
              size="lg"
              className="bg-portfolio-purple hover:bg-portfolio-purple/90 text-white"
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
              <Link to="/process">Explore Design Process</Link>
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
      </motion.section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl font-serif font-bold mb-4 scroll-reveal"
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
              Explore a selection of my recent design work spanning various disciplines and challenges.
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

      {/* Process Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-3xl font-serif font-bold mb-4 scroll-reveal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                My Design Process
              </motion.h2>
              <motion.p 
                className="text-muted-foreground mb-6 scroll-reveal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                I approach each project with a thoughtful methodology that balances research, creativity, and strategic thinking to deliver meaningful solutions.
              </motion.p>
              
              <div className="space-y-4">
                <ProcessStep 
                  number="01" 
                  title="Discovery & Research" 
                  description="Understanding the problem space, user needs, and business goals through research and stakeholder interviews."
                  delay={0.2}
                />
                <ProcessStep 
                  number="02" 
                  title="Ideation & Concepts" 
                  description="Exploring multiple directions through sketching, wireframing, and collaborative brainstorming sessions."
                  delay={0.3}
                />
                <ProcessStep 
                  number="03" 
                  title="Design & Prototyping" 
                  description="Creating comprehensive design systems and interactive prototypes to visualize the solution."
                  delay={0.4}
                />
                <ProcessStep 
                  number="04" 
                  title="Testing & Iteration" 
                  description="Validating designs through user testing and refining based on feedback and insights."
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
                  <Link to="/process">
                    Explore Full Process
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
              <div className="absolute inset-0 bg-portfolio-purple/10 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-4 bg-portfolio-teal/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute inset-8 bg-portfolio-accent/10 rounded-full animate-spin-slow" style={{ animationDuration: '12s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background rounded-full h-32 w-32 flex items-center justify-center shadow-lg">
                  <span className="font-serif text-2xl text-portfolio-purple">Process</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ProcessStep: React.FC<{ 
  number: string; 
  title: string; 
  description: string;
  delay: number;
}> = ({ number, title, description, delay }) => {
  return (
    <motion.div 
      className="flex scroll-reveal"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="mr-4 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-portfolio-purple/10 flex items-center justify-center">
          <span className="text-portfolio-purple font-medium">{number}</span>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default Home;
