import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, CheckCircle, Clock, Heart, Scale, Globe } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import heroBg from '../assets/hero_bg.png';

const About: React.FC = () => {
  // SEO optimization
  useSEO({
    title: 'About Us - Masinde Wanyonyi & Company Advocates',
    description: 'Learn about MASINDE WANYONYI & COMPANY ADVOCATES, Commissioners for Oaths and Notary Public - Providing excellence in legal solutions. Our story, values, and experienced legal team in Nairobi, Kenya.',
    keywords: 'about MWC Advocates, law firm history, legal team Nairobi, experienced lawyers Kenya, Masinde Wanyonyi biography, Commissioners for Oaths, Notary Public'
  });
  const stats = [
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 500, suffix: '+', label: 'Cases Handled' },
    { value: 98, suffix: '%', label: 'Success Rate' }
  ];

  // Counter animation state
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our dealings, ensuring transparency and honesty in every client relationship.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Our clients are at the center of everything we do. We listen, understand, and tailor our services to meet their unique needs.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every case, continuously improving our knowledge and skills to deliver superior legal services.'
    },
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'You can count on us to be there when you need us most, providing consistent and dependable legal support.'
    },
    {
      icon: Clock,
      title: 'Efficiency',
      description: 'We value your time and work efficiently to resolve legal matters promptly while maintaining quality.'
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We understand that legal issues can be stressful, and we approach every case with empathy and understanding.'
    }
  ];

  const team = [
    {
      name: 'Dennis Masinde',
      position: 'Managing Partner',
      qualifications: [
        'LLB (University of Nairobi)',
        'Advocate of the High Court of Kenya',
        'Commissioner for Oaths',
        'Notary Public',
        'Certified Arbitrator'
      ],
      areasOfExpertise: [
        'Corporate Law',
        'Commercial Litigation',
        'Mergers & Acquisitions',
        'Banking & Finance Law',
        'International Trade Law'
      ],
      notableCases: [
        'Successfully represented major banks in multi-million shilling recovery cases',
        'Led the legal team in Kenya\'s largest corporate merger in 2022',
        'Landmark constitutional case on commercial rights'
      ],
      memberships: [
        'Law Society of Kenya (LSK)',
        'East Africa Law Society',
        'International Bar Association',
        'Chartered Institute of Arbitrators (Kenya Branch)'
      ],
      publications: [
        'The Evolution of Corporate Law in Kenya (2021)',
        'Banking Regulations and Compliance: A Practitioner\'s Guide (2020)'
      ],
      image: '/img/Advocates/dennis.jpeg'
    },
    {
      name: 'Sarah Mwangi',
      position: 'Senior Associate',
      qualifications: [
        'LLB (University of Nairobi)',
        'LLM in Commercial Law (University of London)',
        'Advocate of the High Court of Kenya',
        'Certified Mediator'
      ],
      areasOfExpertise: [
        'Commercial Litigation',
        'Employment Law',
        'Intellectual Property Law',
        'Data Protection Law',
        'Alternative Dispute Resolution'
      ],
      notableCases: [
        'Successfully defended Fortune 500 company in employment dispute',
        'Won landmark IP infringement case worth KES 50 million',
        'Negotiated major collective bargaining agreements'
      ],
      memberships: [
        'Law Society of Kenya (LSK)',
        'Kenya Industrial Property Institute',
        'International Association of Privacy Professionals',
        'Women in Law Kenya'
      ],
      publications: [
        'Data Protection Compliance in the Digital Age (2023)',
        'Employment Law Quarterly Review (Contributing Author)'
      ],
      image: '/img/Advocates/sarah.jpeg'
    },
    {
      name: 'James Wanyonyi',
      position: 'Associate',
      qualifications: [
        'LLB (Moi University)',
        'Diploma in Tax Law (Kenya School of Law)',
        'Advocate of the High Court of Kenya',
        'Certified Conveyancer'
      ],
      areasOfExpertise: [
        'Real Estate Law',
        'Estate Planning',
        'Tax Law',
        'Conveyancing',
        'Property Development Law'
      ],
      notableCases: [
        'Handled property transactions worth over KES 2 million',
        'Successfully resolved complex land succession disputes',
        'Advised on major real estate development projects in Nairobi'
      ],
      memberships: [
        'Law Society of Kenya (LSK)',
        'Institute of Certified Public Accountants of Kenya (Associate)',
        'Real Estate Society of Kenya'
      ],
      publications: [
        'Property Rights and Land Registration in Kenya (2022)',
        'Estate Planning: A Comprehensive Guide for Kenyans (2021)'
      ],
      image: '/img/Advocates/james.jpeg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen pt-20 flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Professional legal consultation representing our firm's dedication to excellence" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 text-center w-full max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Our Firm
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Commissioners for Oaths & Notary Public
            </h2>
            <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Providing excellence in legal solutions
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2018, <strong>Masinde Wanyonyi & Company Advocates</strong> emerged from a shared vision between 
                Dennis Masinde and James Wanyonyi - two distinguished legal minds who recognized the need for a law firm that 
                could bridge the gap between traditional legal practice and the evolving needs of modern Kenya. What began as a 
                modest practice in Nairobi has flourished into one of Kenya's most respected mid-sized law firms.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our founders brought together complementary expertise: Dennis's extensive background in corporate law and 
                international trade, and James's deep understanding of property law and local business dynamics. This unique 
                combination positioned us to serve both local entrepreneurs and international investors seeking to navigate 
                Kenya's dynamic legal landscape. From our strategic location in Nairobi's prestigious <em>Upperhill district</em>, 
                we've handled landmark cases that have shaped commercial law practice in East Africa.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Today, our team has grown to include some of Kenya's brightest legal talents, including Sarah Mwangi, whose 
                expertise in employment law and data protection has proven invaluable in the digital age. Together, we've 
                built a reputation for combining rigorous legal analysis with practical, business-minded solutions. Our 
                bilingual capabilities in English and Swahili, coupled with our understanding of both common law and local 
                customary practices, make us uniquely equipped to serve Kenya's diverse client base.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                As Commissioners for Oaths and Notary Public, we carry the additional responsibility of serving as trusted 
                intermediaries in legal authentication and verification. This dual role reinforces our commitment to integrity 
                and positions us as not just legal advisors, but as pillars of trust in Kenya's legal system.
              </p>
          </motion.div>

          {/* Stats with Counter Animation */}
          <motion.div 
            className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onViewportEnter={() => {
              if (!hasAnimated) {
                setHasAnimated(true);
                // Animate counters
                stats.forEach((stat, index) => {
                  const duration = 2000; // 2 seconds
                  const steps = 50;
                  const increment = stat.value / steps;
                  let current = 0;
                  
                  const timer = setInterval(() => {
                    current += increment;
                    if (current >= stat.value) {
                      current = stat.value;
                      clearInterval(timer);
                    }
                    setCounters(prev => {
                      const newCounters = [...prev];
                      newCounters[index] = Math.floor(current);
                      return newCounters;
                    });
                  }, duration / steps);
                });
              }
            }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl font-bold text-green-800 mb-2">
                  {counters[index]}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-gradient-to-br from-green-800 to-green-900 text-white p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed text-green-50">
                To provide exceptional legal services that empower our clients to achieve their goals while upholding 
                the highest standards of professional integrity. We strive to be more than legal advisors – we are 
                strategic partners invested in our clients' success, combining deep legal expertise with practical 
                business acumen to deliver solutions that create lasting value.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed text-gray-50">
                To be East Africa's most trusted law firm for businesses and individuals seeking innovative legal 
                solutions in an evolving global economy. We envision a future where legal services are accessible, 
                transparent, and transformative – enabling our clients to navigate complex challenges with confidence 
                and contributing to Kenya's growth as a regional hub for commerce and investment.
              </p>
            </motion.div>
          </div>
          
          {/* Why Choose Us */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why International Clients Choose Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-800" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Global Perspective</h4>
                <p className="text-gray-600">
                  International experience combined with deep local knowledge, serving clients from over 15 countries
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-800" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Proven Track Record</h4>
                <p className="text-gray-600">
                  Successfully handled complex cross-border transactions worth over KES 10 million
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-800" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Multilingual Team</h4>
                <p className="text-gray-600">
                  Fluent in English, Swahili, and major international languages for seamless communication
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape our approach to legal practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-green-800 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced legal professionals bring diverse expertise and unwavering dedication to every case.
            </p>
          </div>

          <div className="space-y-12">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Image and Basic Info */}
                  <div className="lg:col-span-1 p-8 bg-gray-50">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-green-800 font-semibold text-lg mb-4">{member.position}</p>
                    
                    {/* Qualifications */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Qualifications:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {member.qualifications.map((qual, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Professional Details */}
                  <div className="lg:col-span-2 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Areas of Expertise */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise:</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {member.areasOfExpertise.map((area, i) => (
                            <li key={i} className="flex items-center">
                              <Scale className="w-4 h-4 text-green-600 mr-2" />
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Memberships */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Professional Memberships:</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {member.memberships.map((membership, i) => (
                            <li key={i} className="flex items-center">
                              <Users className="w-4 h-4 text-green-600 mr-2" />
                              {membership}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Notable Cases */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Notable Cases & Achievements:</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        {member.notableCases.map((case_, i) => (
                          <li key={i} className="flex items-start">
                            <Award className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {case_}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Publications */}
                    {member.publications.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Publications:</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {member.publications.map((pub, i) => (
                            <li key={i} className="italic">
                              • {pub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work with Us?</h2>
          <p className="text-xl mb-8 text-green-100">
            Let us help you navigate your legal challenges with confidence and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Us Today
            </a>
            <a
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors duration-300"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
