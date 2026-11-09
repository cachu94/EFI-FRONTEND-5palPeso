import { Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-5palpeso.png";
import { useTema } from "../context/ThemeContext";

export function Navbar() {
  const { tema, cambiarTema } = useTema();

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-amber-400 text-blue-950 font-bold shadow-md shadow-amber-400/20"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-surface text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* Logo oficial */}
          <img
            src={logo}
            alt="Logo 5palPeso"
            className="h-15 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg leading-tight tracking-tight text-blue-950 dark:text-white">
              5pal
              <span className="text-amber-500 dark:text-amber-400">Peso</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-400">
              Finanzas Personales
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200 dark:border-white/5">
          <NavLink to="/" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/gastos-diarios" className={navLinkClass}>
            Gastos Diarios
          </NavLink>
          <NavLink to="/gastos-fijos" className={navLinkClass}>
            Gastos Fijos
          </NavLink>
          <NavLink to="/ingresos" className={navLinkClass}>
            Ingresos
          </NavLink>
          <NavLink to="/creditos" className={navLinkClass}>
            Créditos
          </NavLink>
          <NavLink to="/cuentas" className={navLinkClass}>
            Cuentas
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={cambiarTema}
            type="button"
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-surface-container hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer text-amber-500 dark:text-amber-400"
            title={
              tema === "dark" ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"
            }
          >
            {tema === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5 text-blue-950" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
