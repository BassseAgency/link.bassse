# 💻 EJEMPLOS DE CÓDIGO - LINK.BASSSE

## 🔍 **EJEMPLOS CLAVE DE IMPLEMENTACIÓN**

### **1. Context API - Gestión de Estado Global**
```typescript
// src/context/CMSContext.tsx
export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [artistData, setArtistData] = useState<ArtistProfile | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Simulación de autenticación
      const mockSession: UserSession = {
        userId: credentials.email === 'admin@link-bassse.com' ? 'bassse-admin' : 'user-1',
        username: credentials.email === 'admin@link-bassse.com' ? 'link-bassse' : 'Artista',
        email: credentials.email,
        role: credentials.email === 'admin@link-bassse.com' ? 'bassse_admin' : 'artist',
        artistSlug: credentials.email === 'admin@link-bassse.com' ? undefined : 'k-sais',
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };

      setSession(mockSession);
      localStorage.setItem('cms-session', JSON.stringify(mockSession));
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    setSession(null);
    setArtistData(null);
    setIsAdminMode(false);
    
    localStorage.removeItem('cms-session');
    localStorage.removeItem('cms-artist-data');
    
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
};
```

### **2. Hook de Diseño Dinámico**
```typescript
// src/hooks/useDesign.ts
export const useDesign = () => {
  const { artistData } = useCMS();
  
  const primaryColor = artistData?.design?.primaryColor || '#f69f16';
  const secondaryColor = artistData?.design?.secondaryColor || '#e6950f';
  
  const applyDesignToElement = (element: HTMLElement, property: string) => {
    element.style.setProperty(property, primaryColor);
  };
  
  return {
    primaryColor,
    secondaryColor,
    applyDesignToElement,
    designSettings: artistData?.design || DEFAULT_DESIGN
  };
};
```

### **3. Componente de Subida de Archivos**
```typescript
// components/FileUpload.tsx
const FileUpload: React.FC<FileUploadProps> = ({ onUpload, accept, maxSize }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  const processFiles = async (files: File[]) => {
    setUploading(true);
    
    for (const file of files) {
      if (file.size > maxSize) {
        showError(`Archivo demasiado grande: ${file.name}`);
        continue;
      }
      
      try {
        const url = await simulateUpload(file);
        onUpload(url, file);
      } catch (error) {
        showError(`Error subiendo ${file.name}`);
      }
    }
    
    setUploading(false);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
    >
      {uploading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Subiendo...</span>
        </div>
      ) : (
        <div>
          <p className="text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
          <input
            type="file"
            multiple
            accept={accept}
            onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};
```

