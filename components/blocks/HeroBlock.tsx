import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../src/context/CMSContext';
import { useDesign } from '../../src/hooks/useDesign';

export const HeroBlock: React.FC = () => {
  const { artistData, session } = useCMS();
  const { primaryColor } = useDesign();

  // Default data if no CMS data available
  const defaultData = {
    name: 'Tu Nombre',
    heroImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=face',
    tagline: 'Electronic Press Kit',
    genres: ['Electronic', 'House', 'Techno'],
    collective: 'Tu Colectivo',
    baseCity: 'Tu Ciudad'
  };

  const data = {
    name: artistData?.name || defaultData.name,
    heroImage: artistData?.heroImage || defaultData.heroImage,
    tagline: defaultData.tagline,
    genres: artistData?.genres || defaultData.genres,
    collective: artistData?.collective || defaultData.collective,
    baseCity: artistData?.baseCity || defaultData.baseCity
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={data.heroImage}
          alt={`${data.name} Hero`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultData.heroImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
      </div>

      {/* CMS Edit Indicator */}
      {session && (
        <motion.div
          className="absolute top-4 left-4 text-black px-3 py-1 rounded-full text-xs font-bold z-20"
          style={{ backgroundColor: primaryColor }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          📝 Editable desde CMS
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Nombre del artista - Más grande y centrado */}
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white drop-shadow-2xl mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span 
              className="bg-clip-text text-transparent"
              style={{ 
                background: `linear-gradient(to right, white, ${primaryColor}, white)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {data.name}
            </span>
          </motion.h1>

          {/* Electronic Press Kit - Pegado al nombre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-lg md:text-xl text-gray-300 font-light tracking-widest uppercase">
              {data.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Flecha hacia abajo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-3xl cursor-pointer"
          style={{ color: primaryColor }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-5"></div>
    </section>
  );
}; 