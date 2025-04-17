
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const RSVP = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guestCount: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, attending: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Use EmailJS to send the RSVP
    emailjs.sendForm(
      'service_5p5c1ab', // Replace with your EmailJS service ID
      'template_4176kpn', // Replace with your EmailJS template ID
      formRef.current as HTMLFormElement,
      'ZoDks7HC0Sbi-kxkH' // Replace with your EmailJS user ID
    )
    .then(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "RSVP Received",
        description: "Thank you for your response!",
        duration: 5000,
      });
    })
    .catch((error) => {
      console.error("Error sending RSVP:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Error",
        description: "Failed to send your RSVP. Please try again later.",
        variant: "destructive",
      });
    });
  };

  return (
    <section id="rsvp" className="py-10 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-playfair text-primary mb-2">RSVP</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Please let us know if you will be joining us by April 1, 2025</p>
      </motion.div>

      <div className="max-w-md mx-auto px-4">
        <Card className="border-silver-dark/30 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-6">
            {!isSubmitted ? (
              <motion.form 
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Full Name" 
                    required 
                    className="border-silver-dark/30 focus:border-accent focus:ring-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="your@email.com" 
                    required 
                    className="border-silver-dark/30 focus:border-accent focus:ring-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Will you be attending?</Label>
                  <RadioGroup 
                    value={formData.attending} 
                    onValueChange={handleRadioChange} 
                    className="flex gap-6"
                    name="attending"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Yes, I'll be there</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">Sorry, I can't make it</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {formData.attending === 'yes' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="guestCount">Number of Guests</Label>
                    <Input 
                      id="guestCount" 
                      name="guestCount" 
                      type="number" 
                      min="1" 
                      max="5" 
                      value={formData.guestCount} 
                      onChange={handleChange} 
                      className="border-silver-dark/30 focus:border-accent focus:ring-accent"
                    />
                  </motion.div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message for the Couple (Optional)</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Share your wishes or memories..." 
                    className="border-silver-dark/30 focus:border-accent focus:ring-accent resize-none h-24"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send RSVP
                    </span>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-playfair text-primary mb-2">Thank You!</h3>
                <p className="text-muted-foreground">Your RSVP has been submitted successfully.</p>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit Another Response
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVP;