### **4. Grid Responsivo de Videos**
```typescript
// components/blocks/PressVideosBlock.tsx
const PressVideosBlock: React.FC = () => {
  const { artistData } = useCMS();
  
  // Usar videos del CMS si existen, sino usar los por defecto
  const videos = (artistData?.videos || defaultVideos).slice(0, 4); // Máximo 4 videos

  // Crear grid centrado específico para videos
  const getVideosGridClasses = () => {
    const count = videos.length;
    if (count === 1) return 'grid grid-cols-1 gap-6 justify-items-center max-w-md mx-auto';
    if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center max-w-3xl mx-auto';
    if (count === 3) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-4xl mx-auto';
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center max-w-6xl mx-auto';
  };

  return (
    <section className="py-20 bg-black/95">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: primaryColor }}>
            Videos
          </h2>
          
          <div className={getVideosGridClasses()}>
            {videos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

### **5. Sistema de Notificaciones**
```typescript
// components/Toast.tsx
const Toast: React.FC<{ notification: ToastNotification; onClose: (id: string) => void }> = ({ notification, onClose }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success': return 'bg-green-600';
      case 'error': return 'bg-red-600';
      case 'info': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className={`${getBgColor()} text-white p-4 rounded-lg shadow-lg max-w-sm flex items-center gap-3`}
    >
      <span className="text-lg">{getIcon()}</span>
      <div className="flex-1">
        <p className="font-medium">{notification.message}</p>
      </div>
      <button
        onClick={() => onClose(notification.id)}
        className="text-white/80 hover:text-white"
      >
        ✕
      </button>
    </motion.div>
  );
};
```

### **6. Modo Administrador**
```typescript
// context/CMSContext.tsx - Función enterAdminMode
const enterAdminMode = async (artistSlug: string): Promise<boolean> => {
  if (!session || session.role !== 'bassse_admin') {
    console.warn('No tienes permisos para entrar en modo administrador');
    return false;
  }

  try {
    // Simular carga de datos del artista
    const artistData = await loadArtistData(artistSlug);
    
    if (artistData) {
      setIsAdminMode(true);
      setEditingArtist(artistSlug);
      setArtistData(artistData);
      
      console.log(`🔧 Modo administrador activado para: ${artistSlug}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error entrando en modo administrador:', error);
    return false;
  }
};
```

### **7. Sistema de Métricas**
```typescript
// services/metricsService.ts
export class MetricsService {
  static trackPageView(artistSlug: string, page: string) {
    const event = {
      type: 'page_view',
      artistSlug,
      page,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    this.sendMetric(event);
  }

  static trackDownload(artistSlug: string, fileType: string, fileName: string) {
    const event = {
      type: 'download',
      artistSlug,
      fileType,
      fileName,
      timestamp: new Date().toISOString()
    };
    
    this.sendMetric(event);
  }

  static trackLead(artistSlug: string, source: string, email: string) {
    const event = {
      type: 'lead_generated',
      artistSlug,
      source,
      email,
      timestamp: new Date().toISOString()
    };
    
    this.sendMetric(event);
  }

  private static sendMetric(event: MetricEvent) {
    // En desarrollo, solo log
    console.log('📊 Metric:', event);
    
    // En producción, enviar a analytics
    // fetch('/api/metrics', { method: 'POST', body: JSON.stringify(event) });
  }
}
```

### **8. Responsive Layout**
```typescript
// App.tsx - Layout Principal
const App: React.FC = () => {
  const [showCMS, setShowCMS] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showBasseDashboard, setShowBasseDashboard] = useState(false);

  return (
    <CMSProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Top Navigation - Responsive */}
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* Layout Desktop */}
          <div className="hidden lg:flex items-center justify-between h-14 px-4 relative">
            <div className="flex items-center gap-4 z-10">
              <LanguageSelector />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center"
              style={{ marginLeft: '30px' }}
            >
              <Logo size="small" useFile={true} />
            </motion.div>

            <motion.div className="flex items-center gap-4 z-10">
              <DevelopmentIndicator />
              <AuthButtons />
            </motion.div>
          </div>

          {/* Layout Mobile */}
          <div className="lg:hidden flex items-center justify-between h-12 px-4 bg-black/90 backdrop-blur-sm">
            <LanguageSelector />
            <Logo size="small" useFile={true} />
            <AuthButtons />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-4">
          <HeroBlock />
          <ArtistInfoBlock />
          <SetsBlock />
          <PressPhotosBlock />
          <PressVideosBlock />
          <BookingBlock />
        </div>

        {/* Modals y Dashboards */}
        <AnimatePresence>
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
          {showCMS && <CMSDashboard onClose={() => setShowCMS(false)} />}
          {showBasseDashboard && <BasseDashboard onClose={() => setShowBasseDashboard(false)} />}
        </AnimatePresence>
      </div>
    </CMSProvider>
  );
};
```

### **9. Custom Hook para Media Queries**
```typescript
// hooks/useMediaQuery.ts
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Uso en componentes
const Component = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  
  return (
    <div className={`
      ${isMobile ? 'p-4' : 'p-8'}
      ${isTablet ? 'grid-cols-2' : ''}
      ${isDesktop ? 'grid-cols-4' : ''}
    `}>
      {/* Contenido responsivo */}
    </div>
  );
};
```

### **10. Validación de Formularios**
```typescript
// utils/validation.ts
export const validateVideoData = (video: Partial<ArtistVideo>): ValidationResult => {
  const errors: string[] = [];
  
  if (!video.title || video.title.trim().length === 0) {
    errors.push('El título es requerido');
  }
  
  if (!video.url || video.url.trim().length === 0) {
    errors.push('La URL es requerida');
  }
  
  if (video.url && !isValidUrl(video.url)) {
    errors.push('La URL no es válida');
  }
  
  if (video.type === 'youtube' && !isYouTubeUrl(video.url || '')) {
    errors.push('La URL debe ser de YouTube');
  }
  
  if (video.type === 'vimeo' && !isVimeoUrl(video.url || '')) {
    errors.push('La URL debe ser de Vimeo');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isYouTubeUrl = (url: string): boolean => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
};
```

---

## 🎨 **PATRONES DE DISEÑO UTILIZADOS**

### **1. Provider Pattern**
- Context API para estado global
- Providers anidados para diferentes contextos
- Hooks personalizados para acceso a contexto

### **2. Compound Component Pattern**
- Dashboard con secciones modulares
- Formularios con componentes reutilizables
- Modales con diferentes tipos de contenido

### **3. Render Props Pattern**
- Componentes de upload con render props
- Métricas con diferentes visualizaciones
- Estados de carga con diferentes UIs

### **4. Custom Hooks Pattern**
- useDesign para estilos dinámicos
- useMediaQuery para responsividad
- useCMS para gestión de estado 