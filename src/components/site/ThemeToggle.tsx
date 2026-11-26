import { Moon, Sun } from "lucide-react";

/**
 * Alterna a classe .dark no <html> e persiste a escolha no localStorage.
 * Os ícones são controlados só pelo CSS (variante dark), então não há divergência
 * de hidratação entre servidor e cliente.
 */
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.toggle("dark");
  try {
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    /* armazenamento indisponível: segue apenas a classe */
  }
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar modo escuro"
      title="Alternar modo escuro"
      className="grid size-9 place-items-center rounded-sm border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
}
