import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DayBlock, DownloadableFile } from '../../types';

interface DayBlockCardProps {
  dayBlock: DayBlock;
  index: number;
}

const FileTypeIcon: React.FC<{ type: DownloadableFile['type'] }> = ({ type }) => {
  const iconClass = "w-5 h-5";
  
  switch (type) {
    case 'audio':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    case 'image':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'pdf':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'zip':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
  }
};

export const DayBlockCard: React.FC<DayBlockCardProps> = ({ dayBlock, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(new Set());

  const handleFileDownload = async (file: DownloadableFile) => {
    if (downloadingFiles.has(file.id)) return;

    setDownloadingFiles(prev => new Set(prev).add(file.id));
    
    try {
      // Simular descarga individual
      console.log(`Descargando archivo: ${file.name}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En producción, aquí se abriría el enlace de descarga
      window.open(file.url, '_blank');
      
    } catch (error) {
      console.error('Error descargando archivo:', error);
    } finally {
      setDownloadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(file.id);
        return newSet;
      });
    }
  };

  if (!dayBlock.isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-gradient-to-br from-neutral-900/90 to-neutral-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#f69f16]/10 transition-all duration-300 overflow-hidden border border-neutral-700/50"
    >
      {/* Header del bloque */}
      <div className="relative">
        <img 
          src={dayBlock.thumbnailUrl} 
          alt={dayBlock.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-2">{dayBlock.title}</h3>
          <p className="text-neutral-300 text-sm line-clamp-2">{dayBlock.description}</p>
        </div>
      </div>

      {/* Contenido del bloque */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#f69f16] font-semibold">
            {dayBlock.files.length} archivo{dayBlock.files.length !== 1 ? 's' : ''} disponible{dayBlock.files.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neutral-400 hover:text-[#f69f16] transition-colors duration-200"
          >
            <svg 
              className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Lista de archivos */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-3 pt-2">
            {dayBlock.files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg hover:bg-neutral-700/50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#f69f16]">
                    <FileTypeIcon type={file.type} />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{file.name}</p>
                    {file.size && (
                      <p className="text-neutral-400 text-xs">{file.size}</p>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleFileDownload(file)}
                  disabled={downloadingFiles.has(file.id)}
                  className={`
                    px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                    ${downloadingFiles.has(file.id) 
                      ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed' 
                      : 'bg-[#f69f16] hover:bg-[#e6950f] text-black hover:scale-105'
                    }
                  `}
                >
                  {downloadingFiles.has(file.id) ? (
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 border border-neutral-400 border-t-transparent rounded-full animate-spin" />
                      <span>...</span>
                    </div>
                  ) : (
                    'Descargar'
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botón para expandir/contraer */}
        {!isExpanded && dayBlock.files.length > 0 && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full mt-4 py-2 text-[#f69f16] hover:text-orange-400 text-sm font-medium transition-colors duration-200"
          >
            Ver archivos disponibles
          </button>
        )}
      </div>
    </motion.div>
  );
}; 