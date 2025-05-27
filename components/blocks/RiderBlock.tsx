import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../src/context/CMSContext';

export const RiderBlock: React.FC = () => {
  const { session } = useCMS();

  const handleDownloadRider = () => {
    const link = document.createElement('a');
    link.href = '/documents/technical-rider.pdf';
    link.download = 'technical-rider.pdf';
    link.click();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#f69f16] mb-4 uppercase tracking-tight">
            Technical Rider
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#f69f16] to-[#e6950f] mx-auto"></div>
        </motion.div>

        {session && (
          <motion.div
            className="absolute top-4 right-4 bg-[#f69f16] text-black px-3 py-1 rounded-full text-xs font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            📝 Editable desde CMS
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-black/50 backdrop-blur-sm border border-[#f69f16]/20 rounded-2xl p-8 text-center"
        >
          <div className="mb-8">
            <svg className="w-24 h-24 text-[#f69f16] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-4">Rider Técnico de Performance</h3>
            <p className="text-gray-300 mb-6">
              Documento completo con especificaciones técnicas, requerimientos de sonido, 
              iluminación y setup necesario para performances en vivo.
            </p>
          </div>

          <motion.button
            onClick={handleDownloadRider}
            className="bg-gradient-to-r from-[#f69f16] to-[#e6950f] hover:from-[#e6950f] hover:to-[#d6850e] text-black font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar Rider
          </motion.button>

          {session && (
            <motion.button
              onClick={() => alert('Editar rider técnico')}
              className="mt-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Rider
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}; 