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

export async function getCreditoPorId(credito_id) {
  const response = await fetch(`${API_BASE_URL}/creditos/${credito_id}`);
  if (!response.ok) {
    throw new Error("Error al obtener el crédito");
  }
  return await response.json();
}

export async function getCuentas(usuario_id = 1) {
  const response = await fetch(`${API_BASE_URL}/cuentas/`);
  if (!response.ok) {
    throw new Error("Error al obtener las cuentas");
  }
  const datos = await response.json();
  const lista = datos.items || [];
  return lista.filter((cuenta) => cuenta.usuario_id === usuario_id);
}

export async function pagarCuota(credito_id) {
  const response = await fetch(
    `${API_BASE_URL}/creditos/${credito_id}/registrar-pago`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Error al registrar el pago");
  }
  return await response.json();
}

export async function crearCredito(nuevoCredito) {
  const response = await fetch(`${API_BASE_URL}/creditos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoCredito),
  });

  if (!response.ok) {
    throw new Error("Error al crear el crédito");
  }
  return await response.json();
}

export async function actulizarCredito(credito_id, datosActualizados) {
  const response = await fetch(`${API_BASE_URL}/creditos/${credito_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosActualizados),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el crédito");
  }
  return await response.json();
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
