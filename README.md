# Smart Investment Management & Portfolio System (SIMPS)

## Overview

**Event & Booking Management System (EBMS)** is a full-stack web application designed to streamline club-based event creation, booking management, and QR-based payment verification.

The system enables users to:

Securely register and authenticate

Create and manage clubs

Create, edit, and delete events

Book tickets for events

Submit payment proof via uploaded image

Verify payments and track revenue

EBMS emphasizes structured relational database design, transactional integrity, and scalable deployment architecture.
---

## Project Objective

- Develop a Event Management System to faciliate easy creation and application of events.

---

## 🏗️ System Architecture

```bash
Frontend (ReactJs, Tailwind)
↓
Backend (NodeJs with ExpressJs)
↓
PostgreSQL (Cloud Hosted using Supabase)

```
---

## 🚀 Core Features

### Authentication & User Management
- Secure sign-up and login
- Password hashing
- JWT / session-based authentication
- User session management
- Unique username & email validation

### User Dashboard
- Create Clubs
- Browse Clubs
- Join Clubs (if not invite-only)
- Club description, logo, and cover image
- Events created under specific clubs

### Events
- Create Events
- Edit Events
- Delete Events (restricted if bookings exist)
- Browse and join events
- Seat availability tracking
- Category & type filtering
- QR code upload for payment
- Real-time revenue tracking via bookings

### Booking and Payment Flow
- User books an event
- Seats are reserved
- Event has an associated QR Code for payment
- User submits payment proof (image)
- Event creator verifies payment
- Booking status updates to verified or rejected
- Revenue updates automatically

### 📱 Responsive Design
- Tailwind CSS-based UI
- Desktop and mobile support
- Dark and Light Mode Support
---

## 🗂 Database Design

### Main Tables

- `users`
- `events`
- `clubs`
- `userclub`
- `bookings`
- `payments`
- `invites`

### Relationships
 
- Users → Clubs (1:N via creator_id)
- Users ↔ Clubs (M:N via userclub)
- Clubs → Events (1:N)
- Events → Bookings (1:N)
- Users → Bookings(1:N)
- Bookings → Payments (1:1)
- Users → Invites(1:N)
- Clubs -> Invites(1:N)
---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL

### Frontend
- React
- TypeScript(TSX)
- Tailwind CSS

### Development Tools
- Git & GitHub
- VS Code
- Railway (Backend Deployment)
- Vercel (Frontend Deployment)

---

