import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "./ThemeToggle";

export const SITE_NAME = "Eletrogestão";
export const LOGO_SRC = "/logo.jpg";

const links = [
  { to: "/", label: "O tema" },
  { to: "/formulas", label: "Fórmulas" },
  { to: "/simulador", label: "Simulador" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center overflow-hidden rounded-sm bg-[#f4f1ea] ring-1 ring-border">
            <img src={LOGO_SRC} alt="EletroGestão" className="size-full object-contain" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">{SITE_NAME}</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                className="rounded-sm px-3 py-2 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:font-semibold data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
