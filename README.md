# ✈️ Airline Reservation System (Backend)

A scalable, microservices-based backend system designed for an airline company to handle flight search, booking, cancellations, check-ins, and notifications — with focus on maintainability, performance, and clean architecture.

---

## 📐 High-Level Architecture

<img width="1002" height="681" alt="HLD Diagram" src="https://github.com/user-attachments/assets/e23b8c2a-490a-46b0-9a95-0adaf6f11cd8" />

---

## 🎯 Objective

- Build a robust backend system to support various airline-related functionalities.
- Deliver seamless experience for users to search, book, and manage their flights.
- Focus on a **modular**, **scalable**, and **maintainable** codebase using best backend practices.
- This documentation highlights only the **backend** components and logic.

---

## ✅ Functional Requirements

### 🔍 Flight Search
- Users can search for flights between any two locations.
- Filters include:
  - Date of journey
  - Class (Economy, Business, etc.)
  - Optional: Number of seats
- Results are:
  - Sorted by duration → then by price
  - Paged with support for filters: price, departure time, airline, stops, duration
- [v2] Support for return and multi-city flights.

### ✈️ Booking & Cancellation
- Registered users can book available flights.
- Users can cancel bookings and initiate refunds (based on defined criteria).
- Option to add excess luggage at time of booking.
- One booking can include multiple passengers.

### 🧾 Manage Bookings
- View upcoming and past bookings.
- Download boarding passes (if online check-in is completed).
- Online check-in supported up to 3 hours before departure.

### 📩 Notifications
- Email reminders for online check-in.
- Delay alerts and other important flight updates.

### 🔐 Authentication
- Secure login via email and password (JWT-based).
- [v2] Raise support tickets and manage customer queries.

### 📚 Static Pages
- Static FAQ section.
- [v2] Seat selection for each flight.

---

## 📈 Non-Functional Requirements

- Expected user base: ~100,000
- Estimated quarterly bookings: ~500,000 (~5,000 per day)
- Should scale to handle 3x the projected traffic.
- Strong emphasis on data consistency, especially during concurrent bookings.
- Flight pricing must update in real-time before final payment.
- Use of **RDBMS** to handle concurrency and transactional integrity.

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize ORM
- **Message Queue**: RabbitMQ
- **Authentication**: JWT
- **API Gateway**: Express middleware-based custom implementation
- **Email Service**: Nodemailer with cron jobs
- **Version Control**: Git

---
