import { Link } from "@tanstack/react-router";

import { LOGO_SRC, SITE_NAME } from "./SiteHeader";

const links = [
  { to: "/", label: "O tema" },
  { to: "/formulas", label: "Fórmulas" },
  { to: "/simulador", label: "Simulador" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-sm bg-[#f4f1ea] ring-1 ring-ink-foreground/15">
                <img src={LOGO_SRC} alt="EletroGestão" className="size-full object-contain" />
              </span>
              <p className="font-display text-base font-extrabold">{SITE_NAME}</p>
            </div>
            <p className="mt-3 text-sm text-ink-foreground/70 leading-relaxed">
              A importância do eletromagnetismo na administração de empresas.
            </p>
          </div>

          <nav className="flex flex-col gap-2 md:items-end">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-ink-foreground/70 hover:text-electric transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 md:items-end">
            <p className="tabular text-xs text-electric">E = (P × t) / 1000</p>
            <p className="text-xs text-ink-foreground/70">
              Desenvolvido pelos alunos da disciplina de Eletrogestão
            </p>
            <p className="font-display font-bold text-yellow-400 text-xs tracking-tight md:text-right">
              Criado por Caio Rios, Carlos Neto, David Souza, Davi Hiel e Marcos Antônio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
