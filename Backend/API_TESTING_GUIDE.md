# API Testing Guide - DeepCulture Backend

## 🚀 Import Postman Collection

1. Mở Postman
2. Click **Import** (góc trên bên trái)
3. Chọn file `DeepCulture_API.postman_collection.json`
4. Click **Import**

---

## 📋 Test Flow (Theo thứ tự)

### **1. Test Auth - Register**

**Endpoint:** `POST http://localhost:3000/api/auth/register`

**Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

---

### **2. Test Auth - Login**

**Endpoint:** `POST http://localhost:3000/api/auth/login`

**Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

---

### **3. Test Administrative Units - Create**

**Endpoint:** `POST http://localhost:3000/api/administrative-units`

**Body:**
```json
{
  "name": "Hà Nội",
  "level": "province"
}
```

**Expected Response (201):**
```json
{
  "id": 1,
  "name": "Hà Nội",
  "level": "province",
  "createdAt": "2026-01-09T...",
  "updatedAt": "2026-01-09T..."
}
```

**Tạo thêm vài records:**
```json
{"name": "Hưng Yên", "level": "province"}
{"name": "Bắc Ninh", "level": "province"}
{"name": "Văn Lâm", "level": "district"}
{"name": "Tân Tiến", "level": "commune"}
```

---

### **4. Test Get All**

**Endpoint:** `GET http://localhost:3000/api/administrative-units`

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "name": "Hà Nội",
    "level": "province",
    "createdAt": "...",
    "updatedAt": "..."
  },
  {
    "id": 2,
    "name": "Hưng Yên",
    "level": "province",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

### **5. Test Get by ID**

**Endpoint:** `GET http://localhost:3000/api/administrative-units/1`

**Expected Response (200):**
```json
{
  "id": 1,
  "name": "Hà Nội",
  "level": "province",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### **6. Test Filter by Level**

**Endpoint:** `GET http://localhost:3000/api/administrative-units?level=province`

**Expected Response (200):**
```json
[
  {"id": 1, "name": "Hà Nội", "level": "province", ...},
  {"id": 2, "name": "Hưng Yên", "level": "province", ...},
  {"id": 3, "name": "Bắc Ninh", "level": "province", ...}
]
```

---

### **7. Test Update**

**Endpoint:** `PUT http://localhost:3000/api/administrative-units/1`

**Body:**
```json
{
  "name": "Thành phố Hà Nội"
}
```

**Expected Response (200):**
```json
{
  "id": 1,
  "name": "Thành phố Hà Nội",
  "level": "province",
  "createdAt": "...",
  "updatedAt": "..." // Updated timestamp
}
```

---

### **8. Test Delete**

**Endpoint:** `DELETE http://localhost:3000/api/administrative-units/1`

**Expected Response (204):**
No content (empty body)

---

## ❌ Test Error Cases

### **1. Invalid Level**
```json
POST /api/administrative-units
{
  "name": "Test",
  "level": "invalid"
}

Response (400):
{
  "error": "Invalid level. Must be: province, district, or commune"
}
```

### **2. Missing Fields**
```json
POST /api/administrative-units
{
  "name": "Test"
}

Response (400):
{
  "error": "Name and level are required"
}
```

### **3. Not Found**
```json
GET /api/administrative-units/999

Response (404):
{
  "error": "Not found"
}
```

### **4. Duplicate Username**
```json
POST /api/auth/register
{
  "username": "testuser",  // Already exists
  "email": "another@example.com",
  "password": "password123"
}

Response (400):
{
  "error": "Username already exists"
}
```

---

## 🔍 Verify in Database

Sau khi test, kiểm tra trong PostgreSQL:

```sql
-- Xem tất cả users
SELECT * FROM users;

-- Xem tất cả administrative units
SELECT * FROM administrative_units;

-- Xem theo level
SELECT * FROM administrative_units WHERE level = 'province';

-- Đếm số lượng
SELECT level, COUNT(*) FROM administrative_units GROUP BY level;
```

---

## 📊 Quick Test Checklist

- [ ] Register user thành công
- [ ] Login với user vừa tạo
- [ ] Create administrative unit (province)
- [ ] Create administrative unit (district)
- [ ] Create administrative unit (commune)
- [ ] Get all administrative units
- [ ] Get by ID
- [ ] Filter by level
- [ ] Update administrative unit
- [ ] Delete administrative unit
- [ ] Test error: Invalid level
- [ ] Test error: Missing fields
- [ ] Test error: Not found
- [ ] Verify data in database

---

## 🎯 Expected Results

Sau khi chạy hết test flow:
- ✅ 1 user trong `users` table
- ✅ 4-5 records trong `administrative_units` table
- ✅ Tất cả API responses đúng format
- ✅ Timestamps tự động update
- ✅ Validation hoạt động đúng
