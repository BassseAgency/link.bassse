import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './src/components/LanguageSelector';
import { AuthModal } from './components/AuthModal';
import { CMSDashboard } from './components/CMSDashboard';
import { CMSProvider, useCMS } from './src/context/CMSContext';
import { ArtistProfile } from './types';

// Import new block components
import { HeroBlock } from './components/blocks/HeroBlock';
import { BiographyBlock } from './components/blocks/BiographyBlock';
import { SetsBlock } from './components/blocks/SetsBlock';
import { PressPhotosBlock } from './components/blocks/PressPhotosBlock';
import { RiderBlock } from './components/blocks/RiderBlock';
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
              className="absolute w-2 h-2 bg-[#f69f16]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
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
              className="absolute w-3 h-3 bg-[#f69f16]/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
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
            {/* Language Selector - Top Left */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <LanguageSelector />
            </motion.div>

            {/* Top Right Buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.button
                onClick={handleCMSAccess}
                className="bg-gradient-to-r from-[#f69f16] to-[#e6950f] hover:from-[#e6950f] hover:to-[#d6850e] text-black font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Acceso CMS
              </motion.button>

              <motion.button
                onClick={handleRegister}
                className="bg-black/50 hover:bg-[#f69f16] text-[#f69f16] hover:text-black border border-[#f69f16] font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Registro
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Main Content - All Blocks */}
        <div className="relative z-10">
          {/* Block 1 - Hero Section */}
          <HeroBlock artistData={artistData} />

          {/* Block 2 - Biography */}
          <BiographyBlock artistData={artistData} />

          {/* Block 3 - Sets (Releases) */}
          <SetsBlock artistData={artistData} />

          {/* Block 4 - Press Photos */}
          <PressPhotosBlock artistData={artistData} />

          {/* Block 5 - Live Performance Rider */}
          <RiderBlock artistData={artistData} />

          {/* Block 6 - Booking Info */}
          <BookingBlock artistData={artistData} />

          {/* Block 7 - Artist Info / Press Kit */}
          <ArtistInfoBlock artistData={artistData} />
        </div>

        {/* Download All Button - Bottom Right */}
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button
            onClick={handleDownloadAll}
            className="bg-gradient-to-r from-[#f69f16] to-[#e6950f] hover:from-[#e6950f] hover:to-[#d6850e] text-black font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#f69f16]/30 transition-all duration-300 flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar Todo
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="bg-black py-12 mt-auto border-t border-[#f69f16]/20 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            {/* Why Choose LINK.BASSSE Section */}
            <motion.div 
              className="mb-8 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-[#f69f16] mb-6">
                🤔 ¿Por qué elegir LINK.BASSSE?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <motion.div 
                  className="bg-gray-900/50 p-4 rounded-lg border border-[#f69f16]/20 hover:border-[#f69f16]/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl mb-2">🚀</div>
                  <p className="text-gray-300 text-sm">
                    Centraliza la promoción de múltiples artistas en una única herramienta
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-gray-900/50 p-4 rounded-lg border border-[#f69f16]/20 hover:border-[#f69f16]/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-gray-300 text-sm">
                    Ofrece métricas reales de interés y conversión
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-gray-900/50 p-4 rounded-lg border border-[#f69f16]/20 hover:border-[#f69f16]/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl mb-2">🛠️</div>
                  <p className="text-gray-300 text-sm">
                    Permite al artista mantener actualizado su press kit sin depender de terceros
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-gray-900/50 p-4 rounded-lg border border-[#f69f16]/20 hover:border-[#f69f16]/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl mb-2">🌐</div>
                  <p className="text-gray-300 text-sm">
                    Internacionalizable y adaptado a la industria actual
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact and Copyright */}
            <div className="text-center border-t border-[#f69f16]/20 pt-6">
              <p className="text-gray-400 mb-2">
                {t('footer.contact')}: <span className="text-[#f69f16]">contrataciones.ksais@gmail.com</span>
              </p>
              <p className="text-gray-500 text-sm">
                © 2024 K-SAIS. {t('footer.rights')}
              </p>
            </div>
          </div>
        </motion.footer>
      </motion.div>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      
      <AuthModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSuccess={handleAuthSuccess}
        isRegisterMode={true}
      />
      
      {showCMSDashboard && (
        <CMSDashboard onClose={() => setShowCMSDashboard(false)} />
      )}
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