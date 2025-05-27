import { doc, getDoc, updateDoc, increment, setDoc, collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ArtistMetrics, Lead } from '../../types';

export class MetricsService {
  
  // Registrar una visualización de página
  static async trackPageView(artistSlug: string, source: string = 'direct', country?: string): Promise<void> {
    try {
      const metricsRef = doc(db, 'metrics', artistSlug);
      const today = new Date().toISOString().split('T')[0];
      const month = new Date().toISOString().substring(0, 7);
      
      // Actualizar métricas generales
      await updateDoc(metricsRef, {
        totalViews: increment(1),
        [`dailyViews.${today}`]: increment(1),
        [`monthlyViews.${month}`]: increment(1),
        [`trafficSources.${source}`]: increment(1),
        lastUpdated: new Date().toISOString()
      });
      
      // Actualizar país si se proporciona
      if (country) {
        await updateDoc(metricsRef, {
          [`countries.${country}`]: increment(1)
        });
      }
      
    } catch (error) {
      console.error('Error registrando visualización:', error);
    }
  }
  
  // Registrar una descarga
  static async trackDownload(
    artistSlug: string, 
    downloadType: 'pressKit' | 'biography' | 'sets' | 'photos' | 'documents',
    fileName?: string
  ): Promise<void> {
    try {
      const metricsRef = doc(db, 'metrics', artistSlug);
      
      await updateDoc(metricsRef, {
        totalDownloads: increment(1),
        [`downloadsByType.${downloadType}`]: increment(1),
        lastUpdated: new Date().toISOString()
      });
      
      // Registrar descarga específica
      await addDoc(collection(db, 'downloads'), {
        artistSlug,
        downloadType,
        fileName: fileName || 'unknown',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ip: await this.getUserIP()
      });
      
    } catch (error) {
      console.error('Error registrando descarga:', error);
    }
  }
  
