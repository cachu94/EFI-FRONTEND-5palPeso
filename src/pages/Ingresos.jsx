import { useCallback, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Plus } from "lucide-react";
import { Pagination } from "../components/Pagination";
import { getIngresos } from "../services/ingresosService";
import { formatearFecha, formatearMoneda } from "../utils/formatters";

const TAMANO_PAGINA = 10;

export function Ingresos() {
  const [ingresos, setIngresos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [paginas, setPaginas] = useState(0);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarIngresos = useCallback(
    async (numeroPagina = pagina) => {
      setCargando(true);
      setError("");
      try {
        const resultado = await getIngresos(numeroPagina, TAMANO_PAGINA);
        setIngresos(resultado.items);
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
    getIngresos(pagina, TAMANO_PAGINA)
      .then((resultado) => {
        if (!vigente) {
          return;
        }
        setIngresos(resultado.items);
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
            Entradas del ciclo
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-blue-950 dark:text-white sm:text-3xl">
            Ingresos
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Registrá sueldos, cobros y otros ingresos del ciclo.
          </p>
        </div>
        <Link
          to="/ingresos/nuevo"
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
            Ingresos registrados
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {total} {total === 1 ? "ingreso" : "ingresos"}
          </p>
        </div>

        {cargando ? (
          <p role="status" className="py-8 text-center text-sm text-slate-500">
            Cargando ingresos...
          </p>
        ) : ingresos.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-surface dark:text-slate-400">
            Todavía no hay ingresos registrados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Fecha
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Monto
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Frecuencia
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {ingresos.map((ingreso) => (
                  <tr key={ingreso.id}>
                    <td className="px-3 py-4 font-semibold text-slate-800 dark:text-white">
                      {ingreso.descripcion}
                    </td>
                    <td className="px-3 py-4 text-slate-600 dark:text-slate-300">
                      {formatearFecha(ingreso.fecha_ingreso)}
                    </td>
                    <td className="px-3 py-4 text-right font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                      {formatearMoneda(ingreso.monto)}
                    </td>
                    <td className="px-3 py-4 text-slate-600 dark:text-slate-300">
                      {ingreso.es_recurrente ? "Recurrente" : "Único"}
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
      <Outlet context={{ onCreated: () => cargarIngresos(pagina) }} />
    </div>
  );
}
