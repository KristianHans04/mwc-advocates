/**
 * Article Detail Modal Component
 * Displays full article content in a modal overlay
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Clock, Tag, Share2, Printer } from 'lucide-react';
import Button from './ui/Button';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
  type: 'article' | 'publication' | 'media';
}

interface ArticleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ isOpen, onClose, article }) => {
  if (!article) return null;

  // Map categories to their background images
  const categoryBackgrounds: { [key: string]: string } = {
    'Tax Law': '/img/Bg/taxLaw.jpg',
    'Corporate Law': '/img/Bg/corporateLaw.jpeg',
    'Real Estate': '/img/Bg/realEstateLaw.jpg',
    'Dispute Resolution': '/img/Bg/disputeResolution.jpeg',
    'Corporate Governance': '/img/Bg/corporateGovernance.jpeg',
    'Financial Law': '/img/Bg/financeLaw.jpg'
  };

  // Generate full content if not provided
  const fullContent = article.content || `
    <div class="prose prose-lg max-w-none">
      <p class="lead">${article.excerpt}</p>
      
      <h2>Introduction</h2>
      <p>This comprehensive analysis explores the key aspects of ${article.title.toLowerCase()}. As legal practitioners in Kenya, we have observed significant developments in this area that warrant careful examination.</p>
      
      <h2>Key Considerations</h2>
      <p>When addressing matters related to ${article.category.toLowerCase()}, several critical factors must be taken into account:</p>
      <ul>
        <li>Regulatory compliance requirements under Kenyan law</li>
        <li>International best practices and standards</li>
        <li>Recent judicial precedents and their implications</li>
        <li>Practical implementation challenges and solutions</li>
      </ul>
      
      <h2>Legal Framework</h2>
      <p>The current legal framework governing this area consists of multiple legislative instruments and regulatory guidelines. Understanding the interplay between these various components is essential for effective legal practice.</p>
      
      <h3>Primary Legislation</h3>
      <p>The foundational legal provisions are established through primary legislation, which sets out the broad principles and requirements. These statutory provisions must be interpreted in light of constitutional principles and international obligations.</p>
      
      <h3>Regulatory Guidelines</h3>
      <p>Supplementing the primary legislation are detailed regulatory guidelines issued by relevant authorities. These guidelines provide practical guidance on compliance and implementation.</p>
      
      <h2>Practical Applications</h2>
      <p>In practice, applying these legal principles requires careful consideration of specific circumstances. Our experience has shown that successful outcomes depend on thorough preparation and strategic planning.</p>
      
      <h2>Recent Developments</h2>
      <p>Recent months have seen significant developments in this area of law. These changes reflect evolving economic conditions and regulatory priorities. Legal practitioners must stay informed of these developments to provide effective counsel.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we look to the future, several trends are likely to shape the evolution of ${article.category.toLowerCase()} in Kenya. These include technological advancement, regional integration, and global regulatory convergence.</p>
      
      <h2>Conclusion</h2>
      <p>Understanding and navigating ${article.title.toLowerCase()} requires comprehensive knowledge of both legal principles and practical realities. At MWC Advocates, we remain committed to providing our clients with expert guidance in this complex area.</p>
      
      <div class="bg-green-50 border-l-4 border-green-600 p-4 my-6">
        <p class="font-semibold text-green-900">Need Legal Assistance?</p>
        <p class="text-green-800">If you require professional legal advice on matters related to ${article.category}, our team of experienced advocates is ready to assist you.</p>
      </div>
    </div>
  `;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    }
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-20 bottom-4 md:inset-x-auto md:left-1/2 md:transform md:-translate-x-1/2 md:w-full md:max-w-4xl bg-white rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header with background image */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={categoryBackgrounds[article.category] || '/img/Bg/corporateLaw.jpeg'} 
                alt={article.category}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
              <div className="relative h-full flex flex-col justify-between p-6 text-white">
                <div className="flex justify-between items-start">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                    {article.category}
                  </span>
                  <button
                    onClick={onClose}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">{article.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-green-100 text-sm">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  title="Print"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">{article.excerpt}</p>
                <div dangerouslySetInnerHTML={{ __html: fullContent }} />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="text-center md:text-left">
                  <p className="text-sm text-gray-600 mb-1">Need professional legal advice?</p>
                  <p className="text-sm font-semibold text-green-700">Contact our expert team today</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      onClose();
                      window.location.href = '/contact';
                    }}
                  >
                    Get Legal Advice
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArticleDetailModal;