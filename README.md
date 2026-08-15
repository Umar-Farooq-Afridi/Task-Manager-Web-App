## About the Project

Task Manager Web App is a full-stack productivity tool that lets users create,
update and organize their daily tasks securely. Each user has their own
private task list accessible only after logging in powered by JWT-based
authentication and a MongoDB database.

The project was built to practice real-world MERN stack architecture: a
RESTful Express API connected to MongoDB via Mongoose, with route-level
authentication middleware protecting task data and a React (Vite) frontend
that consumes the API using Axios.

### Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication to protect task routes
- Full CRUD support for tasks (create, read, update, delete)
- Each user can only access their own tasks
- RESTful API built with Express 5
- Fast, modern frontend built with React 19 + Vite

### Tech Stack

**Frontend:** React, Vite, React Router, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** JSON Web Tokens (JWT), bcrypt

### Author: Umar Farooq | Software Engineer | Web Developer | MERN Stack Developer