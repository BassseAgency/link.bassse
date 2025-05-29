import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../../src/context/CMSContext';
import { useDesign } from '../../src/hooks/useDesign';

export const PressPhotosBlock: React.FC = () => {
  const { session } = useCMS();
  const { getButtonClasses, getButtonStyle, primaryColor } = useDesign();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default press photos - Simulamos tener más de 6 para mostrar el carrusel
  const defaultPhotos = [
    { id: '1', url: '/images/press-1.jpg', alt: 'K-SAIS Live Performance 1' },
    { id: '2', url: '/images/press-2.jpg', alt: 'K-SAIS Studio Session' },
    { id: '3', url: '/images/press-3.jpg', alt: 'K-SAIS Live Performance 2' },
    { id: '4', url: '/images/press-4.jpg', alt: 'K-SAIS Portrait' },
    { id: '5', url: '/images/press-5.jpg', alt: 'K-SAIS Backstage' },
    { id: '6', url: '/images/press-6.jpg', alt: 'K-SAIS Festival' },
    { id: '7', url: '/images/press-7.jpg', alt: 'K-SAIS Underground Club' },
    { id: '8', url: '/images/press-8.jpg', alt: 'K-SAIS Press Conference' }
  ];

  const PHOTOS_PER_PAGE = 6;
  const totalPages = Math.ceil(defaultPhotos.length / PHOTOS_PER_PAGE);
  const hasMultiplePages = defaultPhotos.length > PHOTOS_PER_PAGE;
  
  const getCurrentPhotos = () => {
    const startIndex = currentIndex * PHOTOS_PER_PAGE;
    return defaultPhotos.slice(startIndex, startIndex + PHOTOS_PER_PAGE);
  };

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative"
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
            Press Photos
          </h2>
          <div className="w-24 h-1 mx-auto" style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)` }}></div>
          
          {hasMultiplePages && (
            <p className="text-gray-400 mt-4">
              {defaultPhotos.length} fotos disponibles • Página {currentIndex + 1} de {totalPages}
            </p>
          )}
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

        {/* Carousel Controls */}
        {hasMultiplePages && (
          <div className="flex justify-center items-center gap-4 mb-8">
            <motion.button
              onClick={prevPage}
              className="p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentIndex === 0}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Page Indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? 'scale-125' 
                      : 'hover:scale-110'
                  }`}
                  style={{ 
                    backgroundColor: i === currentIndex ? primaryColor : 'rgba(255,255,255,0.3)' 
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextPage}
              className="p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentIndex === totalPages - 1}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}

        {/* Photos Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          >
            {getCurrentPhotos().map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-xl bg-gray-800 aspect-square cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMDAgNTBDODAuNjcxNSA1MCA2NSA2NS42NzE1IDY1IDg1QzY1IDEwNC4zMjkgODAuNjcxNSAxMjAgMTAwIDEyMEMxMTkuMzI5IDEyMCAxMzUgMTA0LjMyOSAxMzUgODVDMTM1IDY1LjY3MTUgMTE5LjMyOSA1MCAxMDAgNTBaIiBmaWxsPSIjNkI3Mjg0Ii8+CjxwYXRoIGQ9Ik0xMDAgNjVDODguOTU0MyA2NSA4MCA3My45NTQzIDgwIDg1QzgwIDk2LjA0NTcgODguOTU0MyAxMDUgMTAwIDEwNUMxMTEuMDQ2IDEwNSAxMjAgOTYuMDQ1NyAxMjAgODVDMTIwIDczLjk1NDMgMTExLjA0NiA2NSAxMDAgNjVaIiBmaWxsPSIjOUI5Q0E0Ii8+Cjwvc3ZnPgo=';
                  }}
                />
                
                {/* Compact overlay with download icon */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = photo.url;
                      link.download = `press-photo-${photo.id}.jpg`;
                      link.click();
                    }}
                    className={`${getButtonClasses()} p-2`}
                    style={getButtonStyle()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </motion.button>
                </div>

                {/* Photo number indicator */}
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {currentIndex * PHOTOS_PER_PAGE + index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Download All Photos Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <motion.button
            onClick={() => {
              alert(`Descargando ${defaultPhotos.length} fotos...`);
              // Aquí iría la lógica para descargar todas las fotos en ZIP
            }}
            className={`${getButtonClasses()} py-3 px-6 shadow-lg`}
            style={getButtonStyle()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar Todas las Fotos ({defaultPhotos.length})
          </motion.button>
        </motion.div>

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
              onClick={() => alert('Subir nueva foto')}
              className={`${getButtonClasses()} py-3 px-6 shadow-lg`}
              style={getButtonStyle()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Subir Foto
            </motion.button>

            <motion.button
              onClick={() => alert('Gestionar galería')}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Gestionar
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}; 