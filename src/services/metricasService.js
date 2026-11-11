import { apiRequest } from "./api";

export async function getMetricasCiclo(usuario_id = 1) {
  return apiRequest(`/metricas/ciclo-actual/${usuario_id}`);
}

export async function getDistribucionFondos(usuario_id = 1) {
  return apiRequest(`/metricas/distribucion-fondos/${usuario_id}`);
}
