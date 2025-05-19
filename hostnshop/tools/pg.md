# HostNShop Architecture Diagram Concepts

## 1. Layered Architecture Diagram

```
+-------------------------------------------------------+
|                   Client Browser                      |
+-------------------------------------------------------+
                         ↓ ↑
+-------------------------------------------------------+
|             Presentation Layer                        |
| +---------------------------------------------------+ |
| |  Components     |     Pages     |     Hooks       | |
| +---------------------------------------------------+ |
+-------------------------------------------------------+
                         ↓ ↑                    ↑
+-------------------------------------------------------+  ↑
|             Application Layer                         |  |
| +---------------------------------------------------+ |  |
| |  Controllers   |   Services    |    Config        | |  |
| +---------------------------------------------------+ |  |
+-------------------------------------------------------+  |
                         ↓ ↑                    ↑        Shared
+-------------------------------------------------------+  Layer
|             Data Access Layer                         |  | 
| +---------------------------------------------------+ |  | (Types,
| | Repositories  |   Mappers     |  DB Client        | |  |  DTOs,
| +---------------------------------------------------+ |  |  Utils,
+-------------------------------------------------------+  |  Enums)
                         ↓ ↑                    ↑        ↓
+-------------------------------------------------------+
|                  Data Layer                           |
|          (PostgreSQL Database/Prisma)                 |
+-------------------------------------------------------+
```

## 2. Folder Structure Diagram

```
hostnshop/
├── src/
│   ├── presentation/           # Presentation Layer
│   │   ├── components/         # UI Components
│   │   │   ├── ui/             # Base UI elements
│   │   │   ├── admin/          # Admin components
│   │   │   └── client/         # Client-facing components
│   │   ├── pages/              # Page components
│   │   └── hooks/              # React hooks
│   │
│   ├── application/            # Application Layer
│   │   ├── controllers/        # API endpoints
│   │   ├── services/           # Business logic
│   │   └── config/             # App configuration
│   │
│   ├── data_access/            # Data Access Layer
│   │   ├── repositories/       # Data repositories
│   │   ├── mappers/            # Data mappers
│   │   └── db_client/          # Database client
│   │
│   ├── shared/                 # Shared Layer
│   │   ├── types/              # TypeScript types
│   │   ├── dtos/               # Data transfer objects
│   │   ├── enums/              # Enumerations
│   │   ├── middleware/         # Middleware functions
│   │   └── utils/              # Utility functions
│   │
│   └── app/                    # Next.js app directory
│       ├── api/                # API routes
│       ├── admin/              # Admin pages
│       ├── products/           # Product pages
│       └── ...                 # Other routes
│
├── prisma/                     # Prisma ORM
│   ├── schema.prisma           # Database schema
│   └── migrations/             # DB migrations
│
└── public/                     # Static assets
```

## 3. Deployment Architecture Diagram

```
+------------------------------------------------------+
|                     Docker Host                      |
|                                                      |
| +--------------------------------------------------+ |
| |                Docker Network                    | |
| |                                                  | |
| | +----------------+        +-------------------+  | |
| | |  HostNShop App |        |  PostgreSQL DB    |  | |
| | |                |<------>|                   |  | |
| | | - Next.js      |        | - Database        |  | |
| | | - API Routes   |        | - Port: 5432      |  | |
| | | - Port: 3000   |        |                   |  | |
| | +----------------+        +--------+----------+  | |
| |                                    |             | |
| |                                    v             | |
| |                           +------------------+   | |
| |                           | PostgreSQL       |   | |
| |                           | Volume           |   | |
| |                           | (persistent data)|   | |
| |                           +------------------+   | |
| +--------------------------------------------------+ |
+------------------------------------------------------+
        ^
        |
+---------------+
|   User        |
|   Browser     |
+---------------+
```

## 4. Key Architectural Patterns

### Service Locator Pattern
```
+-------------------+       +-----------------+
| Service Locator   |------>| Service A       |
| - getInstance()   |       +-----------------+
| - registerService()|      +-----------------+
| - getService()    |------>| Service B       |
+-------------------+       +-----------------+
        |                   +-----------------+
        +------------------>| Service C       |
                            +-----------------+
```

### Repository Pattern
```
+---------------+        +-------------------+        +--------------+
| Service Layer |------->| Repository        |------->| Database     |
|               |        | Interface         |        |              |
+---------------+        +-------------------+        +--------------+
                                  ^
                                  |
                         +-------------------+
                         | Repository        |
                         | Implementation    |
                         +-------------------+
```

