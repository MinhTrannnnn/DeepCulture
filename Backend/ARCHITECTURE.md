# DeepCulture Backend - Refactored Architecture

## 📁 Cấu trúc thư mục sau khi refactor

```
src/
├── api/                          # API Layer (Controllers, Routes)
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   └── AdministrativeUnitController.ts
│   └── routes/
│       ├── authRoutes.ts
│       └── administrativeUnitRoutes.ts
│
├── core/                         # Core Infrastructure
│   └── di/                       # Dependency Injection
│       └── modules/              # DI Modules (NEW!)
│           ├── AuthModule.ts
│           └── AdministrativeUnitModule.ts
│
├── domain/                       # Domain Layer (Business Logic)
│   ├── entities/
│   │   ├── User.ts
│   │   └── AdministrativeUnit.ts
│   ├── repositories/             # Repository Interfaces
│   │   ├── UserRepository.ts
│   │   └── AdministrativeUnitRepository.ts
│   └── usecases/                 # Use Cases (Organized by feature!)
│       ├── auth/                 # Auth feature
│       │   └── LoginUser.ts
│       └── administrative-unit/  # Administrative Unit feature
│           ├── CreateAdministrativeUnit.ts
│           ├── GetAdministrativeUnit.ts
│           ├── ListAdministrativeUnits.ts
│           ├── UpdateAdministrativeUnit.ts
│           └── DeleteAdministrativeUnit.ts
│
├── data/                         # Data Layer (Database)
│   ├── models/                   # TypeORM Models
│   │   ├── UserModel.ts
│   │   └── AdministrativeUnitModel.ts
│   └── repositories/             # Repository Implementations
│       ├── UserRepositoryImpl.ts
│       └── AdministrativeUnitRepositoryImpl.ts
│
├── infra/                        # Infrastructure
│   └── database/
│       ├── postgres.ts
│       └── migrations/
│           └── *-CreateAdministrativeUnitsTable.ts
│
└── index.ts                      # Main App (CLEAN!)
```

---

## ✨ Những gì đã thay đổi

### **1. Module-based Dependency Injection**

**Trước (index.ts - 47 dòng):**
```typescript
// Manual DI - Rất loạn!
const userRepository = new UserRepositoryImpl();
const loginUseCase = new LoginUser(userRepository);
const authController = new AuthController(loginUseCase);

const adminUnitRepo = new AdministrativeUnitRepositoryImpl();
const createAdminUnit = new CreateAdministrativeUnit(adminUnitRepo);
const getAdminUnit = new GetAdministrativeUnit(adminUnitRepo);
// ... 10 dòng nữa
```

**Sau (index.ts - 20 dòng):**
```typescript
// Module-based DI - Gọn gàng!
import { AuthModule } from './core/di/modules/AuthModule';
import { AdministrativeUnitModule } from './core/di/modules/AdministrativeUnitModule';

app.use('/api/auth', createAuthRoutes(AuthModule.controller));
app.use('/api/administrative-units', createAdministrativeUnitRoutes(AdministrativeUnitModule.controller));
```

### **2. Use Cases được tổ chức theo Feature**

**Trước:**
```
usecases/
├── LoginUser.ts
├── CreateAdministrativeUnit.ts
├── GetAdministrativeUnit.ts
├── ListAdministrativeUnits.ts
├── UpdateAdministrativeUnit.ts
├── DeleteAdministrativeUnit.ts
└── ... (sẽ có 100+ files khi mở rộng)
```

**Sau:**
```
usecases/
├── auth/
│   └── LoginUser.ts
├── administrative-unit/
│   ├── CreateAdministrativeUnit.ts
│   ├── GetAdministrativeUnit.ts
│   ├── ListAdministrativeUnits.ts
│   ├── UpdateAdministrativeUnit.ts
│   └── DeleteAdministrativeUnit.ts
├── place/          (sẽ thêm sau)
└── person/         (sẽ thêm sau)
```

---

## 🎯 Cách thêm feature mới

### **Ví dụ: Thêm Place feature**

#### **Bước 1: Tạo use cases**
```
src/domain/usecases/place/
├── CreatePlace.ts
├── GetPlace.ts
├── ListPlaces.ts
├── UpdatePlace.ts
└── DeletePlace.ts
```

#### **Bước 2: Tạo PlaceModule**
```typescript
// src/core/di/modules/PlaceModule.ts
export class PlaceModule {
    private static repository = new PlaceRepositoryImpl();
    
    private static createUseCase = new CreatePlace(this.repository);
    private static getUseCase = new GetPlace(this.repository);
    // ...
    
    public static controller = new PlaceController(
        this.createUseCase,
        this.getUseCase,
        // ...
    );
}
```

#### **Bước 3: Đăng ký trong index.ts**
```typescript
import { PlaceModule } from './core/di/modules/PlaceModule';

app.use('/api/places', createPlaceRoutes(PlaceModule.controller));
```

**Chỉ 3 bước! Không cần sửa gì khác!** ✅

---

## 🚀 Lợi ích

1. **index.ts rất gọn** - Chỉ import modules, không có DI logic
2. **Use cases có tổ chức** - Group theo feature, dễ tìm
3. **Dễ mở rộng** - Thêm feature mới chỉ cần tạo module
4. **Dễ test** - Có thể mock modules
5. **Maintainable** - Mỗi module quản lý DI của riêng nó

---

## 📝 Next Steps

Khi thêm các entities mới (Place, Person, Dynasty, etc.), làm theo pattern:

1. Tạo folder trong `usecases/` (vd: `usecases/place/`)
2. Tạo Module trong `core/di/modules/` (vd: `PlaceModule.ts`)
3. Import module vào `index.ts`

**Không bao giờ thêm DI logic trực tiếp vào index.ts nữa!** ✅
