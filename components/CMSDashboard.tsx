import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../src/context/CMSContext';
import { ArtistVideo } from '../types';

interface CMSDashboardProps {
  onClose: () => void;
}

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

type CMSSection = 'general' | 'biography' | 'social' | 'sets' | 'gallery' | 'videos' | 'documents' | 'design' | 'history';

// Componente Toast optimizado
const Toast: React.FC<{ notification: ToastNotification; onClose: (id: string) => void }> = ({ notification, onClose }) => {
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  const colors = {
    success: 'bg-green-600 border-green-500',
    error: 'bg-red-600 border-red-500',
    info: 'bg-blue-600 border-blue-500'
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, 3000); // Reducido de 4000 a 3000ms

    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.2 }} // Reducido de animación
      className={`${colors[notification.type]} border rounded-lg p-4 shadow-lg max-w-sm`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icons[notification.type]}</span>
        <span className="text-white font-medium">{notification.message}</span>
        <button
          onClick={() => onClose(notification.id)}
          className="text-white/70 hover:text-white ml-auto"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export const CMSDashboard: React.FC<CMSDashboardProps> = ({ onClose }) => {
  const { session, artistData, logout, updateArtistData, uploadFile, generateZip, isLoading, getSaveHistory, clearSaveHistory, isAdminMode, editingArtist, exitAdminMode } = useCMS();
  const [activeSection, setActiveSection] = useState<CMSSection>('general');
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Memoizar las secciones para evitar re-renders innecesarios
  const sections = useMemo(() => [
    { id: 'general', name: 'Información General', icon: '👤' },
    { id: 'biography', name: 'Biografía', icon: '📝' },
    { id: 'social', name: 'Redes Sociales', icon: '🌐' },
    { id: 'sets', name: 'Sets & Media', icon: '🎵' },
    { id: 'gallery', name: 'Galería', icon: '📸' },
    { id: 'videos', name: 'Videos', icon: '📹' },
    { id: 'documents', name: 'Documentos', icon: '📄' },
    { id: 'design', name: 'Diseño & Colores', icon: '🎨' },
    { id: 'history', name: 'Historial', icon: '📋' }
  ], []);

  // Función para mostrar notificaciones - Optimizada
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const notification: ToastNotification = {
      id: Date.now().toString(),
      message,
      type
    };
    setNotifications(prev => {
      // Limitar a máximo 3 notificaciones para mejor performance
      const newNotifications = [notification, ...prev.slice(0, 2)];
      return newNotifications;
    });
  };

  // Función para cerrar notificaciones
  const closeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!session || !artistData) {
    return null;
  }

  const handleLogout = () => {
    // La función logout del contexto ya maneja la recarga de la página
    // No necesitamos llamar onClose() porque la página se recargará
    logout();
  };

  const handleDownloadAll = async () => {
    try {
      const zipUrl = await generateZip();
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = `${artistData.name}-presskit.zip`;
      link.click();
      showNotification('Press kit descargado exitosamente', 'success');
    } catch (error) {
      showNotification('Error generando el archivo ZIP', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-hidden">
      {/* Indicador de Modo Administrador */}
      {isAdminMode && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-60">
          <div className="flex items-center justify-center gap-4">
            <span className="font-bold">🔧 MODO ADMINISTRADOR</span>
            <span className="text-sm">Editando: {editingArtist}</span>
            <button
              onClick={() => {
                exitAdminMode();
                onClose();
              }}
              className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Salir Modo Admin
            </button>
          </div>
        </div>
      )}
      <div className={`h-full flex ${isAdminMode ? 'pt-12' : ''}`}>
        {/* Sidebar - Sin animaciones complejas */}
        <div className="w-80 bg-black border-r border-[#f69f16]/30 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#f69f16]/30">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-[#f69f16]">CMS Panel</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="text-sm text-gray-400">
              <p>Bienvenido, {session.user.displayName}</p>
              <p className="text-xs">Editando: {artistData.name}</p>
            </div>
          </div>

          {/* Navigation - Optimizada */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as CMSSection)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-150 ${
                    activeSection === section.id
                      ? 'bg-[#f69f16]/20 text-[#f69f16] border border-[#f69f16]/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#f69f16]/30 space-y-2">
            {/* Enlace copyable del usuario */}
            <div className="bg-[#f69f16]/10 border border-[#f69f16]/30 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-400 mb-2">Tu enlace personalizado:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-black/50 text-[#f69f16] text-sm px-2 py-1 rounded text-center">
                  link.bassse/{artistData?.slug || 'tu-nombre'}
                </code>
                <button
                  onClick={() => {
                    const link = `link.bassse/${artistData?.slug || 'tu-nombre'}`;
                    navigator.clipboard.writeText(link);
                    showNotification('🔗 Enlace copiado al portapapeles', 'success');
                  }}
                  className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium px-3 py-1 rounded text-xs transition-colors"
                  title="Copiar enlace"
                >
                  📋
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Comparte este enlace en tus redes sociales
              </p>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              🔗 Ver LINK.BASSSE
            </button>
            <button
              onClick={handleDownloadAll}
              disabled={isLoading}
              className="w-full bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Generando...' : '📦 Descargar Todo'}
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Header */}
          <div className="p-6 border-b border-[#f69f16]/30 bg-black/50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {sections.find(s => s.id === activeSection)?.name}
              </h2>
              <div className="flex items-center gap-4">
                {isLoading && (
                  <div className="flex items-center gap-2 text-[#f69f16] text-sm">
                    <div className="w-3 h-3 bg-[#f69f16] rounded-full animate-pulse"></div>
                    Guardando...
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  💾 Guardado automático activado
                </div>
              </div>
            </div>
          </div>

          {/* Content Area - Sin AnimatePresence para mejor performance */}
          <div className="flex-1 overflow-y-auto p-6">
            <div key={activeSection}>
              {activeSection === 'general' && <GeneralSection showNotification={showNotification} />}
              {activeSection === 'biography' && <BiographySection showNotification={showNotification} />}
              {activeSection === 'social' && <SocialSection showNotification={showNotification} />}
              {activeSection === 'sets' && <SetsSection showNotification={showNotification} />}
              {activeSection === 'gallery' && <GallerySection showNotification={showNotification} />}
              {activeSection === 'videos' && <VideosSection showNotification={showNotification} />}
              {activeSection === 'documents' && <DocumentsSection showNotification={showNotification} />}
              {activeSection === 'design' && <DesignSection showNotification={showNotification} />}
              {activeSection === 'history' && <HistorySection showNotification={showNotification} />}
            </div>
          </div>
        </div>
      </div>

      {/* Notificaciones Toast */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <Toast key={notification.id} notification={notification} onClose={closeNotification} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Sección General
const GeneralSection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { artistData, updateArtistData, uploadFile } = useCMS();
  const [formData, setFormData] = useState({
    name: artistData?.name || '',
    genres: artistData?.genres || [],
    collective: artistData?.collective || '',
    labels: artistData?.labels || [],
    baseCity: artistData?.baseCity || '',
    yearsActive: artistData?.yearsActive || '',
    influences: artistData?.influences || '',
    contactEmail: artistData?.contactEmail || '',
    agencyWebsite: artistData?.agencyWebsite || ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    const success = await updateArtistData(formData, 'Información General');
    if (success) {
      showNotification('✅ Información general guardada permanentemente', 'success');
    } else {
      showNotification('❌ Error guardando la información', 'error');
    }
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        // Crear URL de vista previa inmediata
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
        
        // Simular subida de archivo (en un entorno real, aquí se subiría a un servidor)
        const url = await uploadFile(file, 'hero');
        
        // Actualizar los datos del artista con la nueva imagen
        const success = await updateArtistData({ heroImage: previewUrl }, 'Imagen Hero');
        
        if (success) {
          showNotification('✅ Imagen de portada actualizada y guardada', 'success');
        }
      } catch (error) {
        showNotification('❌ Error subiendo la imagen', 'error');
        setPreviewImage(null);
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Obtener la imagen actual (preview si existe, sino la del artista, sino la por defecto)
  const currentImage = previewImage || artistData?.heroImage || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=face';

  return (
    <div className="space-y-6">
      {/* Información Básica */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-4">Información Básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Artista
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Colectivo/Agencia
            </label>
            <input
              type="text"
              value={formData.collective}
              onChange={(e) => setFormData({ ...formData, collective: e.target.value })}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email de Contacto
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sitio Web de la Agencia (Opcional)
            </label>
            <input
              type="url"
              value={formData.agencyWebsite}
              onChange={(e) => setFormData({ ...formData, agencyWebsite: e.target.value })}
              placeholder="https://www.tuagencia.com"
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
            <p className="text-xs text-gray-500 mt-1">
              Si tienes agencia, los visitantes podrán ir directamente a su sitio web
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Base/Ciudad
            </label>
            <input
              type="text"
              value={formData.baseCity}
              onChange={(e) => setFormData({ ...formData, baseCity: e.target.value })}
              placeholder="León, España"
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Años Activo
            </label>
            <input
              type="text"
              value={formData.yearsActive}
              onChange={(e) => setFormData({ ...formData, yearsActive: e.target.value })}
              placeholder="2020 - Presente"
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>
        </div>
      </div>

      {/* Detalles Musicales */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-4">Detalles Musicales</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Géneros Musicales
            </label>
            <input
              type="text"
              value={formData.genres.join(', ')}
              onChange={(e) => setFormData({ ...formData, genres: e.target.value.split(', ').filter(g => g.trim()) })}
              placeholder="Techno, Hard Groove, Underground"
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
            <p className="text-xs text-gray-500 mt-1">Separa los géneros con comas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sellos Discográficos
            </label>
            <input
              type="text"
              value={formData.labels.join(', ')}
              onChange={(e) => setFormData({ ...formData, labels: e.target.value.split(', ').filter(l => l.trim()) })}
              placeholder="Independent, Underground Records"
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
            <p className="text-xs text-gray-500 mt-1">Separa los sellos con comas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Influencias Musicales
            </label>
            <textarea
              value={formData.influences}
              onChange={(e) => setFormData({ ...formData, influences: e.target.value })}
              placeholder="Industrial Techno, Minimal, Hard Groove"
              rows={3}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Imagen de Portada */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-4">Imagen de Portada</h3>
        
        {/* Vista previa de la imagen actual */}
        <div className="mb-6">
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-800">
            <img
              src={currentImage}
              alt="Imagen de portada actual"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=face';
              }}
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-[#f69f16] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-white text-sm">Subiendo imagen...</p>
                </div>
              </div>
            )}
            {previewImage && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                ✓ Nueva imagen
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Esta imagen se mostrará como fondo en la sección principal del press kit
          </p>
        </div>

        {/* Área de subida */}
        <div className="border-2 border-dashed border-[#f69f16]/30 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroUpload}
            className="hidden"
            id="hero-upload"
            disabled={isUploading}
          />
          <label htmlFor="hero-upload" className={`cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="text-[#f69f16] mb-2 text-2xl">
              {isUploading ? '⏳' : '📸'}
            </div>
            <p className="text-gray-400 mb-1">
              {isUploading ? 'Subiendo imagen...' : 'Haz clic para cambiar imagen de portada'}
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG hasta 5MB. Recomendado: 1920x1080px o superior
            </p>
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

// Sección Biografía
const BiographySection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { artistData, updateArtistData } = useCMS();
  const [bioData, setBioData] = useState({
    shortBio: artistData?.biography?.text || '',
    fullBio: artistData?.biography?.fullText || '',
    pressRelease: artistData?.biography?.pressRelease || ''
  });

  const handleSave = async () => {
    const success = await updateArtistData({
      biography: {
        text: bioData.shortBio,
        fullText: bioData.fullBio,
        pressRelease: bioData.pressRelease,
        pdfUrl: artistData?.biography?.pdfUrl || ''
      }
    }, 'Biografía');
    
    if (success) {
      showNotification('✅ Biografía guardada permanentemente', 'success');
    } else {
      showNotification('❌ Error guardando la biografía', 'error');
    }
  };

  const generatePDF = () => {
    showNotification('Generando PDF de biografía...', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Biografía Corta (Para vista previa)
          </label>
          <textarea
            value={bioData.shortBio}
            onChange={(e) => setBioData({ ...bioData, shortBio: e.target.value })}
            rows={4}
            placeholder="Biografía resumida para mostrar inicialmente..."
            className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Caracteres: {bioData.shortBio.length}/500
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Biografía Completa
          </label>
          <textarea
            value={bioData.fullBio}
            onChange={(e) => setBioData({ ...bioData, fullBio: e.target.value })}
            rows={8}
            placeholder="Biografía completa del artista..."
            className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Caracteres: {bioData.fullBio.length}/2000
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Press Release (Opcional)
          </label>
          <textarea
            value={bioData.pressRelease}
            onChange={(e) => setBioData({ ...bioData, pressRelease: e.target.value })}
            rows={6}
            placeholder="Información adicional para prensa..."
            className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white resize-none"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Guardar Biografía
        </button>
        <button
          onClick={generatePDF}
          className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Generar PDF
        </button>
      </div>
    </div>
  );
};

// Sección Redes Sociales
const SocialSection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { artistData, updateArtistData } = useCMS();
  const [socialData, setSocialData] = useState({
    instagram: artistData?.socialMedia?.instagram || '',
    facebook: artistData?.socialMedia?.facebook || '',
    soundcloud: artistData?.socialMedia?.soundcloud || '',
    spotify: artistData?.socialMedia?.spotify || '',
    youtube: artistData?.socialMedia?.youtube || '',
    twitter: artistData?.socialMedia?.twitter || '',
    tiktok: artistData?.socialMedia?.tiktok || '',
    website: artistData?.socialMedia?.website || ''
  });

  const handleSave = async () => {
    const success = await updateArtistData({
      socialMedia: socialData
    }, 'Redes Sociales');
    
    if (success) {
      showNotification('✅ Redes sociales guardadas permanentemente', 'success');
    } else {
      showNotification('❌ Error guardando las redes sociales', 'error');
    }
  };

  const socialPlatforms = [
    { key: 'instagram', name: 'Instagram', icon: '📷', placeholder: 'https://instagram.com/usuario' },
    { key: 'facebook', name: 'Facebook', icon: '📘', placeholder: 'https://facebook.com/pagina' },
    { key: 'soundcloud', name: 'SoundCloud', icon: '🎵', placeholder: 'https://soundcloud.com/usuario' },
    { key: 'spotify', name: 'Spotify', icon: '🎧', placeholder: 'https://open.spotify.com/artist/...' },
    { key: 'youtube', name: 'YouTube', icon: '📺', placeholder: 'https://youtube.com/channel/...' },
    { key: 'twitter', name: 'Twitter/X', icon: '🐦', placeholder: 'https://twitter.com/usuario' },
    { key: 'tiktok', name: 'TikTok', icon: '🎬', placeholder: 'https://tiktok.com/@usuario' },
    { key: 'website', name: 'Website', icon: '🌐', placeholder: 'https://sitio-web.com' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => (
          <div key={platform.key}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <span className="mr-2">{platform.icon}</span>
              {platform.name}
            </label>
            <input
              type="url"
              value={socialData[platform.key as keyof typeof socialData]}
              onChange={(e) => setSocialData({ 
                ...socialData, 
                [platform.key]: e.target.value 
              })}
              placeholder={platform.placeholder}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>
        ))}
      </div>

      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-3">Vista Previa</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {socialPlatforms.map((platform) => {
            const url = socialData[platform.key as keyof typeof socialData];
            return (
              <div 
                key={platform.key}
                className={`p-3 rounded-lg text-center ${
                  url ? 'bg-[#f69f16]/20 text-[#f69f16]' : 'bg-gray-800/50 text-gray-500'
                }`}
              >
                <div className="text-2xl mb-1">{platform.icon}</div>
                <div className="text-xs">{platform.name}</div>
                {url && <div className="text-xs text-green-400 mt-1">✓ Configurado</div>}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Guardar Redes Sociales
      </button>
    </div>
  );
};

// Sección Sets & Media
const SetsSection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { artistData, updateArtistData } = useCMS();
  const [sets, setSets] = useState(artistData?.sets || []);
  const [newSet, setNewSet] = useState({
    title: '',
    platform: 'SoundCloud',
    embedCode: '',
    downloadUrl: ''
  });

  const handleAddSet = () => {
    if (newSet.title && newSet.embedCode) {
      const setWithId = {
        ...newSet,
        id: Date.now().toString(),
        order: sets.length + 1,
        isVisible: true,
        createdAt: new Date().toISOString()
      };
      setSets([...sets, setWithId]);
      setNewSet({ title: '', platform: 'SoundCloud', embedCode: '', downloadUrl: '' });
    }
  };

  const handleRemoveSet = (id: string) => {
    setSets(sets.filter(set => set.id !== id));
  };

  const handleSave = async () => {
    const success = await updateArtistData({ sets }, 'Sets & Media');
    if (success) {
      showNotification('✅ Sets guardados permanentemente', 'success');
    } else {
      showNotification('❌ Error guardando los sets', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Agregar nuevo set */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-4">Agregar Nuevo Set</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título del Set
            </label>
            <input
              type="text"
              value={newSet.title}
              onChange={(e) => setNewSet({ ...newSet, title: e.target.value })}
              placeholder="Nombre del set o mix"
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Plataforma
            </label>
            <select
              value={newSet.platform}
              onChange={(e) => setNewSet({ ...newSet, platform: e.target.value })}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            >
              <option value="SoundCloud">SoundCloud</option>
              <option value="Spotify">Spotify</option>
              <option value="YouTube">YouTube</option>
              <option value="Mixcloud">Mixcloud</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Código de Embed
          </label>
          <textarea
            value={newSet.embedCode}
            onChange={(e) => setNewSet({ ...newSet, embedCode: e.target.value })}
            placeholder="Pega aquí el código iframe de embed..."
            rows={3}
            className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white resize-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            URL de Descarga (Opcional)
          </label>
          <input
            type="url"
            value={newSet.downloadUrl}
            onChange={(e) => setNewSet({ ...newSet, downloadUrl: e.target.value })}
            placeholder="https://..."
            className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
          />
        </div>
        <button
          onClick={handleAddSet}
          className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Agregar Set
        </button>
      </div>

      {/* Lista de sets existentes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Sets Existentes ({sets.length})</h3>
        {sets.map((set) => (
          <div key={set.id} className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-white">{set.title}</h4>
                <p className="text-sm text-[#f69f16]">{set.platform}</p>
              </div>
              <button
                onClick={() => handleRemoveSet(set.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                🗑️
              </button>
            </div>
            <div className="bg-gray-800 rounded p-2 mb-2">
              <div 
                dangerouslySetInnerHTML={{ __html: set.embedCode }}
                className="max-h-32 overflow-hidden"
              />
            </div>
            {set.downloadUrl && (
              <p className="text-xs text-gray-400">
                Descarga: {set.downloadUrl}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Guardar Sets
      </button>
    </div>
  );
};

// Sección Galería
const GallerySection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { artistData, updateArtistData, uploadFile } = useCMS();
  const [images, setImages] = useState(artistData?.gallery || []);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploading(true);
      try {
        const uploadPromises = Array.from(files).map(async (file) => {
          const url = await uploadFile(file, 'gallery');
          return {
            id: Date.now().toString() + Math.random(),
            url,
            alt: file.name.split('.')[0],
            caption: '',
            order: images.length + 1,
            isVisible: true,
            uploadedAt: new Date().toISOString()
          };
        });
        
        const newImages = await Promise.all(uploadPromises);
        setImages([...images, ...newImages]);
        showNotification(`✅ ${newImages.length} imagen(es) subida(s) exitosamente`, 'success');
      } catch (error) {
        showNotification('❌ Error subiendo imágenes', 'error');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleUpdateCaption = (id: string, caption: string) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, caption } : img
    ));
  };

  const handleSave = async () => {
    const success = await updateArtistData({ gallery: images }, 'Galería');
    if (success) {
      showNotification('✅ Galería guardada permanentemente', 'success');
    } else {
      showNotification('❌ Error guardando la galería', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <div className="border-2 border-dashed border-[#f69f16]/30 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="gallery-upload"
          disabled={uploading}
        />
        <label htmlFor="gallery-upload" className="cursor-pointer">
          <div className="text-[#f69f16] mb-4 text-4xl">
            {uploading ? '⏳' : '📸'}
          </div>
          <p className="text-gray-400 mb-2">
            {uploading ? 'Subiendo imágenes...' : 'Haz clic para subir imágenes'}
          </p>
          <p className="text-xs text-gray-500">
            JPG, PNG hasta 5MB cada una. Múltiples archivos permitidos.
          </p>
        </label>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-black/30 border border-[#f69f16]/20 rounded-lg overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMDAgNTBDODAuNjcxNSA1MCA2NSA2NS42NzE1IDY1IDg1QzY1IDEwNC4zMjkgODAuNjcxNSAxMjAgMTAwIDEyMEMxMTkuMzI5IDEyMCAxMzUgMTA0LjMyOSAxMzUgODVDMTM1IDY1LjY3MTUgMTE5LjMyOSA1MCAxMDAgNTBaIiBmaWxsPSIjNkI3Mjg0Ii8+CjxwYXRoIGQ9Ik0xMDAgNjVDODguOTU0MyA2NSA4MCA3My45NTQzIDgwIDg1Qzg0IDk2LjA0NTcgODguOTU0MyAxMDUgMTAwIDEwNUMxMTEuMDQ2IDEwNSAxMjAgOTYuMDQ1NyAxMjAgODVDMTIwIDczLjk1NDMgMTExLjA0NiA2NSAxMDAgNjVaIiBmaWxsPSIjOUI5Q0E0Ii8+Cjwvc3ZnPgo=';
                }}
              />
              <button
                onClick={() => handleRemoveImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-3">
              <input
                type="text"
                value={image.caption}
                onChange={(e) => handleUpdateCaption(image.id, e.target.value)}
                placeholder="Descripción de la imagen..."
                className="w-full p-2 bg-black/50 border border-[#f69f16]/30 rounded text-white text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {images.length > 0 && (
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Total: {images.length} imagen(es) en la galería
          </p>
          <button
            onClick={handleSave}
            className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Guardar Galería
          </button>
        </div>
      )}
    </div>
  );
};

// Sección Videos
const VideosSection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { artistData, updateArtistData, uploadFile } = useCMS();
  const [videos, setVideos] = useState<ArtistVideo[]>(artistData?.videos || []);
  const [newVideo, setNewVideo] = useState({
    title: '',
    url: '',
    thumbnail: '',
    type: 'youtube' as 'upload' | 'youtube' | 'drive' | 'vimeo',
    embedCode: '',
    duration: '',
    description: ''
  });

  const handleAddVideo = () => {
    if (newVideo.title && (newVideo.url || newVideo.embedCode)) {
      const videoToAdd: ArtistVideo = {
        id: Date.now().toString(),
        title: newVideo.title,
        url: newVideo.url || newVideo.embedCode,
        thumbnail: newVideo.thumbnail || '/images/default-video-thumb.jpg',
        type: newVideo.type,
        embedCode: newVideo.embedCode,
        duration: newVideo.duration,
        description: newVideo.description,
        order: videos.length + 1,
        isVisible: true,
        uploadedAt: new Date().toISOString()
      };
      setVideos([...videos, videoToAdd]);
      setNewVideo({ 
        title: '', 
        url: '', 
        thumbnail: '', 
        type: 'youtube', 
        embedCode: '', 
        duration: '', 
        description: '' 
      });
      showNotification('✅ Video agregado exitosamente', 'success');
    }
  };

  const handleRemoveVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
    showNotification('✅ Video eliminado', 'success');
  };

  const handleSave = async () => {
    const success = await updateArtistData({ videos }, 'Videos');
    if (success) {
      showNotification('✅ Videos guardados permanentemente', 'success');
    } else {
      showNotification('❌ Error guardando los videos', 'error');
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'document');
        setNewVideo(prev => ({ ...prev, url }));
        showNotification('✅ Video subido exitosamente', 'success');
      } catch (error) {
        showNotification('❌ Error subiendo el video', 'error');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Agregar nuevo video */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-4">📹 Agregar Nuevo Video</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título del Video *
            </label>
            <input
              type="text"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              placeholder="Título del video..."
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
              </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Video
            </label>
            <select
              value={newVideo.type}
              onChange={(e) => setNewVideo({ ...newVideo, type: e.target.value as any })}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            >
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="drive">Google Drive</option>
              <option value="upload">Subir Archivo</option>
            </select>
                  </div>
                </div>

        {newVideo.type === 'upload' ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subir Video
            </label>
                  <input
                    type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL del Video
                  </label>
            <input
              type="url"
              value={newVideo.url}
              onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
              placeholder="https://..."
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
                </div>
              )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL de Thumbnail
            </label>
              <input
              type="url"
              value={newVideo.thumbnail}
              onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
              placeholder="https://..."
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Duración
            </label>
              <input
                type="text"
              value={newVideo.duration}
              onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
              placeholder="ej: 45:32"
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
            />
          </div>
        </div>

        {(newVideo.type === 'youtube' || newVideo.type === 'vimeo') && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Código de Embed (Opcional)
            </label>
            <textarea
              value={newVideo.embedCode}
              onChange={(e) => setNewVideo({ ...newVideo, embedCode: e.target.value })}
              placeholder="Pega aquí el código iframe de embed..."
              rows={3}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white resize-none"
            />
                </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Descripción (Opcional)
          </label>
          <textarea
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            placeholder="Descripción del video..."
            rows={2}
            className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white resize-none"
          />
                </div>

              <button
          onClick={handleAddVideo}
          disabled={!newVideo.title || (!newVideo.url && !newVideo.embedCode)}
          className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📥 Agregar Video
              </button>
          </div>

      {/* Lista de videos existentes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">🎬 Videos Existentes ({videos.length})</h3>
        
        {videos.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No hay videos agregados. ¡Agrega tu primer video!
          </p>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{video.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="bg-[#f69f16]/20 text-[#f69f16] px-2 py-1 rounded text-xs">
                      {video.type.toUpperCase()}
            </span>
                    {video.duration && <span>⏱️ {video.duration}</span>}
          </div>
                  {video.description && (
                    <p className="text-sm text-gray-300 mt-2">{video.description}</p>
                  )}
        </div>
          <button
                  onClick={() => handleRemoveVideo(video.id)}
                  className="text-red-400 hover:text-red-300 transition-colors ml-4"
                  title="Eliminar video"
                >
                  🗑️
          </button>
      </div>

              <div className="bg-gray-800 rounded p-2 mb-2">
                {video.embedCode ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: video.embedCode }}
                    className="max-h-64 overflow-hidden"
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 bg-gray-700 rounded">
                    <div className="text-center">
                      <p className="text-gray-400 mb-2">Vista previa no disponible</p>
                      <a 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#f69f16] hover:text-[#e6950f] underline text-sm"
                      >
                        🔗 Ver video
                      </a>
                      </div>
                    </div>
                )}
                </div>

              <div className="text-xs text-gray-500">
                <p>📅 Agregado: {new Date(video.uploadedAt).toLocaleString()}</p>
                {video.url && (
                  <p className="truncate">🔗 URL: {video.url}</p>
                )}
                      </div>
                  </div>
          ))
        )}
      </div>

      {/* Información sobre videos */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <h4 className="text-blue-400 font-semibold mb-2">💡 Información sobre Videos</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• <strong>YouTube/Vimeo:</strong> Usa la URL del video y opcionalmente el código embed</li>
          <li>• <strong>Google Drive:</strong> Asegúrate de que el video sea público o compartido</li>
          <li>• <strong>Subir Archivo:</strong> Sube videos directamente (máximo 100MB)</li>
          <li>• <strong>Thumbnail:</strong> Se mostrará como imagen de vista previa del video</li>
          <li>• Los videos aparecerán en la sección "Videos" de tu página pública</li>
        </ul>
        </div>

      <button
        onClick={handleSave}
        className="w-full bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
      >
        💾 Guardar Todos los Videos
      </button>
    </div>
  );
};

// Sección Documentos
const DocumentsSection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { artistData, updateArtistData, uploadFile } = useCMS();
  const [documents, setDocuments] = useState(artistData?.documents || {});

  const handleDocumentUpload = async (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'documents');
        const newDoc = {
          id: Date.now().toString(),
          name: file.name,
          url,
          type: file.type,
          size: file.size,
          uploadDate: new Date().toISOString()
        };
        setDocuments(prev => ({ ...prev, [type]: newDoc }));
        showNotification(`✅ ${type} subido exitosamente`, 'success');
      } catch (error) {
        showNotification('❌ Error subiendo documento', 'error');
      }
    }
  };

  const handleSave = async () => {
    const success = await updateArtistData({ documents }, 'Documentos');
    if (success) {
      showNotification('✅ Documentos guardados permanentemente', 'success');
    } else {
      showNotification('❌ Error guardando documentos', 'error');
    }
  };

  const documentTypes = [
    { key: 'technicalRider', name: 'Rider Técnico', icon: '🎛️' },
    { key: 'pressKit', name: 'Press Kit', icon: '📄' },
    { key: 'contract', name: 'Contrato Modelo', icon: '📋' },
    { key: 'insurance', name: 'Seguro', icon: '🛡️' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes.map((docType) => (
          <div key={docType.key} className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#f69f16] mb-4">
              {docType.icon} {docType.name}
            </h3>
            
            {documents[docType.key as keyof typeof documents] ? (
              <div className="space-y-3">
                <div className="bg-black/50 rounded p-3">
                  <p className="text-white font-medium">{(documents[docType.key as keyof typeof documents] as any)?.name}</p>
                  <p className="text-xs text-gray-400">
                    {((documents[docType.key as keyof typeof documents] as any)?.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={(documents[docType.key as keyof typeof documents] as any)?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded text-sm"
                  >
                    Ver Documento
                  </a>
                  <button
                    onClick={() => setDocuments(prev => ({ ...prev, [docType.key]: undefined }))}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#f69f16]/30 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleDocumentUpload(docType.key, e)}
                  className="hidden"
                  id={`${docType.key}-upload`}
                />
                <label htmlFor={`${docType.key}-upload`} className="cursor-pointer">
                  <div className="text-[#f69f16] mb-2 text-2xl">{docType.icon}</div>
                  <p className="text-gray-400 text-sm">Subir {docType.name}</p>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
      >
        💾 Guardar Documentos
      </button>
    </div>
  );
};

// Sección Diseño
const DesignSection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { artistData, updateArtistData } = useCMS();
  const [design, setDesign] = useState(artistData?.design || {
    primaryColor: '#f69f16',
    secondaryColor: '#e6950f',
    photosLayout: 'grid',
    buttonStyle: 'rounded'
  });

  const handleSave = async () => {
    const success = await updateArtistData({ design }, 'Diseño');
    if (success) {
      showNotification('✅ Diseño guardado permanentemente', 'success');
    } else {
      showNotification('❌ Error guardando el diseño', 'error');
    }
  };

  const presetColors = [
    '#f69f16', '#e6950f', '#ff6b6b', '#4ecdc4', '#45b7d1', 
    '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'
  ];

  return (
    <div className="space-y-6">
      {/* Colores */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-4">🎨 Colores</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color Principal
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={design.primaryColor}
                onChange={(e) => setDesign({ ...design, primaryColor: e.target.value })}
                className="w-12 h-12 rounded border-2 border-gray-600"
              />
              <input
                type="text"
                value={design.primaryColor}
                onChange={(e) => setDesign({ ...design, primaryColor: e.target.value })}
                className="flex-1 p-2 bg-black/50 border border-[#f69f16]/30 rounded text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color Secundario
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={design.secondaryColor}
                onChange={(e) => setDesign({ ...design, secondaryColor: e.target.value })}
                className="w-12 h-12 rounded border-2 border-gray-600"
              />
              <input
                type="text"
                value={design.secondaryColor}
                onChange={(e) => setDesign({ ...design, secondaryColor: e.target.value })}
                className="flex-1 p-2 bg-black/50 border border-[#f69f16]/30 rounded text-white"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-300 mb-2">Colores predefinidos:</p>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setDesign({ ...design, primaryColor: color })}
                className="w-8 h-8 rounded border-2 border-gray-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Layout y Estilos */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-4">🎯 Estilos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Layout de Fotos
            </label>
            <select
              value={design.photosLayout}
              onChange={(e) => setDesign({ ...design, photosLayout: e.target.value as 'grid' | 'centered' })}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded text-white"
            >
              <option value="grid">Grid Completo</option>
              <option value="centered">Centrado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estilo de Botones
            </label>
            <select
              value={design.buttonStyle}
              onChange={(e) => setDesign({ ...design, buttonStyle: e.target.value as 'rounded' | 'square' | 'pill' })}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded text-white"
            >
              <option value="rounded">Redondeados</option>
              <option value="square">Cuadrados</option>
              <option value="pill">Píldora</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vista Previa */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#f69f16] mb-4">👀 Vista Previa</h3>
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded"
            style={{ backgroundColor: design.primaryColor }}
          ></div>
          <div 
            className="w-16 h-16 rounded"
            style={{ backgroundColor: design.secondaryColor }}
          ></div>
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              design.buttonStyle === 'pill' ? 'rounded-full' :
              design.buttonStyle === 'square' ? 'rounded-none' : 'rounded-lg'
            }`}
            style={{ 
              backgroundColor: design.primaryColor,
              color: 'black'
            }}
          >
            Botón de Ejemplo
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
      >
        🎨 Guardar Diseño
      </button>
    </div>
  );
};

// Sección Historial
const HistorySection: React.FC<{ showNotification: (message: string, type?: 'success' | 'error' | 'info') => void }> = ({ showNotification }) => {
  const { getSaveHistory, clearSaveHistory } = useCMS();
  const [history, setHistory] = useState(getSaveHistory());

  const handleClearHistory = () => {
    if (confirm('¿Estás seguro de que quieres limpiar el historial?')) {
      clearSaveHistory();
      setHistory([]);
      showNotification('🗑️ Historial limpiado', 'success');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#f69f16]">📋 Historial de Cambios</h3>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            🗑️ Limpiar Historial
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-4">📋</div>
          <p>No hay cambios guardados aún</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.reverse().map((entry, index) => (
            <div key={index} className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{entry.section}</h4>
                <span className="text-xs text-gray-400">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-gray-300">
                <p>Cambios guardados en {entry.section.toLowerCase()}</p>
                {entry.timestamp && (
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(entry.timestamp).toRelativeTimeString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};