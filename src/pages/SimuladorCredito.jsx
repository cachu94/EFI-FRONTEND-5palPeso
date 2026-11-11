import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import { simularCredito } from "../services/creditosService";

const formatearMoneda = (monto) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(monto || 0);
};

export function SimuladorCredito() {
  const [formulario, setFormulario] = useState({
    montoCuota: "",
    totalCuotas: "12",
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [errorApi, setErrorApi] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};
    const monto = parseFloat(formulario.montoCuota);

    if (!formulario.montoCuota || isNaN(monto) || monto <= 0) {
      nuevosErrores.montoCuota = "Ingrese un monto válido y mayor a $0";
    }

    const cuotas = parseInt(formulario.totalCuotas, 10);
    if (!formulario.totalCuotas || isNaN(cuotas) || cuotas <= 0) {
      nuevosErrores.totalCuotas = "Ingrese un número válido de cuotas";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      setCargando(true);
      setErrorApi(null);

      const payload = {
        monto_cuota_simulada: parseFloat(formulario.montoCuota),
        total_cuotas_simuladas: parseInt(formulario.totalCuotas, 10),
      };

      const proyeccion = await simularCredito(1, payload);
      setResultado(proyeccion);
    } catch {
      setErrorApi("Ocurrió un error al simular el crédito");
    } finally {
      setCargando(false);
    }
  };

  const ajustarCuotas = (delta) => {
    const actual = parseInt(formulario.totalCuotas, 10) || 1;
    const nuevo = Math.max(1, actual + delta); // No permitimos menos de 1 cuota
    setFormulario((prev) => ({ ...prev, totalCuotas: nuevo.toString() }));
    if (errores.totalCuotas) {
      setErrores((prev) => ({ ...prev, totalCuotas: null }));
    }
  };
  // Selección rápida desde los chips
  const seleccionarCuotaRapida = (meses) => {
    setFormulario((prev) => ({ ...prev, totalCuotas: meses.toString() }));
    if (errores.totalCuotas) {
      setErrores((prev) => ({ ...prev, totalCuotas: null }));
    }
  };

  const primerMes = resultado?.[0];
  const esSaludable = primerMes
    ? primerMes.indice_endeudamiento_dti <= 35
    : true;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm h-fit space-y-5">
        <div className="flex items-center gap-2.5 text-accent-gold">
          <Calculator className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Parámetros del Crédito
          </h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Simulá una compra en cuotas o préstamo antes de tomarlo para ver si tu
          presupuesto mensual lo soporta sin caer en déficit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Monto de la Cuota
            </label>
            <input
              type="number"
              name="montoCuota"
              value={formulario.montoCuota}
              onChange={handleChange}
              placeholder="Ej: 25000"
              className={`w-full bg-slate-50 dark:bg-surface border rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none transition tabular-nums 
                ${
                  errores.montoCuota
                    ? "border-accent-red focus:border-accent-red"
                    : "border-slate-200 dark:border-white/10 focus:border-accent-gold"
                }`}
            />
            {errores.montoCuota && (
              <p className="text-xs text-accent-red mt-1 font-medium">
                {errores.montoCuota}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Plazo de Pago (Meses)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => ajustarCuotas(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-white/10 text-slate-800 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-white/10 transition cursor-pointer select-none"
                title="Restar 1 cuota"
              >
                -
              </button>
              <div className="relative flex-1">
                <input
                  type="number"
                  name="totalCuotas"
                  min="1"
                  value={formulario.totalCuotas}
                  onChange={handleChange}
                  placeholder="Ej: 12"
                  className={`w-full text-center bg-slate-50 dark:bg-surface border rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:outline-none transition tabular-nums ${
                    errores.totalCuotas
                      ? "border-accent-red focus:border-accent-red"
                      : "border-slate-200 dark:border-white/10 focus:border-accent-gold"
                  }`}
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 pointer-events-none">
                  meses
                </span>
              </div>
              <button
                type="button"
                onClick={() => ajustarCuotas(1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-white/10 text-slate-800 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-white/10 transition cursor-pointer select-none"
                title="Sumar 1 cuota"
              >
                +
              </button>
            </div>

            {errores.totalCuotas && (
              <p className="text-xs text-accent-red font-medium">
                {errores.totalCuotas}
              </p>
            )}

            <div className="pt-1">
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                Opciones frecuentes:
              </span>
              <div className="grid grid-cols-6 gap-1.5">
                {[3, 6, 12, 18, 24, 36].map((meses) => {
                  const estaActivo =
                    formulario.totalCuotas === meses.toString();
                  return (
                    <button
                      key={meses}
                      type="button"
                      onClick={() => seleccionarCuotaRapida(meses)}
                      className={`py-1.5 rounded-xl text-xs font-extrabold transition-all duration-150 border cursor-pointer select-none ${
                        estaActivo
                          ? "bg-accent-gold text-surface border-accent-gold shadow-sm shadow-accent-gold/20 scale-[1.02]"
                          : "bg-slate-50 dark:bg-surface text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-accent-gold/40 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {meses}m
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {errorApi && (
            <p className="text-xs text-accent-red bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-800">
              {errorApi}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-3 px-4 bg-accent-gold hover:bg-accent-gold-hover text-surface font-extrabold rounded-xl text-sm transition shadow-md shadow-accent-gold/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {cargando
              ? "Calculando Proyección..."
              : "Simular Impacto Financiero"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
      <div className="lg:col-span-7 space-y-5">
        {!resultado ? (
          <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-10 text-center text-slate-400 space-y-3">
            <TrendingDown className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              Esperando simulación
            </h3>
            <p className="text-xs max-w-sm mx-auto">
              Completa el formulario para simular el impacto financiero de tu
              crédito.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
                esSaludable
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-accent-green/40 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50 dark:bg-rose-950/30 border-accent-red/40 text-rose-900 dark:text-rose-200"
              }`}
            >
              {esSaludable ? (
                <CheckCircle2 className="w-6 h-6 text-accent-green shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-accent-red shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm">
                    {esSaludable ? "Crédito Saludable" : "Crédito Riesgoso"}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-white/60 dark:bg-black/40 tabular-nums">
                    DTI: {primerMes.indice_endeudamiento_dti}%
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  {esSaludable
                    ? `El presupuesto diario sería de ${formatearMoneda(primerMes.presupuesto_diario_estimado)} por día.`
                    : `Supera límite de endeudamiento del 35%. Presupuesto diario estimado: ${formatearMoneda(primerMes.presupuesto_diario_estimado)} por día.`}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Proyección de Impacto ({resultado.length} Meses)
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="pb-2.5">Mes</th>
                      <th className="pb-2.5">Cuota Nueva</th>
                      <th className="pb-2.5">Superavit Estimado</th>
                      <th className="pb-2.5 text-right">Presupuesto Diario</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {resultado.map((item) => (
                      <tr
                        key={item.mes_numero}
                        className="hover:bg-slate-50 dark:hover:bg-white/5 transition"
                      >
                        <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300">
                          Mes #{item.mes_numero}
                        </td>
                        <td className="py-2.5 text-slate-600 dark:text-slate-400 tabular-nums">
                          {formatearMoneda(item.cuota_simulada)}
                        </td>
                        <td
                          className={`py-2.5 font-bold tabular-nums ${item.superavit_estimado >= 0 ? "text-accent-green" : "text-accent-red"}`}
                        >
                          {formatearMoneda(item.superavit_estimado)}
                        </td>
                        <td className="py-2.5 text-right font-extrabold text-accent-gold tabular-nums">
                          {formatearMoneda(item.presupuesto_diario_estimado)} /
                          día
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
