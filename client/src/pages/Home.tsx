/**
 * Home page component for MWC Advocates
 * Landing page with hero section, services preview, and testimonials
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Scale, MapPin, ArrowRight, Building, Briefcase, Shield, Home as HomeIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';

// Import assets
import logoWhite from '../assets/MWC_WHITE.png';
import heroBg from '../assets/heroBg.jpg';

const Home: React.FC = () => {

  // SEO optimization
  useSEO({
    title: 'Home - Masinde Wanyonyi & Company Advocates',
    description: 'MASINDE WANYONYI & COMPANY ADVOCATES, Commissioners for Oaths and Notary Public - Providing excellence in legal solutions. Leading law firm in Nairobi, Kenya.',
    keywords: 'law firm Nairobi, legal services Kenya, corporate law, commercial litigation, employment law, real estate law, intellectual property, MWC Advocates, Masinde Wanyonyi, Commissioners for Oaths, Notary Public'
  });

  // Hardcoded services data
  const services = [
    {
      id: '1',
      icon: Building,
      title: 'Corporate Law',
      description: 'Comprehensive legal services for businesses, from formation to complex corporate transactions.'
    },
    {
      id: '2',
      icon: Briefcase,
      title: 'Commercial Litigation',
      description: 'Expert representation in commercial disputes and litigation matters with proven success.'
    },
    {
      id: '3',
      icon: Shield,
      title: 'Intellectual Property',
      description: 'Protection and enforcement of trademarks, copyrights, patents and trade secrets.'
    },
    {
      id: '4',
      icon: HomeIcon,
      title: 'Real Estate Law',
      description: 'Complete legal services for property transactions, developments and disputes.'
    }
  ];

  // Hardcoded testimonials with 15 entries for infinite scroll
  const testimonials = [
    {
      id: '1',
      name: 'James Mwangi',
      position: 'CEO',
      company: 'Tech Solutions Ltd',
      content: 'Outstanding legal representation in our corporate restructuring. Their expertise saved us significant time and resources.',
      initials: 'JM',
      rating: 5
    },
    {
      id: '2',
      name: 'Sarah Njeri',
      position: 'Managing Director',
      company: 'Njeri Enterprises',
      content: 'Professional, efficient, and highly knowledgeable. They handled our complex litigation with exceptional skill.',
      initials: 'SN',
      rating: 4
    },
    {
      id: '3',
      name: 'David Ochieng',
      position: 'Property Developer',
      company: '',
      content: 'The best real estate lawyers in Nairobi. Their attention to detail in our transactions is unmatched.',
      initials: 'DO',
      rating: 5
    },
    {
      id: '4',
      name: 'Grace Wambui',
      position: 'HR Director',
      company: 'Manufacturing Kenya Ltd',
      content: 'Excellent employment law advice. They helped us navigate complex labor disputes successfully.',
      initials: 'GW',
      rating: 4
    },
    {
      id: '5',
      name: 'Peter Kamau',
      position: 'Founder',
      company: 'Kamau Holdings',
      content: 'Trusted advisors for over 5 years. Their commercial law expertise has been invaluable to our growth.',
      initials: 'PK',
      rating: 5
    },
    {
      id: '6',
      name: 'Mary Atieno',
      position: 'CFO',
      company: 'Finance Corp',
      content: 'Exceptional service in our merger and acquisition deal. Highly recommend their corporate law team.',
      initials: 'MA',
      rating: 5
    },
    {
      id: '7',
      name: 'John Mutua',
      position: 'Director',
      company: 'Mutua & Associates',
      content: 'Professional and responsive. They resolved our intellectual property dispute efficiently.',
      initials: 'JM',
      rating: 4
    },
    {
      id: '8',
      name: 'Elizabeth Nyambura',
      position: 'CEO',
      company: 'Retail Chain Kenya',
      content: 'Outstanding legal counsel for our business expansion. Their strategic advice was invaluable.',
      initials: 'EN',
      rating: 5
    },
    {
      id: '9',
      name: 'Robert Kipchoge',
      position: 'Managing Partner',
      company: 'Investment Group',
      content: 'Expert handling of our complex commercial contracts. Attention to detail is exceptional.',
      initials: 'RK',
      rating: 4
    },
    {
      id: '10',
      name: 'Alice Wanjiru',
      position: 'Operations Director',
      company: 'Logistics Kenya',
      content: 'They successfully defended us in a major commercial dispute. Excellent litigation skills.',
      initials: 'AW',
      rating: 5
    },
    {
      id: '11',
      name: 'Samuel Otieno',
      position: 'Chairman',
      company: 'Otieno Group',
      content: 'Comprehensive legal support for our family business. Trust them completely with our legal matters.',
      initials: 'SO',
      rating: 5
    },
    {
      id: '12',
      name: 'Catherine Muthoni',
      position: 'Partner',
      company: 'Consulting Firm',
      content: 'Excellent data protection and compliance advice. They keep us ahead of regulatory changes.',
      initials: 'CM',
      rating: 4
    },
    {
      id: '13',
      name: 'Joseph Ngugi',
      position: 'Executive Director',
      company: 'NGO Kenya',
      content: 'Professional handling of our non-profit legal requirements. Very knowledgeable team.',
      initials: 'JN',
      rating: 4
    },
    {
      id: '14',
      name: 'Ruth Chebet',
      position: 'CEO',
      company: 'Tech Startup',
      content: 'Helped us navigate complex IP issues during our product launch. Highly recommended.',
      initials: 'RC',
      rating: 5
    },
    {
      id: '15',
      name: 'Michael Omondi',
      position: 'Director',
      company: 'Construction Ltd',
      content: 'Expert advice on construction contracts and disputes. They protect our interests effectively.',
      initials: 'MO',
      rating: 4
    }
  ];

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


  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Legal Background representing professional law firm" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
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
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100
              }
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img 
              src={logoWhite} 
              alt="Masinde Wanyonyi & Company Advocates, Commissioners for Oaths and Notary Public"
              className="mx-auto w-64 md:w-96 lg:w-[32rem] object-contain"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Subtitle with firm designation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Commissioners for Oaths & Notary Public
            </h2>
            <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Providing excellence in legal solutions
            </p>
          </motion.div>

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
              <p className="text-lg font-semibold text-green-800 mb-4">
                Commissioners for Oaths and Notary Public
              </p>
              <div className="w-16 h-1 bg-green-500 mb-6"></div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                An established law firm providing excellence in legal solutions to individuals and businesses
                throughout Kenya. Founded on principles of integrity, excellence, and client-centered service,
                we combine legal expertise with a deep understanding of the Kenyan legal landscape.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our team of dedicated advocates is committed to providing excellence in legal solutions tailored to your
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
                  <motion.div
                    key={index}
                    className="bg-black text-white p-6 rounded-lg group flex items-center justify-center text-center min-h-[160px] relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Default state - shows icon and title */}
                    <div className="flex flex-col items-center justify-center space-y-3 group-hover:opacity-0 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-slate-800" />
                      </div>
                      <h3 className="text-lg font-semibold">{highlight.title}</h3>
                    </div>

                    {/* Hover state - shows description */}
                    <div className="absolute inset-0 flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-sm text-gray-300 text-center">
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
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
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
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
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-green-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
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

      {/* Testimonials Section with Infinite Scroll */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by individuals and businesses across Kenya for our expertise and commitment to excellence.
            </p>
          </div>
        </div>

        {/* Infinite Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex animate-scroll">
            {/* First set of testimonials */}
            {testimonials.map((testimonial) => (
              <div key={`${testimonial.id}-1`} className="flex-shrink-0 w-96 mx-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
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
              </div>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {testimonials.map((testimonial) => (
              <div key={`${testimonial.id}-2`} className="flex-shrink-0 w-96 mx-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
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
