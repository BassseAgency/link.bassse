export const APP_CONFIG = {
  // Información básica de la app
  name: 'DJ Promo App',
  version: '1.0.0',
  description: 'Professional DJ Electronic Press Kit',
  
  // URLs y dominios
  baseUrl: 'https://k-sais-epk.netlify.app',
  
  // Colores del tema
  colors: {
    primary: '#f69f16',
    background: '#000000',
    text: '#ffffff',
    textSecondary: '#a3a3a3',
    accent: '#e6950f'
  },
  
  // Configuración de idiomas
  languages: {
    default: 'es',
    supported: ['es', 'en', 'it', 'de']
  },
  
  // Configuración de redes sociales
  social: {
    platforms: ['instagram', 'soundcloud', 'beatport', 'facebook', 'twitter', 'youtube']
  },
  
  // Configuración de SEO
  seo: {
    defaultImage: 'https://picsum.photos/seed/ksais-hero/1200/630',
    imageSize: {
      width: 1200,
      height: 630
    }
  },
  
  // Configuración de PWA
  pwa: {
    name: 'DJ Promo App - Electronic Press Kit',
    shortName: 'DJ Promo',
    themeColor: '#f69f16',
    backgroundColor: '#000000'
  }
};

export const ANIMATION_CONFIG = {
  // Duraciones de animación
  durations: {
    fast: 0.2,
    normal: 0.5,
    slow: 0.7
  },
  
  // Delays escalonados
  staggerDelay: 0.1,
  
  // Easing functions
  easing: {
    default: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55]
  }
}; 