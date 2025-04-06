
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { toast } from "sonner";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your message has been sent! We'll get back to you soon.");
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-construction-gray">
            Have questions about BuildPrice? We're here to help. Reach out to our team using any of the methods below.
          </p>
        </div>
        
        {/* Contact Information Cards */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-construction-blue/10 rounded-full mb-2">
                  <Phone className="h-6 w-6 text-construction-blue" />
                </div>
                <CardTitle>Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-construction-gray mb-2">Call our support team</p>
                <p className="font-semibold text-lg">(555) 123-4567</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-construction-blue/10 rounded-full mb-2">
                  <Mail className="h-6 w-6 text-construction-blue" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-construction-gray mb-2">Send us an email</p>
                <p className="font-semibold text-lg">info@buildprice.com</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-construction-blue/10 rounded-full mb-2">
                  <Clock className="h-6 w-6 text-construction-blue" />
                </div>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-construction-gray mb-2">We're available</p>
                <p className="font-semibold">Monday-Friday: 9AM-5PM</p>
                <p className="font-semibold">Saturday: 10AM-2PM</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Contact Form and Map */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-construction-gray">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is this regarding?"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-construction-blue hover:bg-construction-darkBlue"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
            
            {/* Company Information */}
            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video bg-gray-200 rounded-md overflow-hidden">
                    {/* Placeholder for map */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <MapPin className="h-8 w-8 text-construction-gray" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-construction-gray mt-0.5 mr-2" />
                      <p>123 Builder Street, Construction City, CC 12345</p>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-construction-gray mt-0.5 mr-2" />
                      <p>(555) 123-4567</p>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-construction-gray mt-0.5 mr-2" />
                      <p>info@buildprice.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Supplier Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-construction-gray mb-4">
                    Are you a construction material supplier interested in listing your products on BuildPrice? We'd love to hear from you!
                  </p>
                  <p className="text-construction-gray mb-4">
                    Please contact our supplier relations team at:
                  </p>
                  <p className="font-semibold">suppliers@buildprice.com</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">How do I list my construction business?</h3>
                <p className="text-construction-gray">
                  If you're a supplier interested in listing your materials on BuildPrice, please contact our supplier relations team at suppliers@buildprice.com.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Is BuildPrice available nationwide?</h3>
                <p className="text-construction-gray">
                  Yes, BuildPrice is available across the country. However, supplier availability may vary by location.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Do you offer customer support?</h3>
                <p className="text-construction-gray">
                  Yes, our customer support team is available Monday through Friday from 9AM to 5PM, and Saturday from 10AM to 2PM. You can reach us by phone at (555) 123-4567 or by email at support@buildprice.com.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
