# API Reference

Technical documentation for the absence.io API integration.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

## Overview

The absence.io API v2 is a RESTful API that uses JSON for request and response bodies.

### API Version

- **Version**: v2
- **Protocol**: HTTPS
- **Format**: JSON
- **Authentication**: Hawk (HMAC-SHA256)

### Key Features

- Time tracking (timespans)
- Leave management
- Team calendars
- Reporting

This plugin focuses on **time tracking** functionality only.

## Authentication

### Hawk Authentication

absence.io uses **Hawk authentication**, an HTTP authentication scheme using HMAC.

#### Components

1. **User ID** (Key Identifier): Public identifier
2. **API Key**: Secret key for signing requests
3. **Timestamp**: Unix timestamp
4. **Nonce**: Random value (prevents replay attacks)
5. **MAC**: Message Authentication Code (HMAC-SHA256)

#### Algorithm

```
1. Generate timestamp (Unix seconds)
2. Generate nonce (random base64 string)
3. If payload exists:
   a. Create payload string: "hawk.1.payload\napplication/json\n{JSON}\n"
   b. Hash with SHA-256
   c. Encode as base64
4. Create normalized string:
   "hawk.1.header\n{timestamp}\n{nonce}\n{method}\n{path}\n{host}\n{port}\n{hash}\n\n"
5. HMAC-SHA256 with API key
6. Encode MAC as base64
7. Build Authorization header:
   "Hawk id=\"{userId}\", ts=\"{timestamp}\", nonce=\"{nonce}\", mac=\"{mac}\", hash=\"{hash}\""
```

#### Example Implementation

```javascript
async function generateHawkAuth(method, url, payload = null) {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(6))));
    const urlObj = new URL(url);
    
    // Hash payload if present
    let hash = '';
    if (payload) {
        const payloadString = `hawk.1.payload\napplication/json\n${JSON.stringify(payload)}\n`;
        const encoder = new TextEncoder();
        const data = encoder.encode(payloadString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        hash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
    }
    
    // Create normalized string
    const normalized = `hawk.1.header\n${timestamp}\n${nonce}\n${method}\n${urlObj.pathname}\n${urlObj.hostname}\n443\n${hash}\n\n`;
    
    // Generate MAC
    const encoder = new TextEncoder();
    const keyData = encoder.encode(apiKey);
    const cryptoKey = await crypto.subtle.importKey(
        'raw', keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false, ['sign']
    );
    
    const normalizedData = encoder.encode(normalized);
    const macBuffer = await crypto.subtle.sign('HMAC', cryptoKey, normalizedData);
    const mac = btoa(String.fromCharCode(...new Uint8Array(macBuffer)));
    
    // Build header
    let authHeader = `Hawk id="${userId}", ts="${timestamp}", nonce="${nonce}", mac="${mac}"`;
    if (hash) {
        authHeader += `, hash="${hash}"`;
    }
    
    return authHeader;
}
```

#### Request Headers

```http
POST /api/v2/timespans/create HTTP/1.1
Host: app.absence.io
Content-Type: application/json
Authorization: Hawk id="abc123", ts="1234567890", nonce="dGVzdA==", mac="abcd...", hash="efgh..."
```

## Base URL

```
https://app.absence.io/api/v2
```

All endpoints are relative to this base URL.

## Endpoints

### Create Timespan

Start a new time tracking entry.

**Endpoint:** `POST /timespans/create`

**Request Body:**
```json
{
    "userId": "user123",
    "start": "2024-01-30T08:00:00.000Z",
    "end": null,
    "timezoneName": "Europe/Madrid",
    "timezone": "+0100",
    "type": "work"
}
```

**Response:** `201 Created`
```json
{
    "_id": "timespan123",
    "userId": "user123",
    "start": "2024-01-30T08:00:00.000Z",
    "end": null,
    "timezoneName": "Europe/Madrid",
    "timezone": "+0100",
    "type": "work",
    "approved": false,
    "reasonId": null,
    "note": null,
    "created": "2024-01-30T08:00:05.123Z",
    "updated": "2024-01-30T08:00:05.123Z"
}
```

