# 🏎️ Car Dealership Inventory System

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://car-dealership-inventory-system-sand.vercel.app/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Pytest Passed](https://img.shields.io/badge/Tests-36%20Passed-brightgreen?style=for-the-badge&logo=pytest)](https://docs.pytest.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> 🚀 **Live Demo**: [https://car-dealership-inventory-system-sand.vercel.app](https://car-dealership-inventory-system-sand.vercel.app/)

> A full-stack, enterprise-grade Car Dealership Inventory & Marketplace Management System built with **Test-Driven Development (TDD)** principles, **FastAPI**, **React 19**, **PostgreSQL**, and **Tailwind CSS**. Built as part of the **Incubyte AI Technical Assessment**.

---

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Features](#-features)
  - [Authentication & Security](#-authentication--security)
  - [Customer Marketplace](#-customer-marketplace)
  - [Admin Management](#-admin-management)
  - [UI/UX & Quality of Life](#-uiux--quality-of-life)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Database Migration](#database-migration)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Screenshots](#-screenshots)
- [Test Results](#-test-results)
- [Future Improvements](#-future-improvements)
- [Challenges Faced](#-challenges-faced)
- [Lessons Learned](#-lessons-learned)
- [AI Usage](#-ai-usage)
- [License](#-license)

---

## 🚗 Project Description

The **Car Dealership Inventory System** is a robust web application designed to streamline vehicle dealership operations, inventory control, sales tracking, and customer purchases.

Engineered using strict **Test-Driven Development (TDD)** methodology, the platform follows clean architectural principles—separating concerns across strict **Controller-Service-Repository** layers on the backend and modular, decoupled component views on the frontend.

### Key Highlights
- **Strict TDD Methodology**: 100% backend unit and integration test coverage across all domain services and REST endpoints prior to business logic delivery.
- **Role-Based Access Control (RBAC)**: Secure separation between regular Customers and privileged Dealership Administrators.
- **Transactional Consistency**: Atomic inventory decrementing and purchase recording to guarantee zero overselling under race conditions.
- **Modern Responsive UX**: Sleek glassmorphism UI built with React 19, Tailwind CSS v4, Framer Motion, and Zod validation.

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT-Based Authentication**: Secure access token generation using OAuth2 password flow with `HS256` signature algorithm.
- **User Registration & Login**: Account creation with instant password hashing via `bcrypt`.
- **Protected Routes**: Frontend and Backend guards preventing unauthorized access to restricted views.
- **Role-Based Authorization (RBAC)**: Granular permission controls enforcing `admin` vs `customer` capabilities.

### 🛒 Customer Marketplace
- **Vehicle Catalog Browsing**: Explore vehicle listings with rich metadata (Make, Model, Category, Price, Stock Status, Images).
- **Advanced Multi-Field Search & Filter**: Real-time filtering by keyword, price range, make, model, and vehicle category (Sports, Luxury, SUV, Electric).
- **One-Click Vehicle Purchase**: Atomic inventory checkout with live stock updates.
- **Paginated Purchase History**: Personal purchase archive with server-side pagination, search filters, and total spent analytics.

### 🛠 Admin Management
- **Analytics Dashboard**: Real-time sales metrics, revenue summaries, total inventory counts, and sales growth statistics.
- **Vehicle Lifecycle Management**: Complete CRUD capabilities—Add new inventory, update vehicle specs, edit pricing, and soft/hard deletion.
- **Restock Operations**: Instant inventory quantity top-ups with immediate marketplace reflection.

### 🎨 UI/UX & Quality of Life
- **Responsive Design**: Mobile-first design tailored for screens of all breakpoints (Desktop, Tablet, Mobile).
- **Toast Notifications**: Contextual feedback alerts for operations powered by `react-hot-toast`.
- **End-to-End Validation**: Strict input validation using **Zod** on client forms and **Pydantic v2** on backend requests.
- **Robust Exception Handling**: Global error boundary handling graceful degradation with standardized RFC-7807 error responses.

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core UI library for declarative component rendering |
| **TypeScript** | Type-safe development and interface contracts |
| **Vite 8** | Next-generation ultra-fast frontend build tooling |
| **Tailwind CSS v4** | Utility-first styling system and design tokens |
| **React Router v7** | Single Page Application (SPA) routing and navigation |
| **Axios** | HTTP client with automatic JWT token interceptors |
| **TanStack Query v5** | Asynchronous state management and caching |
| **Framer Motion** | Fluid UI transitions and micro-animations |
| **Zod & React Hook Form**| Client-side form management and schema validation |

### Backend

| Technology | Purpose |
| :--- | :--- |
| **FastAPI 0.115** | High-performance Python async web framework |
| **Python 3.10+** | Core programming language runtime |
| **SQLAlchemy 2.0** | Enterprise ORM for database modeling and query execution |
| **PostgreSQL 14+** | Production relational database engine |
| **Alembic 1.13** | Database schema version control and migrations |
| **Pytest 8.4** | Automated TDD testing suite |
| **Pydantic v2** | Data serialization, parsing, and request payload validation |
| **Passlib & Bcrypt** | Secure password hashing and verification |
| **PyJWT** | JSON Web Token encoding and decoding |

---

## 📐 System Architecture

The application enforces a **Layered Architecture** (Presentation Layer $\rightarrow$ Service Layer $\rightarrow$ Repository Layer $\rightarrow$ Database Layer) to promote testability, maintainability, and clean separation of concerns.

```mermaid
graph TD
    subgraph Client ["Client Layer (Frontend)"]
        UI["React 19 SPA"]
        Router["React Router v7"]
        State["TanStack Query / Context"]
        AxiosClient["Axios HTTP Client (JWT Interceptor)"]
        UI --> Router
        Router --> State
        State --> AxiosClient
    end

    subgraph API ["API & Middleware Layer (FastAPI)"]
        FastAPI["FastAPI REST Application"]
        CORS["CORS Middleware"]
        AuthMiddleware["JWT Bearer Guard (OAuth2)"]
        GlobalErr["Global Exception Handler"]
        
        AxiosClient -->|JSON / HTTPS| FastAPI
        FastAPI --- CORS
        FastAPI --- AuthMiddleware
        FastAPI --- GlobalErr
    end

    subgraph Business ["Business & Data Layer (Backend)"]
        Routers["API Routers (/auth, /vehicles, /purchases)"]
        ServiceLayer["Service Layer (AuthService, VehicleService, InventoryService)"]
        RepoLayer["Repository Layer (UserRepository, VehicleRepository, PurchaseRepository)"]
        
        FastAPI --> Routers
        Routers --> ServiceLayer
        ServiceLayer --> RepoLayer
    end

    subgraph Database ["Persistence Layer"]
        PostgreSQL[("PostgreSQL Database")]
        Alembic["Alembic Migrations"]
        
        RepoLayer -->|SQLAlchemy 2.0 ORM| PostgreSQL
        Alembic -->|Schema DDL| PostgreSQL
    end
```

---

## 📁 Folder Structure

<details>
<summary><b>Click to expand full repository directory structure</b></summary>

```text
car-dealership/
├── backend/
│   ├── alembic/                      # Alembic database migration scripts
│   │   ├── versions/                 # Revision history files
│   │   └── env.py                    # Migration configuration environment
│   ├── app/
│   │   ├── api/                      # REST API Endpoints (Controllers)
│   │   │   ├── auth.py               # Authentication & User registration routes
│   │   │   ├── inventory.py          # Purchase & Restock operations
│   │   │   ├── purchases.py          # Purchase history & Revenue analytics
│   │   │   └── vehicles.py           # Vehicle CRUD & Search routes
│   │   ├── auth/                     # Security helpers & JWT dependencies
│   │   │   └── security.py           # Password hashing & RBAC dependencies
│   │   ├── database/                 # Database engine & session setup
│   │   │   └── session.py            # SQLAlchemy SessionLocal & Base model
│   │   ├── models/                   # SQLAlchemy ORM Data Models
│   │   │   ├── user.py               # User table model
│   │   │   ├── vehicle.py            # Vehicle inventory table model
│   │   │   └── purchase.py           # Purchase transaction history model
│   │   ├── repositories/             # Data Access Layer (Repository Pattern)
│   │   │   ├── user_repository.py    # Direct DB access for users
│   │   │   ├── vehicle_repository.py # Direct DB access for vehicles
│   │   │   └── purchase_repository.py# Direct DB access for purchases
│   │   ├── schemas/                  # Pydantic Schemas (DTOs & Validation)
│   │   │   ├── auth.py               # Auth request/response schemas
│   │   │   ├── inventory.py          # Inventory request schemas
│   │   │   ├── purchase.py           # Purchase history schemas
│   │   │   └── vehicle.py            # Vehicle CRUD schemas
│   │   ├── services/                 # Core Business Logic Layer
│   │   │   ├── auth_service.py       # Authentication business rules
│   │   │   ├── inventory_service.py  # Stock management & transaction rules
│   │   │   ├── purchase_service.py   # Purchase history logic
│   │   │   └── vehicle_service.py    # Vehicle catalog business rules
│   │   ├── tests/                    # Pytest Unit & Integration Test Suite
│   │   │   ├── conftest.py           # Test fixtures & SQLite in-memory DB setup
│   │   │   ├── test_auth.py          # Authentication tests
│   │   │   ├── test_inventory.py     # Inventory & purchase transaction tests
│   │   │   ├── test_purchases.py     # Purchase history tests
│   │   │   └── test_vehicles.py      # Vehicle management tests
│   │   └── main.py                   # FastAPI Application Entry point
│   ├── alembic.ini                   # Alembic configuration file
│   ├── requirements.txt              # Backend Python dependencies
│   └── .env.example                  # Environment variable blueprint
│
├── frontend/
│   ├── src/
│   │   ├── assets/                   # Static media assets & images
│   │   ├── components/               # Reusable React components
│   │   │   ├── admin/                # Admin portal components & modals
│   │   │   ├── customer/             # Customer view components
│   │   │   ├── landing/              # Home landing page sections
│   │   │   └── common/               # Shared UI elements (Navbar, Footer, Cards)
│   │   ├── config/                   # API client configuration
│   │   ├── context/                  # React Auth & Theme Context Providers
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── layouts/                  # App layouts (AdminLayout, CustomerLayout)
│   │   ├── pages/                    # Main route pages
│   │   │   ├── admin/                # Dashboard, Vehicle Management, Revenue
│   │   │   ├── customer/             # Marketplace, Cart, History
│   │   │   └── auth/                 # Login & Registration pages
│   │   ├── routes/                   # Protected & Public routing setup
│   │   ├── schemas/                  # Zod validation schemas
│   │   ├── services/                 # Axios API request modules
│   │   ├── App.jsx                   # Root application component
│   │   └── main.jsx                  # React DOM mount point
│   ├── package.json                  # Frontend node dependencies
│   ├── vite.config.js                # Vite build configuration
│   ├── tailwind.config.js            # Tailwind CSS design system config
│   └── .env.example                  # Frontend environment blueprint
│
├── PROMPTS.md                        # Documentation of AI assistance prompts
└── README.md                         # Project documentation
```

</details>

---

## ⚙️ Installation & Setup

Follow these step-by-step instructions to get the application up and running on your local development environment.

### Prerequisites
- **Python**: `v3.10+`
- **Node.js**: `v18.0+`
- **PostgreSQL**: `v14.0+` (or local SQLite for testing)

---

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   - **On macOS/Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - **On Windows (PowerShell):**
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the `backend/` root directory (refer to [Environment Variables](#environment-variables)):
   ```bash
   cp .env.example .env
   ```

---

### Database Migration

1. **Ensure PostgreSQL is running** and create the target database:
   ```sql
   CREATE DATABASE car_dealership;
   ```

2. **Run Alembic migrations** to create tables:
   ```bash
   alembic upgrade head
   ```

3. **Start the FastAPI backend server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The backend API will be live at `http://localhost:8000`. API documentation is available at `http://localhost:8000/docs`.

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `frontend/` root directory:
   ```bash
   cp .env.example .env
   ```

4. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

### Environment Variables

#### Backend (`backend/.env`)

| Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+psycopg://postgres:password@localhost:5432/car_dealership` |
| `SECRET_KEY` | Secret key for signing JWT tokens | `super-secret-key-change-this-in-production` |
| `ALGORITHM` | JWT signing algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT expiration duration in minutes | `30` |

#### Frontend (`frontend/.env`)

| Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base endpoint URL for backend API | `http://localhost:8000/api` |

---

## 📡 API Endpoints

### 🔑 Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user (`customer` or `admin`) |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT Bearer token |

---

### 🚘 Vehicles (`/api/v1/vehicles`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/vehicles` | Public | Retrieve all vehicles in inventory |
| `GET` | `/api/v1/vehicles/search` | Public | Filter & search vehicles (make, model, price, etc.) |
| `POST` | `/api/v1/vehicles` | Authenticated | Create a new vehicle entry |
| `PUT` | `/api/v1/vehicles/{id}` | Authenticated | Update an existing vehicle's specifications |
| `DELETE` | `/api/v1/vehicles/{id}` | Admin | Delete a vehicle from inventory |

---

### 📦 Inventory & Operations (`/api/v1/vehicles`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/vehicles/{id}/purchase` | Authenticated | Atomically purchase vehicle stock |
| `POST` | `/api/v1/vehicles/{id}/restock` | Admin | Restock vehicle inventory quantity |

---

### 📊 Purchases & Revenue (`/api/v1/purchases`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/purchases/my-history` | Authenticated | Get current user's paginated purchase history |
| `GET` | `/api/v1/purchases/summary` | Admin | Get total dealership sales & revenue analytics |

---

## 🔒 Authentication Flow

The diagram below illustrates the JWT Authentication & Role-Based Authorization flow:

```mermaid
sequenceDiagram
    autonumber
    actor Client as User / Browser
    participant App as React Frontend
    participant API as FastAPI Backend
    participant Auth as AuthService & Security
    participant DB as PostgreSQL Database

    Client->>App: Submits Login Form (Email, Password)
    App->>API: POST /api/auth/login
    API->>Auth: Verify Credentials (bcrypt.verify)
    Auth->>DB: Query User Record
    DB-->>Auth: User Entity
    
    alt Invalid Credentials
        Auth-->>API: Raise InvalidCredentialsError
        API-->>App: HTTP 401 Unauthorized
        App-->>Client: Toast: "Invalid email or password"
    else Valid Credentials
        Auth->>Auth: Generate JWT Token (Sub, Role, Exp)
        Auth-->>API: Return Token Response
        API-->>App: HTTP 200 { access_token, token_type }
        App->>App: Store Token in LocalStorage / Auth Context
        App-->>Client: Redirect to Marketplace / Admin Dashboard
    end

    Note over Client, DB: Subsequent Authenticated Requests

    Client->>App: Click "Purchase Vehicle"
    App->>API: POST /api/v1/vehicles/{id}/purchase<br/>Header: Authorization: Bearer <JWT>
    API->>Auth: Depends(get_current_user)
    Auth->>Auth: Decode & Validate JWT Signature
    alt Invalid / Expired Token
        Auth-->>API: HTTP 401 Unauthorized
        API-->>App: Redirect to /login
    else Valid Token
        Auth-->>API: User Context Object (ID, Role)
        API->>DB: Execute Purchase Transaction
        DB-->>API: Success Response
        API-->>App: HTTP 200 OK
        App-->>Client: Toast: "Vehicle purchased successfully!"
    end
```

---

## 🖼️ Screenshots

<div align="center">

### Customer Marketplace
![Marketplace Overview](docs/screenshots/vehicle.png)

<br/>

### Vehicle Card Details
![Vehicle Card](docs/screenshots/vehicle-card.png)

<br/>

### Interactive Purchase History
![Purchase History](docs/screenshots/my-purchases.png)

</div>

---

## 🧪 Test Results

The backend core services were developed strictly adhering to **Test-Driven Development (TDD)**. Tests were written to define contracts before implementing API features.

### Test Execution Command
```bash
$env:PYTHONPATH='.'; pytest -v
```

### Pytest Execution Summary

```text
============================= test session starts =============================
platform win32 -- Python 3.13.5, pytest-8.4.2, pluggy-1.6.0
rootdir: D:\car-dealership\backend
plugins: anyio-4.14.2
collected 36 items

app/tests/test_auth.py .................                                  [ 25%]
app/tests/test_inventory.py ......                                        [ 41%]
app/tests/test_purchases.py .............                                 [ 77%]
app/tests/test_vehicles.py .......                                       [100%]

============================== 36 passed in 1.42s ==============================
```

### Coverage Breakdown

- **Authentication (`test_auth.py`)**: Covers registration, duplicate email handling, valid login token creation, invalid credentials rejection, and password hash verification.
- **Inventory & Transactions (`test_inventory.py`)**: Validates atomic purchase stock deduction, out-of-stock validation, insufficient inventory guards, and restock permissions.
- **Purchase History (`test_purchases.py`)**: Tests user-isolated purchase history queries, pagination boundaries, and admin revenue aggregation summary calculations.
- **Vehicle Catalog (`test_vehicles.py`)**: Validates vehicle creation, multi-attribute search filter logic, update mutations, and admin-only deletion enforcement.

---

## 🚀 Future Improvements

- [ ] **Microservices & Messaging Queues**: Integrate Celery and Redis/RabbitMQ for asynchronous receipt generation and customer email notifications.
- [ ] **Redis Catalog Caching**: Implement Redis caching layer on `/api/v1/vehicles` search endpoints to handle high-concurrency read throughput.
- [ ] **Payment Gateway Integration**: Integrate Stripe/Razorpay webhooks for live payment processing.
- [ ] **Containerization & Orchestration**: Provide `Dockerfile` and `docker-compose.yml` specs with Kubernetes deployment manifests.
- [ ] **Real-Time Stock Updates**: WebSocket connection for live stock status updates across active marketplace sessions.

---

## 💡 Challenges Faced

1. **Database Race Conditions During Purchases**:
   - *Challenge*: Simultaneous purchase requests could lead to negative stock levels or overselling.
   - *Solution*: Utilized atomic database updates and single-session transactional isolation inside `InventoryService` to guarantee data integrity under concurrent write load.

2. **Session Lifecycles & Dependency Injection**:
   - *Challenge*: Combining `VehicleRepository` and `PurchaseRepository` in `InventoryService` caused SQLAlchemy `DetachedInstanceError` when using separate DB sessions.
   - *Solution*: Refactored dependency injection in FastAPI to share a unified database session per HTTP request lifecycle.

3. **Complex Multi-Attribute Search Logic**:
   - *Challenge*: Filtering vehicles across optional query params (make, price bounds, category) while keeping code DRY.
   - *Solution*: Built dynamic SQLAlchemy query builders inside `VehicleRepository` that lazily append `.filter()` criteria based on populated Pydantic search models.

---

## 🎓 Lessons Learned

- **TDD Accelerates Refactoring**: Writing tests first eliminated regression risks when restructuring repositories and service dependencies.
- **Clean Layered Architecture Pays Off**: Separating database calls into Repositories allowed painless mock setup during unit testing with zero database setup overhead.
- **Strict Client-Server Schemas**: Mirroring Pydantic schemas with Zod types on the frontend ensured seamless contract alignment and early validation error handling.

---

## 🤖 AI Usage

Artificial Intelligence tools were utilized as strategic engineering copilots during the development of this project.

### Tools Utilized
- **ChatGPT (OpenAI)**
- **Antigravity (Google DeepMind Agentic Coding Assistant)**

### Key AI Collaboration Areas
1. **Brainstorming & Requirements Engineering**: Structuring domain entities, domain boundaries, and Incubyte assessment requirements.
2. **Architecture & Schema Design**: Discussing Repository pattern implementations, SQLAlchemy 2.0 ORM conventions, and JWT security practices.
3. **Debugging & Problem Solving**: Resolving SQLAlchemy session transaction edge cases and configuring Vite + Tailwind v4 build plugins.
4. **Documentation & Code Reviews**: Drafting technical README sections, API endpoint matrices, and reviewing code quality against PEP 8 standards.

> ⚠️ **Verification Statement**: All code generated or suggested by AI tools was thoroughly peer-reviewed, refactored to fit project architecture, and verified via automated test suites prior to integration.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
Made with ❤️ for the <b>Incubyte Technical Assessment</b>
</div>