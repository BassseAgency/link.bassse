# 📋 DOCUMENTACIÓN COMPLETA - LINK.BASSSE

## 🎯 **RESUMEN DEL PROYECTO**

**LINK.BASSSE** es una plataforma de Electronic Press Kit (EPK) para artistas de música electrónica desarrollada con React, TypeScript y Vite. Permite a los artistas crear y gestionar sus press kits digitales de manera profesional, mientras que BASSSE Agency puede administrar todos los artistas desde un dashboard centralizado.

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Stack Tecnológico:**
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Gestión de Estado**: React Context API
- **Almacenamiento**: LocalStorage (simulado)
- **Iconos**: Emojis y SVG personalizados

### **Estructura de Directorios:**
```
link.bassse/
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── context/            # Context API para estado global
│   ├── hooks/              # Custom hooks
│   └── services/           # Servicios y utilidades
├── components/             # Componentes principales
│   ├── blocks/            # Bloques de contenido del EPK
│   ├── AuthModal.tsx      # Modal de autenticación
│   ├── BasseDashboard.tsx # Dashboard de administración
│   └── CMSDashboard.tsx   # CMS para artistas
├── public/                # Archivos estáticos
├── types.ts              # Definiciones de tipos TypeScript
└── App.tsx              # Componente principal
```

---

## 🎭 **ROLES Y PERMISOS**

### **1. Usuario Público (Visitante)**
- Ver press kits de artistas
- Descargar contenido público
- Enviar formularios de contacto
- Acceso de solo lectura

### **2. Usuario Artista**
- Gestionar su propio press kit
- Subir contenido (fotos, videos, biografía)
- Ver métricas básicas
- Editar información personal

### **3. Usuario Admin (Artista con permisos ampliados)**
- Todas las funciones de artista
- Acceso a métricas avanzadas
- Gestión completa de contenido

### **4. BASSSE Admin (Super Administrador)**
- Control total del sistema
- Gestión de todos los artistas
- Métricas globales
- Configuración del sistema
- Modo administrador para editar cualquier perfil

---

## 🔧 **COMPONENTES PRINCIPALES**

### **App.tsx - Componente Principal**
```typescript
// Estructura principal de la aplicación
- Gestión de autenticación
- Modo desarrollo vs producción
- Layout responsivo con header fijo
- Navegación entre bloques del EPK
- Integración de todos los componentes
```

### **CMSContext.tsx - Gestión de Estado Global**
```typescript
interface CMSContextType {
  // Datos del artista
  artistData: ArtistProfile | null;
  updateArtistData: (data: Partial<ArtistProfile>) => void;
  
  // Sesión y autenticación
  session: UserSession | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  
  // Modo administrador
  isAdminMode: boolean;
  editingArtist: string | null;
  enterAdminMode: (artistSlug: string) => Promise<boolean>;
  
  // Utilidades
  uploadFile: (file: File, type: 'image' | 'audio' | 'document') => Promise<string>;
  saveHistory: SaveHistoryEntry[];
}
```

---

## 📱 **BLOQUES DEL PRESS KIT**

### **1. HeroBlock.tsx - Cabecera Principal**
```typescript
// Funcionalidades:
- Imagen de fondo de pantalla completa
- Nombre del artista con tipografía especial
- Información básica (géneros, ciudad, colectivo)
- Flecha de navegación animada
- Indicador de modo edición
- Gradiente inferior para transición suave
```

### **2. ArtistInfoBlock.tsx - Información del Artista**
```typescript
// Contenido:
- Biografía completa del artista
- Géneros musicales
- Ubicación geográfica
- Información de contacto
- Enlaces a redes sociales
```

### **3. SetsBlock.tsx - Sets de DJ**
```typescript
// Características:
- Reproductor de audio embebido
- Lista de tracks con timestamps
- Información de cada set (fecha, evento, duración)
- Controles de reproducción
- Descarga de sets
```

