# 📦 Parcel Delivery API

A Node.js + Express + MongoDB backend for a **Parcel Delivery System** with authentication, role-based authorization, and parcel tracking features.  
Deployed on **Vercel** 🚀.

## 🚀 Live API Base URL
https://parcel-delivery-ass5-dun.vercel.app
---

## ⚡ Features
- User authentication (Email/Password & Google OAuth)
- Role-based access control (**User, Admin, Super Admin**)
- CRUD operations for users & parcels
- Parcel tracking by tracking ID
- Refresh token authentication
- Super Admin controls (user role updates, full access)

---

## 🧑‍💻 Tech Stack
- **Node.js** with **Express**
- **MongoDB + Mongoose**
- **TypeScript**
- **JWT, bcryptjs Authentication**
- **Passport.js** (Google OAuth)
- **Vercel** deployment

---

## 📌 API Endpoints

### 👤 User
- **Create User** → `POST /user/auth/register`
- **Google Login** → `GET /auth/google`
- **Update User** → `PATCH /user/update/:id`
- **Delete User** → `DELETE /user/delete/:id`

**🔑 Super Admin only**
- **Update User Role** → `PATCH /user/role/:id`

**🔑 Admin & Super Admin only**
- **Get All Users** → `GET /user/all-users`

---

### 🔐 Auth
- **User Login** → `POST /auth/login`
- **Super Admin Login** → `POST /auth/login`
- **Refresh Token** → `POST /auth/refresh-token`
- **Logout** → `POST /auth/logout`

---

### 📦 Parcel
- **Create Parcel** → `POST /parcels/create-parcel`
- **Get My Parcels** → `GET /parcels/me`
- **Update Parcel** → `PATCH /parcels/update/:id`
- **Receiver Update** → `PATCH /parcels/receiver/update/:id`
- **Delete Parcel** → `DELETE /parcels/delete/:id`

**Tracking**
- **Track Parcel by ID** → `GET /parcels/tracking/:trackingId`

---

## 🔑 Roles
- **User** → Can create parcels, track their parcels, and update/delete their own.
- **Admin** → Can view all users and parcels.
- **Super Admin** → Full access, including managing user roles.

---

## 🛠️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/parcel-delivery-api.git
cd parcel-delivery-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run locally
npm run dev

# Build for production
npm run build
npm start

## Developed by
# Aurnab Das
