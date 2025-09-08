# MovieDB Backend

## Installation

1. Clone repository
2. Move to develop branch 
```bash
git checkout develop
```
3. Install packages
```bash
npm i
```

## Run server
1. Create `.env` file based on `.env.example`
2. Run prisma db
```bash
npm run prisma:dev
```
3. Run server
```bash
npm run start:dev
```

## Endpoints

### /doc
Swagger documentation with requests example

### /api/auth
1. POST /signup

Request body:
```json
{
  "login": "johnDoe",
  "firstName": "John",
  "lastName": "Doe",
  "password": "john-doe-password"
}
```

Responses:
- Status code: 201
```json
{
  "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
  "login": "johnDoe",
  "firstName": "John",
  "lastName": "Doe"
}
```

- Status code: 409
```json
{
  "statusCode": 409,
  "message": "User already exists"
}
```

2. POST /login

Request: 
```json
{
  "login": "johnDoe",
  "password": "john-doe-password"
}
```

Responses:
- Status code: 200
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ildhcm5lciIsInVzZXJJZCI6IjNiOGRkNGJmLWUyZTItNGE0NS1iZGQ4LTcyN2Q3ZjJiMmI2ZiIsImlhdCI6MTc1NjY2NzQwMCwiZXhwIjoxNzU2NjcxMDAwfQ.tdccv4RijanLyorXExH6B497aanmHjV4ZoBK8StlxzQ"
}
```

- Status code: 401
```json
{
  "statusCode": 401,
  "message": "Invalid login or/and password"
}
```

### /api/user
1. GET

Responses:

- Status code: 200
```json
{
  "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
  "login": "johnDoe",
  "firstName": "John",
  "lastName": "Doe",
  "favourites": {
    "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
    "movieIds": [
      "movie-id"
    ]
  }
}
```
- Status code: 401 
```json
{
  "statusCode": 404,
  "message": "User is not found"
}
```

2. POST /check

Request: 
```json
{
  "login": "johnDoe"
}
```

Response: 
- Status code: 200
```json
{
  "isTaken": true
}
```

3. PATCH

Request:
```json
{
  "oldPassword": "john-doe-password",
  "newPassword": "new-password"
}
```

Responses:
- Status code: 200
```json
{
  "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
  "login": "johnDoe",
  "firstName": "John",
  "lastName": "Doe"
}
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

- Status code: 404
```json
{
  "statusCode": 404,
  "message": "User is not found"
}
```

- Status code: 409
```json
{
  "statusCode": 409,
  "message": "Password are not match"
}
```

4. DELETE

Responses:
- Status code: 204
- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

- Status code: 404
```json
{
  "statusCode": 404,
  "message": "User is not found"
}
```

### /api/favourites

1. GET

Responses:
- Status code: 200
```json
{
  "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
  "movieIds": [
    "movie-id"
  ],
  "personIds": [
    "person-id"
  ]
}
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

2. PATCH /movie/add

Request:
```json
{
  "id": "movie-id"
}
```

Responses:
- Status code: 200
```json
{
    "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
    "movieIds": [
        "movie-id"
    ],
    "personIds": []
}
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

3. PATCH /movie/delete

Request:
```json
{
  "id": "movie-id"
}
```

Responses:
- Status code: 200
```json
{
    "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
    "movieIds": [],
    "personIds": []
}
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

4. PATCH /persons/add

Request:
```json
{
  "id": "person-id"
}
```

Responses:
- Status code: 200
```json
{
    "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
    "movieIds": [],
    "personIds": ["person-id"]
}
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

5. PATCH /persons/delete

Request:
```json
{
  "id": "person-id"
}
```

Responses:
- Status code: 200
```json
{
    "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
    "movieIds": [],
    "personIds": []
}
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```