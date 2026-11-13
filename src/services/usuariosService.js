import { apiRequest } from "./api";

export function getUsuarios(page = 1, size = 10) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  return apiRequest(`/usuarios/?${params}`);
}

export function getUsuarioPorId(id) {
  return apiRequest(`/usuarios/${id}`);
}

export function crearUsuario(payload) {
  return apiRequest("/usuarios/", {
    method: "POST",
    body: payload,
  });
}
