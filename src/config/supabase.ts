import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key-aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para la base de datos
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          username: string;
          role: 'artist' | 'admin' | 'bassse_admin';
          created_at: string;
          last_login: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          display_name: string;
          username: string;
          role?: 'artist' | 'admin' | 'bassse_admin';
          created_at?: string;
          last_login?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          username?: string;
          role?: 'artist' | 'admin' | 'bassse_admin';
          created_at?: string;
          last_login?: string | null;
          is_active?: boolean;
        };
      };
      artists: {
        Row: {
          id: string;
          user_id: string;
          slug: string;
          name: string;
          email: string;
          genres: string[];
          collective: string | null;
          labels: string[] | null;
          base_city: string | null;
          years_active: string | null;
          influences: string | null;
          hero_image: string | null;
          biography: any;
          social_media: any;
          sets: any[];
          gallery: any[];
          documents: any;
          contact_email: string;
          languages: any;
          is_active: boolean;
          is_public: boolean;
          created_at: string;
          last_updated: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          slug: string;
          name: string;
          email: string;
          genres?: string[];
          collective?: string | null;
          labels?: string[] | null;
          base_city?: string | null;
          years_active?: string | null;
          influences?: string | null;
          hero_image?: string | null;
          biography?: any;
          social_media?: any;
          sets?: any[];
          gallery?: any[];
          documents?: any;
          contact_email: string;
          languages?: any;
          is_active?: boolean;
          is_public?: boolean;
          created_at?: string;
          last_updated?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          slug?: string;
          name?: string;
          email?: string;
          genres?: string[];
          collective?: string | null;
          labels?: string[] | null;
          base_city?: string | null;
          years_active?: string | null;
          influences?: string | null;
          hero_image?: string | null;
          biography?: any;
          social_media?: any;
          sets?: any[];
          gallery?: any[];
          documents?: any;
          contact_email?: string;
          languages?: any;
          is_active?: boolean;
          is_public?: boolean;
          created_at?: string;
          last_updated?: string;
        };
      };
      metrics: {
        Row: {
          id: string;
          artist_id: string;
          total_views: number;
          total_downloads: number;
          unique_visitors: number;
          daily_views: any;
          monthly_views: any;
          downloads_by_type: any;
          traffic_sources: any;
          countries: any;
          last_updated: string;
        };
        Insert: {
          id?: string;
          artist_id: string;
          total_views?: number;
          total_downloads?: number;
          unique_visitors?: number;
          daily_views?: any;
          monthly_views?: any;
          downloads_by_type?: any;
          traffic_sources?: any;
          countries?: any;
          last_updated?: string;
        };
        Update: {
          id?: string;
          artist_id?: string;
          total_views?: number;
          total_downloads?: number;
          unique_visitors?: number;
          daily_views?: any;
          monthly_views?: any;
          downloads_by_type?: any;
          traffic_sources?: any;
          countries?: any;
          last_updated?: string;
        };
      };
    };
  };
} 