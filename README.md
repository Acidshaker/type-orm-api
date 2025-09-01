# API V1 Template 

Plantilla de API desarrollada en Node.js usando TypeScript, Express, TypeORM y otras librerías útiles para proyectos de backend.

## Librerias

| Librería            | Versión   | Descripción                                       |
| ------------------- | --------- | ------------------------------------------------- |
| Node.js             | 22.x      | Entorno de ejecución                              |
| TypeScript          | 5.9.2     | Superset de JS para tipado estático               |
| Express             | 4.21.2    | Framework minimalista para APIs                   |
| TypeORM             | 0.3.25    | ORM para bases de datos relacionales              |
| PostgreSQL (pg)     | 8.16.3    | Driver oficial de PostgreSQL                      |
| @nestjs/common/core | 11.1.6    | Estructura y utilidades para arquitectura modular |
| bcrypt              | 5.1.1     | Hash de contraseñas                               |
| jsonwebtoken        | 9.0.2     | Tokens JWT para autenticación                     |
| dotenv-flow         | 4.1.0     | Manejo de variables de entorno                    |
| AWS SDK S3          | 3.873.0   | Integración con almacenamiento S3                 |
| multer & multer-s3  | 2.x / 3.x | Manejo de uploads y S3                            |

## Requerimientos Técnicos

* Node.js 22.x
* Npm
* PostgreSQL
* Docker
* NVM (Node Version Manager)

### Sugerencias

Para el buen funcionamiento del proyecto y sus librerías, es recomendable tener un equipo con un sistema basado en UNIX:

* MacOS
* Distribuciones Linux/Debian (Recomendado Ubuntu)
* WSL (Windows Subsystem for Linux)

## Instalación del Proyecto

Para ejecutar el proyecto, es necesario cumplir con los requerimientos técnicos.

#### Pasos previos

 #### 1. Clonar el repositorio
```bash
  git clone <URL_DEL_REPO>
```
 #### 2. Instalar dependencias
```bash
  npm install
```



## Scrips Principales

| Script                       | Descripción                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                | Ejecuta el proyecto en modo desarrollo (TypeScript sin compilar)                                                             |
| `npm run build`              | Compila TypeScript a JavaScript en `dist/`                                                                                   |
| `npm start`                  | Ejecuta la versión compilada (producción)                                                                                    |
| `npm run typeorm`            | Ejecuta comandos de TypeORM CLI                                                                                              |
| `npm run migration:generate` | Genera una nueva migración. Ejemplo de uso: `npm run migration:generate -- src/modules/users/migrations/CreateUserTable` crea la migracion en la carpeta del modulo|
| `npm run migration:run`      | Aplica migraciones pendientes                                                                                                |
| `npm run migration:revert`   | Revierte la última migración                                                                                                 |
| `npm run schema:drop`        | Elimina el esquema de la base de datos                                                                                       |
| `npm run db:test`            | Ejecuta la DB en modo test                                                                                                   |
| `npm run generate-module`    | Ejecuta script personalizado para generar módulos                                                                            |
