
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const HeartAnimation = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  
  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position
      size: Math.random() * 20 + 10, // random size between 10px and 30px
      delay: Math.random() * 5, // random animation delay
      duration: Math.random() * 10 + 15, // random animation duration between 15-25s
      opacity: Math.random() * 0.5 + 0.2, // random opacity between 0.2-0.7
    }));
    
    setHearts(initialHearts);
    
    // Add new hearts periodically
    const intervalId = setInterval(() => {
      setHearts(prevHearts => {
        // Remove one heart and add a new one
        const newHeart = {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
          delay: 0,
          duration: Math.random() * 10 + 15,
          opacity: Math.random() * 0.5 + 0.2,
        };
        
        return [...prevHearts.slice(1), newHeart];
      });
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{
            left: `${heart.x}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          initial={{ y: '100vh' }}
          animate={{ y: '-100vh' }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full text-silver-dark"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default HeartAnimation;
