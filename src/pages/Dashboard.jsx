/* eslint-disable react-hooks/set-state-in-effect */
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MetricCard } from "../components/MetricCard";
import { getMetricasCiclo } from "../services/metricasService";

const formatearMoneda = (monto) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(monto || 0);
};

export function Dashboard() {
  const [metricas, setMetricas] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await getMetricasCiclo(1); // Usuario ID 1 por defecto
      setMetricas(datos);
    } catch (err) {
      console.error("Error cargando el dashboard:", err);
      setError("No se pudo conectar con el servidor backend en la nube.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  if (cargando) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
          Calculando métricas del ciclo financiero...
        </p>
      </div>
    );
  }

  if (error || !metricas) {
    return (
      <div className="py-16 px-4 text-center">
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-6 rounded-2xl max-w-md mx-auto shadow-lg">
          <p className="font-bold text-lg mb-1">Error de sincronización</p>
          <p className="text-xs text-red-600 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={cargarDatos}
            className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
          >
            Reintentar Conexión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Encabezado del Ciclo Actual */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-surface-container p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400">
            Ciclo Mensual en Curso
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white mt-1">
            Resumen Financiero
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Período: {metricas.periodo_inicio} al {metricas.periodo_fin}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-surface-header px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 w-fit">
          <Calendar className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <span className="text-sm font-bold text-slate-800 dark:text-white">
            Quedan{" "}
            <strong className="text-amber-500 dark:text-amber-400">
              {metricas.dias_restantes}
            </strong>{" "}
            días para el cobro
          </span>
        </div>
      </div>
      {/* Grilla de 4 Métricas Clave (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          titulo="Presupuesto Diario"
          valor={formatearMoneda(metricas.presupuesto_diario_dinamico)}
          subtitulo="Límite sugerido por día para no tener déficit"
          icono={Calendar}
          variante="hero"
        />
        <MetricCard
          titulo="Superávit Operativo"
          valor={formatearMoneda(metricas.superavit_operativo)}
          subtitulo="Ingresos menos gastos fijos y cuotas"
          icono={TrendingUp}
        />
        <MetricCard
          titulo="Saldo Libre Remanente"
          valor={formatearMoneda(metricas.saldo_disponible_remanente)}
          subtitulo="Disponible descontando gastos diarios"
          icono={Wallet}
        />
        <MetricCard
          titulo="Ahorro Programado"
          valor={formatearMoneda(metricas.ahorro_programado)}
          subtitulo="Reserva protegida del ciclo"
          icono={PiggyBank}
        />
      </div>
      {/* Desglose de Flujo de Fondos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Tarjetas de Flujo */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-container p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-blue-950 dark:text-white">
            Estructura del Presupuesto
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                <span>Ingresos Totales</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {formatearMoneda(metricas.ingresos_totales)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                <span>Gastos Fijos Comprometidos</span>
                <ArrowDownRight className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
                {formatearMoneda(metricas.gastos_fijos_totales)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                <span>Cuotas de Créditos Activos</span>
                <CreditCard className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                {formatearMoneda(metricas.cuotas_deudas_totales)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                <span>Gastos Diarios del Mes</span>
                <ArrowDownRight className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
                {formatearMoneda(metricas.gastos_diarios_acumulados)}
              </p>
            </div>
          </div>
        </div>
        {/* Columna Derecha: Acciones Rápidas */}
        <div className="bg-white dark:bg-surface-container p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-blue-950 dark:text-white mb-2 text-center">
              Acciones Rápidas
            </h2>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link
              to="/gastos-diarios"
              className="w-full text-center py-3 px-4 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold rounded-xl text-sm transition shadow-sm"
            >
              + Registrar Gasto Diario
            </Link>
            <Link
              to="/ingresos"
              className="w-full text-center py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-white/5 text-slate-800 dark:text-white font-bold rounded-xl text-sm transition border border-slate-200 dark:border-white/10"
            >
              + Nuevo Ingreso
            </Link>
            <Link
              to="/creditos/simulador"
              className="w-full text-center py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-white/5 text-slate-800 dark:text-white font-bold rounded-xl text-sm transition border border-slate-200 dark:border-white/10"
            >
              Simular Nuevo Crédito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
