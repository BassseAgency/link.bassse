import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../../src/context/CMSContext';
import { useDesign } from '../../src/hooks/useDesign';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  YouTubeIcon, 
  SoundCloudIcon, 
  SpotifyIcon, 
  TikTokIcon, 
  WebsiteIcon 
} from '../../src/components/SocialIcons';

export const ArtistInfoBlock: React.FC = () => {
  const { session, artistData } = useCMS();
  const { primaryColor, secondaryColor, getButtonClasses, getButtonStyle } = useDesign();

  // Usar datos del CMS o valores por defecto
  const artistInfo = {
    genres: artistData?.genres || ['Electronic', 'House', 'Techno'],
    collective: artistData?.collective || 'Tu Colectivo',
    labels: artistData?.labels || ['Tu Sello', 'Independent'],
    baseCity: artistData?.baseCity || 'Tu Ciudad',
    yearsActive: artistData?.yearsActive || '2020 - Presente',
    influences: artistData?.influences || 'Electronic Music, House, Techno'
  };

  // Redes sociales del artista
  const socialMedia = artistData?.socialMedia || {};

  const socialPlatforms = [
    { 
      key: 'instagram', 
      name: 'Instagram', 
      icon: InstagramIcon, 
      color: '#E4405F',
      url: socialMedia.instagram 
    },
    { 
      key: 'soundcloud', 
      name: 'SoundCloud', 
      icon: SoundCloudIcon, 
      color: '#FF5500',
      url: socialMedia.soundcloud 
    },
    { 
      key: 'spotify', 
      name: 'Spotify', 
      icon: SpotifyIcon, 
      color: '#1DB954',
      url: socialMedia.spotify 
    },
    { 
      key: 'youtube', 
      name: 'YouTube', 
      icon: YouTubeIcon, 
      color: '#FF0000',
      url: socialMedia.youtube 
    },
    { 
      key: 'facebook', 
      name: 'Facebook', 
      icon: FacebookIcon, 
      color: '#1877F2',
      url: socialMedia.facebook 
    },
    { 
      key: 'twitter', 
      name: 'Twitter/X', 
      icon: TwitterIcon, 
      color: '#000000',
      url: socialMedia.twitter 
    },
    { 
      key: 'tiktok', 
      name: 'TikTok', 
      icon: TikTokIcon, 
      color: '#000000',
      url: socialMedia.tiktok 
    },
    { 
      key: 'website', 
      name: 'Website', 
      icon: WebsiteIcon, 
      color: primaryColor,
      url: socialMedia.website 
    }
  ].filter(platform => platform.url); // Solo mostrar plataformas con URL

  const handleDownloadPressKit = () => {
    alert('Generando press kit completo...');
    // Here would go the actual press kit generation
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-tight text-center" style={{ color: primaryColor }}>
            Información del Artista
          </h2>
          <div className="w-20 lg:w-24 h-1 mx-auto" style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}></div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Artist Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 lg:p-6"
            style={{ border: `1px solid ${primaryColor}20` }}
          >
            <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 text-center lg:text-left" style={{ color: primaryColor }}>Detalles del Artista</h3>
            
            <div className="space-y-3 lg:space-y-4">
              <div>
                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">Géneros</h4>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {artistInfo.genres.map((genre, index) => (
                    <span key={index} className="text-black px-3 py-1 rounded-full text-xs lg:text-sm font-semibold" style={{ backgroundColor: primaryColor }}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">Colectivo</h4>
                <p className="text-gray-300 text-sm lg:text-base">{artistInfo.collective}</p>
              </div>

              <div className="text-center lg:text-left">
                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">Sellos</h4>
                <p className="text-gray-300 text-sm lg:text-base">{artistInfo.labels.join(', ')}</p>
              </div>

              <div className="text-center lg:text-left">
                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">Base</h4>
                <p className="text-gray-300 text-sm lg:text-base">{artistInfo.baseCity}</p>
              </div>

              <div className="text-center lg:text-left">
                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">Años Activo</h4>
                <p className="text-gray-300 text-sm lg:text-base">{artistInfo.yearsActive}</p>
              </div>

              <div className="text-center lg:text-left">
                <h4 className="text-sm lg:text-base font-semibold text-white mb-2">Influencias</h4>
                <p className="text-gray-300 text-sm lg:text-base">{artistInfo.influences}</p>
              </div>
            </div>

            {session && (
              <motion.button
                onClick={() => alert('Los detalles del artista se editan desde la sección "Información General" del CMS')}
                className="mt-4 lg:mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-2 lg:py-3 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 justify-center text-sm lg:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar en CMS
              </motion.button>
            )}
          </motion.div>

          {/* Technical Rider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 lg:p-6 flex flex-col justify-center"
            style={{ border: `1px solid ${primaryColor}20` }}
          >
            <div className="text-center">
              <svg className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2 lg:mb-3">Rider Técnico</h3>
              <p className="text-gray-300 text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed">
                Especificaciones técnicas, requerimientos de sonido e iluminación para performances.
              </p>

              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/documents/technical-rider.pdf';
                  link.download = 'technical-rider.pdf';
                  link.click();
                }}
                className={`w-full shadow-lg py-2 lg:py-3 px-3 lg:px-4 mb-2 lg:mb-3 text-sm lg:text-base ${getButtonClasses('primary')}`}
                style={getButtonStyle('primary')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar Rider
              </motion.button>

              {session && (
                <motion.button
                  onClick={() => alert('Editar rider técnico')}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-2 px-3 lg:px-4 rounded-lg transition-all duration-300 flex items-center gap-2 justify-center text-xs lg:text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Rider
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Press Kit Download */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 lg:p-6 flex flex-col justify-center"
            style={{ border: `1px solid ${primaryColor}20` }}
          >
            <div className="text-center">
              <svg className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2 lg:mb-3">Press Kit Completo</h3>
              <p className="text-gray-300 text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed">
                Descarga el press kit completo con biografía, fotos, rider técnico y sets.
              </p>

              <motion.button
                onClick={handleDownloadPressKit}
                className={`w-full shadow-lg py-2 lg:py-3 px-3 lg:px-4 text-sm lg:text-base ${getButtonClasses('primary')}`}
                style={getButtonStyle('primary')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar Press Kit
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Redes Sociales */}
        {socialPlatforms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 lg:p-8"
            style={{ border: `1px solid ${primaryColor}20` }}
          >
            <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-center" style={{ color: primaryColor }}>Redes Sociales</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
              {socialPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.key}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-3 lg:p-4 transition-all duration-300 flex flex-col items-center gap-2 lg:gap-3"
                  style={{ '--hover-border-color': `${primaryColor}50` } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${primaryColor}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(75 85 99 / 0.5)';
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300" style={{ color: platform.color }}>
                    <platform.icon size={24} className="lg:w-8 lg:h-8" />
                  </div>
                  <span className="text-white text-xs lg:text-sm font-medium transition-colors duration-300 text-center" 
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = primaryColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'white';
                        }}>
                    {platform.name}
                  </span>
                  
                  {/* Efecto de hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" 
                       style={{ background: `linear-gradient(to bottom right, ${platform.color}40, ${platform.color}20)` }}></div>
                </motion.a>
              ))}
            </div>

            {session && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-4 lg:mt-6 text-center"
              >
                <motion.button
                  onClick={() => alert('Las redes sociales se editan desde la sección "Redes Sociales" del CMS')}
                  className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-2 lg:py-3 px-4 lg:px-6 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto text-sm lg:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Redes Sociales
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}; 