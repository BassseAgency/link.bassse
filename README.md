# 🎵 LINK.BASSSE

**Plataforma de gestión de perfiles para artistas del colectivo BASSSE**

LINK.BASSSE es una aplicación web moderna que permite a los artistas del colectivo BASSSE gestionar sus perfiles de manera profesional, con un sistema de administración global y colores dinámicos personalizados.

## ✨ Características Principales

### 🎨 **Diseño Dinámico**
- Colores personalizados por artista
- Interfaz responsive y moderna
- Animaciones suaves y transiciones

### 🔐 **Sistema de Autenticación**
- Login seguro para artistas y administradores
- Gestión de sesiones
- Roles diferenciados (Artista/Admin Global)

### 🎛️ **Dashboards Especializados**
- **Dashboard de Artista**: Gestión personal del perfil
- **Dashboard de Administrador**: Control global de todos los artistas
- **Modo Administrador**: Edición de cualquier perfil desde el admin

### 📱 **Bloques de Contenido Modulares**
- **Hero**: Imagen principal y información básica
- **Biografía**: Con funcionalidad "Ver más/Ver menos"
- **Sets**: Gestión de sets musicales
- **Booking**: Información de contratación
- **Redes Sociales**: Enlaces a plataformas
- **Fotos de Prensa**: Galería descargable

## 🚀 Tecnologías

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules + Variables CSS
- **Icons**: Lucide React
- **Estado**: Context API

## 🎭 Artistas Implementados

### K-SAIS
- **Géneros**: Electronic, House, Techno
- **Ciudad**: Madrid
- **Colores**: Verde neón (#00ff88) y Rosa (#ff0088)
- **Email**: contrataciones.ksais@gmail.com

### Luna Bass
- **Géneros**: Bass, Dubstep, Future Bass
- **Ciudad**: Barcelona
- **Colores**: Púrpura (#8a2be2) y Rosa (#ff69b4)
- **Email**: booking@lunabass.com

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/link.bassse.git

# Navegar al directorio
cd link.bassse

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting del código
```

## 🔧 Modo Administrador

El sistema incluye un **modo administrador** especial que permite:

1. **Acceso Global**: El admin puede editar cualquier perfil de artista
2. **Indicador Visual**: Barra roja que muestra "🔧 MODO ADMINISTRADOR"
3. **Navegación Fluida**: Transición entre dashboards sin perder datos
4. **Salida Segura**: Botón para volver al dashboard principal

### Flujo de Uso
1. Admin accede al `BasseDashboard`
2. Selecciona "Editar" en cualquier artista
3. Sistema entra en modo administrador
4. Se cargan los datos del artista seleccionado
5. Admin puede editar todos los campos
6. Botón "Salir Modo Admin" para volver

## 📁 Estructura del Proyecto

```
link.bassse/
├── components/
│   ├── blocks/           # Bloques de contenido modulares
│   ├── AuthModal.tsx     # Modal de autenticación
│   ├── BasseDashboard.tsx # Dashboard del administrador
│   ├── CMSDashboard.tsx  # Dashboard del artista
│   └── ...
├── src/
│   ├── context/
│   │   └── CMSContext.tsx # Contexto global del CMS
│   └── components/
├── types.ts              # Definiciones de tipos
└── App.tsx              # Componente principal
```

## 🎯 Funcionalidades del CMS

### Para Artistas
- ✅ Editar información personal
- ✅ Gestionar biografía
- ✅ Subir fotos de prensa
- ✅ Configurar redes sociales
- ✅ Gestionar sets musicales
- ✅ Personalizar colores del perfil

### Para Administradores
- ✅ Ver todos los artistas del colectivo
- ✅ Editar cualquier perfil (modo administrador)
- ✅ Gestión global de contenido
- ✅ Supervisión de cambios

## 🌐 Deploy

El proyecto está configurado para deploy fácil en:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**

```bash
# Build para producción
npm run build

# El directorio 'dist' contiene los archivos estáticos
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎵 Sobre BASSSE

BASSSE es un colectivo de música electrónica que reúne a artistas de diferentes géneros y estilos, promoviendo la diversidad musical y la innovación en la escena electrónica.

---

**Desarrollado con ❤️ para el colectivo BASSSE**