### **4. PressPhotosBlock.tsx - Galería de Fotos**
```typescript
// Funcionalidades:
- Grid responsivo de imágenes
- Modal de visualización ampliada
- Descarga individual y masiva
- Thumbnails optimizados
- Navegación con teclado
```

### **5. PressVideosBlock.tsx - Videos**
```typescript
// Características:
- Máximo 4 videos mostrados
- Grid centrado y responsivo
- Soporte para YouTube, Vimeo, archivos locales
- Información de cada video (título, duración)
- Thumbnails personalizados
```

### **6. BookingBlock.tsx - Información de Contratación**
```typescript
// Contenido:
- Formulario de contacto
- Información de precios
- Rider técnico
- Calendario de disponibilidad
- Datos de contacto directo
```

---

## 🎛️ **SISTEMA CMS**

### **CMSDashboard.tsx - Panel de Control de Artistas**
```typescript
// Secciones principales:
1. General - Información básica y foto de portada
2. Biography - Biografía y descripción del artista
3. Social - Enlaces a redes sociales
4. Sets - Gestión de sets de DJ y tracks
5. Gallery - Galería de fotos de prensa
6. Videos - Gestión de videos promocionales
7. Documents - Documentos (rider, contratos, etc.)
8. Design - Personalización de colores y estilos
9. History - Historial de cambios

// Funcionalidades:
- Subida de archivos con drag & drop
- Preview en tiempo real
- Guardado automático
- Notificaciones de estado
- Exportación de contenido
```

### **Sección de Videos Detallada:**
```typescript
interface ArtistVideo {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  type: 'youtube' | 'vimeo' | 'google_drive' | 'file_upload';
  embedCode?: string;
  duration?: string;
  description?: string;
  order: number;
  isVisible: boolean;
  uploadedAt: string;
}

// Tipos soportados:
- YouTube: URL directa + thumbnail automático
- Vimeo: URL directa + thumbnail automático  
- Google Drive: URL compartida + thumbnail manual
- Archivo Local: Subida directa + thumbnail generado
```

---

## 🏢 **DASHBOARD ADMINISTRATIVO**

### **BasseDashboard.tsx - Panel de BASSSE Agency**
```typescript
// Secciones del Dashboard:

1. Overview (Resumen):
   - Estadísticas generales del sistema
   - Top artistas por vistas/descargas
   - Leads recientes
   - Métricas clave

2. Artists (Gestión de Artistas):
   - Lista completa de artistas
   - Filtros y búsqueda
   - Acciones: Ver, Editar, Pausar, Eliminar
   - Estadísticas por artista
   - Modo administrador para editar perfiles

3. Leads (Gestión de Contactos):
   - Leads de todos los artistas
   - Filtros por estado, fuente, país
   - Detalles completos de contacto
   - Exportación a CSV
   - Seguimiento de conversiones

4. Metrics (Métricas Avanzadas):
   - Gráficos de rendimiento
   - Análisis de tráfico por fuentes
   - Estadísticas por dispositivo y país
   - Horarios de mayor actividad
   - Insights y recomendaciones

5. Settings (Configuración):
   - Configuración general del sistema
   - Gestión de usuarios y permisos
   - Notificaciones y alertas
   - Seguridad y backup
   - Políticas y límites
```

---

## 🎨 **SISTEMA DE DISEÑO**

### **useDesign.ts - Hook de Personalización**
```typescript
interface DesignSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  layout: 'modern' | 'classic' | 'minimal';
}

// Colores dinámicos aplicados a:
- Botones y elementos interactivos
- Bordes y separadores
- Iconos y acentos
- Gradientes y overlays
- Estados hover y focus
```

### **Responsividad:**
```css
/* Breakpoints utilizados */
sm: 640px   /* Móviles grandes */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Pantallas grandes */

/* Grid Systems */
- Gallery: 1-2-3-4 columnas según breakpoint
- Videos: 1-2-4 columnas, máximo 4 videos
- Dashboard: Sidebar colapsable en móvil
- Cards: Stack vertical en móvil
```

