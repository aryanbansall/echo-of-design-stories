
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import LiquidBlob from "@/components/LiquidBlob";
import InteractiveButton from "@/components/InteractiveButton";
import { useToast } from "@/components/ui/use-toast";

const Contact: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <Layout>
      <div className="relative min-h-screen pt-20 pb-20">
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
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              Let's discuss your project or just say hello!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-2xl font-display font-bold mb-4">Contact Information</h2>
                <p className="mb-8 text-muted-foreground">
                  Feel free to reach out through any of these channels. I'm always open to new opportunities and collaborations.
                </p>

                <div className="space-y-6">
                  <ContactItem
                    title="Email"
                    value="aryan@example.com"
                    link="mailto:aryan@example.com"
                  />
                  <ContactItem
                    title="LinkedIn"
                    value="linkedin.com/in/aryanbansal"
                    link="https://linkedin.com/in/aryanbansal"
                  />
                  <ContactItem
                    title="GitHub"
                    value="github.com/aryanbansal"
                    link="https://github.com/aryanbansal"
                  />
                  <ContactItem
                    title="Location"
                    value="New Delhi, India"
                    link="https://maps.google.com/?q=New+Delhi+India"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Card className="overflow-hidden border-primary/10">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-display font-bold mb-4">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          placeholder="Your Name"
                          className="bg-background border-primary/20 focus:border-primary/50"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          className="bg-background border-primary/20 focus:border-primary/50"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Subject"
                          className="bg-background border-primary/20 focus:border-primary/50"
                          required
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Your Message"
                          className="bg-background border-primary/20 focus:border-primary/50 min-h-[150px]"
                          required
                        />
                      </div>
                      <div>
                        <InteractiveButton type="submit" className="w-full">
                          Send Message
                        </InteractiveButton>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

const ContactItem: React.FC<{
  title: string;
  value: string;
  link: string;
}> = ({ title, value, link }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="flex flex-col"
  >
    <span className="text-sm text-muted-foreground">{title}</span>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium hover:text-primary transition-colors"
    >
      {value}
    </a>
  </motion.div>
);

export default Contact;
