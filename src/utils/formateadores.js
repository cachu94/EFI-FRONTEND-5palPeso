export function formatearMoneda(monto) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(monto || 0);
}

export function formatearFecha(fechaStr) {
  if (!fechaStr) return "-";
  const partes = String(fechaStr).split("T")[0].split("-");
  if (partes.length !== 3) return fechaStr;
  const [year, month, day] = partes;
  return `${day}/${month}/${year}`;
}

export function formatearMiles(valor) {
  if (!valor && valor !== 0) return "";
  const soloNumeros = String(valor).replace(/\D/g, "");
  if (!soloNumeros) return "";
  return new Intl.NumberFormat("es-AR").format(Number(soloNumeros));
}

export function desformatearMiles(textoConMiles) {
  if (!textoConMiles) return 0;
  return Number(String(textoConMiles).replace(/\D/g, "")) || 0;
}
