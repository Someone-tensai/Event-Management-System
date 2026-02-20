# Smart Investment Management & Portfolio System (SIMPS)

![Django](https://img.shields.io/badge/Backend-Django-092E20?style=for-the-badge&logo=django)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/Frontend-JavaScript-F7DF1E?style=for-the-badge&logo=javascript)

---

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

### 📈 Personal Portfolio
- Add selected investments
- Track allocated amounts
- Manage portfolio entries

### 📱 Responsive Design
- Tailwind CSS-based UI
- Desktop and mobile support

---

## 🗂 Database Design

### Main Tables

- `users`
- `income`
- `expenses`
- `savings`
- `global_equities`
- `personal_portfolio`
- `equity_price_history`

### Relationships

- Users → Income (1:N)
- Users → Expenses (1:N)
- Users → Savings (1:N)
- Users ↔ Global Equities (M:N via Personal Portfolio)

---

## 🛠 Tech Stack

### Backend
- Python
- Django
- PosgreSQL

### Frontend
- HTML
- CSS
- JavaScript
- Tailwind CSS

### Development Tools
- Git & GitHub
- VS Code
- LaTeX (Documentation)

---

## 📁 Project Structure
```bash
.
└── simps
    ├── README.md
    ├── backend
    │   ├── README.md
    │   ├── requirements.txt
    │   └── simps_project
    │       ├── Procfile
    │       ├── dashboard
    │       │   ├── __init__.py
    │       │   ├── admin.py
    │       │   ├── apps.py
    │       │   ├── db_utils.py
    │       │   ├── migrations
    │       │   │   └── __init__.py
    │       │   ├── models.py
    │       │   ├── templates
    │       │   │   └── dashboard
    │       │   │       ├── add_expense.html
    │       │   │       ├── add_income.html
    │       │   │       ├── dashboard.html
    │       │   │       ├── view_expenses.html
    │       │   │       ├── view_income.html
    │       │   │       └── view_savings.html
    │       │   ├── tests.py
    │       │   ├── urls.py
    │       │   └── views.py
    │       ├── data
    │       ├── db.sqlite3
    │       ├── exploration
    │       │   ├── __init__.py
    │       │   ├── admin.py
    │       │   ├── apps.py
    │       │   ├── migrations
    │       │   │   └── __init__.py
    │       │   ├── models.py
    │       │   ├── static
    │       │   │   └── exploration
    │       │   │       └── explore.js
    │       │   ├── templates
    │       │   │   └── exploration
    │       │   │       └── explore.html
    │       │   ├── tests.py
    │       │   ├── urls.py
    │       │   ├── utils.py
    │       │   └── views.py
    │       ├── manage.py
    │       ├── package-lock.json
    │       ├── package.json
    │       ├── portfolio
    │       │   ├── __init__.py
    │       │   ├── admin.py
    │       │   ├── apps.py
    │       │   ├── migrations
    │       │   │   └── __init__.py
    │       │   ├── models.py
    │       │   ├── static
    │       │   │   └── portfolio
    │       │   │       └── portfolio.js
    │       │   ├── templates
    │       │   │   └── portfolio
    │       │   │       └── overview.html
    │       │   ├── tests.py
    │       │   ├── urls.py
    │       │   └── views.py
    │       ├── requirements.txt
    │       ├── scripts
    │       │   ├── price_updater.py
    │       │   └── symbols.csv
    │       ├── simps_project
    │       │   ├── __init__.py
    │       │   ├── asgi.py
    │       │   ├── settings.py
    │       │   ├── urls.py
    │       │   └── wsgi.py
    │       ├── static
    │       │   ├── dist
    │       │   │   └── style.css
    │       │   ├── favicon.ico
    │       │   └── src
    │       │       └── style.css
    │       ├── staticfiles
    │       ├── templates
    │       │   └── base.html
    │       └── user
    │           ├── __init__.py
    │           ├── admin.py
    │           ├── apps.py
    │           ├── migrations
    │           │   └── __init__.py
    │           ├── models.py
    │           ├── static
    │           │   └── user
    │           │       └── signup.js
    │           ├── templates
    │           │   └── user
    │           │       ├── landing.html
    │           │       ├── login.html
    │           │       └── signup.html
    │           ├── tests.py
    │           ├── urls.py
    │           └── views.py
    ├── database
    │   ├── README.md
    │   ├── connection_info.txt
    │   ├── schema.sql
    │   └── seed_data.sql
    ├── frontend
    │   ├── README.md
    │   └── package.json
    ├── railway.json
    └── requirements.txt

```

---

## 👨‍💻 Contributors
- Prayush Bikram Khadka
- Rhiki Ranjan Neupane
- Shaswat Sharma
  
---

## 🔮 Future Improvements
- Portfolio performance analytics
- Risk profiling engine
- Cloud deployment (AWS / GCP / Azure)

---

### ⭐ If you found this project interesting, consider giving it a star!

---