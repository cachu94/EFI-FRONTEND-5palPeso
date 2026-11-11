import { apiRequest } from "./api";

export function getIngresos(page = 1, size = 10) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  return apiRequest(`/ingresos/?${params}`);
}

export function crearIngreso(ingreso) {
  return apiRequest("/ingresos/", {
    method: "POST",
    body: JSON.stringify(ingreso),
  });
}
