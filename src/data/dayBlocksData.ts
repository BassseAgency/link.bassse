import { DayBlock, DownloadableFile, AppConfig } from '../../types';

// Archivos de ejemplo para cada set
const createSetFiles = (setName: string, setNumber: number): DownloadableFile[] => [
  {
    id: `audio-${setNumber}-1`,
    name: `${setName} - Live Recording`,
    url: '#',
    type: 'audio',
    size: '125 MB'
  },
  {
    id: `image-${setNumber}-1`,
    name: `${setName} - Fotos del Set`,
    url: '#',
    type: 'zip',
    size: '45 MB'
  },
  {
    id: `pdf-${setNumber}-1`,
    name: `Rider Técnico - ${setName}`,
    url: '#',
    type: 'pdf',
    size: '2.1 MB'
  },
  {
    id: `image-${setNumber}-2`,
    name: `${setName} - Artwork`,
    url: '#',
    type: 'image',
    size: '8.5 MB'
  }
];

export const sampleDayBlocks: DayBlock[] = [
  {
    id: 'set-1',
    title: 'HARD GROOVE SESSIONS #001',
    description: 'Set inaugural de la serie Hard Groove Sessions. Techno underground con influencias industriales y ritmos contundentes que definen el sonido característico de K-SAIS.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    files: createSetFiles('HARD GROOVE SESSIONS #001', 1),
    isVisible: true,
    order: 1,
    createdAt: '2024-01-15'
  },
  {
    id: 'set-2',
    title: 'TECHNO UNDERGROUND MIX',
    description: 'Exploración profunda del techno underground europeo. Una selección cuidadosa de tracks que representan la esencia más pura del género.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    files: createSetFiles('TECHNO UNDERGROUND MIX', 2),
    isVisible: true,
    order: 2,
    createdAt: '2024-01-16'
  },
  {
    id: 'set-3',
    title: 'LA MATA FEST EXCLUSIVE',
    description: 'Set exclusivo grabado en La Mata Fest. Captura la energía única del festival con una selección especial de tracks que marcaron la noche.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    files: createSetFiles('LA MATA FEST EXCLUSIVE', 3),
    isVisible: true,
    order: 3,
    createdAt: '2024-01-17'
  },
  {
    id: 'set-4',
    title: 'INDUSTRIAL TECHNO JOURNEY',
    description: 'Viaje sonoro a través del techno industrial. Sonidos duros, atmósferas densas y ritmos implacables que definen el lado más oscuro de la música electrónica.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    files: createSetFiles('INDUSTRIAL TECHNO JOURNEY', 4),
    isVisible: true,
    order: 4,
    createdAt: '2024-01-18'
  },
  {
    id: 'set-5',
    title: 'PEAK TIME ENERGY',
    description: 'La energía en su punto máximo. Set diseñado para los momentos álgidos de la pista de baile, con tracks seleccionados para mantener la intensidad al límite.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    files: createSetFiles('PEAK TIME ENERGY', 5),
    isVisible: true,
    order: 5,
    createdAt: '2024-01-19'
  },
  {
    id: 'set-6',
    title: 'LEÓN UNDERGROUND SESSIONS',
    description: 'Homenaje a la escena underground de León. Una selección que refleja las raíces y la evolución del sonido techno en la ciudad.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    files: createSetFiles('LEÓN UNDERGROUND SESSIONS', 6),
    isVisible: true,
    order: 6,
    createdAt: '2024-01-20'
  }
];

export const appConfig: AppConfig = {
  heroImage: '/images/kasais-hero.png',
  autoScrollEnabled: true,
  autoScrollDelay: 2, // 2 segundos
  globalDownloadEnabled: true
}; 