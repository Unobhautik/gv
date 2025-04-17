
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const EventDetails = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-10 md:py-16 w-full bg-gradient-to-b from-transparent to-silver-light/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-playfair text-primary mb-2">Event Details</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Join us for an evening of celebration and memories</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <EventCard 
          icon={<Calendar className="h-10 w-10 text-accent" />}
          title="Date"
          details="Friday, April 18th, 2025"
          variants={itemVariants}
        />
        
        <EventCard 
          icon={<Clock className="h-10 w-10 text-accent" />}
          title="Time"
          details="6:00 PM onwards"
          variants={itemVariants}
        />
        
        <EventCard 
          icon={<MapPin className="h-10 w-10 text-accent" />}
          title="Venue"
          details="Zesty Treat Restaurant and Banquets"
          variants={itemVariants}
        />
      </motion.div>

      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="font-dancing text-2xl text-primary mb-2">Program</h3>
        <ul className="max-w-md mx-auto space-y-2 text-muted-foreground">
          <li className="border-b border-silver-dark/20 pb-2">6:00 PM - Arrival & Welcome Drinks</li>
          <li className="border-b border-silver-dark/20 pb-2">7:00 PM - Anniversary Ceremony</li>
          <li className="border-b border-silver-dark/20 pb-2">8:00 PM - Dinner Service</li>
          <li>9:00 PM - Dancing & Celebrations</li>
        </ul>
      </motion.div>

      <motion.div
        className="mt-12 max-w-5xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="border border-silver-dark/30 shadow-md bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <h3 className="font-playfair text-xl text-primary mb-4 text-center">Location Map</h3>
            <div className="aspect-video w-full rounded-md overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.8833775305993!2d73.15703507532562!3d22.320249942171976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc89149f7abf5%3A0xe9c5033bdc605ba9!2sZesty%20Treat%20Restaurant%20and%20Banquet_%20Best%20Veg%20Restaurant%2C%20Banquet%20Hall!5e0!3m2!1sen!2sin!4v1744872510611!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

const EventCard = ({ icon, title, details, variants }: { 
  icon: React.ReactNode, 
  title: string, 
  details: string,
  variants: any
}) => {
  return (
    <motion.div variants={variants}>
      <Card className="border border-silver-dark/30 shadow-md bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <CardContent className="p-6 flex items-start gap-4 h-full">
          <div className="bg-muted rounded-full p-3 shrink-0">{icon}</div>
          <div>
            <h3 className="font-playfair text-xl text-primary mb-1">{title}</h3>
            <p className="text-muted-foreground">{details}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventDetails;
