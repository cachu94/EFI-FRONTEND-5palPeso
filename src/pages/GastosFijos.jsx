import { useCallback, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Plus } from "lucide-react";
import { Pagination } from "../components/Pagination";
import { getGastosFijos } from "../services/gastosService";
import { formatearMoneda } from "../utils/formatters";

const TAMANO_PAGINA = 10;

export function GastosFijos() {
  const [gastos, setGastos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [paginas, setPaginas] = useState(0);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarGastos = useCallback(
    async (numeroPagina = pagina) => {
      setCargando(true);
      setError("");
      try {
        const resultado = await getGastosFijos(numeroPagina, TAMANO_PAGINA);
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
    getGastosFijos(pagina, TAMANO_PAGINA)
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

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Compromisos del ciclo
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-blue-950 dark:text-white sm:text-3xl">
            Gastos fijos
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Organizá servicios, suscripciones y alquileres con sus vencimientos.
          </p>
        </div>
        <Link
          to="/gastos-fijos/nuevo"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent-gold px-5 font-bold text-surface transition hover:bg-accent-gold-hover"
        >
          <Plus aria-hidden="true" size={18} />
          Agregar
        </Link>
      </header>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
        >
          {error}
        </div>
      )}

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-container sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-blue-950 dark:text-white">
            Gastos fijos registrados
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {total} {total === 1 ? "compromiso" : "compromisos"}
          </p>
        </div>

        {cargando ? (
          <p role="status" className="py-8 text-center text-sm text-slate-500">
            Cargando gastos fijos...
          </p>
        ) : gastos.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-surface dark:text-slate-400">
            Todavía no hay gastos fijos registrados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    Categoría
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Vencimiento
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Monto
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {gastos.map((gasto) => (
                  <tr key={gasto.id}>
                    <td className="px-3 py-4 text-slate-600 dark:text-slate-300">
                      {gasto.categoria}
                    </td>
                    <td className="px-3 py-4 font-semibold text-slate-800 dark:text-white">
                      {gasto.descripcion}
                    </td>
                    <td className="px-3 py-4 text-slate-600 dark:text-slate-300">
                      Día {gasto.dia_vencimiento}
                    </td>
                    <td className="px-3 py-4 text-right font-bold tabular-nums text-red-600 dark:text-red-400">
                      {formatearMoneda(gasto.monto)}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          gasto.activo
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                        }`}
                      >
                        {gasto.activo ? "Activo" : "Inactivo"}
                      </span>
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
      <Outlet context={{ onCreated: () => cargarGastos(pagina) }} />
    </div>
  );
}