---

## 📊 **SISTEMA DE DATOS**

### **types.ts - Definiciones Principales**
```typescript
// Tipos principales del sistema:

interface ArtistProfile {
  // Información básica
  id: string;
  slug: string;
  name: string;
  email: string;
  
  // Contenido del EPK
  biography: string;
  genres: string[];
  baseCity: string;
  collective?: string;
  heroImage: string;
  
  // Redes sociales
  social: SocialLinks;
  
  // Contenido multimedia
  sets: ArtistSet[];
  gallery: ArtistImage[];
  videos: ArtistVideo[];
  documents: DocumentCollection;
  
  // Configuración
  design: DesignSettings;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  email: string;
  name?: string;
  artistSlug: string;
  source: 'press_kit_download' | 'contact_form' | 'social_media' | 'referral';
  message?: string;
  ipAddress: string;
  country?: string;
  isProcessed: boolean;
  createdAt: string;
  priority?: 'high' | 'medium' | 'low';
  
  // Información adicional del evento
  eventType?: string;
  budget?: string;
  eventDate?: string;
}
```

---

## 🔐 **AUTENTICACIÓN Y SEGURIDAD**

### **Sistema de Autenticación:**
```typescript
interface UserSession {
  userId: string;
  username: string;
  email: string;
  role: 'artist' | 'admin' | 'bassse_admin';
  artistSlug?: string;
  loginTime: string;
  lastActivity: string;
}

// Niveles de acceso:
1. artist: Solo su propio perfil
2. admin: Su perfil + métricas avanzadas
3. bassse_admin: Acceso total + dashboard administrativo

// Modo Administrador:
- BASSSE Admin puede entrar en modo edición de cualquier artista
- Sesión temporal con permisos de edición
- Logs de todas las acciones administrativas
```

### **Gestión de Sesiones:**
```typescript
// LocalStorage keys utilizadas:
- 'cms-session': Datos de sesión actual
- 'cms-artist-data': Cache de datos del artista
- 'cms-save-history': Historial de cambios

// Funciones de seguridad:
- Timeout automático de sesión
- Validación de permisos en cada acción
- Logs de actividad
- Limpieza automática de datos temporales
```

---

## 🚀 **FUNCIONALIDADES CLAVE**

### **1. Subida de Archivos**
```typescript
// Tipos de archivos soportados:
- Imágenes: JPG, PNG, WebP (max 5MB)
- Audio: MP3, WAV (max 50MB)  
- Videos: MP4, MOV (max 100MB)
- Documentos: PDF, DOC, DOCX (max 10MB)

// Procesamiento:
- Compresión automática de imágenes
- Generación de thumbnails
- Validación de tipos MIME
- Upload con progress indicator
```

### **2. Preview en Tiempo Real**
```typescript
// Cambios aplicados instantáneamente:
- Colores y estilos
- Contenido de texto
- Imágenes y videos
- Layout y distribución
- Todos los elementos visuales
```

### **3. Métricas y Analytics**
```typescript
interface MetricsData {
  // Métricas básicas
  views: number;
  downloads: number;
  leads: number;
  
  // Análisis de tráfico
  sources: TrafficSource[];
  devices: DeviceStats[];
  countries: CountryStats[];
  
  // Comportamiento
  timeOnPage: number;
  bounceRate: number;
  conversionRate: number;
  
  // Temporal
  dailyStats: DailyMetrics[];
  weeklyTrends: WeeklyTrends[];
}
```

### **4. Notificaciones del Sistema**
```typescript
interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  action?: NotificationAction;
}

// Tipos de notificaciones:
- Guardado exitoso
- Errores de subida
- Cambios aplicados
- Alertas del sistema
- Confirmaciones de acciones
```

---

## 🌐 **CARACTERÍSTICAS RESPONSIVAS**

