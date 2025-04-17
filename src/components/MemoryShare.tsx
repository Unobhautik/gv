
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const MemoryShare = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Use EmailJS to send the memory
    emailjs.sendForm(
      'service_hromzto', // Replace with your EmailJS service ID
      'template_4s5hc9l', // Replace with your EmailJS template ID
      formRef.current as HTMLFormElement,
      '7_6GfJLmEg4NWBbIh' // Replace with your EmailJS user ID
    )
    .then(() => {
      setFormData({ name: '', message: '' });
      setIsSubmitting(false);
      
      toast({
        title: "Memory Shared",
        description: "Thank you for sharing your memory!",
        duration: 3000,
      });
    })
    .catch((error) => {
      console.error("Error sending memory:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Error",
        description: "Failed to send your memory. Please try again later.",
        variant: "destructive",
      });
    });
  };

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-transparent to-silver-light/20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-playfair text-primary mb-2">Share Your Memories</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Leave a message or share a fond memory with Ganesh & Varsha
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-8 border-silver-dark/30 shadow-md bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-6">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="John Doe" 
                  className="border-silver-dark/30"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Your Message or Memory</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Share your favorite memory or a message for the couple..." 
                  className="border-silver-dark/30 min-h-[100px]"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent/90 text-white"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sharing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Share Memory
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MemoryShare;
