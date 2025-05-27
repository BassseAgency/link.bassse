import React from 'react';

export enum ItemType {
  Photo = 'PHOTO',
  Video = 'VIDEO',
  Track = 'TRACK',
  Document = 'DOCUMENT',
  Link = 'LINK',
  Bio = 'BIO',
}

export interface BaseItem {
  id: string;
  name: string;
  type: ItemType;
}

export interface PhotoItem extends BaseItem {
  type: ItemType.Photo;
  thumbnailUrl: string;
  fullUrl: string;
  downloadUrl: string;
}

export interface VideoItem extends BaseItem {
  type: ItemType.Video;
  thumbnailUrl: string;
  videoUrl: string;
  downloadUrl: string;
}

export interface TrackItem extends BaseItem {
  type: ItemType.Track;
  artist?: string;
  audioUrl: string;
  downloadUrl: string;
  duration?: string;
}

export interface DocumentItem extends BaseItem {
  type: ItemType.Document;
  description?: string;
  downloadUrl: string;
}

export interface LinkItem extends BaseItem { // For generic links within sections
  type: ItemType.Link;
  url: string;
  description?: string;
}

export interface BioItem extends BaseItem {
  type: ItemType.Bio;
  content: string;
}

export type SectionContentItem = PhotoItem | VideoItem | TrackItem | DocumentItem | LinkItem | BioItem;

export interface Section {
  id: string;
  title: string;
  itemCountText: string;
  items: SectionContentItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export interface DJProfileData {
  name: string; // Used internally if needed, promoPackageTitle is for display
  promoPackageTitle: string;
  billedAs: string;
  labelAssociation: string[];
  bioSummary: string;
  fullBio?: string;
  heroImageUrl: string;
  socialLinks: SocialLink[];
  sections: Section[];
}

export interface DownloadableFile {
  id: string;
  name: string;
  url: string;
  type: 'audio' | 'image' | 'pdf' | 'zip' | 'other';
  size?: string;
}

export interface DayBlock {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  files: DownloadableFile[];
  isVisible: boolean;
  order: number;
  createdAt: string;
}

export interface AppConfig {
  heroImage: string;
  autoScrollEnabled: boolean;
  autoScrollDelay: number; // in seconds
  globalDownloadEnabled: boolean;
}

// NUEVOS TIPOS PARA SISTEMA MULTI-ARTISTA

// Usuario del sistema
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'artist' | 'admin' | 'bassse_admin';
  artistSlug?: string; // Para artistas: su slug único
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

// Perfil de artista completo
export interface ArtistProfile {
  id: string;
  uid: string; // ID del usuario Firebase
  slug: string; // URL slug único (ej: "k-sais")
  name: string;
  email: string;
  
  // Información básica
  genres: string[];
  collective?: string;
  labels?: string[];
  baseCity?: string;
  yearsActive?: string;
  influences?: string;
  
  // Contenido
  heroImage: string;
  biography: {
    text: string;
    fullText?: string;
    pressRelease?: string;
    pdfUrl?: string;
  };
  
  // Redes sociales
  socialMedia: {
    instagram?: string;
    facebook?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
    website?: string;
  };
  
  // Media
  sets: ArtistSet[];
  gallery: ArtistImage[];
  
  // Documentos
  documents: {
    technicalRider?: ArtistDocument;
    pressKit?: ArtistDocument;
    contract?: ArtistDocument;
    insurance?: ArtistDocument;
  };
  
  // Configuración
  contactEmail: string;
  languages: {
    primary: string;
    secondary?: string;
  };
  
  // Metadata
  isActive: boolean;
  isPublic: boolean;
  createdAt: string;
  lastUpdated: string;
  
  // Métricas
  metrics?: ArtistMetrics;
}

export interface ArtistSet {
  id: string;
  title: string;
  platform: string;
  embedCode: string;
  downloadUrl?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
}

export interface ArtistImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  alt: string;
  caption?: string;
  order: number;
  isVisible: boolean;
  uploadedAt: string;
}

export interface ArtistDocument {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadDate: string;
}

// Métricas de artista
export interface ArtistMetrics {
  artistId: string;
  totalViews: number;
  totalDownloads: number;
  uniqueVisitors: number;
  
  // Métricas por período
  dailyViews: { [date: string]: number };
  monthlyViews: { [month: string]: number };
  
  // Descargas por tipo
  downloadsByType: {
    pressKit: number;
    biography: number;
    sets: number;
    photos: number;
    documents: number;
  };
  
  // Fuentes de tráfico
  trafficSources: {
    direct: number;
    social: number;
    whatsapp: number;
    email: number;
    other: number;
  };
  
  // Países de visitantes
  countries: { [country: string]: number };
  
  lastUpdated: string;
}

// Leads/Contactos recopilados
export interface Lead {
  id: string;
  artistId: string;
  artistSlug: string;
  
  // Información del contacto
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  
  // Contexto
  source: 'contact_form' | 'download' | 'booking_inquiry' | 'newsletter';
  page: string;
  userAgent: string;
  ipAddress: string;
  country?: string;
  
  // Metadata
  createdAt: string;
  isProcessed: boolean;
  notes?: string;
}

// Configuración de BASSSE Agency
export interface BasseConfig {
  id: string;
  
  // Configuración general
  siteName: string;
  domain: string; // link.bassse.com
  supportEmail: string;
  
  // Límites y planes
  maxArtistsPerPlan: number;
  storageLimit: number; // en MB
  
  // Configuración de métricas
  analyticsEnabled: boolean;
  retentionDays: number;
  
  // Configuración de notificaciones
  notifications: {
    newArtistRegistration: boolean;
    weeklyReports: boolean;
    leadAlerts: boolean;
  };
  
  lastUpdated: string;
}

// Datos del dashboard de BASSSE
export interface BasseDashboardData {
  // Resumen general
  totalArtists: number;
  activeArtists: number;
  totalViews: number;
  totalDownloads: number;
  totalLeads: number;
  
  // Artistas más populares
  topArtists: {
    artistId: string;
    name: string;
    slug: string;
    views: number;
    downloads: number;
  }[];
  
  // Métricas recientes
  recentMetrics: {
    date: string;
    views: number;
    downloads: number;
    newLeads: number;
  }[];
  
  // Leads recientes
  recentLeads: Lead[];
  
  lastUpdated: string;
}

// Tipos para el contexto CMS actualizado
export interface CMSUser extends User {}

export interface CMSArtistData extends ArtistProfile {}

export interface CMSSession {
  user: CMSUser;
  token: string;
  expiresAt: string;
}

export interface CMSSet extends ArtistSet {}

export interface CMSImage extends ArtistImage {}

// Tipos para rutas y navegación
export interface RouteParams {
  artistSlug?: string;
}

export interface AppRoute {
  path: string;
  component: React.ComponentType;
  requiresAuth?: boolean;
  roles?: ('artist' | 'admin' | 'bassse_admin')[];
}