### **Mobile First Design:**
```typescript
// Adaptaciones móviles:
- Navigation: Menú hamburguesa
- Gallery: Grid de 1-2 columnas
- Videos: Stack vertical
- Dashboard: Sidebar colapsable
- Forms: Campos más grandes
- Buttons: Touch-friendly (44px mínimo)

// Optimizaciones:
- Lazy loading de imágenes
- Compresión automática
- Touch gestures
- Swipe navigation
- Responsive typography
```

### **Performance:**
```typescript
// Optimizaciones implementadas:
- Code splitting por rutas
- Lazy loading de componentes pesados
- Memoización de componentes complejos
- Debouncing en búsquedas
- Virtualización de listas largas
- Compresión de assets
- CDN para archivos estáticos
```

---

## 📋 **FLUJOS DE USUARIO**

### **Flujo de Artista Nuevo:**
1. Registro inicial con email/contraseña
2. Setup de perfil básico (nombre, foto, géneros)
3. Subida de contenido inicial (biografia, fotos)
4. Configuración de redes sociales
5. Primera publicación del EPK
6. Invitación a compartir enlace

### **Flujo de Edición de Contenido:**
1. Login en el sistema CMS
2. Navegación por secciones del dashboard
3. Edición de contenido con preview
4. Guardado automático de cambios
5. Publicación de cambios
6. Notificación de éxito

### **Flujo de Lead/Contacto:**
1. Visitante ve EPK público
2. Descarga de press kit o envío de formulario
3. Lead capturado en el sistema
4. Notificación al artista y a BASSSE
5. Seguimiento y conversión
6. Métricas actualizadas

### **Flujo de Administración BASSSE:**
1. Login como BASSSE Admin
2. Vista general del dashboard
3. Revisión de métricas y leads
4. Gestión de artistas individuales
5. Modo administrador para ediciones
6. Reportes y analytics

---

## 🔧 **CONFIGURACIÓN Y DEPLOYMENT**

### **Desarrollo Local:**
```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
# Servidor disponible en http://localhost:3000

# Build de producción
npm run build

# Preview del build
npm run preview
```

### **Variables de Entorno:**
```typescript
// Configuraciones principales:
VITE_API_URL=https://api.link.bassse.com
VITE_CDN_URL=https://cdn.link.bassse.com
VITE_UPLOAD_MAX_SIZE=10485760
VITE_ANALYTICS_ID=GA_TRACKING_ID
VITE_ENV=production
```

### **Dependencias Principales:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "typescript": "^5.2.2",
    "vite": "^6.3.5"
  }
}
```

---

## 🐛 **DEBUGGING Y LOGS**

### **Sistema de Logs:**
```typescript
// Categorías de logs:
- 'AUTH': Autenticación y sesiones
- 'CMS': Operaciones del CMS
- 'UPLOAD': Subidas de archivos
- 'METRICS': Analytics y métricas
- 'ERROR': Errores del sistema

