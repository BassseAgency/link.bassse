import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../../src/context/CMSContext';
import { useDesign } from '../../src/hooks/useDesign';
import { BookingService, BookingRequest } from '../../src/services/bookingService';

export const BookingBlock: React.FC = () => {
  const { session, artistData } = useCMS();
  const { primaryColor, secondaryColor } = useDesign();
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Usar datos del CMS o valores por defecto
  const bookingInfo = {
    agency: artistData?.collective || 'Tu Agencia',
    email: artistData?.contactEmail || 'booking@tuagencia.com',
    phone: '+34 XXX XXX XXX',
    website: 'www.tuagencia.com',
    agencyWebsite: artistData?.agencyWebsite || '' // Nuevo campo para enlace de agencia
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-center" style={{ color: primaryColor }}>
            Booking Info
          </h2>
          <div className="w-24 h-1 mx-auto" style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}></div>
        </motion.div>

        {session && (
          <motion.div
            className="absolute top-4 right-4 text-black px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: primaryColor }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            📝 Editable desde CMS
          </motion.div>
        )}

        {/* Booking Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-sm border border-[#f69f16]/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Información de Contacto</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <svg className="w-6 h-6" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Agencia</p>
                  <p className="text-white font-semibold">{bookingInfo.agency}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <svg className="w-6 h-6" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-semibold">{bookingInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <svg className="w-6 h-6" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="text-white font-semibold">{bookingInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Agency Website Link */}
            {bookingInfo.agencyWebsite && (
              <motion.a
                href={bookingInfo.agencyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-black font-bold py-3 px-6 rounded-lg text-center transition-all duration-300"
                style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌐 Ir a la Agencia
              </motion.a>
            )}
          </motion.div>

          {/* Booking Request */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-sm border border-[#f69f16]/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Solicitar Contratación</h3>
            
            <p className="text-gray-300 mb-6">
              ¿Quieres contratar a este artista? Rellena el formulario y enviaremos tu solicitud directamente.
            </p>

            <motion.button
              onClick={() => setShowBookingForm(true)}
              className="w-full text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
              style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contactar para Booking
            </motion.button>
          </motion.div>
        </div>

        {/* Booking Form Modal */}
        <AnimatePresence>
          {showBookingForm && (
            <BookingFormModal
              isOpen={showBookingForm}
              onClose={() => setShowBookingForm(false)}
              artistEmail={bookingInfo.email}
              artistName={artistData?.name || 'Artista'}
            />
          )}
        </AnimatePresence>

        {/* CMS Controls */}
        {session && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={() => alert('Gestionar configuración de booking')}
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Gestionar Booking
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

// Componente del formulario de booking
interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistEmail: string;
  artistName: string;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({ 
  isOpen, 
  onClose, 
  artistEmail, 
  artistName 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    venue: '',
    date: '',
    capacity: '',
    budget: '',
    socialMedia: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar datos del formulario
      const bookingRequest: BookingRequest = {
        ...formData,
        artistEmail,
        artistName
      };

      const validationErrors = BookingService.validateBookingRequest(bookingRequest);
      if (validationErrors.length > 0) {
        alert('Errores en el formulario:\n' + validationErrors.join('\n'));
        setIsSubmitting(false);
        return;
      }

      // Enviar solicitud de booking
      const success = await BookingService.sendBookingRequest(bookingRequest);
      
      if (success) {
        setSubmitted(true);
      } else {
        alert('Error enviando la solicitud. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error enviando solicitud:', error);
      alert('Error enviando la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 border border-[#f69f16]/30 rounded-2xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-[#f69f16] mb-4">¡Solicitud Enviada!</h3>
          <p className="text-gray-300 mb-6">
            Tu solicitud de booking ha sido enviada a {artistEmail}. 
            Te contactarán pronto para discutir los detalles.
          </p>
          <button
            onClick={onClose}
            className="bg-[#f69f16] hover:bg-[#e6950f] text-black font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 border border-[#f69f16]/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#f69f16]">Solicitud de Booking - {artistName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                placeholder="+34 XXX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Empresa/Promotora
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                placeholder="Nombre de tu empresa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Evento *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
              >
                <option value="">Selecciona tipo</option>
                <option value="club">Club</option>
                <option value="festival">Festival</option>
                <option value="warehouse">Warehouse</option>
                <option value="private">Evento Privado</option>
                <option value="residency">Residencia</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Venue/Local *
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                placeholder="Nombre del local o venue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha del Evento *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Capacidad
              </label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                placeholder="Ej: 500 personas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Presupuesto
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                placeholder="Ej: €1,000 - €2,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Redes Sociales
              </label>
              <input
                type="text"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleInputChange}
                className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white"
                placeholder="Instagram, Facebook, etc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mensaje Adicional
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 bg-black/50 border border-[#f69f16]/30 rounded-lg text-white resize-none"
              placeholder="Cuéntanos más detalles sobre tu evento..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-[#f69f16] to-[#e6950f] hover:from-[#e6950f] hover:to-[#d6850e] text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Enviar Solicitud
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}; 