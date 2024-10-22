# Task Explanation

## API Endpoints

POST /api/users/create - Create a new user with Name and Avatar.

GET /api/users/all - Get all users.

GET /api/users/get/top - Get top 10 users with most points.

GET /api/users/history/:userId - Get user claim history.

PUT /api/points/add/:userId - Add random points to user.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

In backend Folder

`PORT`
`CORS_ORIGIN`
`MEMORY`

`MONGODB_URI`

`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`

In frontend Folder

`VITE_BASE_URL`

## Run Locally

Clone the repository:

```bash
  git clone https://github.com/Lohit-Behera/Task-Explanation.git
  cd Task-Explanation
```

**Running using [Docker](https://www.docker.com/)**

in root directory

```bash
  docker compose up
```

Then go to [localhost:5173](http://localhost:5173/) for frontend and [localhost:8000](http://localhost:8000/) for backend

**Running without Docker**

Clone the repository:

```bash
  git clone https://github.com/Lohit-Behera/Task-Explanation.git
  cd Task-Explanation
```

Now change directory to backend

```bash
  cd backend
```

Install node modules

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

In another terminal for React js

Now change directory to frontend

```bash
  cd Task-Explanation
  cd frontend
```

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Then go to [http://localhost:5173](http://localhost:5173)
