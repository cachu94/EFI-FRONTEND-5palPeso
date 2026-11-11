import { CreditCard, Plus, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { InputMoneda } from "../components/InputMoneda";
import { crearCredito, getCuentas } from "../services/creditosService";

export function Creditos() {
  const [cuentas, setCuentas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [actualizaciones, setActualizaciones] = useState(0);

  const [form, setForm] = useState({
    usuario_id: 1,
    cuenta_id: "",
    entidad_acreedora: "",
    descripcion: "",
    precio_contado: "",
    monto_cuota: "",
    total_cuotas: "",
    cuota_actual: 0,
    fecha_inicio: new Date().toISOString().split("T")[0],
  });

  const tabClass = ({ isActive }) =>
    `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-accent-gold text-surface shadow-md shadow-accent-gold/2"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setGuardando(true);
      const payload = {
        usuario_id: 1,
        cuenta_id: form.cuenta_id ? parseInt(form.cuenta_id) : null,
        entidad_acreedora: form.entidad_acreedora,
        descripcion: form.descripcion,
        precio_contado: form.precio_contado
          ? parseFloat(form.precio_contado)
          : null,
        monto_cuota: parseFloat(form.monto_cuota),
        total_cuotas: parseInt(form.total_cuotas),
        cuota_actual: parseInt(form.cuota_actual),
        fecha_inicio: form.fecha_inicio,
      };

      await crearCredito(payload);
      setActualizaciones((p) => p + 1);
      setModalAbierto(false);
      setForm({
        cuenta_id: "",
        entidad_acreedora: "",
        descripcion: "",
        precio_contado: "",
        monto_cuota: "",
        total_cuotas: "",
        cuota_actual: 0,
        fecha_inicio: new Date().toISOString().split("T")[0],
      });
    } catch {
      alert("Error al registrar el crédito. Verifica los datos ingresados");
    } finally {
      setGuardando(false);
    }
  };

  useEffect(() => {
    getCuentas().then(setCuentas).catch(console.error);
  }, []);

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

      {/* Nav a Pestañas y Boton Nuevo Credito*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

        <button
          onClick={() => setModalAbierto(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-accent-gold text-surface hover:bg-accent-gold-hover transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Nuevo Crédito
        </button>
      </div>

      <div className="mt-4">
        <Outlet context={{ actualizaciones }} />
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Dar de Alta Crédito
              </h3>
              <button
                onClick={() => setModalAbierto(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Entidad Acreedora *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Banco Galicia"
                    value={form.entidad_acreedora}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        entidad_acreedora: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Descripción *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Préstamo personal"
                    value={form.descripcion}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        descripcion: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Monto Cuota ($) *
                  </label>
                  <InputMoneda
                    required
                    value={form.monto_cuota}
                    onChange={(val) =>
                      setForm((p) => ({
                        ...p,
                        monto_cuota: val,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Total Cuotas *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    placeholder="12"
                    value={form.total_cuotas}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        total_cuotas: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Cuotas Pagadas - Actual
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.cuota_actual}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, cuota_actual: e.target.value }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Fecha Primer Pago *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.fecha_inicio}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fecha_inicio: e.target.value }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Precio Contado ($) (Opcional)
                  </label>
                  <InputMoneda
                    placeholder="Para cálculo de CFT"
                    value={form.precio_contado}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, precio_contado: e }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Cuenta de Pago (Opcional)
                  </label>
                  <select
                    value={form.cuenta_id}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, cuenta_id: e.target.value }))
                    }
                    className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold"
                  >
                    <option value="">Sin cuenta asignada</option>
                    {cuentas.map((cta) => (
                      <option key={cta.id} value={cta.id}>
                        {cta.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-accent-red  text-slate-50 hover:bg-accent-red/90 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-accent-gold text-surface hover:bg-accent-gold-hover transition cursor-pointer"
                >
                  {guardando ? "Guardando..." : "Crear Crédito"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
