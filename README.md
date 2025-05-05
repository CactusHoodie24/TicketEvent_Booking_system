🎟️ Ticket Event Booking System
A full-stack Ticket Event Booking System built with Vite + React for the frontend and Node.js + Express for the backend, using MySQL as the database. It offers a seamless experience for users to browse, book, and pay for event tickets with essential features like secure authentication, email notifications, and payment processing via Stripe.

🚀 Features
✅ User Authentication & Authorization
Secure login and registration using JWT (JSON Web Tokens) and password hashing with bcrypt.

💳 Stripe Payment Integration
Users can pay for event tickets through a secure and reliable Stripe payment gateway.

📧 Email Notifications
Email confirmations for successful ticket purchases and transaction updates.

📅 Event Management
Admins can create, update, and delete events, while users can view and book them.

🔐 Protected Routes
Backend endpoints protected by JWT-based middleware to ensure secure access control.

🧰 Tech Stack
Frontend
Vite

React

React Router

Backend
Node.js

Express.js

MySQL

JWT

bcrypt

Stripe API

Nodemailer (for email notifications)

📦 Installation
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/CactusHoodie24/TicketEvent_Booking_system.git
cd ticket-event-booking-system
2. Install dependencies
bash
Copy
Edit
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
3. Environment Configuration
Create .env files in both /client and /server directories with appropriate variables:

.env for Backend
env
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=youremail@example.com
EMAIL_PASS=your_email_password
.env for Frontend
env
Copy
Edit
VITE_API_URL=http://localhost:5000
⚙️ Running the App
Start Backend
bash
Copy
Edit
cd server
npm run dev
Start Frontend
bash
Copy
Edit
cd client
npm run dev
📬 Contact
For questions or contributions, feel free to reach out via issues or submit a pull request.

📄 License
This project is licensed under the MIT License.
