# Configuración de Firebase para LINK.BASSSE

## 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "link-bassse"
3. Habilita Google Analytics (opcional)

## 2. Configurar Servicios

### Authentication
1. Ve a Authentication > Sign-in method
2. Habilita "Email/Password"
3. Configura dominios autorizados (añadir tu dominio de producción)

### Firestore Database
1. Ve a Firestore Database
2. Crear base de datos en modo "production"
3. Configurar reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Artistas públicos pueden ser leídos por todos, escritos solo por el propietario
    match /artists/{artistId} {
      allow read: if resource.data.isPublic == true;
      allow write: if request.auth != null && request.auth.uid == resource.data.uid;
    }
    
    // Métricas solo pueden ser escritas por el sistema
    match /metrics/{artistId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Leads pueden ser leídos por admins y el artista propietario
    match /leads/{leadId} {
      allow read: if request.auth != null;
      allow create: if true; // Permitir crear leads desde formularios públicos
    }
    
    // Solo admins de BASSSE pueden acceder a configuración
    match /config/{configId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'bassse_admin';
    }
  }
}
```

### Storage
1. Ve a Storage
2. Crear bucket de almacenamiento
3. Configurar reglas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Imágenes de artistas
    match /artists/{artistId}/{allPaths=**} {
      allow read: if true; // Públicas
      allow write: if request.auth != null && 
        request.auth.uid == resource.metadata.uploadedBy;
    }
    
    // Documentos privados
    match /documents/{artistId}/{allPaths=**} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.metadata.uploadedBy;
    }
  }
}
```

## 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=link-bassse.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=link-bassse
VITE_FIREBASE_STORAGE_BUCKET=link-bassse.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 4. Actualizar Configuración de Firebase

Actualiza `src/config/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
```

## 5. Estructura de Datos en Firestore

### Colección: `users`
```javascript
{
  uid: "firebase_user_id",
  email: "artista@email.com",
  displayName: "Nombre Artista",
  role: "artist", // "artist" | "admin" | "bassse_admin"
  artistSlug: "nombre-artista",
  createdAt: "2024-01-01T00:00:00.000Z",
  lastLogin: "2024-01-01T00:00:00.000Z",
  isActive: true
}
```

### Colección: `artists`
```javascript
{
  id: "nombre-artista",
  uid: "firebase_user_id",
  slug: "nombre-artista",
  name: "Nombre Artista",
  email: "artista@email.com",
  genres: ["Techno", "House"],
  collective: "Colectivo Musical",
  heroImage: "url_imagen",
  biography: {
    text: "Biografía corta",
    fullText: "Biografía completa",
    pressRelease: "Press release"
  },
  socialMedia: {
    instagram: "url",
    soundcloud: "url"
  },
  sets: [],
  gallery: [],
  documents: {},
  contactEmail: "contacto@email.com",
  languages: { primary: "es", secondary: "en" },
  isActive: true,
  isPublic: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  lastUpdated: "2024-01-01T00:00:00.000Z"
}
```

### Colección: `metrics`
```javascript
{
  artistId: "nombre-artista",
  totalViews: 1500,
  totalDownloads: 250,
  uniqueVisitors: 800,
  dailyViews: { "2024-01-01": 50 },
  monthlyViews: { "2024-01": 1500 },
  downloadsByType: {
    pressKit: 100,
    biography: 50,
    sets: 75,
    photos: 25,
    documents: 0
  },
  trafficSources: {
    direct: 500,
    social: 800,
    whatsapp: 150,
    email: 50,
    other: 0
  },
  countries: { "ES": 800, "FR": 300, "DE": 200 },
  lastUpdated: "2024-01-01T00:00:00.000Z"
}
```

### Colección: `leads`
```javascript
{
  id: "lead_id",
  artistId: "nombre-artista",
  artistSlug: "nombre-artista",
  name: "Nombre Contacto",
  email: "contacto@email.com",
  phone: "+34123456789",
  company: "Empresa",
  message: "Mensaje del contacto",
  source: "contact_form", // "contact_form" | "download" | "booking_inquiry" | "newsletter"
  page: "/nombre-artista",
  userAgent: "Mozilla/5.0...",
  ipAddress: "192.168.1.1",
  country: "ES",
  createdAt: "2024-01-01T00:00:00.000Z",
  isProcessed: false,
  notes: ""
}
```

## 6. Despliegue

### Hosting en Firebase
1. Instalar Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Inicializar: `firebase init hosting`
4. Configurar `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

5. Build y deploy:
```bash
npm run build
firebase deploy
```

## 7. Configuración de Dominio Personalizado

1. Ve a Hosting en Firebase Console
2. Añadir dominio personalizado: `link.bassse.com`
3. Seguir instrucciones para configurar DNS
4. Esperar verificación SSL

## 8. Monitoreo y Analytics

1. Configurar Google Analytics en Firebase
2. Habilitar Performance Monitoring
3. Configurar alertas para errores
4. Revisar métricas regularmente

## 9. Backup y Seguridad

1. Configurar backups automáticos de Firestore
2. Revisar logs de seguridad regularmente
3. Mantener reglas de seguridad actualizadas
4. Monitorear uso y costos

## 10. Usuarios Iniciales

### K-SAIS (Usuario existente)
- Email: `contrataciones.ksais@gmail.com`
- Password: `KSAIS123`
- Slug: `k-sais`
- Role: `artist`

### Admin BASSSE
- Email: `info@bassse.com`
- Password: `BassseAdmin2024!`
- Role: `bassse_admin`

---

**Nota**: Recuerda mantener las credenciales seguras y nunca commitear archivos `.env` al repositorio. 