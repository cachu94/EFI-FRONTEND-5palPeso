import { Building2, ExternalLink, Plus, Wallet, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { crearCuenta, getCuentas } from "../services/cuentasService";
import { getDistribucionFondos } from "../services/metricasService";
import { formatearMoneda } from "../utils/formatters";

const USUARIO_ID = 1;
const TAMANO_PAGINA = 10;

export function Cuentas() {
  const [cuentas, setCuentas] = useState([]);
  const [distribucion, setDistribucion] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [paginas, setPaginas] = useState(0);
  const [total, setTotal] = useState(0);
  const [cargandoCuentas, setCargandoCuentas] = useState(true);
  const [cargandoDistribucion, setCargandoDistribucion] = useState(true);
  const [errorCuentas, setErrorCuentas] = useState("");
  const [errorDistribucion, setErrorDistribucion] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    entidad: "",
    tipo_cuenta: "banco",
  });

  const cargarCuentas = useCallback(
    async (numeroPagina = pagina) => {
      setCargandoCuentas(true);
      setErrorCuentas("");
      try {
        const resultado = await getCuentas(numeroPagina, TAMANO_PAGINA);
        setCuentas(resultado.items);
        setPaginas(resultado.pages);
        setTotal(resultado.total);
      } catch (err) {
        setErrorCuentas(err.message);
      } finally {
        setCargandoCuentas(false);
      }
    },
    [pagina],
  );

  const cargarDistribucion = useCallback(async () => {
    setCargandoDistribucion(true);
    setErrorDistribucion("");
    try {
      setDistribucion(await getDistribucionFondos(USUARIO_ID));
    } catch (err) {
      setErrorDistribucion(err.message);
    } finally {
      setCargandoDistribucion(false);
    }
  }, []);

  useEffect(() => {
    cargarCuentas(pagina);
  }, [cargarCuentas, pagina]);

  useEffect(() => {
    cargarDistribucion();
  }, [cargarDistribucion]);

  const handleCrearCuenta = async (e) => {
    e.preventDefault();
    try {
      setGuardando(true);
      await crearCuenta({
        usuario_id: USUARIO_ID,
        nombre: form.nombre,
        entidad: form.entidad,
        tipo_cuenta: form.tipo_cuenta,
        activo: true,
      });
      setModalAbierto(false);
      setForm({ nombre: "", entidad: "", tipo_cuenta: "banco" });
      cargarCuentas(1);
      cargarDistribucion();
    } catch {
      alert("Error al crear la cuenta. Verificá los datos ingresados.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Tus medios financieros
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-blue-950 dark:text-white sm:text-3xl">
          Cuentas
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Consultá tus bancos y billeteras junto con la distribución sugerida de
          fondos.
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-container sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-blue-950 dark:text-white">
              Bancos y billeteras
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {total} {total === 1 ? "cuenta" : "cuentas"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 text-blue-950 hover:bg-amber-500 transition shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Cuenta</span>
            </button>

            <button
              type="button"
              onClick={() => cargarCuentas(pagina)}
              disabled={cargandoCuentas}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
            >
              Actualizar
            </button>
          </div>
        </div>

        {errorCuentas && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
          >
            <span>{errorCuentas}</span>
            <button
              type="button"
              onClick={() => cargarCuentas(pagina)}
              className="font-bold underline underline-offset-2"
            >
              Reintentar
            </button>
          </div>
        )}

        {cargandoCuentas ? (
          <p role="status" className="py-8 text-center text-sm text-slate-500">
            Cargando cuentas...
          </p>
        ) : cuentas.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-surface dark:text-slate-400">
            Todavía no hay cuentas registradas.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cuentas.map((cuenta) => {
              const billetera = cuenta.tipo_cuenta
                .toLowerCase()
                .includes("billetera");
              const Icono = billetera ? Wallet : Building2;

              return (
                <article
                  key={cuenta.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-amber-400/60 dark:border-white/10 dark:bg-surface flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-xl bg-blue-100 p-3 text-blue-900 dark:bg-surface-header dark:text-amber-400">
                        <Icono className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          cuenta.activo
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                            : "bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                        }`}
                      >
                        {cuenta.activo ? "Activa" : "Inactiva"}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                      {cuenta.nombre}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {cuenta.entidad || cuenta.tipo_cuenta}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {cuenta.tipo_cuenta.replaceAll("_", " ")}
                    </p>
                  </div>

                  <Link
                    to={`/cuentas/${cuenta.id}`}
                    className="mt-4 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-surface-header dark:hover:bg-white/5 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition border border-slate-200 dark:border-white/10"
                  >
                    <span>Ver detalle</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        <Pagination
          page={pagina}
          pages={paginas}
          total={total}
          onChange={setPagina}
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-container sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Métricas
          </p>
          <h2 className="mt-1 text-lg font-bold text-blue-950 dark:text-white">
            Distribución de fondos
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Compromisos sugeridos para cada cuenta.
          </p>
        </div>

        {errorDistribucion && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
          >
            <span>{errorDistribucion}</span>
            <button
              type="button"
              onClick={cargarDistribucion}
              className="font-bold underline underline-offset-2"
            >
              Reintentar
            </button>
          </div>
        )}

        {cargandoDistribucion ? (
          <p role="status" className="py-8 text-center text-sm text-slate-500">
            Calculando distribución...
          </p>
        ) : distribucion.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-surface dark:text-slate-400">
            No hay compromisos para mostrar en la distribución actual.
          </p>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-white/5">
            {distribucion.map((sugerencia, indice) => (
              <li
                key={`${sugerencia.cuenta_id ?? "sin-cuenta"}-${indice}`}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {sugerencia.nombre_cuenta}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {sugerencia.motivo}
                  </p>
                </div>
                <p className="font-extrabold tabular-nums text-blue-950 dark:text-amber-400">
                  {formatearMoneda(sugerencia.monto_comprometido)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-surface-container border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Dar de Alta Nueva Cuenta
              </h3>
              <button
                onClick={() => setModalAbierto(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCrearCuenta} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Nombre de la Cuenta *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Banco Galicia Sueldo"
                  value={form.nombre}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, nombre: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Entidad Financiera *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Banco Galicia, Mercado Pago"
                  value={form.entidad}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, entidad: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Tipo de Medio *
                </label>
                <select
                  value={form.tipo_cuenta}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tipo_cuenta: e.target.value }))
                  }
                  className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="banco">Banco</option>
                  <option value="billetera_virtual">Billetera Virtual</option>
                  <option value="efectivo">Efectivo</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-surface dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-400 text-blue-950 hover:bg-amber-500 transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {guardando ? "Guardando..." : "Crear Cuenta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
