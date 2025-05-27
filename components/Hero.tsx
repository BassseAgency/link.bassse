import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  promoPackageTitle: string;
  heroImageUrl: string;
  onOpenCMSModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  promoPackageTitle,
  heroImageUrl,
  onOpenCMSModal,
}) => {

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(246,159,22,0.1) 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%), url(${heroImageUrl})` 
      }}
    >
      {/* Overlay con patrón */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f69f16' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl"> 
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6"
        >
          {/* Título principal */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white drop-shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-[#f69f16] to-white bg-clip-text text-transparent">
              {promoPackageTitle}
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-3"
          >
            <p className="text-lg md:text-xl font-semibold text-[#f69f16] uppercase tracking-widest">
              Electronic Press Kit
            </p>
            <p className="text-base md:text-lg text-gray-300 font-light">
              Techno • Hard Groove
            </p>
          </motion.div>

          {/* Botón de Acceso al CMS */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="pt-6"
          >
            <motion.button
              onClick={onOpenCMSModal}
              className="bg-gradient-to-r from-[#f69f16] to-[#e6950f] hover:from-[#e6950f] hover:to-[#d6850e] text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#f69f16]/30 transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Acceso al CMS
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};