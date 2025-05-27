import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';
import { CMSUser, CMSArtistData } from '../../types';

export class FirebaseService {
  // Autenticación
  static async login(email: string, password: string): Promise<{ user: CMSUser; token: string } | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        throw new Error('Usuario no encontrado en la base de datos');
      }
      
      const userData = userDoc.data();
      const token = await user.getIdToken();
      
      const cmsUser: CMSUser = {
        uid: user.uid,
        email: user.email || '',
        displayName: userData.displayName || user.displayName || '',
        role: userData.role || 'artist',
        createdAt: userData.createdAt || new Date().toISOString(),
        isActive: userData.isActive !== false
      };
      
      // Actualizar último login
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp()
      });
      
      return { user: cmsUser, token };
    } catch (error) {
      console.error('Error en login:', error);
      return null;
    }
  }

  // Registro de usuario
  static async register(email: string, password: string, displayName: string, role: 'artist' | 'admin' | 'bassse_admin' = 'artist'): Promise<{ user: CMSUser; token: string } | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Crear documento de usuario en Firestore
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName,
        role,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isActive: true
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      const token = await user.getIdToken();
      
      const cmsUser: CMSUser = {
        uid: user.uid,
        email: user.email || '',
        displayName,
        role,
        createdAt: new Date().toISOString(),
        isActive: true
      };
      
      return { user: cmsUser, token };
    } catch (error) {
      console.error('Error en registro:', error);
      return null;
    }
  }

  // Cerrar sesión
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }

  // Obtener datos del artista
  static async getArtistData(artistSlug: string): Promise<CMSArtistData | null> {
    try {
      const artistDoc = await getDoc(doc(db, 'artists', artistSlug));
      
      if (!artistDoc.exists()) {
        return null;
      }
      
      return artistDoc.data() as CMSArtistData;
    } catch (error) {
      console.error('Error obteniendo datos del artista:', error);
      return null;
    }
  }

  // Actualizar datos del artista
  static async updateArtistData(artistSlug: string, data: Partial<CMSArtistData>): Promise<boolean> {
    try {
      const artistRef = doc(db, 'artists', artistSlug);
      
      await updateDoc(artistRef, {
        ...data,
        lastUpdated: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error actualizando datos del artista:', error);
      return false;
    }
  }

  // Crear nuevo artista
  static async createArtist(artistData: CMSArtistData): Promise<boolean> {
    try {
      await setDoc(doc(db, 'artists', artistData.slug), {
        ...artistData,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error creando artista:', error);
      return false;
    }
  }

  // Subir archivo
  static async uploadFile(file: File, path: string): Promise<string | null> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error subiendo archivo:', error);
      return null;
    }
  }

  // Obtener usuario actual
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Verificar si el usuario está autenticado
  static isAuthenticated(): boolean {
    return auth.currentUser !== null;
  }

  // Obtener token del usuario actual
  static async getCurrentUserToken(): Promise<string | null> {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  }

  // Buscar usuario por username (para compatibilidad con el sistema actual)
  static async loginWithUsername(username: string, password: string): Promise<{ user: CMSUser; token: string } | null> {
    try {
      // Buscar usuario por username en Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      // Intentar login con email
      return await this.login(userData.email, password);
    } catch (error) {
      console.error('Error en login con username:', error);
      return null;
    }
  }
} 