/**
 * Funciones de validación
 * Nota: También están en useValidation(), esto es como alternativa
 */

/**
 * Validar email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar teléfono boliviano
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+591|0)?[2-9]\d{7,8}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Validar documento (cédula boliviana)
 */
export const isValidDocument = (document: string): boolean => {
  const docRegex = /^[0-9]{7,8}$/;
  return docRegex.test(document.replace(/\D/g, ''));
};

/**
 * Validar contraseña fuerte
 */
export const isStrongPassword = (password: string): boolean => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*]/.test(password)) return false;
  return true;
};

/**
 * Validar URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validar campo requerido
 */
export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
};

/**
 * Validar longitud
 */
export const isValidLength = (value: string, min: number, max: number): boolean => {
  return value.length >= min && value.length <= max;
};

/**
 * Validar número
 */
export const isValidNumber = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Validar número positivo
 */
export const isPositiveNumber = (value: any): boolean => {
  return isValidNumber(value) && parseFloat(value) > 0;
};

/**
 * Validar rango de números
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validar fecha válida
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Validar fecha futura
 */
export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date > new Date();
};

/**
 * Validar fecha pasada
 */
export const isPastDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date < new Date();
};

/**
 * Validar rango de fechas
 */
export const isValidDateRange = (startDate: string, endDate: string): boolean => {
  if (!isValidDate(startDate) || !isValidDate(endDate)) return false;
  return new Date(startDate) < new Date(endDate);
};

/**
 * Validar edad mínima
 */
export const isMinAge = (birthDate: string, minAge: number): boolean => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minAge;
  }

  return age >= minAge;
};

/**
 * Validar tarjeta de crédito (Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validar objeto contra schema
 */
export const validateObject = (
  obj: Record<string, any>,
  schema: Record<string, (value: any) => boolean>
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    const validator = schema[key];
    if (!validator(obj[key])) {
      errors[key] = `Validación fallida para ${key}`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};