**Types:**
- `work` - Regular work hours
- `homeoffice` - Remote work
- `overtime` - Extra hours

### Query Timespans

Retrieve time tracking entries based on filters.

**Endpoint:** `POST /timespans`

**Request Body:**
```json
{
    "filter": {
        "userId": "user123",
        "end": { "$eq": null }
    },
    "limit": 10,
    "skip": 0
}
```

**Filter Operators:**
- `$eq` - Equals
- `$ne` - Not equals
- `$gt` - Greater than
- `$gte` - Greater than or equal
- `$lt` - Less than
- `$lte` - Less than or equal
- `$in` - In array
- `$nin` - Not in array

**Response:** `200 OK`
```json
{
    "data": [
        {
            "_id": "timespan123",
            "userId": "user123",
            "start": "2024-01-30T08:00:00.000Z",
            "end": null,
            "timezoneName": "Europe/Madrid",
            "timezone": "+0100",
            "type": "work",
            "approved": false,
            "created": "2024-01-30T08:00:05.123Z",
            "updated": "2024-01-30T08:00:05.123Z"
        }
    ],
    "total": 1,
    "limit": 10,
    "skip": 0
}
```

### Update Timespan

Modify an existing timespan (typically to set end time).

**Endpoint:** `PUT /timespans/{id}`

**Request Body:**
```json
{
    "start": "2024-01-30T08:00:00.000Z",
    "end": "2024-01-30T17:00:00.000Z",
    "timezoneName": "Europe/Madrid",
    "timezone": "+0100"
}
```

**Response:** `200 OK`
```json
{
    "_id": "timespan123",
    "userId": "user123",
    "start": "2024-01-30T08:00:00.000Z",
    "end": "2024-01-30T17:00:00.000Z",
    "timezoneName": "Europe/Madrid",
    "timezone": "+0100",
    "type": "work",
    "approved": false,
    "created": "2024-01-30T08:00:05.123Z",
    "updated": "2024-01-30T17:00:10.456Z"
}
```

## Data Models

### Timespan

Represents a time tracking entry.

```typescript
interface Timespan {
    _id: string;              // Unique identifier
    userId: string;           // User who owns this timespan
    start: string;            // ISO 8601 timestamp (UTC)
    end: string | null;       // ISO 8601 timestamp or null if active
    timezoneName: string;     // IANA timezone (e.g., "Europe/Madrid")
    timezone: string;         // Offset (e.g., "+0100")
    type: TimespanType;       // Type of work
    approved: boolean;        // Whether approved by manager
    reasonId: string | null;  // Reason code (if applicable)
    note: string | null;      // Optional note
    created: string;          // Creation timestamp
    updated: string;          // Last update timestamp
}

type TimespanType = 'work' | 'homeoffice' | 'overtime';
```

### Filter

Query filter for searching timespans.

```typescript
interface TimespanFilter {
    userId?: string;
    start?: DateFilter;
    end?: DateFilter | null;
    type?: string | string[];
    approved?: boolean;
}

interface DateFilter {
    $eq?: string;
    $ne?: string;
    $gt?: string;
    $gte?: string;
    $lt?: string;
    $lte?: string;
}
```

### Query Options

```typescript
interface QueryOptions {
    filter: TimespanFilter;
    limit?: number;    // Default: 20, Max: 100
    skip?: number;     // Default: 0
    sort?: {
        [field: string]: 1 | -1;  // 1 = ascending, -1 = descending
    };
}
```

## Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | Invalid credentials |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Temporary outage |

### Error Response Format

```json
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Validation failed: start is required"
}
```

### Common Errors

#### Invalid Credentials

```json
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Invalid authentication credentials"
}
```

**Cause**: Incorrect User ID or API Key

**Solution**: Verify credentials, generate new API Key if needed

