# Mabel Kafe - Restaurant Management & Reservation System

A modern, full-stack restaurant web application built with React, Tailwind CSS, and Supabase. It features a stunning customer-facing menu and an advanced Role-Based Access Control (RBAC) Admin Dashboard for managing reservations.

## 🚀 Features

### Customer Experience
- **Dynamic Menu**: Categorized food and beverage listings with real-time search filtering.
- **Online Reservations**: A seamless booking form that sends requests directly to the restaurant's database.
- **Smart Navigation**: Floating WhatsApp integration and an interactive "Get Directions" Google Maps overlay.
- **Theme Support**: Persistent Dark/Light mode toggle for optimal viewing.
- **Responsive Design**: Mobile-first architecture ensuring perfect display on any device.

### Admin & Backend (Role-Based Access Control)
- **Secure Authentication**: Powered by Supabase Auth (Email & Password).
- **Intelligent Routing**: Automatic redirection to customer or admin dashboards based on database-level user roles.
- **Yönetim Paneli (Admin Dashboard)**:
  - Real-time statistics (Pending vs. Approved reservations).
  - One-click reservation approval system.
  - Live customer directory fetched from registered profiles.
  - Live search filtering by customer name or phone number.

## 🛠 Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Framer Motion (Animations & Page Transitions)
- React Router Dom (Routing & Protected Routes)
- React Query (Data Fetching & State Management)
- React Toastify (Notifications)
- Lucide React (Icons)

**Backend / BaaS:**
- Supabase (PostgreSQL Database)
- Supabase Authentication
- Row Level Security (RLS) Policies

## 📦 Getting Started

1. **Clone and install dependencies:**
```bash
npm install
