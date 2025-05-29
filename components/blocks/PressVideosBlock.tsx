import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../src/context/CMSContext';
import { useDesign } from '../../src/hooks/useDesign';
import { ArtistVideo } from '../../types';

export const PressVideosBlock: React.FC = () => {
  const { session, artistData } = useCMS();
  const { getPhotosGridClasses, getButtonClasses, getButtonStyle, primaryColor } = useDesign();

  // Usar videos del artista o videos por defecto
  const defaultVideos: ArtistVideo[] = [
    { 
      id: '1', 
      title: 'Live Set - Club Underground', 
      url: '/videos/live-set-1.mp4', 
      thumbnail: '/images/video-thumb-1.jpg', 
      type: 'upload',
      duration: '45:32',
      order: 1,
      isVisible: true,
      uploadedAt: new Date().toISOString()
    },
    { 
      id: '2', 
      title: 'Studio Session Behind the Scenes', 
      url: '/videos/studio-session.mp4', 
      thumbnail: '/images/video-thumb-2.jpg', 
      type: 'upload',
      duration: '12:45',
      order: 2,
      isVisible: true,
      uploadedAt: new Date().toISOString()
    },
    { 
      id: '3', 
      title: 'Festival Main Stage Performance', 
      url: '/videos/festival-performance.mp4', 
      thumbnail: '/images/video-thumb-3.jpg', 
      type: 'upload',
      duration: '1:08:15',
      order: 3,
      isVisible: true,
      uploadedAt: new Date().toISOString()
    },
    { 
      id: '4', 
      title: 'Artist Interview - Electronic Music Today', 
      url: '/videos/interview.mp4', 
      thumbnail: '/images/video-thumb-4.jpg', 
      type: 'upload',
      duration: '18:22',
      order: 4,
      isVisible: true,
      uploadedAt: new Date().toISOString()
    }
  ];

  // Usar videos del CMS si existen, sino usar los por defecto
  const videos = (artistData?.videos || defaultVideos).slice(0, 4); // Máximo 4 videos

  // Crear grid centrado específico para videos - Mejorado
  const getVideosGridClasses = () => {
    const count = videos.length;
    if (count === 1) return 'grid grid-cols-1 gap-6 justify-items-center max-w-md mx-auto';
    if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center max-w-3xl mx-auto';
    if (count === 3) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-4xl mx-auto';
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center max-w-6xl mx-auto';
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative"
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
            Videos
          </h2>
          <div className="w-24 h-1 mx-auto" style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)` }}></div>
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

        {/* Videos Grid - Centrado */}
        <div className={`${getVideosGridClasses()} mb-8`}>
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-gray-800 aspect-video cursor-pointer w-full max-w-sm"
            >
              {/* Video Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDIwMCAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTEyIiBmaWxsPSIjMzc0MTUxIi8+Cjxwb2x5Z29uIHBvaW50cz0iNzUsMzUgNzUsNzcgMTE1LDU2IiBmaWxsPSIjNkI3Mjg0Ii8+Cjwvc3ZnPgo=';
                }}
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.div>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-semibold text-sm mb-1 truncate">{video.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-xs">{video.duration}</span>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download functionality
                      const link = document.createElement('a');
                      link.href = video.url;
                      link.download = `${video.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4`;
                      link.click();
                    }}
                    className={`${getButtonClasses()} p-1`}
                    style={getButtonStyle()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Descargar Video"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Video number indicator */}
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {index + 1}
              </div>

              {/* Duration badge */}
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {video.duration}
              </div>
            </motion.div>
          ))}
        </div>

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
              onClick={() => alert('Subir nuevo video')}
              className={`${getButtonClasses()} py-3 px-6 shadow-lg`}
              style={getButtonStyle()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Subir Video
            </motion.button>

            <motion.button
              onClick={() => alert('Gestionar videos')}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Gestionar
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}; 