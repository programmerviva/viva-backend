# Viva Backend

A scalable and feature-rich backend service for a modern video sharing and social media platform built with Node.js and MongoDB.

## 🌟 Key Features

### Content Management
- Video upload and streaming with adaptive bitrate
- Tweet system for short-form content
- Playlist creation and management
- Comment system with threaded replies
- Like/Unlike functionality for videos, comments, and tweets

### User Management
- JWT-based authentication
- Role-based authorization
- Profile customization
- Avatar and cover image upload
- Password reset and email verification

### Channel Features
- Channel subscription system
- Channel analytics and statistics
- Video analytics
- Subscriber tracking and insights
- Custom channel URLs

### Advanced Features
- Real-time notifications
- Search functionality with filters
- View tracking and analytics
- Trending videos algorithm
- Content moderation tools

## 🛠️ Tech Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest & Supertest
- **Validation**: Express-validator
- **Logging**: Winston

## 📦 Installation

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/viva-backend.git
cd viva-backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Database Setup**
```bash
# Start MongoDB
mongod --dbpath /your/data/path

# Run migrations (if any)
npm run migrate
```

5. **Start Server**
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## 🔧 Configuration

Required environment variables:

```env
PORT=8000
MONGODB_URI=your_mongodb_uri
DB_NAME=view
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📚 API Documentation

Detailed API documentation is available at:
- Development: `http://localhost:8000/api-docs`
- Production: `https://api.viva.com/api-docs`

Key endpoints:

```http
# Authentication
POST /api/v1/users/register
POST /api/v1/users/login

# Videos
POST /api/v1/videos
GET /api/v1/videos/:videoId

# Social
POST /api/v1/comments
POST /api/v1/likes/toggle/:videoId
POST /api/v1/subscriptions/toggle/:channelId

# Playlists
POST /api/v1/playlists
POST /api/v1/playlists/:playlistId/videos
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep="Auth"

# Coverage report
npm run test:coverage
```

## 🚀 Deployment

### Docker
```bash
# Build image
docker build -t viva-backend .

# Run container
docker run -p 8000:8000 viva-backend
```

### Manual
```bash
# Build
npm run build

# Start production server
NODE_ENV=production npm start
```

## 📈 Monitoring

- Health Check: `GET /api/v1/health`
- Metrics: `GET /api/v1/metrics`
- Logs: `logs/{environment}.log`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and queries:
- Create an issue
- Contact: support@viva.com
- Documentation: [docs/](./docs)

## 🔐 Security

Report security vulnerabilities to sd.vikasvaibhav@gmail.com

