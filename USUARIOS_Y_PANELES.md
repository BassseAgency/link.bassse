# 👥 USUARIOS Y PANELES - LINK.BASSSE

## 🎯 USUARIOS CONFIGURADOS

### 1. 👑 **Adminlinkbassse** (Administrador General)
- **Usuario**: `link-bassse`
- **Contraseña**: `Link2025.`
- **Rol**: `bassse_admin`
- **Panel**: **BASSSE Dashboard** (Panel de administración general)

#### 🔧 Funcionalidades del BASSSE Dashboard:
- **📊 Resumen General**:
  - Total de artistas en la plataforma
  - Visualizaciones globales
  - Descargas totales
  - Leads generados

- **🎵 Gestión de Artistas**:
  - Ver todos los artistas registrados
  - Estadísticas por artista
  - Gestión de perfiles
  - Activar/desactivar artistas

- **📧 Gestión de Leads**:
  - Ver todos los leads de contratación
  - Marcar como procesados
  - Filtrar por artista
  - Exportar datos

- **📈 Métricas Avanzadas**:
  - Gráficos de rendimiento
  - Análisis de tráfico
  - Comparativas entre artistas
  - Reportes mensuales

- **⚙️ Configuración Global**:
  - Configuración de la plataforma
  - Gestión de usuarios
  - Configuración de métricas
  - Backup y mantenimiento

### 2. 🎨 **Pepe** (Usuario Normal/Artista)
- **Usuario**: `Pepe`
- **Contraseña**: `Pepe123`
- **Rol**: `artist`
- **Panel**: **CMS Dashboard** (Panel de artista)

#### 🎵 Funcionalidades del CMS Dashboard:
- **👤 Información General**:
  - Datos personales del artista
  - Imagen de perfil
  - Información de contacto
  - Configuración básica

- **📝 Biografía**:
  - Editor de texto enriquecido
  - Biografía en múltiples idiomas
  - Generación de PDF automática
  - Historial de cambios

- **🌐 Redes Sociales**:
  - Enlaces a plataformas
  - Instagram, SoundCloud, Spotify, etc.
  - Verificación de enlaces
  - Métricas de clicks

- **🎵 Sets & Media**:
  - Subida de sets de audio
  - Información de tracks
  - Enlaces a plataformas
  - Organización por fecha

- **📸 Galería**:
  - Subida de fotos de prensa
  - Organización por categorías
  - Descripciones y metadatos
  - Descarga individual/masiva

- **📄 Documentos**:
  - Rider técnico
  - Contratos y documentos legales
  - Press kit completo
  - Archivos descargables

- **📋 Historial**:
  - Registro de cambios
  - Versiones anteriores
  - Actividad del usuario
  - Backup automático

### 3. 🎧 **Adminksais** (Administrador de Artista)
- **Usuario**: `Adminksais`
- **Contraseña**: `Ksais123`
- **Rol**: `admin`
- **Panel**: **CMS Dashboard** (Panel de artista con permisos extendidos)

## 🚀 CÓMO PROBAR LOS PANELES

### 1. **Panel de Administrador General (BASSSE Dashboard)**:
```
1. Ve a: http://localhost:3005
2. Haz clic en "Acceso CMS"
3. Login:
   - Usuario: link-bassse
   - Contraseña: Link2025.
4. Verás el BASSSE Dashboard con:
   - Estadísticas globales
   - Gestión de artistas
   - Leads y métricas
```

### 2. **Panel de Usuario Normal (CMS Dashboard)**:
```
1. Ve a: http://localhost:3005
2. Haz clic en "Acceso CMS"
3. Login:
   - Usuario: Pepe
   - Contraseña: Pepe123
4. Verás el CMS Dashboard con:
   - Edición de perfil personal
   - Gestión de contenido
   - Subida de archivos
```

## 🔄 DIFERENCIAS ENTRE PANELES

### 📊 **BASSSE Dashboard** (Administrador General):
- **Vista Global**: Ve todos los artistas y métricas
- **Gestión Completa**: Puede editar cualquier perfil
- **Analytics Avanzados**: Métricas comparativas y globales
- **Administración**: Configuración de la plataforma
- **Leads**: Gestión de todas las contrataciones

### 🎨 **CMS Dashboard** (Usuario Normal):
- **Vista Personal**: Solo ve su propio perfil
- **Edición Limitada**: Solo puede editar su contenido
- **Analytics Básicos**: Métricas de su propio perfil
- **Contenido**: Gestión de su press kit personal
- **Historial**: Solo sus propios cambios

## 🎯 CASOS DE USO

### **Administrador General (Adminlinkbassse)**:
- Monitorear el rendimiento de todos los artistas
- Gestionar leads de contratación
- Generar reportes para la agencia
- Configurar nuevos artistas
- Analizar tendencias y métricas

### **Usuario Normal (Pepe)**:
- Actualizar su biografía y fotos
- Subir nuevos sets y música
- Gestionar su información de contacto
- Descargar su press kit completo
- Ver las estadísticas de su perfil

## 🔐 SEGURIDAD Y PERMISOS

- **bassse_admin**: Acceso total a la plataforma
- **admin**: Gestión de artista específico
- **artist**: Solo edición de perfil propio
- **Autenticación**: JWT con expiración
- **Sesiones**: Persistentes en localStorage
- **Roles**: Verificados en cada acción

## 🌐 URLS DE ACCESO

- **Página Principal**: `http://localhost:3005`
- **Login CMS**: Botón "Acceso CMS" en la página principal
- **Dashboard**: Se determina automáticamente según el rol del usuario

**¡Ambos paneles están completamente funcionales y listos para usar!** 🎉 