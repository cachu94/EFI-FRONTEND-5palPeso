import { X } from "lucide-react";
import { Link } from "react-router-dom";

export function FormularioPage({ titulo, volverA, children }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="formulario-page-titulo"
        className="my-auto w-full max-w-2xl rounded-2xl border border-white/15 bg-white p-5 shadow-2xl dark:bg-surface-container sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Nuevo registro
            </p>
            <h2
              id="formulario-page-titulo"
              className="mt-1 text-xl font-extrabold text-blue-950 dark:text-white sm:text-2xl"
            >
              {titulo}
            </h2>
          </div>
          <Link
            to={volverA}
            aria-label="Cerrar formulario"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X aria-hidden="true" size={20} />
          </Link>
        </div>
        {children}
      </section>
    </div>
  );
}
