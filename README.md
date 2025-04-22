

## 📘 API Documentation

### 🔐 Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/users/create_user` | `POST` | Register a new user |
| `/users/login` | `POST` | Login user and receive tokens |
| `/users/logout` | `POST` | Logout the current user |
| `/users/me` | `GET` | Get current user data |
| `/users/refresh` | `GET` | Refresh access token |
| `/users/{id}` | `DELETE` | Delete a user by ID |

#### 📩 Register a New User

**Endpoint:** `POST /users/create_user`  
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword",
  "first_name": "John",
  "last_name": "Doe"
}
```
**Response:** `201 Created`  
User registered successfully.

#### 🔑 Login

**Endpoint:** `POST /users/login`  
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword"
}
```
**Response:** `201 Created`  
Returns access and refresh tokens.

---

### ✅ Tasks

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/tasks` | `GET` | Get all tasks |
| `/tasks/create_task` | `POST` | Create a new task |
| `/tasks/{id}` | `GET` | Get a task by ID |
| `/tasks/{id}` | `DELETE` | Delete a task by ID |
| `/tasks/edit/{id}` | `POST` | Edit a task |
| `/tasks/user/{id}` | `GET` | Get all tasks for a specific user |

#### 📝 Create a Task

**Endpoint:** `POST /tasks/create_task`  
**Request Body:**
```json
{
  "user_id": "123",
  "title": "My Task",
  "description": "This is a test task",
  "status": "pending",
  "priority": "high",
  "due_date": "2025-05-01T12:00:00Z"
}
```
**Response:** `201 Created`  
Returns the created task.

#### 📌 Get Tasks for a User

**Endpoint:** `GET /tasks/user/{id}`  
**Example:** `/tasks/user/123`  
**Response:** `200 OK`  
Returns an array of tasks for the user.

---

### 📤 Edit a Task

**Endpoint:** `POST /tasks/edit/{id}`  
**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "done",
  "priority": "low",
  "due_date": "2025-05-02T09:00:00Z"
}
```
**Response:** `201 Created`  
Task updated successfully.

---



---

