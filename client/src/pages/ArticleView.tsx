import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import useSEO from '../hooks/useSEO';

// Import articles data
import articlesData from '../data/articles.json';

// Import background images
import taxLawBg from '../assets/img/Bg/taxLaw.jpg';
import corporateLawBg from '../assets/img/Bg/corporateLaw.jpeg';
import realEstateLawBg from '../assets/img/Bg/realEstateLaw.jpg';
import disputeResolutionBg from '../assets/img/Bg/disputeResolution.jpeg';
import corporateGovernanceBg from '../assets/img/Bg/corporateGovernance.jpeg';
import financeLawBg from '../assets/img/Bg/financeLaw.jpg';

// Import category background images

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
  type: string; // Changed from literal union to accept JSON data
}

const ArticleView: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Map categories to their background images
  const categoryBackgrounds: { [key: string]: string } = {
    'Data Protection': taxLawBg,
    'Employment Law': corporateLawBg,
    'Real Estate': realEstateLawBg,
    'Estate Planning': corporateGovernanceBg,
    'Dispute Resolution': disputeResolutionBg,
    'Corporate Law': corporateGovernanceBg,
    'Banking Law': financeLawBg,
    'Legal Insights': corporateLawBg
  };

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      
      // Simulate brief loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find article from imported JSON data
      const foundArticle = articlesData.articles.find(a => a.id === articleId);
      setArticle(foundArticle || null);
      setLoading(false);
    };

    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  // SEO optimization
  useSEO({
    title: article ? `${article.title} | MWC Advocates` : 'Article | MWC Advocates',
    description: article ? article.excerpt : 'Legal insights and analysis from MWC Advocates',
    keywords: article ? article.tags.join(', ') : 'legal insights, Kenya law, MWC Advocates'
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-24 mb-6"></div>
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/insights')}
              className="inline-flex items-center px-6 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <section className="relative h-96 pt-20">
        <div className="absolute inset-0">
          <img 
            src={categoryBackgrounds[article.category] || corporateLawBg} 
            alt={article.category}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.button
              onClick={() => navigate('/insights')}
              className="inline-flex items-center text-white hover:text-green-300 transition-colors mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Insights
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 bg-green-800 text-white text-sm font-semibold rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center text-gray-300 gap-x-6 gap-y-3 pb-4">
                <div className="flex items-center text-sm md:text-base">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(article.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center text-sm md:text-base">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Article Body */}
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none article-content"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
                style={{
                  '--tw-prose-headings': '#1f2937',
                  '--tw-prose-body': '#374151',
                  '--tw-prose-links': '#166534',
                } as React.CSSProperties}
              />

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="w-4 h-4 text-gray-500 mr-2" />
                  {article.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-green-50 text-green-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Legal Advice?</h2>
          <p className="text-xl mb-8 text-green-100">
            Contact our experienced legal team for personalized consultation
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default ArticleView;
