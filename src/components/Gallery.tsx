import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Images from public folder - added 3 more images
const images = [
  "/1.jpeg",
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/5.jpeg",
  "/6.jpeg",
  "/7.jpeg",  // Added three more images
  "/8.jpeg",
  "/9.jpeg",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const openModal = (index) => {
    setSelectedImage(index);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };
  
  const navigateImage = (direction) => {
    if (selectedImage === null) return;
    
    const newIndex = selectedImage + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedImage(newIndex);
    }
  };

  return (
    <section className="py-10 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-playfair text-primary mb-2">Our Journey</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">25 years of beautiful memories</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
        {images.map((image, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="aspect-square overflow-hidden rounded-md cursor-pointer relative group"
            onClick={() => openModal(index)}
          >
            {/* Changed to preserve aspect ratio without cropping */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <img 
                src={image} 
                alt={`Memory ${index + 1}`} 
                className="w-full h-full object-contain"  // Changed to object-contain to prevent cropping
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-playfair">Memory {index + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col"
            >
              <div className="relative flex-1 overflow-hidden">
                <img 
                  src={images[selectedImage]} 
                  alt={`Gallery image ${selectedImage + 1}`} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="absolute top-4 right-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeModal}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="flex justify-between absolute left-0 right-0 top-1/2 -translate-y-1/2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigateImage(-1)}
                  disabled={selectedImage === 0}
                  className="text-white hover:bg-white/20"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigateImage(1)}
                  disabled={selectedImage === images.length - 1}
                  className="text-white hover:bg-white/20"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;