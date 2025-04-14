\*\*# Library Management System API

A robust and scalable RESTful API for managing library resources and operations. This project demonstrates modern backend development practices using TypeScript, Express, and Prisma ORM.

## 📚 API Documentation

The API documentation is available at [SwaggerHub](https://app.swaggerhub.com/apis-docs/JAKIRULISLAMHAKIM_1/library-management-system-api/1.0.0)

## 🎯 Key Technical Implementations

### Database Operations

- Implemented CRUD operations using both Prisma ORM and Raw SQL queries
- Created database relationships and models using Prisma Schema
- Optimized database queries for better performance
- Implemented database migrations and seeding

### API Development

- Built RESTful API endpoints following best practices
- Implemented proper error handling and validation
- Set up rate limiting and security measures

### Development Practices

- Used TypeScript for type safety and better code quality
- Implemented proper logging system using Winston
- Set up ESLint and Prettier for code formatting
- Created comprehensive API documentation using Swagger
- Implemented environment variable management
- Set up proper error handling and validation using Zod

- **Security Features**

  - Rate limiting
  - CORS protection
  - Helmet security headers
  - Input validation using Zod
  - Environment variable management

- **API Documentation**
  - Swagger/OpenAPI documentation
  - Detailed API endpoints documentation
  - Interactive API testing interface

## 🛠️ Tech Stack

- **Runtime Environment**

  - Node.js v20.18.2
  - TypeScript
  - Express.js

- **Database & ORM**

  - Prisma ORM
  - PostgreSQL (via Prisma)

## 🚀 Getting Started

### Prerequisites

- Node.js v20.18.2 or higher
- PostgreSQL database

### Installation

1. Clone the repository

```bash
git clone https://github.com/jakirulislamhakim/library-management-system-backend.git
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration

4. Generate Prisma client

```bash
pnpm prisma generate
```

5. Run database migrations

```bash
pnpm prisma migrate dev
```

6. Start the development server

```bash
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm prod` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prettier` - Format code with Prettier
- `pnpm deploy` - Deploy to Vercel

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/library_db"


## 👤 Author

**Jakirul Islam Hakim**

- GitHub: [@JAKIRULISLAMHAKIM](https://github.com/JAKIRULISLAMHAKIM)

```
