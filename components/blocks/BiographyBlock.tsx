import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../src/context/CMSContext';
import { useDesign } from '../../src/hooks/useDesign';

export const BiographyBlock: React.FC = () => {
  const { artistData, session } = useCMS();
  const { primaryColor, secondaryColor, getButtonClasses, getButtonStyle } = useDesign();
  const [isExpanded, setIsExpanded] = useState(false);

  // Default biography data
  const defaultBio = {
    text: 'Aquí estará tu biografía. Podrás crear y editar tu biografía completa desde el panel CMS. Incluye información sobre tu trayectoria musical, influencias, logros y todo lo que quieras compartir con promotores y medios. Esta biografía se mostrará inicialmente en 3 líneas y podrá expandirse para mostrar todo el contenido.',
    fullText: 'Aquí estará tu biografía completa. Desde el panel CMS podrás crear una biografía detallada que incluya:\n\n• Tu trayectoria musical y cómo empezaste\n• Tus influencias y estilo musical\n• Logros importantes y colaboraciones\n• Información sobre tu colectivo o sello\n• Experiencia en vivo y residencias\n• Cualquier información relevante para promotores y medios\n\nEsta biografía se generará automáticamente en PDF y estará disponible para descarga. El sistema permite mostrar inicialmente solo las primeras líneas para mantener un diseño limpio.',
    pdfUrl: '/documents/biografia-artista.pdf'
  };

  const bio = artistData?.biography || defaultBio;

  const handleDownloadBio = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = bio.pdfUrl || '#';
    link.download = 'biografia-artista.pdf';
    link.click();
  };

  const handleDownloadTxt = () => {
    // Create and download TXT file
    const element = document.createElement('a');
    const file = new Blob([bio.fullText || bio.text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'biografia-artista.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Función para obtener las primeras 3 líneas
  const getFirstThreeLines = (text: string) => {
    const lines = text.split('\n');
    return lines.slice(0, 3).join('\n');
  };

  // Mostrar biografía completa si existe, sino la corta
  const fullText = bio.fullText || bio.text;
  const firstThreeLines = getFirstThreeLines(fullText);
  const hasMoreContent = fullText.split('\n').length > 3 || fullText.length > firstThreeLines.length;
  const displayText = isExpanded ? fullText : firstThreeLines;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight" style={{ color: primaryColor }}>
            Biografía
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

        {/* Biography Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-8"
          style={{ border: `1px solid ${primaryColor}20` }}
        >
          <div className="prose prose-lg prose-invert max-w-none">
            <motion.div 
              className="text-gray-300 leading-relaxed text-lg whitespace-pre-line overflow-hidden"
              initial={false}
              animate={{ 
                height: isExpanded ? 'auto' : 'auto',
                opacity: 1 
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {displayText}
            </motion.div>
            
            {/* Botón Ver más/Ver menos */}
            {hasMoreContent && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-6 font-semibold transition-all duration-300 hover:opacity-80 flex items-center gap-2"
                style={{ color: primaryColor }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {isExpanded ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Ver menos
                  </>
                ) : (
                  <>
                    Ver más
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            onClick={handleDownloadTxt}
            className={`shadow-lg py-3 px-6 ${getButtonClasses('primary')} flex items-center gap-3`}
            style={getButtonStyle('primary')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar TXT
          </motion.button>

          <motion.button
            onClick={handleDownloadBio}
            className={`py-3 px-6 ${getButtonClasses('secondary')} flex items-center gap-3`}
            style={getButtonStyle('secondary')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Descargar PDF
          </motion.button>

          {/* CMS Edit Button */}
          {session && (
            <motion.button
              onClick={() => alert('Abrir editor de biografía')}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}; 