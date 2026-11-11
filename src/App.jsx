import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Cuentas } from "./pages/Cuentas";
import { Dashboard } from "./pages/Dashboard";
import { GastosDiarios } from "./pages/GastosDiarios";
import { GastosFijos } from "./pages/GastosFijos";
import { Ingresos } from "./pages/Ingresos";
import { NuevoGastoDiario } from "./pages/NuevoGastoDiario";
import { NuevoGastoFijo } from "./pages/NuevoGastoFijo";
import { NuevoIngreso } from "./pages/NuevoIngreso";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gastos-diarios" element={<GastosDiarios />}>
            <Route path="nuevo" element={<NuevoGastoDiario />} />
          </Route>
          <Route path="/gastos-fijos" element={<GastosFijos />}>
            <Route path="nuevo" element={<NuevoGastoFijo />} />
          </Route>
          <Route path="/ingresos" element={<Ingresos />}>
            <Route path="nuevo" element={<NuevoIngreso />} />
          </Route>
          <Route
            path="/creditos"
            element={
              <h1 className="text-2xl font-bold">
                Vista: Créditos (En construcción)
              </h1>
            }
          />
          <Route path="/cuentas" element={<Cuentas />} />
          <Route
            path="*"
            element={
              <h1 className="text-2xl font-bold text-red-500">
                404 - Página no encontrada
              </h1>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
