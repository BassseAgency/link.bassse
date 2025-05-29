import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDesign } from '../hooks/useDesign';

export const AppDownload: React.FC = () => {
  const { primaryColor } = useDesign();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detectar si la app ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Escuchar cuando la app se instala
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      // Si no hay prompt disponible, mostrar instrucciones
      alert('📱 Para instalar la app:\n\n1. Abre el menú de tu navegador\n2. Busca "Agregar a pantalla de inicio" o "Instalar app"\n3. Confirma la instalación\n\n¡Tendrás acceso directo desde tu dispositivo!');
      return;
    }

    const result = await deferredPrompt.prompt();
    console.log('🔧 PWA install result:', result);
    
    if (result.outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const getInstallButtonText = () => {
    if (isInstalled) return '✅ App Instalada';
    if (isInstallable) return '📱 Instalar App';
    return '📱 Instalar App Web';
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📱 Descarga la App
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lleva tu press kit siempre contigo. Accede a toda tu información, actualiza contenido y gestiona tu perfil desde cualquier lugar.
          </p>
        </motion.div>

        {/* Install Status Message */}
        {isInstalled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800"
          >
            ✅ <strong>¡App ya instalada!</strong> Puedes acceder desde la pantalla de inicio de tu dispositivo.
          </motion.div>
        )}

        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12 relative"
        >
          <div className="inline-block relative">
            {/* Phone Mockup */}
            <div className="relative mx-auto">
              <div 
                className="w-64 h-128 rounded-[3rem] border-8 border-gray-800 bg-black p-2 shadow-2xl"
                style={{ height: '512px' }}
              >
                <div className="w-full h-full rounded-[2.5rem] bg-white overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-black rounded-t-[2.5rem] flex items-center justify-between px-6 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 border border-white rounded-sm">
                        <div className="w-3 h-1 bg-white rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 h-full bg-gradient-to-br from-orange-400 to-orange-600">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🔗</span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">LINK.BASSSE</h3>
                      <p className="text-orange-100 text-sm mb-6">Electronic Press Kit</p>
                      
                      {/* Mock Interface */}
                      <div className="space-y-3">
                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-left">
                          <div className="text-white text-sm font-medium">Tu Perfil</div>
                          <div className="text-orange-100 text-xs">Actualizado hace 2 horas</div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-left">
                          <div className="text-white text-sm font-medium">Nuevos Sets</div>
                          <div className="text-orange-100 text-xs">3 sets pendientes</div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-left">
                          <div className="text-white text-sm font-medium">Estadísticas</div>
                          <div className="text-orange-100 text-xs">156 visualizaciones</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              >
                {isInstalled ? '✅ Instalada' : '📱 Disponible'}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Acceso Offline</h3>
            <p className="text-gray-600 text-sm">Funciona sin conexión a internet. Tu press kit siempre disponible.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Carga Instantánea</h3>
            <p className="text-gray-600 text-sm">Abre la app al instante desde la pantalla de inicio.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Notificaciones</h3>
            <p className="text-gray-600 text-sm">Recibe actualizaciones importantes directamente en tu dispositivo.</p>
          </div>
        </motion.div>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* PWA Install Button - Prioritario */}
          <motion.button
            whileHover={{ scale: isInstalled ? 1 : 1.05 }}
            whileTap={{ scale: isInstalled ? 1 : 0.95 }}
            onClick={handleInstallPWA}
            disabled={isInstalled}
            style={{ 
              backgroundColor: isInstalled ? '#10B981' : primaryColor,
              opacity: isInstalled ? 0.8 : 1 
            }}
            className="inline-flex items-center text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg font-medium text-lg"
          >
            <div className="mr-3">
              <span className="text-2xl">{isInstalled ? '✅' : '📱'}</span>
            </div>
            <div className="text-left">
              <div className="text-xs">
                {isInstalled ? 'App Instalada' : 'Instalar ahora'}
              </div>
              <div className="font-semibold">{getInstallButtonText()}</div>
            </div>
          </motion.button>

          {/* App Store Button - Futuro */}
          <motion.a
            href="#app-store"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-lg opacity-50"
            title="Próximamente disponible"
          >
            <div className="mr-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs">Próximamente en</div>
              <div className="font-semibold">App Store</div>
            </div>
          </motion.a>

          {/* Google Play Button - Futuro */}
          <motion.a
            href="#google-play"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-lg opacity-50"
            title="Próximamente disponible"
          >
            <div className="mr-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs">Próximamente en</div>
              <div className="font-semibold">Google Play</div>
            </div>
          </motion.a>
        </motion.div>

        {/* Install Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-blue-50 rounded-lg"
        >
          <h4 className="font-semibold text-blue-900 mb-2">💡 ¿Cómo instalar la app?</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Chrome/Edge:</strong> Icono "Instalar" en la barra de direcciones</p>
            <p><strong>Safari iOS:</strong> Compartir → "Agregar a pantalla de inicio"</p>
            <p><strong>Firefox:</strong> Menú → "Instalar aplicación"</p>
          </div>
        </motion.div>

        {/* Coming Soon Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-500 mt-6"
        >
          🚀 Apps nativas para iOS y Android próximamente disponibles
        </motion.p>
      </div>
    </motion.section>
  );
}; 