### Base Controller Pattern
```
+------------------+
| Base Controller  |
| - handleRequest()|
| - sendResponse() |
| - handleError()  |
+------------------+
         ^
         |
+-----------------+-----------------+
|                 |                 |
+------------------+  +------------------+  +------------------+
| Product Controller|  | Order Controller |  | User Controller  |
+------------------+  +------------------+  +------------------+
```

### Project Report Data: HostNShop - A Next.js E-commerce Application

This report outlines the architecture and folder structure of the HostNShop application, a self-hosted fullstack Next.js e-commerce platform.

-----

## 1\. High-Level Architecture Diagram

The application follows a layered architecture to promote separation of concerns, maintainability, and scalability. The layers are as follows:

```mermaid
graph TD
    A[User/Client Browser] --> B{Presentation Layer};
    B --> C{Application Layer};
    C --> D{Data Access Layer};
    D --> E[Data Layer (PostgreSQL)];
    F[Shared Layer] --> B;
    F --> C;
    F --> D;

    subgraph "Browser/Client-Side"
        B
    end

    subgraph "Server-Side (Next.js API Routes & Backend Logic)"
        C
        D
    end

    subgraph "Database"
        E
    end

    subgraph "Common"
        F
    end

    classDef layer fill:#f9f,stroke:#333,stroke-width:2px;
    class B,C,D,E,F layer;
```

**Layer Descriptions:**

  * **Presentation Layer:**

      * Responsible for handling user interface and interaction.
      * Built with Next.js (App Router) and React components.
      * **Key Components:**
          * Next.js Pages & Layouts (`src/app/**/page.tsx`, `src/app/layout.tsx`)
          * React Components (`src/presentation/components/**`, `src/presentation/pages/**`)
          * Client-side API services (`src/lib/api/**`) for interacting with the application layer.
          * Static assets and public files (`public/`)

  * **Application Layer:**

      * Contains the core business logic and orchestrates data flow between the presentation and data access layers.
      * Handles API requests and business rule enforcement.
      * **Key Components:**
          * API Route Handlers (`src/app/api/**/route.ts`)
          * Controllers (`src/application/controllers/**`)
          * Services (`src/application/services/**`)
          * Service Locator for dependency management (`src/application/config/service_locator.ts`)

  * **Data Access Layer (DAL):**

      * Abstracts data storage and retrieval operations.
      * Provides a clean API for the application layer to interact with the database.
      * **Key Components:**
          * Prisma Client (`src/data_access/db_client/prisma_client.ts`)
          * Repositories (`src/data_access/repositories/**`) implementing interfaces for data operations.
          * Data Mappers (`src/data_access/mappers/prisma/**`) for transforming data between Prisma models and DTOs.

  * **Data Layer:**

      * The actual data storage, which is a PostgreSQL relational database.
      * Managed by Prisma ORM.
      * **Key Components:**
          * Prisma Schema (`prisma/schema.prisma`) defining database models and relations.
          * Prisma Migrations (`prisma/migrations/**`) for database schema evolution.
          * Docker configuration for PostgreSQL (`docker-compose.yml`).

  * **Shared Layer:**

      * Contains common utilities, types, DTOs, and configurations used across multiple layers.
      * Promotes code reuse and consistency.
      * **Key Components:**
          * Data Transfer Objects (DTOs) (`src/shared/dtos/**`)
          * Enums (`src/shared/enums/**`)
          * Type definitions (`src/shared/types/**`)
          * Utility functions (`src/shared/utils/**`, `src/utils/**`)
          * Middleware (e.g., `src/shared/middleware/auth.middleware.ts`)
          * UI component library utilities (`src/shared/lib/sdcn/utils.ts`)

-----

## 2\. Folder Structure Diagram

The project's folder structure is organized to reflect the layered architecture and Next.js conventions:

