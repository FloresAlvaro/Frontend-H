import { useAuthStore } from "../stores/auth";
import { useUiStore } from "../stores/ui";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const uiStore = useUiStore();

  authStore.loadFromStorage();
  uiStore.loadTheme();
});
