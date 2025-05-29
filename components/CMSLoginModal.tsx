import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../src/context/CMSContext';

interface CMSLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const CMSLoginModal: React.FC<CMSLoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useCMS();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(username, password);
      
      if (success) {
        onLoginSuccess();
        onClose();
      } else {
        setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Error de conexión. Inténtalo más tarde.');
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-black border border-[#f69f16]/30 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md text-gray-200"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#f69f16]">Acceso CMS</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
            aria-label="Cerrar modal de login"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="cms-username" className="block text-sm font-medium text-gray-300 mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="cms-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg focus:ring-2 focus:ring-[#f69f16] focus:border-[#f69f16] outline-none placeholder-gray-500 text-white"
              placeholder="Nombre de usuario"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="cms-password" className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="cms-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg focus:ring-2 focus:ring-[#f69f16] focus:border-[#f69f16] outline-none placeholder-gray-500 text-white"
              placeholder="Contraseña"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <motion.div 
              className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-[#f69f16] to-[#e6950f] hover:from-[#e6950f] hover:to-[#d6850e] text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Iniciando sesión...
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </motion.button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Panel de administración para gestión de contenido
        </p>
      </motion.div>
    </motion.div>
  );
};
