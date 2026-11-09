export function MetricCard({
  titulo,
  valor,
  subtitulo,
  icono: Icono,
  varainte = "normal",
}) {
  const esHero = varainte === "hero";

  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-200 ${
        esHero
          ? "bg-amber-400 text-blue-950 border-amber-300 shadow-lg shadow-amber-400/10"
          : "bg-white dark:bg-surface-container text-slate-800 dark:text-white border-slate-200 dark:border-white/10 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-bold uppercase tracking-wider ${
            esHero ? "text-blue-950/80" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {titulo}
        </span>
        {Icono && (
          <div
            className={`p-2 rounded-xl ${
              esHero
                ? "bg-blue-950 text-amber-400"
                : "bg-slate-100 dark:bg-surface-header text-amber-500 dark:text-amber-400"
            }`}
          >
            <Icono className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="text-3xl font-extrabold tracking-tight tabular-nums mb-1">
        {valor}
      </div>
      {subtitulo && (
        <p
          className={`text-xs font-medium ${
            esHero
              ? "text-blue-950/80 font-bold"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {subtitulo}
        </p>
      )}
    </div>
  );
}
