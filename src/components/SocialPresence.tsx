
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

interface UserPresence {
  id: string;
  name: string;
  avatarColor: string;
  lastActive: number;
}

const SocialPresence: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState<UserPresence[]>([]);
  const [showIndicator, setShowIndicator] = useState(false);

  // Names pool for simulated users
  const names = [
    "Emma", "Noah", "Olivia", "Liam", "Ava", "William", "Sophia", "Mason",
    "Isabella", "James", "Mia", "Benjamin", "Charlotte", "Jacob", "Amelia"
  ];

  // Generate random color for avatar
  const getRandomColor = () => {
    const colors = [
      "#9b87f5", "#20b2aa", "#ff7e67", "#7e69ab", "#6e59a5", 
      "#d946ef", "#f97316", "#0ea5e9"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    // Check localStorage for our client ID
    let clientId = localStorage.getItem("visitorId");
    if (!clientId) {
      clientId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("visitorId", clientId);
    }

    // Simulate loading existing users
    const loadInitialUsers = () => {
      // Add 0-2 random users (simulating other visitors)
      const randomUserCount = Math.floor(Math.random() * 3);
      const initialUsers: UserPresence[] = [];
      
      for (let i = 0; i < randomUserCount; i++) {
        initialUsers.push({
          id: Math.random().toString(36).substring(2, 15),
          name: names[Math.floor(Math.random() * names.length)],
          avatarColor: getRandomColor(),
          lastActive: Date.now()
        });
      }
      
      // Only show indicator if there are other users
      if (initialUsers.length > 0) {
        setActiveUsers(initialUsers);
        setShowIndicator(true);
      }
    };

    // Simulate user arrival and departure
    const simulateUserActivity = () => {
      const simulateChange = () => {
        // 20% chance to add a new user
        if (Math.random() < 0.2 && activeUsers.length < 5) {
          const newUser: UserPresence = {
            id: Math.random().toString(36).substring(2, 15),
            name: names[Math.floor(Math.random() * names.length)],
            avatarColor: getRandomColor(),
            lastActive: Date.now()
          };
          
          setActiveUsers(prev => [...prev, newUser]);
          setShowIndicator(true);
        }
        
        // 30% chance to remove a user
        if (Math.random() < 0.3 && activeUsers.length > 0) {
          setActiveUsers(prev => {
            const newList = [...prev];
            newList.splice(Math.floor(Math.random() * newList.length), 1);
            return newList;
          });
        }
      };
      
      // Run the simulation every 15-30 seconds
      const interval = setInterval(simulateChange, 15000 + Math.random() * 15000);
      return interval;
    };
    
    // Initialize
    loadInitialUsers();
    const interval = simulateUserActivity();
    
    return () => clearInterval(interval);
  }, []);

  // Hide indicator when there are no active users
  useEffect(() => {
    if (activeUsers.length === 0) {
      setShowIndicator(false);
    } else {
      setShowIndicator(true);
    }
  }, [activeUsers]);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          className="fixed top-24 left-4 z-30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-card rounded-full shadow-md px-3 py-2 flex items-center space-x-2 border">
            <div className="flex -space-x-2">
              {activeUsers.slice(0, 3).map(user => (
                <div
                  key={user.id}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: user.avatarColor }}
                  title={user.name}
                >
                  {user.name.charAt(0)}
                </div>
              ))}
              {activeUsers.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                  +{activeUsers.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs font-medium">
              {activeUsers.length === 1 
                ? `${activeUsers[0].name} is viewing`
                : `${activeUsers.length} people are viewing`}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialPresence;
