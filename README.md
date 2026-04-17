# Consumer API Backend Node.js

Backend de Node.js para gestión de pacientes clínicos que consume APIs externas.

## 📋 ¿Qué hace el proyecto?

Este es un sistema backend que implementa un **CRUD completo** para la gestión de pacientes en una clínica. Las funcionalidades principales incluyen:

- **Gestión de Pacientes**: Crear, leer, actualizar y eliminar registros de pacientes
- **Historiales Clínicos**: Obtener el registro completo de cada paciente
- **Consulta de TRM**: Acceso a la Tasa Representativa del Mercado (tipo de cambio) desde una API pública colombiana
- **Base de Datos**: Persistencia de datos en MongoDB

### Endpoints principales:

```
POST   /api/clinic          → Crear nuevo paciente
GET    /api/clinic          → Obtener todos los pacientes
GET    /api/clinic/:id      → Obtener paciente por ID
PUT    /api/clinic/:id      → Actualizar paciente
DELETE /api/clinic/:id      → Eliminar paciente

GET    /api/history/:id     → Obtener historial del paciente

GET    /api/latest          → Obtener última TRM
```

## 🚀 Cómo ejecutarlo localmente

### Requisitos previos:
- Node.js 14+ instalado
- MongoDB (Atlas o local)
- npm o yarn

### Pasos de instalación:

1. **Clonar el repositorio**:
```bash
git clone https://github.com/luquez09/consumer-api-backend-nodejs.git
cd consumer-api-backend-nodejs
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:

Editar el archivo `variables.env` con tus credenciales de MongoDB:
```env
DB_MONGO=mongodb+srv://<usuario>:<contraseña>@<cluster>/<base_datos>
```

4. **Ejecutar el servidor**:

**Modo desarrollo** (con nodemon para auto-reload):
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

5. **Ejecutar pruebas**:
```bash
npm test
```

## 🔌 API Externa utilizada

### Datos.gov.co - Tasa Representativa del Mercado (TRM)

El proyecto consume la API pública de **datos.gov.co** para obtener información de la TRM (tipo de cambio colombiano).

**Endpoint de la API:**
```
https://www.datos.gov.co/resource/32sa-8pi3.json
```

**Datos que proporciona:**
- Valor actual de la TRM
- Fecha de vigencia
- Variación porcentual respecto al valor anterior
- Tendencia (subió/bajó/sin cambio)

**Ejemplo de respuesta:**
```json
{
  "fecha": "2024-04-16",
  "valor": 4150.25,
  "unidad": "COP",
  "variacion_porcentual": "0.50",
  "tendencia": "subió"
}
```

## 📦 Dependencias principales

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.4.1",
  "dotenv": "^17.4.2"
}
```

## 🛠️ Tecnologías

- **Runtime**: Node.js
- **Framework Web**: Express.js
- **Base de Datos**: MongoDB
- **ODM**: Mongoose
- **Testing**: Jest + Supertest
- **Dev Tools**: Nodemon

## 📝 Estructura del proyecto

```
├── index.js                 # Punto de entrada
├── package.json
├── variables.env
├── src/
│   ├── config/
│   │   └── dataBase.js     # Conexión a MongoDB
│   ├── controller/         # Lógica de controladores
│   │   ├── pacientController.js
│   │   ├── historyController.js
│   │   └── trmController.js
│   ├── models/             # Esquemas de Mongoose
│   │   ├── Patient.js
│   │   └── HistoryPatient.js
│   ├── routes/             # Rutas de API
│   │   ├── ClinicPatient.js
│   │   ├── HistoryPatient.js
│   │   └── TrmConsult.js
│   └── service/            # Servicios externos
│       └── trmServices.js
└── test/                   # Pruebas
    └── pacient.test.js
```

## 📄 Licencia

ISC

## 👤 Autor

Ivan Luquez Arias

## 🔗 Referencias

- [Datos.gov.co](https://datos.gov.co)
- [Express.js Documentation](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
