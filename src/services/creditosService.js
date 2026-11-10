import { API_BASE_URL } from "./api";

export async function getCreditos(usuario_id = 1) {
  const response = await fetch(`${API_BASE_URL}/creditos/`);
  if (!response.ok) {
    throw new Error("Error al obtener los créditos");
  }
  const data = await response.json();
  const lista = data.items || [];

  return lista.filter((credito) => credito.usuario_id === usuario_id);
}

export async function simularCredito(usuario_id = 1, datosSimulacion) {
  const response = await fetch(
    `${API_BASE_URL}/metricas/simulacion/credito/${usuario_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosSimulacion),
    },
  );

  if (!response.ok) {
    throw new Error("Error al simular el crédito");
  }
  return await response.json();
}

export async function eliminarCredito(credito_id) {
  const response = await fetch(`${API_BASE_URL}/creditos/${credito_id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el crédito");
  }
  return await response.json();
}
