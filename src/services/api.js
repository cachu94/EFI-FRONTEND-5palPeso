// URL base de la API (toma la del .env o usa por defecto la de la nube)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://efi-backend.fastapicloud.dev";

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    if (!response.ok) {
      throw new Error(`La API respondió con el estado ${response.status}`);
    }
    return null;
  }

  const data = await response.json();
  if (!response.ok) {
    const detail =
      typeof data.detail === "string"
        ? data.detail
        : JSON.stringify(data.detail ?? data);
    throw new Error(detail || `La API respondió con el estado ${response.status}`);
  }

  return data;
}
