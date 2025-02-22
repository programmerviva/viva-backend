# Viva Backend API Documentation

## Overview
- API Version: 1.0.0
- Base URL: `https://api.viva.com/v1`
- All timestamps are in ISO 8601 format
- All requests must be encoded in UTF-8

## Authentication
All endpoints except `/auth/*` require authentication:
```http
Authorization: Bearer <jwt_token>
```

## Security
- TLS 1.2+ required for all endpoints
- JWT tokens expire after 24 hours
- Refresh tokens valid for 30 days
- CORS enabled for authorized domains

## API Endpoints

### Authentication
#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string",
  "deviceId": "string" (optional)
}

Response (200):
{
  "accessToken": "string",
  "refreshToken": "string",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string",
    "role": "string"
  }
}
```

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "string",
  "password": "string",
  "username": "string",
  "fullName": "string",
  "acceptedTerms": "boolean"
}
```

### Content Management

#### Videos
##### Upload Video
```http
POST /videos/upload
Content-Type: multipart/form-data

videoFile: File (max: 2GB)
thumbnail: File (max: 2MB)
metadata: {
  "title": "string",
  "description": "string",
  "visibility": "public|private|unlisted",
  "tags": "string[]",
  "category": "string"
}

Response (201):
{
  "videoId": "string",
  "uploadUrl": "string",
  "processingStatus": "string"
}
```

##### Search Videos
```http
GET /videos/search
Query Parameters:
- q: string (search term)
- category: string
- sortBy: trending|latest|popular
- page: number
- limit: number
```

### Analytics

#### Channel Analytics
```http
GET /analytics/channel/:channelId
Query Parameters:
- timeRange: "7d"|"30d"|"90d"|"1y"
- metrics: "views,likes,subscribers,revenue"

Response (200):
{
  "overview": {
    "totalViews": "number",
    "totalSubscribers": "number",
    "totalRevenue": "number"
  },
  "trends": {
    "viewsGraph": [{ "date": "string", "value": "number" }],
    "subscribersGraph": [{ "date": "string", "value": "number" }]
  }
}
```

### Error Handling

#### Standard Error Response
```json
{
  "status": "error",
  "code": "ERROR_CODE",
  "message": "Human readable message",
  "details": {
    "field": ["error details"]
  },
  "timestamp": "ISO-8601 timestamp",
  "requestId": "string"
}
```

#### Common Error Codes
- `AUTH_REQUIRED`: Authentication required
- `INVALID_INPUT`: Validation failed
- `RESOURCE_NOT_FOUND`: Requested resource not found
- `RATE_LIMITED`: Too many requests
- `PERMISSION_DENIED`: Insufficient permissions

## Rate Limits
| Endpoint Category | Rate Limit |
|------------------|------------|
| Authentication   | 10/min     |
| Content Upload   | 30/hour    |
| API Calls        | 1000/hour  |

## Data Models

### Enhanced Video Model
```typescript
{
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  status: 'processing' | 'ready' | 'failed';
  visibility: 'public' | 'private' | 'unlisted';
  statistics: {
    views: number;
    likes: number;
    comments: number;
  };
  metadata: {
    duration: number;
    quality: string;
    size: number;
  };
  createdAt: string;
  updatedAt: string;
}
```

## Webhook Events
Subscribe to events at `/webhooks/configure`:
- `video.uploaded`
- `video.processed`
- `video.failed`
- `subscription.created`
- `subscription.canceled`

## SDK Support
Official SDKs:
- [JavaScript/TypeScript](https://github.com/viva/sdk-js)
- [Python](https://github.com/viva/sdk-python)
- [Java](https://github.com/viva/sdk-java)