```
hostnshop/
├── prisma/                       # Prisma ORM configuration, schema, and migrations
│   ├── migrations/
│   └── schema.prisma
├── public/                       # Static assets (images, icons, manifest)
│   ├── assets/
│   └── uploads/                  # User uploaded files (e.g., product images)
├── scripts/                      # Utility scripts (e.g., create-admin, configure-branding)
├── src/
│   ├── app/                      # Next.js App Router (Presentation Layer - Pages/Routes, API Routes)
│   │   ├── (routes)/             # Route groups (e.g., admin, auth, products)
│   │   │   └── page.tsx
│   │   └── api/                  # API route handlers (Application Layer entry points)
│   │       └── (feature)/
│   │           └── route.ts
│   ├── application/              # Application Layer
│   │   ├── config/               # Configuration (e.g., service_locator.ts)
│   │   ├── controllers/          # Request handlers, orchestrate services
│   │   └── services/             # Business logic implementation
│   ├── data_access/              # Data Access Layer
│   │   ├── db_client/            # Database client setup (e.g., prisma_client.ts)
│   │   ├── mappers/              # Data transformation logic
│   │   └── repositories/         # Data access operations (using Prisma)
│   ├── lib/                        # Client-side libraries and services
│   │   ├── api/                  # Client-side API service wrappers
│   │   ├── store/                # State management (e.g., Zustand stores)
│   │   └── utils/                # General client-side utilities
│   ├── presentation/             # Presentation Layer Components
│   │   ├── components/           # Reusable UI components
│   │   └── pages/                # Page-level components (used by Next.js pages)
│   ├── shared/                   # Shared Layer (used across multiple layers)
│   │   ├── dtos/                 # Data Transfer Objects
│   │   ├── enums/                # Enumerations
│   │   ├── lib/                  # Shared libraries (e.g., UI component utils)
│   │   ├── middleware/           # Request/response middleware
│   │   └── types/                # TypeScript type definitions
│   └── utils/                    # General utility functions (can be shared)
├── components.json               # shadcn/ui configuration
├── Dockerfile                    # Docker configuration for building the application
├── docker-compose.yml            # Docker Compose for development/deployment
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies and scripts
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

-----

## 3\. Architecture Overview

The HostNShop application is designed with a **layered architecture**. This choice offers several benefits:

  * **Maintainability:** Each layer has distinct responsibilities, making it easier to understand, modify, and maintain the codebase. Changes in one layer are less likely to impact others directly. For instance, UI changes in the Presentation Layer should not necessitate changes in the business logic within the Application Layer.
  * **Scalability:** The separation allows for scaling different parts of the application independently. For example, the Application Layer can be scaled to handle more requests without directly affecting the database or UI components.
  * **Separation of Concerns:** Different aspects of the application (UI, business logic, data access) are clearly separated. This improves code organization and allows developers to focus on specific areas of expertise.
  * **Testability:** Individual layers can be tested in isolation, simplifying the testing process and improving test coverage.

**Database:**

The application utilizes **PostgreSQL**, a powerful open-source relational database. Interaction with the database is managed through **Prisma ORM**, which provides type-safe database access and simplifies data modeling, migrations, and querying. The Prisma schema (`prisma/schema.prisma`) defines the database tables, columns, and relationships, and migrations ensure controlled schema evolution.

**Key Architectural Patterns:**

Several key architectural patterns are employed within the HostNShop application:

  * **Service Locator:** The application uses a Service Locator pattern (`src/application/config/service_locator.ts`) for dependency management. This pattern provides a central point for obtaining service instances, decoupling components from concrete service implementations and making it easier to manage dependencies and replace service implementations if needed.
  * **Base Controller Inheritance:** Controllers in the Application Layer (e.g., `src/application/controllers/auth.controller.ts`, `product.controller.ts`) likely inherit from a `BaseController` (`src/application/controllers/base.controller.ts`). This pattern promotes code reuse for common controller functionalities such as request parsing, response formatting, and error handling.
  * **Repository and Service Layers:** The architecture clearly defines Service (`src/application/services/**`) and Repository (`src/data_access/repositories/**`) layers.
      * **Service Layer:** Encapsulates the application's business logic. Services orchestrate calls to repositories and other services to fulfill use cases.
      * **Repository Layer:** Abstracts the data persistence mechanism. Repositories provide a clean API for data access operations (CRUD), decoupling the Application Layer from the specific data storage technology (Prisma and PostgreSQL in this case). This makes it easier to change the ORM or database in the future if necessary.
  * **Reporting Mechanisms:** The system includes robust reporting and analytics capabilities, particularly for the admin dashboard. This is evident from:
      * Dedicated API routes for dashboard data (`src/app/api/admin/dashboard/**`) such as recent orders, low stock products, sales summaries, and analytics.
      * Backend services (`src/application/services/dashboard.service.ts`, `src/lib/api/dashboardService.ts`) responsible for aggregating and processing data for reports.
      * Frontend components specifically designed for displaying dashboard information (`src/presentation/components/dashboard/**`), including lists, timelines, and summaries.

This layered approach, combined with these design patterns, contributes to a well-structured, maintainable, and scalable e-commerce application.