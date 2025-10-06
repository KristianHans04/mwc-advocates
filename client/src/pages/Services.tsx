import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, Scale, Users, Home, Shield, Heart, 
  ChevronRight, Globe, MapPin, Briefcase, FileText,
  Gavel, TrendingUp, Award, BookOpen
} from 'lucide-react';
import ServiceDetailModal from '../components/ServiceDetailModal';
import useSEO from '../hooks/useSEO';
import servicesBg from '../assets/servicesBg1.png';
import { dataService, type Service } from '../services/dataService';

const Services: React.FC = () => {
  // SEO optimization
  useSEO({
    title: 'Legal Services - Local & International Law Solutions | MWC Advocates',
    description: 'Expert legal services in Kenya: Conveyancing & Real Estate, Estate Planning & Succession, Data Protection & Privacy Law, Civil & Commercial Litigation, Corporate Law, Immigration, Family Law, Banking & Finance. MWC Advocates - Your trusted legal partner.',
    keywords: 'legal services Kenya, conveyancing real estate, estate planning succession, data protection privacy law, civil commercial litigation, criminal litigation, corporate commercial law, immigration law, family law, banking finance law, MWC Advocates, Masinde Wanyonyi advocates'
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<any>> = {
    building: Building,
    home: Home,
    users: Users,
    lightbulb: Briefcase, // Using Briefcase as fallback for lightbulb
    heart: Heart,
    gavel: Gavel,
    shield: Shield,
    globe: Globe,
    scale: Scale,
    award: Award,
    bookopen: BookOpen,
    mappin: MapPin,
    filetext: FileText,
    trendingup: TrendingUp
  };

  useEffect(() => {
    // Load services from JSON data
    const servicesData = dataService.getServices();
    setServices(servicesData);
    setLoading(false);
  }, []);

  // For simplicity, we'll use all services and hardcode the categorization in the UI
  const allServices = services;

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-20 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={servicesBg} 
            alt="Legal Services Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>

        <motion.div 
          className="relative z-10 text-center w-full max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive Legal Solutions
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From conveyancing to corporate law, we offer strategic legal solutions that combine technical expertise with innovation.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Legal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wide array of legal services with particular depth in specialized practice areas.
            </p>
          </div>

          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {allServices.map((service, _index) => {
              const IconComponent = iconMap[service.icon] || Briefcase;
              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2"
                >
                  <div className="p-8">
                    {/* Icon with enhanced design */}
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content with better typography */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {service.description}
                    </p>
                    
                    {/* Feature highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full">
                          {feature.split(' ').slice(0, 2).join(' ')}
                        </span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                          +{service.features.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    {/* Enhanced CTA button */}
                    <button
                      onClick={() => handleLearnMore(service)}
                      className="w-full py-3 px-6 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center group/btn shadow-lg hover:shadow-xl"
                    >
                      <span>Explore Service</span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-50 to-transparent rounded-tl-full opacity-50"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MWC Advocates?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upholding the highest standards of ethics and confidentiality with innovative approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Multi-Disciplinary Team</h3>
              <p className="text-gray-600 text-sm">
                Three Partners and two Senior Associates covering diverse practice areas
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">National Coverage</h3>
              <p className="text-gray-600 text-sm">
                Network of correspondent firms across major Kenyan cities
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Technology-Driven</h3>
              <p className="text-gray-600 text-sm">
                Fully digitized with case management software and electronic filing systems
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Client-Focused</h3>
              <p className="text-gray-600 text-sm">
                Personalized solutions tailored to your needs
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default Services;