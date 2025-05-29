import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../src/context/CMSContext';
import { useDesign } from '../../src/hooks/useDesign';

export const SetsBlock: React.FC = () => {
  const { artistData, session } = useCMS();
  const { primaryColor, secondaryColor, getButtonClasses, getButtonStyle } = useDesign();

  // Default sets data
  const defaultSets = [
    {
      id: '1',
      title: 'HARD GROOVE SESSIONS #001',
      platform: 'SoundCloud',
      embedCode: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/example"></iframe>',
      downloadUrl: '/downloads/hard-groove-001.mp3'
    },
    {
      id: '2',
      title: 'TECHNO UNDERGROUND MIX',
      platform: 'Spotify',
      embedCode: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/example" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      downloadUrl: null
    }
  ];

  const sets = artistData?.sets || defaultSets;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-center" style={{ color: primaryColor }}>
            Sets & Releases
          </h2>
          <div className="w-24 h-1 mx-auto" style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}></div>
        </motion.div>

        {/* CMS Edit Indicator */}
        {session && (
          <motion.div
            className="absolute top-4 right-4 text-black px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: primaryColor }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            📝 Editable desde CMS
          </motion.div>
        )}

        {/* Sets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {sets.map((set, index) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black/50 backdrop-blur-sm rounded-2xl p-6"
              style={{ border: `1px solid ${primaryColor}20` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{set.title}</h3>
                  <span className="text-sm font-semibold" style={{ color: primaryColor }}>{set.platform}</span>
                </div>
                {set.downloadUrl && (
                  <motion.button
                    onClick={() => window.open(set.downloadUrl, '_blank')}
                    className="transition-colors"
                    style={{ color: primaryColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = secondaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = primaryColor;
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </motion.button>
                )}
              </div>

              {/* Player Embed */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div 
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: set.embedCode }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CMS Controls */}
        {session && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              onClick={() => alert('Agregar nuevo set')}
              className={`shadow-lg py-3 px-6 ${getButtonClasses('primary')} flex items-center gap-3`}
              style={getButtonStyle('primary')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Set
            </motion.button>

            <motion.button
              onClick={() => alert('Editar sets existentes')}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Sets
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}; 