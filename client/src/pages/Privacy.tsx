/**
 * Privacy Policy page for MWC Advocates
 * Compliant with Kenya Data Protection Act, 2019
 */

import { motion } from 'framer-motion';
import { Shield, FileText, Lock, Eye, UserCheck, AlertCircle, Mail, Phone } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Privacy: React.FC = () => {
  // SEO optimization
  useSEO({
    title: 'Privacy Policy - MWC Advocates',
    description: 'Privacy Policy for Masinde Wanyonyi & Company Advocates. Learn how we collect, use, and protect your personal data in compliance with the Kenya Data Protection Act, 2019.',
    keywords: 'privacy policy, data protection, KDPA, Kenya Data Protection Act, MWC Advocates, legal privacy'
  });

  const sections = [
    {
      icon: Shield,
      title: "1. Introduction",
      content: `This Privacy Policy explains how Masinde Wanyonyi & Company Advocates, Commissioners for Oaths and Notary Public ("we," "us," or "our") collects, uses, discloses, and protects your personal data in accordance with the Kenya Data Protection Act, 2019 (KDPA) and other applicable laws.

      By engaging our services or using our website, you consent to the collection and use of your personal data as described in this Privacy Policy. We are committed to protecting your privacy and ensuring the security of your personal information.`
    },
    {
      icon: FileText,
      title: "2. Data Controller Information",
      content: `Masinde Wanyonyi & Company Advocates is the data controller responsible for your personal data.

      Registered Office: Duplex Suites, Suite 58, Lower Hill Road, Upperhill, Nairobi, Kenya
      Phone: +254 702 073 800 / +254 708 792 078
      Email: masindewanyonyi.co@gmail.com
      
      Our Data Protection Officer can be contacted at the above address for any queries regarding this Privacy Policy or your data protection rights.`
    },
    {
      icon: Eye,
      title: "3. Personal Data We Collect",
      content: `In accordance with the KDPA, we collect and process the following categories of personal data:

      a) Identity Data: Name, title, date of birth, national ID or passport number
      b) Contact Data: Address, email address, telephone numbers
      c) Professional Data: Occupation, employer information, business details
      d) Legal Matter Data: Information relevant to your legal matter, case details, documents
      e) Financial Data: Banking details, payment information (where applicable)
      f) Communication Data: Records of our communications with you
      
      We do not collect special categories of personal data (sensitive data) unless specifically required for your legal matter and with your explicit consent.`
    },
    {
      icon: UserCheck,
      title: "4. Legal Basis for Processing",
      content: `We process your personal data under the following legal bases as provided by the KDPA:

      a) Consent: Where you have given clear consent for us to process your personal data
      b) Contract: Processing necessary for the performance of our legal services contract with you
      c) Legal Obligation: To comply with legal and regulatory requirements
      d) Legitimate Interests: For our legitimate business interests, provided they do not override your rights
      e) Vital Interests: Where processing is necessary to protect someone's life
      f) Public Task: Where processing is necessary for tasks carried out in the public interest`
    },
    {
      icon: Lock,
      title: "5. How We Use Your Personal Data",
      content: `We use your personal data for the following purposes:

      a) Providing Legal Services:
      - To provide legal advice and representation
      - To prepare legal documents and court filings
      - To communicate with you about your matter
      - To manage our client relationships
      
      b) Legal and Regulatory Compliance:
      - To comply with professional regulations
      - To fulfill anti-money laundering obligations
      - To maintain statutory records
      - To respond to legal requests from authorities
      
      c) Business Operations:
      - To manage payments and billing
      - To improve our services
      - To maintain our records
      - To handle complaints and disputes`
    },
    {
      icon: Shield,
      title: "6. Data Sharing and Disclosure",
      content: `We may share your personal data with:

      a) Courts and Tribunals: As required for legal proceedings
      b) Other Legal Professionals: With your consent or as necessary for your matter
      c) Regulatory Bodies: Law Society of Kenya, Kenya Revenue Authority, and other regulators
      d) Service Providers: IT support, accounting services (under strict confidentiality)
      e) Law Enforcement: When legally required or to protect rights
      
      We will never sell your personal data to third parties. All data sharing is done in compliance with the KDPA and professional confidentiality obligations.`
    },
    {
      icon: Lock,
      title: "7. International Data Transfers",
      content: `Your personal data may be transferred outside Kenya only when:

      a) The country ensures adequate level of data protection
      b) Appropriate safeguards are in place (such as standard contractual clauses)
      c) You have provided explicit consent
      d) Transfer is necessary for the performance of our contract with you
      e) Transfer is necessary for legal claims
      
      We ensure all international transfers comply with Chapter VI of the KDPA.`
    },
    {
      icon: Shield,
      title: "8. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal data against:

      - Unauthorized or unlawful processing
      - Accidental loss, destruction, or damage
      - Unauthorized access or disclosure
      
      Security measures include:
      - Physical security of our offices and files
      - Password protection and encryption
      - Access controls and staff training
      - Regular security assessments
      - Secure disposal of documents
      - Professional indemnity insurance`
    },
    {
      icon: FileText,
      title: "9. Data Retention",
      content: `We retain your personal data for as long as necessary to:

      a) Provide our legal services
      b) Comply with legal and regulatory requirements
      c) Establish, exercise, or defend legal claims
      
      Typical retention periods:
      - Client matter files: Minimum 7 years after matter closure
      - Accounting records: 7 years as required by law
      - Litigation files: 10 years or as advised by professional indemnity insurers
      - Marketing data: Until you withdraw consent
      
      After retention periods expire, we securely destroy or anonymize your data.`
    },
    {
      icon: UserCheck,
      title: "10. Your Rights Under the KDPA",
      content: `As a data subject, you have the following rights under the Kenya Data Protection Act:

      a) Right to be Informed: About how we process your data (this Privacy Policy)
      b) Right of Access: To request a copy of your personal data
      c) Right to Rectification: To correct inaccurate or incomplete data
      d) Right to Erasure: To request deletion of your data (subject to legal obligations)
      e) Right to Object: To object to processing based on legitimate interests
      f) Right to Data Portability: To receive your data in a structured format
      g) Right to Restrict Processing: To limit how we use your data
      h) Rights Related to Automated Decision Making: We do not use automated decision-making
      
      To exercise any of these rights, please contact our Data Protection Officer. We will respond within 30 days as required by the KDPA.`
    },
    {
      icon: AlertCircle,
      title: "11. Data Breach Notification",
      content: `In the event of a personal data breach that is likely to result in risk to your rights and freedoms, we will:

      a) Notify the Office of the Data Protection Commissioner within 72 hours
      b) Notify affected data subjects without undue delay
      c) Document the breach and actions taken
      d) Implement measures to prevent future breaches
      
      Our incident response plan ensures compliance with Section 43 of the KDPA.`
    },
    {
      icon: Mail,
      title: "12. Complaints",
      content: `If you have concerns about how we handle your personal data:

      1. First, contact our Data Protection Officer at masindewanyonyi.co@gmail.com
      2. We will investigate and respond within 30 days`
    },
    {
      icon: FileText,
      title: "13. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy to reflect:

      - Changes in our practices
      - Legal or regulatory requirements
      - Feedback from clients and regulators
      
      Material changes will be communicated via:
      - Email notification to clients
      - Prominent notice on our website
      - Direct communication for active matters
      
      The updated version will always be available on our website with the revision date.`
    },
    {
      icon: Shield,
      title: "14. Children's Privacy",
      content: `Our services are not directed at children under 18 years. We do not knowingly collect personal data from children except:

      - With parental/guardian consent
      - As necessary for legal representation of minors
      - As required by law or court order
      
      When representing minors, we ensure appropriate consents and safeguards are in place.`
    },
    {
      icon: Phone,
      title: "15. Contact Us",
      content: `For any questions about this Privacy Policy or our data protection practices:

      Data Protection Officer
      Masinde Wanyonyi & Company Advocates
      Duplex Suites, Suite 58, Lower Hill Road
      Upperhill, Nairobi, Kenya
      
      Phone: +254 702 073 800 / +254 708 792 078
      Email: masindewanyonyi.co@gmail.com
      Office Hours: Monday - Friday, 8:00 AM - 6:00 PM
      
      We are committed to addressing your concerns promptly and transparently.`
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 to-green-900 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <motion.div 
          className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
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
            className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your Privacy is Our Priority
          </motion.p>
          <motion.p 
            className="text-lg text-green-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Compliant with the Kenya Data Protection Act, 2019
          </motion.p>
        </motion.div>
      </section>

      {/* Effective Date Notice */}
      <section className="bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center text-green-800">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p className="font-medium">
              Effective Date: January 1, 2025 | Last Updated: January 14, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div 
                  key={index} 
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-green-800" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h2>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Notice */}
          <motion.div 
            className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3">Important Notice</h3>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy forms part of our terms of engagement. By engaging our services, you acknowledge 
              that you have read, understood, and agreed to the terms of this Privacy Policy. We recommend that you 
              review this policy periodically for any updates.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Masinde Wanyonyi & Company Advocates is committed to maintaining the highest standards of data protection 
              and client confidentiality as required by the Kenya Data Protection Act, 2019, and our professional obligations 
              as advocates of the High Court of Kenya.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;