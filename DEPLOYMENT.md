# 🚀 Guía de Despliegue - DJ Promo App

## 📋 Preparación para Despliegue

### 1. Verificación Pre-Despliegue
```bash
# Verificar que todas las dependencias estén instaladas
npm install

# Ejecutar verificación de tipos
npm run type-check

# Probar build local
npm run build
npm run preview
```

### 2. Configuración de Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:
```env
# Información del artista
VITE_ARTIST_NAME=K-SAIS
VITE_CONTACT_EMAIL=contrataciones.ksais@gmail.com

# URLs y dominios
VITE_BASE_URL=https://tu-dominio.com

# Analytics (opcional)
VITE_GA_ID=G-XXXXXXXXXX
VITE_HOTJAR_ID=XXXXXXX

# Redes sociales
VITE_INSTAGRAM_URL=https://www.instagram.com/k_sais/
VITE_SOUNDCLOUD_URL=https://soundcloud.com/k-sais
```

## 🌐 Opciones de Despliegue

### Opción 1: Netlify (Recomendado) ⭐

#### Despliegue Manual
1. **Build del proyecto**
   ```bash
   npm run build
   ```

2. **Subir a Netlify**
   - Ir a [netlify.com](https://netlify.com)
   - Arrastrar carpeta `dist/` al área de deploy
   - Configurar dominio personalizado

#### Despliegue Automático (Git)
1. **Conectar repositorio**
   - Conectar cuenta de GitHub/GitLab
   - Seleccionar repositorio del proyecto

2. **Configurar build**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Variables de entorno**
   - Añadir variables en Netlify Dashboard
   - Site Settings > Environment Variables

#### Configuración Netlify
Crear archivo `netlify.toml`:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Opción 2: Vercel

#### Despliegue con CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Configuración Vercel
Crear archivo `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Opción 3: GitHub Pages

#### Configuración GitHub Actions
Crear `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔧 Configuración Post-Despliegue

### 1. Dominio Personalizado
- **Netlify**: Site Settings > Domain Management
- **Vercel**: Project Settings > Domains
- **GitHub Pages**: Repository Settings > Pages

### 2. SSL/HTTPS
- Automático en Netlify y Vercel
- Configurar Let's Encrypt si es necesario

### 3. Analytics
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID');

// Hotjar (opcional)
(function(h,o,t,j,a,r){
    // Código de Hotjar
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
```

### 4. Monitoreo
- **Uptime**: UptimeRobot, Pingdom
- **Performance**: Google PageSpeed Insights
- **Errors**: Sentry (opcional)

## 📱 Optimización para Redes Sociales

### Instagram Link in Bio
1. **URL corta**: Usar bit.ly o similar
2. **Verificar previsualización**: 
   - Compartir enlace en Instagram Stories
   - Verificar que se muestre correctamente

### Facebook Debugger
1. Ir a [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Introducir URL del sitio
3. Verificar metadatos Open Graph
4. Hacer "Scrape Again" si es necesario

### Twitter Card Validator
1. Ir a [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Introducir URL
3. Verificar previsualización

## 🔍 SEO y Performance

### Verificación SEO
```bash
# Lighthouse CI (opcional)
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage
```

### Sitemap
Crear `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tu-dominio.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Robots.txt
Crear `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://tu-dominio.com/sitemap.xml
```

## 🚨 Troubleshooting

### Problemas Comunes

#### 1. Build Falla
```bash
# Limpiar cache
rm -rf node_modules package-lock.json
npm install

# Verificar versión Node.js
node --version  # Debe ser 18+
```

#### 2. Rutas No Funcionan
- Verificar configuración de redirects
- Asegurar SPA routing está configurado

#### 3. Imágenes No Cargan
- Verificar rutas de imágenes
- Comprobar CORS si son externas

#### 4. PWA No Instala
- Verificar manifest.json
- Comprobar service worker
- Usar HTTPS

### Logs y Debugging
```bash
# Ver logs de build
npm run build -- --debug

# Analizar bundle
npm run build -- --analyze
```

## 📊 Métricas de Éxito

### KPIs a Monitorear
- **Tiempo de carga**: < 3 segundos
- **Core Web Vitals**: Todos en verde
- **PWA Score**: > 90
- **SEO Score**: > 95
- **Accessibility**: > 95

### Herramientas de Medición
- Google Analytics
- Google Search Console
- PageSpeed Insights
- GTmetrix

---

## 🎯 Checklist Final

- [ ] Build exitoso sin errores
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado configurado
- [ ] SSL/HTTPS activo
- [ ] Metadatos Open Graph verificados
- [ ] PWA instalable
- [ ] Performance optimizada
- [ ] Analytics configurado
- [ ] Sitemap y robots.txt creados
- [ ] Monitoreo configurado

**¡Tu DJ Promo App está lista para conquistar las redes sociales! 🎵🚀** 