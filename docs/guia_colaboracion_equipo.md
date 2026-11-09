# Guía de Arquitectura, División de Tareas y Convenciones para el Equipo
## Proyecto: 5palPeso Financial Interface (EFI Frontend 2026)

Este documento contiene las definiciones de arquitectura, división de responsabilidades y convenciones que debe respetar **ambos integrantes** y sus respectivos agentes de IA (Antigravity).

---

## 1. Reglas Globales y Filosofía de Trabajo (Para los Agentes de Antigravity)
1. **Rol de Guía y Tutor Pedagógico**: Los agentes asisten con arquitectura, buenas prácticas y explicación conceptual. **No deben escribir ni modificar código fuente directamente**; cada alumno programa, comprende y defiende su código en la evaluación oral.
2. **Stack Oficial Obligatorio**: React (Vite) + Tailwind CSS + `react-router-dom` (v6+) + Context API.
3. **Control de Versiones (GitFlow)**:
   - `main`: Código estable de producción (el que se despliega automáticamente en Vercel).
   - `develop`: Rama integradora del desarrollo.
   - `feature/<nombre-de-funcionalidad>`: Ramas de trabajo individuales para cada pantalla o componente. Nunca se comitea directo a `main` ni a `develop`.

---

## 2. División de Roles y Responsabilidades

### Integrante 1 (Tech Lead & DevOps):
- **Setup y Cimientos**:
  - Inicialización del proyecto con Vite + Tailwind CSS (`tailwind.config.js` con tokens "Azul y Oro").
  - Repositorio público en GitHub y configuración de ramas (`main` y `develop`).
  - Creación de la estructura base de carpetas (`components/`, `pages/`, `services/`, `context/`, `routes/`, `hooks/`, `utils/`).
  - Enrutador central (`AppRouter.jsx`) con `MainLayout`, Navbar, Sidebar responsiva y Footer.
  - Implementación de `ThemeContext` (Modo Oscuro / Claro persistido en `localStorage`).
  - Cliente HTTP centralizado (`src/services/api.js`) apuntando a `import.meta.env.VITE_API_URL`.
- **Módulos de Negocio Asignados**:
  - `DashboardPage.jsx`: Vista principal, métricas globales de ciclo, saldo libre, presupuesto diario remanente y banners de alerta.
  - `CreditosPage.jsx` y `SimuladorCreditoPage.jsx`: Gestión de deudas activas y la **Ruta Anidada** (`/creditos/simulador`) que consume `POST /metricas/simulacion/credito/{usuario_id}`.
- **Auditoría & Despliegue**:
  - Code Review y merge de los Pull Requests del Integrante 2 hacia `develop`.
  - Configuración del Hosting y Despliegue en **Vercel** con variables de entorno (`VITE_API_URL`).

---

### Integrante 2 (Feature Developer):
- **Flujo de Trabajo**:
  - Clonar el repositorio en su máquina local (`git clone <url_del_repo>`).
  - Pararse sobre `develop` y crear sus ramas: `git checkout -b feature/<modulo>`.
  - Instalar dependencias con `npm install` y verificar que corra con `npm run dev`.
- **Módulos de Negocio Asignados**:
  - `GastosDiariosPage.jsx`:
    - Formulario controlado con validación de entradas (campos obligatorios, formato numérico > 0, longitud).
    - Tabla con historial de gastos y acción de eliminar (DELETE con modal de confirmación).
  - `GastosFijosPage.jsx`:
    - Listado y formulario para servicios, suscripciones y alquileres fijos.
  - `IngresosPage.jsx`:
    - Registro y listado de sueldos y cobros del ciclo.
  - `CuentasPage.jsx`:
    - Visualización de tarjetas de bancos y billeteras.
    - Integración del widget de **Distribución de Fondos** que consume `GET /metricas/distribucion-fondos/{usuario_id}`.
- **Reglas de Integración**:
  - Reutilizar componentes de `components/common/` (`Button`, `Card`, `Input`, `Modal`, `Badge`).
  - Respetar los estilos y clases de Tailwind definidos en `docs/design.md`.
  - Enviar Pull Request a la rama `develop` cuando finalice cada feature.

---

## 3. Sistema de Diseño (Design System Tokens)
El proyecto utiliza la identidad visual **5palPeso** basada en la paleta **Azul y Oro** (definida en `docs/design.md`):

- **Fondo Base (Dark)**: `#0B1B3D` (`bg-surface`)
- **Superficie de Tarjetas**: `#132A5E` (`bg-surface-container`) con borde `border-white/10`
- **Acento Primario (Oro)**: `#FFD100` (`bg-accent-gold` / `text-accent-gold`)
- **Acciones y Botones**:
  - Botón primario: fondo `#FFD100`, texto `#0B1B3D`, `font-bold`, `rounded-md` o `rounded-lg`, 44px de alto.
- **Tipografía**: `Plus Jakarta Sans` con clases para números tabulares (`tabular-nums` / `tnum`).
- **Estados Semánticos**:
  - Verde éxito: `#00C48C`
  - Amarillo advertencia: `#FFA800`
  - Rojo gasto / error: `#FF4757`

---

## 4. Estructura de Carpetas del Proyecto (`src/`)

```text
src/
├── assets/          # Íconos y gráficos SVG
├── components/
│   ├── common/      # Button.jsx, Input.jsx, Card.jsx, Modal.jsx, Badge.jsx, Spinner.jsx
│   ├── layout/      # Navbar.jsx, Sidebar.jsx, MainLayout.jsx, Footer.jsx
│   └── metrics/     # DebtMeter.jsx, DistributionCard.jsx, DailyBudgetCard.jsx
├── context/         # ThemeContext.jsx, FinanceFilterContext.jsx
├── hooks/           # useTheme.js, useFetch.js, useForm.js
├── pages/
│   ├── DashboardPage.jsx
│   ├── GastosDiariosPage.jsx
│   ├── GastosFijosPage.jsx
│   ├── IngresosPage.jsx
│   ├── CreditosPage.jsx
│   ├── SimuladorCreditoPage.jsx   # Sub-ruta anidada /creditos/simulador
│   ├── CuentasPage.jsx
│   ├── DetalleCreditoPage.jsx     # Dinámica 1: /creditos/:id
│   ├── DetalleCuentaPage.jsx      # Dinámica 2: /cuentas/:id
│   └── NotFoundPage.jsx
├── routes/          # AppRouter.jsx
├── services/        # api.js, gastosService.js, ingresosService.js, creditosService.js, metricasService.js
└── utils/           # formatters.js (formato moneda ARS, fechas) y validators.js
```

---

## 5. Protocolo de Envío de Tareas y Pull Requests
1. Crear rama desde `develop`: `git checkout develop && git pull && git checkout -b feature/gastos-diarios`
2. Desarrollar y verificar localmente: `npm run dev` y `npm run build` sin errores de compilación.
3. Subir rama a GitHub: `git push -u origin feature/gastos-diarios`
4. Abrir Pull Request hacia `develop` en GitHub para que el Integrante 1 revise y apruebe.
