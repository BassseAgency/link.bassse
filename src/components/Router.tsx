import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthService } from '../services/authService';
import { MetricsService } from '../services/metricsService';
import { ArtistProfile } from '../../types';
import { BasseDashboard } from '../../components/BasseDashboard';

// Importar componentes existentes
import App from '../../App';

// Componente para página de artista individual
const ArtistPage: React.FC = () => {
  const { artistSlug } = useParams<{ artistSlug: string }>();
  const [artistData, setArtistData] = useState<ArtistProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadArtistData();
    trackPageView();
  }, [artistSlug]);

  const loadArtistData = async () => {
    if (!artistSlug) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    try {
      // Aquí cargarías los datos del artista desde Firebase
      // Por ahora, simulamos con datos de K-SAIS
      if (artistSlug === 'k-sais') {
        await AuthService.ensureKSaisUser();
        // Simular carga de datos
        setTimeout(() => {
          setArtistData({
            id: 'k-sais',
            uid: 'k-sais-uid',
            slug: 'k-sais',
            name: 'K-SAIS',
            email: 'contrataciones.ksais@gmail.com',
            genres: ['Techno', 'Hard Groove', 'Underground'],
            collective: 'La Mata Fest',
            heroImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=face',
            biography: {
              text: 'K-SAIS, originario de León, se ha consolidado como una de las promesas más destacadas del techno en España...'
            },
            socialMedia: {
              instagram: 'https://www.instagram.com/k_sais/',
              soundcloud: 'https://soundcloud.com/k-sais'
            },
            sets: [],
            gallery: [],
            documents: {},
            contactEmail: 'contrataciones.ksais@gmail.com',
            languages: { primary: 'es', secondary: 'en' },
            isActive: true,
            isPublic: true,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          });
          setIsLoading(false);
        }, 1000);
      } else {
        setNotFound(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error cargando artista:', error);
      setNotFound(true);
      setIsLoading(false);
    }
  };

  const trackPageView = async () => {
    if (artistSlug) {
      const source = MetricsService.detectTrafficSource();
      const country = await MetricsService.getUserCountry();
      await MetricsService.trackPageView(artistSlug, source, country);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f69f16] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando perfil del artista...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <ArtistNotFound />;
  }

  // Renderizar la app existente con los datos del artista
  return <App artistData={artistData} />;
};

// Página de artista no encontrado
const ArtistNotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl mb-6">🎵</div>
        <h1 className="text-3xl font-bold text-white mb-4">Artista no encontrado</h1>
        <p className="text-gray-400 mb-8">
          El artista que buscas no existe o su perfil no está disponible.
        </p>
        <div className="space-y-4">
          <a
            href="/"
            className="block bg-[#f69f16] hover:bg-[#e6950f] text-black font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ir a la página principal
          </a>
          <a
            href="/k-sais"
            className="block bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ver perfil de K-SAIS
          </a>
        </div>
      </div>
    </div>
  );
};

// Página principal con lista de artistas
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#f69f16] mb-4">BASSSE Artists</h1>
          <p className="text-xl text-gray-400">
            Plataforma de press kits electrónicos para artistas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card de K-SAIS */}
          <div className="bg-black/50 border border-[#f69f16]/20 rounded-lg overflow-hidden hover:border-[#f69f16]/40 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-[#f69f16]/20 to-black relative">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=face"
                alt="K-SAIS"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-2xl font-bold text-white">K-SAIS</h3>
                <p className="text-[#f69f16]">Techno • Hard Groove</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">
                Originario de León, una de las promesas más destacadas del techno en España.
              </p>
              <a
                href="/k-sais"
                className="block w-full bg-[#f69f16] hover:bg-[#e6950f] text-black font-bold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Ver Press Kit
              </a>
            </div>
          </div>

          {/* Placeholder para más artistas */}
          <div className="bg-black/30 border-2 border-dashed border-[#f69f16]/30 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">➕</div>
              <p className="text-gray-400">Próximamente más artistas</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500">
            Powered by <span className="text-[#f69f16] font-bold">BASSSE Agency</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Dashboard de BASSSE (protegido)
const BasseDashboardPage: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autorización (simplificado)
    const checkAuth = () => {
      const isAdmin = localStorage.getItem('bassse-admin') === 'true';
      setIsAuthorized(isAdmin);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f69f16] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold text-white mb-4">Acceso Restringido</h1>
          <p className="text-gray-400 mb-8">
            No tienes permisos para acceder al dashboard de BASSSE.
          </p>
          <a
            href="/"
            className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return <BasseDashboard onClose={() => window.location.href = '/'} />;
};

// Componente principal del router
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* Dashboard de BASSSE */}
        <Route path="/bassse-dashboard" element={<BasseDashboardPage />} />
        
        {/* Páginas de artistas individuales */}
        <Route path="/:artistSlug" element={<ArtistPage />} />
        
        {/* CMS de artistas (redirige a la página del artista con parámetro) */}
        <Route path="/cms/:artistSlug" element={<Navigate to="/:artistSlug?cms=true" replace />} />
        
        {/* Ruta catch-all */}
        <Route path="*" element={<ArtistNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}; 