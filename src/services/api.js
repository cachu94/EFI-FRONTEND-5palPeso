import axios from "axios";

// URL base de la API (toma la del .env o usa por defecto la de la nube)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://efi-backend.fastapicloud.dev";

const clienteApi = axios.create({
  baseURL: API_BASE_URL,
});

export async function apiRequest(path, options = {}) {
  const { body, ...configuracion } = options;
  const headers = new Headers(configuracion.headers);

  if (body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await clienteApi.request({
      url: path,
      ...configuracion,
      headers,
      data: body,
    });
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    const datos = error.response?.data;
    const detalle =
      datos && typeof datos === "object" ? datos.detail : undefined;
    const mensaje =
      typeof detalle === "string"
        ? detalle
        : datos == null
          ? ""
          : JSON.stringify(detalle ?? datos);
    const estado = error.response?.status;

    throw new Error(
      mensaje ||
        (estado
          ? `La API respondió con el estado ${estado}`
          : error.message),
      { cause: error },
    );
  }
}