## 📁 Project Structure
```bash
.
┣ 📂backend
┃ ┣ 📂config
┃ ┃ ┗ 📜config.js
┃ ┣ 📂controllers
┃ ┃ ┣ 📜booking_controller.js
┃ ┃ ┣ 📜club_controller.js
┃ ┃ ┣ 📜event_controller.js
┃ ┃ ┣ 📜payment_controller.js
┃ ┃ ┗ 📜user_controller.js
┃ ┣ 📂db
┃ ┃ ┣ 📜booking_queries.js
┃ ┃ ┣ 📜club_queries.js
┃ ┃ ┣ 📜event_queries.js
┃ ┃ ┣ 📜payment_queries.js
┃ ┃ ┣ 📜pool.js
┃ ┃ ┣ 📜supabaseClient.js
┃ ┃ ┗ 📜user_queries.js
┃ ┣ 📂errors
┃ ┃ ┗ 📜app_error.js
┃ ┣ 📂middleware
┃ ┃ ┗ 📜auth_controller.js
┃ ┣ 📂routes
┃ ┃ ┣ 📜bookings.js
┃ ┃ ┣ 📜club.js
┃ ┃ ┣ 📜events.js
┃ ┃ ┣ 📜payments.js
┃ ┃ ┗ 📜users.js
┃ ┣ 📂utils
┃ ┃ ┣ 📜hash.js
┃ ┃ ┗ 📜jwt.js
┃ ┣ 📜.env
┃ ┣ 📜index.js
┃ ┗ 📜package.json
┣ 📂database
┃ ┣ 📂migrations
┃ ┃ ┣ 📜001_update_users.sql
┃ ┃ ┣ 📜002_update_clubs.sql
┃ ┃ ┣ 📜003_club_invitations.sql
┃ ┃ ┗ 📜004_update_payments.sql
┃ ┣ 📜constraints.sql
┃ ┣ 📜queries.sql
┃ ┣ 📜schema.sql
┃ ┗ 📜seed.sql
┣ 📂docs
┃ ┣ 📜guide.md
┃ ┗ 📜schema.md
┣ 📂frontend
┃ ┣ 📂build
┃ ┃ ┗ 📜index.html
┃ ┣ 📂public
┃ ┃ ┗ 📂img
┃ ┃   ┗ 📜demo-img.jpg
┃ ┣ 📂src
┃ ┃ ┣ 📂components
┃ ┃ ┃ ┣ 📂figma
┃ ┃ ┃ ┃ ┗ 📜ImageWithFallback.tsx
┃ ┃ ┃ ┣ 📂ui
┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┗ 📜navigation.tsx
┃ ┃ ┣ 📂lib
┃ ┃ ┃ ┣ 📜api.ts
┃ ┃ ┃ ┣ 📜auth-context.tsx
┃ ┃ ┃ ┣ 📜theme-context.tsx
┃ ┃ ┃ ┗ 📜toast.tsx
┃ ┃ ┣ 📂pages
┃ ┃ ┃ ┣ 📂club-dashboard
┃ ┃ ┃ ┃ ┣ 📜delete_event.tsx
┃ ┃ ┃ ┃ ┣ 📜edit_event.tsx
┃ ┃ ┃ ┃ ┣ 📜events.tsx
┃ ┃ ┃ ┃ ┣ 📜finances.tsx
┃ ┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┃ ┣ 📜members.tsx
┃ ┃ ┃ ┃ ┗ 📜overview.tsx
┃ ┃ ┃ ┣ 📂profile
┃ ┃ ┃ ┃ ┣ 📜bookings.tsx
┃ ┃ ┃ ┃ ┣ 📜clubs.tsx
┃ ┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┃ ┣ 📜notifications.tsx
┃ ┃ ┃ ┃ ┗ 📜profile.tsx
┃ ┃ ┃ ┣ 📜club-details.tsx
┃ ┃ ┃ ┣ 📜clubs.tsx
┃ ┃ ┃ ┣ 📜create-club.tsx
┃ ┃ ┃ ┣ 📜create-event.tsx
┃ ┃ ┃ ┣ 📜event-details.tsx
┃ ┃ ┃ ┣ 📜events.tsx
┃ ┃ ┃ ┣ 📜home.tsx
┃ ┃ ┃ ┣ 📜login.tsx
┃ ┃ ┃ ┗ 📜register.tsx
┃ ┃ ┣ 📂styles
┃ ┃ ┃ ┗ 📜globals.css
┃ ┃ ┣ 📜App.tsx
┃ ┃ ┣ 📜Attributions.md
┃ ┃ ┣ 📜index.css
┃ ┃ ┣ 📜loading.tsx
┃ ┃ ┣ 📜main.tsx
┃ ┃ ┗ 📜routes.ts
┃ ┣ 📜eslint.config.js
┃ ┣ 📜index.html
┃ ┣ 📜package.json
┃ ┣ 📜tailwind.config.js
┃ ┗ 📜vite.config.js
┣ 📜.gitignore
┣ 📜LICENSE
┗ 📜README.md

```

---

## 👨‍💻 Contributors
- Sulav Paudel
- Sitish Jaiswal
  
---

## 🔮 Future Improvements
- Invite to Club
- Trending Catgories
- Restricted Event Creation ROles
- Advanced Sorting and Filtering
---

---