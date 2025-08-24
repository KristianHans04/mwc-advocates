import { motion } from 'framer-motion';
import { Shield, Users, Award, CheckCircle, Clock, Heart } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const About: React.FC = () => {
  // SEO optimization
  useSEO({
    title: 'About Us - MWC Advocates Legal Firm',
    description: 'Learn about MASINDE WANYONYI & COMPANY ADVOCATES - Our story, values, and experienced legal team. Over 5 years of excellence in providing legal services in Nairobi, Kenya with 98% success rate.',
    keywords: 'about MWC Advocates, law firm history, legal team Nairobi, experienced lawyers Kenya, Masinde Wanyonyi biography'
  });
  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '500+', label: 'Cases Handled' },
    { value: '98%', label: 'Success Rate' }
  ];

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
      name: 'Masinde Wanyonyi',
      position: 'Managing Partner',
      education: 'LLB (University of Nairobi), Advocate of the High Court of Kenya',
      description: 'With over 15 years of experience in corporate law and litigation, Masinde leads our firm with vision and expertise.',
      image: '/img/randoms/justice.png'
    },
    {
      name: 'Sarah Mwangi',
      position: 'Senior Associate',
      education: 'LLB, LLM (Commercial Law)',
      description: 'Specializes in commercial litigation and employment law with a track record of successful case outcomes.',
      image: '/img/randoms/law_books.png'
    },
    {
      name: 'James Kiprotich',
      position: 'Associate',
      education: 'LLB, Diploma in Tax Law',
      description: 'Expert in real estate law and intellectual property with particular focus on property transactions.',
      image: '/img/randoms/gavel.png'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/img/heroBg.jpg" 
            alt="Professional legal consultation representing our firm's dedication to excellence" 
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Our Firm
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dedicated to providing exceptional legal services with integrity, professionalism, and unwavering
            commitment to our clients.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Masinde Wanyonyi & Company Advocates</strong> was established with a vision to provide
                comprehensive, client-focused legal services in Kenya. Our firm has grown to become a trusted
                name in the Kenyan legal landscape, serving individuals, businesses, and organizations with
                distinction.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Located in the heart of Nairobi's <em>Upperhill district</em>, we are strategically positioned
                to serve clients across Kenya and beyond. Our commitment to excellence, combined with deep local
                knowledge and international standards, sets us apart in the legal profession.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We believe in building long-term relationships with our clients, understanding their unique
                needs, and providing tailored legal solutions that drive positive outcomes.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="relative hidden md:block">
                <div className="bg-green-800 bg-opacity-5 rounded-2xl p-8">
                  <div className="relative w-full overflow-hidden rounded-lg" style={{aspectRatio: '4 / 3'}}>
                    <img 
                      src="/img/randoms/justice.png" 
                      alt="Legal Books and Justice"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-3 aspect-h-3">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-800 font-semibold mb-2">{member.position}</p>
                  <p className="text-sm text-gray-600 mb-3">{member.education}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
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
