import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, ItemType, PhotoItem, VideoItem, TrackItem, DocumentItem, LinkItem, BioItem } from '../types';

interface SectionCardProps {
  section: Section;
}

const SectionIcon: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const iconClass = "w-7 h-7";
  
  switch (sectionId) {
    case 'playlists':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    case 'photos':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'videos':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'documents':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'booking':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'about-details':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
  }
};

const ItemCard: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getItemIcon = () => {
    const iconClass = "w-5 h-5";
    switch (item.type) {
      case ItemType.Photo:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case ItemType.Video:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case ItemType.Track:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case ItemType.Document:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case ItemType.Link:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-black/90 hover:bg-black rounded-xl p-5 transition-all duration-300 border border-[#f69f16]/20 hover:border-[#f69f16]/60 backdrop-blur-sm"
    >
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f69f16]/0 via-[#f69f16]/10 to-[#f69f16]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      <div className="relative flex items-start gap-4">
        <motion.div 
          className="flex-shrink-0 p-2 bg-[#f69f16]/30 rounded-lg text-[#f69f16] group-hover:bg-[#f69f16] group-hover:text-black transition-colors duration-300"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {getItemIcon()}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-base mb-2 truncate group-hover:text-[#f69f16] transition-colors duration-300">
            {item.name}
          </h4>
          {item.content && (
            <p className="text-gray-400 text-sm leading-relaxed mb-1">{item.content}</p>
          )}
          {item.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-1">{item.description}</p>
          )}
          {item.duration && (
            <span className="inline-block bg-[#f69f16]/30 text-[#f69f16] text-xs font-mono px-2 py-1 rounded-md">
              {item.duration}
            </span>
          )}
        </div>
        
        {(item.downloadUrl || item.url) && (
          <motion.button
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
            className="flex-shrink-0 p-2 bg-[#f69f16]/30 hover:bg-[#f69f16] text-[#f69f16] hover:text-black rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#f69f16]/25"
            onClick={() => {
              if (item.url) window.open(item.url, '_blank');
              if (item.downloadUrl) window.open(item.downloadUrl, '_blank');
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group relative bg-black backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl hover:shadow-[#f69f16]/30 transition-all duration-500 overflow-hidden border border-[#f69f16]/30 hover:border-[#f69f16]/60"
    >
      {/* Efecto de brillo de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f69f16]/10 via-transparent to-[#f69f16]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header mejorado */}
      <div className="relative bg-black/95 p-8 border-b border-[#f69f16]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <motion.div 
              className="p-4 bg-gradient-to-br from-[#f69f16]/40 to-[#f69f16]/30 rounded-xl text-[#f69f16] shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <SectionIcon sectionId={section.id} />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#f69f16] transition-colors duration-300">
                {section.title}
              </h3>
              <p className="text-gray-400 text-base">{section.itemCountText}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => console.log(`Descargando todo de ${section.title}`)}
              className="px-6 py-3 bg-gradient-to-r from-[#f69f16] to-[#e6950f] hover:from-[#e6950f] hover:to-[#d6850e] text-black text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-[#f69f16]/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar todo
            </motion.button>
            
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-3 text-gray-400 hover:text-[#f69f16] hover:bg-black/50 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className="w-6 h-6"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Contenido expandible mejorado */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-8 space-y-4 bg-black/50">
              {section.items.map((item, index) => (
                <ItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview mejorado cuando está colapsado */}
      {!isExpanded && (
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.slice(0, 3).map((item, index) => (
              <motion.div 
                key={item.id} 
                className="bg-black/80 rounded-xl p-4 border border-[#f69f16]/20 hover:border-[#f69f16]/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#f69f16] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium truncate group-hover:text-[#f69f16] transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
              </motion.div>
            ))}
            {section.items.length > 3 && (
              <motion.div 
                className="bg-black/60 rounded-xl p-4 border border-[#f69f16]/20 flex items-center justify-center group hover:border-[#f69f16]/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <span className="text-gray-400 text-sm font-medium group-hover:text-[#f69f16] transition-colors duration-300">
                  +{section.items.length - 3} más
                </span>
              </motion.div>
            )}
          </div>
          
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="w-full mt-6 py-3 text-[#f69f16] hover:text-black hover:bg-[#f69f16] text-base font-medium transition-all duration-300 rounded-xl border border-[#f69f16]/50 hover:border-[#f69f16] backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver todo el contenido
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};