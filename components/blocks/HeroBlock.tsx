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

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ marginTop: '-14px' }}>
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${data.heroImage}')`,
          backgroundPosition: 'center 15%',
          filter: 'brightness(0.3) contrast(1.1)',
          transform: 'translateY(-60px)',
          top: '-14px',
          height: 'calc(100% + 14px)'
        }}
      />

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
          
          {/* Nombre del artista - Solo texto sin fondo */}
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none drop-shadow-2xl mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ 
              color: 'white',
              textShadow: `0 0 30px ${primaryColor}40, 0 0 60px ${primaryColor}20`
            }}
          >
            {data.name}
          </motion.h1>

          {/* Electronic Press Kit - Pegado al nombre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-lg md:text-xl font-light tracking-widest uppercase" style={{ color: primaryColor }}>
              {data.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Flecha moderna hacia abajo - Centrada */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 z-20"
        style={{ left: 'calc(50% - 10px)', transform: 'translateX(-50%)' }}
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-12 h-12 rounded-full border-2 bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 cursor-pointer group"
          style={{ borderColor: primaryColor }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" 
            style={{ color: primaryColor }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Gradient overlay at bottom - Mejorado para transición perfecta */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/90 via-black/70 to-transparent z-5"></div>
    </section>
  );
}; 