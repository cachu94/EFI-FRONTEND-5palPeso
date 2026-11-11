export function Pagination({ page, pages, total, onChange }) {
  if (pages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Paginación"
      className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10"
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Página {page} de {pages} · {total} registros
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:text-white"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page >= pages}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:text-white"
        >
          Siguiente
        </button>
      </div>
    </nav>
  );
}
