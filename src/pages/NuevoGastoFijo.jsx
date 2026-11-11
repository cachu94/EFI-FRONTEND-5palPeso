import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FormularioPage } from "../components/FormularioPage";
import { crearGastoFijo } from "../services/gastosService";

const USUARIO_ID = 1;
const formularioInicial = {
  categoria: "",
  descripcion: "",
  monto: "",
  dia_vencimiento: "",
};
const campoClass =
  "mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-white/15 dark:bg-surface dark:text-white";
const volverA = "/gastos-fijos";

export function NuevoGastoFijo() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const { onCreated } = useOutletContext();
  const navigate = useNavigate();

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
  };

  const guardarGasto = async (evento) => {
    evento.preventDefault();
    setGuardando(true);
    setError("");
    try {
      await crearGastoFijo({
        usuario_id: USUARIO_ID,
        categoria: formulario.categoria,
        descripcion: formulario.descripcion.trim(),
        monto: Number(formulario.monto),
        dia_vencimiento: Number(formulario.dia_vencimiento),
        activo: true,
      });
      await onCreated();
      navigate(volverA);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <FormularioPage titulo="Agregar gasto fijo" volverA={volverA}>
      <form
        onSubmit={guardarGasto}
        className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200 sm:col-span-2"
          >
            {error}
          </p>
        )}
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Categoría
          <input
            className={campoClass}
            name="categoria"
            value={formulario.categoria}
            onChange={cambiarCampo}
            minLength={2}
            maxLength={50}
            pattern=".*\S.*"
            required
            placeholder="Ej. Servicios, suscripciones, alquiler..."
          />
        </label>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Descripción
          <input
            className={campoClass}
            name="descripcion"
            value={formulario.descripcion}
            onChange={cambiarCampo}
            minLength={3}
            maxLength={150}
            pattern=".*\S.*"
            required
            placeholder="Ej. Internet, alquiler..."
          />
        </label>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Monto mensual (ARS)
          <input
            className={campoClass}
            name="monto"
            type="number"
            value={formulario.monto}
            onChange={cambiarCampo}
            min="0.01"
            step="0.01"
            required
            placeholder="0,00"
          />
        </label>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Día de vencimiento
          <input
            className={campoClass}
            name="dia_vencimiento"
            type="number"
            value={formulario.dia_vencimiento}
            onChange={cambiarCampo}
            min="1"
            max="31"
            step="1"
            required
            placeholder="1–31"
          />
        </label>
        <div className="flex justify-end gap-3 sm:col-span-2">
          <button
            type="button"
            onClick={() => navigate(volverA)}
            className="min-h-11 rounded-lg border border-slate-300 px-4 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="min-h-11 rounded-lg bg-accent-gold px-5 font-bold text-surface transition hover:bg-accent-gold-hover disabled:cursor-wait disabled:opacity-60"
          >
            {guardando ? "Guardando..." : "Guardar gasto fijo"}
          </button>
        </div>
      </form>
    </FormularioPage>
  );
}
