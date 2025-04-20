
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter,
  Mail,
  ExternalLink
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-portfolio-purple rounded-full flex items-center justify-center">
                <span className="font-serif text-white font-bold text-lg">D</span>
              </div>
              <span className="font-serif text-xl font-bold">
                Design<span className="text-portfolio-purple">Journal</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              An interactive portfolio showcasing my design process, experiences, and 
              evolution over time.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="https://github.com" icon={<Github size={18} />} />
              <SocialIcon href="https://linkedin.com" icon={<Linkedin size={18} />} />
              <SocialIcon href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialIcon href="mailto:hello@designjournal.com" icon={<Mail size={18} />} />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/" label="Home" />
              </li>
              <li>
                <FooterLink to="/projects" label="Projects" />
              </li>
              <li>
                <FooterLink to="/process" label="Design Process" />
              </li>
              <li>
                <FooterLink to="/about" label="About Me" />
              </li>
              <li>
                <FooterLink to="/contact" label="Contact" />
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Have a question or want to work together on a project? Feel free to reach out!
            </p>
            <a 
              href="mailto:hello@designjournal.com"
              className="inline-flex items-center text-sm font-medium text-portfolio-purple hover:text-portfolio-purple/80 transition-colors"
            >
              <Mail size={16} className="mr-2" />
              hello@designjournal.com
            </a>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Design Journal. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-portfolio-purple hover:text-white transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

const FooterLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  const isExternal = to.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={to} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
      >
        {label}
        <ExternalLink size={12} className="ml-1" />
      </a>
    );
  }
  
  return (
    <Link 
      to={to} 
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  );
};

export default Footer;
