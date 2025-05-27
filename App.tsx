import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './src/components/LanguageSelector';
import { AuthModal } from './components/AuthModal';
import { CMSDashboard } from './components/CMSDashboard';
import { BasseDashboard } from './components/BasseDashboard';
import { CMSProvider, useCMS } from './src/context/CMSContext';
import { useDesign } from './src/hooks/useDesign';
import { Logo } from './src/components/Logo';
import { ArtistProfile } from './types';
import { InstagramIcon, FacebookIcon, TwitterIcon, YouTubeIcon, SoundCloudIcon, SpotifyIcon, TikTokIcon, LinkedInIcon } from './src/components/SocialIcons';

// Import new block components
import { HeroBlock } from './components/blocks/HeroBlock';
import { BiographyBlock } from './components/blocks/BiographyBlock';
import { SetsBlock } from './components/blocks/SetsBlock';
import { PressPhotosBlock } from './components/blocks/PressPhotosBlock';

import { BookingBlock } from './components/blocks/BookingBlock';
import { ArtistInfoBlock } from './components/blocks/ArtistInfoBlock';

import './src/i18n';

interface AppContentProps {
  artistData?: ArtistProfile | null;
}

const AppContent: React.FC<AppContentProps> = ({ artistData }) => {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCMSDashboard, setShowCMSDashboard] = useState(false);
  const { session } = useCMS();
  const { primaryColor, getButtonClasses, getButtonStyle } = useDesign();

  const handleCMSAccess = () => {
    if (session) {
      setShowCMSDashboard(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleRegister = () => {
    setShowRegisterModal(true);
  };

  const handleAuthSuccess = () => {
    setShowCMSDashboard(true);
  };

  // Función para determinar qué dashboard mostrar según el rol
  const renderDashboard = () => {
    if (!session) return null;
    
    // Si es administrador de BASSSE, mostrar BasseDashboard
    if (session.user.role === 'bassse_admin') {
      return <BasseDashboard onClose={() => setShowCMSDashboard(false)} />;
    }
    
    // Para artistas y admins normales, mostrar CMSDashboard
    return <CMSDashboard onClose={() => setShowCMSDashboard(false)} />;
  };

  const handleDownloadAll = async () => {
    // Simulate ZIP generation with all materials
    alert('Generando archivo ZIP con todo el contenido del press kit...');
    // Here would go the actual ZIP generation logic
  };

  return (
    <>
      <motion.div 
        className="min-h-screen bg-black text-gray-200 flex flex-col relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Efectos de partículas flotantes en todo el fondo */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `${primaryColor}33`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`large-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `${primaryColor}1A`,
              }}
              animate={{
                x: [-30, 30, -30],
                y: [-30, -80, -30],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Top Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 p-6">
          <div className="flex justify-between items-center">
            {/* Logo y controles izquierda */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {/* Logo LINK.BASSSE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Logo size="small" />
              </motion.div>
              
              <LanguageSelector />
              
              {/* Development Mode Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                MODO DESARROLLO
              </motion.div>
            </motion.div>

            {/* Top Right Buttons */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-3"
            >

              {/* Acceso Dashboard / Inicio Sesión Button */}
              <motion.button
                onClick={handleCMSAccess}
                className={`py-2 px-4 backdrop-blur-sm ${getButtonClasses('primary')}`}
                style={getButtonStyle('primary')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {session ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  )}
                </svg>
                {session ? 'Acceso Dashboard' : 'Inicio Sesión'}
              </motion.button>

              {/* Register Button - Morado */}
              {!session && (
                <motion.button
                  onClick={handleRegister}
                  className="bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 hover:border-purple-500/60 text-purple-300 hover:text-purple-200 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Registrarse
                </motion.button>
              )}

              {/* Download All Button */}
              <motion.button
                onClick={handleDownloadAll}
                className={`py-2 px-4 backdrop-blur-sm ${getButtonClasses('secondary')}`}
                style={getButtonStyle('secondary')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar Todo
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Main Content - All Blocks */}
        <div className="relative z-10">
          {/* Block 1 - Hero Section */}
          <HeroBlock />

          {/* Block 2 - Biography */}
          <BiographyBlock />

          {/* Block 3 - Sets (Releases) */}
          <SetsBlock />

          {/* Block 4 - Press Photos */}
          <PressPhotosBlock />

          {/* Block 5 - Booking Info */}
          <BookingBlock />

          {/* Block 6 - Artist Info / Press Kit / Technical Rider */}
          <ArtistInfoBlock />
        </div>

        {/* Footer */}
        <motion.footer 
          className="bg-black py-12 mt-auto relative z-10"
          style={{ borderTop: `1px solid ${primaryColor}20` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            {/* Modern Features Section */}
            <motion.div 
              className="mb-12 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <div className="mb-8">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ 
                    background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}CC, ${primaryColor})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.3, duration: 0.6 }}
                >
                  ¿Por qué LINK.BASSSE?
                </motion.h3>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                  La evolución de los press kits musicales está aquí
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {[
                  { icon: '🚀', title: 'Gestión Unificada', desc: 'Centraliza todos tus artistas en una plataforma intuitiva y profesional', delay: 2.4 },
                  { icon: '📊', title: 'Analytics Pro', desc: 'Insights detallados de engagement, conversiones y audiencia', delay: 2.5 },
                  { icon: '⚡', title: 'Control Total', desc: 'Actualizaciones instantáneas sin intermediarios ni dependencias', delay: 2.6 },
                  { icon: '🌍', title: 'Alcance Global', desc: 'Multiidioma y optimizado para la industria internacional', delay: 2.7 }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-8 rounded-2xl transition-all duration-500 backdrop-blur-sm"
                    style={{ 
                      border: `1px solid ${primaryColor}20`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${primaryColor}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${primaryColor}20`;
                    }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: feature.delay, duration: 0.6 }}
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to bottom right, ${primaryColor}05, transparent)` }}
                    ></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                      <h4 className="font-bold text-lg mb-3" style={{ color: primaryColor }}>{feature.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Brand Section */}
            <motion.div 
              className="text-center pt-12 pb-8"
              style={{ borderTop: `1px solid ${primaryColor}20` }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              <motion.div 
                className="mb-6"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.4, duration: 0.6 }}
              >
                <Logo size="medium" className="justify-center" />
              </motion.div>
              
              <p className="text-gray-400 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                La nueva generación de press kits digitales. Potencia tu carrera musical con herramientas profesionales 
                diseñadas para el ecosistema actual de la industria.
              </p>

              {/* Redes Sociales */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.9, duration: 0.5 }}
              >
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
                  Síguenos en Redes Sociales
                </h4>
                <div className="flex justify-center items-center gap-6 flex-wrap">
                  {[
                    { Icon: InstagramIcon, url: 'https://instagram.com/bassse.agency', name: 'Instagram' },
                    { Icon: FacebookIcon, url: 'https://facebook.com/bassse.agency', name: 'Facebook' },
                    { Icon: TwitterIcon, url: 'https://twitter.com/bassse_agency', name: 'Twitter' },
                    { Icon: YouTubeIcon, url: 'https://youtube.com/@bassse.agency', name: 'YouTube' },
                    { Icon: SoundCloudIcon, url: 'https://soundcloud.com/bassse-agency', name: 'SoundCloud' },
                    { Icon: SpotifyIcon, url: 'https://open.spotify.com/user/bassse.agency', name: 'Spotify' },
                    { Icon: TikTokIcon, url: 'https://tiktok.com/@bassse.agency', name: 'TikTok' },
                    { Icon: LinkedInIcon, url: 'https://linkedin.com/company/bassse-agency', name: 'LinkedIn' }
                  ].map(({ Icon, url, name }, index) => (
                    <motion.a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-3 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: `${primaryColor}10`,
                        border: `1px solid ${primaryColor}20`,
                        color: primaryColor
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${primaryColor}20`;
                        e.currentTarget.style.borderColor = `${primaryColor}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${primaryColor}10`;
                        e.currentTarget.style.borderColor = `${primaryColor}20`;
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 3 + index * 0.1, duration: 0.3 }}
                      title={name}
                    >
                      <Icon 
                        size={24} 
                        className="transition-colors duration-300"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-8">
                <motion.a
                  href="/politica-privacidad"
                  className="hover:text-white transition-colors cursor-pointer"
                  style={{ color: primaryColor }}
                  whileHover={{ scale: 1.05 }}
                >
                  Política de Privacidad
                </motion.a>
                <motion.a
                  href="/aviso-legal"
                  className="hover:text-white transition-colors cursor-pointer"
                  style={{ color: primaryColor }}
                  whileHover={{ scale: 1.05 }}
                >
                  Aviso Legal
                </motion.a>
                <motion.a
                  href="/politica-cookies"
                  className="hover:text-white transition-colors cursor-pointer"
                  style={{ color: primaryColor }}
                  whileHover={{ scale: 1.05 }}
                >
                  Política de Cookies
                </motion.a>
              </div>

              <div className="pt-8" style={{ borderTop: `1px solid ${primaryColor}10` }}>
                <p className="text-gray-400 mb-3">
                  📧 <span className="cursor-pointer font-medium transition-colors" 
                           style={{ color: primaryColor }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.opacity = '0.8';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.opacity = '1';
                           }}>link@bassse.com</span>
                </p>
                <p className="text-gray-500 text-sm">
                  © 2024 LINK.BASSSE • Powered by BASSSE
                </p>
              </div>
            </motion.div>
          </div>
        </motion.footer>
      </motion.div>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      
      {showRegisterModal && (
        <AuthModal 
          onClose={() => setShowRegisterModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      
      {showCMSDashboard && renderDashboard()}
    </>
  );
};

const App: React.FC<{ artistData?: ArtistProfile | null }> = ({ artistData }) => {
  return (
    <CMSProvider>
      <AppContent artistData={artistData} />
    </CMSProvider>
  );
};

export default App;