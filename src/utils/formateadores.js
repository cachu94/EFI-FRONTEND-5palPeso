export function formatearMoneda(monto) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(monto || 0);
}

export function formatearFecha(fechaStr) {
  if (!fechaStr) return "-";
  const partes = String(fechaStr).split("T")[0].split("-");
  if (partes.length !== 3) return fechaStr;
  const [year, month, day] = partes;
  return `${day}/${month}/${year}`;
}

export function numeroADisplay(num) {
  if (num === "" || num === null || num === undefined) return "";
  const partes = String(num).split(".");
  const entero = partes[0]
    ? new Intl.NumberFormat("es-AR").format(BigInt(partes[0]))
    : "0";
  if (partes.length > 1) {
    return `${entero},${partes[1].slice(0, 2)}`;
  }
  return entero;
}

export function parsearTextoMoneda(rawText) {
  if (!rawText) return { display: "", value: "" };
  // Descartamos los puntos de miles y dejamos solo dígitos y comas
  const soloDigitosYComas = String(rawText)
    .replace(/\./g, "")
    .replace(/[^0-9,]/g, "");
  if (!soloDigitosYComas) return { display: "", value: "" };
  const tieneComa = soloDigitosYComas.includes(",");
  const partes = soloDigitosYComas.split(",");
  const parteEnteraRaw = partes[0];
  const parteDecimalRaw =
    partes.length > 1 ? partes.slice(1).join("").slice(0, 2) : "";
  const enteroFormateado = parteEnteraRaw
    ? new Intl.NumberFormat("es-AR").format(BigInt(parteEnteraRaw))
    : "0";
  const display = tieneComa
    ? `${enteroFormateado},${parteDecimalRaw}`
    : enteroFormateado;
  const numStr =
    (parteEnteraRaw || "0") +
    (tieneComa && parteDecimalRaw ? `.${parteDecimalRaw}` : "");
  const value = numStr ? parseFloat(numStr) : "";
  return { display, value };
}
