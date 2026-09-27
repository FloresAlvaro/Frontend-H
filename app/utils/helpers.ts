/**
 * Funciones auxiliares de lógica común
 */

// ==================== CÁLCULOS ====================

/**
 * Calcular número de noches entre dos fechas
 */
export const calculateNights = (checkIn: string | Date, checkOut: string | Date): number => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

/**
 * Calcular precio total de reserva
 */
export const calculateTotalPrice = (
  pricePerNight: number,
  checkIn: string | Date,
  checkOut: string | Date,
  discountPercent = 0
): number => {
  const nights = calculateNights(checkIn, checkOut);
  const subtotal = pricePerNight * nights;
  const discount = (subtotal * discountPercent) / 100;
  return subtotal - discount;
};

/**
 * Calcular ocupación porcentual
 */
export const calculateOccupancyRate = (occupied: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((occupied / total) * 100);
};

/**
 * Calcular promedio
 */
export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

/**
 * Calcular descuento
 */
export const calculateDiscount = (original: number, discountPercent: number): number => {
  return (original * discountPercent) / 100;
};

// ==================== CONVERSIONES ====================

/**
 * Convertir booleano a sí/no
 */
export const booleanToText = (value: boolean, trueText = 'Sí', falseText = 'No'): string => {
  return value ? trueText : falseText;
};

/**
 * Convertir array a objeto clave-valor
 */
export const arrayToObject = <T extends Record<string, any>>(
  array: T[],
  keyField: keyof T
): Record<string | number, T> => {
  return array.reduce(
    (obj, item) => {
      obj[item[keyField] as any] = item;
      return obj;
    },
    {} as Record<string | number, T>
  );
};

/**
 * Convertir objeto a array
 */
export const objectToArray = <T extends Record<string, any>>(obj: T): T[keyof T][] => {
  return Object.values(obj);
};

/**
 * Combinar arrays eliminando duplicados
 */
export const mergeArraysUnique = <T>(array1: T[], array2: T[]): T[] => {
  return [...new Set([...array1, ...array2])];
};

// ==================== OPERACIONES CON ARRAYS ====================

/**
 * Agrupar array por propiedad
 */
export const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string | number, T[]> => {
  return array.reduce(
    (groups, item) => {
      const groupKey = item[key];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string | number, T[]>
  );
};

/**
 * Encontrar duplicados en array
 */
export const findDuplicates = <T>(array: T[]): T[] => {
  return array.filter((item, index) => array.indexOf(item) !== index);
};

/**
 * Remover duplicados de array
 */
export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

/**
 * Ordenar array alfabéticamente
 */
export const sortAlphabetically = (array: string[]): string[] => {
  return [...array].sort((a, b) => a.localeCompare(b, 'es'));
};

/**
 * Invertir array sin mutar el original
 */
export const reverseArray = <T>(array: T[]): T[] => {
  return [...array].reverse();
};

/**
 * Obtener últimos N elementos
 */
export const getLastN = <T>(array: T[], n: number): T[] => {
  return array.slice(-n);
};

/**
 * Obtener primeros N elementos
 */
export const getFirstN = <T>(array: T[], n: number): T[] => {
  return array.slice(0, n);
};

/**
 * Partir array en chunks
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Intercalar dos arrays
 */
export const interleave = <T>(array1: T[], array2: T[]): T[] => {
  const result: T[] = [];
  const maxLength = Math.max(array1.length, array2.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < array1.length) result.push(array1[i]);
    if (i < array2.length) result.push(array2[i]);
  }

  return result;
};

// ==================== BÚSQUEDA Y FILTRO ====================

/**
 * Buscar en array por múltiples campos
 */
export const searchInArray = <T extends Record<string, any>>(
  array: T[],
  query: string,
  fields: (keyof T)[]
): T[] => {
  const lowerQuery = query.toLowerCase();
  return array.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerQuery);
      }
      if (typeof value === 'number') {
        return value.toString().includes(lowerQuery);
      }
      return false;
    })
  );
};

/**
 * Filtrar array por rango de números
 */
export const filterByRange = <T extends Record<string, any>>(
  array: T[],
  field: keyof T,
  min: number,
  max: number
): T[] => {
  return array.filter((item) => {
    const value = item[field] as number;
    return value >= min && value <= max;
  });
};

/**
 * Filtrar por múltiples criterios
 */
export const filterByMultiple = <T extends Record<string, any>>(
  array: T[],
  criteria: Record<keyof T, any>
): T[] => {
  return array.filter((item) =>
    Object.keys(criteria).every((key) => item[key as keyof T] === criteria[key as keyof T])
  );
};

// ==================== GENERADORES ====================

/**
 * Generar ID único
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generar UUID v4
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Generar número aleatorio en rango
 */
export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generar color hexadecimal aleatorio
 */
export const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

/**
 * Generar confirmación de reserva
 */
export const generateConfirmationNumber = (): string => {
  const prefix = 'RES';
  const date = new Date();
  const dateStr = date.getFullYear().toString().slice(-2) + String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `${prefix}${dateStr}${random}`;
};

// ==================== PAUSAS Y DELAYS ====================

/**
 * Esperar N milisegundos
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Debounce
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Retry con exponential backoff
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(delayMs * Math.pow(2, i));
    }
  }
  throw new Error('Max retries alcanzado');
};

// ==================== OPERACIONES CON OBJETOS ====================

/**
 * Hacer deep copy de objeto
 */
export const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Hacer merge shallow de objetos
 */
export const mergeObjects = <T extends Record<string, any>>(
  ...objects: T[]
): T => {
  return Object.assign({}, ...objects);
};

/**
 * Hacer merge deep de objetos
 */
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T => {
  const output = { ...target };

  Object.keys(source).forEach((key) => {
    if (source[key as keyof T] && typeof source[key as keyof T] === 'object') {
      output[key as keyof T] = deepMerge(
        target[key as keyof T] || {},
        source[key as keyof T]
      );
    } else {
      output[key as keyof T] = source[key as keyof T]!;
    }
  });

  return output;
};

/**
 * Omitir propiedades de objeto
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

/**
 * Seleccionar propiedades de objeto
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
};

// ==================== COMPARACIONES ====================

/**
 * Comparar si dos objetos son iguales
 */
export const isEqual = <T>(obj1: T, obj2: T): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * Verificar si es vacío
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Verificar si objeto tiene propiedad
 */
export const hasProperty = <T extends Record<string, any>>(
  obj: T,
  prop: string
): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

// ==================== URL Y QUERYSTRING ====================

/**
 * Construir query string desde objeto
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  return queryParams.toString();
};

/**
 * Parsear query string a objeto
 */
export const parseQueryString = (queryString: string): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};

/**
 * Agregar parámetros a URL
 */
export const addQueryParams = (url: string, params: Record<string, any>): string => {
  const urlObj = new URL(url);
  const queryString = buildQueryString(params);

  if (queryString) {
    urlObj.search = queryString;
  }

  return urlObj.toString();
};