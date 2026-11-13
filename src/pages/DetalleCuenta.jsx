/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  User,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCuentaById } from "../services/cuentasService";

export function DetalleCuenta() {
  const { id } = useParams();
  const [cuenta, setCuenta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const cargar = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await getCuentaById(id);
      setCuenta(data);
    } catch {
      setError("No se pudo cargar el detalle de la cuenta.");
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    cargar();
  }, [id]);
  if (cargando) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
          Cargando detalle de la cuenta...
        </p>
      </div>
    );
  }
  if (error || !cuenta) {
    return (
      <div className="py-16 text-center">
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-6 rounded-2xl max-w-md mx-auto">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="font-bold text-lg mb-1">Cuenta no disponible</p>
          <p className="text-xs text-red-600 dark:text-red-300 mb-4">{error}</p>
          <Link
            to="/cuentas"
            className="inline-flex items-center gap-1.5 bg-amber-400 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a Cuentas
          </Link>
        </div>
      </div>
    );
  }
  const esBilletera = cuenta.tipo_cuenta.toLowerCase().includes("billetera");
  const Icono = esBilletera ? Wallet : Building2;
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link
        to="/cuentas"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Cuentas
      </Link>
      <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <span className="rounded-2xl bg-amber-400/10 border border-amber-400/30 p-3.5 text-amber-500">
              <Icono className="w-8 h-8" />
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {cuenta.entidad}
                </span>
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    cuenta.activo
                      ? "bg-emerald-50 text-emerald-600 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-500 border-slate-300"
                  }`}
                >
                  {cuenta.activo ? "Cuenta Activa" : "Inactiva"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {cuenta.nombre}
              </h1>
            </div>
          </div>
        </div>
        {/* Tarjetas de información */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
            <span className="text-xs text-slate-400 block mb-1 font-medium">
              Tipo de Medio
            </span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white uppercase">
              {cuenta.tipo_cuenta.replaceAll("_", " ")}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
            <span className="text-xs text-slate-400 block mb-1 font-medium">
              Entidad
            </span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">
              {cuenta.entidad}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
            <span className="text-xs text-slate-400 block mb-1 font-medium">
              Titular / Usuario
            </span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-500" />
              {cuenta.usuario?.nombre || `Usuario #${cuenta.usuario_id}`}
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            Esta cuenta está habilitada para registrar ingresos, vincular
            débitos automáticos y amortizar cuotas fijas.
          </span>
        </div>
      </div>
    </div>
  );
}
