import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Scale, Users, Home, Shield, Heart, ChevronRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import useSEO from '../hooks/useSEO';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const Services: React.FC = () => {
  // SEO optimization
  useSEO({
    title: 'Legal Services - Comprehensive Law Firm Solutions',
    description: 'Comprehensive legal services by MWC Advocates: Corporate Law, Commercial Litigation, Employment Law, Real Estate, Intellectual Property, and Family Law. Expert legal representation in Nairobi, Kenya.',
    keywords: 'legal services Kenya, corporate law Nairobi, commercial litigation, employment law, real estate law, intellectual property law, family law, MWC Advocates services'
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<any>> = {
    Building,
    Scale,
    Users,
    Home,
    Shield,
    Heart
  };

  useEffect(() => {
    // For now, use static data since the backend API has issues
    // In production, this would fetch from the backend API
    const staticServices: Service[] = [
      {
        id: '1',
        title: 'Corporate Law',
        description: 'Comprehensive legal services for businesses of all sizes, from startups to established corporations.',
        icon: 'Building',
        features: ['Company formation and registration', 'Corporate governance', 'Mergers and acquisitions', 'Contract drafting and review', 'Regulatory compliance']
      },
      {
        id: '2',
        title: 'Commercial Litigation',
        description: 'Expert representation in commercial disputes and litigation matters.',
        icon: 'Scale',
        features: ['Contract disputes', 'Employment disputes', 'Debt recovery', 'Commercial arbitration', 'Court representation']
      },
      {
        id: '3',
        title: 'Employment Law',
        description: 'Complete employment law services for both employers and employees.',
        icon: 'Users',
        features: ['Employment contracts', 'Workplace policies', 'Disciplinary procedures', 'Wrongful termination', 'Employment tribunals']
      },
      {
        id: '4',
        title: 'Real Estate Law',
        description: 'Professional legal services for all property-related transactions and disputes.',
        icon: 'Home',
        features: ['Property transactions', 'Land registration', 'Lease agreements', 'Property disputes', 'Due diligence']
      },
      {
        id: '5',
        title: 'Intellectual Property',
        description: 'Protection and enforcement of intellectual property rights.',
        icon: 'Shield',
        features: ['Trademark registration', 'Copyright protection', 'Patent applications', 'IP licensing', 'Infringement disputes']
      },
      {
        id: '6',
        title: 'Family Law',
        description: 'Compassionate legal support for family-related matters.',
        icon: 'Heart',
        features: ['Divorce proceedings', 'Child custody', 'Adoption services', 'Prenuptial agreements', 'Domestic violence']
      }
    ];

    setServices(staticServices);
    setLoading(false);
  }, []);

  const featuredService = services[0]; // Corporate Law as featured

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
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/img/servicesBg1.png" 
            alt="Legal Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 text-center w-full max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-8 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Legal Services
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive legal solutions delivered with expertise, dedication, and personalized attention to every
            client's unique needs.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Practice Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team provides expert legal representation across a wide range of practice areas.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              const IconComponent = iconMap[service.icon] || Building;
              return (
                <motion.div 
                  key={service.id} 
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
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
                    className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-800 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="text-gray-600 text-sm space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="secondary" className="w-full group/btn bg-green-50 border-green-700 text-green-800 hover:bg-green-700 hover:text-white">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Service Section */}
      {featuredService && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-green-800 bg-opacity-10 rounded-2xl p-8">
                  <div className="relative w-full overflow-hidden rounded-lg" style={{aspectRatio: '4 / 3'}}>
                    <img 
                      src="/img/randoms/law_books.png" 
                      alt="Legal consultation"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Featured Service: {featuredService.title}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {featuredService.description} Our experienced team has handled numerous complex corporate matters,
                  ensuring our clients achieve their business objectives while maintaining full legal compliance.
                </p>
                
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900">What We Offer:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {featuredService.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-green-800 hover:bg-green-900">
                    Get Consultation
                  </Button>
                  <Button variant="secondary">
                    Download Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Legal Services?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine years of experience with innovative approaches to deliver exceptional legal outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="w-10 h-10 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Legal Team</h3>
              <p className="text-gray-600">
                Our lawyers are highly qualified and experienced in their respective practice areas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Client-Centered Approach</h3>
              <p className="text-gray-600">
                We prioritize understanding your unique needs and tailoring our services accordingly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Track Record</h3>
              <p className="text-gray-600">
                Our success rate speaks for itself with hundreds of satisfied clients and successful cases.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confidential & Secure</h3>
              <p className="text-gray-600">
                We maintain the highest standards of confidentiality and security for all client matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl mb-8 text-green-100">
            Our expert legal team is ready to help you navigate your legal challenges with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-800 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-green-800">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
