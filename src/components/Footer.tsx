
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 md:py-10 mt-10 border-t border-silver-dark/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div 
            className="mb-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <span className="font-dancing text-3xl md:text-4xl text-primary">G</span>
              <Heart className="absolute text-silver-dark h-4 w-4 animate-pulse mx-1 inline" />
              <span className="font-dancing text-3xl md:text-4xl text-primary">V</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">
              Thank you for celebrating our 25 years of love and happiness
            </p>
          </motion.div>
          
          <motion.div 
            className="flex gap-4 mb-6 flex-wrap justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="#rsvp" 
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              RSVP
            </a>
            <span className="text-silver-dark/50">•</span>
            <a 
              href="#venue" 
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Venue
            </a>
            <span className="text-silver-dark/50">•</span>
            <a 
              href="#gallery" 
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Gallery
            </a>
            <span className="text-silver-dark/50">•</span>
            <a 
              href="#contact" 
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Contact
            </a>
          </motion.div>
          
          <motion.div 
            className="text-xs text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>&copy; {currentYear} Ganesh & Varsha Silver Jubilee Celebration</p>
            <p className="mt-1">With love from our family to yours</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
