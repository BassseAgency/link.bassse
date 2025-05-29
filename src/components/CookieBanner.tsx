import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    saveCookiePreferences(allAccepted);
    setIsVisible(false);
  };

  const acceptSelected = () => {
    saveCookiePreferences(preferences);
    setIsVisible(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    saveCookiePreferences(essentialOnly);
    setIsVisible(false);
  };

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString()
    }));
    
    // Configurar cookies según preferencias
    if (prefs.analytics) {
      // Activar Google Analytics u otra herramienta
      console.log('🍪 Analytics cookies habilitadas');
    }
    if (prefs.marketing) {
      // Activar cookies de marketing
      console.log('🍪 Marketing cookies habilitadas');
    }
  };

  const CookiePolicy = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Política de Cookies</h2>
            <button
              onClick={() => setShowPolicy(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Qué son las cookies?</h3>
              <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a mejorar tu experiencia y el funcionamiento de nuestra plataforma.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tipos de cookies que utilizamos:</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">🔒 Cookies Esenciales</h4>
                  <p>Necesarias para el funcionamiento básico del sitio. Incluyen autenticación, seguridad y navegación.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">📊 Cookies de Análisis</h4>
                  <p>Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio para mejorarlo.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">🎯 Cookies de Marketing</h4>
                  <p>Utilizadas para mostrar contenido relevante y anuncios personalizados.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">⚙️ Cookies de Preferencias</h4>
                  <p>Recuerdan tus configuraciones y preferencias para personalizar tu experiencia.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Gestión de cookies</h3>
              <p>Puedes gestionar tus preferencias de cookies en cualquier momento desde la configuración de tu navegador o utilizando nuestro panel de configuración.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contacto</h3>
              <p>Si tienes preguntas sobre nuestra política de cookies, contáctanos en: <strong>privacy@bassse.com</strong></p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowPolicy(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const CookieSettings = () => (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-3">Configuración de Cookies</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">🔒 Cookies Esenciales</div>
            <div className="text-xs text-gray-600">Necesarias para el funcionamiento básico</div>
          </div>
          <div className="text-xs text-gray-500">Obligatorias</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">📊 Cookies de Análisis</div>
            <div className="text-xs text-gray-600">Ayudan a mejorar la experiencia</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">🎯 Cookies de Marketing</div>
            <div className="text-xs text-gray-600">Para contenido personalizado</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">⚙️ Cookies de Preferencias</div>
            <div className="text-xs text-gray-600">Recuerdan configuraciones</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.preferences}
              onChange={(e) => setPreferences({...preferences, preferences: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={acceptSelected}
          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Guardar Configuración
        </button>
        <button
          onClick={() => setShowSettings(false)}
          className="px-3 py-2 text-gray-600 text-sm border rounded hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">🍪 Utilizamos cookies</h3>
                  <p className="text-sm text-gray-600">
                    Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. 
                    <button
                      onClick={() => setShowPolicy(true)}
                      className="text-blue-600 hover:text-blue-800 underline ml-1"
                    >
                      Ver política completa
                    </button>
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="px-3 py-2 text-gray-600 text-sm border rounded hover:bg-gray-50 transition-colors"
                  >
                    ⚙️ Configurar
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-3 py-2 text-gray-600 text-sm border rounded hover:bg-gray-50 transition-colors"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Aceptar Todas
                  </button>
                </div>
              </div>
              
              {showSettings && <CookieSettings />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showPolicy && <CookiePolicy />}
      </AnimatePresence>
    </>
  );
}; 