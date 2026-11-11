import { apiRequest } from "./api";

export function getCuentas(page = 1, size = 10) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  return apiRequest(`/cuentas/?${params}`);
}
