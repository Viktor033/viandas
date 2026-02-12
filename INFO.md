# Viandas Gourmet - Documentación del Proyecto

## Descripción General
Esta aplicación web gestiona la venta y distribución de viandas gourmet. Permite a los usuarios registrarse, ver el menú semanal, realizar pedidos y gestionar su perfil. Para los administradores, ofrece herramientas completas para gestionar pedidos, clientes y cadetes.

## Tecnologías Utilizadas
- **Frontend:** Angular 19+ (TypeScript, SCSS)
- **Backend:** Java Spring Boot (REST API)
- **Base de Datos:** MySQL
- **Integraciones:** MercadoPago (Pasarela de pagos)

## Estructura y Funcionalidades

### 1. Módulo Público / Cliente
Es la interfaz principal accesible para todos los usuarios.

- **Inicio (Home):** Presentación general de la marca, promociones destacadas y acceso rápido al menú.
- **Autenticación (Auth):**
  - **Login:** Acceso seguro para usuarios y administradores.
  - **Registro:** Formulario para nuevos clientes, capturando datos esenciales para el envío.
- **Menú Semanal:** Visualización de los platos disponibles. Permite agregar ítems al carrito de compras.
- **Carrito de Compras:** Gestión de los productos seleccionados antes de finalizar la compra.
- **Perfil de Usuario:** Visualización y edición de datos personales.
- **Mis Pedidos:** Historial de compras realizadas por el usuario, con estado actual (Pendiente, En preparación, Entregado, etc.).

### 2. Módulo de Administración
Accesible solo para usuarios con rol de administrador.

- **Gestión de Pedidos (Admin Pedidos):**
  - Visualización de todos los pedidos entrantes.
  - Cambio de estados (Aprobado, En envío, Entregado, Cancelado).
  - Asignación de cadetes para el envío.
  - Filtros por estado y fecha.
- **Gestión de Clientes (Admin Clientes):**
  - Listado completo de usuarios registrados.
  - Visualización de detalles de contacto y dirección.
  - Posibilidad de bloquear o editar usuarios (según implementación).
- **Gestión de Cadetes (Admin Cadetes):**
  - Alta, baja y modificación de cadetes.
  - Visualización de pedidos asignados.

### 3. Flujo de Compra
1. El usuario selecciona productos del **Menú**.
2. Confirma el pedido en el **Carrito**.
3. Realiza el pago (se integra o simula integración con MercadoPago).
4. Es redirigido a una página de **Resultado de Pago** (Éxito, Pendiente, Fallo).
5. El pedido aparece en **Mis Pedidos** y en el panel de **Admin Pedidos**.

## Configuración y Despliegue
- El frontend se compila con `ng build` y los artefactos se sirven estáticamente (o embebidos en Spring Boot en `target/classes/static`).
- El backend corre en el puerto 8080 por defecto.