#### No Active Timespan

When trying to clock out without an active clock-in:

```json
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "No active timespan found"
}
```

**Solution**: Clock in first, or handle gracefully in UI

#### Validation Error

```json
{
    "statusCode": 422,
    "error": "Unprocessable Entity",
    "message": "start must be a valid ISO 8601 date"
}
```

**Cause**: Invalid data format

**Solution**: Ensure timestamps are ISO 8601 format

## Rate Limiting

### Limits

absence.io implements rate limiting to prevent abuse:

- **Default**: 100 requests per minute per API key
- **Burst**: Short bursts allowed
- **Exceeded**: Returns 429 status code

### Headers

Response includes rate limit information:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

### Best Practices

1. **Cache results** when possible
2. **Batch requests** instead of making many individual calls
3. **Implement retry logic** with exponential backoff
4. **Monitor rate limit headers**

### Retry Logic Example

```javascript
async function makeRequestWithRetry(method, endpoint, payload, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        const result = await makeRequest(method, endpoint, payload);
        
        if (result.success || result.statusCode !== 429) {
            return result;
        }
        
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    return { success: false, error: 'Rate limit exceeded after retries' };
}
```

## Usage Examples

### Clock In

```javascript
const api = new AbsenceAPI(userId, apiKey, 'Europe/Madrid');
const result = await api.clockIn('work');

if (result.success) {
    console.log('Clocked in:', result.timespan._id);
} else {
    console.error('Error:', result.error);
}
```

### Clock Out

```javascript
const api = new AbsenceAPI(userId, apiKey, 'Europe/Madrid');
const result = await api.clockOut();

if (result.success) {
    const hours = result.duration / 3600;
    console.log(`Worked ${hours.toFixed(2)} hours`);
} else {
    console.error('Error:', result.error);
}
```

### Get Active Timespan

```javascript
const api = new AbsenceAPI(userId, apiKey, 'Europe/Madrid');
const timespan = await api.getActiveTimespan();

if (timespan) {
    console.log('Currently clocked in since:', timespan.start);
} else {
    console.log('Not clocked in');
}
```

### Get Today's Timespans

```javascript
const api = new AbsenceAPI(userId, apiKey, 'Europe/Madrid');
const result = await api.getTodayTimespans();

if (result.success) {
    const totalSeconds = result.timespans.reduce((sum, ts) => {
        if (ts.end) {
            const duration = new Date(ts.end) - new Date(ts.start);
            return sum + (duration / 1000);
        }
        return sum;
    }, 0);
    
    const hours = totalSeconds / 3600;
    console.log(`Total today: ${hours.toFixed(2)} hours`);
}
```

## Timezone Handling

### ISO 8601 Format

All timestamps must be in ISO 8601 format with milliseconds:

```
2024-01-30T08:00:00.000Z
```

### Timezone Offset

The plugin calculates the timezone offset:

```javascript
function getTimezoneOffset() {
    const date = new Date();
    const offset = -date.getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    return `${sign}${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;
}

// Examples:
// UTC+1: "+0100"
// UTC-5: "-0500"
```

### Common Timezones

| Region | Timezone | Offset (Winter) |
|--------|----------|-----------------|
| Spain | Europe/Madrid | +0100 (CET) |
| UK | Europe/London | +0000 (GMT) |
| US East | America/New_York | -0500 (EST) |
| US West | America/Los_Angeles | -0800 (PST) |
| Japan | Asia/Tokyo | +0900 (JST) |

## Further Resources

- **Official API Docs**: [api.absence.io](https://api.absence.io/)
- **Hawk Spec**: [github.com/hueniverse/hawk](https://github.com/hueniverse/hawk)
- **ISO 8601**: [en.wikipedia.org/wiki/ISO_8601](https://en.wikipedia.org/wiki/ISO_8601)

---

[← Back to Development](DEVELOPMENT.md) | [Next: Contributing →](CONTRIBUTING.md)
