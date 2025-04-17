
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-04-18T00:00:00');
    
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    }
  };

  return (
    <section className="py-10 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-playfair text-primary mb-2">Countdown to the Celebration</h2>
        <p className="text-muted-foreground">April 18, 2025</p>
      </motion.div>

      <motion.div 
        className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <CountdownItem value={timeLeft.days} label="Days" variants={itemVariants} />
        <CountdownItem value={timeLeft.hours} label="Hours" variants={itemVariants} />
        <CountdownItem value={timeLeft.minutes} label="Minutes" variants={itemVariants} />
        <CountdownItem value={timeLeft.seconds} label="Seconds" variants={itemVariants} />
      </motion.div>
    </section>
  );
};

const CountdownItem = ({ value, label, variants }: { value: number, label: string, variants: any }) => {
  return (
    <motion.div variants={variants}>
      <Card className="w-[90px] md:w-[130px] h-[110px] md:h-[140px] border-silver bg-white/70 backdrop-blur-sm overflow-hidden relative group">
        <CardContent className="flex flex-col items-center justify-center h-full p-4">
          <span className="text-3xl md:text-5xl font-playfair font-semibold text-primary">{value}</span>
          <span className="text-xs md:text-sm text-muted-foreground mt-1">{label}</span>
          <motion.div 
            className="absolute inset-0 bg-silver-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500"
            initial={false}
            whileHover={{ opacity: 0.1 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Countdown;
