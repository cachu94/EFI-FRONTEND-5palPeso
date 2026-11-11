/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { numeroADisplay, parsearTextoMoneda } from "../utils/formateadores";

export function InputMoneda({
  value,
  onChange,
  placeholder = "0",
  required = false,
  className = "",
}) {
  const [textoVisual, setTextoVisual] = useState(() => numeroADisplay(value));
  useEffect(() => {
    setTextoVisual(numeroADisplay(value));
  }, [value]);

  const handleChange = (e) => {
    const { display, value: nuevoValor } = parsearTextoMoneda(e.target.value);
    setTextoVisual(display);
    onChange(nuevoValor);
  };

  const handleKeyDown = (e) => {
    // Si presiona el punto en el teclado numérico, lo convertimos en coma decimal
    if (e.key === ".") {
      e.preventDefault();
      if (!textoVisual.includes(",")) {
        const nuevoTexto = (textoVisual || "0") + ",";
        const { display, value: nuevoValor } = parsearTextoMoneda(nuevoTexto);
        setTextoVisual(display);
        onChange(nuevoValor);
      }
    }
  };

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 font-bold text-sm">
        $
      </span>
      <input
        type="text"
        inputMode="decimal"
        required={required}
        placeholder={placeholder}
        value={textoVisual}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`w-full pl-8 pr-4 py-2 bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent-gold ${className}`}
      />
    </div>
  );
}
