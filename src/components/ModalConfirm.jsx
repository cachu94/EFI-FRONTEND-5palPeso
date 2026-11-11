export function ModalConfirm({
  abierto,
  titulo,
  descripcion,
  error = "",
  confirmando = false,
  onCancelar,
  onConfirmar,
}) {
  if (!abierto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-confirmar-titulo"
        className="w-full max-w-md rounded-2xl border border-white/15 bg-white p-6 shadow-2xl dark:bg-surface-container"
      >
        <h2
          id="modal-confirmar-titulo"
          className="text-lg font-bold text-slate-900 dark:text-white"
        >
          {titulo}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {descripcion}
        </p>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
          >
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            disabled={confirmando}
            className="min-h-11 rounded-lg border border-slate-300 px-4 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            disabled={confirmando}
            className="min-h-11 rounded-lg bg-accent-red px-4 font-bold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          >
            {confirmando ? "Eliminando..." : "Eliminar gasto"}
          </button>
        </div>
      </section>
    </div>
  );
}
