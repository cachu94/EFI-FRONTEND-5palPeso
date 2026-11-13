import { apiRequest } from "./api";

export function getCuentas(page = 1, size = 10) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  return apiRequest(`/cuentas/?${params}`);
}

export function getCuentaById(id) {
  return apiRequest(`/cuentas/${id}/`);
}

export function crearCuenta(payload) {
  return apiRequest(`/cuentas/`, {
    method: "POST",
    body: payload,
  });
}