// Niveles de severidad:
- INFO: Información general
- WARN: Advertencias
- ERROR: Errores recuperables
- FATAL: Errores críticos
```

### **Error Handling:**
```typescript
// Manejo de errores por tipo:
- Network errors: Retry automático + fallback
- Upload errors: Rollback + cleanup
- Auth errors: Redirect a login
- Permission errors: Mensaje de acceso denegado
- Validation errors: Highlight de campos + mensaje
```

---

## 🎯 **CASOS DE USO PRINCIPALES**

### **1. Artista crea su primer EPK:**
```
Usuario: DJ K-SAIS
Objetivo: Crear press kit profesional
Flujo: Registro → Upload foto → Biografía → Sets → Redes → Publicar
Resultado: EPK disponible en link.bassse/k-sais
```

### **2. Promoter busca información de artista:**
```
Usuario: Promoter de festival
Objetivo: Información completa para booking
Flujo: Visita EPK → Ve fotos/videos → Descarga press kit → Contacta
Resultado: Lead generado + Descarga de contenido
```

### **3. BASSSE gestiona múltiples artistas:**
```
Usuario: BASSSE Admin
Objetivo: Gestión centralizada de artistas
Flujo: Dashboard → Métricas → Leads → Edición de perfiles
Resultado: Control total del ecosistema
```

---

## 🚀 **CARACTERÍSTICAS DESTACADAS**

### **✨ Innovaciones Técnicas:**
- **Modo Administrador Dinámico**: BASSSE puede editar cualquier perfil temporalmente
- **Sistema de Diseño Reactivo**: Cambios de color aplicados globalmente en tiempo real
- **Upload Multiplataforma**: Soporte para YouTube, Vimeo, Google Drive y archivos locales
- **Métricas en Tiempo Real**: Analytics completos sin dependencias externas
- **Session Management Avanzado**: Control granular de permisos y timeout

### **🎨 UX/UI Destacado:**
- **Animaciones Fluidas**: Framer Motion para transiciones premium
- **Responsive Design**: Mobile-first con breakpoints optimizados
- **Dark Theme**: Tema oscuro profesional para entorno de música electrónica
- **Micro-interacciones**: Feedback visual en cada acción del usuario
- **Accessibility**: ARIA labels y navegación por teclado completa

### **📊 Business Intelligence:**
- **Lead Scoring**: Clasificación automática de leads por calidad
- **Conversion Funnel**: Tracking completo del journey del usuario
- **Artist Performance**: Métricas comparativas entre artistas
- **Growth Insights**: Recomendaciones basadas en datos
- **Export Capabilities**: Reportes en CSV y PDF

---

## 🔮 **ROADMAP FUTURO**

### **Fase 2 - Integraciones:**
- Spotify API para tracks automáticos
- SoundCloud integration
- Bandcamp sync
- Beatport connect
- Apple Music artist profiles

### **Fase 3 - Advanced Features:**
- AI-powered content suggestions
- Automated social media posting
- Calendar booking system
- Advanced analytics with ML
- Mobile app (React Native)

### **Fase 4 - Enterprise:**
- Multi-tenant architecture
- White-label solutions
- Advanced role management
- API para integraciones externas
- Enterprise reporting suite

---

## 📞 **SOPORTE Y CONTACTO**

### **Información del Proyecto:**
- **Nombre**: LINK.BASSSE Electronic Press Kit Platform
- **Versión**: 1.0.0
- **Desarrollado por**: BASSSE Agency
- **Tecnología**: React + TypeScript + Vite
- **Licencia**: Propietaria

### **URLs del Sistema:**
- **Producción**: https://link.bassse.com
- **Staging**: https://staging.link.bassse.com
- **Admin Dashboard**: https://link.bassse.com/bassse-admin
- **API Documentation**: https://api.link.bassse.com/docs

### **Contacto Técnico:**
- **Email**: tech@bassse.com
- **Soporte**: support@link.bassse.com
- **Emergencias**: +34 XXX XXX XXX

---

## 🎉 **CONCLUSIÓN**

LINK.BASSSE es una plataforma completa de Electronic Press Kit que combina:
- ✅ **Facilidad de uso** para artistas
- ✅ **Potencia administrativa** para BASSSE Agency  
- ✅ **Experiencia premium** para visitantes
- ✅ **Tecnología moderna** y escalable
- ✅ **Diseño responsive** y accesible
- ✅ **Analytics profundos** para toma de decisiones
- ✅ **Flexibilidad total** en personalización

El sistema está diseñado para crecer con las necesidades de BASSSE Agency y sus artistas, proporcionando una herramienta profesional que mejora la presencia digital y facilita el proceso de booking en la industria de la música electrónica.

---

*Documento generado automáticamente - Última actualización: $(date)*
*Para actualizaciones y soporte técnico contactar: tech@bassse.com* 