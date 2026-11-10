import { CreditCard, Sparkles } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export function Creditos() {
  const tabClass = ({ isActive }) =>
    `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-accent-gold text-surface shadow-md shadow-accent-gold/2"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
    }`;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white dark:bg-surface-container p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Endeudamiento
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Gestión de Créditos
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Control de préstamos, cuotas fijas y simulador de créditos
          </p>
        </div>
      </div>

      {/* Nav a Pestañas */}
      <div className="flex gap-2 bg-slate-200/60 dark:bg-surface p-1.5 rounded-2xl border border-slate-300 dark:border-white/10 w-fit">
        <NavLink to="/creditos" end className={tabClass}>
          <CreditCard className="w-4 h-4" />
          <span>Mis Deudas</span>
        </NavLink>

        <NavLink to="/creditos/simulador" className={tabClass}>
          <Sparkles className="w-4 h-4" />
          <span>Simulador</span>
        </NavLink>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
