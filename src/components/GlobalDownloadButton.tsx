import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DayBlock } from '../../types';

interface GlobalDownloadButtonProps {
  dayBlocks: DayBlock[];
  isEnabled: boolean;
}

export const GlobalDownloadButton: React.FC<GlobalDownloadButtonProps> = ({ 
  dayBlocks, 
  isEnabled 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGlobalDownload = async () => {
    if (!isEnabled || isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      // Simular descarga - en producción aquí iría la lógica real de ZIP
      console.log('Iniciando descarga global de todos los archivos...');
      
      // Recopilar todos los archivos de todos los días visibles
      const allFiles = dayBlocks
        .filter(day => day.isVisible)
        .flatMap(day => day.files);
      
      console.log(`Descargando ${allFiles.length} archivos en total`);
      
      // Simular tiempo de descarga
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En producción, aquí se generaría y descargaría el ZIP
      alert(`¡Descarga completada! ${allFiles.length} archivos descargados.`);
      
    } catch (error) {
      console.error('Error en descarga global:', error);
      alert('Error al descargar los archivos. Inténtalo de nuevo.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isEnabled) return null;

  return (
    <motion.button
      onClick={handleGlobalDownload}
      disabled={isDownloading}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`
        fixed top-4 right-4 z-50 
        bg-[#f69f16] hover:bg-[#e6950f] 
        text-black font-bold 
        px-6 py-3 rounded-lg 
        shadow-lg hover:shadow-xl 
        transition-all duration-300 
        flex items-center gap-2
        ${isDownloading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}
      `}
      whileHover={{ scale: isDownloading ? 1 : 1.05 }}
      whileTap={{ scale: isDownloading ? 1 : 0.95 }}
    >
      {isDownloading ? (
        <>
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <span>Descargando...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Descargar Todo</span>
        </>
      )}
    </motion.button>
  );
}; 