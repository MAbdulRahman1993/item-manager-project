# Postman API Test Collection

## Quick Setup

### 1. Import Files
1. Open Postman
2. Click "Import" button
3. Import both files:
   - `Item-Manager-API.postman_collection.json`
   - `Item-Manager-Environment.postman_environment.json`

### 2. Setup Test User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Select Environment
- Select "Item Manager Environment" from dropdown
- Verify `baseUrl` is set to `http://localhost:5000`

### 4. Run Tests
- **Individual**: Click "Send" on any request
- **Collection**: Use Collection Runner
- **Automated**: Use Newman CLI

## Test Categories

### 🔐 Authentication Tests
- Register User (with random data)
- Login User (with test credentials)
- Get User Profile

### 📝 Items CRUD Tests
- Get All Items
- Create Item
- Update Item
- Delete Item

## Newman CLI (Automation)

```bash
# Install Newman
npm install -g newman

# Run collection
newman run Item-Manager-API.postman_collection.json \
  -e Item-Manager-Environment.postman_environment.json \
  --reporters cli,json,html \
  --reporter-html-export report.html
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `baseUrl` | API base URL | `http://localhost:5000` |
| `authToken` | JWT token (auto-set) | `eyJhbGciOiJIUzI1NiIs...` |
| `testUserEmail` | Test user email | `test@example.com` |
| `testUserPassword` | Test user password | `password123` |
| `itemId` | Item ID (auto-set) | `507f1f77bcf86cd799439011` |

---

**Total**: 7 API requests with automated test scripts  
**Coverage**: 100% API endpoints  
**Status**: ✅ Ready to use
