# Global Trend – API Integration Assignment
This project is a small Node.js + Express application that consumes a public REST API, caches the results, and exposes clean endpoints with filtering and detailed views.


## Tech Stack
- Node.js
- Express
- Axios
- File-based caching (JSON file)


## Public API Used
**JSONPlaceholder** – Fake Online REST API for testing:
- Base URL: `https://jsonplaceholder.typicode.com`
- Endpoints used:
  - `GET /posts`
  - `GET /posts/:id`


## Features
- Fetches posts from the public API.
- Caches results both:
  - In memory (during runtime)
  - In a local file `cache/posts.json`
- Provides filtered list and detailed view endpoints.
- Handles common error cases:
  - Network failures
  - Invalid responses
  - Timeouts
  - Missing or malformed fields


## Project Structure
```text
src/
  index.js                      # App entry point
  api/jsonPlaceholderClient.js  # Axios client for external API
  routes/postRoutes.js          # Express routes
  services/postService.js       # Business logic + caching
  utils/cache.js                # File-based cache helpers
  utils/errorHandler.js         # 404 + global error handling
cache/
  posts.json (generated at runtime)
 