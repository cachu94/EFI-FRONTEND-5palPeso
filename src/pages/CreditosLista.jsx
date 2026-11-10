/* eslint-disable react-hooks/set-state-in-effect */
import { AlertCircle, CreditCard, ExternalLink, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eliminarCredito, getCreditos } from "../services/creditosService";

const formatearMoneda = (monto) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(monto || 0);
};

export function CreditosLista() {
  const [creditos, setCreditos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarCreditos = async () => {
    try {
      setCargando(true);
      setError(null);
      const lista = await getCreditos(1);
      setCreditos(lista);
    } catch (err) {
      console.error("Error al cargar créditos:", err);
      setError("No se pudieron cargar los créditos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCreditos();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este crédito?",
    );
    if (!confirmar) return;

    try {
      await eliminarCredito(id);
      setCreditos((prev) => prev.filter((credito) => credito.id !== id));
    } catch {
      alert("Error al eliminar el crédito. Intentelo nuevamente.");
    }
  };

  if (cargando) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
          Cargando tus deudas y cuotas...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-6 rounded-2xl max-w-md mx-auto">
          <AlertCircle className="w-8 h-8 text-accent-red mx-auto mb-2" />
          <p className="font-bold text-lg mb-1">Error al obtener créditos</p>
          <p className="text-xs text-red-600 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={cargarCreditos}
            className="bg-accent-gold hover:bg-accent-gold-hover text-surface font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (creditos.length === 0) {
    return (
      <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-10 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 dark:bg-surface rounded-full flex items-center justify-center mx-auto text-accent-gold">
          <CreditCard className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            No tenés créditos registrados.
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            tu capacidad de endeudamiento está disponible para nuevos créditos.
          </p>
        </div>
        <div>
          <Link
            to="/creditos/simulador"
            className="inline-flex items-center gap-2 bg-accent-gold hover:bg-accent-gold-hover text-surface font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm"
          >
            Simular Crédito
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {creditos.map((c) => {
        const progreso = Math.min(
          Math.round((c.cuota_actual / c.total_cuotas) * 100),
          100,
        );
        const cuotasRestantes = Math.max(c.total_cuotas - c.cuota_actual, 0);
        const saldoRestante = c.monto_cuota * cuotasRestantes;

        return (
          <div
            key={c.id}
            className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-accent-gold/40 transition-all duration-200"
          >
            <div>
              {/* Encabezado de la Tarjeta */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded-full border border-accent-gold/30">
                    {c.entidad_acreedora}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                    {c.descripcion}
                  </h3>
                </div>
                <button
                  onClick={() => handleEliminar(c.id)}
                  className="p-2 text-slate-400 hover:text-accent-red hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition cursor-pointer"
                  title="Eliminar crédito"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Monto de la cuota */}
              <div className="my-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">
                  Cuota Mensual
                </span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {formatearMoneda(c.monto_cuota)}
                </p>
              </div>

              {/* Progreso de pagos */}
              <div className="space-y-1.5 my-3">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>
                    Cuota {c.cuota_actual} de {c.total_cuotas}
                  </span>
                  <span className="text-accent-gold font-bold">
                    {progreso}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-surface rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-accent-gold h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progreso}%` }}
                  />
                </div>
              </div>

              {/* Saldo remanente */}
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/5 flex justify-between">
                <span>Saldo a pagar:</span>
                <span className="font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                  {formatearMoneda(saldoRestante)}
                </span>
              </div>
            </div>

            {/* Link a Ruta Dinamica (/credito/:id) */}
            <div className="pt-4 mt-2">
              <Link
                to={`/creditos/${c.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-white/5 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition border border-slate-200 dark:border-white/10"
              >
                <span>Ver crédito</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
