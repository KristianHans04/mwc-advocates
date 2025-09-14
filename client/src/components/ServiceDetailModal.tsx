import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    detailedDescription?: string;
    features: string[];
    processSteps?: string[];
    pricing?: string;
    timeline?: string;
  };
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ isOpen, onClose, service }) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    onClose();
    navigate('/contact');
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Header */}
              <div className="bg-gradient-to-br from-green-700 to-green-900 text-white p-8 rounded-t-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-green-100">{service.description}</p>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Detailed Description */}
                {service.detailedDescription && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{service.detailedDescription}</p>
                  </div>
                )}
                
                {/* Services Included */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Services Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Process Steps */}
                {service.processSteps && service.processSteps.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Process</h3>
                    <div className="space-y-4">
                      {service.processSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-green-800 font-semibold">{index + 1}</span>
                          </div>
                          <p className="text-gray-600 pt-1">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Timeline & Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.timeline && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Typical Timeline</h4>
                      <p className="text-gray-600">{service.timeline}</p>
                    </div>
                  )}
                  {service.pricing && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                      <p className="text-gray-600">{service.pricing}</p>
                    </div>
                  )}
                </div>
                
                {/* CTA */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="bg-green-800 hover:bg-green-900"
                      onClick={handleGetStarted}
                    >
                      Get Started with {service.title}
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;