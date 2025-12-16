# Backend (Node.js)
🔧 Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis (Upstash)
- Bull (Queue)
- JWT Authentication
- Helmet, Rate Limiting, CORS

Key Backend Features
- REST APIs for movie CRUD
- Asynchronous movie insertion using Bull Queue
- Redis-backed distributed queue
- Background worker for lazy DB insertion
- Indexed MongoDB collections for performance
- Secure APIs with rate limiting

backend/
├── src/
│   ├── config/        # DB & Redis config
│   ├── controllers/   # API logic
│   ├── models/        # Mongoose schemas
│   ├── queue/         # Bull queue & worker
│   ├── routes/        # Express routes
│   └── server.js

Distributed Queue Architecture
To ensure:
- Non-blocking API requests
- Better concurrency handling
- Improved DB performance under load

Flow - Client → API → Redis Queue → Background Worker → MongoDB
