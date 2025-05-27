import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetricsService } from '../src/services/metricsService';
import { BasseDashboardData, Lead, ArtistMetrics } from '../types';
import { useDesign } from '../src/hooks/useDesign';
import { useCMS } from '../src/context/CMSContext';

interface BasseDashboardProps {
  onClose: () => void;
}

type DashboardSection = 'overview' | 'artists' | 'leads' | 'metrics' | 'settings';

export const BasseDashboard: React.FC<BasseDashboardProps> = ({ onClose }) => {
  const { primaryColor } = useDesign();
  const { enterAdminMode } = useCMS();
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [dashboardData, setDashboardData] = useState<BasseDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener nombre del usuario desde localStorage
  const currentUser = useMemo(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return { username: 'Administrador', role: 'admin' };
      }
    }
    return { username: 'Administrador', role: 'admin' };
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const globalMetrics = await MetricsService.getGlobalMetrics();
      const topArtists = await MetricsService.getTopArtists(5);
      const recentLeads = await MetricsService.getRecentLeads(10);

      const data: BasseDashboardData = {
        totalArtists: globalMetrics.totalArtists,
        activeArtists: globalMetrics.totalArtists,
        totalViews: globalMetrics.totalViews,
        totalDownloads: globalMetrics.totalDownloads,
        totalLeads: globalMetrics.totalLeads,
        topArtists,
        recentMetrics: [],
        recentLeads,
        lastUpdated: new Date().toISOString()
      };

      setDashboardData(data);
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPasswordReset = async (email: string, artistName: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      alert(`Email de restablecimiento enviado a ${email} para ${artistName}`);
    } catch (error) {
      console.error('Error enviando reset:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    onClose();
  };

  const sections = useMemo(() => [
    { id: 'overview', name: 'Resumen', icon: '📊' },
    { id: 'artists', name: 'Artistas', icon: '🎵' },
    { id: 'leads', name: 'Leads', icon: '📧' },
    { id: 'metrics', name: 'Métricas', icon: '📈' },
    { id: 'settings', name: 'Configuración', icon: '⚙️' }
  ], []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <div 
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: `${primaryColor} transparent transparent transparent` }}
          ></div>
          <p className="text-white text-lg">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-hidden">
      <div className="h-full flex">
        {/* Sidebar */}
        <div 
          className="w-80 bg-black flex flex-col"
          style={{ borderRight: `1px solid ${primaryColor}30` }}
        >
          {/* Header con nombre del usuario */}
          <div className="p-6" style={{ borderBottom: `1px solid ${primaryColor}30` }}>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold" style={{ color: primaryColor }}>BASSSE Dashboard</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="text-sm">
              <p className="text-white font-medium">Bienvenido, {currentUser.username}</p>
              <p className="text-gray-400 text-xs capitalize">{currentUser.role} • link.bassse.com</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as DashboardSection)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-150 ${
                    activeSection === section.id
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                  style={activeSection === section.id ? {
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                    border: `1px solid ${primaryColor}30`
                  } : {}}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 space-y-2" style={{ borderTop: `1px solid ${primaryColor}30` }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              🔗 Ver LINK.BASSSE
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              🚪 Cerrar Sesión
            </button>
            <div className="text-xs text-gray-500 text-center mt-4">
              <p>BASSSE Agency</p>
              <p>v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Header */}
          <div className="p-6 bg-black/50" style={{ borderBottom: `1px solid ${primaryColor}30` }}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {sections.find(s => s.id === activeSection)?.name}
              </h2>
              <button
                onClick={loadDashboardData}
                className="text-black font-medium py-2 px-4 rounded-lg transition-colors"
                style={{ backgroundColor: primaryColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${primaryColor}CC`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                }}
              >
                🔄 Actualizar
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div>
              {activeSection === 'overview' && <OverviewSection data={dashboardData} />}
              {activeSection === 'artists' && <ArtistsSection data={dashboardData} onSendPasswordReset={handleSendPasswordReset} enterAdminMode={enterAdminMode} onClose={onClose} />}
              {activeSection === 'leads' && <LeadsSection data={dashboardData} onSendPasswordReset={handleSendPasswordReset} />}
              {activeSection === 'metrics' && <MetricsSection data={dashboardData} />}
              {activeSection === 'settings' && <SettingsSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sección Resumen
const OverviewSection: React.FC<{ data: BasseDashboardData | null }> = ({ data }) => {
  const { primaryColor } = useDesign();
  if (!data) return <div>Cargando...</div>;

  const stats = [
    { label: 'Total Artistas', value: data.totalArtists, icon: '🎵', color: 'text-blue-400' },
    { label: 'Visualizaciones', value: data.totalViews.toLocaleString(), icon: '👁️', color: 'text-green-400' },
    { label: 'Descargas', value: data.totalDownloads.toLocaleString(), icon: '⬇️', color: 'text-purple-400' },
    { label: 'Leads', value: data.totalLeads.toLocaleString(), icon: '📧', color: 'text-yellow-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 rounded-lg p-6"
            style={{ border: `1px solid ${primaryColor}20` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Artists */}
      <div className="bg-black/30 rounded-lg p-6" style={{ border: `1px solid ${primaryColor}20` }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>Artistas Más Populares</h3>
        <div className="space-y-3">
          {data.topArtists.map((artist, index) => (
            <div key={artist.artistId} className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-bold" style={{ color: primaryColor }}>#{index + 1}</span>
                <div>
                  <p className="font-semibold text-white">{artist.name}</p>
                  <p className="text-sm text-gray-400">/{artist.slug}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-semibold">{artist.views} vistas</p>
                <p className="text-purple-400 text-sm">{artist.downloads} descargas</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-black/30 rounded-lg p-6" style={{ border: `1px solid ${primaryColor}20` }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>Leads Recientes</h3>
        <div className="space-y-3">
          {data.recentLeads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
              <div>
                <p className="font-semibold text-white">{lead.email}</p>
                <p className="text-sm text-gray-400">{lead.artistSlug} • {lead.source}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  lead.isProcessed ? 'bg-green-600 text-white' : 'bg-yellow-600 text-black'
                }`}>
                  {lead.isProcessed ? 'Procesado' : 'Pendiente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sección Artistas
const ArtistsSection: React.FC<{ 
  data: BasseDashboardData | null; 
  onSendPasswordReset: (email: string, artistName: string) => void;
  enterAdminMode: (artistSlug: string) => Promise<boolean>;
  onClose: () => void;
}> = ({ data, onSendPasswordReset, enterAdminMode, onClose }) => {
  const { primaryColor } = useDesign();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'views' | 'downloads' | 'leads'>('views');
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  // Mock data expandido para artistas
  const allArtists = [
    {
      id: 'ksais-1',
      name: 'K-SAIS',
      slug: 'k-sais',
      email: 'contrataciones.ksais@gmail.com',
      status: 'active',
      views: 15420,
      downloads: 892,
      leads: 23,
      lastActive: '2024-01-15',
      joinDate: '2023-06-15',
      genres: ['Techno', 'Hard Groove'],
      location: 'León, España',
      profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'artist-2',
      name: 'LUNA BASS',
      slug: 'luna-bass',
      email: 'booking@lunabass.com',
      status: 'active',
      views: 8750,
      downloads: 445,
      leads: 12,
      lastActive: '2024-01-14',
      joinDate: '2023-08-20',
      genres: ['Deep House', 'Minimal'],
      location: 'Barcelona, España',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'artist-3',
      name: 'DARK PULSE',
      slug: 'dark-pulse',
      email: 'info@darkpulse.music',
      status: 'inactive',
      views: 3200,
      downloads: 156,
      leads: 5,
      lastActive: '2023-12-28',
      joinDate: '2023-09-10',
      genres: ['Industrial', 'Dark Techno'],
      location: 'Madrid, España',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'artist-4',
      name: 'NEON WAVES',
      slug: 'neon-waves',
      email: 'contact@neonwaves.es',
      status: 'active',
      views: 12100,
      downloads: 678,
      leads: 18,
      lastActive: '2024-01-15',
      joinDate: '2023-07-05',
      genres: ['Synthwave', 'Electronic'],
      location: 'Valencia, España',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const filteredArtists = allArtists
    .filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artist.slug.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || artist.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'views': return b.views - a.views;
        case 'downloads': return b.downloads - a.downloads;
        case 'leads': return b.leads - a.leads;
        default: return 0;
      }
    });

  const handleToggleStatus = (artistId: string) => {
    // Aquí iría la lógica para cambiar el estado del artista
    console.log(`Cambiando estado del artista: ${artistId}`);
  };

  const handleDeleteArtist = (artistId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este artista?')) {
      console.log(`Eliminando artista: ${artistId}`);
    }
  };

  const handleEditArtist = async (artistSlug: string) => {
    // Usar la nueva funcionalidad de modo administrador
    const success = await enterAdminMode(artistSlug);
    
    if (success) {
      // Cerrar el dashboard actual y mostrar el CMS en modo administrador
      onClose();
    } else {
      alert('Error al acceder al modo administrador');
    }
  };

  return (
    <div className="space-y-6">
      {/* Controles y Filtros */}
      <div className="bg-black/30 rounded-lg p-6" style={{ border: `1px solid ${primaryColor}20` }}>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ color: primaryColor }}>Gestión de Artistas</h3>
          <button 
            className="text-black font-medium py-2 px-4 rounded-lg transition-colors"
            style={{ backgroundColor: primaryColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${primaryColor}CC`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
            }}
          >
            + Nuevo Artista
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Búsqueda */}
          <div>
            <input
              type="text"
              placeholder="Buscar artistas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* Filtro por Estado */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>

          {/* Ordenar por */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
            >
              <option value="views">Ordenar por Vistas</option>
              <option value="name">Ordenar por Nombre</option>
              <option value="downloads">Ordenar por Descargas</option>
              <option value="leads">Ordenar por Leads</option>
            </select>
          </div>

          {/* Estadísticas Rápidas */}
          <div className="text-center">
            <p className="text-sm text-gray-400">Total: {filteredArtists.length}</p>
            <p className="text-sm text-green-400">
              Activos: {filteredArtists.filter(a => a.status === 'active').length}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Artistas */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50 border-b border-[#f69f16]/20">
              <tr>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Artista</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Estado</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Métricas</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Última Actividad</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtists.map((artist) => (
                <tr key={artist.id} className="border-b border-gray-700 hover:bg-black/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={artist.profileImage}
                        alt={artist.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-white">{artist.name}</p>
                        <p className="text-sm text-gray-400">/{artist.slug}</p>
                        <p className="text-xs text-gray-500">{artist.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      artist.status === 'active' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-red-600 text-white'
                    }`}>
                      {artist.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Desde: {new Date(artist.joinDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-green-400">👁️ {artist.views.toLocaleString()} vistas</p>
                      <p className="text-sm text-purple-400">⬇️ {artist.downloads.toLocaleString()} descargas</p>
                      <p className="text-sm text-yellow-400">📧 {artist.leads} leads</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-white">
                      {new Date(artist.lastActive).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {artist.genres.join(', ')}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedArtist(artist.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        👁️ Ver
                      </button>
                      <button
                        onClick={() => handleEditArtist(artist.slug)}
                        className="text-black px-3 py-1 rounded text-xs transition-colors font-medium"
                        style={{ backgroundColor: primaryColor }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${primaryColor}CC`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = primaryColor;
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => onSendPasswordReset(artist.email, artist.name)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        🔑 Reset Pass
                      </button>
                      <button
                        onClick={() => handleToggleStatus(artist.id)}
                        className={`px-3 py-1 rounded text-xs transition-colors ${
                          artist.status === 'active'
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {artist.status === 'active' ? '⏸️ Pausar' : '▶️ Activar'}
                      </button>
                      <button
                        onClick={() => handleDeleteArtist(artist.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estadísticas de Artistas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-3">Top Géneros</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Techno</span>
              <span className="text-[#f69f16]">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">House</span>
              <span className="text-[#f69f16]">30%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Electronic</span>
              <span className="text-[#f69f16]">25%</span>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-3">Ubicaciones</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">España</span>
              <span className="text-[#f69f16]">4 artistas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Francia</span>
              <span className="text-[#f69f16]">2 artistas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Alemania</span>
              <span className="text-[#f69f16]">1 artista</span>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-3">Rendimiento Promedio</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Vistas/mes</span>
              <span className="text-green-400">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Descargas/mes</span>
              <span className="text-purple-400">293</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Leads/mes</span>
              <span className="text-yellow-400">14</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sección Leads
const LeadsSection: React.FC<{ data: BasseDashboardData | null; onSendPasswordReset: (email: string, artistName: string) => void }> = ({ data }) => {
  const { primaryColor } = useDesign();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processed'>('all');
  const [filterArtist, setFilterArtist] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Mock data expandido para leads
  const allLeads: Lead[] = [
    {
      id: 'lead-1',
      email: 'booking@festivalmadrid.com',
      name: 'Carlos Promoter',
      artistSlug: 'k-sais',
      source: 'press_kit_download',
      message: 'Interesados en booking para festival de verano en Madrid. Fechas: 15-17 Julio.',
      ipAddress: '185.45.123.89',
      country: 'España',
      isProcessed: false,
      createdAt: '2024-01-15T10:30:00Z',
      priority: 'high',
      eventType: 'Festival',
      budget: '€2,000 - €5,000',
      eventDate: '2024-07-15'
    },
    {
      id: 'lead-2',
      email: 'info@clubberlin.de',
      name: 'Anna Schmidt',
      artistSlug: 'k-sais',
      source: 'contact_form',
      message: 'Queremos contratar para nuestro club en Berlín. Techno night especial.',
      ipAddress: '87.123.45.67',
      country: 'Alemania',
      isProcessed: true,
      createdAt: '2024-01-14T15:45:00Z',
      priority: 'medium',
      eventType: 'Club',
      budget: '€1,500 - €3,000',
      eventDate: '2024-03-22'
    },
    {
      id: 'lead-3',
      email: 'events@warehouse-london.co.uk',
      name: 'James Wilson',
      artistSlug: 'luna-bass',
      source: 'social_media',
      message: 'Underground event en Londres. Buscamos artistas de deep house.',
      ipAddress: '78.156.89.123',
      country: 'Reino Unido',
      isProcessed: false,
      createdAt: '2024-01-13T20:15:00Z',
      priority: 'medium',
      eventType: 'Warehouse',
      budget: '€800 - €1,500',
      eventDate: '2024-02-28'
    },
    {
      id: 'lead-4',
      email: 'contact@ibizasummer.es',
      name: 'María González',
      artistSlug: 'neon-waves',
      source: 'press_kit_download',
      message: 'Residencia de verano en Ibiza. Synthwave nights.',
      ipAddress: '91.234.56.78',
      country: 'España',
      isProcessed: false,
      createdAt: '2024-01-12T11:20:00Z',
      priority: 'high',
      eventType: 'Residencia',
      budget: '€3,000 - €8,000',
      eventDate: '2024-06-01'
    },
    {
      id: 'lead-5',
      email: 'booking@amsterdamrave.nl',
      name: 'Peter Van Der Berg',
      artistSlug: 'dark-pulse',
      source: 'referral',
      message: 'Rave underground en Amsterdam. Industrial techno night.',
      ipAddress: '145.67.89.123',
      country: 'Países Bajos',
      isProcessed: true,
      createdAt: '2024-01-11T16:30:00Z',
      priority: 'low',
      eventType: 'Rave',
      budget: '€1,000 - €2,000',
      eventDate: '2024-04-10'
    }
  ];

  useEffect(() => {
    setLeads(allLeads);
  }, []);

  const filteredLeads = allLeads.filter(lead => {
    const matchesSearch = lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'pending' && !lead.isProcessed) ||
                         (filterStatus === 'processed' && lead.isProcessed);
    const matchesArtist = filterArtist === 'all' || lead.artistSlug === filterArtist;
    const matchesSource = filterSource === 'all' || lead.source === filterSource;
    
    return matchesSearch && matchesStatus && matchesArtist && matchesSource;
  });

  const handleBulkAction = (action: 'delete' | 'export') => {
    if (selectedLeads.length === 0) return;
    
    if (action === 'delete') {
      if (confirm(`¿Eliminar ${selectedLeads.length} leads seleccionados?`)) {
        setLeads(leads.filter(lead => !selectedLeads.includes(lead.id)));
      }
    } else if (action === 'export') {
      // Simular exportación CSV
      const csvData = selectedLeads.map(id => {
        const lead = leads.find(l => l.id === id);
        return lead ? `${lead.email},${lead.name},${lead.artistSlug},${lead.source},${lead.createdAt}` : '';
      }).join('\n');
      
      const blob = new Blob([`Email,Nombre,Artista,Fuente,Fecha\n${csvData}`], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    }
    setSelectedLeads([]);
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'low': return 'text-green-400 bg-green-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'press_kit_download': return '📥';
      case 'contact_form': return '📝';
      case 'social_media': return '📱';
      case 'referral': return '👥';
      default: return '📧';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controles y Filtros */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#f69f16]">Gestión de Leads</h3>
          <div className="flex gap-2">
            {selectedLeads.length > 0 && (
              <>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  📊 Exportar Seleccionados ({selectedLeads.length})
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  🗑️ Eliminar Seleccionados
                </button>
              </>
            )}
            <button className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-2 px-4 rounded-lg transition-colors">
              📊 Exportar CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Búsqueda */}
          <div>
            <input
              type="text"
              placeholder="Buscar leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* Filtro por Estado */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="processed">Procesados</option>
            </select>
          </div>

          {/* Filtro por Artista */}
          <div>
            <select
              value={filterArtist}
              onChange={(e) => setFilterArtist(e.target.value)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">Todos los artistas</option>
              <option value="k-sais">K-SAIS</option>
              <option value="luna-bass">LUNA BASS</option>
              <option value="dark-pulse">DARK PULSE</option>
              <option value="neon-waves">NEON WAVES</option>
            </select>
          </div>

          {/* Filtro por Fuente */}
          <div>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">Todas las fuentes</option>
              <option value="press_kit_download">Press Kit</option>
              <option value="contact_form">Formulario</option>
              <option value="social_media">Redes Sociales</option>
              <option value="referral">Referencia</option>
            </select>
          </div>

          {/* Estadísticas */}
          <div className="text-center">
            <p className="text-sm text-gray-400">Total: {filteredLeads.length}</p>
            <p className="text-sm text-yellow-400">
              Pendientes: {filteredLeads.filter(l => !l.isProcessed).length}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Leads */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50 border-b border-[#f69f16]/20">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Lead</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Artista</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Evento</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Prioridad</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Estado</th>
                <th className="text-left p-4 text-[#f69f16] font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-700 hover:bg-black/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-semibold text-white">{lead.email}</p>
                      <p className="text-sm text-gray-400">{lead.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm">{getSourceIcon(lead.source)}</span>
                        <span className="text-xs text-gray-500">{lead.source}</span>
                        <span className="text-xs text-gray-500">• {lead.country}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-medium">{lead.artistSlug.toUpperCase()}</p>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm text-white">{lead.eventType}</p>
                      <p className="text-xs text-gray-400">{lead.budget}</p>
                      <p className="text-xs text-gray-500">
                        {lead.eventDate && new Date(lead.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority || 'medium')}`}>
                      {lead.priority?.toUpperCase() || 'MEDIUM'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.isProcessed ? 'bg-green-600 text-white' : 'bg-yellow-600 text-black'
                      }`}>
                        {lead.isProcessed ? 'Procesado' : 'Pendiente'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowDetails(showDetails === lead.id ? null : lead.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        {showDetails === lead.id ? 'Ocultar' : 'Ver'}
                      </button>
                      <button
                        onClick={() => window.open(`mailto:${lead.email}?subject=Re: ${lead.artistSlug.toUpperCase()} - Booking`)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        📧 Responder
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalles del Lead */}
      {showDetails && (
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          {(() => {
            const lead = filteredLeads.find(l => l.id === showDetails);
            if (!lead) return null;
            
            return (
              <div>
                <h4 className="text-lg font-bold text-[#f69f16] mb-4">Detalles del Lead</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Información de Contacto</h5>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Email:</span> {lead.email}</p>
                      <p><span className="text-gray-400">Nombre:</span> {lead.name}</p>
                      <p><span className="text-gray-400">País:</span> {lead.country}</p>
                      <p><span className="text-gray-400">IP:</span> {lead.ipAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Información del Evento</h5>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Tipo:</span> {lead.eventType}</p>
                      <p><span className="text-gray-400">Presupuesto:</span> {lead.budget}</p>
                      <p><span className="text-gray-400">Fecha:</span> {lead.eventDate && new Date(lead.eventDate).toLocaleDateString()}</p>
                      <p><span className="text-gray-400">Prioridad:</span> {lead.priority}</p>
                    </div>
                  </div>
                </div>
                {lead.message && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-white mb-2">Mensaje</h5>
                    <p className="text-gray-300 bg-black/50 p-3 rounded-lg">{lead.message}</p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Estadísticas de Leads */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-3">Por Fuente</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">📥 Press Kit</span>
              <span className="text-[#f69f16]">40%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">📝 Formulario</span>
              <span className="text-[#f69f16]">30%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">📱 Redes</span>
              <span className="text-[#f69f16]">20%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">👥 Referencia</span>
              <span className="text-[#f69f16]">10%</span>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-3">Por País</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">🇪🇸 España</span>
              <span className="text-[#f69f16]">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">🇩🇪 Alemania</span>
              <span className="text-[#f69f16]">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">🇬🇧 Reino Unido</span>
              <span className="text-[#f69f16]">20%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">🇳🇱 Países Bajos</span>
              <span className="text-[#f69f16]">10%</span>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-3">Tipo de Evento</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">🎪 Festival</span>
              <span className="text-[#f69f16]">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">🏢 Club</span>
              <span className="text-[#f69f16]">30%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">🏭 Warehouse</span>
              <span className="text-[#f69f16]">20%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">🌴 Residencia</span>
              <span className="text-[#f69f16]">15%</span>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-3">Conversión</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Tasa de conversión</span>
              <span className="text-green-400">23%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Tiempo promedio</span>
              <span className="text-yellow-400">2.3 días</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Valor promedio</span>
              <span className="text-purple-400">€2,400</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sección Métricas
const MetricsSection: React.FC<{ data: BasseDashboardData | null }> = ({ data }) => {
  const { primaryColor } = useDesign();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [metricType, setMetricType] = useState<'views' | 'downloads' | 'leads' | 'all'>('all');
  const [selectedArtist, setSelectedArtist] = useState<string>('all');

  // Mock data para métricas avanzadas
  const metricsData = {
    '7d': {
      views: [1200, 1350, 1100, 1450, 1600, 1300, 1500],
      downloads: [45, 52, 38, 61, 58, 43, 67],
      leads: [3, 5, 2, 7, 6, 4, 8],
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    },
    '30d': {
      views: [15420, 16200, 14800, 17300, 18100, 16900, 19200, 17800, 16500, 18900, 20100, 19400, 21200, 20800, 19600, 22100, 21500, 20300, 23400, 22800, 21900, 24200, 23600, 22400, 25100, 24500, 23300, 26200, 25600, 24800],
      downloads: [892, 945, 823, 1021, 1156, 1089, 1234, 1178, 1067, 1289, 1345, 1298, 1456, 1389, 1278, 1523, 1467, 1356, 1634, 1578, 1467, 1689, 1623, 1512, 1745, 1689, 1578, 1801, 1745, 1634],
      leads: [23, 25, 21, 28, 31, 29, 34, 32, 28, 36, 38, 35, 41, 39, 36, 43, 41, 38, 46, 44, 41, 48, 46, 43, 51, 49, 46, 54, 52, 49],
      labels: Array.from({length: 30}, (_, i) => `${i + 1}`)
    },
    '90d': {
      views: Array.from({length: 90}, (_, i) => 15000 + Math.random() * 10000),
      downloads: Array.from({length: 90}, (_, i) => 800 + Math.random() * 600),
      leads: Array.from({length: 90}, (_, i) => 20 + Math.random() * 30),
      labels: Array.from({length: 90}, (_, i) => `${i + 1}`)
    },
    '1y': {
      views: Array.from({length: 365}, (_, i) => 12000 + Math.random() * 15000),
      downloads: Array.from({length: 365}, (_, i) => 600 + Math.random() * 800),
      leads: Array.from({length: 365}, (_, i) => 15 + Math.random() * 40),
      labels: Array.from({length: 365}, (_, i) => `${i + 1}`)
    }
  };

  const currentData = metricsData[timeRange] || metricsData['30d'];

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '7d': return 'Últimos 7 días';
      case '30d': return 'Últimos 30 días';
      case '90d': return 'Últimos 90 días';
      case '1y': return 'Último año';
      default: return 'Últimos 30 días';
    }
  };

  const calculateGrowth = (data: number[]) => {
    if (data.length < 2) return 0;
    const recent = data.slice(-7).reduce((a, b) => a + b, 0) / 7;
    const previous = data.slice(-14, -7).reduce((a, b) => a + b, 0) / 7;
    return previous > 0 ? ((recent - previous) / previous * 100) : 0;
  };

  const topPerformingArtists = [
    { name: 'K-SAIS', views: 15420, downloads: 892, leads: 23, growth: 12.5 },
    { name: 'LUNA BASS', views: 8750, downloads: 445, leads: 12, growth: 8.3 },
    { name: 'NEON WAVES', views: 12100, downloads: 678, leads: 18, growth: 15.7 },
    { name: 'DARK PULSE', views: 3200, downloads: 156, leads: 5, growth: -2.1 }
  ];

  const trafficSources = [
    { source: 'Directo', percentage: 35, color: 'bg-blue-500' },
    { source: 'Redes Sociales', percentage: 28, color: 'bg-purple-500' },
    { source: 'WhatsApp', percentage: 20, color: 'bg-green-500' },
    { source: 'Email', percentage: 12, color: 'bg-yellow-500' },
    { source: 'Otros', percentage: 5, color: 'bg-gray-500' }
  ];

  const deviceStats = [
    { device: 'Móvil', percentage: 68, icon: '📱' },
    { device: 'Desktop', percentage: 25, icon: '💻' },
    { device: 'Tablet', percentage: 7, icon: '📟' }
  ];

  const topCountries = [
    { country: 'España', flag: '🇪🇸', visits: 12450, percentage: 45 },
    { country: 'Alemania', flag: '🇩🇪', visits: 6890, percentage: 25 },
    { country: 'Francia', flag: '🇫🇷', visits: 4123, percentage: 15 },
    { country: 'Reino Unido', flag: '🇬🇧', visits: 2756, percentage: 10 },
    { country: 'Otros', flag: '🌍', visits: 1381, percentage: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#f69f16]">Métricas Detalladas</h3>
          <div className="flex gap-2">
            <button className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-2 px-4 rounded-lg transition-colors">
              📊 Exportar Reporte
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              📧 Enviar por Email
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rango de Tiempo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="1y">Último año</option>
            </select>
          </div>

          {/* Tipo de Métrica */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Métrica</label>
            <select
              value={metricType}
              onChange={(e) => setMetricType(e.target.value as any)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">Todas las métricas</option>
              <option value="views">Solo Vistas</option>
              <option value="downloads">Solo Descargas</option>
              <option value="leads">Solo Leads</option>
            </select>
          </div>

          {/* Artista */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Artista</label>
            <select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
              className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">Todos los artistas</option>
              <option value="k-sais">K-SAIS</option>
              <option value="luna-bass">LUNA BASS</option>
              <option value="neon-waves">NEON WAVES</option>
              <option value="dark-pulse">DARK PULSE</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-400">Vistas Totales</h4>
            <span className="text-2xl">👁️</span>
          </div>
          <p className="text-2xl font-bold text-green-400">
            {currentData.views[currentData.views.length - 1]?.toLocaleString()}
          </p>
          <p className={`text-sm ${calculateGrowth(currentData.views) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {calculateGrowth(currentData.views) >= 0 ? '↗️' : '↘️'} 
            {Math.abs(calculateGrowth(currentData.views)).toFixed(1)}% vs período anterior
          </p>
        </div>

        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-400">Descargas</h4>
            <span className="text-2xl">⬇️</span>
          </div>
          <p className="text-2xl font-bold text-purple-400">
            {currentData.downloads[currentData.downloads.length - 1]?.toLocaleString()}
          </p>
          <p className={`text-sm ${calculateGrowth(currentData.downloads) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {calculateGrowth(currentData.downloads) >= 0 ? '↗️' : '↘️'} 
            {Math.abs(calculateGrowth(currentData.downloads)).toFixed(1)}% vs período anterior
          </p>
        </div>

        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-400">Leads Generados</h4>
            <span className="text-2xl">📧</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">
            {currentData.leads[currentData.leads.length - 1]?.toLocaleString()}
          </p>
          <p className={`text-sm ${calculateGrowth(currentData.leads) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {calculateGrowth(currentData.leads) >= 0 ? '↗️' : '↘️'} 
            {Math.abs(calculateGrowth(currentData.leads)).toFixed(1)}% vs período anterior
          </p>
        </div>

        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-400">Tasa de Conversión</h4>
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-2xl font-bold text-[#f69f16]">2.3%</p>
          <p className="text-sm text-green-400">↗️ +0.4% vs período anterior</p>
        </div>
      </div>

      {/* Gráfico Principal */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h4 className="text-lg font-bold text-[#f69f16] mb-4">
          Tendencias - {getTimeRangeLabel(timeRange)}
        </h4>
                 <div className="h-64 bg-black/50 rounded-lg p-4 flex items-end justify-between gap-1">
           {currentData.views.slice(-20).map((value: number, index: number) => {
             const maxValue = Math.max(...currentData.views);
             const height = (value / maxValue) * 100;
             return (
               <div key={index} className="flex flex-col items-center">
                 <div
                   className="bg-gradient-to-t from-[#f69f16] to-[#e6950f] rounded-t min-w-[8px] transition-all duration-300 hover:opacity-80"
                   style={{ height: `${height}%` }}
                   title={`${value.toLocaleString()} vistas`}
                 />
                 <span className="text-xs text-gray-500 mt-1 rotate-45 origin-left">
                   {currentData.labels[index]}
                 </span>
               </div>
             );
           })}
         </div>
      </div>

      {/* Análisis Detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Artistas */}
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-4">Rendimiento por Artista</h4>
          <div className="space-y-4">
            {topPerformingArtists.map((artist, index) => (
              <div key={artist.name} className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-[#f69f16] font-bold">#{index + 1}</span>
                  <div>
                    <p className="font-semibold text-white">{artist.name}</p>
                    <p className="text-sm text-gray-400">
                      {artist.views.toLocaleString()} vistas • {artist.downloads} descargas
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${artist.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {artist.growth >= 0 ? '↗️' : '↘️'} {Math.abs(artist.growth).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">{artist.leads} leads</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fuentes de Tráfico */}
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-4">Fuentes de Tráfico</h4>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">{source.source}</span>
                  <span className="text-white font-medium">{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`${source.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dispositivos */}
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-4">Dispositivos</h4>
          <div className="space-y-3">
            {deviceStats.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{device.icon}</span>
                  <span className="text-gray-300">{device.device}</span>
                </div>
                <span className="text-[#f69f16] font-medium">{device.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Países */}
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-4">Top Países</h4>
          <div className="space-y-3">
            {topCountries.map((country) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-gray-300">{country.country}</span>
                </div>
                <div className="text-right">
                  <p className="text-[#f69f16] font-medium">{country.percentage}%</p>
                  <p className="text-xs text-gray-500">{country.visits.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horarios de Mayor Actividad */}
        <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-[#f69f16] mb-4">Horarios Pico</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">🌅 Mañana (6-12h)</span>
              <span className="text-[#f69f16]">15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">☀️ Tarde (12-18h)</span>
              <span className="text-[#f69f16]">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">🌆 Noche (18-24h)</span>
              <span className="text-[#f69f16]">40%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">🌙 Madrugada (0-6h)</span>
              <span className="text-[#f69f16]">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights y Recomendaciones */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h4 className="text-lg font-bold text-[#f69f16] mb-4">💡 Insights y Recomendaciones</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-white mb-2">📈 Oportunidades de Crecimiento</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• NEON WAVES muestra el mayor crecimiento (+15.7%)</li>
              <li>• Las redes sociales generan el 28% del tráfico</li>
              <li>• Los horarios de 18-24h son los más activos</li>
              <li>• Alemania representa una oportunidad de expansión</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-2">⚠️ Áreas de Mejora</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• DARK PULSE necesita estrategia de reactivación</li>
              <li>• Tasa de conversión móvil puede mejorarse</li>
              <li>• Optimizar contenido para horarios pico</li>
              <li>• Diversificar fuentes de tráfico</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sección Configuración
const SettingsSection: React.FC = () => {
  const { primaryColor } = useDesign();
  const [activeTab, setActiveTab] = useState<'general' | 'users' | 'notifications' | 'security' | 'backup'>('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'LINK.BASSSE',
      domain: 'link.bassse.com',
      supportEmail: 'info@bassse.com',
      maxArtists: 100,
      storageLimit: 10240, // MB
      maintenanceMode: false
    },
    notifications: {
      newArtistRegistration: true,
      weeklyReports: true,
      leadAlerts: true,
      systemAlerts: true,
      emailNotifications: true,
      slackIntegration: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 24, // horas
      passwordPolicy: 'strong',
      ipWhitelist: '',
      apiRateLimit: 1000
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30,
      cloudStorage: 'aws-s3'
    }
  });

  const [users, setUsers] = useState([
    {
      id: '1',
      email: 'admin@link-bassse.com',
      name: 'link-bassse',
      role: 'bassse_admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: '2',
      email: 'contrataciones.ksais@gmail.com',
      name: 'Adminksais',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-14T15:45:00Z',
      createdAt: '2023-06-15T00:00:00Z'
    },
    {
      id: '3',
      email: 'pepe@ejemplo.com',
      name: 'Pepe',
      role: 'artist',
      status: 'active',
      lastLogin: '2024-01-13T20:15:00Z',
      createdAt: '2024-01-10T00:00:00Z'
    }
  ]);

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Guardando configuración:', settings);
    alert('Configuración guardada exitosamente');
  };

  const handleUserAction = (userId: string, action: 'activate' | 'deactivate' | 'delete') => {
    if (action === 'delete' && !confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }
    
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: action === 'activate' ? 'active' : action === 'deactivate' ? 'inactive' : user.status }
        : user
    ).filter(user => action !== 'delete' || user.id !== userId));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'users', name: 'Usuarios', icon: '👥' },
    { id: 'notifications', name: 'Notificaciones', icon: '🔔' },
    { id: 'security', name: 'Seguridad', icon: '🔒' },
    { id: 'backup', name: 'Backup', icon: '💾' }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-black/30 border border-[#f69f16]/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-[#f69f16] mb-6">Configuración del Sistema</h3>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#f69f16] text-black font-medium'
                  : 'bg-black/50 text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Contenido de las tabs */}
        <div className="min-h-[400px]">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Configuración General</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del Sitio
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dominio Principal
                  </label>
                  <input
                    type="text"
                    value={settings.general.domain}
                    readOnly
                    className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email de Soporte
                  </label>
                  <input
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Límite de Artistas
                  </label>
                  <input
                    type="number"
                    value={settings.general.maxArtists}
                    onChange={(e) => handleSettingChange('general', 'maxArtists', parseInt(e.target.value))}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Límite de Almacenamiento (MB)
                  </label>
                  <input
                    type="number"
                    value={settings.general.storageLimit}
                    onChange={(e) => handleSettingChange('general', 'storageLimit', parseInt(e.target.value))}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="maintenanceMode" className="text-gray-300">
                    Modo Mantenimiento
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-white">Gestión de Usuarios</h4>
                <button className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-2 px-4 rounded-lg transition-colors">
                  + Nuevo Usuario
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/50 border-b border-[#f69f16]/20">
                    <tr>
                      <th className="text-left p-4 text-[#f69f16] font-semibold">Usuario</th>
                      <th className="text-left p-4 text-[#f69f16] font-semibold">Rol</th>
                      <th className="text-left p-4 text-[#f69f16] font-semibold">Estado</th>
                      <th className="text-left p-4 text-[#f69f16] font-semibold">Último Acceso</th>
                      <th className="text-left p-4 text-[#f69f16] font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-700 hover:bg-black/30 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-white">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'bassse_admin' ? 'bg-red-600 text-white' :
                            user.role === 'admin' ? 'bg-blue-600 text-white' :
                            'bg-green-600 text-white'
                          }`}>
                            {user.role === 'bassse_admin' ? 'Super Admin' :
                             user.role === 'admin' ? 'Admin' : 'Artista'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {user.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-white">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Registrado: {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUserAction(user.id, user.status === 'active' ? 'deactivate' : 'activate')}
                              className={`px-3 py-1 rounded text-xs transition-colors ${
                                user.status === 'active'
                                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                  : 'bg-green-600 hover:bg-green-700 text-white'
                              }`}
                            >
                              {user.status === 'active' ? 'Pausar' : 'Activar'}
                            </button>
                            {user.role !== 'bassse_admin' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'delete')}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Configuración de Notificaciones</h4>
              
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-black/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">
                        {key === 'newArtistRegistration' ? 'Nuevos Registros de Artistas' :
                         key === 'weeklyReports' ? 'Reportes Semanales' :
                         key === 'leadAlerts' ? 'Alertas de Leads' :
                         key === 'systemAlerts' ? 'Alertas del Sistema' :
                         key === 'emailNotifications' ? 'Notificaciones por Email' :
                         'Integración con Slack'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {key === 'newArtistRegistration' ? 'Notificar cuando se registre un nuevo artista' :
                         key === 'weeklyReports' ? 'Enviar reportes semanales automáticamente' :
                         key === 'leadAlerts' ? 'Alertas inmediatas para nuevos leads' :
                         key === 'systemAlerts' ? 'Notificaciones de estado del sistema' :
                         key === 'emailNotifications' ? 'Habilitar todas las notificaciones por email' :
                         'Enviar notificaciones a canal de Slack'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f69f16]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Configuración de Seguridad</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-black/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Autenticación de Dos Factores</p>
                    <p className="text-sm text-gray-400">Requerir 2FA para todos los administradores</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f69f16]"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tiempo de Sesión (horas)
                  </label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Política de Contraseñas
                  </label>
                  <select
                    value={settings.security.passwordPolicy}
                    onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  >
                    <option value="basic">Básica (8 caracteres)</option>
                    <option value="strong">Fuerte (12 caracteres + símbolos)</option>
                    <option value="enterprise">Empresarial (16 caracteres + 2FA)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Límite de API (req/hora)
                  </label>
                  <input
                    type="number"
                    value={settings.security.apiRateLimit}
                    onChange={(e) => handleSettingChange('security', 'apiRateLimit', parseInt(e.target.value))}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lista Blanca de IPs (opcional)
                </label>
                <textarea
                  value={settings.security.ipWhitelist}
                  onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
                  placeholder="192.168.1.1&#10;10.0.0.1&#10;..."
                  rows={4}
                  className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Configuración de Backup</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-black/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Backup Automático</p>
                    <p className="text-sm text-gray-400">Realizar backups automáticos del sistema</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.backup.autoBackup}
                      onChange={(e) => handleSettingChange('backup', 'autoBackup', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f69f16]"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Frecuencia de Backup
                  </label>
                  <select
                    value={settings.backup.backupFrequency}
                    onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  >
                    <option value="hourly">Cada hora</option>
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Retención (días)
                  </label>
                  <input
                    type="number"
                    value={settings.backup.retentionDays}
                    onChange={(e) => handleSettingChange('backup', 'retentionDays', parseInt(e.target.value))}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Almacenamiento en la Nube
                  </label>
                  <select
                    value={settings.backup.cloudStorage}
                    onChange={(e) => handleSettingChange('backup', 'cloudStorage', e.target.value)}
                    className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                  >
                    <option value="aws-s3">Amazon S3</option>
                    <option value="google-cloud">Google Cloud Storage</option>
                    <option value="azure">Azure Blob Storage</option>
                    <option value="local">Almacenamiento Local</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-black/50 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-3">Acciones de Backup</h5>
                <div className="flex gap-4">
                  <button className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-2 px-4 rounded-lg transition-colors">
                    🔄 Backup Manual
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    📥 Restaurar Backup
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    📊 Ver Historial
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botón de Guardar */}
        <div className="mt-8 pt-6 border-t border-[#f69f16]/20">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              Última actualización: {new Date().toLocaleString()}
            </p>
            <button
              onClick={handleSaveSettings}
              className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-6 rounded-lg transition-colors"
            >
              💾 Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 