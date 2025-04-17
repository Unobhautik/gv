import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 md:py-12 flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-2"
      >
        <Heart className="text-pink-400 h-6 w-6 md:h-8 md:w-8 animate-pulse absolute -top-3 -left-4" />
        <p className="font-dancing text-lg md:text-xl text-pink-500">Join us in celebrating</p>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl md:text-5xl lg:text-6xl font-playfair font-semibold text-center mb-1 text-gradient-pink text-shadow-lg"
      >
        25<sup>th</sup> Anniversary
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-4 border-b border-pink-200 pb-2 w-3/4 mx-auto"
      >
        <h2 className="font-dancing text-2xl md:text-4xl lg:text-5xl text-pink-600">Ganesh & Varsha</h2>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="relative w-full max-w-xs mx-auto mb-4 overflow-hidden rounded-xl shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <img 
          src="/gv.jpeg" 
          alt="Ganesh and Varsha" 
          className="w-full h-auto rounded-xl border-2 border-pink-100"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-sm md:text-base text-pink-700 text-center max-w-lg mx-auto"
      >
        Celebrating 25 years of love, laughter, and cherished memories
      </motion.p>
      
      <motion.div 
        className="absolute -z-10 w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="text-[140px] md:text-[200px] font-playfair text-pink-300 font-bold animate-pulse">
          25
        </div>
      </motion.div>
    </header>
  );
};

export default Header;