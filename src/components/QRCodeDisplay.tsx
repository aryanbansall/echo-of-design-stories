
import React, { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { playSoundEffect } from "../utils/audioUtils";

interface QRCodeDisplayProps {
  projectId: string;
  title: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ projectId, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    playSoundEffect(isExpanded ? 'close' : 'open');
  };
  
  const generateQRCodeUrl = (projectId: string) => {
    // In a real application, this would generate a QR code pointing to the project
    // For now, we'll use a placeholder URL
    const baseUrl = window.location.origin;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${baseUrl}/projects/${projectId}`;
  };
  
  const handleCopyLink = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/projects/${projectId}`;
    
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard!");
      playSoundEffect('success');
    }).catch(err => {
      toast.error("Failed to copy link");
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="my-6">
      <Button
        variant="outline"
        className="flex items-center gap-2 mb-3"
        onClick={handleToggle}
      >
        <QrCode size={16} />
        {isExpanded ? "Hide QR Code" : "View QR Code"}
      </Button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-sm mb-3">
            Scan this QR code to access the project on your mobile device or share it with others.
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="qr-pulse bg-white p-2 rounded-lg">
              <img 
                src={generateQRCodeUrl(projectId)} 
                alt={`QR Code for ${title}`}
                className="w-40 h-40"
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="font-medium">Connect Physical & Digital</h4>
              <p className="text-sm text-muted-foreground">
                Print this QR code and attach it to physical versions of this project to create a bridge between your physical portfolio and this digital showcase.
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="self-start flex items-center gap-2"
                onClick={handleCopyLink}
              >
                <LinkIcon size={14} />
                Copy Direct Link
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QRCodeDisplay;
