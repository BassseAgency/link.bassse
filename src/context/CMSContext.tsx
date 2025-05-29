import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CMSUser, CMSSession, CMSArtistData } from '../../types';
import { SupabaseService } from '../services/supabaseService';
import { supabase } from '../config/supabase';

interface SaveRecord {
  id: string;
  timestamp: string;
  section: string;
  changes: string[];
  user: string;
}

interface CMSContextType {
  session: CMSSession | null;
  artistData: CMSArtistData | null;
  saveHistory: SaveRecord[];
  isLoading: boolean;
  isAdminMode: boolean;
  editingArtist: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateArtistData: (data: Partial<CMSArtistData>, section?: string) => Promise<boolean>;
  uploadFile: (file: File, type: 'image' | 'document' | 'hero' | 'gallery' | 'documents') => Promise<string>;
  generateZip: () => Promise<string>;
  getSaveHistory: () => SaveRecord[];
  clearSaveHistory: () => void;
  enterAdminMode: (artistSlug: string) => Promise<boolean>;
  exitAdminMode: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

interface CMSProviderProps {
  children: ReactNode;
}

export const CMSProvider: React.FC<CMSProviderProps> = ({ children }) => {
  const [session, setSession] = useState<CMSSession | null>(null);
  const [artistData, setArtistData] = useState<CMSArtistData | null>(null);
  const [saveHistory, setSaveHistory] = useState<SaveRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingArtist, setEditingArtist] = useState<string | null>(null);

  // Función para guardar datos permanentemente
  const saveDataPermanently = (data: CMSArtistData) => {
    try {
      localStorage.setItem('cms-artist-data', JSON.stringify(data));
      console.log('✅ Datos guardados permanentemente en localStorage');
    } catch (error) {
      console.error('❌ Error guardando datos:', error);
    }
  };

  // Función para cargar datos guardados
  const loadSavedData = (): CMSArtistData | null => {
    try {
      const savedData = localStorage.getItem('cms-artist-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log('✅ Datos cargados desde localStorage');
        return parsedData;
      }
    } catch (error) {
      console.error('❌ Error cargando datos guardados:', error);
    }
    return null;
  };

  // Función para guardar historial de cambios
  const saveToHistory = (section: string, changes: string[], username: string) => {
    const saveRecord: SaveRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      section,
      changes,
      user: username
    };

    const updatedHistory = [saveRecord, ...saveHistory].slice(0, 50); // Mantener solo los últimos 50 registros
    setSaveHistory(updatedHistory);
    
