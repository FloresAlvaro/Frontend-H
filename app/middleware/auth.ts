/**
 * Middleware de autenticación
 * Protege rutas que requieren usuario autenticado
 * Redirige a login si no está autenticado
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const router = useRouter();

  // ==================== RUTAS PÚBLICAS ====================
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];

  // ==================== LÓGICA ====================

  // Si está en ruta pública y ya está autenticado, redirigir a home
  if (publicRoutes.includes(to.path) && authStore.isAuthenticated) {
    return navigateTo('/');
  }

  // Si intenta acceder a ruta privada sin autenticación
  if (!publicRoutes.includes(to.path) && !authStore.isAuthenticated) {
    // Guardar URL destino para redirigir después de login
    const redirectUrl = to.fullPath;
    sessionStorage.setItem('redirectUrl', redirectUrl);

    // Redirigir a login
    return navigateTo('/auth/login');
  }

  // Si está autenticado pero el token es inválido
  if (authStore.isAuthenticated && !authStore.token) {
    authStore.logout();
    return navigateTo('/auth/login');
  }
});