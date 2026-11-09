import { API_BASE_URL } from "./api";

export async function getMetricasCiclo(usuario_id = 1) {
  const response = await fetch(
    `${API_BASE_URL}/metricas/ciclo-actual/${usuario_id}`,
  );
  if (!response.ok) {
    throw new Error("Error al obtener las métricas del ciclo actual");
  }
  return await response.json();
}
