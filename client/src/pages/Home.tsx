/**
 * Home page component for MWC Advocates
 * Landing page with hero section, services preview, and testimonials
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle, Users, Scale, MapPin, ArrowRight, Building, Briefcase, Shield, Home as HomeIcon, Award, Clock, ChevronLeft, ChevronRight, Heart, Gavel, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';
import dataService from '../services/dataService';

// Import assets
import logoWhite from '../assets/MWC_WHITE.png';
import heroBg from '../assets/heroBg.jpg';

const Home: React.FC = () => {
  // Carousel state
  const [activeCard, setActiveCard] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  // Load data from JSON files (only database content)
  const servicesData = dataService.getFeaturedServices();
  const testimonials = dataService.getActiveTestimonials();
  const firmInfo = dataService.getFirmInfo();

  // SEO optimization
  useSEO({
    title: 'Home - Masinde Wanyonyi & Company Advocates',
    description: 'MASINDE WANYONYI & COMPANY ADVOCATES, Commissioners for Oaths and Notary Public - Providing excellence in legal solutions. Leading law firm in Nairobi, Kenya.',
    keywords: 'law firm Nairobi, legal services Kenya, conveyancing real estate, estate planning succession, data protection privacy, civil commercial litigation, criminal litigation, corporate law, immigration law, family law, banking finance law, MWC Advocates, Masinde Wanyonyi, Commissioners for Oaths, Notary Public, Upperhill advocates'
  });

  // Icon mapping for services from database
  const iconMap: Record<string, LucideIcon> = {
    building: Building,
    briefcase: Briefcase,
    shield: Shield,
    home: HomeIcon,
    heart: Heart,
    gavel: Gavel,
    scale: Scale,
    globe: Globe,
    users: Users
  };

  // Map services with icons (take first 4 for home page)
  const services = servicesData.slice(0, 4).map(service => ({
    ...service,
    icon: iconMap[service.icon] || Building
  }));

  // Hardcoded highlights - these don't change often
  const highlights = [
    {
      icon: CheckCircle,
      title: 'Experienced',
      description: 'Skilled advocates with proven track records in complex legal matters',
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your goals are our priority, with personalized legal strategies',
    },
    {
      icon: Scale,
      title: 'Ethical',
      description: 'Committed to the highest standards of professional integrity',
    },
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Deep knowledge of Kenyan law and regional legal frameworks',
    },
    {
      icon: Award,
      title: 'Award-Winning',
      description: 'Recognized for excellence in legal service delivery',
    },
    {
      icon: Clock,
      title: 'Responsive',
      description: '24/7 availability for urgent legal matters and consultations',
    },
  ];

  // Auto-scroll effect for highlights
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveCard(prev => (prev + 1) % 6); // 6 is the total number of highlights
      }, 3000); // Auto-scroll every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Auto-scroll effect for testimonials (mobile)
  useEffect(() => {
    if (!isTestimonialPaused && window.innerWidth < 768) {
      const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length);
      }, 4000); // Change testimonial every 4 seconds on mobile

      return () => clearInterval(interval);
    }
  }, [isTestimonialPaused, testimonials.length]);

  return (
    <div className="bg-white">
      {/* Hero Section - Enhanced with overlay for future image */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center text-white overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Legal Background representing professional law firm" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-green-900/60"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
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

      {/* Welcome Section - Enhanced with subtle background pattern */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232C5530' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-1 lg:order-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Welcome to Masinde Wanyonyi & Company Advocates
              </h2>
              <p className="text-base md:text-lg font-semibold text-green-800 mb-4">
                Commissioners for Oaths and Notary Public
              </p>
              <div className="w-16 h-1 bg-green-500 mb-4 md:mb-6"></div>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
                A full-service law firm established with a vision to provide cutting-edge legal services that combine 
                technical expertise, innovation, and personalised client care. With three experienced Partners, two 
                Senior Associates, and a robust support team, we stand as a distinguished legal practice in Kenya, 
                serving both local and international clientele.
              </p>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                Operating from Duplex Suites in Upper Hill, we blend our prime location with national reach, secure 
                digital workflows, and responsive communication to keep matters moving. The result is strategic legal 
                solutions that safeguard our clients' interests, anticipate risks, and secure sustainable outcomes—guided 
                every step by Excellence, Integrity, and Client-Centric Service.
              </p>

              <Link 
                to="/about"
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition duration-300"
              >
                Learn more about our firm →
              </Link>
            </div>

            {/* Right Content - Highlights Carousel (MAINTAINED AS REQUESTED) */}
            <div className="relative h-80 md:h-96 order-2 lg:order-2 lg:pl-12 mt-8 lg:mt-0">
              <div 
                className="relative w-full h-full flex items-center justify-center"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Previous Button */}
                <button
                  onClick={() => {
                    setActiveCard(activeCard === 0 ? highlights.length - 1 : activeCard - 1);
                    setIsPaused(false);
                    setTimeout(() => setIsPaused(true), 100);
                  }}
                  className="absolute left-2 md:left-0 z-20 p-1 md:p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </button>

                {/* Cards Container */}
                <div className="relative w-full h-full overflow-hidden md:overflow-visible" style={{ perspective: '1000px' }}>
                  {highlights.map((highlight, index) => {
                    const IconComponent = highlight.icon;
                    let offset = index - activeCard;
                    if (offset > 3) offset = offset - highlights.length;
                    if (offset < -3) offset = offset + highlights.length;
                    const isActive = offset === 0;
                    const isVisible = window.innerWidth < 768 ? Math.abs(offset) <= 1 : Math.abs(offset) <= 2;
                    const spacing = window.innerWidth < 768 ? 70 : 120;
                    
                    const cardStyle = {
                      position: 'absolute' as const,
                      left: '50%',
                      top: '50%',
                      transform: `
                        translate(-50%, -50%)
                        translateX(${offset * spacing}px)
                        scale(${isActive ? 1 : 0.8 - Math.abs(offset) * 0.05})
                        rotateY(${offset * -8}deg)
                        translateZ(${isActive ? 0 : -Math.abs(offset) * 50}px)
                      `,
                      zIndex: isActive ? 10 : Math.max(1, 5 - Math.abs(offset)),
                      opacity: isVisible ? (isActive ? 1 : 0.7 - Math.abs(offset) * 0.1) : 0,
                      filter: isActive ? 'none' : `blur(${Math.abs(offset)}px)`,
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: isVisible ? 'auto' as const : 'none' as const,
                    };
                    
                    return (
                      <div
                        key={index}
                        style={cardStyle}
                        onClick={() => {
                          setActiveCard(index);
                          setIsPaused(true);
                        }}
                        className="cursor-pointer"
                      >
                        <div className={`bg-black text-white p-4 md:p-6 rounded-xl flex items-center justify-center text-center w-44 md:w-52 h-64 md:h-72 relative overflow-hidden shadow-2xl ${isActive ? 'ring-2 ring-green-500' : ''}`}>
                          <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4">
                            <div className="w-12 md:w-16 h-12 md:h-16 bg-green-500 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-6 md:w-8 h-6 md:h-8 text-slate-800" />
                            </div>
                            <h3 className="text-base md:text-lg font-bold">{highlight.title}</h3>
                            <p className="text-xs text-gray-300 text-center leading-relaxed px-2">
                              {highlight.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => {
                    setActiveCard(activeCard === highlights.length - 1 ? 0 : activeCard + 1);
                    setIsPaused(false);
                    setTimeout(() => setIsPaused(true), 100);
                  }}
                  className="absolute right-2 md:right-0 z-20 p-1 md:p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4 md:mt-8">
                {highlights.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCard(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeCard ? 'bg-green-500 w-6 md:w-8' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview - Enhanced with pattern background */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

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
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const previewFeatures = Array.isArray(service.features)
                ? service.features.slice(0, 2)
                : [];
              return (
                <motion.article
                  key={service.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#122133] via-[#0e1a29] to-[#0a1422] p-8 shadow-xl shadow-black/40 ring-1 ring-[#1f3b52]/60 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:ring-emerald-400/40"
                  variants={{
                    hidden: { opacity: 0, x: 80, rotate: -2 },
                    visible: (cardIndex: number) => ({
                      opacity: 1,
                      x: 0,
                      rotate: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 140,
                        damping: 18,
                        delay: cardIndex * 0.08
                      }
                    })
                  }}
                  custom={index}
                >
                  <div className="flex items-start">
                    <div className="relative inline-flex rounded-2xl bg-[#15273a] p-2 shadow-inner shadow-black/40 ring-1 ring-[#24486a]/70">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-white transition-colors group-hover:text-emerald-200">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 line-clamp-4">
                    {service.description}
                  </p>
                  {previewFeatures.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-slate-300/80">
                      {previewFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-6">
                    <Link
                      to="/services"
                      className="inline-flex items-center text-sm font-semibold text-emerald-200 transition-colors group-hover:text-emerald-100"
                    >
                      Explore this area
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
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
              <Button variant="primary" size="lg" className="inline-flex items-center">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by individuals and businesses across Kenya for our expertise and commitment to excellence.
            </p>
          </div>
        </div>

        {/* Mobile Carousel - Visible only on mobile */}
        <div className="md:hidden relative px-4">
          <div 
            className="relative"
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            {/* Previous Button */}
            <button
              onClick={() => {
                setActiveTestimonial(activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 shadow-lg rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Testimonial Cards Container */}
            <div className="overflow-hidden">
              <div className="relative h-64">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === activeTestimonial 
                        ? 'opacity-100 transform translate-x-0' 
                        : index < activeTestimonial 
                        ? 'opacity-0 transform -translate-x-full' 
                        : 'opacity-0 transform translate-x-full'
                    }`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg h-full mx-8">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                          <p className="text-gray-500 text-xs">
                            {testimonial.position}
                            {testimonial.company && `, ${testimonial.company}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex text-yellow-600 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-gray-600 italic text-sm">"{testimonial.content}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                setActiveTestimonial((activeTestimonial + 1) % testimonials.length);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 shadow-lg rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-1 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-green-600 w-6' : 'bg-gray-300 w-1.5'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Infinite Scroll - Hidden on mobile */}
        <div className="hidden md:block relative">
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

      {/* Contact CTA Section - Enhanced with visual elements */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary-green)] via-green-700 to-[var(--color-primary-green)] text-white relative overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Contact Info (from firm.json) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch Today</h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Ready to discuss your legal needs? Contact us for a consultation and let us help you navigate
                your legal challenges.
              </p>

              <div className="space-y-6 mb-8">
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <MapPin className="w-6 h-6 text-green-200" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-lg mb-1">{firmInfo.address.street}</p>
                    <p className="text-green-100">{firmInfo.address.city}, {firmInfo.address.country}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-lg mb-1">Call Us</p>
                    <p className="text-green-100">{firmInfo.contact.phone}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-lg mb-1">Email Us</p>
                    <p className="text-green-100">{firmInfo.contact.email}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link to="/contact">
                  <Button variant="secondary" size="lg" className="shadow-xl hover:shadow-2xl">
                    Contact Us Now
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Office Hours (from firm.json) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                {/* Office Hours */}
                <h3 className="text-2xl font-bold mb-6 text-white">Office Hours</h3>
                <div className="space-y-4 mb-8">
                  {Object.entries(firmInfo.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center border-b border-white/20 pb-3">
                      <span className="text-green-100 capitalize">{day}</span>
                      <span className="font-semibold">{hours}</span>
                    </div>
                  ))}
                </div>

                {/* Emergency Contact */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                  <div className="mb-3 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-yellow-300" />
                    <h4 className="text-white font-bold">Emergency Contact</h4>
                  </div>
                  <p className="mb-3 text-sm text-emerald-100">
                    Available 24/7 for urgent legal matters
                  </p>
                  <p className="font-semibold text-white">
                    {firmInfo.contact.phone.split('/')[0]}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
