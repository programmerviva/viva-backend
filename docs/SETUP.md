# Viva Backend Setup Guide

## System Requirements

### Minimum Requirements
- Node.js v16.x or higher
- MongoDB v5.0 or higher
- Redis v6.2 or higher
- 2GB RAM (4GB recommended)
- 10GB storage space

### Recommended Tools
- VS Code with extensions:
  - ESLint
  - Prettier
  - MongoDB for VS Code
  - Thunder Client
- MongoDB Compass
- Postman/Insomnia

## Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/viva-backend.git
cd viva-backend
```

### 2. Environment Setup
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use correct Node version
nvm install 16
nvm use 16

# Install global dependencies
npm install -g pm2 typescript ts-node nodemon
```

### 3. Project Configuration

Create `.env.development`:
```env
# Server
PORT=8000
NODE_ENV=development
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/viva
MONGODB_TEST_URI=mongodb://localhost:27017/viva_test
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

# Services
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass

# Monitoring
SENTRY_DSN=your_sentry_dsn
NEW_RELIC_LICENSE_KEY=your_newrelic_key
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Database Setup
```bash
# Start MongoDB service
mongod --dbpath /path/to/data/directory

# Create database indexes (run from project root)
npm run setup-db
```

### 6. Start Development Server
```bash
npm run dev
```

## Development Workflow

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Before committing
npm run lint
npm run test
npm run build

# Commit with conventional commits
git commit -m "feat: add user authentication"
```

### Database Management
```bash
# Create database backup
npm run db:backup

# Restore database
npm run db:restore

# Run migrations
npm run migration:up

# Generate new migration
npm run migration:create name_of_migration
```

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

## Deployment

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Docker Deployment
```dockerfile
# Multi-stage build example
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --production
EXPOSE 8000
CMD ["npm", "start"]
```

### CI/CD Pipeline (.github/workflows/main.yml)
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Tests
        run: |
          npm ci
          npm test
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        run: |
          # Deployment steps
```

## Monitoring & Logging

### Logging Configuration
```typescript
// config/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
```

### Health Checks
```bash
# Endpoint: GET /health
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 123456,
  "memory": {
    "used": "125MB",
    "total": "512MB"
  },
  "cpu": "25%",
  "services": {
    "database": "connected",
    "redis": "connected",
    "storage": "connected"
  }
}
```

## Performance Optimization

### Node.js Configuration
```bash
# PM2 Ecosystem File (ecosystem.config.js)
module.exports = {
  apps: [{
    name: 'viva-api',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  }]
}
```

### Caching Strategy
- Redis caching for:
  - User sessions
  - API responses (5 minutes)
  - Video metadata (1 hour)
  - Search results (15 minutes)

## Security Checklist

✅ CORS configuration
✅ Rate limiting
✅ API key rotation
✅ Input validation
✅ XSS protection
✅ CSRF tokens
✅ Security headers
✅ SQL injection prevention
✅ Regular dependency updates
✅ Audit logging

## Troubleshooting

### Common Issues
1. MongoDB Connection
   - Check network connectivity
   - Verify credentials
   - Check MongoDB service status

2. File Upload
   - Verify storage permissions
   - Check file size limits
   - Validate file types

3. Performance
   - Monitor memory usage
   - Check database indexes
   - Analyze slow queries
