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
import { PressVideosBlock } from './components/blocks/PressVideosBlock';

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
        {/* Efectos de fondo 3D únicos y sorprendentes - DESDE BIOGRAFÍA HACIA ABAJO */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ top: '25vh' }}>
          {/* Sistema de cristales flotantes con reflejos */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`crystal-${i}`}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                width: 60 + Math.random() * 40,
                height: 60 + Math.random() * 40,
                background: `linear-gradient(45deg, ${primaryColor}20, transparent, ${primaryColor}30)`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                filter: 'drop-shadow(0 0 20px rgba(246, 159, 22, 0.3))',
              }}
              animate={{
                rotateZ: [0, 360],
                rotateX: [0, 180, 360],
                rotateY: [0, -180, 0],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.6, 0.1],
                x: [-20, 40, -20],
                y: [-30, -100, -30],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Red neuronal de conexiones luminosas */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`neural-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 2,
                height: 80 + Math.random() * 60,
                background: `linear-gradient(to bottom, transparent, ${primaryColor}60, transparent)`,
                transformOrigin: 'center center',
              }}
              animate={{
                rotateZ: [0, 90, 180, 270, 360],
                opacity: [0, 0.8, 0.3, 0.8, 0],
                scaleY: [0.5, 1.5, 0.5],
                x: [-15, 25, -15],
                y: [-40, -120, -40],
              }}
              transition={{
                duration: 10 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "linear",
              }}
            />
          ))}

          {/* Orbes de energía pulsante */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 40 + Math.random() * 80,
                height: 40 + Math.random() * 80,
                background: `radial-gradient(circle, ${primaryColor}40 0%, ${primaryColor}20 30%, transparent 70%)`,
                boxShadow: `0 0 ${20 + Math.random() * 40}px ${primaryColor}40`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.2, 0.8, 0.2],
                x: [-30, 60, -30],
                y: [-50, -150, -50],
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Matriz de partículas cuánticas */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`quantum-${i}`}
              className="absolute w-1 h-1"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: primaryColor,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${primaryColor}`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [-20, -100],
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Espirales de energía */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`spiral-${i}`}
              className="absolute"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                width: 100,
                height: 100,
                border: `2px solid ${primaryColor}30`,
                borderRadius: '50%',
                borderTopColor: `${primaryColor}80`,
                borderRightColor: 'transparent',
              }}
              animate={{
                rotateZ: [0, 720],
                scale: [0.5, 2, 0.5],
                opacity: [0.1, 0.6, 0.1],
                x: [-40, 80, -40],
                y: [-60, -180, -60],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "linear",
              }}
            />
          ))}

          {/* Ondas de choque multidimensionales */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shockwave-${i}`}
              className="absolute rounded-full border-2"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
                width: 200,
                height: 200,
                borderColor: `${primaryColor}20`,
                borderStyle: 'dashed',
              }}
              animate={{
                scale: [0, 4, 0],
                opacity: [0, 0.4, 0],
                rotateZ: [0, -360],
                borderColor: [`${primaryColor}20`, `${primaryColor}60`, `${primaryColor}20`],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Top Navigation - Responsive - PEGADA ARRIBA */}
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* Layout Desktop */}
          <div className="hidden lg:flex items-center justify-between h-14 px-4 relative">
            {/* Selector de idioma - IZQUIERDA ARRIBA PEQUEÑO */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-4 z-10"
            >
              <div className="scale-75 origin-left">
                <LanguageSelector />
              </div>
              
              {/* Development Mode Indicator - Desktop - Más pequeño */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                DEV
              </motion.div>
            </motion.div>

            {/* Logo LINK.BASSSE - ALINEADO CON MENÚ + 30PX IZQUIERDA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center"
              style={{ marginLeft: '30px' }}
            >
              <Logo size="small" useFile={true} />
            </motion.div>

            {/* Top Right Buttons - Desktop */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-4 z-10"
            >
              {/* Acceso Dashboard / Inicio Sesión Button - Desktop */}
              <motion.button
                onClick={handleCMSAccess}
                className={`py-3 px-4 backdrop-blur-sm ${getButtonClasses('primary')} text-sm flex items-center gap-3`}
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
                {session ? 'Dashboard' : 'Login'}
              </motion.button>

              {/* Register Button - Desktop */}
              {!session && (
                <motion.button
                  onClick={handleRegister}
                  className="bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 hover:border-purple-500/60 text-purple-300 hover:text-purple-200 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center gap-3 backdrop-blur-sm text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Registro
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Layout Mobile */}
          <div className="lg:hidden p-2">
            {/* Primera fila móvil - Logo izquierda, botones derecha apilados */}
            <div className="flex justify-between items-start">
              {/* Logo LINK.BASSSE - ARRIBA IZQUIERDA MÓVIL */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center"
              >
                <Logo size="small" useFile={true} />
              </motion.div>

              {/* Botones apilados - Mobile */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col gap-2 z-10 items-end"
              >
                {/* Acceso Dashboard / Inicio Sesión Button - Mobile */}
                <motion.button
                  onClick={handleCMSAccess}
                  className={`py-2 px-4 backdrop-blur-sm ${getButtonClasses('primary')} text-sm flex items-center gap-2 whitespace-nowrap`}
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
                  {session ? 'Dashboard' : 'Login'}
                </motion.button>

                {/* Register Button - Mobile */}
                {!session && (
                  <motion.button
                    onClick={handleRegister}
                    className="bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 hover:border-purple-500/60 text-purple-300 hover:text-purple-200 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm text-sm whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Registro
                  </motion.button>
                )}

                {/* Selector idiomas e indicador desarrollo - Abajo de registro */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center gap-2 mt-1"
                >
                  <div className="scale-75 origin-right">
                    <LanguageSelector />
                  </div>
                  
                  {/* Development Mode Indicator - Solo icono móvil */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 p-1.5 rounded-full"
                    title="Modo Desarrollo"
                  >
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content - All Blocks */}
        <div className="relative z-10 pt-4">
          {/* Block 1 - Hero Section */}
          <HeroBlock />

          {/* Block 2 - Biography */}
          <BiographyBlock />

          {/* Block 3 - Sets (Releases) */}
          <SetsBlock />

          {/* Block 4 - Press Photos */}
          <PressPhotosBlock />

          {/* Block 5 - Press Videos */}
          <PressVideosBlock />

          {/* Block 6 - Booking Info */}
          <BookingBlock />

          {/* Block 7 - Artist Info / Press Kit / Technical Rider */}
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
                  className="text-3xl md:text-4xl font-bold mb-6 text-center text-white"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.3, duration: 0.6 }}
                >
                  ¿Por qué elegir LINK.BASSSE?
                </motion.h3>
                <p className="text-gray-300 text-lg max-w-4xl mx-auto text-center leading-relaxed">
                  La plataforma profesional que necesita la industria musical moderna. 
                  <span className="font-semibold" style={{ color: primaryColor }}> Herramientas avanzadas para artistas serios</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {[
                  { 
                    icon: '🎯', 
                    title: 'Gestión Centralizada', 
                    desc: 'Unifique todos sus materiales promocionales en una plataforma profesional diseñada para la industria musical.', 
                    delay: 2.4,
                    color: '#3B82F6'
                  },
                  { 
                    icon: '📊', 
                    title: 'Analytics Profesionales', 
                    desc: 'Obtenga insights detallados sobre el rendimiento de su press kit y el engagement de su audiencia.', 
                    delay: 2.5,
                    color: '#8B5CF6'
                  },
                  { 
                    icon: '⚡', 
                    title: 'Actualizaciones Instantáneas', 
                    desc: 'Mantenga su información actualizada en tiempo real. Los cambios se propagan automáticamente.', 
                    delay: 2.6,
                    color: '#F59E0B'
                  },
                  { 
                    icon: '🌍', 
                    title: 'Alcance Internacional', 
                    desc: 'Conecte con la industria global. Traducción automática y distribución multiidioma integrada.', 
                    delay: 2.7,
                    color: '#10B981'
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="group relative overflow-hidden bg-gradient-to-b from-gray-800/60 to-gray-900/80 p-8 rounded-2xl backdrop-blur-lg border border-gray-700/30"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: feature.delay, duration: 0.8, ease: "easeOut" }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Línea superior decorativa */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)` }}
                    />
                    
                    <div className="relative z-10 text-center">
                      <motion.div 
                        className="text-5xl mb-6"
                        whileHover={{ 
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <h4 className="font-bold text-xl mb-4 text-white">
                        {feature.title}
                      </h4>
                      
                      <p className="text-gray-300 text-base leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>

                    {/* Efecto de hover sutil */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ 
                        background: `radial-gradient(circle at center, ${feature.color}, transparent)`
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Estadísticas profesionales */}
              <motion.div
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2, duration: 0.8 }}
              >
                {[
                  { number: '500+', label: 'Artistas Activos' },
                  { number: '50K+', label: 'Press Kits Generados' },
                  { number: '25+', label: 'Países Alcanzados' },
                  { number: '99.9%', label: 'Uptime Garantizado' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 3.4 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="text-3xl font-bold" style={{ color: primaryColor }}>
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Línea decorativa profesional */}
              <motion.div
                className="mt-16 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent relative overflow-hidden"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 3.8, duration: 1.2 }}
              />
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
                <Logo size="medium" className="justify-center" useFile={true} />
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

      {/* Botón flotante "Descargar Todo" - Fijo abajo derecha - Responsive */}
      <motion.button
        onClick={handleDownloadAll}
        className={`fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 w-12 h-12 lg:w-16 lg:h-16 rounded-full shadow-2xl backdrop-blur-sm ${getButtonClasses('primary')} flex items-center justify-center`}
        style={{
          ...getButtonStyle('primary'),
          boxShadow: `0 8px 32px ${primaryColor}40`
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        title="Descargar Todo el Press Kit"
      >
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </motion.button>

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