/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Edit,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  actulizarCredito,
  getCreditoPorId,
  pagarCuota,
} from "../services/creditosService";
import { formatearFecha, formatearMoneda } from "../utils/formateadores";

export function DetalleCredito() {
  const { id } = useParams();

  const [credito, setCredito] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [pagando, setPagando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [formEdicion, setFormEdicion] = useState({
    descripcion: "",
    monto_cuota: "",
  });

  const cargarDetalle = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await getCreditoPorId(id);
      setCredito(datos);
      setFormEdicion({
        descripcion: datos.descripcion,
        monto_cuota: datos.monto_cuota,
      });
    } catch {
      setError("Error al cargar el detalle del crédito");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  const handlePagarCuota = async () => {
    try {
      setPagando(true);
      const creditoActualizado = await pagarCuota(id);
      setCredito((prev) => ({
        ...prev,
        cuota_actual: creditoActualizado.cuota_actual,
        estado: creditoActualizado.estado,
      }));
    } catch {
      alert("No se pudo registrar el pago");
    } finally {
      setPagando(false);
    }
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        descripcion: formEdicion.descripcion,
        monto_cuota: parseFloat(formEdicion.monto_cuota),
      };
      const creditoActualizado = await actulizarCredito(id, payload);
      setCredito((prev) => ({
        ...prev,
        descripcion: creditoActualizado.descripcion,
        monto_cuota: creditoActualizado.monto_cuota,
      }));
      setEditando(false);
    } catch {
      alert("No se pudo actualizar el crédito");
    }
  };

  if (cargando) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
          Cargando detalle del crédito{" "}
          <span className="text-accent-gold">{credito?.descripcion}</span> ...
        </p>
      </div>
    );
  }

  if (error || !credito) {
    return (
      <div className="py-16 text-center">
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-6 rounded-2xl max-w-md mx-auto">
          <AlertCircle className="w-8 h-8 text-accent-red mx-auto mb-2" />
          <p className="font-bold text-lg mb-1">Crédito no disponible</p>
          <p className="text-xs text-red-600 dark:text-red-300 mb-4">{error}</p>
          <Link
            to="/creditos"
            className="inline-flex items-center gap-1.5 bg-accent-gold text-surface font-bold px-4 py-2 rounded-xl text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Listado
          </Link>
        </div>
      </div>
    );
  }

  const esFinalizado =
    credito.estado === "finalizada" ||
    credito.cuota_actual >= credito.total_cuotas;
  const progreso = Math.min(
    Math.round((credito.cuota_actual / credito.total_cuotas) * 100),
    100,
  );
  const cuotasRestantes = Math.max(
    credito.total_cuotas - credito.cuota_actual,
    0,
  );
  const saldoRestante = credito.monto_cuota * cuotasRestantes;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/creditos"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
      >
        <ArrowLeft /> Volver a Créditos
      </Link>
      <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent-gold bg-accent-gold/10 px-2.5 py-0.5 rounded-full border border-accent-gold/30">
                {credito.entidad_acreedora}
              </span>
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  esFinalizado
                    ? "bg-red-50 text-red-600 border-red-300 dark:bg-red-950/40 dark:text-red-400"
                    : "bg-emerald-50 text-emerald-600 border-emerald-300 dark:bg-emerald-950/40 dark:text-accent-green"
                }`}
              >
                {esFinalizado ? "Deuda Cancelada" : "Credito Activo"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {credito.descripcion}
            </h1>
          </div>

          <button
            onClick={() => setEditando(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition cursor-pointer w-fit"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>
        {/* Metricas del credito */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
            <span className="text-xs text-slate-400 block mb-1 font-medium">
              Cuota Mensual
            </span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums flex items-center justify-center gap-1.5">
              {formatearMoneda(credito.monto_cuota)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
            <span className="text-xs text-slate-400 block mb-1 font-medium">
              Saldo Restante
            </span>
            <p className="text-2xl font-extrabold text-accent-red tabular-nums flex items-center justify-center gap-1.5">
              {formatearMoneda(saldoRestante)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
            <span className="text-xs text-slate-400 block mb-1 font-medium">
              Fecha Inicio
            </span>
            <p className="text-2xl font-extrabold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5">
              <Calendar className="w-4 h-4 text-surface dark:text-accent-gold" />
              {formatearFecha(credito.fecha_inicio)}
            </p>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-surface p-6 rounded-2xl border border-slate-200 dark:border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Estado de Amortización
              </h3>
              <p className="text-xs text-slate-400">
                LLevas pagadas <strong>{credito.cuota_actual}</strong> de{" "}
                <strong>{credito.total_cuotas}</strong> cuotas
              </p>
            </div>
            {!esFinalizado ? (
              <button
                onClick={handlePagarCuota}
                disabled={pagando}
                className="py-2.5 px-5  bg-accent-gold hover:bg-accent-gold-hover text-surface font-extrabold text-xs rounded-xl shadow-md shadow-accent-gold/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                {pagando ? "Procesando..." : "Pagar"}
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Pagado
              </span>
            )}
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-accent-gold h-3 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        {credito.cuenta && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5 text-xs">
            <Wallet className="w-5 h-5 text-accent-gold shrink-0" />
            <div>
              <span className="text-slate-400 block font-medium">
                Cuenta en la que se debita:
              </span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm  uppercase">
                {credito.cuenta.nombre} ({credito.cuenta.tipo_cuenta})
              </strong>
            </div>
          </div>
        )}
      </div>
      {editando && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Editando Crédito
            </h3>
            <form onSubmit={handleEditar} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  value={formEdicion.descripcion}
                  onChange={(e) =>
                    setFormEdicion((p) => ({
                      ...p,
                      descripcion: e.target.value,
                    }))
                  }
                  required
                  className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Monto Cuota
                </label>
                <input
                  type="number"
                  step="any"
                  value={formEdicion.monto_cuota}
                  onChange={(e) =>
                    setFormEdicion((p) => ({
                      ...p,
                      monto_cuota: e.target.value,
                    }))
                  }
                  required
                  className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormEdicion({
                      descripcion: credito.descripcion,
                      monto_cuota: credito.monto_cuota,
                    });
                    setEditando(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-accent-red  text-slate-50 hover:bg-accent-red/90 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-accent-gold text-surface hover:bg-accent-gold-hover transition cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
