# Project Architecture: Forte-FY CMS

This project implements a production-ready, full-stack Content Management System (CMS) with a WordPress-inspired admin dashboard.

## Backend Architecture

The backend is built with **Node.js** and **Express**, using a modular and scalable structure.

### Folder Structure (`/forte-fy/backend/`)

-   `config/`: Database configuration and connection logic.
-   `controllers/`: Business logic for each resource (Auth, Posts, Media).
-   `middleware/`: Custom middleware for authentication, authorization, and error handling.
-   `models/`: Database schema definitions and data access logic.
-   `routes/`: API endpoint definitions, mapping URLs to controllers.
-   `uploads/`: Local storage for uploaded media files.
-   `utils/`: Helper functions and utilities.
-   `types/`: TypeScript interface and type definitions.

### Database Schema

We use **SQLite** for a robust, file-based relational database.

-   `users`: Stores user accounts with hashed passwords and roles.
-   `posts`: Stores content with status, slug, and author relationships.
-   `pages`: Stores static page content.
-   `categories`: Stores taxonomies for posts.
-   `media`: Stores metadata for uploaded files.

### Security Features

-   **Authentication**: JWT-based authentication with secure token handling.
-   **Authorization**: Role-Based Access Control (RBAC) to restrict sensitive actions.
-   **Password Hashing**: Using `bcryptjs` with high salt rounds.
-   **Input Validation**: Sanitization of user input to prevent XSS and SQL Injection.
-   **File Security**: `multer` configuration with file-type and size limits.

## Frontend Integration

The frontend is a **React** Single-Page Application (SPA) integrated with the Express server via Vite middleware during development.

### Key Features

-   **Admin Dashboard**: A clean, responsive UI for managing content.
-   **Rich Text Editor**: Integrated support for content creation.
-   **Media Library**: Interface for uploading and managing assets.
-   **Real-time Updates**: Instant feedback for administrative actions.

## Deployment

The system is configured for easy deployment on a VPS or shared hosting that supports Node.js.

1.  Run `npm install` to install dependencies.
2.  Set up environment variables in `.env`.
3.  Run `npm run build` to build the frontend.
4.  Run `npm start` to launch the production server.
