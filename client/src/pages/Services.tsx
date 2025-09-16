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


interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  icon: string;
  features: string[];
  processSteps?: string[];
  timeline?: string;
  pricing?: string;
  category: 'local' | 'international';
}

const Services: React.FC = () => {
  // SEO optimization
  useSEO({
    title: 'Legal Services - Local & International Law Solutions | MWC Advocates',
    description: 'Expert legal services in Kenya: Real Estate, Succession, Conveyancing, Litigation, Cross-border Investments, Tax, Corporate Governance, IP, and Arbitration. MWC Advocates - Your trusted legal partner.',
    keywords: 'legal services Kenya, real estate law, succession planning, conveyancing, litigation Kenya, cross-border investments, tax law, corporate governance, intellectual property, arbitration, MWC Advocates'
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'local' | 'international'>('local');

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<any>> = {
    Home,
    FileText,
    Gavel,
    Heart,
    Globe,
    Shield,
    Building,
    TrendingUp,
    Award,
    Briefcase,
    Scale,
    Users,
    BookOpen,
    MapPin
  };

  useEffect(() => {
    // Enhanced services data with categories
    const categorizedServices: Service[] = [
      // Local Services
      {
        id: '1',
        title: 'Real Estate Law',
        description: 'Complete legal support for property transactions, from acquisition to disposal.',
        detailedDescription: 'Our real estate practice covers all aspects of property law in Kenya, including land acquisition, development, leasing, and dispute resolution. We work with individuals, developers, and institutional investors to ensure smooth and legally compliant property transactions.',
        icon: 'Home',
        features: [
          'Property purchase and sale agreements',
          'Land title searches and due diligence',
          'Property registration and transfer',
          'Lease agreements and tenancy matters',
          'Real estate development approvals',
          'Property dispute resolution',
          'Construction contracts',
          'Mortgage and financing documentation'
        ],
        processSteps: [
          'Initial consultation to understand your property needs',
          'Comprehensive due diligence and title search',
          'Draft and review of sale/purchase agreements',
          'Facilitate payment and transfer process',
          'Complete registration with relevant authorities'
        ],
        timeline: '2-6 weeks depending on complexity',
        pricing: 'Based on property value and transaction complexity',
        category: 'local'
      },
      {
        id: '2',
        title: 'Succession Planning',
        description: 'Expert guidance in estate planning and inheritance matters under Kenyan law.',
        detailedDescription: 'We provide comprehensive succession planning services to help you protect your assets and ensure your wishes are carried out. Our team handles both testate and intestate succession matters with sensitivity and professionalism.',
        icon: 'Heart',
        features: [
          'Will drafting and review',
          'Estate administration',
          'Probate and letters of administration',
          'Trust creation and management',
          'Inheritance dispute resolution',
          'Asset protection strategies',
          'Family provision claims',
          'Succession tax planning'
        ],
        processSteps: [
          'Review of assets and family circumstances',
          'Draft comprehensive will or trust documents',
          'Ensure proper execution and witnessing',
          'Safe custody of documents',
          'Regular reviews and updates as needed'
        ],
        timeline: '1-2 weeks for will drafting, 3-6 months for probate',
        pricing: 'Fixed fees for standard services, hourly rates for complex matters',
        category: 'local'
      },
      {
        id: '3',
        title: 'Conveyancing',
        description: 'Efficient and secure property transfer services across Kenya.',
        detailedDescription: 'Our conveyancing team ensures smooth property transfers with meticulous attention to detail. We handle both residential and commercial conveyancing, protecting your interests throughout the transaction.',
        icon: 'FileText',
        features: [
          'Sale and purchase transactions',
          'Property searches and investigations',
          'Stamp duty assessment and payment',
          'Registration at lands registry',
          'Subdivision and amalgamation',
          'Change of user applications',
          'Sectional property transfers',
          'Off-plan purchases'
        ],
        timeline: '4-8 weeks typically',
        pricing: 'Scale fees based on property value',
        category: 'local'
      },
      {
        id: '4',
        title: 'Litigation & Dispute Resolution',
        description: 'Strong representation in Kenyan courts and alternative dispute resolution forums.',
        detailedDescription: 'Our litigation team has extensive experience in commercial, civil, and constitutional matters. We pursue the most effective dispute resolution strategy, whether through negotiation, mediation, arbitration, or court proceedings.',
        icon: 'Gavel',
        features: [
          'Commercial litigation',
          'Civil disputes',
          'Constitutional petitions',
          'Employment and labor disputes',
          'Land and property disputes',
          'Debt recovery',
          'Judicial review proceedings',
          'Appeals and reviews'
        ],
        processSteps: [
          'Case evaluation and merit assessment',
          'Pre-litigation negotiation attempts',
          'Filing of court documents',
          'Discovery and evidence gathering',
          'Trial representation',
          'Post-judgment enforcement'
        ],
        timeline: 'Varies by case complexity and court schedules',
        pricing: 'Hourly rates or contingency fees depending on case type',
        category: 'local'
      },
      // International Services
      {
        id: '5',
        title: 'Cross-Border Investments',
        description: 'Navigate international investment opportunities with expert legal guidance.',
        detailedDescription: 'We assist both foreign investors entering Kenya and Kenyan businesses expanding internationally. Our team ensures compliance with local and international regulations while structuring investments for optimal returns.',
        icon: 'Globe',
        features: [
          'Foreign investment structuring',
          'Investment licensing and permits',
          'Joint venture agreements',
          'Cross-border M&A transactions',
          'Bilateral investment treaty advice',
          'Repatriation of profits',
          'Exchange control compliance',
          'Investment protection strategies'
        ],
        processSteps: [
          'Investment structure planning',
          'Regulatory compliance review',
          'Documentation and agreements',
          'Licensing and registration',
          'Ongoing compliance support'
        ],
        timeline: '2-3 months for typical investment setup',
        pricing: 'Project-based fees or retainer arrangements',
        category: 'international'
      },
      {
        id: '6',
        title: 'International Tax Law',
        description: 'Strategic tax planning for cross-border transactions and operations.',
        detailedDescription: 'Our tax team provides comprehensive advice on Kenyan and international tax matters, helping clients optimize their tax position while ensuring full compliance with applicable laws.',
        icon: 'TrendingUp',
        features: [
          'Double taxation agreements',
          'Transfer pricing',
          'International tax planning',
          'Tax treaty interpretation',
          'Withholding tax advice',
          'VAT on cross-border supplies',
          'Permanent establishment issues',
          'Tax dispute resolution'
        ],
        timeline: 'Ongoing advisory services',
        pricing: 'Hourly rates or annual retainer',
        category: 'international'
      },
      {
        id: '7',
        title: 'Corporate Governance',
        description: 'Ensure compliance with local and international corporate governance standards.',
        detailedDescription: 'We help companies establish and maintain robust corporate governance frameworks that meet regulatory requirements and international best practices, enhancing investor confidence and operational efficiency.',
        icon: 'Building',
        features: [
          'Board advisory services',
          'Corporate governance audits',
          'Policy development',
          'Director training programs',
          'Shareholder agreement drafting',
          'Corporate secretarial services',
          'Regulatory compliance',
          'ESG advisory'
        ],
        processSteps: [
          'Governance assessment and gap analysis',
          'Policy and procedure development',
          'Implementation support',
          'Training and capacity building',
          'Ongoing monitoring and updates'
        ],
        timeline: '3-6 months for full implementation',
        pricing: 'Project fees or ongoing retainer',
        category: 'international'
      },
      {
        id: '8',
        title: 'Intellectual Property',
        description: 'Protect and monetize your intellectual property across borders.',
        detailedDescription: 'Our IP team helps clients protect their innovations, brands, and creative works in Kenya and internationally. We handle registration, enforcement, and commercialization of all forms of intellectual property.',
        icon: 'Shield',
        features: [
          'Trademark registration and protection',
          'Patent filing and prosecution',
          'Copyright registration',
          'IP licensing agreements',
          'Anti-counterfeiting actions',
          'Domain name disputes',
          'Trade secrets protection',
          'IP portfolio management'
        ],
        timeline: '6-12 months for registrations',
        pricing: 'Fixed fees for registrations, hourly for advisory',
        category: 'international'
      },
      {
        id: '9',
        title: 'International Arbitration',
        description: 'Expert representation in international commercial arbitration proceedings.',
        detailedDescription: 'We represent clients in international arbitrations under various rules including ICC, LCIA, and ICSID. Our team has extensive experience in complex cross-border disputes across multiple sectors.',
        icon: 'Scale',
        features: [
          'International commercial arbitration',
          'Investment treaty arbitration',
          'Arbitration agreement drafting',
          'Arbitrator appointments',
          'Enforcement of foreign awards',
          'Setting aside applications',
          'Emergency arbitrator proceedings',
          'Multi-party arbitrations'
        ],
        processSteps: [
          'Case assessment and strategy development',
          'Arbitrator selection and challenge',
          'Pleadings and evidence preparation',
          'Hearing representation',
          'Award enforcement or challenge'
        ],
        timeline: '12-24 months typically',
        pricing: 'Hourly rates or success fees',
        category: 'international'
      },
      {
        id: '10',
        title: 'Regulatory Compliance',
        description: 'Navigate complex regulatory requirements for international operations.',
        detailedDescription: 'We help businesses understand and comply with the regulatory landscape in Kenya and internationally, covering sectors including financial services, telecommunications, energy, and healthcare.',
        icon: 'BookOpen',
        features: [
          'Regulatory licensing',
          'Compliance audits',
          'Anti-money laundering',
          'Data protection and privacy',
          'Competition law compliance',
          'Sector-specific regulations',
          'Regulatory investigations',
          'Compliance training'
        ],
        timeline: 'Ongoing advisory and support',
        pricing: 'Retainer or project-based fees',
        category: 'international'
      }
    ];

    setServices(categorizedServices);
    setLoading(false);
  }, []);

  const localServices = services.filter(s => s.category === 'local');
  const internationalServices = services.filter(s => s.category === 'international');

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
            Local expertise meets international standards. From property law to cross-border investments.
          </motion.p>
          
          {/* Service Categories Toggle */}
          <motion.div 
            className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => setActiveTab('local')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'local' 
                  ? 'bg-white text-green-800' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <MapPin className="inline-block w-4 h-4 mr-2" />
              Local Services
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'international' 
                  ? 'bg-white text-green-800' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Globe className="inline-block w-4 h-4 mr-2" />
              International Focus
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {activeTab === 'local' ? 'Local Legal Services' : 'International Legal Services'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeTab === 'local' 
                ? 'Expert legal solutions tailored to Kenyan law and local business needs.'
                : 'Navigate global markets with confidence through our international legal expertise.'}
            </p>
          </div>

          {/* Services Grid */}
          <motion.div 
            key={activeTab}
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
            {(activeTab === 'local' ? localServices : internationalServices).map((service, _index) => {
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
              Bridging local expertise with international standards
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600 text-sm">
                Deep understanding of Kenyan law and regulatory landscape
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">
                International partnerships and cross-border expertise
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Proven Track Record</h3>
              <p className="text-gray-600 text-sm">
                Years of successful cases and satisfied clients
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