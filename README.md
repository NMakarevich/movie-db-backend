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

### 1. On local machine directly
1. Create `.env` file based on `.env.example` and uncomment DATABASE_URL which starts with `prisma+postgres`
2. Run prisma db
```bash
npm run prisma:dev
```
3. Run server
```bash
npm run start:dev
```

### 2. On Docker containers (recommended)
1. Install and run docker desktop
2. Create `.env` file based on `.env.example` and uncomment DATABASE_URL which starts with `postgresql`
3. Run docker compose
```bash
docker compose up 
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
  "favourites": [
    {
      "id": "f9fb234e-7315-4751-93f4-8809c652c744",
      "label": "Favourites",
      "ids": [],
      "userId": "dba19173-76a1-4217-9c9e-9d431eb9c5fc"
    },
    {
      "id": "73ae9c82-8c7c-4022-a06a-da794686a718",
      "label": "Watchlist",
      "ids": [],
      "userId": "dba19173-76a1-4217-9c9e-9d431eb9c5fc"
    }
  ]
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
[
  {
    "id": "f9fb234e-7315-4751-93f4-8809c652c744",
    "label": "Favourites",
    "ids": [],
    "userId": "dba19173-76a1-4217-9c9e-9d431eb9c5fc"
  },
  {
    "id": "73ae9c82-8c7c-4022-a06a-da794686a718",
    "label": "Watchlist",
    "ids": [],
    "userId": "dba19173-76a1-4217-9c9e-9d431eb9c5fc"
  }
]
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

2. PATCH /add

Request:
```json
{
  "contentId": "movie-id",
  "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3"
}
```

Responses:
- Status code: 200
```json
{
  "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
  "label": "Watchlist",
  "ids": [
    "movie-id"
  ],
  "userId": "484c3d98-2ade-470a-bb3b-fc26e1861104"
}
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

3. PATCH /delete

Request:
```json
{
  "contentId": "movie-id",
  "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3"
}
```

Responses:
- Status code: 200
```json
{
  "id": "02fad08d-6df2-4d7e-bcf1-1f252bc377b3",
  "label": "Watchlist",
  "ids": [],
  "userId": "484c3d98-2ade-470a-bb3b-fc26e1861104"
}
```

- Status code: 401
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```
