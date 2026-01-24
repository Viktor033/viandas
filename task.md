# Tareas de Modernización - Proyecto Viandas

- [x] **Backend: Modernización Core**
    - [x] Actualizar `pom.xml` (Spring Boot 3.3.0, Java 17).
    - [x] Limpiar dependencias obsoletas (JWT viejo).
    - [x] Configurar `application.properties` para Spring Boot 3.

- [x] **Backend: Seguridad y Arquitectura**
    - [x] Implementar `JwtService` con JJWT 0.12.5 (SecretKey segura).
    - [x] Refactorizar `AuthController` (eliminar lógica de negocio).
    - [x] Crear `UsuarioService` para lógica de usuarios/invitados.
    - [x] Estandarizar respuestas API (`ApiResponse`).

- [x] **Backend: Base de Datos**
    - [x] Integrar Flyway.
    - [x] Crear script inicial `V1__init_schema.sql`.
    - [x] Sincronizar Entidades JPA con Esquema SQL (Fix tipos y longitudes).
    - [x] Script `V2__fix_cadete_dni.sql`.

- [x] **Frontend: Limpieza**
    - [x] Reorganizar estructura de carpetas (eliminar `frontend/frontend`).
    - [x] Instalar dependencias (`npm install`).

- [ ] **Verificación y Entrega**
    - [x] Levantar Backend (Puerto 8081).
    - [x] Levantar Frontend (Puerto 4200).
    - [ ] Verificar acceso a Swagger y Home Page.
    - [x] Generar Informe Técnico.
