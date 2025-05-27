// Servicio para manejar solicitudes de booking
export interface BookingRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  eventType: string;
  venue: string;
  date: string;
  capacity?: string;
  budget?: string;
  socialMedia?: string;
  message?: string;
  artistEmail: string;
  artistName: string;
}

export class BookingService {
  // Enviar solicitud de booking por email
  static async sendBookingRequest(request: BookingRequest): Promise<boolean> {
    try {
      // En un entorno real, aquí se enviaría el email usando un servicio como:
      // - EmailJS
      // - SendGrid
      // - Nodemailer (backend)
      // - Firebase Functions
      
      console.log('📧 Enviando solicitud de booking:', request);
      
      // Simular envío de email
      const emailContent = this.generateEmailContent(request);
      console.log('📄 Contenido del email:', emailContent);
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Guardar en localStorage para tracking (en desarrollo)
      this.saveBookingRequest(request);
      
      return true;
    } catch (error) {
      console.error('❌ Error enviando solicitud de booking:', error);
      return false;
    }
  }

  // Generar contenido del email
  private static generateEmailContent(request: BookingRequest): string {
    return `
🎵 NUEVA SOLICITUD DE BOOKING - ${request.artistName}

📋 INFORMACIÓN DEL CONTACTO:
• Nombre: ${request.name}
• Email: ${request.email}
• Teléfono: ${request.phone || 'No proporcionado'}
• Empresa: ${request.company || 'No proporcionado'}

🎪 INFORMACIÓN DEL EVENTO:
• Tipo: ${request.eventType}
• Venue: ${request.venue}
• Fecha: ${request.date}
• Capacidad: ${request.capacity || 'No especificada'}
• Presupuesto: ${request.budget || 'No especificado'}

📱 REDES SOCIALES:
${request.socialMedia || 'No proporcionado'}

💬 MENSAJE ADICIONAL:
${request.message || 'Sin mensaje adicional'}

---
Esta solicitud fue enviada desde link.bassse.com
Fecha: ${new Date().toLocaleString()}
    `.trim();
  }

  // Guardar solicitud en localStorage (para desarrollo)
  private static saveBookingRequest(request: BookingRequest): void {
    try {
      const existingRequests = JSON.parse(localStorage.getItem('booking-requests') || '[]');
      const newRequest = {
        ...request,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
      
      existingRequests.push(newRequest);
      localStorage.setItem('booking-requests', JSON.stringify(existingRequests));
      
      console.log('💾 Solicitud guardada en localStorage');
    } catch (error) {
      console.error('Error guardando solicitud:', error);
    }
  }

  // Obtener solicitudes guardadas (para desarrollo)
  static getBookingRequests(): any[] {
    try {
      return JSON.parse(localStorage.getItem('booking-requests') || '[]');
    } catch (error) {
      console.error('Error obteniendo solicitudes:', error);
      return [];
    }
  }

  // Validar datos del formulario
  static validateBookingRequest(request: Partial<BookingRequest>): string[] {
    const errors: string[] = [];

    if (!request.name?.trim()) {
      errors.push('El nombre es obligatorio');
    }

    if (!request.email?.trim()) {
      errors.push('El email es obligatorio');
    } else if (!this.isValidEmail(request.email)) {
      errors.push('El email no es válido');
    }

    if (!request.eventType?.trim()) {
      errors.push('El tipo de evento es obligatorio');
    }

    if (!request.venue?.trim()) {
      errors.push('El venue es obligatorio');
    }

    if (!request.date?.trim()) {
      errors.push('La fecha del evento es obligatoria');
    } else if (new Date(request.date) < new Date()) {
      errors.push('La fecha del evento debe ser futura');
    }

    return errors;
  }

  // Validar formato de email
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Generar enlace mailto como fallback
  static generateMailtoLink(request: Partial<BookingRequest>): string {
    const subject = encodeURIComponent(`Solicitud de Booking - ${request.artistName || 'Artista'}`);
    const body = encodeURIComponent(`
Hola,

Me gustaría solicitar información para contratar a ${request.artistName || 'el artista'} para un evento.

Información del evento:
• Nombre: ${request.name || ''}
• Email: ${request.email || ''}
• Tipo de evento: ${request.eventType || ''}
• Venue: ${request.venue || ''}
• Fecha: ${request.date || ''}
• Presupuesto: ${request.budget || ''}

${request.message ? `Mensaje adicional:\n${request.message}` : ''}

Saludos,
${request.name || ''}
    `.trim());

    return `mailto:${request.artistEmail}?subject=${subject}&body=${body}`;
  }
} 