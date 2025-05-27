import React from 'react';
// Fix: Import specific item types and Section from './types', remove non-existent DownloadCategory and MoreInfoItem
import { DJProfileData, ItemType, SocialLink, PhotoItem, VideoItem, TrackItem, DocumentItem, LinkItem, BioItem, Section } from './types';
import { InstagramIcon, SoundCloudIcon, BeatportIcon } from './components/SocialIcons';

const kSaisSocialLinks: SocialLink[] = [
  { platform: "Instagram", url: "https://www.instagram.com/k_sais/", icon: <InstagramIcon /> },
  { platform: "SoundCloud", url: "https://soundcloud.com/k-sais", icon: <SoundCloudIcon /> },
  { platform: "Beatport", url: "https://www.beatport.com/artist/k-sais/1005748", icon: <BeatportIcon /> },
];

// Define items for sections directly - Más enfocado en playlists y sets
const kSaisPhotoItems: PhotoItem[] = [
  { id: 'ksf1', name: 'K-SAIS Live at La Mata Fest 2024', type: ItemType.Photo, thumbnailUrl: 'https://picsum.photos/seed/ksaisfoto1/300/200', fullUrl: 'https://picsum.photos/seed/ksaisfoto1/1200/800', downloadUrl: '#' },
  { id: 'ksf2', name: 'K-SAIS Studio Session Portrait', type: ItemType.Photo, thumbnailUrl: 'https://picsum.photos/seed/ksaisfoto2/300/200', fullUrl: 'https://picsum.photos/seed/ksaisfoto2/1200/800', downloadUrl: '#' },
  { id: 'ksf3', name: 'K-SAIS Techno Bunker Performance', type: ItemType.Photo, thumbnailUrl: 'https://picsum.photos/seed/ksaisfoto3/300/200', fullUrl: 'https://picsum.photos/seed/ksaisfoto3/1200/800', downloadUrl: '#' },
  { id: 'ksf4', name: 'K-SAIS Behind the Decks', type: ItemType.Photo, thumbnailUrl: 'https://picsum.photos/seed/ksaisfoto4/300/200', fullUrl: 'https://picsum.photos/seed/ksaisfoto4/1200/800', downloadUrl: '#' },
];

const kSaisVideoItems: VideoItem[] = [
  { id: 'ksv1', name: 'K-SAIS Live Set - La Mata Fest 2024', type: ItemType.Video, thumbnailUrl: 'https://picsum.photos/seed/ksaisvideo1/300/200', videoUrl: '#', downloadUrl: '#' },
  { id: 'ksv2', name: 'K-SAIS Studio Mix Session', type: ItemType.Video, thumbnailUrl: 'https://picsum.photos/seed/ksaisvideo2/300/200', videoUrl: '#', downloadUrl: '#' },
  { id: 'ksv3', name: 'K-SAIS Techno Bunker Live', type: ItemType.Video, thumbnailUrl: 'https://picsum.photos/seed/ksaisvideo3/300/200', videoUrl: '#', downloadUrl: '#' },
];

// Más sets y playlists como en la referencia
const kSaisTrackItems: TrackItem[] = [
  { id: 'kst1', name: 'HARD GROOVE SESSIONS #001', type: ItemType.Track, artist: 'K-SAIS', audioUrl: '#', downloadUrl: '#', duration: '75:30' },
  { id: 'kst2', name: 'TECHNO UNDERGROUND MIX', type: ItemType.Track, artist: 'K-SAIS', audioUrl: '#', downloadUrl: '#', duration: '68:45' },
  { id: 'kst3', name: 'LA MATA FEST LIVE SET 2024', type: ItemType.Track, artist: 'K-SAIS', audioUrl: '#', downloadUrl: '#', duration: '90:00' },
];

const kSaisDocumentItems: DocumentItem[] = [
    { id: 'hosp1', name: 'HOSPITALITY RIDER', type: ItemType.Document, downloadUrl: '#', description: 'K-SAIS Hospitality Requirements' },
    { id: 'tech1', name: 'TECHNICAL RIDER', type: ItemType.Document, downloadUrl: '#', description: 'K-SAIS Technical Setup Requirements' },
    { id: 'press1', name: 'PRESS KIT PDF', type: ItemType.Document, downloadUrl: '#', description: 'Complete Press Kit Package' },
];

