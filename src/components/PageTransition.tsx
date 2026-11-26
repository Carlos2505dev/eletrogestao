import { useRouterState } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Overlay de transição entre páginas: aparece enquanto o router carrega a próxima rota
 * e some suavemente quando ela está pronta.
 */
export function PageTransition() {
  const isNavigating = useRouterState({ select: (s) => s.isLoading });
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Mantém o overlay visível por um instante mínimo para a transição não "piscar".
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(false), 180);
    return () => clearTimeout(t);
  }, [isNavigating, pathname]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="size-8 animate-spin text-primary" />
        <span className="eyebrow text-muted-foreground">Carregando…</span>
      </div>
    </div>
  );
}
