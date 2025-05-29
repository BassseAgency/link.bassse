// Servicio de traducción automática para LINK.BASSSE
// Soporte para español, inglés, italiano y alemán

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface PressKitContent {
  biography: string;
  artistInfo: {
    genres: string[];
    collective: string;
    labels: string[];
    baseCity: string;
    yearsActive: string;
    influences: string;
  };
  bookingInfo: {
    description: string;
    contactInfo: string;
  };
  sections: {
    biography: string;
    sets: string;
    pressPhotos: string;
    bookingInfo: string;
    artistInfo: string;
  };
}

export class TranslationService {
  private static readonly SUPPORTED_LANGUAGES = {
    'es': 'español',
    'en': 'inglés',
    'it': 'italiano',
    'de': 'alemán'
  };

  // Traducciones estáticas para la interfaz
  private static readonly UI_TRANSLATIONS: Record<string, any> = {
    es: {
      sections: {
        biography: 'Biografía',
        sets: 'Sets & Releases',
        pressPhotos: 'Press Photos',
        bookingInfo: 'Booking Info',
        artistInfo: 'Información del Artista'
      },
      buttons: {
        downloadTxt: 'Descargar TXT',
        downloadPdf: 'Descargar PDF',
        downloadRider: 'Descargar Rider',
        downloadPressKit: 'Descargar Press Kit',
        contactBooking: 'Contactar para Booking',
        viewMore: 'Ver más',
        viewLess: 'Ver menos',
        edit: 'Editar',
        addSet: 'Agregar Set',
        uploadPhoto: 'Subir Foto',
        manage: 'Gestionar'
      },
      labels: {
        genres: 'Géneros',
        collective: 'Colectivo',
        labels: 'Sellos',
        base: 'Base',
        yearsActive: 'Años Activo',
        influences: 'Influencias',
        agency: 'Agencia',
        email: 'Email',
        phone: 'Teléfono',
        website: 'Sitio Web',
        socialMedia: 'Redes Sociales'
      },
      descriptions: {
        biography: 'Aquí estará tu biografía. Podrás crear y editar tu biografía completa desde el panel CMS.',
        technicalRider: 'Especificaciones técnicas, requerimientos de sonido e iluminación para performances.',
        pressKit: 'Descarga el press kit completo con biografía, fotos, rider técnico y sets.',
        bookingRequest: '¿Quieres contratar a este artista? Rellena el formulario y enviaremos tu solicitud directamente.'
      }
    },
    en: {
      sections: {
        biography: 'Biography',
        sets: 'Sets & Releases',
        pressPhotos: 'Press Photos',
        bookingInfo: 'Booking Info',
        artistInfo: 'Artist Information'
      },
      buttons: {
        downloadTxt: 'Download TXT',
        downloadPdf: 'Download PDF',
        downloadRider: 'Download Rider',
        downloadPressKit: 'Download Press Kit',
        contactBooking: 'Contact for Booking',
        viewMore: 'View more',
        viewLess: 'View less',
        edit: 'Edit',
        addSet: 'Add Set',
        uploadPhoto: 'Upload Photo',
        manage: 'Manage'
      },
      labels: {
        genres: 'Genres',
        collective: 'Collective',
        labels: 'Labels',
        base: 'Based in',
        yearsActive: 'Years Active',
        influences: 'Influences',
        agency: 'Agency',
        email: 'Email',
        phone: 'Phone',
        website: 'Website',
        socialMedia: 'Social Media'
      },
      descriptions: {
        biography: 'Here will be your biography. You can create and edit your complete biography from the CMS panel.',
        technicalRider: 'Technical specifications, sound and lighting requirements for performances.',
        pressKit: 'Download the complete press kit with biography, photos, technical rider and sets.',
        bookingRequest: 'Want to book this artist? Fill out the form and we\'ll send your request directly.'
      }
    },
    it: {
      sections: {
        biography: 'Biografia',
        sets: 'Set & Rilasci',
        pressPhotos: 'Foto Stampa',
        bookingInfo: 'Info Prenotazione',
        artistInfo: 'Informazioni Artista'
      },
      buttons: {
        downloadTxt: 'Scarica TXT',
        downloadPdf: 'Scarica PDF',
        downloadRider: 'Scarica Rider',
        downloadPressKit: 'Scarica Press Kit',
        contactBooking: 'Contatta per Prenotazione',
        viewMore: 'Vedi di più',
        viewLess: 'Vedi meno',
        edit: 'Modifica',
        addSet: 'Aggiungi Set',
        uploadPhoto: 'Carica Foto',
        manage: 'Gestisci'
      },
      labels: {
        genres: 'Generi',
        collective: 'Collettivo',
        labels: 'Etichette',
        base: 'Base',
        yearsActive: 'Anni Attivo',
        influences: 'Influenze',
        agency: 'Agenzia',
        email: 'Email',
        phone: 'Telefono',
        website: 'Sito Web',
        socialMedia: 'Social Media'
      },
      descriptions: {
        biography: 'Qui sarà la tua biografia. Potrai creare e modificare la tua biografia completa dal pannello CMS.',
        technicalRider: 'Specifiche tecniche, requisiti audio e illuminazione per le performance.',
        pressKit: 'Scarica il press kit completo con biografia, foto, rider tecnico e set.',
        bookingRequest: 'Vuoi prenotare questo artista? Compila il modulo e invieremo la tua richiesta direttamente.'
      }
    },
    de: {
      sections: {
        biography: 'Biografie',
        sets: 'Sets & Releases',
        pressPhotos: 'Pressefotos',
        bookingInfo: 'Buchungsinfo',
        artistInfo: 'Künstlerinformation'
      },
      buttons: {
        downloadTxt: 'TXT Herunterladen',
        downloadPdf: 'PDF Herunterladen',
        downloadRider: 'Rider Herunterladen',
        downloadPressKit: 'Press Kit Herunterladen',
        contactBooking: 'Für Buchung Kontaktieren',
        viewMore: 'Mehr anzeigen',
        viewLess: 'Weniger anzeigen',
        edit: 'Bearbeiten',
        addSet: 'Set Hinzufügen',
        uploadPhoto: 'Foto Hochladen',
        manage: 'Verwalten'
      },
      labels: {
        genres: 'Genres',
        collective: 'Kollektiv',
        labels: 'Labels',
        base: 'Basis',
        yearsActive: 'Jahre Aktiv',
        influences: 'Einflüsse',
        agency: 'Agentur',
        email: 'E-Mail',
        phone: 'Telefon',
        website: 'Website',
        socialMedia: 'Soziale Medien'
      },
      descriptions: {
        biography: 'Hier wird deine Biografie stehen. Du kannst deine vollständige Biografie über das CMS-Panel erstellen und bearbeiten.',
        technicalRider: 'Technische Spezifikationen, Sound- und Beleuchtungsanforderungen für Auftritte.',
        pressKit: 'Lade das vollständige Press Kit mit Biografie, Fotos, technischem Rider und Sets herunter.',
        bookingRequest: 'Möchten Sie diesen Künstler buchen? Füllen Sie das Formular aus und wir senden Ihre Anfrage direkt.'
      }
    }
  };

