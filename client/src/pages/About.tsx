import { useState, useEffect } from 'react';
import { Shield, Users, Award, CheckCircle, Clock, Heart } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import heroBg from '../assets/hero_bg.png';
import { dataService, type TeamMember } from '../services/dataService';

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

  
  // Team data from JSON
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Load team and firm data from JSON
    const teamData = dataService.getTeamMembers();
    setTeam(teamData);
  }, []);

  const teamImageMap: Record<string, string> = {
    'masinde-dennis': '/img/Dennis.jpeg',
    'wanyonyi-jacob': '/img/Jacob.jpg',
    'beatrice-mutahi': '/img/Beatrice.jpg',
    'vallary-nyala': 'spinner',
    'godwin-lemashon': 'spinner'
  };

  const defaultTeamImage = '/img/randoms/img/Expert Legal Team.png';

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our dealings, ensuring transparency and honesty in every client relationship.'
    },
    {
      icon: Users,
      title: 'Client-Centric Service',
      description: 'We tailor our services to align with client needs and business realities, ensuring personalized solutions for every matter.'
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
      title: 'Innovation',
      description: 'We stay ahead of legal and regulatory developments to advise clients proactively, leveraging technology for efficiency.'
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen pt-20 flex items-center justify-center text-white overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg}
            alt="Professional legal consultation representing our firm's dedication to excellence" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"></div>
        </div>

        {/* Content */}
        <div 
          className="relative z-10 text-center w-full max-w-4xl mx-auto px-4"
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide"
          >
            About Our Firm
          </h1>
          <div
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Story, Values & People
            </h2>
            <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover our journey, meet our experienced legal team, and learn what drives our commitment to exceptional legal service
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Masinde Wanyonyi & Company Advocates</strong> is a full-service law firm established with 
                a vision to provide cutting-edge legal services that combine technical expertise, innovation, and 
                personalised client care. With three experienced Partners, two Senior Associates, and a robust support 
                team, the Firm stands as a distinguished legal practice in Kenya, serving both local and international clientele.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our practice is built on the foundation of Excellence, Integrity, and Client-Centric Service. We do not merely 
                provide legal services; we offer strategic legal solutions that safeguard our clients' interests, anticipate risks, 
                and secure sustainable outcomes. Our core objective is to be the go-to law firm for individuals, corporations, 
                institutions, and governments seeking reliable, innovative, and results-driven legal counsel in Kenya and the 
                wider East African region.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The Firm offers a wide array of legal services with particular depth in Conveyancing & Real Estate, Estate Planning 
                & Succession, Data Protection & Privacy Law, Risk & Compliance Advisory, Civil and Commercial Litigation, Criminal 
                Litigation, Corporate & Commercial Law, Immigration Law, Family Law, and Banking & Finance Law. We are fully digitised, 
                leveraging case management software, electronic filing systems, and access to leading legal databases.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                As Commissioners for Oaths and Notary Public, we carry the additional responsibility of serving as trusted 
                intermediaries in legal authentication and verification. From our strategic location at Duplex Suites, Suite 58, 
                Lower Hill Road, Upperhill, Nairobi, we maintain a network of correspondent firms across Mombasa, Kisumu, 
                Eldoret, and Nakuru, enabling seamless national coverage.
              </p>
          </div>

          {/* Stats with Counter Animation */}
          <div 
            className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl font-bold text-green-800 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div 
              className="bg-gradient-to-br from-green-800 to-green-900 text-white p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed text-green-50">
                To consistently provide strategic, efficient, and innovative legal services with integrity, 
                professionalism, and an unwavering commitment to client success. We strive to offer strategic 
                legal solutions that safeguard our clients' interests, anticipate risks, and secure sustainable 
                outcomes through our multi-disciplinary expertise and client-centric approach.
              </p>
            </div>
            
            <div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed text-gray-50">
                To be a premier law firm in Kenya and East Africa, delivering world-class legal solutions that 
                empower our clients to thrive in an evolving legal and business environment. We envision being 
                the go-to firm for individuals, corporations, institutions, and governments seeking reliable, 
                innovative, and results-driven legal counsel.
              </p>
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
            {team.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-8">
                  {/* Profile Image */}
                  {teamImageMap[member.id] === 'spinner' ? (
                    <div className="w-full h-48 flex items-center justify-center rounded-lg mb-6">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <img 
                      src={teamImageMap[member.id] || member.image || defaultTeamImage} 
                      alt={member.name}
                      className="w-full h-48 object-cover rounded-lg mb-6"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== defaultTeamImage) {
                          target.src = defaultTeamImage;
                        }
                      }}
                    />
                  )}
                  
                  {/* Basic Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-800 font-semibold mb-2">{member.title}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.specialization}</p>
                  
                  {/* Bio */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <a 
                      href={`mailto:${member.email}`}
                      className="block text-sm text-green-800 hover:text-green-900 transition-colors"
                    >
                      {member.email}
                    </a>
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
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
