import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import MemoryShare from "@/components/MemoryShare";
import Footer from "@/components/Footer";
import HeartAnimation from "@/components/HeartAnimation";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Add scroll to section functionality
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <span className="font-dancing text-5xl text-primary">G</span>
                <Heart className="absolute text-silver-dark h-5 w-5 animate-pulse-silver mx-2 inline" />
                <span className="font-dancing text-5xl text-primary">V</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Silver Jubilee</p>
              <div className="mt-6 relative w-48 h-1 bg-silver-light overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-silver-dark"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!loading && !showContent && (
          <motion.div
            className="fixed inset-0 bg-background flex items-center justify-center z-40"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center px-4"
            >
              <h1 className="text-4xl md:text-6xl font-playfair font-semibold mb-6 text-gradient-silver text-shadow-lg">
                Silver Jubilee
              </h1>
              <h2 className="font-dancing text-3xl text-primary mb-8">Ganesh & Varsha</h2>
              <Button
                onClick={() => setShowContent(true)}
                className="bg-silver-dark hover:bg-silver text-white"
              >
                <span className="flex items-center gap-2">
                  Open Invitation
                  <Heart className="h-4 w-4 fill-current animate-pulse" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {showContent && (
        <>
          <HeartAnimation />
          
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm shadow-sm">
            <nav className="container mx-auto px-4 py-3">
              <ul className="flex justify-center space-x-6 overflow-x-auto whitespace-nowrap no-scrollbar">
                <li>
                  <button 
                    onClick={() => scrollToSection("top")} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1 py-2"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("countdown")} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1 py-2"
                  >
                    Countdown
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("gallery")} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1 py-2"
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("details")} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1 py-2"
                  >
                    Details
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("rsvp")} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1 py-2"
                  >
                    RSVP
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("memories")} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1 py-2"
                  >
                    Memories
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          <main className="container mx-auto">
            <div id="top" className="pt-20">
              <Header />
            </div>
            
            <div id="countdown">
              <Countdown />
            </div>
            
            <div id="gallery">
              <Gallery />
            </div>
            
            <div id="details">
              <EventDetails />
            </div>
            
            <div id="rsvp">
              <RSVP />
            </div>
            
            <div id="memories">
              <MemoryShare />
            </div>
          </main>
          
          <Footer />
          
          {/* Floating action button to scroll to top */}
          <motion.button
            className="fixed bottom-6 right-6 bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-30 hover:bg-accent/90 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </motion.button>
        </>
      )}
    </div>
  );
};

export default Index;
