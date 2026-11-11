import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FormularioPage } from "../components/FormularioPage";
import { crearGastoDiario } from "../services/gastosService";
import { fechaLocalISO } from "../utils/formatters";

const USUARIO_ID = 1;
const formularioInicial = () => ({
  categoria: "",
  monto: "",
  fecha: fechaLocalISO(),
  notas: "",
});
const campoClass =
  "mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-white/15 dark:bg-surface dark:text-white dark:placeholder:text-slate-500";
const volverA = "/gastos-diarios";

export function NuevoGastoDiario() {
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
      await crearGastoDiario({
        usuario_id: USUARIO_ID,
        categoria: formulario.categoria.trim(),
        monto: Number(formulario.monto),
        fecha: formulario.fecha,
        notas: formulario.notas.trim() || null,
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
    <FormularioPage titulo="Agregar gasto diario" volverA={volverA}>
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
            placeholder="Ej. Supermercado"
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
          Fecha
          <input
            className={campoClass}
            name="fecha"
            type="date"
            value={formulario.fecha}
            onChange={cambiarCampo}
            required
          />
        </label>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Nota (opcional)
          <input
            className={campoClass}
            name="notas"
            value={formulario.notas}
            onChange={cambiarCampo}
            maxLength={255}
            placeholder="Detalle adicional"
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
            {guardando ? "Guardando..." : "Guardar gasto"}
          </button>
        </div>
      </form>
    </FormularioPage>
  );
}
