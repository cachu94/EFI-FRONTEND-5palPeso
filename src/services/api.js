// URL base de la API (toma la del .env o usa por defecto la de la nube)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://efi-backend.fastapicloud.dev";
