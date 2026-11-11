import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FormularioPage } from "../components/FormularioPage";
import { crearIngreso } from "../services/ingresosService";
import { fechaLocalISO } from "../utils/formatters";

const USUARIO_ID = 1;
const formularioInicial = () => ({
  descripcion: "",
  monto: "",
  fecha_ingreso: fechaLocalISO(),
  es_recurrente: true,
});
const campoClass =
  "mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-white/15 dark:bg-surface dark:text-white";
const volverA = "/ingresos";

export function NuevoIngreso() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const { onCreated } = useOutletContext();
  const navigate = useNavigate();

  const cambiarCampo = (evento) => {
    const { name, value, type, checked } = evento.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const guardarIngreso = async (evento) => {
    evento.preventDefault();
    setGuardando(true);
    setError("");
    try {
      await crearIngreso({
        usuario_id: USUARIO_ID,
        descripcion: formulario.descripcion.trim(),
        monto: Number(formulario.monto),
        fecha_ingreso: formulario.fecha_ingreso,
        es_recurrente: formulario.es_recurrente,
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
    <FormularioPage titulo="Agregar ingreso" volverA={volverA}>
      <form
        onSubmit={guardarIngreso}
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
            placeholder="Ej. Sueldo, cobro de honorarios..."
          />
        </label>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Monto (ARS)
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
          Fecha de ingreso
          <input
            className={campoClass}
            name="fecha_ingreso"
            type="date"
            value={formulario.fecha_ingreso}
            onChange={cambiarCampo}
            required
          />
        </label>
        <label className="flex min-h-11 items-center gap-3 self-end rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200">
          <input
            name="es_recurrente"
            type="checkbox"
            checked={formulario.es_recurrente}
            onChange={cambiarCampo}
            className="h-4 w-4 accent-amber-400"
          />
          Ingreso recurrente
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
            {guardando ? "Guardando..." : "Guardar ingreso"}
          </button>
        </div>
      </form>
    </FormularioPage>
  );
}
