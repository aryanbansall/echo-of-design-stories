
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Users,
  Guitar,
  Image,
} from "lucide-react";
import LiquidBlob from "@/components/LiquidBlob";
import InteractiveButton from "@/components/InteractiveButton";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="relative min-h-screen pt-16 pb-20">
        {/* Background blob */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <LiquidBlob className="opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-center">
              About <span className="text-gradient">Me</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              B.Tech CSD student at IIIT Delhi, passionate about creating impactful tech solutions.
            </p>

            <Tabs defaultValue="education" className="mb-12">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Achievements</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="education" className="space-y-6">
                <h2 className="text-2xl font-display font-bold mb-4">Education Journey</h2>
                <EducationCard
                  institution="Indraprastha Institute Of Information Technology Delhi"
                  degree="B.Tech (CSD)"
                  year="2022 – Present"
                  index={0}
                />
                <EducationCard
                  institution="Tagore International School, Vasant Vihar"
                  degree="CBSE"
                  year="2019 - 2021"
                  index={1}
                />
                <EducationCard
                  institution="Lalit Mahajan SVM School, Vasant Vihar"
                  degree="CBSE"
                  year="2015 – 2019"
                  index={2}
                />
                
                <h3 className="text-xl font-semibold mt-8 mb-2">Technical Electives</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Advanced Programming",
                    "Intro. to Programming",
                    "Data Structures & Algorithms",
                    "Operating Systems",
                    "Computer Organization",
                    "Advanced Design of Algorithms",
                    "Database Management Systems",
                    "AI Prompting",
                    "Computer Networks",
                  ].map((course, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/5">
                      {course}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <h2 className="text-2xl font-display font-bold mb-4">Professional Experience</h2>
                
                <ExperienceCard
                  company="Arxena"
                  position="Intern"
                  period="05/24 - 07/24"
                  guide="Guide: Arnav Saxena"
                  responsibilities={[
                    {
                      title: "Automated CV Upload Pipeline",
                      description: "Streamlined the process for users to submit their CVs (PDF/DOC file) through WhatsApp. Developed a backend system to automatically download CVs sent via WhatsApp and upload them to the company's website."
                    },
                    {
                      title: "CV Embedding and Search System",
                      description: "Enhanced CV search functionality by integrating machine learning techniques. Utilized OpenAI's API to embed CV chunks into vector representations. Stored vectors in Pinecone database for efficient similarity searches. Created a query pipeline where user queries are embedded and compared against stored CV chunks using cosine similarity."
                    }
                  ]}
                  index={0}
                />
                
                <ExperienceCard
                  company="ScaleAI"
                  position="AI Trainer"
                  period="07/24 - 2/25"
                  responsibilities={[
                    {
                      description: "Contributed to training AI models through coding and development, ensuring optimal performance and accuracy."
                    },
                    {
                      description: "Collaborated with teams to refine algorithms and enhance machine learning workflows."
                    },
                    {
                      description: "Applied technical expertise to improve the scalability and efficiency of AI training processes."
                    }
                  ]}
                  index={1}
                />
                
                <h3 className="text-xl font-semibold mt-8 mb-2">Positions of Responsibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResponsibilityCard
                    position="Core Member"
                    organization="Tasveer"
                    icon={<Image className="h-5 w-5" />}
                  />
                  <ResponsibilityCard
                    position="Player"
                    organization="Badminton Team IIITD"
                    icon={<Users className="h-5 w-5" />}
                  />
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <h2 className="text-2xl font-display font-bold mb-4">Technical Skills</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SkillCard
                    title="Expertise Areas"
                    skills={["Web Development", "Object Oriented Programming"]}
                    index={0}
                  />
                  
                  <SkillCard
                    title="Programming Languages"
                    skills={["Python", "Java", "C++", "C", "TypeScript", "HTML/CSS", "JavaScript", "React", "Node.js", "Express.js"]}
                    index={1}
                  />
                  
                  <SkillCard
                    title="Tools and Technologies"
                    skills={["JavaFX", "MySQL", "PostgreSQL", "GraphQL", "MongoDB", "Docker", "Langchain", "TensorFlow", "Pinecone"]}
                    index={2}
                  />
                </div>
                
                <div className="mt-10 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg -z-10"></div>
                  <motion.div 
                    className="p-6 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-display font-semibold mb-3">Personal Interests</h3>
                    <div className="flex flex-wrap gap-6 justify-center">
                      <InterestBadge label="Photography" icon={<Image className="h-5 w-5" />} />
                      <InterestBadge label="Guitar" icon={<Guitar className="h-5 w-5" />} />
                      <InterestBadge label="Badminton" icon={<Users className="h-5 w-5" />} />
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <h2 className="text-2xl font-display font-bold mb-4">Awards & Achievements</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AchievementCard 
                    title="First Prize in Photography competition"
                    index={0}
                  />
                  <AchievementCard 
                    title="Inter School State Level Badminton competition (Singles): Bronze"
                    index={1}
                  />
                  <AchievementCard 
                    title="Inter School State Level Badminton competition (Doubles): Bronze"
                    index={2}
                  />
                  <AchievementCard 
                    title="All India UCEED rank 220"
                    index={3}
                  />
                </div>
                
                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <InteractiveButton asChild>
                    <a href="/Aryan_Bansal_Resume.pdf" target="_blank" rel="noopener noreferrer">
                      Download Full Resume
                    </a>
                  </InteractiveButton>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

// Education Card Component
const EducationCard: React.FC<{
  institution: string;
  degree: string;
  year: string;
  index: number;
}> = ({ institution, degree, year, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{institution}</CardTitle>
          <Badge variant="outline">{year}</Badge>
        </div>
        <CardDescription>{degree}</CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
);

// Experience Card Component
const ExperienceCard: React.FC<{
  company: string;
  position: string;
  period: string;
  guide?: string;
  responsibilities: { title?: string; description: string }[];
  index: number;
}> = ({ company, position, period, guide, responsibilities, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{company}</CardTitle>
          <Badge variant="outline">{period}</Badge>
        </div>
        <CardDescription>{position}</CardDescription>
        {guide && <CardDescription className="text-xs">{guide}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {responsibilities.map((resp, idx) => (
            <li key={idx} className="text-sm">
              {resp.title && <span className="font-medium">{resp.title}: </span>}
              {resp.description}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </motion.div>
);

// Skills Card Component
const SkillCard: React.FC<{
  title: string;
  skills: string[];
  index: number;
}> = ({ title, skills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <Badge key={idx} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Responsibility Card Component
const ResponsibilityCard: React.FC<{
  position: string;
  organization: string;
  icon: React.ReactNode;
}> = ({ position, organization, icon }) => (
  <motion.div
    className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
    whileHover={{ scale: 1.02 }}
  >
    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="font-medium">{position}</p>
      <p className="text-sm text-muted-foreground">{organization}</p>
    </div>
  </motion.div>
);

// Achievement Card Component
const AchievementCard: React.FC<{
  title: string;
  index: number;
}> = ({ title, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
    whileHover={{ scale: 1.02 }}
  >
    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
      <Award className="h-4 w-4" />
    </div>
    <p className="font-medium">{title}</p>
  </motion.div>
);

// Interest Badge Component
const InterestBadge: React.FC<{
  label: string;
  icon: React.ReactNode;
}> = ({ label, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center gap-2"
  >
    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </motion.div>
);

export default About;
