import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ChevronRight, Brain, GitCompare, Globe, Microscope } from 'lucide-react';
import { educationalTopics, type EducationalTopic } from '../data/educationalContent';

interface EducationalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopicId?: string;
}

const categoryIcons = {
  framework: Brain,
  comparison: GitCompare,
  context: Globe,
  methodology: Microscope,
};

const categoryColors = {
  framework: 'bg-purple-500',
  comparison: 'bg-blue-500',
  context: 'bg-green-500',
  methodology: 'bg-orange-500',
};

export const EducationalOverlay: React.FC<EducationalOverlayProps> = ({
  isOpen,
  onClose,
  initialTopicId,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<EducationalTopic | null>(
    initialTopicId ? educationalTopics.find(t => t.id === initialTopicId) || null : null
  );

  const handleTopicSelect = (topic: EducationalTopic) => {
    setSelectedTopic(topic);
  };

  const handleBack = () => {
    setSelectedTopic(null);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedTopic && (
                    <button
                      onClick={handleBack}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>
                  )}
                  <BookOpen className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedTopic ? selectedTopic.title : 'Educational Resources'}
                    </h2>
                    <p className="text-sm text-purple-100">
                      {selectedTopic ? 'Ethnomusicology & Comparative Analysis' : 'Learn about Indian music traditions'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {!selectedTopic ? (
                  /* Topic List */
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Explore Ethnomusicological Frameworks
                      </h3>
                      <p className="text-gray-600">
                        Deepen your understanding of Indian music through academic frameworks,
                        comparative analysis, and research methodologies.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {educationalTopics.map((topic, index) => {
                        const Icon = categoryIcons[topic.category];
                        const colorClass = categoryColors[topic.category];

                        return (
                          <motion.button
                            key={topic.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleTopicSelect(topic)}
                            className="w-full text-left bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-purple-400 hover:shadow-lg transition-all group"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`${colorClass} p-3 rounded-lg text-white flex-shrink-0`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    {topic.title}
                                  </h4>
                                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                    {topic.category}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {topic.description}
                                </p>
                                {topic.relatedRegions && topic.relatedRegions.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {topic.relatedRegions.slice(0, 4).map(region => (
                                      <span
                                        key={region}
                                        className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded"
                                      >
                                        {region}
                                      </span>
                                    ))}
                                    {topic.relatedRegions.length > 4 && (
                                      <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded">
                                        +{topic.relatedRegions.length - 4} more
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Topic Detail */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 md:p-8"
                  >
                    {/* Category Badge */}
                    <div className="mb-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 ${categoryColors[selectedTopic.category]} text-white rounded-full text-sm font-semibold`}>
                        {React.createElement(categoryIcons[selectedTopic.category], { className: 'w-4 h-4' })}
                        {selectedTopic.category.charAt(0).toUpperCase() + selectedTopic.category.slice(1)}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedTopic.description}
                      </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none mb-8">
                      {selectedTopic.content.split('\n').map((paragraph, index) => {
                        if (paragraph.trim() === '') return null;
                        
                        // Handle headers
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          const text = paragraph.replace(/\*\*/g, '');
                          return (
                            <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                              {text}
                            </h3>
                          );
                        }
                        
                        // Handle list items
                        if (paragraph.trim().startsWith('-')) {
                          return (
                            <li key={index} className="ml-6 text-gray-700 leading-relaxed mb-2">
                              {paragraph.trim().substring(1).trim()}
                            </li>
                          );
                        }
                        
                        // Regular paragraphs
                        return (
                          <p key={index} className="text-gray-700 leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>

                    {/* Examples */}
                    {selectedTopic.examples && selectedTopic.examples.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="text-2xl">💡</span>
                          Examples
                        </h4>
                        <div className="space-y-3">
                          {selectedTopic.examples.map((example, index) => (
                            <div
                              key={index}
                              className="p-4 bg-green-50 border-l-4 border-green-500 rounded"
                            >
                              <p className="text-gray-700 leading-relaxed">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Regions */}
                    {selectedTopic.relatedRegions && selectedTopic.relatedRegions.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Globe className="w-5 h-5" />
                          Related Regions
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTopic.relatedRegions.map(region => (
                            <span
                              key={region}
                              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                            >
                              {region.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* References */}
                    {selectedTopic.references && selectedTopic.references.length > 0 && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-bold text-gray-700 mb-3">
                          📚 Further Reading
                        </h4>
                        <ul className="space-y-2">
                          {selectedTopic.references.map((ref, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {ref}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EducationalOverlay;
