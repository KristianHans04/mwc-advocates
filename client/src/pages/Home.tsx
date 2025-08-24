/**
 * Home page component for MWC Advocates
 * Landing page with hero section, services preview, and testimonials
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Scale, MapPin, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import apiService from '../services/api';
import useSEO from '../hooks/useSEO';
import type { Service, Testimonial } from '../types';

// Import assets
import logoWhite from '../assets/MWC_WHITE.png';
import heroBg from '../assets/heroBg.jpg';

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // SEO optimization
  useSEO({
    title: 'Home - Premier Legal Services in Nairobi',
    description: 'MASINDE WANYONYI & COMPANY ADVOCATES - Leading law firm in Nairobi, Kenya providing comprehensive legal services for individuals, businesses, and corporations. Expert legal representation with proven track record.',
    keywords: 'law firm Nairobi, legal services Kenya, corporate law, commercial litigation, employment law, real estate law, intellectual property, MWC Advocates, Masinde Wanyonyi'
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, testimonialsData] = await Promise.all([
          apiService.getServices(),
          apiService.getTestimonials(),
        ]);
        setServices(servicesData.slice(0, 4)); // Show first 4 services
        setTestimonials(testimonialsData.slice(0, 3)); // Show first 3 testimonials
      } catch (error) {
        console.error('Failed to load home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const highlights = [
    {
      icon: CheckCircle,
      title: 'Experienced',
      description: 'Skilled advocates with proven track records',
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your goals are our priority',
    },
    {
      icon: Scale,
      title: 'Ethical',
      description: 'Committed to the highest standards',
    },
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Deep knowledge of Kenyan law',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-primary-green)]"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Legal Background representing professional law firm" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 text-center w-full max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={logoWhite} 
              alt="Masinde Wanyonyi & Company Advocates - Premier Legal Services in Nairobi Kenya"
              className="mx-auto w-64 md:w-96 lg:w-[32rem] object-contain"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premier law firm in Nairobi, Kenya providing comprehensive legal solutions for individuals, businesses,
            and corporations across all practice areas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/services">
              <Button variant="primary" size="lg">
                Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Book a Consultation
              </Button>
            </Link>
          </motion.div>

          {/* Bottom Line */}
          <motion.div 
            className="w-full max-w-2xl h-px bg-white mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          ></motion.div>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Welcome to Masinde Wanyonyi & Company Advocates
              </h2>
              <div className="w-16 h-1 bg-green-500 mb-6"></div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                An established law firm offering comprehensive legal services to individuals and businesses
                throughout Kenya. Founded on principles of integrity, excellence, and client-centered service,
                we combine legal expertise with a deep understanding of the Kenyan legal landscape.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our team of dedicated advocates is committed to delivering practical solutions tailored to your
                specific needs, ensuring you receive the highest quality legal representation.
              </p>

              <Link 
                to="/about"
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition duration-300"
              >
                Learn more about our firm →
              </Link>
            </div>

            {/* Right Content - Highlights Cards */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div
                    key={index}
                    className="bg-black text-white p-6 rounded-lg group flex items-center justify-center text-center min-h-[160px] relative overflow-hidden hover-lift"
                  >
                    <div className="transform transition-all duration-300 ease-out flex flex-col items-center justify-center space-y-3 z-10 group-hover:opacity-0 group-hover:-translate-y-3">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-slate-800" />
                      </div>
                      <h3 className="text-lg font-semibold">{highlight.title}</h3>
                    </div>

                    <p className="absolute inset-0 flex items-center justify-center px-4 text-sm text-gray-300 opacity-0 transform translate-y-4 transition-all duration-300 ease-out pointer-events-none group-hover:opacity-100 group-hover:translate-y-0">
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Legal Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive legal solutions tailored to individuals, businesses, and organizations across Kenya.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 rounded-lg flex items-center justify-center">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-green-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/services">
              <Button variant="accent" size="lg" className="inline-flex items-center">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by individuals and businesses across Kenya for our expertise and commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-lg relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[var(--color-primary-green)] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">
                      {testimonial.position}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex text-yellow-600 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary-green)] via-green-700 to-[var(--color-primary-green)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center lg:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch Today</h2>
              <p className="text-xl text-green-100 mb-8">
                Ready to discuss your legal needs? Contact us for a consultation and let us help you navigate
                your legal challenges.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-green-200" />
                  <div>
                    <p className="font-semibold">SUITE 58 Duplex Suites</p>
                    <p className="text-green-100">Lower Hill Road, Upperhill, Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <p className="font-semibold">+254702073800 / +254708792078</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <p className="font-semibold">Masindewanyonyi.co@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left mt-8">
                <Link to="/contact">
                  <Button variant="secondary" size="lg">
                    Contact Us Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
