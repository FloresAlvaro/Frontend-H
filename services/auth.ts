import type { UserRole } from "~~/types";

/**
 * Servicio de autenticación
 */
export const useAuthService = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const api = useApiClient();
  const uiStore = useUiStore();

  const login = async (email: string, password: string) => {
    try {
      uiStore.setLoading(true);
      const response = await api.login({ email, password });

      if (response.success && response.data) {
        authStore.setAuth(response.data.user, response.data.token);
        uiStore.success("Sesión iniciada correctamente");
        await router.push("/");
        return response.data;
      }
    } catch (error: unknown) {
      authStore.setError("Email o contraseña incorrectos");
      uiStore.error("Email o contraseña incorrectos");
      throw error;
    } finally {
      uiStore.setLoading(false);
    }
  };

  const logout = () => {
    authStore.logout();
    router.push("/auth/login");
    uiStore.success("Sesión cerrada");
  };

  const getProfile = async () => {
    try {
      const response = await api.getProfile();

      if (response.success && response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Error obteniendo perfil:", error);
      throw error;
    }
  };

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!authStore.user) return false;

    if (Array.isArray(role)) {
      return role.includes(authStore.user.role);
    }

    return authStore.user.role === role;
  };

  return {
    login,
    logout,
    getProfile,
    hasRole,
    isAuthenticated: computed(() => authStore.isAuthenticated),
    user: computed(() => authStore.user),
  };
};
