# 5palPeso — Sistema de Gestión de Finanzas Personales

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel)](https://efi-frontend-5pal-peso.vercel.app)
[![API Status](https://img.shields.io/badge/API-FastAPI%20Cloud-009688?style=flat&logo=fastapi)](https://efi-backend.fastapicloud.dev/docs)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

Aplicación web desarrollada para la **Evaluación Final Integradora (EFI) 2026** de la Unidad Curricular **Frontend**, Tecnicatura Superior en Desarrollo de Software — **ITEC Río Cuarto**.

- **Docente:** Prof. Valentino Arballo
- **Integrantes:** Facundo Giacri & Valentín Pomilio
- **Despliegue en Producción (Vercel):** [https://efi-frontend-5pal-peso.vercel.app](https://efi-frontend-5pal-peso.vercel.app)
- **Backend API (FastAPI Cloud):** [https://efi-backend.fastapicloud.dev](https://efi-backend.fastapicloud.dev)
- **Documentación Swagger / OpenAPI:** [https://efi-backend.fastapicloud.dev/docs](https://efi-backend.fastapicloud.dev/docs)

---

## 📋 Requisitos de Cátedra Implementados

### 1. Enrutamiento con React Router (`react-router-dom`)
- **≥ 6 Rutas Base:**
  - `/` : Dashboard con métricas del ciclo financiero y acciones rápidas.
  - `/gastos-diarios` : Historial y registro de gastos diarios paginados.
  - `/gastos-fijos` : Control de compromisos recurrentes (servicios, alquiler).
  - `/ingresos` : Gestión de sueldos y cobros recurrentes.
  - `/creditos` : Módulo de endeudamiento y control de préstamos.
  - `/cuentas` : Gestión de bancos, billeteras y distribución de fondos.
- **Rutas Anidadas (`<Outlet />`):**
  - `/creditos` con pestañas anidadas para `Mis Deudas` (`CreditosLista`) y `Simulador` (`SimuladorCredito`), comunicadas reactivamente con `useOutletContext`.
  - Rutas de alta anidadas en gastos e ingresos (`/nuevo`).
- **≥ 2 Rutas Dinámicas (`:id` con `useParams`):**
  - `/creditos/:id` : Detalle dinámico del crédito, máquina de amortización, pago de cuotas y edición.
  - `/cuentas/:id` : Detalle dinámico del medio financiero con visualización de estado y entidad.
- **Página 404:** Manejo de rutas inexistentes con feedback visual.

### 2. Consumo de API y Manejo de Estado Asíncrono
- Conexión asíncrona completa a los endpoints REST del backend (GET, POST, PATCH, DELETE).
- Manejo canónico de estados con `useState` (datos, cargando, errores) y ciclo de vida con `useEffect`.
- Formularios controlados con validación, sanitización y feedback visual.
- Componente especializado `InputMoneda` con formateo en tiempo real (`$ X.XXX,XX`) y soporte para separadores de miles y decimales.

### 3. Estado Global con Context API
- `ThemeContext` (`createContext` + `useContext`): Control global del modo Claro / Oscuro con persistencia en `localStorage` y sincronización con tokens de diseño semánticos de Tailwind CSS v4.

### 4. Despliegue en la Nube (Vercel)
- Hosting configurado en Vercel con integración continua (CI/CD) desde GitHub.
- Variables de entorno centralizadas (`VITE_API_URL`).
- Configuración de `vercel.json` con reglas de *rewrites* para soporte nativo de Single Page Application (SPA).

### 5. Diseño y Responsividad
- Sistema de diseño *"Azul y Oro"* (identidad Boca Juniors) implementado mediante `@theme` de Tailwind CSS v4.
- **Mobile First:** Navbar responsivo con menú hamburguesa adaptado a dispositivos móviles.

---

## 🛠️ Stack Tecnológico

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router DOM v7**
- **Axios** (cliente HTTP centralizado con interceptor de errores)
- **Lucide React** (iconografía)

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/cachu94/EFI-FRONTEND-5palPeso.git
   cd EFI-FRONTEND-5palPeso
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` en la raíz (o basarse en `.env.example`):
   ```env
   VITE_API_URL=https://efi-backend.fastapicloud.dev
   ```

4. **Levantar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abrir en el navegador [http://localhost:5173](http://localhost:5173).

5. **Compilar para producción:**
   ```bash
   npm run build
   ```
