# DeepCulture Backend

Backend API cho dự án DeepCulture, được xây dựng với Node.js, TypeScript, Express và PostgreSQL theo kiến trúc Clean Architecture.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc](#kiến-trúc)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt](#cài-đặt)
- [Cấu hình](#cấu-hình)
- [Chạy ứng dụng](#chạy-ứng-dụng)
- [Database Migration](#database-migration)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)

## 🎯 Tổng quan

DeepCulture Backend là một RESTful API server được thiết kế theo nguyên tắc Clean Architecture, đảm bảo tính module hóa, dễ bảo trì và mở rộng. Dự án sử dụng TypeORM để quản lý database và Dependency Injection để quản lý các phụ thuộc.

## 🏗️ Kiến trúc

Dự án tuân theo **Clean Architecture** với các layer được tách biệt rõ ràng:

```
┌─────────────────────────────────────────┐
│           API Layer (Routes)            │
│        Controllers & Middlewares        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Domain Layer (Business)         │
│      Use Cases & Domain Entities        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Data Layer (Access)            │
│    Repositories & Data Models (ORM)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Infrastructure Layer (External)    │
│     Database, Services, Utilities       │
└─────────────────────────────────────────┘
```

### Các Layer chính:

- **API Layer** (`src/api`): Controllers, Routes, Middlewares - xử lý HTTP requests/responses
- **Domain Layer** (`src/domain`): Business logic, Use Cases, Domain Entities - logic nghiệp vụ
- **Data Layer** (`src/data`): Repositories implementation, Data Models - truy cập dữ liệu
- **Infrastructure Layer** (`src/infra`): Database connection, External services
- **Core Layer** (`src/core`): Dependency Injection, Shared utilities

## 🛠️ Công nghệ sử dụng

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Architecture Pattern**: Clean Architecture
- **Design Pattern**: Dependency Injection, Repository Pattern

### Dependencies chính:

```json
{
  "express": "^5.2.1",
  "typeorm": "^0.3.28",
  "pg": "^8.16.3",
  "dotenv": "^17.2.3",
  "reflect-metadata": "^0.2.2"
}
```

## 📦 Cài đặt

### Yêu cầu hệ thống:

- Node.js >= 16.x
- PostgreSQL >= 12.x
- npm hoặc yarn

### Các bước cài đặt:

1. **Clone repository**
```bash
git clone <repository-url>
cd Backend
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Tạo database PostgreSQL**
```bash
psql -U postgres
CREATE DATABASE deepculture;
\q
```

4. **Cấu hình environment variables** (xem phần [Cấu hình](#cấu-hình))

5. **Chạy migrations**
```bash
npm run migration:run
```

## ⚙️ Cấu hình

Tạo file `.env` trong thư mục root với nội dung:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=deepculture

# Server Configuration
PORT=3000
NODE_ENV=development
```

> **Lưu ý**: File `.env.development` đã có sẵn làm template, bạn có thể copy và chỉnh sửa.

## 🚀 Chạy ứng dụng

### Development mode (với hot-reload):
```bash
npm run dev
```

### Production mode:
```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

## 🗄️ Database Migration

TypeORM được sử dụng để quản lý database schema:

### Tạo migration mới:
```bash
npm run migration:create -- src/infra/database/migrations/MigrationName
```

### Generate migration từ entities:
```bash
npm run migration:generate -- src/infra/database/migrations/MigrationName
```

### Chạy migrations:
```bash
npm run migration:run
```

### Revert migration gần nhất:
```bash
npm run migration:revert
```

## 📁 Cấu trúc thư mục

```
Backend/
├── src/
│   ├── api/                    # API Layer
│   │   ├── controllers/        # Request handlers
│   │   ├── middlewares/        # Express middlewares
│   │   └── routes/             # Route definitions
│   │
│   ├── domain/                 # Domain Layer
│   │   ├── entities/           # Domain entities (business models)
│   │   ├── repositories/       # Repository interfaces
│   │   └── usecases/           # Business logic use cases
│   │       ├── auth/           # Authentication use cases
│   │       └── administrative-unit/  # Administrative unit use cases
│   │
│   ├── data/                   # Data Layer
│   │   ├── models/             # TypeORM entities (database models)
│   │   └── repositories/       # Repository implementations
│   │
│   ├── infra/                  # Infrastructure Layer
│   │   ├── database/           # Database configuration & migrations
│   │   └── services/           # External services
│   │
│   ├── core/                   # Core utilities
│   │   └── di/                 # Dependency Injection modules
│   │       └── modules/        # DI module definitions
│   │
│   └── index.ts                # Application entry point
│
├── .env                        # Environment variables (git-ignored)
├── .env.development            # Development environment template
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

### Chi tiết các thư mục:

#### `src/api/` - API Layer
- **controllers/**: Xử lý HTTP requests, gọi use cases và trả về responses
- **routes/**: Định nghĩa các API endpoints
- **middlewares/**: Authentication, validation, error handling

#### `src/domain/` - Domain Layer
- **entities/**: Domain models (business entities) - không phụ thuộc vào database
- **repositories/**: Interfaces cho data access (Dependency Inversion)
- **usecases/**: Business logic thuần túy, orchestrate các operations

#### `src/data/` - Data Layer
- **models/**: TypeORM entities (database schema definitions)
- **repositories/**: Implement repository interfaces từ domain layer

#### `src/infra/` - Infrastructure Layer
- **database/**: Database connection, migrations
- **services/**: External services (email, storage, etc.)

#### `src/core/` - Core Layer
- **di/**: Dependency Injection container và modules

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register       # Đăng ký user mới
POST   /api/auth/login          # Đăng nhập
```

### Administrative Units
```
GET    /api/administrative-units              # Lấy danh sách đơn vị hành chính
GET    /api/administrative-units/:id          # Lấy chi tiết đơn vị hành chính
POST   /api/administrative-units              # Tạo đơn vị hành chính mới
PUT    /api/administrative-units/:id          # Cập nhật đơn vị hành chính
DELETE /api/administrative-units/:id          # Xóa đơn vị hành chính
```

> **Postman Collection**: Import file `DeepCulture_API.postman_collection.json` để test API

## 📜 Scripts

```json
{
  "dev": "nodemon --exec ts-node src/index.ts",           // Chạy dev server
  "build": "tsc",                                          // Build production
  "start": "node dist/index.js",                          // Chạy production
  "migration:generate": "...",                            // Generate migration
  "migration:create": "...",                              // Tạo migration rỗng
  "migration:run": "...",                                 // Chạy migrations
  "migration:revert": "..."                               // Revert migration
}
```

## 🏛️ Design Patterns

### 1. Clean Architecture
- Tách biệt business logic khỏi framework và database
- Dependency Rule: Dependencies chỉ trỏ vào trong (domain không phụ thuộc vào data/infra)

### 2. Repository Pattern
- Abstract data access logic
- Domain layer định nghĩa interfaces, Data layer implement

### 3. Dependency Injection
- Sử dụng DI modules để quản lý dependencies
- Dễ dàng test và swap implementations

### 4. Use Case Pattern
- Mỗi use case đại diện cho một business operation
- Single Responsibility Principle

## 🧪 Testing

```bash
npm test
```

> **Lưu ý**: Test suite đang được phát triển

## 📝 Coding Conventions

- **TypeScript**: Strict mode enabled
- **Naming**: 
  - Classes: PascalCase
  - Files: PascalCase cho classes, camelCase cho utilities
  - Variables/Functions: camelCase
- **Imports**: Absolute imports từ `src/`
- **Error Handling**: Sử dụng custom error classes

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

[Specify your license here]

## 👥 Authors

[Your team information]

---

**Happy Coding! 🚀**
