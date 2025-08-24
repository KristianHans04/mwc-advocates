/**
 * Footer component for MWC Advocates
 * Responsive design: 3 columns on desktop, 2 columns on tablet, 1 column on mobile
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Scale, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Scale className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <h3 className="text-xl font-bold">MWC Advocates</h3>
                <p className="text-sm text-gray-400">Legal Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              MASINDE WANYONYI & COMPANY ADVOCATES<br />
              Premier law firm providing expert legal services in Nairobi, Kenya.
              We are committed to delivering practical solutions tailored to your specific needs.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">P.O. Box 46723-00100, Nairobi, Kenya</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">+254 702 073 800 / +254 708 792 078</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">masindewanyonyi.co@gmail.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-green-400">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm block"
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/about" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm block"
                  >
                    About Us
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/services" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm block"
                  >
                    Services
                  </Link>
                </motion.div>
              </div>
              <div className="space-y-3">
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/contact" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm block"
                  >
                    Contact Us
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    to="/privacy" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm block"
                  >
                    Privacy Policy
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-green-400">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 mr-2 text-green-400" />
                  <h4 className="font-medium text-white">Office Hours</h4>
                </div>
                <p className="text-gray-300 text-sm ml-6">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-300 text-sm ml-6">Saturday: 9:00 AM - 1:00 PM</p>
                <p className="text-gray-300 text-sm ml-6">Sunday: Closed</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Emergency Contact</h4>
                <p className="text-gray-300 text-sm">Available 24/7 for urgent legal matters</p>
                <p className="text-green-400 font-medium text-sm">+254 702 073 800</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Masinde Wanyonyi & Company Advocates. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              <Link to="/privacy" className="hover:text-green-400 transition-colors duration-300">
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