  // Registrar un lead/contacto
  static async trackLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'isProcessed'>): Promise<string> {
    try {
      const lead: Omit<Lead, 'id'> = {
        ...leadData,
        createdAt: new Date().toISOString(),
        isProcessed: false
      };
      
      const docRef = await addDoc(collection(db, 'leads'), lead);
      
      // Actualizar contador de leads del artista
      const metricsRef = doc(db, 'metrics', leadData.artistSlug);
      await updateDoc(metricsRef, {
        totalLeads: increment(1),
        lastUpdated: new Date().toISOString()
      });
      
      return docRef.id;
      
    } catch (error) {
      console.error('Error registrando lead:', error);
      throw error;
    }
  }
  
  // Obtener métricas de un artista
  static async getArtistMetrics(artistSlug: string): Promise<ArtistMetrics | null> {
    try {
      const metricsDoc = await getDoc(doc(db, 'metrics', artistSlug));
      
      if (metricsDoc.exists()) {
        return metricsDoc.data() as ArtistMetrics;
      }
      
      return null;
    } catch (error) {
      console.error('Error obteniendo métricas:', error);
      return null;
    }
  }
  
  // Obtener leads de un artista
  static async getArtistLeads(artistSlug: string, limitCount: number = 50): Promise<Lead[]> {
    try {
      const leadsQuery = query(
        collection(db, 'leads'),
        where('artistSlug', '==', artistSlug),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(leadsQuery);
      const leads: Lead[] = [];
      
      querySnapshot.forEach((doc) => {
        leads.push({ id: doc.id, ...doc.data() } as Lead);
      });
      
      return leads;
    } catch (error) {
      console.error('Error obteniendo leads:', error);
      return [];
    }
  }
  
  // Obtener métricas globales para BASSSE
  static async getGlobalMetrics(): Promise<{
    totalArtists: number;
    totalViews: number;
    totalDownloads: number;
    totalLeads: number;
  }> {
    try {
      // Obtener todos los artistas
      const artistsQuery = query(collection(db, 'artists'));
      const artistsSnapshot = await getDocs(artistsQuery);
      const totalArtists = artistsSnapshot.size;
      
      // Obtener todas las métricas
      const metricsQuery = query(collection(db, 'metrics'));
      const metricsSnapshot = await getDocs(metricsQuery);
      
      let totalViews = 0;
      let totalDownloads = 0;
      
      metricsSnapshot.forEach((doc) => {
        const data = doc.data();
        totalViews += data.totalViews || 0;
        totalDownloads += data.totalDownloads || 0;
      });
      
      // Obtener total de leads
      const leadsQuery = query(collection(db, 'leads'));
      const leadsSnapshot = await getDocs(leadsQuery);
      const totalLeads = leadsSnapshot.size;
      
      return {
        totalArtists,
        totalViews,
        totalDownloads,
        totalLeads
      };
      
    } catch (error) {
      console.error('Error obteniendo métricas globales:', error);
      return {
        totalArtists: 0,
        totalViews: 0,
        totalDownloads: 0,
        totalLeads: 0
      };
    }
  }
  
  // Obtener artistas más populares
  static async getTopArtists(limitCount: number = 10): Promise<Array<{
    artistId: string;
    name: string;
    slug: string;
    views: number;
    downloads: number;
  }>> {
    try {
      const metricsQuery = query(collection(db, 'metrics'));
      const metricsSnapshot = await getDocs(metricsQuery);
      
      const artistsData: Array<{
        artistId: string;
        name: string;
        slug: string;
        views: number;
        downloads: number;
      }> = [];
      
      for (const metricDoc of metricsSnapshot.docs) {
        const metricsData = metricDoc.data();
        const artistSlug = metricDoc.id;
        
        // Obtener datos del artista
        const artistDoc = await getDoc(doc(db, 'artists', artistSlug));
        if (artistDoc.exists()) {
          const artistData = artistDoc.data();
          
          artistsData.push({
            artistId: artistSlug,
            name: artistData.name,
            slug: artistSlug,
            views: metricsData.totalViews || 0,
            downloads: metricsData.totalDownloads || 0
          });
        }
      }
      
      // Ordenar por vistas y limitar
      return artistsData
        .sort((a, b) => b.views - a.views)
        .slice(0, limitCount);
        
    } catch (error) {
      console.error('Error obteniendo top artistas:', error);
      return [];
    }
  }
  
  // Obtener leads recientes globales
  static async getRecentLeads(limitCount: number = 20): Promise<Lead[]> {
    try {
      const leadsQuery = query(
        collection(db, 'leads'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(leadsQuery);
      const leads: Lead[] = [];
      
      querySnapshot.forEach((doc) => {
        leads.push({ id: doc.id, ...doc.data() } as Lead);
      });
      
      return leads;
    } catch (error) {
      console.error('Error obteniendo leads recientes:', error);
      return [];
    }
  }
  
  // Marcar lead como procesado
  static async markLeadAsProcessed(leadId: string, notes?: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'leads', leadId), {
        isProcessed: true,
        notes: notes || '',
        processedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error marcando lead como procesado:', error);
      throw error;
    }
  }
  
  // Detectar fuente de tráfico
  static detectTrafficSource(): string {
    const referrer = document.referrer.toLowerCase();
    
    if (referrer.includes('instagram.com') || referrer.includes('facebook.com')) {
      return 'social';
    } else if (referrer.includes('whatsapp') || referrer.includes('wa.me')) {
      return 'whatsapp';
    } else if (referrer.includes('gmail.com') || referrer.includes('outlook.com')) {
      return 'email';
    } else if (referrer === '') {
      return 'direct';
    } else {
      return 'other';
    }
  }
  
  // Obtener IP del usuario (simulado)
  private static async getUserIP(): Promise<string> {
    try {
      // En producción, usar un servicio real como ipapi.co
      return 'unknown';
    } catch (error) {
      return 'unknown';
    }
  }
  
  // Obtener país del usuario (simulado)
  static async getUserCountry(): Promise<string> {
    try {
      // En producción, usar geolocalización o servicio de IP
      return 'ES'; // Por defecto España
    } catch (error) {
      return 'unknown';
    }
  }
} 