const kSaisBookingEmail = "contrataciones.ksais@gmail.com";

const kSaisFullBio = `K-SAIS, originario de León, se ha consolidado en tan solo tres años como una de las promesas más destacadas del techno en España. Su estilo auténtico y distintivo surge de la combinación de ritmos frenéticos y bombos contundentes, inspirados en el hardgroove de la vieja escuela.

Esta fusión le permite conectar los orígenes más puros y profundos del techno con las tendencias más actuales, creando una mezcla propia que resuena tanto con los puristas del género como con nuevos oyentes. Influenciado por íconos como Ben Sims, Óscar Mulero, Boriqua Tribez y Mark Broom, así como por artistas contemporáneos como Funk Assault, Rene Wise y Grace Dahl, K-SAIS ha logrado forjar un sonido único que lo diferencia en la escena electrónica española.

La presencia escénica de K-SAIS es una de sus mayores fortalezas. Su habilidad innata y su capacidad para dominar la mesa de mezclas le permiten transformar cada set en una experiencia de baile única. Utiliza efectos de manera magistral y desarrolla transiciones fluidas que mantienen la energía del público al máximo.

Además de su labor como DJ, K-SAIS es el fundador del colectivo La Mata Fest, una iniciativa comprometida con la promoción del talento local y la conexión de artistas de diversas regiones con nuevos públicos.`;

const kSaisBioSummary = "K-SAIS, originario de León, se ha consolidado como una de las promesas más destacadas del techno en España. Su estilo distintivo combina ritmos frenéticos y bombos contundentes del hardgroove clásico con tendencias actuales, creando sets únicos que conectan con puristas y nuevos oyentes por igual.";

// Fix: Correctly structure djProfileData according to DJProfileData type
export const djProfileData: DJProfileData = {
  name: "K-SAIS",
  promoPackageTitle: "K-SAIS", 
  billedAs: "Estilo musical: Techno - Hard Groove | Colectivo: La Mata Fest",
  labelAssociation: ["La Mata Fest"], 
  bioSummary: kSaisBioSummary,
  fullBio: kSaisFullBio,
  
  // Hero image optimizada
  heroImageUrl: '/images/kasais-hero.png',

  socialLinks: kSaisSocialLinks,
  sections: [
    {
      id: 'playlists',
      title: 'SETS & PLAYLISTS',
      itemCountText: `${kSaisTrackItems.length} sets disponibles - SoundCloud & YouTube`,
      items: kSaisTrackItems,
    },
    {
      id: 'photos',
      title: 'PRESS PHOTOS',
      itemCountText: `${kSaisPhotoItems.length} fotos`,
      items: kSaisPhotoItems,
    },
    {
      id: 'videos',
      title: 'LIVE PERFORMANCES',
      itemCountText: `${kSaisVideoItems.length} videos`,
      items: kSaisVideoItems,
    },
    {
      id: 'documents',
      title: 'RIDERS & PRESS',
      itemCountText: `${kSaisDocumentItems.length} documentos`,
      items: kSaisDocumentItems,
    },
    {
      id: 'booking',
      title: 'BOOKING INFO',
      itemCountText: 'Información de contratación',
      items: [
        {
          id: 'booking-email',
          type: ItemType.Link,
          name: 'Email de Contratación',
          url: `mailto:${kSaisBookingEmail}`,
          description: `Contacto directo: ${kSaisBookingEmail}`,
        } as LinkItem,
        {
          id: 'booking-phone',
          type: ItemType.Bio,
          name: 'Disponibilidad',
          content: 'Disponible para eventos en toda España y Europa',
        } as BioItem,
      ],
    },
    {
      id: 'about-details',
      title: 'ARTIST INFO',
      itemCountText: 'Información del artista',
      items: [
        {
          id: 'nationality',
          type: ItemType.Bio,
          name: 'Origen',
          content: 'León, España',
        } as BioItem,
        {
          id: 'genre',
          type: ItemType.Bio,
          name: 'Géneros',
          content: 'Techno, Hard Groove',
        } as BioItem,
        {
          id: 'residency',
          type: ItemType.Bio,
          name: 'Residencia',
          content: 'La Mata Fest',
        } as BioItem,
        {
          id: 'experience',
          type: ItemType.Bio,
          name: 'Experiencia',
          content: '3+ años en la escena techno española',
        } as BioItem,
      ],
    },
  ],
};