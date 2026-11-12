import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-5palpeso.png";
import { useTema } from "../context/ThemeContext";

export function Navbar() {
  const { tema, cambiarTema } = useTema();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 md:py-1.5 rounded-xl md:rounded-lg text-sm font-semibold transition-all duration-200 block md:inline-block ${
      isActive
        ? "bg-amber-400 text-blue-950 font-bold shadow-md shadow-amber-400/20"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
    }`;

  const cerrarMenu = () => setMenuAbierto(false);

  const enlaces = [
    { to: "/", label: "Dashboard" },
    { to: "/gastos-diarios", label: "Gastos Diarios" },
    { to: "/gastos-fijos", label: "Gastos Fijos" },
    { to: "/ingresos", label: "Ingresos" },
    { to: "/creditos", label: "Créditos" },
    { to: "/cuentas", label: "Cuentas" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-surface text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          onClick={cerrarMenu}
          className="flex items-center gap-2.5 group"
        >
          {/* Logo oficial */}
          <img
            src={logo}
            alt="Logo 5palPeso"
            className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg leading-tight tracking-tight text-blue-950 dark:text-white">
              5pal
              <span className="text-amber-500 dark:text-amber-400">Peso</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Finanzas Personales
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200 dark:border-white/5">
          {enlaces.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={cambiarTema}
            type="button"
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-surface-container hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-amber-500 dark:text-amber-400"
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

          <button
            type="button"
            onClick={() => setMenuAbierto((prev) => !prev)}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-surface-container text-slate-700 dark:text-slate-200 transition cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            {menuAbierto ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-surface/95 backdrop-blur-md px-4 py-3 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          {enlaces.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={cerrarMenu}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
