-- Script de inicialización para Supabase
-- Ejecutar en SQL Editor de Supabase Dashboard

-- 1. Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('artist', 'admin', 'bassse_admin')) DEFAULT 'artist',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- 2. Crear tabla de artistas
CREATE TABLE IF NOT EXISTS artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  genres TEXT[] DEFAULT '{}',
  collective TEXT,
  labels TEXT[] DEFAULT '{}',
  base_city TEXT,
  years_active TEXT,
  influences TEXT,
  hero_image TEXT,
  biography JSONB DEFAULT '{}',
  social_media JSONB DEFAULT '{}',
  sets JSONB[] DEFAULT '{}',
  gallery JSONB[] DEFAULT '{}',
  documents JSONB DEFAULT '{}',
  contact_email TEXT NOT NULL,
  languages JSONB DEFAULT '{"primary": "es", "secondary": "en"}',
  is_active BOOLEAN DEFAULT true,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Crear tabla de métricas
CREATE TABLE IF NOT EXISTS metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id UUID REFERENCES artists(id),
  total_views INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  daily_views JSONB DEFAULT '{}',
  monthly_views JSONB DEFAULT '{}',
  downloads_by_type JSONB DEFAULT '{}',
  traffic_sources JSONB DEFAULT '{}',
  countries JSONB DEFAULT '{}',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Habilitar RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

-- 5. Crear políticas de seguridad para users
DROP POLICY IF EXISTS "Users can read own data" ON users;
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- 6. Crear políticas de seguridad para artists
DROP POLICY IF EXISTS "Artists are publicly readable" ON artists;
CREATE POLICY "Artists are publicly readable" ON artists
  FOR SELECT USING (is_public = true);

DROP POLICY IF EXISTS "Users can manage own artist profile" ON artists;
CREATE POLICY "Users can manage own artist profile" ON artists
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all artists" ON artists;
CREATE POLICY "Admins can manage all artists" ON artists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'bassse_admin')
    )
  );

-- 7. Crear políticas de seguridad para metrics
DROP POLICY IF EXISTS "Users can read own metrics" ON metrics;
CREATE POLICY "Users can read own metrics" ON metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM artists 
      WHERE artists.id = metrics.artist_id 
      AND artists.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update own metrics" ON metrics;
CREATE POLICY "Users can update own metrics" ON metrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM artists 
      WHERE artists.id = metrics.artist_id 
      AND artists.user_id = auth.uid()
    )
  );

-- 8. Crear función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name, username, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'artist')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Crear trigger para nuevos usuarios
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Insertar datos de prueba (usuarios administradores)
-- Nota: Estos usuarios deben crearse manualmente en Authentication > Users
-- o usando el registro normal de la aplicación

-- Comentarios para crear usuarios manualmente:
-- 1. Ve a Authentication > Users en Supabase Dashboard
-- 2. Haz clic en "Add user"
-- 3. Crea estos usuarios:

-- Usuario 1:
-- Email: admin@link-bassse.com
-- Password: Link2025.
-- User Metadata: {"display_name": "link-bassse", "username": "link-bassse", "role": "bassse_admin"}

-- Usuario 2:
-- Email: contrataciones.ksais@gmail.com  
-- Password: Ksais123
-- User Metadata: {"display_name": "Adminksais", "username": "Adminksais", "role": "admin"}

-- 11. Crear perfil de artista K-SAIS (ejecutar después de crear usuarios)
-- Este script se ejecutará automáticamente cuando se cree el usuario K-SAIS

-- Función para crear perfil de artista K-SAIS
CREATE OR REPLACE FUNCTION create_ksais_profile()
RETURNS void AS $$
DECLARE
  ksais_user_id UUID;
BEGIN
  -- Buscar el ID del usuario K-SAIS
  SELECT id INTO ksais_user_id 
  FROM auth.users 
  WHERE email = 'contrataciones.ksais@gmail.com';
  
  -- Si existe el usuario, crear el perfil de artista
  IF ksais_user_id IS NOT NULL THEN
    INSERT INTO artists (
      user_id,
      slug,
      name,
      email,
      genres,
      collective,
      biography,
      social_media,
      contact_email,
      languages
    ) VALUES (
      ksais_user_id,
      'k-sais',
      'K-SAIS',
      'contrataciones.ksais@gmail.com',
      ARRAY['Techno', 'Hard Groove', 'Underground'],
      'La Mata Fest',
      '{"text": "K-SAIS, originario de León, se ha consolidado como una de las promesas más destacadas del techno en España.", "pdfUrl": ""}',
      '{"instagram": "https://www.instagram.com/k_sais/", "soundcloud": "https://soundcloud.com/k-sais", "spotify": "https://www.beatport.com/artist/k-sais/1005748"}',
      'contrataciones.ksais@gmail.com',
      '{"primary": "es", "secondary": "en"}'
    )
    ON CONFLICT (slug) DO NOTHING;
    
    RAISE NOTICE 'Perfil de K-SAIS creado exitosamente';
  ELSE
    RAISE NOTICE 'Usuario K-SAIS no encontrado. Créalo primero en Authentication > Users';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Ejecutar la función (solo funcionará si el usuario ya existe)
SELECT create_ksais_profile();

-- 12. Crear métricas iniciales para K-SAIS
INSERT INTO metrics (
  artist_id,
  total_views,
  total_downloads,
  unique_visitors,
  daily_views,
  monthly_views,
  downloads_by_type,
  traffic_sources,
  countries
)
SELECT 
  a.id,
  1500,
  250,
  800,
  '{"2024-01-01": 50, "2024-01-02": 75}',
  '{"2024-01": 1500}',
  '{"pressKit": 100, "biography": 50, "sets": 75, "photos": 25}',
  '{"direct": 500, "social": 800, "whatsapp": 150, "email": 50}',
  '{"ES": 800, "FR": 300, "DE": 200, "US": 100, "UK": 100}'
FROM artists a
WHERE a.slug = 'k-sais'
ON CONFLICT DO NOTHING;

-- Insertar usuarios de prueba
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES 
(
  'b8b8b8b8-b8b8-b8b8-b8b8-b8b8b8b8b8b8',
  'admin@link-bassse.com',
  crypt('***REMOVED***', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"username": "link-bassse", "display_name": "LINK.BASSSE Admin"}',
  true,
  'authenticated'
),
(
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  'info@bassse.com',
  crypt('***REMOVED***', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"username": "AdminBasse", "display_name": "Admin BASSSE"}',
  false,
  'authenticated'
),
(
  'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2',
  'contrataciones.ksais@gmail.com',
  crypt('***REMOVED***', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"username": "Adminksais", "display_name": "Admin K-SAIS"}',
  false,
  'authenticated'
);

-- ¡Script completado!
-- Recuerda crear los usuarios manualmente en Authentication > Users
-- y luego ejecutar: SELECT create_ksais_profile(); 