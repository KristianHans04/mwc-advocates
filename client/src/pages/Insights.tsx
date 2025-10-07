import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, Filter, Clock,
  FileText
} from 'lucide-react';
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

// Import placeholder images from randoms folder
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
  type: string; // Changed from literal union to string to accept JSON data
}


const Insights: React.FC = () => {
  const navigate = useNavigate();
  
  useSEO({
    title: 'Legal Insights & Publications | MWC Advocates',
    description: 'Stay informed with expert legal insights on Data Protection, Estate Planning, Conveyancing, Litigation, Banking Law, and Corporate Governance in Kenya. Professional analysis from MWC Advocates.',
    keywords: 'legal insights Kenya, data protection articles, estate planning guides, conveyancing law, litigation strategies, banking law Kenya, corporate governance, legal publications, MWC Advocates blog, Kenyan law analysis'
  });

  const [articles, setArticles] = useState<Article[]>([]);
  // const [speakingEngagements, setSpeakingEngagements] = useState<SpeakingEngagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'publications'>('articles');

  // Load articles from JSON data
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      
      // Simulate brief loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Load articles from imported JSON data
      setArticles(articlesData.articles);
      setLoading(false);
    };

    loadContent();
  }, []);

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesType = activeTab === 'articles' ? article.type === 'article' : 
                       activeTab === 'publications' ? article.type === 'publication' : false;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = ['all', 'Data Protection', 'Employment Law', 'Real Estate', 'Estate Planning', 'Dispute Resolution', 'Corporate Law', 'Banking Law', 'Legal Insights'];

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

  const handleArticleClick = (article: Article) => {
    navigate(`/insights/${article.id}`);
  };

  // Loading skeleton component
  const ArticleSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="flex items-center space-x-4">
          <div className="h-3 bg-gray-300 rounded w-20"></div>
          <div className="h-3 bg-gray-300 rounded w-20"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 to-green-900 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Insights & Resources</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Stay informed with expert analysis on cutting-edge legal developments and strategic insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('articles')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'articles'
                  ? 'border-green-700 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen className="inline-block w-4 h-4 mr-2" />
              Articles & Insights
            </button>
            <button
              onClick={() => setActiveTab('publications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'publications'
                  ? 'border-green-700 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="inline-block w-4 h-4 mr-2" />
              Publications & Media
            </button>
            {/* Speaking Engagements tab temporarily disabled */}
            {/* <button
              onClick={() => setActiveTab('speaking')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'speaking'
                  ? 'border-green-700 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mic className="inline-block w-4 h-4 mr-2" />
              Speaking Engagements
            </button> */}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {loading ? (
              // Loading State with Skeletons
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <ArticleSkeleton key={i} />
                ))}
              </motion.div>
            /* Speaking Engagements temporarily disabled */
            /* ) : activeTab === 'speaking' ? (
              // Speaking Engagements
              <motion.div
                key="speaking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {speakingEngagements.map((engagement, index) => (
                  <motion.div
                    key={engagement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {engagement.type === 'conference' && <Award className="w-5 h-5 text-green-600 mr-2" />}
                          {engagement.type === 'webinar' && <Video className="w-5 h-5 text-blue-600 mr-2" />}
                          {engagement.type === 'interview' && <Mic className="w-5 h-5 text-purple-600 mr-2" />}
                          <span className="text-sm font-medium text-gray-500 capitalize">{engagement.type}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{engagement.title}</h3>
                        <p className="text-gray-600 mb-1">{engagement.event}</p>
                        <p className="text-sm text-gray-500 mb-3">{engagement.speaker}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(engagement.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            {engagement.location}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
                    </div>
                  </motion.div>
                ))}
              </motion.div> */
            ) : (
              // Articles and Publications
              <motion.div
                key="articles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, index) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                        onClick={() => handleArticleClick(article)}
                      >
                        <div className="h-48 relative overflow-hidden">
                          {/* Use category-specific background image */}
                          <img 
                            src={categoryBackgrounds[article.category] || corporateLawBg} 
                            alt={article.category}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
                          <div className="absolute bottom-4 left-4">
                            <span className="inline-block px-3 py-1 bg-white/90 text-green-800 text-xs font-semibold rounded-full">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {article.readTime}
                              </span>
                              <span>{new Date(article.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
};

export default Insights;
