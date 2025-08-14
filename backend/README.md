# Backend - Aplicación de Enfermería

## Descripción / Description

**ES:**  
Este directorio contiene la lógica del servidor, APIs REST, manejo de base de datos y toda la infraestructura backend de la aplicación de enfermería.

**EN:**  
This directory contains the server logic, REST APIs, database management, and all backend infrastructure for the nursing application.

## Estructura / Structure

```
backend/
├── src/
│   ├── controllers/    # Controladores de rutas / Route controllers
│   ├── models/        # Modelos de datos / Data models
│   ├── routes/        # Definición de rutas / Route definitions
│   ├── middleware/    # Middleware personalizado / Custom middleware
│   ├── services/      # Lógica de negocio / Business logic
│   ├── utils/         # Utilidades / Utilities
│   └── config/        # Configuraciones / Configurations
├── tests/             # Tests unitarios / Unit tests
├── migrations/        # Migraciones de BD / Database migrations
├── seeds/            # Datos de prueba / Seed data
├── package.json      # Dependencias / Dependencies
└── README.md         # Este archivo / This file
```

## Tecnologías Recomendadas / Recommended Technologies

- **Runtime:** Node.js / Python / Java
- **Framework:** Express.js / FastAPI / Spring Boot
- **Base de Datos:** PostgreSQL / MongoDB / MySQL
- **ORM:** Sequelize / Mongoose / Prisma
- **Autenticación:** JWT / OAuth 2.0
- **Testing:** Jest / Mocha / PyTest
- **Documentación:** Swagger / OpenAPI

## Funcionalidades Principales / Main Features

### Módulos de Enfermería / Nursing Modules
- **Gestión de Pacientes:** Registro, historial médico, seguimiento
- **Administración de Medicamentos:** Horarios, dosis, alertas
- **Turnos y Personal:** Asignación de enfermeras, horarios
- **Reportes:** Estadísticas, informes médicos
- **Notificaciones:** Alertas críticas, recordatorios

### Seguridad / Security
- Autenticación y autorización
- Encriptación de datos sensibles
- Logs de auditoría
- Cumplimiento HIPAA (si aplica)

## Instalación / Installation

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones
npm run migrate

# Poblar base de datos (opcional)
npm run seed

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar tests
npm test
```

## API Documentation

La documentación de la API estará disponible en `/api/docs` cuando el servidor esté ejecutándose.

API documentation will be available at `/api/docs` when the server is running.

## Contribución / Contributing

1. Sigue las convenciones de código establecidas
2. Escribe tests para nuevas funcionalidades
3. Actualiza la documentación cuando sea necesario
4. Asegúrate de que todos los tests pasen

1. Follow established code conventions
2. Write tests for new features
3. Update documentation when necessary
4. Ensure all tests pass