  // Simulador de traducción para contenido dinámico (biografías, descripciones personalizadas)
  private static async translateText(text: string, targetLanguage: string): Promise<string> {
    // En producción, esto se conectaría a una API de traducción real como Google Translate, DeepL, etc.
    // Por ahora, simulamos la traducción con transformaciones básicas
    
    if (targetLanguage === 'es') return text; // Texto original en español
    
    // Simulamos la traducción con algunos patrones básicos
    const translations: Record<string, Record<string, string>> = {
      en: {
        'Aquí estará tu biografía': 'Here will be your biography',
        'Desde el panel CMS': 'From the CMS panel',
        'música electrónica': 'electronic music',
        'artista': 'artist',
        'DJ': 'DJ',
        'productor': 'producer',
        'techno': 'techno',
        'house': 'house',
        'electronic': 'electronic',
        'Valencia': 'Valencia',
        'España': 'Spain',
        'Barcelona': 'Barcelona',
        'Madrid': 'Madrid'
      },
      it: {
        'Aquí estará tu biografía': 'Qui sarà la tua biografia',
        'Desde el panel CMS': 'Dal pannello CMS',
        'música electrónica': 'musica elettronica',
        'artista': 'artista',
        'DJ': 'DJ',
        'productor': 'produttore',
        'techno': 'techno',
        'house': 'house',
        'electronic': 'elettronica',
        'Valencia': 'Valencia',
        'España': 'Spagna',
        'Barcelona': 'Barcellona',
        'Madrid': 'Madrid'
      },
      de: {
        'Aquí estará tu biografía': 'Hier wird deine Biografie stehen',
        'Desde el panel CMS': 'Vom CMS-Panel',
        'música electrónica': 'elektronische Musik',
        'artista': 'Künstler',
        'DJ': 'DJ',
        'productor': 'Produzent',
        'techno': 'Techno',
        'house': 'House',
        'electronic': 'elektronisch',
        'Valencia': 'Valencia',
        'España': 'Spanien',
        'Barcelona': 'Barcelona',
        'Madrid': 'Madrid'
      }
    };

    let translatedText = text;
    const langTranslations = translations[targetLanguage] || {};
    
    Object.entries(langTranslations).forEach(([original, translation]) => {
      const regex = new RegExp(original, 'gi');
      translatedText = translatedText.replace(regex, translation);
    });

    return translatedText;
  }

