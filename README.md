# AI Training Tool Backend

This is the backend service for the AI Training Tool, built with NestJS.

## Features

- User authentication with JWT and refresh tokens
- Role-based access control (ADMIN, USER)
- Fine-tune data management for AI model training
- Swagger API documentation
- Comprehensive error handling
- System logging
- CQRS pattern implementation
- PostgreSQL database with TypeORM

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
API_VERSION=v1

# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=t12345678
DB_DATABASE=ai_train_tool

# JWT Configuration
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRATION=1h
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_REFRESH_EXPIRATION=7d

# Logging
LOG_LEVEL=info
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Development mode:
```bash
npm run start:dev
```

2. Production mode:
```bash
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api-docs
```

## Database Migrations

To create a new migration:
```bash
npm run typeorm migration:create -- -n MigrationName
```

To run migrations:
```bash
npm run typeorm migration:run
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Project Structure

```
src/
├── common/              # Shared components
│   ├── entities/        # Base entities
│   ├── filters/         # Exception filters
│   └── services/        # Shared services
├── config/              # Configuration files
├── modules/             # Feature modules
│   ├── auth/           # Authentication module
│   ├── users/          # User management
│   └── fine-tune/      # Fine-tune data management
└── main.ts             # Application entry point
```

## License

This project is licensed under the MIT License. 