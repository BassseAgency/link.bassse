import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, ArtistProfile } from '../../types';

export class AuthService {
  
  // Login de usuario existente
  static async login(email: string, password: string): Promise<{ user: User; artistProfile?: ArtistProfile }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Obtener datos del usuario desde Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (!userDoc.exists()) {
        throw new Error('Usuario no encontrado en la base de datos');
      }
      
      const userData = userDoc.data() as User;
      
      // Actualizar último login
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        lastLogin: new Date().toISOString()
      });
      
      // Si es artista, obtener su perfil
      let artistProfile: ArtistProfile | undefined;
      if (userData.role === 'artist' && userData.artistSlug) {
        const artistDoc = await getDoc(doc(db, 'artists', userData.artistSlug));
        if (artistDoc.exists()) {
          artistProfile = artistDoc.data() as ArtistProfile;
        }
      }
      
      return { user: userData, artistProfile };
      
    } catch (error: any) {
      console.error('Error en login:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }
  
  // Registro de nuevo artista
  static async registerArtist(
    email: string, 
    password: string, 
    artistName: string,
    artistSlug: string
  ): Promise<{ user: User; artistProfile: ArtistProfile }> {
    try {
      // Verificar que el slug no esté en uso
      const slugDoc = await getDoc(doc(db, 'artists', artistSlug));
      if (slugDoc.exists()) {
        throw new Error('Este nombre de artista ya está en uso');
      }
      
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Actualizar perfil de Firebase
      await updateProfile(firebaseUser, {
        displayName: artistName
      });
      
      // Crear documento de usuario
      const userData: User = {
        uid: firebaseUser.uid,
        email: email,
        displayName: artistName,
        role: 'artist',
        artistSlug: artistSlug,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      // Crear perfil de artista
      const artistProfile: ArtistProfile = {
        id: artistSlug,
        uid: firebaseUser.uid,
        slug: artistSlug,
        name: artistName,
        email: email,
        genres: [],
        heroImage: '/images/default-hero.jpg',
        biography: {
          text: `${artistName} - Artista electrónico`,
          fullText: '',
          pressRelease: ''
        },
        socialMedia: {},
        sets: [],
        gallery: [],
        documents: {},
        contactEmail: email,
        languages: {
          primary: 'es',
          secondary: 'en'
        },
        isActive: true,
        isPublic: false, // Inicialmente privado hasta que complete su perfil
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'artists', artistSlug), artistProfile);
      
      // Registrar métricas iniciales
      await this.initializeArtistMetrics(artistSlug);
      
      return { user: userData, artistProfile };
      
    } catch (error: any) {
      console.error('Error en registro:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }
  
  // Logout
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }
  
  // Obtener usuario actual
  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }
  
  // Escuchar cambios de autenticación
  static onAuthStateChange(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
  
  // Verificar si un slug está disponible
  static async isSlugAvailable(slug: string): Promise<boolean> {
    try {
      const artistDoc = await getDoc(doc(db, 'artists', slug));
      return !artistDoc.exists();
    } catch (error) {
      console.error('Error verificando slug:', error);
      return false;
    }
  }
  
  // Inicializar métricas de artista
  private static async initializeArtistMetrics(artistSlug: string): Promise<void> {
    const metricsData = {
      artistId: artistSlug,
      totalViews: 0,
      totalDownloads: 0,
      uniqueVisitors: 0,
      dailyViews: {},
      monthlyViews: {},
      downloadsByType: {
        pressKit: 0,
        biography: 0,
        sets: 0,
        photos: 0,
        documents: 0
      },
      trafficSources: {
        direct: 0,
        social: 0,
        whatsapp: 0,
        email: 0,
        other: 0
      },
      countries: {},
      lastUpdated: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'metrics', artistSlug), metricsData);
  }
  
  // Obtener mensaje de error legible
  private static getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intenta más tarde';
      default:
        return 'Error de autenticación';
    }
  }
  
  // Validar credenciales específicas de K-SAIS
  static async validateKSaisCredentials(email: string, password: string): Promise<boolean> {
    return email === 'contrataciones.ksais@gmail.com' && password === 'KSAIS123';
  }
  
  // Crear usuario K-SAIS si no existe
  static async ensureKSaisUser(): Promise<void> {
    try {
      const ksaisDoc = await getDoc(doc(db, 'artists', 'k-sais'));
      
      if (!ksaisDoc.exists()) {
        // Crear usuario K-SAIS con datos existentes
        const ksaisProfile: ArtistProfile = {
          id: 'k-sais',
          uid: 'k-sais-uid', // UID especial para K-SAIS
          slug: 'k-sais',
          name: 'K-SAIS',
          email: 'contrataciones.ksais@gmail.com',
          genres: ['Techno', 'Hard Groove', 'Underground'],
          collective: 'La Mata Fest',
          labels: ['Independent', 'Underground Records'],
          baseCity: 'León, España',
          yearsActive: '2020 - Presente',
          influences: 'Industrial Techno, Minimal, Hard Groove',
          heroImage: '/images/ksais-hero.jpg',
          biography: {
            text: 'K-SAIS, originario de León, se ha consolidado como una de las promesas más destacadas del techno en España...',
            fullText: 'K-SAIS, originario de León, se ha consolidado como una de las promesas más destacadas del techno en España. Su sonido característico fusiona elementos del hard groove con toques underground, creando sets que han cautivado a audiencias en toda la península ibérica.',
            pressRelease: ''
          },
          socialMedia: {
            instagram: 'https://www.instagram.com/k_sais/',
            soundcloud: 'https://soundcloud.com/k-sais',
            spotify: 'https://open.spotify.com/artist/k-sais'
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
              caption: 'K-SAIS en vivo',
              order: 1,
              isVisible: true,
              uploadedAt: new Date().toISOString()
            }
          ],
          documents: {
            technicalRider: {
              id: 'rider-1',
              name: 'K-SAIS Technical Rider',
              url: '/documents/ksais-technical-rider.pdf',
              type: 'application/pdf',
              size: 1024000,
              uploadDate: new Date().toISOString()
            }
          },
          contactEmail: 'contrataciones.ksais@gmail.com',
          languages: {
            primary: 'es',
            secondary: 'en'
          },
          isActive: true,
          isPublic: true,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        
        await setDoc(doc(db, 'artists', 'k-sais'), ksaisProfile);
        await this.initializeArtistMetrics('k-sais');
        
        console.log('✅ Usuario K-SAIS creado exitosamente');
      }
    } catch (error) {
      console.error('Error creando usuario K-SAIS:', error);
    }
  }
} 