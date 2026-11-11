import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Creditos } from "./pages/Creditos";
import { CreditosLista } from "./pages/CreditosLista";
import { Dashboard } from "./pages/Dashboard";
import { DetalleCredito } from "./pages/DetalleCredito";
import { SimuladorCredito } from "./pages/SimuladorCredito";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/gastos-diarios"
            element={
              <h1 className="text-2xl font-bold">
                Vista: Gastos Diarios (En construcción)
              </h1>
            }
          />
          <Route
            path="/gastos-fijos"
            element={
              <h1 className="text-2xl font-bold">
                Vista: Gastos Fijos (En construcción)
              </h1>
            }
          />
          <Route
            path="/ingresos"
            element={
              <h1 className="text-2xl font-bold">
                Vista: Ingresos (En construcción)
              </h1>
            }
          />
          <Route path="/creditos" element={<Creditos />}>
            <Route index element={<CreditosLista />} />
            <Route path="simulador" element={<SimuladorCredito />} />
          </Route>
          <Route path="/creditos/:id" element={<DetalleCredito />} />

          <Route
            path="/cuentas"
            element={
              <h1 className="text-2xl font-bold">
                Vista: Cuentas (En construcción)
              </h1>
            }
          />
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
