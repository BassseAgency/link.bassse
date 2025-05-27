import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrackItem } from '../types';

interface PlaylistCardProps {
  track: TrackItem;
  index: number;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ track, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6 hover:border-[#f69f16]/50 transition-all duration-300"
    >
      {/* Número de playlist */}
      <div className="absolute top-4 left-4 text-[#f69f16] font-bold text-lg">
        #{String(index + 1).padStart(2, '0')}
      </div>

      {/* Contenido principal */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#f69f16] transition-colors duration-300">
          {track.name}
        </h3>
        
        <p className="text-neutral-400 text-sm mb-4">
          by {track.artist}
        </p>

        {/* Duración */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-neutral-500 text-sm">Duración</span>
          <span className="text-[#f69f16] font-semibold">{track.duration}</span>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handlePlayToggle}
            className="flex items-center space-x-2 bg-[#f69f16] hover:bg-[#e6950f] text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Play</span>
              </>
            )}
          </motion.button>

          <motion.button
            onClick={() => window.open(track.downloadUrl, '_blank')}
            className="flex items-center space-x-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download</span>
          </motion.button>
        </div>
      </div>

      {/* Efecto de hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f69f16]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
      
      {/* Indicador de reproducción */}
      {isPlaying && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4"
        >
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-[#f69f16] rounded-full"
                animate={{
                  height: [4, 16, 4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}; 