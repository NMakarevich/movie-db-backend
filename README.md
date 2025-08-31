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
npm run start: dev
```

## Endpoints

### /api/auth
1. POST /signup
2. POST /login

### /api/user
1. GET /:id 
2. PATCH /:id
3. DELETE /:id

### /api/favourites
1. PATCH /add
2. PATCH /delete