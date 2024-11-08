# Proyecto educativo

Este proyecto fue desarrollado como parte del bootcamp de Full Stack de SoyHenry y tiene un enfoque educativo. Se trata de una aplicación de e-commerce que se concentra en la lógica del backend, implementada con Node.js, NestJS y PostgreSQL. A través de este proyecto, se exploran las bases de la creación de APIs RESTful, la autenticación y la administración de un carrito de compras, entre otras funcionalidades clave para un sistema de comercio electrónico.

# E-commerce

Este repositorio contiene la configuración y el código necesario para ejecutar una aplicación de e-commerce, desarrollada con Node.js, NestJS y PostgreSQL. La aplicación incluye funcionalidades básicas de un sistema de comercio electrónico, como la administración de productos, gestión de usuarios y un carrito de compras.

## Características

- API RESTful construida con NestJS.
- Base de datos PostgreSQL para manejar productos, usuarios y pedidos.
- Autenticación y autorización con JWT.
- Carrito de compras con funcionalidades completas.
- Documentación de API generada automáticamente utilizando JSDoc y Swagger.

## Tecnologías

- **Backend**: NestJS, Node.js
- **Base de datos**: PostgreSQL
- **Testing**: Jest, Supertest
- **Autenticación**: JWT

## Configuración Inicial

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/pi-rym/PM4BE-chi-bosio.git
   cd PM4BE-chi-bosio
   cd ecommerce-chi-bosio
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:

   Crear un archivo `.env` en la raíz del proyecto y definir las siguientes variables:

   ```plaintext
   DATABASE_URL=postgresql://<usuario>:<contraseña>@<host>:<puerto>/<nombre_db>
   JWT_SECRET=<tu_secreto_jwt>
   ```

4. **Ejecutar la aplicación en desarrollo**:
   ```bash
   npm run start:dev
   ```
   **Nota**: Asegúrate de que el servicio de PostgreSQL esté configurado y en ejecución.

## Scripts Principales

- Iniciar servidor en desarrollo:

  ```bash
  npm run start:dev
  ```

- Ejecutar pruebas:

  ```bash
  npm run test
  ```

- Compilar proyecto:

  ```bash
  npm run build
  ```

- Iniciar servidor en producción:
  ```bash
  npm run start:prod
  ```

## Estructura del Proyecto

```plaintext
ecommerce_SoyHenry/
├── src/
│   ├── main.ts            # Punto de entrada principal
│   ├── app.module.ts      # Módulo raíz de la aplicación
│   ├── modules/           # Módulos de funcionalidades (productos, usuarios, etc.)
│   └── config/            # Configuraciones generales (base de datos, seguridad)
├── test/                  # Pruebas unitarias y de integración
├── .env                   # Variables de entorno
├── Dockerfile             # Configuración para contenedores
├── docker-compose.yml     # Configuración de servicios (NestJS, PostgreSQL)
└── README.md

## Contribuciones

1. Haz un fork de este repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en el repositorio original.

## Licencia

Este proyecto está bajo la Licencia MIT.
```
