// Script para inicializar Firebase con datos de prueba
// Ejecutar con: node scripts/initFirebase.js

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

// Configuración de Firebase (usar las mismas credenciales que en la app)
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "link-bassse.firebaseapp.com",
  projectId: "link-bassse",
  storageBucket: "link-bassse.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345678"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Datos de usuarios a crear
const users = [
  {
    email: 'info@bassse.com',
    password: 'BassseAdmin2024!',
    displayName: 'AdminBasse',
    username: 'AdminBasse',
    role: 'bassse_admin'
  },
  {
    email: 'contrataciones.ksais@gmail.com',
    password: 'Ksais123',
    displayName: 'Adminksais',
    username: 'Adminksais',
    role: 'admin'
  }
];

// Datos del artista K-SAIS
const ksaisArtistData = {
  id: 'k-sais',
  slug: 'k-sais',
  name: 'K-SAIS',
  email: 'contrataciones.ksais@gmail.com',
  genres: ['Techno', 'House', 'Electronic'],
  collective: 'BASSSE Collective',
  heroImage: '',
  biography: {
    text: 'K-SAIS es un artista emergente en la escena electrónica española.',
    fullText: 'K-SAIS representa la nueva generación de productores electrónicos españoles, fusionando sonidos techno y house con influencias contemporáneas.',
    pressRelease: 'Press release de K-SAIS disponible para medios.'
  },
  socialMedia: {
    instagram: 'https://instagram.com/ksais_official',
    soundcloud: 'https://soundcloud.com/ksais',
    spotify: 'https://open.spotify.com/artist/ksais',
    youtube: 'https://youtube.com/@ksais'
  },
  sets: [],
  gallery: [],
  documents: {},
  contactEmail: 'contrataciones.ksais@gmail.com',
  languages: { primary: 'es', secondary: 'en' },
  isActive: true,
  isPublic: true,
  uid: '' // Se asignará después de crear el usuario
};

async function initializeFirebase() {
  console.log('🚀 Inicializando Firebase...');
  
  try {
    // Crear usuarios
    for (const userData of users) {
      console.log(`📝 Creando usuario: ${userData.email}`);
      
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          userData.email, 
          userData.password
        );
        
        const user = userCredential.user;
        console.log(`✅ Usuario creado: ${user.uid}`);
        
        // Crear documento de usuario en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: userData.email,
          displayName: userData.displayName,
          username: userData.username,
          role: userData.role,
          createdAt: serverTimestamp(),
          isActive: true
        });
        
        console.log(`✅ Documento de usuario creado en Firestore`);
        
        // Si es K-SAIS, crear también el documento de artista
        if (userData.username === 'Adminksais') {
          ksaisArtistData.uid = user.uid;
          
          await setDoc(doc(db, 'artists', 'k-sais'), {
            ...ksaisArtistData,
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp()
          });
          
          console.log(`✅ Documento de artista K-SAIS creado`);
        }
        
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`⚠️ El usuario ${userData.email} ya existe`);
        } else {
          console.error(`❌ Error creando usuario ${userData.email}:`, error);
        }
      }
    }
    
    console.log('🎉 Inicialización de Firebase completada');
    
  } catch (error) {
    console.error('❌ Error en la inicialización:', error);
  }
}

// Ejecutar inicialización
initializeFirebase().then(() => {
  console.log('✅ Script completado');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
}); 