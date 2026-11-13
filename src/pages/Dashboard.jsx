/* eslint-disable react-hooks/set-state-in-effect */
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  PiggyBank,
  TrendingUp,
  UserPlus,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MetricCard } from "../components/MetricCard";
import { getMetricasCiclo } from "../services/metricasService";
import { crearUsuario } from "../services/usuariosService";
import { formatearFecha } from "../utils/formateadores";

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

  const [modalUsuarioAbierto, setModalUsuarioAbierto] = useState(false);
  const [guardandoUsuario, setGuardandoUsuario] = useState(false);
  const [formUsuario, setFormUsuario] = useState({
    nombre: "",
    email: "",
    dia_cobro: 15,
    porcentaje_ahorro: 10,
  });

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      setGuardandoUsuario(true);
      await crearUsuario({
        nombre: formUsuario.nombre,
        email: formUsuario.email,
        dia_cobro: parseInt(formUsuario.dia_cobro, 10),
        porcentaje_ahorro: parseFloat(formUsuario.porcentaje_ahorro),
      });
      alert(`¡Usuario "${formUsuario.nombre}" creado exitosamente!`);
      setModalUsuarioAbierto(false);
      setFormUsuario({
        nombre: "",
        email: "",
        dia_cobro: 15,
        porcentaje_ahorro: 10,
      });
    } catch {
      alert("Error al crear el usuario. Verificá los datos ingresados.");
    } finally {
      setGuardandoUsuario(false);
    }
  };

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
            Período: {formatearFecha(metricas.periodo_inicio)} al{" "}
            {formatearFecha(metricas.periodo_fin)}
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
            <button
              type="button"
              onClick={() => setModalUsuarioAbierto(true)}
              className="w-full text-center py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-white/5 text-slate-800 dark:text-white font-bold rounded-xl text-sm transition border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-amber-500" />
              <span>+ Nuevo Usuario</span>
            </button>
          </div>
        </div>
      </div>

      {modalUsuarioAbierto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Dar de Alta Nuevo Usuario
              </h3>
              <button
                onClick={() => setModalUsuarioAbierto(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCrearUsuario} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Facundo Giacri"
                  value={formUsuario.nombre}
                  onChange={(e) =>
                    setFormUsuario((p) => ({ ...p, nombre: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={formUsuario.email}
                  onChange={(e) =>
                    setFormUsuario((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Día de Cobro *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    required
                    value={formUsuario.dia_cobro}
                    onChange={(e) =>
                      setFormUsuario((p) => ({
                        ...p,
                        dia_cobro: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    % Ahorro Objetivo
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    required
                    value={formUsuario.porcentaje_ahorro}
                    onChange={(e) =>
                      setFormUsuario((p) => ({
                        ...p,
                        porcentaje_ahorro: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setModalUsuarioAbierto(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardandoUsuario}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-400 text-blue-950 hover:bg-amber-500 transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {guardandoUsuario ? "Guardando..." : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
