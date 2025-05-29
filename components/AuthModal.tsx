import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../src/context/CMSContext';

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot-password' | 'verify-email';

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthSuccess }) => {
  const [activeMode, setActiveMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { login, register } = useCMS();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (activeMode === 'login') {
        const success = await login(formData.username, formData.password);
        if (success) {
          onAuthSuccess();
          onClose();
        } else {
          setError('Credenciales incorrectas. Verifica tu usuario y contraseña.');
        }
      } 
      
      else if (activeMode === 'register') {
        // Validaciones para registro
        if (!acceptedCookies) {
          setError('Debes aceptar las cookies para continuar');
          setIsLoading(false);
          return;
        }
        if (!acceptedTerms) {
          setError('Debes aceptar los términos y condiciones');
          setIsLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Las contraseñas no coinciden');
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 8) {
          setError('La contraseña debe tener al menos 8 caracteres');
          setIsLoading(false);
          return;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          setError('La contraseña debe contener al menos una mayúscula, una minúscula y un número');
          setIsLoading(false);
          return;
        }

        // Simular envío de email de verificación
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess('¡Cuenta creada! Se ha enviado un código de verificación a tu email.');
        setActiveMode('verify-email');
      } 
      
      else if (activeMode === 'forgot-password') {
        if (!formData.email) {
          setError('Ingresa tu email para recuperar la contraseña');
          setIsLoading(false);
          return;
        }
        
        // Simular envío de email de recuperación
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess('Se ha enviado un enlace de recuperación a tu email. Revisa tu bandeja de entrada.');
        setTimeout(() => {
          setActiveMode('login');
          setSuccess('');
        }, 3000);
      } 
      
      else if (activeMode === 'verify-email') {
        if (!formData.verificationCode || formData.verificationCode.length !== 6) {
          setError('Ingresa el código de verificación de 6 dígitos');
          setIsLoading(false);
          return;
        }
        
        // Simular verificación
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (formData.verificationCode === '123456') {
          const success = await register(formData.username, formData.email, formData.password);
          if (success) {
            setSuccess('¡Email verificado! Tu cuenta ha sido creada exitosamente.');
            setTimeout(() => {
              onAuthSuccess();
              onClose();
            }, 2000);
          } else {
            setError('Error al crear la cuenta. El usuario ya existe.');
          }
        } else {
          setError('Código de verificación incorrecto. Inténtalo de nuevo.');
        }
      }
    } catch (error) {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (mode: AuthMode) => {
    setActiveMode(mode);
    setError('');
    setSuccess('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      verificationCode: ''
    });
  };

  const resendVerificationCode = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess('Código de verificación reenviado a tu email.');
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-black border border-[#f69f16]/30 rounded-2xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#f69f16]">
              {activeMode === 'login' && 'Iniciar Sesión'}
              {activeMode === 'register' && 'Crear Cuenta'}
              {activeMode === 'forgot-password' && 'Recuperar Contraseña'}
              {activeMode === 'verify-email' && 'Verificar Email'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs (solo para login/register) */}
          {(activeMode === 'login' || activeMode === 'register') && (
            <div className="flex mb-6 bg-gray-900/50 rounded-lg p-1">
              <button
                onClick={() => switchMode('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeMode === 'login'
                    ? 'bg-[#f69f16] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => switchMode('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeMode === 'register'
                    ? 'bg-[#f69f16] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Registrarse
              </button>
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-600/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300 text-sm"
            >
              {success}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* LOGIN FORM */}
            {activeMode === 'login' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f69f16] focus:ring-1 focus:ring-[#f69f16] transition-colors"
                    placeholder="Ingresa tu usuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f69f16] focus:ring-1 focus:ring-[#f69f16] transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => switchMode('forgot-password')}
                    className="text-sm text-[#f69f16] hover:text-[#e6950f] transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </>
            )}

            {/* REGISTER FORM */}
            {activeMode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f69f16] focus:ring-1 focus:ring-[#f69f16] transition-colors"
                    placeholder="Elige un nombre de usuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f69f16] focus:ring-1 focus:ring-[#f69f16] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f69f16] focus:ring-1 focus:ring-[#f69f16] transition-colors"
                    placeholder="Mínimo 8 caracteres"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Debe contener al menos una mayúscula, una minúscula y un número
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f69f16] focus:ring-1 focus:ring-[#f69f16] transition-colors"
                    placeholder="Repite tu contraseña"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedCookies}
                      onChange={(e) => setAcceptedCookies(e.target.checked)}
                      className="mt-1 rounded border-gray-600 bg-gray-900 text-[#f69f16] focus:ring-[#f69f16]"
                    />
                    <span className="text-sm text-gray-300">
                      Acepto el uso de cookies para mejorar la experiencia de usuario y análisis del sitio web.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 rounded border-gray-600 bg-gray-900 text-[#f69f16] focus:ring-[#f69f16]"
                    />
                    <span className="text-sm text-gray-300">
                      Acepto los{' '}
                      <a href="#" className="text-[#f69f16] hover:text-[#e6950f] underline">
                        términos y condiciones
                      </a>{' '}
                      y la{' '}
                      <a href="#" className="text-[#f69f16] hover:text-[#e6950f] underline">
                        política de privacidad
                      </a>
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* FORGOT PASSWORD FORM */}
            {activeMode === 'forgot-password' && (
              <>
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-sm">
                    Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f69f16] focus:ring-1 focus:ring-[#f69f16] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    ← Volver al inicio de sesión
                  </button>
                </div>
              </>
            )}

            {/* VERIFY EMAIL FORM */}
            {activeMode === 'verify-email' && (
              <>
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-sm">
                    Hemos enviado un código de verificación de 6 dígitos a{' '}
                    <span className="text-[#f69f16]">{formData.email}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Código de Verificación
                  </label>
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f69f16] focus:ring-1 focus:ring-[#f69f16] transition-colors text-center text-2xl tracking-widest"
                    placeholder="123456"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={resendVerificationCode}
                    disabled={isLoading}
                    className="text-sm text-[#f69f16] hover:text-[#e6950f] transition-colors disabled:opacity-50"
                  >
                    ¿No recibiste el código? Reenviar
                  </button>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f69f16] hover:bg-[#e6950f] text-black font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Procesando...
                </div>
              ) : (
                <>
                  {activeMode === 'login' && 'Iniciar Sesión'}
                  {activeMode === 'register' && 'Crear Cuenta'}
                  {activeMode === 'forgot-password' && 'Enviar Enlace'}
                  {activeMode === 'verify-email' && 'Verificar Código'}
                </>
              )}
            </button>

            {/* NO MOSTRAR CREDENCIALES DE PRUEBA - ELIMINADAS */}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 