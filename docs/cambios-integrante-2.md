# Cambios realizados por el Integrante 2

Se implementaron los módulos asignados en la guía de colaboración: gastos diarios, gastos fijos, ingresos y cuentas.

## Módulos

- **Gastos diarios** ([`GastosDiarios.jsx`](../src/pages/GastosDiarios.jsx)): formulario con validación, historial paginado y eliminación mediante modal de confirmación.
- **Gastos fijos** ([`GastosFijos.jsx`](../src/pages/GastosFijos.jsx)): formulario y listado paginado para servicios, suscripciones y alquileres.
- **Ingresos** ([`Ingresos.jsx`](../src/pages/Ingresos.jsx)): formulario y listado paginado para sueldos y otros cobros, con opción de marcar ingresos recurrentes.
- **Cuentas** ([`Cuentas.jsx`](../src/pages/Cuentas.jsx)): tarjetas de bancos y billeteras, y widget de distribución de fondos.

Las pantallas se conectaron a sus rutas en [`App.jsx`](../src/App.jsx). Los formularios de alta envían `usuario_id: 1`. La pantalla de cuentas es de consulta; no incluye creación de cuentas.

## API y componentes compartidos

- Se agregó `apiRequest` en [`api.js`](../src/services/api.js) para centralizar solicitudes, respuestas y errores HTTP.
- Se añadieron servicios para gastos diarios y fijos, ingresos y cuentas en `src/services/`.
- Se agregó en [`metricasService.js`](../src/services/metricasService.js) la consulta de distribución de fondos.
- Se incorporaron componentes de paginación y confirmación, además de utilidades para formatear moneda y fechas.
- Las solicitudes usan `VITE_API_URL`, definido en `.env` o `.env.example`, y los endpoints del backend configurado.

## Verificación

- `npm run lint`: correcto.
- `npm run build`: correcto.
- Se verificaron en el navegador las cuatro rutas, la validación del formulario de gastos diarios y la apertura/cancelación del modal, usando respuestas simuladas. Estas pruebas no crearon registros en la API.
