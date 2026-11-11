import { useCallback, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Plus } from "lucide-react";
import { ModalConfirm } from "../components/ModalConfirm";
import { Pagination } from "../components/Pagination";
import { eliminarGastoDiario, getGastosDiarios } from "../services/gastosService";
import { formatearFecha, formatearMoneda } from "../utils/formatters";

const TAMANO_PAGINA = 10;

export function GastosDiarios() {
  const [gastos, setGastos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [paginas, setPaginas] = useState(0);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [eliminando, setEliminando] = useState(false);
  const [gastoAEliminar, setGastoAEliminar] = useState(null);
  const [error, setError] = useState("");

  const cargarGastos = useCallback(
    async (numeroPagina = pagina) => {
      setCargando(true);
      setError("");
      try {
        const resultado = await getGastosDiarios(numeroPagina, TAMANO_PAGINA);
        setGastos(resultado.items);
        setPaginas(resultado.pages);
        setTotal(resultado.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    },
    [pagina],
  );

  useEffect(() => {
    let vigente = true;
    getGastosDiarios(pagina, TAMANO_PAGINA)
      .then((resultado) => {
        if (!vigente) {
          return;
        }
        setGastos(resultado.items);
        setPaginas(resultado.pages);
        setTotal(resultado.total);
        setError("");
      })
      .catch((err) => {
        if (vigente) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (vigente) {
          setCargando(false);
        }
      });

    return () => {
      vigente = false;
    };
  }, [pagina]);

  const confirmarEliminacion = async () => {
    if (!gastoAEliminar) {
      return;
    }

    setEliminando(true);
    setError("");
    try {
      await eliminarGastoDiario(gastoAEliminar.id);
      setGastoAEliminar(null);
      const paginaSiguiente =
        gastos.length === 1 && pagina > 1 ? pagina - 1 : pagina;
      if (paginaSiguiente !== pagina) {
        setPagina(paginaSiguiente);
      } else {
        await cargarGastos(pagina);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Registro del ciclo
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-blue-950 dark:text-white sm:text-3xl">
            Gastos diarios
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Registrá y revisá los gastos realizados durante el ciclo.
          </p>
        </div>
        <Link
          to="/gastos-diarios/nuevo"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent-gold px-5 font-bold text-surface transition hover:bg-accent-gold-hover"
        >
          <Plus aria-hidden="true" size={18} />
          Agregar
        </Link>
      </header>

      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => cargarGastos(pagina)}
            className="font-bold underline underline-offset-2"
          >
            Reintentar carga
          </button>
        </div>
      )}

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-container sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-blue-950 dark:text-white">
              Historial de gastos
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {total} {total === 1 ? "gasto registrado" : "gastos registrados"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => cargarGastos(pagina)}
            disabled={cargando}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-white/10"
          >
            Actualizar
          </button>
        </div>

        {cargando ? (
          <p role="status" className="py-8 text-center text-sm text-slate-500">
            Cargando historial...
          </p>
        ) : gastos.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-surface dark:text-slate-400">
            Todavía no hay gastos registrados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    Categoría
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Fecha
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Monto
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Nota
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {gastos.map((gasto) => (
                  <tr key={gasto.id}>
                    <td className="px-3 py-4 font-semibold text-slate-800 dark:text-white">
                      {gasto.categoria}
                    </td>
                    <td className="px-3 py-4 text-slate-600 dark:text-slate-300">
                      {formatearFecha(gasto.fecha)}
                    </td>
                    <td className="px-3 py-4 text-right font-bold tabular-nums text-red-600 dark:text-red-400">
                      {formatearMoneda(gasto.monto)}
                    </td>
                    <td className="max-w-56 truncate px-3 py-4 text-slate-600 dark:text-slate-300">
                      {gasto.notas || "—"}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setGastoAEliminar(gasto);
                        }}
                        className="rounded-lg px-3 py-2 font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                        aria-label={`Eliminar gasto de ${gasto.categoria}`}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          page={pagina}
          pages={paginas}
          total={total}
          onChange={(numeroPagina) => {
            setCargando(true);
            setPagina(numeroPagina);
          }}
        />
      </section>

      <ModalConfirm
        abierto={Boolean(gastoAEliminar)}
        titulo="¿Eliminar este gasto?"
        descripcion={
          gastoAEliminar
            ? `Se eliminará el gasto "${gastoAEliminar.categoria}" de ${formatearMoneda(gastoAEliminar.monto)}. Esta acción no se puede deshacer.`
            : ""
        }
        error={gastoAEliminar ? error : ""}
        confirmando={eliminando}
        onCancelar={() => setGastoAEliminar(null)}
        onConfirmar={confirmarEliminacion}
      />
      <Outlet context={{ onCreated: () => cargarGastos(pagina) }} />
    </div>
  );
}
