# 🎧 LINK.BASSSE - Plataforma Multi-Artista

Una plataforma completa de press kits electrónicos para artistas, con sistema de gestión multi-usuario, métricas avanzadas y dashboard administrativo para BASSSE Agency.

## ✨ Características Principales

### 🏢 **Plataforma Multi-Artista**
- **Subdominios personalizados**: `link.bassse.com/nombre-artista`
- **Gestión centralizada**: Dashboard de BASSSE Agency
- **Registro de nuevos artistas**: Sistema de onboarding automático
- **Escalabilidad**: Soporte para múltiples artistas simultáneamente

### 🔐 **Sistema de Autenticación Completo**
- **Firebase Authentication**: Login/registro seguro
- **Roles de usuario**: Artist, Admin, BASSSE Admin
- **Sesiones persistentes**: Mantiene login entre sesiones
- **Credenciales K-SAIS**: `contrataciones.ksais@gmail.com` / `KSAIS123`

### 📊 **Métricas y Analytics Avanzados**
- **Tracking automático**: Visualizaciones, descargas, fuentes de tráfico
- **Geolocalización**: Análisis por países
- **Métricas por tipo**: Press kit, biografía, sets, fotos, documentos
- **Dashboard en tiempo real**: Estadísticas actualizadas

### 📧 **Sistema de Leads Completo**
- **Captura automática**: Formularios de contacto y descargas
- **Gestión centralizada**: Dashboard para procesar leads
- **Información detallada**: IP, país, fuente, mensaje
- **Estados de procesamiento**: Pendiente/Procesado con notas

### 🎨 **CMS Personalizable por Artista**
- **Editor completo**: Todas las secciones editables
- **Persistencia permanente**: Datos guardados en Firebase
- **Historial de cambios**: Registro completo de modificaciones
- **Subida de archivos**: Imágenes, documentos, sets

### 🌍 **Multilingüe y PWA**
- **4 idiomas**: Español, Inglés, Italiano, Alemán
- **Progressive Web App**: Instalable en dispositivos
- **Optimizado para redes sociales**: Open Graph, Twitter Cards
- **Responsive**: Perfecto en móviles y desktop

## 🏗️ Arquitectura del Sistema

### 📁 Estructura de URLs
```
link.bassse.com/                    # Página principal con lista de artistas
link.bassse.com/k-sais             # Press kit de K-SAIS
link.bassse.com/otro-artista       # Press kit de otro artista
link.bassse.com/bassse-dashboard   # Dashboard administrativo de BASSSE
```

### 🗄️ Base de Datos (Firebase Firestore)
- **users**: Información de usuarios y autenticación
- **artists**: Perfiles completos de artistas
- **metrics**: Métricas y analytics por artista
- **leads**: Contactos y leads recopilados
- **config**: Configuración global de BASSSE

### 🔧 Servicios Implementados
- **AuthService**: Gestión de autenticación y usuarios
- **MetricsService**: Tracking y analytics
- **CMSContext**: Estado global del CMS
- **Router**: Sistema de rutas multi-artista

## 🚀 Instalación y Configuración

### 1. Prerrequisitos
```bash
Node.js 18+
npm o yarn
Cuenta de Firebase
```

### 2. Instalación
```bash
# Clonar repositorio
git clone [URL_DEL_REPO]
cd link.bassse

# Instalar dependencias
npm install

# Configurar Firebase (ver firebase-setup.md)
cp .env.example .env
# Editar .env con tus credenciales de Firebase
```

### 3. Configuración de Firebase
Ver archivo `firebase-setup.md` para instrucciones detalladas de:
- Creación del proyecto Firebase
- Configuración de Authentication
- Configuración de Firestore
- Reglas de seguridad
- Variables de entorno

