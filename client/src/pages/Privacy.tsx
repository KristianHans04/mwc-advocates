import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, FileText, AlertTriangle } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Privacy: React.FC = () => {
  // SEO optimization
  useSEO({
    title: 'Privacy Policy - MWC Advocates Data Protection',
    description: 'MWC Advocates Privacy Policy - Learn how we protect your personal information, maintain attorney-client privilege, and ensure confidentiality in all legal matters. GDPR compliant law firm in Kenya.',
    keywords: 'privacy policy, data protection, attorney-client privilege, confidentiality, legal privacy, MWC Advocates privacy'
  });
  const privacyPrinciples = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We implement robust security measures to protect your personal and confidential information.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We are transparent about what information we collect, how we use it, and with whom we share it.'
    },
    {
      icon: Lock,
      title: 'Confidentiality',
      description: 'All client communications are protected by attorney-client privilege and strict confidentiality.'
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      description: 'You have the right to access, correct, or delete your personal information at any time.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            className="text-xl text-green-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your privacy and confidentiality are fundamental to our legal practice. Learn how we protect your information.
          </motion.p>
        </motion.div>
      </section>

      {/* Privacy Principles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Privacy Principles</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core principles guide how we handle your personal information and maintain confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {privacyPrinciples.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-green-800" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We collect information that you provide to us directly, such as when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contact us for legal consultation or services</li>
                  <li>Fill out our contact forms or subscribe to our newsletter</li>
                  <li>Visit our office or communicate with us via phone, email, or in person</li>
                  <li>Provide documents or information related to your legal matter</li>
                </ul>
                <p>
                  The types of information we may collect include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal identification information (name, address, phone number, email)</li>
                  <li>Professional information (company, position, business details)</li>
                  <li>Legal matter details and related documentation</li>
                  <li>Financial information relevant to your legal matter</li>
                  <li>Communication records and case notes</li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Providing legal services and consultation</li>
                  <li>Communicating with you about your legal matters</li>
                  <li>Maintaining accurate case files and documentation</li>
                  <li>Billing and payment processing</li>
                  <li>Complying with legal and regulatory requirements</li>
                  <li>Improving our services and client experience</li>
                  <li>Sending important updates about your case or our services</li>
                </ul>
              </div>
            </div>

            {/* Attorney-Client Privilege */}
            <div className="mb-12 bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
                <Lock className="w-6 h-6 mr-3" />
                Attorney-Client Privilege
              </h2>
              <div className="space-y-4 text-green-800">
                <p>
                  <strong>All communications between you and our law firm are protected by attorney-client privilege.</strong> 
                  This means that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your confidential communications cannot be disclosed without your consent</li>
                  <li>We have a professional and legal duty to maintain confidentiality</li>
                  <li>This privilege belongs to you and can only be waived by you</li>
                  <li>The privilege generally survives even after our representation ends</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following limited circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>With your consent:</strong> When you explicitly authorize us to share information</li>
                  <li><strong>Legal requirements:</strong> When required by law, court order, or legal process</li>
                  <li><strong>Professional consultants:</strong> With other lawyers, experts, or consultants working on your case</li>
                  <li><strong>Service providers:</strong> With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                  <li><strong>Protection of rights:</strong> When necessary to protect our legal rights or the rights of others</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We implement comprehensive security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encrypted data transmission and storage</li>
                  <li>Secure physical and electronic access controls</li>
                  <li>Regular security assessments and updates</li>
                  <li>Employee training on confidentiality and data protection</li>
                  <li>Secure document management systems</li>
                  <li>Regular data backups and disaster recovery procedures</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
                  <li><strong>Restriction:</strong> Request restriction of how we process your information</li>
                  <li><strong>Portability:</strong> Request transfer of your information to another party</li>
                  <li><strong>Objection:</strong> Object to certain types of processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide legal services and maintain our attorney-client relationship</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Resolve disputes and enforce our agreements</li>
                  <li>Protect our legal rights and interests</li>
                </ul>
                <p>
                  In general, we retain client files for a minimum of seven years after the conclusion of representation, 
                  or longer as required by law or professional rules.
                </p>
              </div>
            </div>

            {/* Website Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Privacy</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  When you visit our website, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
                <p>
                  This information helps us improve our website and better serve our clients. 
                  You can control cookie settings through your browser preferences.
                </p>
              </div>
            </div>

            {/* Updates to Privacy Policy */}
            <div className="mb-12 bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3" />
                Updates to This Privacy Policy
              </h2>
              <div className="space-y-4 text-yellow-800">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                  We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending you a notification if we have your contact information</li>
                  <li>Providing notice during your next visit to our office</li>
                </ul>
                <p>
                  <strong>Last updated:</strong> January 2024
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us About Privacy</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">By Mail:</h4>
                    <p>
                      Masinde Wanyonyi & Company Advocates<br />
                      Lower Hill Road, Upperhill<br />
                      Nairobi, Kenya<br />
                      P.O. Box 12345-00100
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">By Email or Phone:</h4>
                    <p>
                      Email: privacy@mwcadvocates.com<br />
                      Phone: +254 700 123 456<br />
                      Office Hours: Monday - Friday, 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