    try {
      localStorage.setItem('cms-save-history', JSON.stringify(updatedHistory));
      console.log('✅ Historial de guardado actualizado');
    } catch (error) {
      console.error('❌ Error guardando historial:', error);
    }
  };

  // Función para cargar historial de guardados
  const loadSaveHistory = () => {
    try {
      const savedHistory = localStorage.getItem('cms-save-history');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setSaveHistory(parsedHistory);
        console.log('✅ Historial de guardados cargado');
      }
    } catch (error) {
      console.error('❌ Error cargando historial:', error);
    }
  };

  // Función para detectar cambios entre objetos
  const detectChanges = (oldData: any, newData: any, prefix = ''): string[] => {
    const changes: string[] = [];
    
    for (const key in newData) {
      const oldValue = oldData?.[key];
      const newValue = newData[key];
      const fieldName = prefix ? `${prefix}.${key}` : key;
      
      if (Array.isArray(newValue)) {
        if (!Array.isArray(oldValue) || JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          changes.push(`${fieldName}: [${newValue.join(', ')}]`);
        }
      } else if (typeof newValue === 'object' && newValue !== null) {
        if (typeof oldValue !== 'object' || oldValue === null) {
          changes.push(`${fieldName}: actualizado`);
        } else {
          changes.push(...detectChanges(oldValue, newValue, fieldName));
        }
      } else if (oldValue !== newValue) {
        changes.push(`${fieldName}: "${newValue}"`);
      }
    }
    
    return changes;
  };

  // Firebase login function with fallback
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Primero intentar credenciales hardcodeadas (modo desarrollo)
      if (username === 'link-bassse' && password === 'Link2025.') {
        console.log('🔧 Usando login de desarrollo para link-bassse');
        const mockSession: CMSSession = {
          user: {
            uid: 'dev-admin-bassse',
            email: 'admin@link-bassse.com',
            displayName: 'link-bassse',
            role: 'bassse_admin',
            createdAt: new Date().toISOString(),
            isActive: true
          },
          token: 'dev-token-admin-bassse',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        
        setSession(mockSession);
        localStorage.setItem('cms-session', JSON.stringify(mockSession));
        await loadArtistData();
        return true;
      }
      
      if (username === 'AdminBasse' && password === 'BassseAdmin2024!') {
        console.log('🔧 Usando login de desarrollo para AdminBasse');
        const mockSession: CMSSession = {
          user: {
            uid: 'dev-admin-bassse-old',
            email: 'info@bassse.com',
            displayName: 'AdminBasse',
            role: 'bassse_admin',
            createdAt: new Date().toISOString(),
            isActive: true
          },
          token: 'dev-token-admin-bassse-old',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        
        setSession(mockSession);
        localStorage.setItem('cms-session', JSON.stringify(mockSession));
        await loadArtistData();
        return true;
      }
      
      if (username === 'Adminksais' && password === 'Ksais123') {
        console.log('🔧 Usando login de desarrollo para Adminksais');
        const mockSession: CMSSession = {
          user: {
            uid: 'dev-admin-ksais',
            email: 'contrataciones.ksais@gmail.com',
            displayName: 'Adminksais',
            role: 'admin',
            createdAt: new Date().toISOString(),
            isActive: true
          },
          token: 'dev-token-admin-ksais',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        
        setSession(mockSession);
        localStorage.setItem('cms-session', JSON.stringify(mockSession));
        await loadArtistData();
        return true;
      }
      
      // Usuario normal: Pepe
      if (username === 'Pepe' && password === 'Pepe123') {
        console.log('🔧 Usando login de desarrollo para Pepe (usuario normal)');
        const mockSession: CMSSession = {
          user: {
            uid: 'dev-user-pepe',
            email: 'pepe@ejemplo.com',
            displayName: 'Pepe',
            role: 'artist',
            createdAt: new Date().toISOString(),
            isActive: true
          },
          token: 'dev-token-user-pepe',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        
        setSession(mockSession);
        localStorage.setItem('cms-session', JSON.stringify(mockSession));
        await loadArtistData();
        return true;
      }

      // Intentar Supabase solo si las credenciales no son las de desarrollo
      try {
        let result = null;
        
        if (username === 'link-bassse') {
          result = await SupabaseService.login('admin@link-bassse.com', password);
        } else if (username === 'AdminBasse') {
          result = await SupabaseService.login('info@bassse.com', password);
        } else if (username === 'Adminksais') {
          result = await SupabaseService.login('contrataciones.ksais@gmail.com', password);
        } else {
          result = await SupabaseService.loginWithUsername(username, password);
        }
        
        if (result) {
          const { user, token } = result;
          const newSession: CMSSession = {
            user,
            token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          };
          
          setSession(newSession);
          localStorage.setItem('cms-session', JSON.stringify(newSession));
          await loadArtistData();
          return true;
        }
      } catch (supabaseError) {
        console.log('⚠️ Supabase no disponible, usando modo desarrollo');
        // Si Supabase falla, continuar con el flujo normal de error
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated register function
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate validation - check if user already exists
      if (username === 'AdminBasse' || username === 'Adminksais') {
        return false; // User already exists
      }
      
      // Create new user session
      const mockSession: CMSSession = {
        user: {
          uid: Date.now().toString(),
          email: email,
          displayName: username,
          role: 'admin',
          createdAt: new Date().toISOString(),
          isActive: true
        },
        token: 'mock-jwt-token-new-user',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
      
      setSession(mockSession);
      localStorage.setItem('cms-session', JSON.stringify(mockSession));
      
      // Load default artist data for new user
      await loadArtistData();
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setSession(null);
    setArtistData(null);
    localStorage.removeItem('cms-session');
    localStorage.removeItem('cms-artist-data');
    localStorage.removeItem('cms-save-history');
    setSaveHistory([]);
    
    // Cargar datos genéricos por defecto
    setTimeout(() => {
      loadArtistData();
    }, 100);
    
    console.log('🔓 Sesión cerrada - Volviendo al estado genérico');
  };

  const loadArtistData = async () => {
    // Primero intentar cargar datos guardados
    const savedData = loadSavedData();
    
    if (savedData) {
      setArtistData(savedData);
      return;
    }

    // Si no hay datos guardados, usar datos por defecto
    const mockArtistData: CMSArtistData = {
      id: 'artista-1',
      uid: 'artista-uid',
      slug: 'tu-nombre',
      name: 'Tu Nombre',
      email: 'booking@tuagencia.com',
      genres: ['Electronic', 'House', 'Techno'],
      collective: 'Tu Colectivo',
      labels: ['Tu Sello', 'Independent'],
      baseCity: 'Tu Ciudad',
      yearsActive: '2020 - Presente',
      influences: 'Electronic Music, House, Techno',
      heroImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=face',
      biography: {
        text: 'Aquí estará tu biografía. Podrás crear y editar tu biografía completa desde el panel CMS.',
        pdfUrl: '/documents/biografia-artista.pdf'
      },
      socialMedia: {
        instagram: 'https://www.instagram.com/tu_usuario/',
        soundcloud: 'https://soundcloud.com/tu-usuario',
        spotify: 'https://open.spotify.com/artist/tu-artista'
      },
      sets: [
        {
          id: 'set-1',
          title: 'HARD GROOVE SESSIONS #001',
          platform: 'SoundCloud',
          embedCode: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/example"></iframe>',
          downloadUrl: '/downloads/hard-groove-001.mp3',
          order: 1,
          isVisible: true,
          createdAt: new Date().toISOString()
        }
      ],
      gallery: [
        {
          id: 'img-1',
          url: '/images/ksais-1.jpg',
          thumbnailUrl: '/images/ksais-1-thumb.jpg',
          alt: 'K-SAIS Live Performance',
          order: 1,
          isVisible: true,
          uploadedAt: new Date().toISOString()
        }
      ],
      videos: [],
      documents: {
        technicalRider: {
          id: 'rider-1',
          name: 'technical-rider.pdf',
          url: '/documents/ksais-technical-rider.pdf',
          type: 'application/pdf',
          size: 1024000,
          uploadDate: new Date().toISOString()
        }
      },
      contactEmail: 'booking@tuagencia.com',
      languages: {
        primary: 'es',
        secondary: 'en'
      },
      design: {
        primaryColor: '#f69f16',
        secondaryColor: '#e6950f',
        photosLayout: 'grid',
        buttonStyle: 'rounded'
      },
      isActive: true,
      isPublic: true,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    setArtistData(mockArtistData);
    // Guardar datos por defecto
    saveDataPermanently(mockArtistData);
  };

  const updateArtistData = async (data: Partial<CMSArtistData>, section: string = 'general'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (artistData && session) {
        const updatedData = {
          ...artistData,
          ...data,
          lastUpdated: new Date().toISOString()
        };
        
        // Detectar cambios
        const changes = detectChanges(artistData, data);
        
        // Actualizar estado inmediatamente
        setArtistData(updatedData);
        
        // Intentar guardar en servicios externos (Supabase/Firebase)
        let externalSaveSuccess = false;
        try {
          if (editingArtist) {
            // Modo administrador - guardar como el artista editado
            externalSaveSuccess = await SupabaseService.updateArtistData(editingArtist, data);
          } else if (artistData.slug) {
            // Modo normal - guardar datos propios
            externalSaveSuccess = await SupabaseService.updateArtistData(artistData.slug, data);
          }
        } catch (externalError) {
          console.warn('⚠️ Error guardando en servicio externo, usando localStorage:', externalError);
          externalSaveSuccess = false;
        }
        
        // Siempre guardar en localStorage como respaldo
        saveDataPermanently(updatedData);
        
        // Guardar en historial
        if (changes.length > 0) {
          saveToHistory(section, changes, session.user.displayName ?? 'Usuario');
        }
        
        const saveType = externalSaveSuccess ? 'servicio externo y localStorage' : 'localStorage';
        console.log(`✅ Datos actualizados en sección: ${section} (${saveType})`);
        console.log(`📝 Cambios guardados:`, changes);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error actualizando datos:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File, type: 'image' | 'document' | 'hero' | 'gallery' | 'documents'): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock URL based on type
      const mockUrl = `/uploads/${type}/${Date.now()}-${file.name}`;
      
      // Registrar subida de archivo en historial
      if (session) {
        saveToHistory('archivos', [`Archivo subido: ${file.name} (${type})`], session.user.displayName ?? 'Usuario');
      }
      
      return mockUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const generateZip = async (): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Simulate ZIP generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Registrar descarga en historial
      if (session) {
        saveToHistory('descargas', ['Press kit completo generado'], session.user.displayName ?? 'Usuario');
      }
      
      // Return mock download URL
      return `/downloads/ksais-presskit-${Date.now()}.zip`;
    } catch (error) {
      console.error('ZIP generation error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getSaveHistory = (): SaveRecord[] => {
    return saveHistory;
  };

  const clearSaveHistory = () => {
    setSaveHistory([]);
    localStorage.removeItem('cms-save-history');
  };

  // Función para entrar en modo administrador
  const enterAdminMode = async (artistSlug: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setIsAdminMode(true);
      setEditingArtist(artistSlug);
      
      // Cargar datos del artista específico
      const artistMockData = getArtistMockData(artistSlug);
      if (artistMockData) {
        setArtistData(artistMockData);
        console.log(`✅ Modo administrador activado para: ${artistSlug}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error entrando en modo administrador:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para salir del modo administrador
  const exitAdminMode = () => {
    setIsAdminMode(false);
    setEditingArtist(null);
    // Recargar datos del usuario actual
    loadArtistData();
    console.log('✅ Modo administrador desactivado');
  };

  // Función para obtener datos mock del artista
  const getArtistMockData = (artistSlug: string): CMSArtistData | null => {
    const artistsData: { [key: string]: Partial<CMSArtistData> } = {
             'k-sais': {
         name: 'K-SAIS',
         heroImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=face',
         genres: ['Electronic', 'House', 'Techno'],
         collective: 'BASSSE',
         baseCity: 'Madrid',
                 biography: {
           text: 'K-SAIS es un artista emergente en la escena electrónica española. Con un sonido único que fusiona elementos del house clásico con toques modernos de techno, ha logrado posicionarse como una de las promesas más sólidas del panorama nacional.'
         },
        socialMedia: {
          instagram: 'https://instagram.com/k.sais',
          facebook: 'https://facebook.com/ksaismusic',
          soundcloud: 'https://soundcloud.com/k-sais',
          spotify: 'https://open.spotify.com/artist/ksais'
        },
        contactEmail: 'contrataciones.ksais@gmail.com',
        design: {
          primaryColor: '#00ff88',
          secondaryColor: '#ff0088',
          photosLayout: 'grid',
          buttonStyle: 'rounded'
        }
      },
             'luna-bass': {
         name: 'Luna Bass',
         heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=800&fit=crop&crop=face',
         genres: ['Bass', 'Dubstep', 'Future Bass'],
         collective: 'BASSSE',
         baseCity: 'Barcelona',
                 biography: {
           text: 'Luna Bass es una productora y DJ especializada en sonidos bass-heavy. Su estilo único combina elementos del dubstep clásico con melodías emotivas del future bass.'
         },
        socialMedia: {
          instagram: 'https://instagram.com/lunabass',
          soundcloud: 'https://soundcloud.com/luna-bass',
          spotify: 'https://open.spotify.com/artist/lunabass'
        },
        contactEmail: 'booking@lunabass.com',
        design: {
          primaryColor: '#8a2be2',
          secondaryColor: '#ff69b4',
          photosLayout: 'grid',
          buttonStyle: 'rounded'
        }
      }
    };

    const baseData = artistsData[artistSlug];
    if (!baseData) return null;

              // Crear datos completos con valores por defecto
     const completeData: CMSArtistData = {
       id: `artist-${artistSlug}`,
       uid: `uid-${artistSlug}`,
       slug: artistSlug,
       email: baseData.contactEmail || `${artistSlug}@example.com`,
       name: baseData.name || 'Artista',
       heroImage: baseData.heroImage || '',
       genres: baseData.genres || [],
       collective: baseData.collective || '',
       baseCity: baseData.baseCity || '',
       biography: baseData.biography || { text: '' },
       socialMedia: baseData.socialMedia || {},
       sets: baseData.sets || [],
       gallery: baseData.gallery || [],
       videos: [],
       documents: baseData.documents || {
         technicalRider: {
           id: '',
           name: '',
           url: '',
           type: '',
           size: 0,
           uploadDate: ''
         }
       },
       contactEmail: baseData.contactEmail || '',
       languages: { primary: 'es', secondary: 'en' },
       design: baseData.design || {
         primaryColor: '#f69f16',
         secondaryColor: '#e6950f',
         photosLayout: 'grid',
         buttonStyle: 'rounded'
       },
       isActive: true,
       isPublic: true,
       createdAt: new Date().toISOString(),
       lastUpdated: new Date().toISOString()
     };

    return completeData;
  };

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('cms-session');
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        const expiresAt = new Date(parsedSession.expiresAt);
        
        if (expiresAt > new Date()) {
          setSession(parsedSession);
          loadArtistData();
        } else {
          localStorage.removeItem('cms-session');
        }
      } catch (error) {
        console.error('Session restore error:', error);
        localStorage.removeItem('cms-session');
      }
    }
    
    // Cargar historial de guardados
    loadSaveHistory();
  }, []);

  const value: CMSContextType = {
    session,
    artistData,
    saveHistory,
    isLoading,
    isAdminMode,
    editingArtist,
    login,
    register,
    logout,
    updateArtistData,
    uploadFile,
    generateZip,
    getSaveHistory,
    clearSaveHistory,
    enterAdminMode,
    exitAdminMode
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
}; 