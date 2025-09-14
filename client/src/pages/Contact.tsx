import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';
import apiService from '../services/api';

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
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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
      const result = await apiService.submitContactForm(formData);

      if (result.success) {
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
    // General Questions
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes, we offer a free initial consultation for new clients to discuss your legal needs and determine how we can best assist you. This helps us understand your situation and provide you with clear guidance on the next steps.'
    },
    {
      question: 'How do you charge for your services?',
      answer: 'Our fee structure varies depending on the type of service and complexity of the matter. We offer hourly rates, fixed fees, and retainer arrangements with transparent pricing discussed upfront. We believe in clear communication about costs from the beginning.'
    },
    {
      question: 'How quickly can you respond to urgent matters?',
      answer: 'We understand that legal emergencies can arise. We offer emergency consultation services and strive to respond to urgent matters within 24 hours. For critical situations, we have partners available to provide immediate assistance.'
    },
    {
      question: 'Do you handle cases outside Nairobi?',
      answer: 'Yes, we handle cases throughout Kenya and can travel to meet clients or represent them in courts across the country as needed. We have established networks in major towns and can efficiently handle matters nationwide.'
    },
    // Property & Real Estate
    {
      question: 'Can foreigners own property in Kenya?',
      answer: 'Foreigners can own property in Kenya under leasehold tenure for a maximum of 99 years. They cannot own agricultural land or freehold property unless they obtain special permission. We assist foreign investors in navigating these regulations and securing proper documentation.'
    },
    {
      question: 'What is the process for property purchase in Kenya?',
      answer: 'The property purchase process involves: conducting due diligence and title searches, negotiating and drafting sale agreements, obtaining necessary clearances and consents, paying stamp duty and registration fees, and finally transferring and registering the property. We guide clients through each step to ensure a smooth transaction.'
    },
    {
      question: 'How long does conveyancing typically take?',
      answer: 'A typical conveyancing transaction takes 4-8 weeks from start to completion, depending on the complexity of the transaction and whether there are any complications with the title or required consents. We work efficiently to minimize delays while ensuring thorough due diligence.'
    },
    // Succession & Estate Planning
    {
      question: 'Do I need a will if I have few assets?',
      answer: 'Yes, having a will is important regardless of the size of your estate. It ensures your wishes are followed, can prevent family disputes, simplifies the administration process, and allows you to appoint guardians for minor children. Even simple estates benefit from proper planning.'
    },
    {
      question: 'What happens if someone dies without a will in Kenya?',
      answer: 'When someone dies intestate (without a will), their estate is distributed according to the Law of Succession Act. The process involves applying for letters of administration, which can be more time-consuming and may not reflect the deceased\'s wishes. We help families navigate this process sensitively and efficiently.'
    },
    {
      question: 'How often should I update my will?',
      answer: 'You should review your will every 3-5 years or whenever major life events occur, such as marriage, divorce, birth of children, significant changes in assets, or death of beneficiaries. Regular reviews ensure your will remains current and valid.'
    },
    // Corporate & Business
    {
      question: 'How long does company registration take in Kenya?',
      answer: 'Company registration in Kenya typically takes 7-14 business days once all required documents are submitted. We can expedite the process and handle all aspects including name reservation, preparation of constitutional documents, and obtaining necessary licenses and permits.'
    },
    {
      question: 'What corporate structures are available for foreign investors?',
      answer: 'Foreign investors can establish: a wholly foreign-owned subsidiary company, a branch of a foreign company, a representative office, or enter into joint ventures with local partners. Each structure has different regulatory requirements and tax implications which we can explain in detail.'
    },
    {
      question: 'Do I need a work permit to do business in Kenya?',
      answer: 'Foreign nationals need appropriate permits to work in Kenya. The type depends on the nature of work and duration of stay. We assist with various permit applications including investor permits, work permits, and special passes, ensuring compliance with immigration laws.'
    },
    // Dispute Resolution
    {
      question: 'Is arbitration better than going to court?',
      answer: 'Arbitration can offer advantages including faster resolution, confidentiality, specialized arbitrators, and finality of decisions. However, it may be more expensive upfront and has limited appeal options. We help clients choose the most appropriate dispute resolution method for their specific situation.'
    },
    {
      question: 'How long do court cases typically take in Kenya?',
      answer: 'Court case duration varies significantly depending on the type of case, court level, and complexity. Simple matters may resolve in 6-12 months, while complex commercial disputes can take 2-5 years. We work to expedite matters through efficient case management and, where appropriate, alternative dispute resolution.'
    },
    // Tax & Compliance
    {
      question: 'What are the tax obligations for foreign companies in Kenya?',
      answer: 'Foreign companies operating in Kenya are subject to corporate tax (30% for residents, 37.5% for non-residents), VAT (16% standard rate), withholding taxes on various payments, and PAYE for employees. We provide comprehensive tax planning and compliance services to optimize your tax position legally.'
    },
    {
      question: 'How can I protect my intellectual property in Kenya?',
      answer: 'Kenya has robust IP protection through trademark registration (KIPI), copyright protection (automatic but registrable), patent protection (KIPI), and industrial designs protection. We handle all aspects of IP registration, enforcement, and commercialization strategies.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white pt-32 pb-20">
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
                {/* Office Address - First */}
                {contactInfo.filter(info => info.title === 'Office Address').map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={`address-${index}`} className="flex items-start">
                      <div className="w-12 h-12 bg-green-800 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                        <div className="text-gray-600 leading-relaxed">
                          {info.content.map((line, lineIndex) => (
                            <div key={lineIndex} className={lineIndex > 0 ? 'mt-1' : ''}>
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Map - After Address */}
                <div className="mt-6 mb-6">
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

                {/* Other Contact Info - Phone, Email, Hours */}
                {contactInfo.filter(info => info.title !== 'Office Address').map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={`other-${index}`} className="flex items-start">
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
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-green-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedFAQ === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Contact;