### 4. Desarrollo
```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🎯 Funcionalidades por Rol

### 👤 **Artista**
- ✅ Editar su perfil completo en el CMS
- ✅ Ver métricas de su press kit
- ✅ Gestionar contenido multimedia
- ✅ Descargar leads de contacto
- ✅ Personalizar información de booking

### 🛡️ **BASSSE Admin**
- ✅ Dashboard completo con métricas globales
- ✅ Gestión de todos los artistas
- ✅ Procesamiento de leads
- ✅ Configuración de la plataforma
- ✅ Analytics avanzados

### 👁️ **Visitante Público**
- ✅ Ver press kits de artistas públicos
- ✅ Descargar contenido multimedia
- ✅ Contactar artistas via formularios
- ✅ Compartir en redes sociales

## 📊 Dashboard de BASSSE Agency

### 📈 Métricas Principales
- **Total de artistas** registrados
- **Visualizaciones** globales
- **Descargas** de contenido
- **Leads** generados

### 🎵 Gestión de Artistas
- Lista de todos los artistas
- Estados: Activo/Inactivo, Público/Privado
- Métricas individuales
- Acceso directo a perfiles

### 📧 Gestión de Leads
- Lista de contactos por artista
- Filtros por estado y fuente
- Procesamiento y notas
- Exportación de datos

### ⚙️ Configuración
- Configuración de dominio
- Límites de artistas
- Configuración de notificaciones
- Gestión de usuarios

## 🔒 Seguridad y Privacidad

### 🛡️ Autenticación
- Firebase Authentication con email/password
- Sesiones seguras con tokens JWT
- Roles y permisos granulares
- Protección contra ataques comunes

### 🔐 Datos
- Reglas de Firestore restrictivas
- Datos de artistas privados por defecto
- Encriptación en tránsito y reposo
- Backup automático

### 📊 Analytics
- Datos anonimizados para métricas
- Cumplimiento con GDPR
- Opt-out disponible
- Retención limitada de datos

## 🌐 Despliegue

### Firebase Hosting
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login y configurar
firebase login
firebase init hosting

# Build y deploy
npm run build
firebase deploy
```

### Dominio Personalizado
1. Configurar `link.bassse.com` en Firebase Console
2. Actualizar DNS del dominio
3. Verificar certificado SSL
4. Configurar redirects si es necesario

## 📱 Optimización para Redes Sociales

### 🔗 Link in Bio
- URL corta y memorable
- Carga rápida en móviles
- Optimizado para Instagram Stories
- Previsualización perfecta

### 📲 Metadatos
- Open Graph para Facebook/Instagram
- Twitter Cards para Twitter
- Structured Data para SEO
- Imágenes optimizadas (1200x630px)

## 🎵 Artistas Actuales

### K-SAIS
- **URL**: `link.bassse.com/k-sais`
- **Géneros**: Techno, Hard Groove, Underground
- **Base**: León, España
- **Colectivo**: La Mata Fest
- **Estado**: ✅ Activo y Público

### Próximamente
- Sistema de invitaciones para nuevos artistas
- Integración con Spotify/SoundCloud APIs
- Reproductor de música integrado
- Galería de fotos mejorada

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** + TypeScript
- **Vite** para bundling
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **React Router** para navegación
- **React i18next** para multilingüe

### Backend/Servicios
- **Firebase Authentication** para usuarios
- **Firestore** para base de datos
- **Firebase Storage** para archivos
- **Firebase Hosting** para despliegue
- **Firebase Analytics** para métricas

### Herramientas
- **TypeScript** para tipado
- **ESLint** para linting
- **Prettier** para formateo
- **Vite PWA Plugin** para PWA

## 📞 Soporte y Contacto

### Para Artistas
- **Email**: support@bassse.com
- **Documentación**: Ver archivos de ayuda en el CMS
- **Soporte técnico**: Disponible 24/7

### Para BASSSE Agency
- **Dashboard**: `link.bassse.com/bassse-dashboard`
- **Admin Email**: info@bassse.com
- **Documentación técnica**: Ver `firebase-setup.md`

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado para BASSSE Agency** - LINK.BASSSE: Plataforma completa de press kits electrónicos con gestión multi-artista, métricas avanzadas y dashboard administrativo.

## 🚀 Próximas Funcionalidades

### 🎯 Roadmap Q1 2024
- [ ] Integración con APIs de Spotify/SoundCloud
- [ ] Reproductor de música embebido
- [ ] Sistema de notificaciones push
- [ ] Exportación avanzada de métricas
- [ ] Plantillas personalizables de press kit
- [ ] Sistema de comentarios y feedback
- [ ] Integración con calendarios de eventos
- [ ] Marketplace de servicios para artistas

### 🔮 Futuro
- [ ] IA para optimización de contenido
- [ ] Análisis predictivo de tendencias
- [ ] Integración con plataformas de streaming
- [ ] Sistema de colaboraciones entre artistas
- [ ] Monetización y sistema de pagos
- [ ] App móvil nativa
- [ ] Integración con redes sociales avanzada
- [ ] Sistema de recomendaciones

---

**¡Lleva la promoción musical al siguiente nivel con LINK.BASSSE! 🎵✨**
