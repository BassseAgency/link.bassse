import { supabase } from '../config/supabase';
import { CMSUser, CMSArtistData } from '../../types';

export class SupabaseService {
  // Autenticación con email y contraseña
  static async login(email: string, password: string): Promise<{ user: CMSUser; token: string } | null> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error en login:', error);
        return null;
      }

      if (!data.user) {
        return null;
      }

      // Obtener datos adicionales del usuario desde la tabla users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        console.error('Error obteniendo datos del usuario:', userError);
        return null;
      }

      const cmsUser: CMSUser = {
        uid: data.user.id,
        email: data.user.email || '',
        displayName: userData.display_name || data.user.email || '',
        role: userData.role || 'artist',
        createdAt: userData.created_at || new Date().toISOString(),
        isActive: userData.is_active !== false
      };

      // Actualizar último login
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);

      return { 
        user: cmsUser, 
        token: data.session?.access_token || '' 
      };
    } catch (error) {
      console.error('Error en login:', error);
      return null;
    }
  }

  // Registro de usuario
  static async register(email: string, password: string, displayName: string, username: string, role: 'artist' | 'admin' | 'bassse_admin' = 'artist'): Promise<{ user: CMSUser; token: string } | null> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Error en registro:', error);
        return null;
      }

      if (!data.user) {
        return null;
      }

      // Crear registro en la tabla users
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email,
          display_name: displayName,
          username,
          role,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          is_active: true
        });

      if (insertError) {
        console.error('Error creando usuario en tabla:', insertError);
        return null;
      }

      const cmsUser: CMSUser = {
        uid: data.user.id,
        email: email,
        displayName,
        role,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      return { 
        user: cmsUser, 
        token: data.session?.access_token || '' 
      };
    } catch (error) {
      console.error('Error en registro:', error);
      return null;
    }
  }

  // Cerrar sesión
  static async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }

  // Login con username (buscar email por username)
  static async loginWithUsername(username: string, password: string): Promise<{ user: CMSUser; token: string } | null> {
    try {
      // Buscar usuario por username
      const { data: userData, error } = await supabase
        .from('users')
        .select('email')
        .eq('username', username)
        .single();

      if (error || !userData) {
        return null;
      }

      // Hacer login con el email encontrado
      return await this.login(userData.email, password);
    } catch (error) {
      console.error('Error en login con username:', error);
      return null;
    }
  }

  // Obtener datos del artista
  static async getArtistData(artistSlug: string): Promise<CMSArtistData | null> {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('slug', artistSlug)
        .single();

      if (error) {
        console.error('Error obteniendo datos del artista:', error);
        return null;
      }

      // Convertir datos de Supabase al formato CMSArtistData
      const artistData: CMSArtistData = {
        id: data.id,
        uid: data.user_id,
        slug: data.slug,
        name: data.name,
        email: data.email,
        genres: data.genres || [],
        collective: data.collective || '',
        labels: data.labels || [],
        baseCity: data.base_city || '',
        yearsActive: data.years_active || '',
        influences: data.influences || '',
        heroImage: data.hero_image || '',
        biography: data.biography || { text: '', pdfUrl: '' },
        socialMedia: data.social_media || {},
        sets: data.sets || [],
        gallery: data.gallery || [],
        documents: data.documents || {},
        contactEmail: data.contact_email,
        languages: data.languages || { primary: 'es', secondary: 'en' },
        isActive: data.is_active,
        isPublic: data.is_public,
        createdAt: data.created_at,
        lastUpdated: data.last_updated
      };

      return artistData;
    } catch (error) {
      console.error('Error obteniendo datos del artista:', error);
      return null;
    }
  }

  // Actualizar datos del artista
  static async updateArtistData(artistSlug: string, data: Partial<CMSArtistData>): Promise<boolean> {
    try {
      // Convertir datos del formato CMS al formato de Supabase
      const updateData: any = {
        last_updated: new Date().toISOString()
      };

      if (data.name) updateData.name = data.name;
      if (data.email) updateData.email = data.email;
      if (data.genres) updateData.genres = data.genres;
      if (data.collective) updateData.collective = data.collective;
      if (data.labels) updateData.labels = data.labels;
      if (data.baseCity) updateData.base_city = data.baseCity;
      if (data.yearsActive) updateData.years_active = data.yearsActive;
      if (data.influences) updateData.influences = data.influences;
      if (data.heroImage) updateData.hero_image = data.heroImage;
      if (data.biography) updateData.biography = data.biography;
      if (data.socialMedia) updateData.social_media = data.socialMedia;
      if (data.sets) updateData.sets = data.sets;
      if (data.gallery) updateData.gallery = data.gallery;
      if (data.documents) updateData.documents = data.documents;
      if (data.contactEmail) updateData.contact_email = data.contactEmail;
      if (data.languages) updateData.languages = data.languages;
      if (data.isActive !== undefined) updateData.is_active = data.isActive;
      if (data.isPublic !== undefined) updateData.is_public = data.isPublic;

      const { error } = await supabase
        .from('artists')
        .update(updateData)
        .eq('slug', artistSlug);

      if (error) {
        console.error('Error actualizando datos del artista:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error actualizando datos del artista:', error);
      return false;
    }
  }

  // Crear nuevo artista
  static async createArtist(artistData: CMSArtistData): Promise<boolean> {
    try {
      const insertData = {
        id: artistData.id,
        user_id: artistData.uid,
        slug: artistData.slug,
        name: artistData.name,
        email: artistData.email,
        genres: artistData.genres,
        collective: artistData.collective,
        labels: artistData.labels,
        base_city: artistData.baseCity,
        years_active: artistData.yearsActive,
        influences: artistData.influences,
        hero_image: artistData.heroImage,
        biography: artistData.biography,
        social_media: artistData.socialMedia,
        sets: artistData.sets,
        gallery: artistData.gallery,
        documents: artistData.documents,
        contact_email: artistData.contactEmail,
        languages: artistData.languages,
        is_active: artistData.isActive,
        is_public: artistData.isPublic,
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString()
      };

      const { error } = await supabase
        .from('artists')
        .insert(insertData);

      if (error) {
        console.error('Error creando artista:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error creando artista:', error);
      return false;
    }
  }

  // Subir archivo
  static async uploadFile(file: File, path: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.storage
        .from('artists')
        .upload(path, file);

      if (error) {
        console.error('Error subiendo archivo:', error);
        return null;
      }

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from('artists')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error subiendo archivo:', error);
      return null;
    }
  }

  // Obtener usuario actual
  static async getCurrentUser(): Promise<any> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  // Verificar si el usuario está autenticado
  static async isAuthenticated(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    return user !== null;
  }

  // Obtener token del usuario actual
  static async getCurrentUserToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  }
} 