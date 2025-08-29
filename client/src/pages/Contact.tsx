import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const Contact: React.FC = () => {
  // SEO optimization
  useSEO({
    title: 'Contact Us - MWC Advocates Legal Consultation',
    description: 'Contact MASINDE WANYONYI & COMPANY ADVOCATES for professional legal consultation in Nairobi, Kenya. Phone: +254702073800. Email: masindewanyonyi.co@gmail.com. Office hours: Mon-Fri 8AM-6PM.',
    keywords: 'contact MWC Advocates, legal consultation Nairobi, law firm contact Kenya, legal advice appointment, Masinde Wanyonyi contact'
  });

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for your message! We will get back to you within 24 hours.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        // Handle validation errors
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors.map((err: any) => err.msg).join(', ');
          throw new Error(errorMessages);
        } else {
          throw new Error(result.message || 'Failed to send message');
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again or contact us directly.';
      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      content: ['Lower Hill Road, Upperhill', 'Nairobi, Kenya', 'P.O. Box 12345-00100']
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      content: ['+254 700 123 456', '+254 020 123 4567', 'Emergency: +254 700 999 888']
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: ['Masindewanyonyi.co@gmail.com', 'info@mwcadvocates.com', 'consultation@mwcadvocates.com']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed']
    }
  ];

  const faqData = [
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes, we offer a free initial consultation for new clients to discuss your legal needs and determine how we can best assist you.'
    },
    {
      question: 'How do you charge for your services?',
      answer: 'Our fee structure varies depending on the type of service and complexity of the matter. We offer hourly rates, fixed fees, and retainer arrangements with transparent pricing discussed upfront.'
    },
    {
      question: 'How quickly can you respond to urgent matters?',
      answer: 'We understand that legal emergencies can arise. We offer emergency consultation services and strive to respond to urgent matters within 24 hours.'
    },
    {
      question: 'Do you handle cases outside Nairobi?',
      answer: 'Yes, we handle cases throughout Kenya and can travel to meet clients or represent them in courts across the country as needed.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div 
          className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get in touch with our legal team for professional consultation and expert legal services.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're here to help you with all your legal needs. Contact us through any of the following methods,
                and we'll respond promptly to discuss how we can assist you.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 bg-green-800 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                        <div className="text-gray-600 leading-relaxed">
                          {info.content.map((line, lineIndex) => (
                            <div key={lineIndex} className={lineIndex > 0 ? 'mt-1' : ''}>
                              {info.title === 'Email Address' && line.includes('@') ? (
                                <a 
                                  href={`mailto:${line}`} 
                                  className="hover:text-green-800 transition duration-300"
                                >
                                  {line}
                                </a>
                              ) : info.title === 'Phone Numbers' && line.includes('+254') ? (
                                <a 
                                  href={`tel:${line.replace(/\s/g, '')}`} 
                                  className="hover:text-green-800 transition duration-300"
                                >
                                  {line}
                                </a>
                              ) : (
                                line
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Our Office</h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.796976670383!2d36.81591487482824!3d-1.2964515356370057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e7167b504d%3A0xbc3617f79a4c9522!2sLower%20Hill%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1755111409756!5m2!1sen!2ske"
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MWC Advocates Office Location - Lower Hill Road, Upperhill, Nairobi"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                
                {status.type && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center ${
                    status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    )}
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                        placeholder="+254 7XX XXX XXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="Corporate Law">Corporate Law</option>
                        <option value="Commercial Litigation">Commercial Litigation</option>
                        <option value="Employment Law">Employment Law</option>
                        <option value="Real Estate Law">Real Estate Law</option>
                        <option value="Intellectual Property">Intellectual Property</option>
                        <option value="Family Law">Family Law</option>
                        <option value="General Consultation">General Consultation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                      placeholder="Please describe your legal needs or questions in detail..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    loading={loading}
                    className="w-full bg-green-800 hover:bg-green-900"
                  >
                    {loading ? 'Sending Message...' : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Common questions about our services and how we can help you.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-green-100">
            Schedule your free consultation today and let us help you with your legal needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-800 hover:bg-gray-100">
              Schedule Free Consultation
            </Button>
            <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-green-800">
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
