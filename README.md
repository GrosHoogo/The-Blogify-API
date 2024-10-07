# Blogify API

## Overview

Welcome to **Blogify API**, the backend service designed to power **Blogify**, a platform that facilitates the creation, publication, and management of blog posts. Blogify enables users to engage with the content by leaving comments and liking posts, creating a dynamic and community-driven blogging experience.

This API is built using **Node.js** and **Express.js**, and leverages **MongoDB** for data storage. It provides a seamless RESTful interface to handle user authentication, blog post management, commenting, and user engagement. It also incorporates JWT-based authentication to secure user actions.

## Core Features

### 1. User Management

- **User Registration**: Users can create an account with their email, username, and password.
  - Route: `POST /users/register`
  - Validations: Unique email and username are enforced.
  
- **User Login**: Users can log in with their email and password.
  - Route: `POST /users/login`
  - Optional: JWT-based authentication to manage sessions.

- **User CRUD Operations**:
  - `GET /users/:id`: Retrieve a user's profile by ID.
  - `PUT /users/:id`: Update a user's profile.
  - `DELETE /users/:id`: Soft delete a user account by changing its status.

### 2. Blog Post Management

- **Create Posts**: Users can write and publish blog posts on various topics.
  - Route: `POST /posts`
  - Fields: Title, Content, Author (user reference), Tags, and Timestamps.

- **Read Posts**:
  - `GET /posts`: Retrieve all blog posts with optional filters (tag, author, date).
  - `GET /posts/:id`: Retrieve a specific post by its ID.

- **Edit & Delete Posts**:
  - `PUT /posts/:id`: Update an existing post.
  - `DELETE /posts/:id`: Soft delete or permanently delete a post.

### 3. Commenting System

- **Add Comments**: Users can comment on any blog post.
  - Route: `POST /posts/:id/comments`
  - Fields: Comment Text, Author, Post ID, Timestamp.

- **Manage Comments**:
  - `PUT /comments/:id`: Edit an existing comment.
  - `DELETE /comments/:id`: Delete a comment.

### 4. User Engagement (Likes)

- **Like a Post**: Users can like or unlike a post to show engagement.
  - Route: `POST /posts/:id/likes`

## Technology Stack

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Framework for routing and handling HTTP requests.
- **MongoDB**: NoSQL database to store user, post, comment, and like data.
- **JWT (JSON Web Token)**: Optional but recommended for handling user authentication.

## Installation

To run the Blogify API locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GrosHoogo/The-Blogify-API.git
   cd blogify-api
