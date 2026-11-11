import { apiRequest } from "./api";

const queryPaginacion = (page, size) =>
  new URLSearchParams({ page: String(page), size: String(size) });

export function getGastosDiarios(page = 1, size = 10) {
  return apiRequest(`/gastos-diarios/?${queryPaginacion(page, size)}`);
}

export function crearGastoDiario(gasto) {
  return apiRequest("/gastos-diarios/", {
    method: "POST",
    body: JSON.stringify(gasto),
  });
}

export function eliminarGastoDiario(gastoId) {
  return apiRequest(`/gastos-diarios/${encodeURIComponent(gastoId)}`, {
    method: "DELETE",
  });
}

export function getGastosFijos(page = 1, size = 10) {
  return apiRequest(`/gastos-fijos/?${queryPaginacion(page, size)}`);
}

export function crearGastoFijo(gasto) {
  return apiRequest("/gastos-fijos/", {
    method: "POST",
    body: JSON.stringify(gasto),
  });
}
