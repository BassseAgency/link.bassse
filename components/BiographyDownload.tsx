import React from 'react';
import { motion } from 'framer-motion';

interface BiographyDownloadProps {
  artistName: string;
  pdfUrl?: string;
}

export const BiographyDownload: React.FC<BiographyDownloadProps> = ({ 
  artistName, 
  pdfUrl 
}) => {
  const handleDownload = () => {
    if (pdfUrl) {
      // Descarga real del PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${artistName}-biografia.pdf`;
      link.click();
    } else {
      // Simular descarga si no hay PDF
      alert(`Descargando biografía de ${artistName}...`);
      // Aquí se podría generar un PDF dinámicamente con la biografía
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 bg-[#f69f16]/20 hover:bg-[#f69f16] text-[#f69f16] hover:text-black px-4 py-2 rounded-lg transition-all duration-300 border border-[#f69f16]/30 hover:border-[#f69f16]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span className="text-sm font-medium">Descargar biografía</span>
    </motion.button>
  );
}; 