  static async translatePressKit(content: PressKitContent, targetLanguage: string): Promise<PressKitContent> {
    const uiTranslations = this.UI_TRANSLATIONS[targetLanguage] || this.UI_TRANSLATIONS.es;
    
    // Traducir biografía
    const biography = await this.translateText(content.biography, targetLanguage);
    
    // Traducir información del artista
    const artistInfo = {
      ...content.artistInfo,
      genres: await Promise.all(content.artistInfo.genres.map(genre => this.translateText(genre, targetLanguage))),
      collective: await this.translateText(content.artistInfo.collective, targetLanguage),
      labels: await Promise.all(content.artistInfo.labels.map(label => this.translateText(label, targetLanguage))),
      baseCity: await this.translateText(content.artistInfo.baseCity, targetLanguage),
      influences: await this.translateText(content.artistInfo.influences, targetLanguage)
    };

    // Traducir información de booking
    const bookingInfo = {
      description: await this.translateText(content.bookingInfo.description, targetLanguage),
      contactInfo: await this.translateText(content.bookingInfo.contactInfo, targetLanguage)
    };

    return {
      biography,
      artistInfo,
      bookingInfo,
      sections: uiTranslations.sections
    };
  }

  static getUITranslations(language: string) {
    return this.UI_TRANSLATIONS[language] || this.UI_TRANSLATIONS.es;
  }

  static getSupportedLanguages() {
    return this.SUPPORTED_LANGUAGES;
  }

  static isLanguageSupported(language: string): boolean {
    return language in this.SUPPORTED_LANGUAGES;
  }

  // Generar press kit traducido para descarga
  static async generateTranslatedPressKit(artistData: any, language: string): Promise<Blob> {
    const translations = this.getUITranslations(language);
    
    // Crear contenido del press kit traducido
    const content = `
${translations.sections.biography.toUpperCase()}
${'-'.repeat(50)}

${await this.translateText(artistData?.biography || 'Biografía del artista...', language)}

${translations.sections.artistInfo.toUpperCase()}
${'-'.repeat(50)}

${translations.labels.genres}: ${(artistData?.genres || ['Electronic']).join(', ')}
${translations.labels.collective}: ${await this.translateText(artistData?.collective || 'Tu Colectivo', language)}
${translations.labels.labels}: ${(artistData?.labels || ['Independent']).join(', ')}
${translations.labels.base}: ${await this.translateText(artistData?.baseCity || 'Tu Ciudad', language)}
${translations.labels.yearsActive}: ${artistData?.yearsActive || '2020 - Presente'}

${translations.sections.bookingInfo.toUpperCase()}
${'-'.repeat(50)}

${translations.labels.email}: ${artistData?.contactEmail || 'booking@tuagencia.com'}
${translations.descriptions.bookingRequest}

---
Generated by LINK.BASSSE - ${new Date().toLocaleDateString()}
    `;

    return new Blob([content], { type: 'text/plain;charset=utf-8' });
  }

  // Detectar idioma del contenido
  static detectLanguage(text: string): string {
    const spanishWords = ['artista', 'música', 'electrónica', 'desde', 'años'];
    const englishWords = ['artist', 'music', 'electronic', 'from', 'years'];
    const italianWords = ['artista', 'musica', 'elettronica', 'da', 'anni'];
    const germanWords = ['künstler', 'musik', 'elektronisch', 'von', 'jahre'];

    const lowerText = text.toLowerCase();
    
    const scores: Record<string, number> = { es: 0, en: 0, it: 0, de: 0 };
    
    spanishWords.forEach(word => {
      if (lowerText.includes(word)) scores.es++;
    });
    
    englishWords.forEach(word => {
      if (lowerText.includes(word)) scores.en++;
    });
    
    italianWords.forEach(word => {
      if (lowerText.includes(word)) scores.it++;
    });
    
    germanWords.forEach(word => {
      if (lowerText.includes(word)) scores.de++;
    });

    return Object.entries(scores).reduce((max, [lang, score]) => 
      score > scores[max] ? lang : max, 'es'
    );
  }
}

export default TranslationService; 